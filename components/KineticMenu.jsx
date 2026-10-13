'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useSiteContent } from '@/lib/site-content';
import { goWithWipe } from './wipe';

const LINKS = [
    { href: '/', label: 'Home', shape: '1', note: 'Start here' },
    { href: '/about', label: 'About', shape: '2', note: 'Roots & team' },
    { href: '/services', label: 'Services', shape: '3', note: 'What we build' },
    { href: '/platforms', label: 'Platforms', shape: '4', note: 'Touch the software' },
    { href: '/work', label: 'Work', shape: '5', note: 'Case studies' },
    { href: '/pricing', label: 'Pricing', shape: '1', note: 'Fixed packages' },
    { href: '/process', label: 'Process', shape: '2', note: 'How we work' },
    { href: '/contact', label: 'Contact', shape: '3', note: "Let's build" },
];

/**
 * Fullscreen kinetic menu (adapted to this codebase: JSX + vanilla CSS).
 * Opened from the home navbar and inner nav via `window.dispatchEvent(new CustomEvent('km:open'))`.
 * Links navigate through the curtain transition.
 */
export default function KineticMenu() {
    const containerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { contact } = useSiteContent();
    const pathname = usePathname();

    // Open on global event; close on Escape + route change.
    useEffect(() => {
        const open = () => setIsMenuOpen(true);
        window.addEventListener('km:open', open);
        return () => window.removeEventListener('km:open', open);
    }, []);

    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Lock page scroll while open.
    useEffect(() => {
        const lenis = window.__lenis;
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            if (lenis && lenis.stop) lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (lenis && lenis.start) lenis.start();
        }
    }, [isMenuOpen]);

    // Shape hover play.
    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            const menuItems = containerRef.current.querySelectorAll('.km-item[data-shape]');
            const shapesBox = containerRef.current.querySelector('.km-shapes');
            menuItems.forEach((item) => {
                const shape = shapesBox
                    ? shapesBox.querySelector(`.km-shape-${item.getAttribute('data-shape')}`)
                    : null;
                if (!shape) return;
                const els = shape.querySelectorAll('.km-shape-el');
                const onEnter = () => {
                    shapesBox.querySelectorAll('.km-shape').forEach((s) => s.classList.remove('active'));
                    shape.classList.add('active');
                    gsap.fromTo(
                        els,
                        { scale: 0.5, opacity: 0, rotation: -10 },
                        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)', overwrite: 'auto' }
                    );
                };
                const onLeave = () => {
                    gsap.to(els, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => shape.classList.remove('active'),
                        overwrite: 'auto',
                    });
                };
                item.addEventListener('mouseenter', onEnter);
                item.addEventListener('mouseleave', onLeave);
                item._kmCleanup = () => {
                    item.removeEventListener('mouseenter', onEnter);
                    item.removeEventListener('mouseleave', onLeave);
                };
            });
        }, containerRef);
        return () => {
            ctx.revert();
            if (containerRef.current) {
                containerRef.current
                    .querySelectorAll('.km-item[data-shape]')
                    .forEach((item) => item._kmCleanup && item._kmCleanup());
            }
        };
    }, []);

    // Open / close choreography.
    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            const wrap = containerRef.current.querySelector('.km-wrap');
            const overlay = containerRef.current.querySelector('.km-overlay');
            const panels = containerRef.current.querySelectorAll('.km-panel');
            const links = containerRef.current.querySelectorAll('.km-link');
            const fades = containerRef.current.querySelectorAll('[data-km-fade]');
            const tl = gsap.timeline();
            if (isMenuOpen) {
                tl.set(wrap, { display: 'block' })
                    .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
                    .fromTo(panels, { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.575 }, '<')
                    .fromTo(links, { yPercent: 140, rotate: 8 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, '<+=0.35');
                if (fades.length) {
                    tl.fromTo(fades, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.06, clearProps: 'all' }, '<+=0.2');
                }
            } else {
                tl.to(overlay, { autoAlpha: 0, duration: 0.3 })
                    .to(panels, { xPercent: 101, duration: 0.4, ease: 'power3.in', stagger: 0.06 }, '<')
                    .set(wrap, { display: 'none' });
            }
        }, containerRef);
        return () => ctx.revert();
    }, [isMenuOpen]);

    const go = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false);
        window.setTimeout(() => goWithWipe(router, href), 120);
    };

    return (
        <div ref={containerRef} className="km-root" aria-hidden={!isMenuOpen}>
            <div data-nav={isMenuOpen ? 'open' : 'closed'} className="km-wrap">
                <div className="km-overlay" onClick={() => setIsMenuOpen(false)} />
                <nav className="km-menu">
                    <div className="km-bg">
                        <div className="km-panel first" />
                        <div className="km-panel second" />
                        <div className="km-panel" />
                        <div className="km-shapes" aria-hidden="true">
                            <svg className="km-shape km-shape-1" viewBox="0 0 400 400" fill="none">
                                <circle className="km-shape-el" cx="80" cy="120" r="40" fill="rgba(91,156,255,0.35)" />
                                <circle className="km-shape-el" cx="300" cy="80" r="60" fill="rgba(47,123,255,0.3)" />
                                <circle className="km-shape-el" cx="200" cy="300" r="80" fill="rgba(255,255,255,0.22)" />
                                <circle className="km-shape-el" cx="350" cy="280" r="30" fill="rgba(91,156,255,0.4)" />
                            </svg>
                            <svg className="km-shape km-shape-2" viewBox="0 0 400 400" fill="none">
                                <path className="km-shape-el" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(91,156,255,0.5)" strokeWidth="60" fill="none" />
                                <path className="km-shape-el" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(255,255,255,0.35)" strokeWidth="40" fill="none" />
                            </svg>
                            <svg className="km-shape km-shape-3" viewBox="0 0 400 400" fill="none">
                                {[
                                    [50, 50, 8], [150, 50, 8], [250, 50, 8], [350, 50, 8],
                                    [100, 150, 12], [200, 150, 12], [300, 150, 12],
                                    [50, 250, 10], [150, 250, 10], [250, 250, 10], [350, 250, 10],
                                    [100, 350, 6], [200, 350, 6], [300, 350, 6],
                                ].map(([cx, cy, r], i) => (
                                    <circle key={i} className="km-shape-el" cx={cx} cy={cy} r={r} fill={i % 2 ? 'rgba(255,255,255,0.5)' : 'rgba(91,156,255,0.55)'} />
                                ))}
                            </svg>
                            <svg className="km-shape km-shape-4" viewBox="0 0 400 400" fill="none">
                                <path className="km-shape-el" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(91,156,255,0.3)" />
                                <path className="km-shape-el" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(255,255,255,0.25)" />
                            </svg>
                            <svg className="km-shape km-shape-5" viewBox="0 0 400 400" fill="none">
                                <line className="km-shape-el" x1="0" y1="100" x2="300" y2="400" stroke="rgba(91,156,255,0.4)" strokeWidth="30" />
                                <line className="km-shape-el" x1="100" y1="0" x2="400" y2="300" stroke="rgba(255,255,255,0.3)" strokeWidth="25" />
                                <line className="km-shape-el" x1="200" y1="0" x2="400" y2="200" stroke="rgba(47,123,255,0.35)" strokeWidth="20" />
                            </svg>
                        </div>
                    </div>

                    <div className="km-head">
                        <span className="km-brand">ALTRAWARE</span>
                        <button className="km-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                            <span>Close</span>
                            <svg viewBox="0 0 16 16" fill="none" className="km-close-icon" width="14" height="14">
                                <path d="M7.33 16V0h1.34v16H7.33Z" fill="currentColor" />
                                <path d="M16 8.67H0V7.33h16v1.34Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>

                    <div className="km-body">
                        <ul className="km-list">
                            {LINKS.map((l) => (
                                <li key={l.href} className="km-item" data-shape={l.shape}>
                                    <a href={l.href} className="km-link" onClick={(e) => go(e, l.href)}>
                                        <span className="km-link-text">{l.label}</span>
                                        <span className="km-link-note">{l.note}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="km-side" data-km-fade>
                            <p className="km-side-kicker">Start a project</p>
                            <a
                                href={contact.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="km-wa"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4Zm-3.2 3.9c-.2 0-.4 0-.6.2-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.2 1.7 2.7 4.2 3.6 2 .8 2.5.6 3 .6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1 0-.1-.4-.2-.8-.3l-1.9-.9c-.3-.1-.5-.2-.7 0l-.9 1c-.2.2-.3.2-.6.1a7.6 7.6 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L8.9 8c-.2-.4-.4-.4-.7-.4Z" />
                                </svg>
                                <span>{contact.phonePrimary}</span>
                            </a>
                            <a href={`mailto:${contact.email}`} className="km-mail" onClick={() => setIsMenuOpen(false)}>
                                {contact.email}
                            </a>
                            <p className="km-hours">{contact.address} · {contact.hours}</p>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
