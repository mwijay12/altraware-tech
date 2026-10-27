'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT } from '@/lib/data';

export default function CtaBand() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.cta-band',
                start: 'top 75%',
                toggleActions: 'play none none reverse',
            },
        });

        tl.fromTo(
            '.cta-band__title, .cta-band__sub',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.1 }
        )
            .fromTo(
                '.cta-band__btn',
                { y: 24, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.1 },
                '-=0.5'
            )
            .fromTo(
                '.cta-band__glow',
                { opacity: 0 },
                { opacity: 1, duration: 1.4, ease: 'power2.out' },
                0
            );

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.vars.trigger === '.cta-band') t.kill();
            });
        };
    }, []);

    return (
        <section className="cta-band">
            <div className="cta-band__glow" aria-hidden="true" />
            <div className="cta-band__inner">
                <h2 className="cta-band__title">Ready to build something that works?</h2>
                <p className="cta-band__sub">
                    Tell us what your shop, school or clinic needs — we&apos;ll reply on WhatsApp with next steps.
                </p>
                <div className="cta-band__actions">
                    <a
                        href={CONTACT.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-band__btn cta-band__btn--solid"
                    >
                        Chat on WhatsApp
                    </a>
                    <a href="/pricing" className="cta-band__btn cta-band__btn--ghost">
                        See pricing
                    </a>
                </div>
            </div>
        </section>
    );
}
