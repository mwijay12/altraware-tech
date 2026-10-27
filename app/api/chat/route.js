import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are "Altra", the friendly AI assistant for Altraware Technology Ltd, a software company based in Dar es Salaam, Tanzania. Answer briefly, plainly and helpfully in English.

About Altraware:
- Founded by David Mwijage (Engineering & Architecture) and Clemence Ng'unda (Product & Business Operations), founded at UAUT.
- WhatsApp: +255 792 867 427. Email: altrawaretechnology@gmail.com. Office: Dar es Salaam, Tanzania. Hours: Mon-Sat, 8:00-18:00 EAT.
- We build websites, web and mobile apps, and business systems for small businesses, schools, clinics, care centres and NGOs. Mobile money ready, Kiswahili and English, works on limited connectivity, long-term support. Built with data privacy in mind.

Platforms (all have live demos):
1. Faida POS — retail point of sale, 100% offline, stock, receipts, M-Pesa records. Demo: https://faida-hq.vercel.app/
2. CareTrack — records for care centres (attendance, health notes, fees, guardian SMS). Demo uses fake data only. Demo: https://caretrack-six.vercel.app/dashboard
3. ShuleDirect — school system (fees, attendance, reports). In development.

Starting prices (final quote always fixed in writing after a free discovery call):
- Web Starter TSh 350,000 (1-2 weeks), Growth Business Site TSh 550,000, Pro Web Portal TSh 750,000.
- Custom apps from TSh 800,000. Business systems from TSh 1,200,000. Faida POS packages from TSh 1,500,000.
- Support plans from TSh 99,000/month.

Process: 5 written phases (discovery, prototyping, engineering, launch & training, long-term support). You approve each step before we bill the next.

Rules:
- Never use markdown symbols like ** or ###. Plain text, short paragraphs, dash (-) lists.
- Keep answers short and end by pointing to WhatsApp (+255 792 867 427) when a human touch helps.
- Never invent certifications, awards, client counts or statistics. Never name clients.
`;

function keysFromEnv(multi, single) {
    if (multi) {
        const list = multi.split(',').map((k) => k.trim()).filter(Boolean);
        if (list.length) return list;
    }
    return single ? [single] : [];
}

async function callChat(url, model, messages, key, extra, timeoutMs) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 800, ...extra }),
        signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) throw new Error(`AI error [${res.status}]`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { message, history } = body;
        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
        if (Array.isArray(history)) {
            for (const h of history.slice(-6)) {
                if (h.text && (h.from === 'user' || h.from === 'ai')) {
                    messages.push({ role: h.from === 'user' ? 'user' : 'assistant', content: h.text });
                }
            }
        }
        messages.push({ role: 'user', content: message });

        const inceptionKeys = keysFromEnv(process.env.INCEPTION_API_KEYS, process.env.INCEPTION_API_KEY);
        for (const key of [...inceptionKeys].sort(() => Math.random() - 0.5)) {
            try {
                const reply = await callChat(
                    'https://api.inceptionlabs.ai/v1/chat/completions',
                    process.env.INCEPTION_MODEL || 'mercury-2.5',
                    messages,
                    key,
                    { reasoning_effort: process.env.INCEPTION_REASONING_EFFORT || 'low' },
                    15000
                );
                if (reply && reply.trim()) return NextResponse.json({ reply, provider: 'inception' });
            } catch (err) {
                console.warn('Inception key failed, rotating…', err.message);
            }
        }

        const agnesKeys = keysFromEnv(process.env.AGNES_API_KEYS, process.env.AGNES_API_KEY);
        for (const key of [...agnesKeys].sort(() => Math.random() - 0.5)) {
            try {
                const reply = await callChat(
                    'https://apihub.agnes-ai.com/v1/chat/completions',
                    process.env.AGNES_MODEL || 'openai/deepseek-ai/DeepSeek-V3',
                    messages,
                    key,
                    {},
                    18000
                );
                if (reply && reply.trim()) return NextResponse.json({ reply, provider: 'agnes' });
            } catch (err) {
                console.warn('Agnes key failed, rotating…', err.message);
            }
        }

        return NextResponse.json({
            reply:
                'Welcome to Altraware! I can help with our websites (from TSh 350,000), apps (from TSh 800,000) and systems like Faida POS and CareTrack — both have live demos. For a human reply, WhatsApp us on +255 792 867 427!',
            provider: 'local-fallback',
        });
    } catch (err) {
        console.error('Chat API error:', err.message);
        return NextResponse.json(
            {
                reply:
                    'Sorry, I had a small network hiccup. You can reach us directly on WhatsApp (+255 792 867 427) or ask me another question!',
                provider: 'fallback',
            },
            { status: 200 }
        );
    }
}
