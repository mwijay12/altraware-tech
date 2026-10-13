import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
    let key = '';
    try {
        const body = await req.json();
        key = body.key || '';
    } catch {
        /* bad json */
    }
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
    const res = NextResponse.json({ ok: true });
    res.cookies.set('altraware_admin', '1', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 12,
    });
    return res;
}

export async function GET() {
    const authed = (await cookies()).get('altraware_admin')?.value === '1';
    return NextResponse.json({ authed });
}
