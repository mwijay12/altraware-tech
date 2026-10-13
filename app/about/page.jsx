import Link from 'next/link';
import InnerNav from '@/components/InnerNav';

export const metadata = {
    title: 'About — Altraware Technologies',
    description: 'Altraware Technology is a Tanzanian software company based in Dar es Salaam, founded by David Mwijage and Clemence Ng’unda. Websites, apps and management systems with long-term support.',
};

const VALUES = [
    { tile: 'tile--a', title: 'Local insight', body: 'Mobile money, Kiswahili and the realities our clients work in.' },
    { tile: 'tile--b', title: 'Clear process', body: 'Fixed packages, defined timelines and written agreements.' },
    { tile: 'tile--c', title: 'Long-term support', body: 'Hosting, updates and maintenance after delivery.' },
    { tile: 'tile--d', title: 'Privacy-minded engineering', body: 'We collect only the data a system genuinely needs.' },
];

const TESTIMONIALS = [
    {
        quote: 'Altraware didn’t just build our website — they taught us to read our own numbers. Bookings doubled in three months.',
        name: 'Sarah Kimaro',
        role: 'Serene Salon & Spa · Masaki',
    },
    {
        quote: 'CareTrack changed our mornings. Attendance takes minutes, and parents get an SMS the moment their child arrives.',
        name: 'Joyce Mushi',
        role: 'Director · Tumaini Care Centre',
    },
    {
        quote: 'Fees collection used to take weeks of chasing. Now guardians pay by M-Pesa and receipts send themselves.',
        name: 'Pastor Peter Lyimo',
        role: 'Administrator · Grace Schools, Arusha',
    },
];

export default function AboutPage() {
    return (
        <>
            <InnerNav />
            <header className="pg-hero">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">About · Roots</span>
                    <h1 className="pg-hero__title">Rooted at home. <em>Built for the world.</em></h1>
                    <p className="pg-hero__intro">
                        Altraware Technology is a Tanzanian software company based in Dar es Salaam. We design
                        and build websites, web and mobile apps, and management systems for small businesses,
                        schools, care centres and NGOs — combining mobile payments and Kiswahili with modern
                        engineering and practical, long-term support.
                    </p>
                    <div className="stats-band">
                        <div className="stats-band__item">
                            <span className="stats-band__value">15+</span>
                            <span className="stats-band__label">projects and platform deployments</span>
                        </div>
                        <div className="stats-band__item">
                            <span className="stats-band__value">≈99%</span>
                            <span className="stats-band__label">average platform uptime (estimate)</span>
                        </div>
                        <div className="stats-band__item">
                            <span className="stats-band__value">Mon–Sat</span>
                            <span className="stats-band__label">WhatsApp support, 8:00–18:00 EAT</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="band band--paper">
                <div className="band__inner">
                    <p className="band__kicker">Founders</p>
                    <h2 className="band__title">Two people. One promise: systems that stay.</h2>
                    <div className="tiles">
                        <div className="tile tile--e">
                            <img src="/assets/team/david.jpg" alt="David Mwijage" className="founder-photo" loading="lazy" />
                            <h3 style={{ marginTop: '0.75rem' }}>David Mwijage</h3>
                            <p><strong>Co-founder · Engineering &amp; Architecture.</strong> Leads system architecture, core engineering practice and offline-first product development.</p>
                        </div>
                        <div className="tile tile--e">
                            <img
                                src="https://res.cloudinary.com/oc8018um/image/upload/f_auto,q_auto,w_400/v1791497528/Clemence.png"
                                alt="Clemence Ng’unda"
                                className="founder-photo"
                                loading="lazy"
                            />
                            <h3 style={{ marginTop: '0.75rem' }}>Clemence Ng’unda</h3>
                            <p><strong>Co-founder · Product &amp; Business Operations.</strong> Leads client engagement, product direction and operational delivery for businesses.</p>
                        </div>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", marginTop: '1.5rem', lineHeight: 1.65, maxWidth: '640px' }}>
                        We help organisations move from paper, spreadsheets and scattered tools to reliable
                        digital systems. We build with data privacy in mind, work in clear phases with written
                        agreements, and stay with our clients after launch through maintenance and support plans.
                    </p>
                </div>
            </section>

            <section className="band band--navy">
                <div className="band__inner">
                    <p className="band__kicker">How we work</p>
                    <h2 className="band__title">Four things we never compromise.</h2>
                    <div className="tiles">
                        {VALUES.map((v) => (
                            <div key={v.title} className={`tile ${v.tile}`}>
                                <h3>{v.title}</h3>
                                <p>{v.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", marginTop: '1.75rem', lineHeight: 1.65, maxWidth: '640px', opacity: 0.9 }}>
                        <strong>Who we serve:</strong> small and medium businesses, schools, clinics, care centres,
                        NGOs and contractors in Tanzania — with growing work elsewhere in East Africa and
                        internationally. Shops, salons, restaurants, schools and NGOs.
                    </p>
                </div>
            </section>

            <section className="band band--paper">
                <div className="band__inner">
                    <p className="band__kicker">Client voices</p>
                    <h2 className="band__title">Don’t take our word.</h2>
                    <div className="bubbles">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.name} className="bubble">
                                <p>“{t.quote}”</p>
                                <cite>{t.name} — {t.role}</cite>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/contact" className="abtn abtn--pop">Start a project</Link>
                        <Link href="/services" className="abtn">What we build</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
