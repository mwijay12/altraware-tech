'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { goWithWipe, uncoverTransition } from './wipe';

export default function PageWipe() {
    const router = useRouter();
    const pathname = usePathname();
    const first = useRef(true);

    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        uncoverTransition();
    }, [pathname]);

    useEffect(() => {
        const handleGlobalClick = (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (!link || e.defaultPrevented) return;

            const href = link.getAttribute('href');
            if (!href || href.startsWith('//') || href.startsWith('/#') || href.includes('#')) return;
            if (link.getAttribute('target') === '_blank' || link.hasAttribute('download')) return;

            e.preventDefault();
            const label = link.textContent?.trim() || '';
            goWithWipe(router, href, label);
        };

        document.addEventListener('click', handleGlobalClick);
        return () => document.removeEventListener('click', handleGlobalClick);
    }, [router]);

    return (
        <div id="page-transition" aria-hidden="true" className="page-transition-wrap">
            {/* Layer 1: Electric Blue leading slats */}
            <div className="curtain-layer curtain-layer-accent">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="curtain-col curtain-col-accent"
                        style={{ transform: 'scaleY(0)' }}
                    />
                ))}
            </div>

            {/* Layer 2: Deep Obsidian Navy foundation slats */}
            <div className="curtain-layer curtain-layer-navy">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="curtain-col curtain-col-navy"
                        style={{ transform: 'scaleY(0)' }}
                    />
                ))}
            </div>

            {/* Center: Tactile Altraware Brand Showcase */}
            <div id="transitionCenter" className="transition-center">
                <div className="transition-card">
                    <div className="transition-top-pill">
                        <span className="transition-pulse-dot" />
                        <span id="transitionTag" className="transition-tag-text">
                            01 / ROOTS
                        </span>
                    </div>

                    <div className="transition-body">
                        <img
                            src="/assets/altraware/logo.png"
                            alt=""
                            aria-hidden="true"
                            width="64"
                            height="64"
                            style={{ width: '64px', height: '64px', objectFit: 'contain', margin: '0 auto 0.5rem', display: 'block', filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.45))' }}
                        />
                        <div className="transition-brand">
                            <span className="transition-logo-word">ALTRAWARE</span>
                        </div>
                        <div className="transition-dest-wrap">
                            <span id="transitionWord" className="transition-dest-title">
                                ABOUT US
                            </span>
                        </div>
                    </div>

                    <div className="transition-foot">
                        <span id="transitionKicker" className="transition-kicker-text">
                            Two people. Systems that stay.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
