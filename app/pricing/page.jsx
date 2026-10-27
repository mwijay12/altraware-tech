import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'Pricing — Altraware Technologies',
    description: 'Fixed packages and written quotes. Web Starter TSh 350,000, Growth Site TSh 550,000, Pro Portal TSh 750,000, apps from TSh 800,000. Support from TSh 99,000/month.',
};

const PACKAGES = [
    {
        tile: 'tile--e', name: 'Web Starter', price: 'TSh 350,000', unit: 'one-time · 1–2 weeks',
        tagline: 'A clean landing page that drives calls and WhatsApp inquiries.',
        features: ['Mobile-first single-page design', 'WhatsApp and phone call triggers', 'Google Maps and local SEO setup', 'Fast loading on 3G', 'Domain setup and SSL'],
    },
    {
        tile: 'tile--a', name: 'Growth Business Site', price: 'TSh 550,000', unit: 'one-time · 2–3 weeks', popular: true,
        tagline: 'A full multi-page site with catalogue, quote forms and local SEO.',
        features: ['4–6 pages: Home, About, Services, Gallery, Contact', 'Product or service catalogue', 'Google Business profile setup', 'Branded company email', 'Analytics and easy updates'],
    },
    {
        tile: 'tile--b', name: 'Pro Web Portal', price: 'TSh 750,000', unit: 'one-time · 2–4 weeks',
        tagline: 'A dynamic portal with database, booking and client logins.',
        features: ['Custom brand design system', 'Booking system or customer portal', 'English and Kiswahili ready', 'Speed optimisation and SSL', '2 months priority support included'],
    },
    {
        tile: 'tile--c', name: 'Custom App / Portal', price: 'From TSh 800,000', unit: 'starting grade · 3–5 weeks',
        tagline: 'An operational web or mobile app shaped around your workflow.',
        features: ['App tailored to your workflow', 'Dashboard and staff roles', 'Database with CSV and PDF reports', 'Works on phones, tablets and desktop', 'Staff training session'],
    },
    {
        tile: 'tile--d', name: 'Faida POS / Mobile App', price: 'From TSh 1,500,000', unit: 'starting grade · 3–5 weeks',
        tagline: 'POS terminal and Android app with offline-first database.',
        features: ['Android APK plus web admin portal', '100% offline with auto sync', 'Thermal receipts and Bluetooth printing', 'Stock alarms and sales reports', 'On-site setup and calibration'],
    },
    {
        tile: 'tile--f', name: 'CareTrack / Enterprise System', price: 'From TSh 3,000,000', unit: 'starting grade · 6–10 weeks',
        tagline: 'A complete system for clinics, care centres and organisations.',
        features: ['Attendance, staff and inventory modules', 'Migration from paper or spreadsheets', 'Encrypted records and audit log', 'Monthly compliance reports', '6-month written SLA'],
    },
];

const SUPPORT = [
    { tile: 'tile--e', name: 'Essential · Tunza', price: 'TSh 99,000/mo', features: ['Hosting, SSL and daily backups', 'Security patches and monitoring', 'WhatsApp support (48h response)'] },
    { tile: 'tile--a', name: 'Growth · Kuza', price: 'TSh 249,000/mo', features: ['Everything in Essential', '4 content and design updates monthly', 'Monthly analytics and speed report', 'Priority WhatsApp channel (12h)'] },
    { tile: 'tile--b', name: 'Partner SLA · Imara', price: 'Custom', features: ['Dedicated engineering hours', 'Feature roadmap and enhancements', 'Regular staff retraining'] },
];

const FAQS = [
    { q: 'How much does a website cost?', a: 'Web Starter is TSh 350,000 (1–2 weeks), Growth Business Site is TSh 550,000, and Pro Web Portal is TSh 750,000. Every project has a written agreement and no hidden surprises.' },
    { q: 'Do your systems work without internet?', a: 'Yes. Faida POS and our custom systems are built offline-first. Staff can sell and record with zero bundles; data syncs automatically when connected.' },
    { q: 'How long does delivery take?', a: 'Websites take 1–2 weeks. Web apps start at 4 weeks, mobile apps at 4–6 weeks, and full business systems at about 6–10 weeks.' },
    { q: 'Do you train our staff?', a: 'Yes. Every system includes hands-on training on-site or by video, plus manuals your team can rewatch anytime.' },
    { q: 'Who owns the code and data?', a: 'You do. Full handover of code, credentials, databases and assets on completion, under a written agreement. No lock-in.' },
];

export default function PricingPage() {
    return (
        <>
            <Navbar />
            <header className="pg-hero pg-hero--pink">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">Pricing · fixed packages</span>
                    <h1 className="pg-hero__title">Fixed packages. <em>Written quotes.</em></h1>
                    <p className="pg-hero__intro">
                        Pick what you need. All prices are starting points — your final figure is fixed in a
                        written quote after a free discovery call.
                    </p>
                </div>
            </header>

            <section className="band band--paper">
                <div className="band__inner">
                    <div className="tiles">
                        {PACKAGES.map((p) => (
                            <div key={p.name} className={`tile ${p.tile}`} style={{ position: 'relative' }}>
                                {p.popular && (
                                    <span className="price-sticker" style={{ position: 'absolute', top: '-1.1rem', right: '1rem', fontSize: '1rem' }}>
                                        POPULAR
                                    </span>
                                )}
                                <h3 style={{ fontSize: '1.4rem' }}>{p.name}</h3>
                                <p className="price-tag" style={{ color: 'inherit', margin: '0.4rem 0' }}>{p.price}</p>
                                <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.unit}</p>
                                <p style={{ marginTop: '0.5rem' }}>{p.tagline}</p>
                                <ul style={{ marginTop: '0.75rem' }}>
                                    {p.features.map((f) => (
                                        <li key={f}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="band band--navy">
                <div className="band__inner">
                    <p className="band__kicker">After launch</p>
                    <h2 className="band__title">Stay supported, from TSh 99,000/mo.</h2>
                    <div className="tiles tiles--3">
                        {SUPPORT.map((s) => (
                            <div key={s.name} className={`tile ${s.tile}`}>
                                <h3>{s.name}</h3>
                                <p className="price-tag" style={{ color: 'inherit', margin: '0.4rem 0' }}>{s.price}</p>
                                <ul style={{ marginTop: '0.5rem' }}>
                                    {s.features.map((f) => (
                                        <li key={f}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="band band--paper">
                <div className="band__inner">
                    <p className="band__kicker">FAQ</p>
                    <h2 className="band__title">Questions, answered.</h2>
                    {FAQS.map((f) => (
                        <details key={f.q} className="faq">
                            <summary>{f.q}</summary>
                            <p className="faq__a">{f.a}</p>
                        </details>
                    ))}
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/contact" className="abtn abtn--pop">Get your written quote</Link>
                        <Link href="/process" className="abtn">How we work</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
