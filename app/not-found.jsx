import Link from 'next/link';
import InnerNav from '@/components/InnerNav';

export const metadata = {
    title: 'Page not found — Altraware Technologies',
    description: 'This page does not exist. Back to Altraware Technologies: websites, apps and business systems in Tanzania.',
};

export default function NotFound() {
    return (
        <>
            <InnerNav />
            <header className="pg-hero pg-hero--navy">
                <div className="pg-hero__inner" style={{ textAlign: 'center' }}>
                    <span className="pg-hero__badge">404 · wrong turn</span>
                    <h1 className="pg-hero__title" style={{ fontSize: 'clamp(4rem, 14vw, 9rem)' }}>404</h1>
                    <p className="pg-hero__title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', marginTop: '0.5rem' }}>
                        Pole — this page <em>went offline.</em>
                    </p>
                    <p className="pg-hero__intro" style={{ margin: '1.25rem auto 0' }}>
                        The link is broken or the page moved. Our systems have 99% uptime (estimate) —
                        this missing page is the 1%. Let’s get you back.
                    </p>
                    <div className="pg-hero__art" style={{ justifyContent: 'center' }}>
                        <figure className="pg-art pg-art--l">
                            <img src="/assets/work/faidahq.png" alt="Faida POS terminal" loading="lazy" />
                            <figcaption>Meanwhile: Faida POS, still running</figcaption>
                        </figure>
                    </div>
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Link href="/" className="abtn abtn--pop">Back home</Link>
                        <Link href="/work" className="abtn abtn--light">See our work</Link>
                        <Link href="/contact" className="abtn abtn--light">Start a project</Link>
                    </div>
                </div>
            </header>

            <section className="band band--paper">
                <div className="band__inner" style={{ textAlign: 'center' }}>
                    <p className="band__kicker">Popular destinations</p>
                    <div className="tagrow" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                        <Link href="/about" className="tag" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
                        <Link href="/services" className="tag" style={{ textDecoration: 'none', color: 'inherit' }}>Services</Link>
                        <Link href="/platforms" className="tag" style={{ textDecoration: 'none', color: 'inherit' }}>Platforms</Link>
                        <Link href="/pricing" className="tag" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</Link>
                        <Link href="/process" className="tag" style={{ textDecoration: 'none', color: 'inherit' }}>Process</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
