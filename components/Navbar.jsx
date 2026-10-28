'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';
import { useSiteContent } from '@/lib/site-content';
import { goWithWipe } from './wipe';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { contact } = useSiteContent();
    const isHome = pathname === '/';

    const onNav = (e, href, label) => {
        e.preventDefault();
        goWithWipe(router, href, label);
    };

    useEffect(() => {
        const navbar = document.querySelector('.navbar');

        // Initial state
        if (isHome) {
            navbar.classList.add('on-dark');
            navbar.classList.remove('on-light');
        } else {
            navbar.classList.add('on-light');
            navbar.classList.remove('on-dark');
        }

        const updateNavbarColor = () => {
            // Re-query every call: elements from layout.jsx (footer) and nested
            // sections can mount a tick after this effect runs, so caching them
            // once at mount time can silently freeze the color on 'on-dark' forever.
            if (!navbar) return;
            const footerEl = document.querySelector('.main-footer');

            const scrollPos = window.scrollY + navbar.offsetHeight / 2;

            if (!isHome) {
                // On inner pages, stay on-light unless over footer
                const footerTop = footerEl ? footerEl.getBoundingClientRect().top + window.scrollY : Infinity;
                if (scrollPos >= footerTop) {
                    navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
                } else {
                    navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
                }
                return;
            }

            // Homepage logic: white nav over the dark hero, dark ink over the
            // paper sections, white again once the navy footer starts.
            const hero = document.querySelector('#home-hero');
            const heroBottom = hero ? hero.getBoundingClientRect().top + window.scrollY + hero.offsetHeight : 0;
            const footerTop = footerEl ? footerEl.getBoundingClientRect().top + window.scrollY : Infinity;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos < heroBottom - navbar.offsetHeight) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];
        const logoAltraware = document.querySelector('.logo-altraware');
        if (logoAltraware) cleanups.push(initWiggle(logoAltraware, WIGGLE_CONFIG.logoAltraware));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });
                gsap.set(workBox, { visibility: 'visible' });
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();
                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            const fineHover = window.matchMedia('(hover: hover)').matches;
            if (fineHover) {
                navLeft.addEventListener('mouseenter', onEnterLeft);
                navLeft.addEventListener('mouseleave', onLeaveLeft);
                cleanups.push(() => {
                    navLeft.removeEventListener('mouseenter', onEnterLeft);
                    navLeft.removeEventListener('mouseleave', onLeaveLeft);
                });
            } else {
                navLeft.addEventListener('click', (e) => {
                    if (e.target.closest('a')) return;
                    const isVisible = workBox.style.visibility === 'visible';
                    if (isVisible) onLeaveLeft(); else onEnterLeft();
                });
            }
        }

        // ─── Navbar Right (WhatsApp) Hover ───
        const navRight = document.querySelector('.nav-right');
        const waBox = document.querySelector('.nav-wa-box');
        const waSvgPath = document.querySelector('.nav-bar__whatsapp-svg path');
        const waTrigger = navRight ? navRight.querySelector('.nav-hover-trigger') : null;

        if (navRight && waBox) {
            const waInner = waBox.querySelector('.nav-popout-inner');
            const waItems = waInner ? Array.from(waInner.children) : [];
            const waIcon = document.querySelector('.nav-bar__whatsapp-svg');

            gsap.set(waBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const waBoxRect = waBox.getBoundingClientRect();
            const waIconRect = waIcon ? waIcon.getBoundingClientRect() : waBoxRect;
            const waOriginX = (waIconRect.left + waIconRect.width / 2) - waBoxRect.left;
            const waOriginY = (waIconRect.top + waIconRect.height / 2) - waBoxRect.top;
            const waOrigin = `${waOriginX}px ${waOriginY}px`;

            gsap.set(waBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: waOrigin
            });
            gsap.set(waItems, { y: 10, opacity: 0 });

            const onEnterRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                showOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: '#0e6634ff', duration: 0.3 });
                gsap.set(waBox, { visibility: 'visible' });
                gsap.fromTo(waBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                gsap.to(waItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                hideOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: 'currentColor', duration: 0.3 });
                gsap.to(waItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                gsap.to(waBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(waBox, { visibility: 'hidden' })
                });
            };

            const fineHover = window.matchMedia('(hover: hover)').matches;
            if (waTrigger && fineHover) {
                waTrigger.addEventListener('mouseenter', onEnterRight);
                waTrigger.addEventListener('mouseleave', onLeaveRight);
                cleanups.push(() => {
                    waTrigger.removeEventListener('mouseenter', onEnterRight);
                    waTrigger.removeEventListener('mouseleave', onLeaveRight);
                });
            }

            const waLogo = waTrigger ? waTrigger.querySelector('.logo-whatsapp') : null;
            let waPinned = false;
            const onWaTap = (e) => {
                if (e.target.closest('a')) return;
                waPinned = !waPinned;
                if (waPinned) onEnterRight(); else onLeaveRight();
            };
            if (waLogo && !fineHover) {
                waLogo.style.cursor = 'pointer';
                waLogo.addEventListener('click', onWaTap);
                cleanups.push(() => waLogo.removeEventListener('click', onWaTap));
            }
        }

        // ─── Work Item wiggles ───
        const workItemEls = document.querySelectorAll('.nav-work-item');
        workItemEls.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;
            const onItemEnter = () => {
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) wiggleTween.kill();
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) btnWiggle.kill();
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, [isHome, pathname]);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left">
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <img src="/assets/Navbar SVG/nav-work-blob.svg" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" />
                            <span className="logo-work-text">work</span>
                        </div>
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <a href="/work#faida-pos" onClick={(e) => onNav(e, '/work#faida-pos', 'Faida POS')} className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="/assets/tech/icon-pos.png" loading="eager" alt="Faida POS" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-maroon">faida pos</span>
                                        <h4 className="nav-work-title">retail sales, made simple</h4>
                                    </div>
                                </a>
                                <a href="/work#caretrack" onClick={(e) => onNav(e, '/work#caretrack', 'CareTrack')} className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="/assets/tech/icon-apps.png" loading="eager" alt="CareTrack" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">caretrack</span>
                                        <h4 className="nav-work-title">records for care centres</h4>
                                    </div>
                                </a>
                                <a href="/work#shuledirect" onClick={(e) => onNav(e, '/work#shuledirect', 'ShuleDirect')} className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="/assets/tech/icon-cloud.png" loading="eager" alt="ShuleDirect" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">shuledirect</span>
                                        <h4 className="nav-work-title">school system (in development)</h4>
                                    </div>
                                </a>
                                <a href="/work" onClick={(e) => onNav(e, '/work', 'Work')} className="nav-work-btn"><span className="nav-work-btn__text">All our work</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-center" onClick={(e) => onNav(e, '/', 'Home')} style={{ cursor: 'pointer' }}>
                    <span className="logo-truus logo-altraware" data-wiggle-target="true">ALTRAWARE</span>
                </div>
                <div className="nav-right">
                    <button
                        className="nav-menu-btn"
                        onClick={() => window.dispatchEvent(new CustomEvent('km:open'))}
                        aria-label="Open menu"
                    >
                        <span className="nav-menu-btn__text">menu</span>
                        <span className="nav-menu-btn__bars" aria-hidden="true">
                            <i /><i /><i />
                        </span>
                    </button>
                    <div className="nav-hover-trigger">
                        <div className="logo-whatsapp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 25 27" fill="none" className="nav-bar__whatsapp-svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.601 0.986335C11.8021 1.01421 11.8112 1.04366 12.0483 1.04591C12.4513 1.04943 12.8582 1.03181 13.2602 1.04591C14.7297 1.09749 16.3092 1.56281 17.684 2.0713C18.1173 2.2315 18.4074 2.52491 18.7836 2.75782C18.9541 2.86323 19.1764 2.93811 19.3335 3.03712C19.5277 3.15943 19.7215 3.30714 19.9233 3.43555C20.3796 3.7252 20.7523 4.04895 21.1381 4.42383C21.197 4.48126 21.2369 4.59395 21.2729 4.62403C21.314 4.65863 21.388 4.65528 21.4399 4.6963C21.7068 4.90722 22.4207 5.74735 22.6147 6.04298C22.7185 6.20149 22.7985 6.47832 22.9067 6.61329C23.0415 6.7815 23.1644 6.86231 23.2963 7.08692C23.7885 7.92434 24.1902 8.84837 24.4702 9.7793C24.6279 10.304 24.8111 10.9219 24.8608 11.4668C24.9707 12.6708 25.0812 13.7784 24.9155 14.9785C24.8495 15.4578 24.7632 15.9691 24.6469 16.4365C24.4028 17.4173 23.9978 18.3669 23.5952 19.3125L23.5942 19.3154C23.2319 20.1653 22.4331 20.9908 21.8686 21.71C21.6788 21.9518 21.5246 22.1892 21.2797 22.3965C21.0348 22.6037 20.7282 22.768 20.4858 22.9746C20.3515 23.0889 20.2324 23.2615 20.0844 23.3711C19.9297 23.4854 19.7093 23.5536 19.5795 23.6641C18.8674 24.2709 18.4307 24.4852 17.5708 24.8457C16.3894 25.341 15.3983 25.5527 14.143 25.8154C14.0198 25.8414 13.6705 25.8663 13.5473 25.8525C12.9146 25.7827 12.2271 25.9044 11.5727 25.8545C10.0414 25.7376 8.57578 25.2528 7.1401 24.7734C7.00809 24.7291 6.84411 24.5744 6.72701 24.5498C6.36124 24.4742 5.86748 24.7318 5.5151 24.8535C4.11582 25.337 2.69086 25.7679 1.29732 26.2774C1.16321 26.3264 1.01916 26.4488 0.862752 26.4805C0.562812 26.5413 0.382276 26.4893 0.175252 26.2725C-0.0110214 26.0774 -0.0238393 25.8442 0.0414625 25.5899C0.195974 24.988 0.457528 24.3357 0.623494 23.7432C0.689129 23.509 0.689327 23.2415 0.768025 22.9912C0.86868 22.6711 1.01713 22.3593 1.10885 22.0225C1.25986 21.4672 1.50066 20.9638 1.61568 20.3877C1.66507 20.1397 1.73727 19.8129 1.65474 19.5703C1.54703 19.2542 1.22105 18.8061 1.07857 18.4512C0.98014 18.2061 0.960256 17.8824 0.854347 17.618C0.730302 17.3083 0.490795 17.0279 0.383745 16.7118C0.210086 16.1989 0.121966 15.6599 0.0883017 15.1218C0.0326071 14.2312 -0.0187889 13.3323 0.00392376 12.4398C0.0191845 11.8398 0.0524458 11.2338 0.141705 10.6401C0.297926 9.60098 0.547372 8.61868 0.98014 7.66992C1.35012 6.85876 1.83401 6.13098 2.45749 5.50122C3.12521 4.82672 3.91104 4.19519 4.7114 3.59375C5.10931 3.29472 5.53974 3.03741 5.96883 2.78466C6.44478 2.50429 6.94636 2.27218 7.4566 2.05444C8.75618 1.49991 10.1601 1.0658 11.5714 0.990924C11.5813 0.990393 11.5912 0.989862 11.6011 0.989331L11.601 0.986335Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="nav-popout nav-wa-box">
                            <div className="nav-popout-inner">
                                <h4 className="nav-wa-title">whatsapp us</h4>
                                <p className="nav-wa-desc">Fastest reply, Mon–Sat 8:00–18:00 EAT. Tap below to start chatting.</p>
                                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="nav-wa-link">
                                    <span className="nav-wa-link-text">Start chat</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="draw-btn__svg nav-wa-link-svg">
                                        <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                        <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
