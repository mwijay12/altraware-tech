import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function getAllowedEmails() {
    const raw =
        process.env.ADMIN_EMAILS ||
        process.env.FIREBASE_ADMIN_EMAILS ||
        process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
        '';
    return raw
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
}

function setAuthCookie(res) {
    res.cookies.set('altraware_admin', '1', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 12,
    });
    return res;
}

export async function POST(req) {
    let body = {};
    try {
        body = await req.json();
    } catch {
        /* bad json */
    }

    // ── Google login path ──
    if (body.googleEmail) {
        const email = String(body.googleEmail).trim().toLowerCase();
        const allowed = getAllowedEmails();
        if (!allowed.length) {
            return NextResponse.json(
                { error: 'ADMIN_EMAILS is not configured. Add your Gmail to .env.local and restart.' },
                { status: 503 }
            );
        }
        if (!allowed.includes(email)) {
            return NextResponse.json({ error: 'That Google account is not an admin.' }, { status: 403 });
        }
        return setAuthCookie(NextResponse.json({ ok: true, via: 'google', email }));
    }

    // ── Passcode path (existing) ──
    const key = body.key || '';
    const master = process.env.ADMIN_MASTER_KEY;
    if (!master) {
        return NextResponse.json(
            { error: 'ADMIN_MASTER_KEY is not configured. Add it to .env.local and restart the server.' },
            { status: 503 }
        );
    }
    if (key !== master) {
        return NextResponse.json({ error: 'Wrong passcode.' }, { status: 401 });
    }
    return setAuthCookie(NextResponse.json({ ok: true, via: 'passcode' }));
}

export async function GET() {
    const authed = (await cookies()).get('altraware_admin')?.value === '1';
    return NextResponse.json({ authed });
}

export async function DELETE() {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('altraware_admin', '', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });
    return res;
}
