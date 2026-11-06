import { NextResponse } from 'next/server';
import {
    SESSION_COOKIE,
    clientIp,
    createSessionToken,
    getAllowedEmails,
    rateLimit,
    safeEqual,
    sessionCookieOptions,
    verifyFirebaseIdToken,
    verifySessionToken,
} from '@/lib/admin-auth';

const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(req) {
    const ip = clientIp(req);
    const limit = rateLimit(`admin-login:${ip}`, { max: MAX_ATTEMPTS, windowMs: WINDOW_MS });
    if (!limit.ok) {
        return NextResponse.json(
            { error: 'Too many attempts. Try again later.' },
            { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
        );
    }

    let body = {};
    try {
        body = await req.json();
    } catch {
        /* bad json */
    }

    // ── Google login path ───────────────────────────────────────────────────
    // The client sends the Firebase ID token from signInWithPopup. We never
    // trust a bare email: the token is verified with Google before its email
    // is used, so the account must actually have signed in.
    if ('idToken' in body) {
        const email = await verifyFirebaseIdToken(body.idToken);
        if (!email) {
            return NextResponse.json({ error: 'Google sign-in could not be verified.' }, { status: 401 });
        }
        const allowed = getAllowedEmails();
        if (!allowed.length) {
            return NextResponse.json(
                { error: 'ADMIN_EMAILS is not configured. Add your Gmail to the environment and restart.' },
                { status: 503 }
            );
        }
        if (!allowed.includes(email)) {
            return NextResponse.json({ error: 'That Google account is not an admin.' }, { status: 403 });
        }
        const res = NextResponse.json({ ok: true, via: 'google', email });
        res.cookies.set(SESSION_COOKIE, createSessionToken(email), sessionCookieOptions());
        return res;
    }

    // Reject the old, forgeable shape outright.
    if ('googleEmail' in body) {
        return NextResponse.json(
            { error: 'Send a Firebase ID token, not an email address.' },
            { status: 400 }
        );
    }

    // ── Passcode path ───────────────────────────────────────────────────────
    const master = process.env.ADMIN_MASTER_KEY;
    if (!master) {
        return NextResponse.json(
            { error: 'ADMIN_MASTER_KEY is not configured. Add it to the environment and restart the server.' },
            { status: 503 }
        );
    }
    if (!safeEqual(String(body.key || ''), master)) {
        return NextResponse.json({ error: 'Wrong passcode.' }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true, via: 'passcode' });
    res.cookies.set(SESSION_COOKIE, createSessionToken('passcode'), sessionCookieOptions());
    return res;
}

export async function GET(req) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const session = verifySessionToken(token);
    return NextResponse.json({
        authed: Boolean(session),
        via: session?.sub?.includes('@') ? 'google' : session ? 'passcode' : null,
        email: session?.sub?.includes('@') ? session.sub : undefined,
    });
}

export async function DELETE() {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, '', { ...sessionCookieOptions(), maxAge: 0 });
    return res;
}
