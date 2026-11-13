import { NextResponse } from 'next/server';
import { sendInquiryEmails } from '@/lib/email';

export async function POST(req) {
    try {
        const body = await req.json();
        const name = String(body.name || '').trim();
        const phone = String(body.phone || '').trim();
        const email = body.email ? String(body.email).trim() : '';
        const type = body.type ? String(body.type).trim() : 'Custom Software';
        const message = body.message ? String(body.message).trim() : 'Project brief submitted via Altraware website.';

        if (!name || !phone) {
            return NextResponse.json({ error: 'Name and phone number are required.' }, { status: 400 });
        }

        const refCode = '#ALT-' + Math.floor(1000 + Math.random() * 9000);
        const result = await sendInquiryEmails({ name, phone, email, type, message, refCode });
        if (!result.adminSent) {
            console.error('[API /api/inquiries] Unable to deliver the admin notification.');
            return NextResponse.json({ error: 'We could not send your message. Please try again or contact us on WhatsApp.' }, { status: 503 });
        }
        return NextResponse.json({ ok: true, refCode, clientSent: result.clientSent });
    } catch (err) {
        console.error('[API /api/inquiries] error:', err.message);
        return NextResponse.json({ error: 'Failed to process inquiry.' }, { status: 500 });
    }
}
