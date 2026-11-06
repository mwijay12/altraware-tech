import { NextResponse } from 'next/server';
import { sendInquiryEmails } from '@/lib/email';
import { clientIp, rateLimit } from '@/lib/admin-auth';

// Keep these deliberately generous but bounded — the endpoint sends email and
// is open to the public, so unbounded input is an abuse vector.
const LIMITS = { name: 120, phone: 40, email: 200, type: 80, message: 5000 };

const clip = (value, max) => String(value ?? '').trim().slice(0, max);

export async function POST(req) {
    const ip = clientIp(req);
    const limit = rateLimit(`inquiry:${ip}`, { max: 5, windowMs: 10 * 60 * 1000 });
    if (!limit.ok) {
        return NextResponse.json(
            { error: 'Too many messages from this connection. Please WhatsApp us instead.' },
            { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
        );
    }

    try {
        const body = await req.json();
        const name = clip(body.name, LIMITS.name);
        const phone = clip(body.phone, LIMITS.phone);
        const email = clip(body.email, LIMITS.email);
        const type = clip(body.type, LIMITS.type) || 'Custom Software';
        const message = clip(body.message, LIMITS.message) || 'Project brief submitted via Altraware website.';

        if (!name || !phone) {
            return NextResponse.json({ error: 'Name and phone number are required.' }, { status: 400 });
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 });
        }

        const refCode = '#ALT-' + Math.floor(1000 + Math.random() * 9000);
        const result = await sendInquiryEmails({ name, phone, email, type, message, refCode });

        // Never report success when nothing was actually delivered — that loses
        // the lead silently. Log it loudly and tell the visitor to use WhatsApp.
        if (!result.success) {
            console.error(
                `[API /api/inquiries] inquiry ${refCode} NOT delivered (${
                    result.reason || result.error || 'unknown'
                }). Lead follows:`,
                JSON.stringify({ name, phone, email, type, message, refCode })
            );
            return NextResponse.json(
                {
                    error:
                        'Our email is temporarily unavailable, so your message was not sent. Please WhatsApp us on +255 792 867 427 — we reply fastest there.',
                    refCode,
                    smtpConfigured: result.reason !== 'SMTP_NOT_CONFIGURED',
                },
                { status: 503 }
            );
        }

        return NextResponse.json({ ok: true, refCode, ...result });
    } catch (err) {
        console.error('[API /api/inquiries] error:', err.message);
        return NextResponse.json({ error: 'Failed to process inquiry.' }, { status: 500 });
    }
}
