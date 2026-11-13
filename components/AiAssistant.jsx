'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CONTACT } from '@/lib/data';

const QUICK = ['How much is a website?', 'Show me Faida POS', 'Do systems work offline?', 'Talk to a human'];

function Bubble({ from, text }) {
    const lines = String(text).split('\n');
    return (
        <div className={`ai-msg ai-msg--${from}`}>
            {lines.map((line, i) => {
                const t = line.trim();
                if (!t) return <div key={i} style={{ height: '0.4rem' }} />;
                const clean = t.replace(/^#{1,4}\s*/, '');
                return <p key={i}>{clean}</p>;
            })}
        </div>
    );
}

export default function AiAssistant() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([
        { from: 'ai', text: 'Hi, I am Altra! Ask me about our websites, apps, Faida POS, CareTrack or pricing.' },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bodyRef = useRef(null);
    const [ready, setReady] = useState(false);
    const [hideFab, setHideFab] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const show = () => setReady(true);
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            window.requestIdleCallback(show);
        } else {
            const t = setTimeout(show, 800);
            return () => clearTimeout(t);
        }
    }, []);

    // On small screens, keep the floating launcher away from the hero buttons.
    useEffect(() => {
        setHideFab(false);
        const actions = document.querySelector('.vimeo-hero__cta-row');
        if (!actions || !('IntersectionObserver' in window)) return;
        const media = window.matchMedia('(max-width: 768px)');
        const observer = new IntersectionObserver(([entry]) => {
            setHideFab(media.matches && entry.isIntersecting);
        }, { threshold: 0 });
        observer.observe(actions);
        const update = () => {
            if (!media.matches) setHideFab(false);
            else {
                const rect = actions.getBoundingClientRect();
                setHideFab(rect.bottom > 0 && rect.top < window.innerHeight);
            }
        };
        media.addEventListener('change', update);
        return () => { observer.disconnect(); media.removeEventListener('change', update); };
    }, [pathname]);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [msgs, typing, open]);

    const send = async (raw) => {
        const text = (raw ?? input).trim();
        if (!text || typing) return;
        setInput('');
        const next = [...msgs, { from: 'user', text }];
        setMsgs(next);
        setTyping(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    history: next.slice(-7, -1),
                }),
            });
            const data = await res.json();
            setMsgs((m) => [...m, { from: 'ai', text: data.reply || 'Sorry — try again or WhatsApp us!' }]);
        } catch {
            setMsgs((m) => [...m, { from: 'ai', text: 'Network hiccup. WhatsApp us on +255 792 867 427!' }]);
        }
        setTyping(false);
    };

    if (!ready) return null;

    return (
        <div className="ai-root">
            {open && (
                <div
                    className="ai-panel"
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    <div className="ai-head">
                        <span className="ai-dot" />
                        <div>
                            <strong>Altra</strong>
                            <span>Altraware assistant</span>
                        </div>
                        <button className="ai-x" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
                    </div>
                    <div className="ai-body" ref={bodyRef}>
                        {msgs.map((m, i) => (
                            <Bubble key={i} from={m.from} text={m.text} />
                        ))}
                        {typing && <div className="ai-msg ai-msg--ai ai-typing">…</div>}
                    </div>
                    <div className="ai-quick">
                        {QUICK.map((q) => (
                            <button key={q} onClick={() => send(q)}>{q}</button>
                        ))}
                    </div>
                    <form
                        className="ai-input"
                        onSubmit={(e) => {
                            e.preventDefault();
                            send();
                        }}
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about websites, apps, pricing…"
                            aria-label="Ask Altra"
                        />
                        <button type="submit" aria-label="Send">↑</button>
                    </form>
                    <a className="ai-wa" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                        Prefer human? WhatsApp us →
                    </a>
                </div>
            )}
            {!open && !hideFab && (
                <button className="ai-fab" onClick={() => setOpen(true)} aria-label="Chat with Altra">
                    <span className="ai-fab-dot" />
                    <span className="ai-fab-label">Ask Altra</span>
                </button>
            )}
        </div>
    );
}
