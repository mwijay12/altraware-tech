'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import HeroTrail from '@/components/HeroTrail';
import { useSiteContent } from '@/lib/site-content';
import { CONTACT } from '@/lib/data';

export default function VimeoHero() {
    const { hero } = useSiteContent();
    const lineA = (hero.lineA || '').split(' ').filter(Boolean);
    const lineB = (hero.lineB || '').split(' ').filter(Boolean);
    const lineC = (hero.lineC || '').split(' ').filter(Boolean);

    // Static hero (no video yet): headline entrance + project-pic mousetrail.

    /* ─── Entrance: headline words rise, decorations pop ─── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
            tl.fromTo(
                '.vimeo-hero__word',
                { y: 70, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.1, stagger: 0.07 }
            )
                .fromTo(
                    '.home-header__smiley',
                    { scale: 0, rotation: -40 },
                    { scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.8)' },
                    '-=0.7'
                )
                .fromTo(
                    '.home-header__star',
                    { scale: 0, rotation: 40, yPercent: -50 },
                    { scale: 1, rotation: 0, yPercent: -50, duration: 0.9, ease: 'back.out(1.8)' },
                    '-=0.7'
                )
                .fromTo(
                    '.home-header__title-line-svg',
                    { opacity: 0, scaleX: 0, xPercent: -50, yPercent: -50 },
                    { opacity: 1, scaleX: 1, xPercent: -50, yPercent: -50, duration: 0.8 },
                    '-=0.5'
                )
                .fromTo(
                    '.vimeo-hero__location',
                    { y: -16, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=1.2'
                )
                .fromTo(
                    '.vimeo-hero__cta-row .vimeo-hero__cta-btn',
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                    '-=0.3'
                )
                .fromTo(
                    '.vimeo-hero__features li',
                    { y: 16, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
                    '-=0.5'
                );
        });
        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* ── Main hero container ── */}
            <div className="vimeo-hero">
                {/* 
                  Video Placeholder: 
                  Currently left blank to display a solid black background while you work on text, SVGs, and the navbar.
                  Once you have your personal video file in the `public/` folder, uncomment and update the src below!
                */}
                <video
                    // src="/your-personal-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="vimeo-hero__iframe"
                    style={{ objectFit: 'cover', backgroundColor: '#0b2545' }}
                />

                {/* Gradient + grid texture overlay (desktop polish) */}
                <div className="vimeo-hero__texture" aria-hidden="true" />

                {/* Gradient fade */}
                <div className="vimeo-hero__fade" />

                {/* Location chip */}
                <div className="vimeo-hero__location">
                    <span className="vimeo-hero__location-dot" />
                    Dar es Salaam · Tanzania
                </div>

                {/* Project-pic mousetrail */}
                <HeroTrail />

                {/* ① Headline — rendered from site content (editable in /admin) */}
                <div className="home-header__title">
                    <h1 className="vimeo-hero__title">
                        {lineA.map((w, i) => (
                            <span key={`a-${i}`} className="vimeo-hero__word is--relative">
                                <span>{w} </span>
                                {i === lineA.length - 1 && (
                                    <div className="home-header__smiley">
                                        <img
                                            src="/assets/VimeoHero SVG/smiley-face.svg"
                                            alt=""
                                            className="home-header__smiley-svg"
                                        />
                                    </div>
                                )}
                            </span>
                        ))}

                        <div style={{ flexBasis: '100%', height: 0 }} />

                        {lineB.map((w, i) => (
                            <span key={`b-${i}`} className="vimeo-hero__word">{w} </span>
                        ))}

                        {lineC.map((w, i) => (
                            <span key={`c-${i}`} className="vimeo-hero__word is--relative">
                                {i === 0 && (
                                    <div className="home-header__star">
                                        <div className="home-header__star-inner">
                                            <img
                                                src="/assets/VimeoHero SVG/pink-star.svg"
                                                alt=""
                                                className="home-header__star-svg"
                                            />
                                        </div>
                                    </div>
                                )}
                                {i === 0 && (
                                    <img
                                        src="/assets/VimeoHero SVG/oval-underline.svg"
                                        alt=""
                                        className="home-header__title-line-svg"
                                    />
                                )}
                                <span>{w}{i < lineC.length - 1 ? ' ' : ''}</span>
                            </span>
                        ))}

                    </h1>
                </div>

                {/* ② Feature chips + CTA buttons (desktop polish) */}
                <div className="vimeo-hero__bottom-row">
                    <ul className="vimeo-hero__features">
                        <li>M-Pesa ready</li>
                        <li>Kiswahili &amp; English</li>
                        <li>Offline-friendly</li>
                    </ul>
                    <div className="vimeo-hero__cta-row">
                        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="vimeo-hero__cta-btn vimeo-hero__cta-btn--solid">
                            Start a project
                        </a>
                        <a href="/work" className="vimeo-hero__cta-btn vimeo-hero__cta-btn--ghost">
                            See our work
                        </a>
                    </div>
                </div>

                {/* Loading spinner removed because native HTML video loads silently in background */}
            </div>
        </>
    );
}
