'use client';

import { useEffect, useRef } from 'react';
import { whenPageVisible } from '@/lib/page-motion';

/** Animate a simple numeric value once when it enters view, preserving its suffix. */
export default function CountUp({ value, className = '' }) {
    const displayRef = useRef(null);
    const text = String(value);

    useEffect(() => {
        const el = displayRef.current;
        const parts = text.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!el || !parts || motion.matches || !('IntersectionObserver' in window)) return;

        const [, prefix, number, suffix] = parts;
        const target = Number(number);
        const decimals = (number.split('.')[1] || '').length;
        let frame = 0;
        let started = false;
        let startTime;

        const finish = () => {
            cancelAnimationFrame(frame);
            el.textContent = text;
        };
        const tick = (time) => {
            if (startTime === undefined) startTime = time;
            const progress = Math.min((time - startTime) / 1500, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
            if (progress < 1) frame = requestAnimationFrame(tick);
            else el.textContent = text;
        };
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || started) return;
            started = true;
            observer.disconnect();
            frame = requestAnimationFrame(tick);
        }, { threshold: 0.3 });
        const cancelWait = whenPageVisible(() => observer.observe(el));

        const onMotionChange = (event) => {
            if (event.matches) {
                cancelWait();
                observer.disconnect();
                finish();
            }
        };
        motion.addEventListener('change', onMotionChange);
        return () => {
            observer.disconnect();
            cancelWait();
            motion.removeEventListener('change', onMotionChange);
            finish();
        };
    }, [text]);

    return (
        <span className={`${className} count-up`}>
            <span className="count-up__measure" aria-hidden="true">{text}</span>
            <span ref={displayRef} className="count-up__display" aria-hidden="true">{text}</span>
            <span className="count-up__accessible">{text}</span>
        </span>
    );
}
