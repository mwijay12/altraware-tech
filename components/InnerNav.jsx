'use client';

import { useRouter } from 'next/navigation';
import { goWithWipe } from './wipe';

const LINKS = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/platforms', label: 'Platforms' },
    { href: '/work', label: 'Work' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/process', label: 'Process' },
    { href: '/contact', label: 'Contact' },
];

export default function InnerNav() {
    const router = useRouter();

    const onNav = (e, href, label) => {
        e.preventDefault();
        goWithWipe(router, href, label);
    };

    return (
        <nav className="inner-nav" aria-label="Pages">
            <a
                href="/"
                className="inner-nav__logo"
                onClick={(e) => onNav(e, '/', 'Home')}
            >
                <img src="/assets/altraware/logo.png" alt="Altraware logo" />
                <span>ALTRAWARE</span>
            </a>
            <div className="inner-nav__links">
                {LINKS.map((l) => (
                    <a key={l.href} href={l.href} onClick={(e) => onNav(e, l.href, l.label)}>
                        {l.label}
                    </a>
                ))}
                <button
                    className="inner-nav__menu-btn"
                    onClick={() => window.dispatchEvent(new CustomEvent('km:open'))}
                    aria-label="Open menu"
                >
                    Menu
                </button>
            </div>
        </nav>
    );
}
