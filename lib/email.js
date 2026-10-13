import nodemailer from 'nodemailer';

let cached = null;

function getTransporter() {
    const user = (process.env.SMTP_USER || '').trim();
    let pass = (process.env.SMTP_PASS || '').trim();
    if (pass.startsWith('"') && pass.endsWith('"')) pass = pass.slice(1, -1).trim();
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const secure = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === 'true' : port === 465;
    if (!user || !pass) return null;
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port,
        secure,
        auth: { user, pass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
    });
}

export async function sendInquiryEmails(data) {
    const transporter = getTransporter();
    if (!transporter) {
        return { success: false, clientSent: false, adminSent: false, reason: 'SMTP_NOT_CONFIGURED' };
    }
    const from = process.env.SMTP_FROM || `"Altraware Technology" <${process.env.SMTP_USER}>`;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER || 'altrawaretechnology@gmail.com';
    let clientSent = false;
    let adminSent = false;
    const errors = [];

    if (data.email && data.email.includes('@')) {
        try {
            await transporter.sendMail({
                from,
                to: data.email,
                replyTo: adminEmail,
                subject: `We got your message [${data.refCode}] — Altraware Technologies`,
                text: `Hi ${data.name},\n\nThanks for writing to Altraware Technologies! We received your message about "${data.type}" and will reply within one working day.\n\nYour reference: ${data.refCode}\n\nPrefer chat? WhatsApp us on +255 792 867 427.\n\n— David & Clemence, Altraware Technologies, Dar es Salaam`,
            });
            clientSent = true;
        } catch (err) {
            errors.push(`Client: ${err.message}`);
        }
    }

    try {
        await transporter.sendMail({
            from,
            to: adminEmail,
            subject: `New inquiry [${data.refCode}] — ${data.name} (${data.type})`,
            text: `New website inquiry:\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || '-'}\nType: ${data.type}\n\nMessage:\n${data.message}\n\nRef: ${data.refCode}`,
        });
        adminSent = true;
    } catch (err) {
        errors.push(`Admin: ${err.message}`);
    }

    return { success: clientSent || adminSent, clientSent, adminSent, error: errors.join(' ') || undefined };
}
