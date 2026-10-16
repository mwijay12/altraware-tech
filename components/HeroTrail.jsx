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
        const hero = layer.parentElement;
        if (!hero) return;

        const imgs = Array.from(layer.querySelectorAll('img'));
        let idx = 0;
        let lastX = -9999;
        let lastY = -9999;

        const spawnAt = (clientX, clientY) => {
            const dx = clientX - lastX;
            const dy = clientY - lastY;
            if (Math.hypot(dx, dy) < (window.matchMedia('(hover: none)').matches ? 50 : 90)) return;
            lastX = clientX;
            lastY = clientY;
            const r = layer.getBoundingClientRect();
            const img = imgs[idx % imgs.length];
            idx += 1;
            img.style.left = `${clientX - r.left}px`;
            img.style.top = `${clientY - r.top}px`;
            img.style.transform = `translate(-50%, -50%) rotate(${(Math.random() * 24 - 12).toFixed(1)}deg) scale(1)`;
            img.dataset.status = 'active';
            clearTimeout(img._hide);
            img._hide = setTimeout(() => {
                img.dataset.status = 'inactive';
                img.style.transform = 'translate(-50%, -50%) scale(0)';
            }, 1200);
        };

        const onMove = (e) => spawnAt(e.clientX, e.clientY);
        const onTouch = (e) => {
            if (e.touches && e.touches[0]) {
                spawnAt(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        hero.addEventListener('mousemove', onMove);
        hero.addEventListener('touchmove', onTouch, { passive: true });
        hero.addEventListener('touchstart', onTouch, { passive: true });

        return () => {
            hero.removeEventListener('mousemove', onMove);
            hero.removeEventListener('touchmove', onTouch);
            hero.removeEventListener('touchstart', onTouch);
        };
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
