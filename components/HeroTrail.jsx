'use client';

import { useEffect, useRef } from 'react';

const SHOTS = [
    { src: '/assets/work/faidahq.png', alt: 'Faida POS' },
    { src: '/assets/work/uautconnect.png', alt: 'UAUT Connect' },
    { src: '/assets/work/bongofoodie.png', alt: 'Bongo Foodie' },
    { src: '/assets/work/audenic.png', alt: 'Audenic' },
    { src: '/assets/work/tz-reach.png', alt: 'TZ Reach' },
    { src: '/assets/work/aymi.png', alt: 'AYMI Africa' },
];

/**
 * Project-pic mousetrail for the hero (vanilla adaptation:
 * this codebase is JSX + vanilla CSS, no Tailwind/shadcn/TS).
 * Images pop up where the cursor travels, then fade away.
 * Disabled on touch devices.
 */
export default function HeroTrail() {
    const layerRef = useRef(null);

    useEffect(() => {
        const layer = layerRef.current;
        if (!layer) return;
        if (window.matchMedia('(hover: none)').matches) return;
        const hero = layer.parentElement;
        if (!hero) return;

        const imgs = Array.from(layer.querySelectorAll('img'));
        let idx = 0;
        let lastX = -9999;
        let lastY = -9999;

        const onMove = (e) => {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            if (Math.hypot(dx, dy) < 90) return;
            lastX = e.clientX;
            lastY = e.clientY;
            const r = layer.getBoundingClientRect();
            const img = imgs[idx % imgs.length];
            idx += 1;
            img.style.left = `${e.clientX - r.left}px`;
            img.style.top = `${e.clientY - r.top}px`;
            img.style.transform = `translate(-50%, -50%) rotate(${(Math.random() * 24 - 12).toFixed(1)}deg) scale(1)`;
            img.dataset.status = 'active';
            clearTimeout(img._hide);
            img._hide = setTimeout(() => {
                img.dataset.status = 'inactive';
                img.style.transform = 'translate(-50%, -50%) scale(0)';
            }, 900);
        };

        hero.addEventListener('mousemove', onMove);
        return () => hero.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <div ref={layerRef} className="hero-trail" aria-hidden="true">
            {SHOTS.map((s) => (
                <img
                    key={s.src}
                    src={s.src}
                    alt=""
                    loading="lazy"
                    data-status="inactive"
                />
            ))}
        </div>
    );
}
