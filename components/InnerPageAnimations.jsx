'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { whenPageVisible } from '@/lib/page-motion';

/** Gentle, once-only reveals for public inner pages, without moving their layout. */
export default function InnerPageAnimations() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/' || pathname.startsWith('/admin')) return;
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            let observer;
            let mutations;
            let context;
            let cancelWait = () => {};
            cancelWait = whenPageVisible(() => {
                const selectors = [
                    '.pg-hero__badge', '.pg-hero__title', '.pg-hero__intro',
                    '.work-page__kicker', '.work-page__title', '.work-page__intro',
                    '.band__kicker', '.band__title', '.band__inner > p:not(.band__kicker)',
                    '.tile', '.shot', '.pg-art', '.bubble', '.stats-band__item',
                    '.faq', '.map-embed', '.work-page__cta', '.price-tag',
                ];
                const selector = selectors.join(',');
                const observed = new WeakSet();
                // Everything remains visible by default if JS or IntersectionObserver is unavailable.
                if (!('IntersectionObserver' in window)) return;
                context = gsap.context(() => {
                    observer = new IntersectionObserver((entries) => {
                        entries.forEach(({ target, isIntersecting }) => {
                            if (!isIntersecting) return;
                            observer.unobserve(target);
                            // Opacity only: avoid shifting cards, headings or controls on mobile.
                            context.add(() => gsap.fromTo(target, { opacity: 0.45 }, {
                                opacity: 1, duration: 0.7, ease: 'power2.out', overwrite: 'auto',
                                clearProps: 'opacity',
                            }));
                        });
                    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
                    const observe = (root) => {
                        if (root.nodeType !== Node.ELEMENT_NODE) return;
                        const elements = root.matches(selector) ? [root] : [];
                        root.querySelectorAll(selector).forEach((element) => elements.push(element));
                        elements.forEach((element) => {
                            if (!observed.has(element)) {
                                observed.add(element);
                                observer.observe(element);
                            }
                        });
                    };
                    observe(document.body);
                    // Blog entries can arrive from the content provider after the route mounts.
                    mutations = new MutationObserver((records) => records.forEach((record) =>
                        record.addedNodes.forEach(observe)
                    ));
                    mutations.observe(document.body, { childList: true, subtree: true });
                });
            });
            return () => {
                cancelWait();
                observer?.disconnect();
                mutations?.disconnect();
                context?.revert();
            };
        });
        return () => media.revert();
    }, [pathname]);
    return null;
}
