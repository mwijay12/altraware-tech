// ─── Admin authentication ───────────────────────────────────────────────────
// Server-side only. Two ways in:
//   1. Google sign-in — the browser sends a Firebase ID token, which we verify
//      against Google before trusting the email inside it.
//   2. Passcode — compared in constant time against ADMIN_MASTER_KEY.
//
// The session cookie is HMAC-signed, so it cannot be forged by editing the
// cookie value. Its secret comes from ADMIN_SESSION_SECRET (falls back to
// ADMIN_MASTER_KEY so existing deployments keep working).

import { createHmac, timingSafeEqual, randomBytes } from 'crypto';

export const SESSION_COOKIE = 'altraware_admin';
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function sessionSecret() {
    return (process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_MASTER_KEY || '').trim();
}

/** Constant-time string compare that never throws on length mismatch. */
export function safeEqual(a, b) {
    const x = Buffer.from(String(a ?? ''), 'utf8');
    const y = Buffer.from(String(b ?? ''), 'utf8');
    if (x.length !== y.length) {
        // Still compare something of equal length so timing does not leak length.
        const padded = Buffer.alloc(x.length);
        y.copy(padded);
        timingSafeEqual(x, padded);
        return false;
    }
    return timingSafeEqual(x, y);
}

const b64url = (buf) => Buffer.from(buf).toString('base64url');

function sign(body) {
    return createHmac('sha256', sessionSecret()).update(body).digest('base64url');
}

/** Build a signed session token: <payload>.<signature>. */
export function createSessionToken(subject) {
    const payload = b64url(
        JSON.stringify({
            sub: subject || 'passcode',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
            jti: randomBytes(8).toString('hex'),
        })
    );
    return `${payload}.${sign(payload)}`;
}

/** Verify a session token. Returns the payload, or null if invalid/expired. */
export function verifySessionToken(token) {
    if (!token || typeof token !== 'string') return null;
    const secret = sessionSecret();
    if (!secret) return null; // no secret configured → nothing can be trusted
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;
    if (!safeEqual(signature, sign(payload))) return null;
    try {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (!data?.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
        return data;
    } catch {
        return null;
    }
}

/** Parse ADMIN_EMAILS (comma separated, case-insensitive). */
export function getAllowedEmails() {
    const raw =
        process.env.ADMIN_EMAILS ||
        process.env.FIREBASE_ADMIN_EMAILS ||
        // NEXT_PUBLIC_* is readable by clients, so it is a last resort only —
        // it exists here for backwards compatibility with existing deployments.
        process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
        '';
    return raw
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
}

/**
 * Verify a Firebase ID token with Google.
 *
 * Uses the Identity Toolkit accounts:lookup endpoint, which validates the
 * token's signature, issuer, audience and expiry server-side. Returns the
 * token's email, or null when the token is missing/invalid.
 *
 * Set FIREBASE_API_KEY if you would rather not reuse the public web key.
 */
export async function verifyFirebaseIdToken(idToken) {
    if (!idToken || typeof idToken !== 'string') return null;
    const apiKey = (process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '').trim();
    if (!apiKey) return null;

    try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
            signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return null;
        const data = await res.json();
        const user = data?.users?.[0];
        if (!user?.email) return null;
        if (user.emailVerified === false) return null;
        return String(user.email).trim().toLowerCase();
    } catch {
        return null;
    }
}

// ─── Best-effort in-memory rate limiting ────────────────────────────────────
// Per-instance only: on serverless platforms each instance keeps its own map,
// so this raises the cost of brute force rather than eliminating it.
const buckets = new Map();

export function rateLimit(key, { max = 10, windowMs = 10 * 60 * 1000 } = {}) {
    const now = Date.now();
    const entry = buckets.get(key);

    if (!entry || now > entry.resetAt) {
        buckets.set(key, { count: 1, resetAt: now + windowMs });
        if (buckets.size > 5000) {
            for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
        }
        return { ok: true, remaining: max - 1, retryAfter: 0 };
    }

    entry.count += 1;
    if (entry.count > max) {
        return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
    }
    return { ok: true, remaining: max - entry.count, retryAfter: 0 };
}

/** Client IP for rate-limit keys. Falls back to a constant behind unknown proxies. */
export function clientIp(req) {
    const fwd = req.headers.get('x-forwarded-for');
    if (fwd) return fwd.split(',')[0].trim();
    return req.headers.get('x-real-ip') || 'unknown';
}

/** Cookie options used when setting the session. */
export function sessionCookieOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: SESSION_TTL_SECONDS,
    };
}
