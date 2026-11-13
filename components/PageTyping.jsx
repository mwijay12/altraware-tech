'use client';

import { useEffect, useState } from 'react';
import { whenPageVisible } from '@/lib/page-motion';

/** A compact typing accent; the full text is always present for assistive tech. */
export default function PageTyping({ text }) {
    const [playing, setPlaying] = useState(false);
    useEffect(() => whenPageVisible(() => setPlaying(true)), []);
    return (
        <p className={`page-typing${playing ? ' page-typing--play' : ''}`}>
            <span className="page-typing__prompt" aria-hidden="true">&gt;_</span>
            <span className="page-typing__line" style={{ '--typing-steps': text.length }}>
                <span className="page-typing__text">{text}</span>
                <span className="page-typing__caret" aria-hidden="true" />
            </span>
        </p>
    );
}
