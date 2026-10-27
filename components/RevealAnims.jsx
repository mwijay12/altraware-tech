'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll + entrance reveals across the whole site.
 * - Hero blocks animate in on page load.
 * - Tiles fade (opacity only — they have CSS hover transforms).
 * - Plain blocks rise up as they enter the viewport.
 */
const FADE = ['.tile', '.price-sticker'];
const RISE = [
    '.shot',
    '.bubble',
    '.work-case',
    'details.faq',
    '.stats-band__item',
    '.contact-card',
    '.products__card',
    '.pg-art',
    '.motion-card__footer-text',
    '.showreel__content',
    '.horizontal-words__bottom-text',
];

export default function RevealAnims() {
    const pathname = usePathname();

    // Recalc triggers as images/fonts settle (capture phase catches <img> loads).
    useEffect(() => {
        const refresh = () => ScrollTrigger.refresh();
        document.addEventListener('load', refresh, true);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
        }
        return () => document.removeEventListener('load', refresh, true);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance: hero content on every page load.
            const heroBits = document.querySelectorAll(
                '.pg-hero__inner > *, .work-page__inner > *:not(.work-cases):not(.products__grid)'
            );
            if (heroBits.length) {
                gsap.fromTo(
                    heroBits,
                    { y: 44, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08, overwrite: 'auto' }
                );
            }

            // Scroll: gentle fades (no transform fights).
            FADE.forEach((sel) => {
                gsap.utils.toArray(sel).forEach((el) => {
                    gsap.fromTo(
                        el,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 0.7,
                            ease: 'power2.out',
                            overwrite: 'auto',
                            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                        }
                    );
                });
            });

            // Scroll: rise + fade for plain blocks.
            RISE.forEach((sel) => {
                gsap.utils.toArray(sel).forEach((el) => {
                    gsap.fromTo(
                        el,
                        { y: 56, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: 'expo.out',
                            overwrite: 'auto',
                            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                        }
                    );
                });
            });

            ScrollTrigger.refresh();
        });

        return () => ctx.revert();
    }, [pathname]);

    return null;
}
