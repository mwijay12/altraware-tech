'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TRANS_CONFIG = {
    '/': { tag: '00 / HOME', dest: 'HOME', kicker: 'Engineering from Dar es Salaam' },
    '/about': { tag: '01 / ROOTS', dest: 'ABOUT US', kicker: 'Two people. Systems that stay.' },
    '/services': { tag: '02 / CRAFT', dest: 'SERVICES', kicker: 'Websites, apps & management tools' },
    '/platforms': { tag: '03 / PLATFORMS', dest: 'PLATFORMS', kicker: 'Faida POS & CareTrack systems' },
    '/work': { tag: '04 / WORK', dest: 'OUR WORK', kicker: 'Selected deployments across Tanzania' },
    '/pricing': { tag: '05 / PRICING', dest: 'PRICING', kicker: 'Fixed packages & clear timelines' },
    '/process': { tag: '06 / PROCESS', dest: 'PROCESS', kicker: 'Discovery, delivery & lifelong support' },
    '/contact': { tag: '07 / CONNECT', dest: "LET'S BUILD", kicker: 'Direct WhatsApp & office support' },
};

let busy = false;
let watchdogTimer = null;

function samePath(href) {
    try {
        const url = new URL(href, window.location.origin);
        return url.pathname === window.location.pathname && url.hash === window.location.hash;
    } catch {
        return false;
    }
}

/** Tear down page-level scroll pins safely.
    revert=true unwraps pin spacers so React can unmount cleanly.
    Layout-level triggers (footer) are spared — they stay mounted across routes. */
function releaseScrollPins() {
    try {
        ScrollTrigger.getAll().forEach((t) => {
            const el = t.trigger;
            if (el && el.closest && el.closest('.main-footer, #page-transition')) return;
            t.kill(true);
        });
    } catch {
        /* noop */
    }
}

/**
 * Creative, cohesive Altraware Page Transition:
 * - 5-column dual-layer tech sweep in site's signature electric & deep blues
 * - Epilogue 900 typography & rounded badge card
 * - Instant scroll reset to top
 * - Fail-safe watchdog so it never freezes
 */
export function goWithWipe(router, href, label) {
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    if (samePath(href)) {
        try {
            const i = href.indexOf('#');
            if (i >= 0 && window.__lenis) {
                const el = document.querySelector(href.slice(i));
                if (el) {
                    window.__lenis.scrollTo(el, { offset: -80, duration: 0.8 });
                    return;
                }
            }
        } catch {
            /* noop */
        }
        router.push(href);
        return;
    }

    if (busy) return;
    busy = true;

    clearTimeout(watchdogTimer);
    releaseScrollPins();

    const overlay = document.getElementById('page-transition');
    const tagEl = document.getElementById('transitionTag');
    const wordEl = document.getElementById('transitionWord');
    const kickerEl = document.getElementById('transitionKicker');
    const cardEl = document.querySelector('.transition-card');

    const cleanPath = href.split('#')[0];
    const data = TRANS_CONFIG[cleanPath] || {
        tag: '01 / EXPLORE',
        dest: (label || 'DISCOVER').toUpperCase(),
        kicker: 'Altraware Technologies · Dar es Salaam'
    };

    if (tagEl) tagEl.textContent = data.tag;
    if (wordEl) wordEl.textContent = data.dest;
    if (kickerEl) kickerEl.textContent = data.kicker;

    overlay?.classList.add('active');

    try {
        router.prefetch?.(href);
    } catch {
        /* noop */
    }

    gsap.killTweensOf(['.curtain-col-accent', '.curtain-col-navy', '#transitionCenter', cardEl]);

    const tl = gsap.timeline();

    // 1. Entrance sweep: Electric blue leads, obsidian navy anchors
    tl.set('.curtain-col-accent, .curtain-col-navy', { transformOrigin: 'bottom' })
        .set('#transitionCenter', { opacity: 1, visibility: 'visible' })
        .set(cardEl, { scale: 0.75, opacity: 0, rotation: -3 })
        .to('.curtain-col-accent', {
            scaleY: 1,
            duration: 0.4,
            stagger: 0.035,
            ease: 'power3.inOut',
        })
        .to(
            '.curtain-col-navy',
            {
                scaleY: 1,
                duration: 0.45,
                stagger: 0.035,
                ease: 'power3.inOut',
            },
            '-=0.34'
        )
        // 2. Center card spring-in with energetic badge bounce
        .to(
            cardEl,
            {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'back.out(2)',
            },
            '-=0.22'
        )
        // 3. Navigate — uncover happens on pathname change (robust
        // against slow compiles), with a watchdog failsafe.
        .add(() => {
            releaseScrollPins();
            router.push(href);
            window.setTimeout(() => {
                if (window.__lenis) {
                    window.__lenis.scrollTo(0, { immediate: true });
                }
                window.scrollTo({ top: 0 });
            }, 60);

            watchdogTimer = setTimeout(() => {
                uncoverTransition();
            }, 3500);
        });
}

/** Play the exit sweep. Called by PageWipe when the new route lands. */
export function uncoverTransition() {
    clearTimeout(watchdogTimer);
    const overlay = document.getElementById('page-transition');
    const cardEl = document.querySelector('.transition-card');
    gsap.timeline({ onComplete: () => { busy = false; } })
        .to(cardEl, {
            opacity: 0,
            scale: 0.95,
            duration: 0.18,
            ease: 'power2.in',
        })
        // 4. Exit sweep: Slats peel upward towards the top of viewport
        .set('.curtain-col-accent, .curtain-col-navy', { transformOrigin: 'top' })
        .to('.curtain-col-navy', {
            scaleY: 0,
            duration: 0.45,
            stagger: 0.035,
            ease: 'expo.inOut',
        })
        .to(
            '.curtain-col-accent',
            {
                scaleY: 0,
                duration: 0.4,
                stagger: 0.035,
                ease: 'expo.inOut',
            },
            '-=0.34'
        )
        .add(() => {
            overlay?.classList.remove('active');
            gsap.set('#transitionCenter', { opacity: 0 });
            gsap.set('.curtain-col-accent, .curtain-col-navy', { scaleY: 0 });
            ScrollTrigger.refresh();
            setTimeout(() => ScrollTrigger.refresh(), 500);
        });
}
