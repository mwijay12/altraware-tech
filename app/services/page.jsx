import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'Services — Altraware Technologies',
    description: 'Websites from TSh 350,000, apps from TSh 800,000, business systems from TSh 1,200,000. Mobile-first, Kiswahili and English, M-Pesa ready, offline-first.',
};

const SERVICES = [
    {
        id: 'websites',
        num: '01',
        tile: 'tile--a',
        badge: 'Websites · Tovuti',
        tags: ['SEO', 'BOOKING', 'M-PESA'],
        title: 'Fast, mobile-first sites in Kiswahili & English.',
        body: 'Be found. Be contacted. Be trusted. Landing pages to full business sites with booking, ordering, catalogues and WhatsApp integration — optimised to load fast on Tanzanian networks.',
        highlights: [
            { title: 'Performance-first', body: 'Image optimisation, caching and CDN so pages open fast on 3G.' },
            { title: 'Found on Google', body: 'Search optimisation, Google Business and Maps indexing.' },
            { title: 'Built to convert', body: 'Click-to-WhatsApp, quote forms and inquiry forms.' },
        ],
        price: 'From TSh 350,000',
    },
    {
        id: 'apps',
        num: '02',
        tile: 'tile--b',
        badge: 'Apps · shaped around how you work',
        tags: ['ANDROID', 'iOS', 'PWA', 'FLUTTER'],
        title: 'Web & mobile apps, including offline-first.',
        body: 'Operations, customer and offline-first apps — digitise the clipboard, put your business in your customer’s pocket, and keep working when the network drops. Includes Flutter builds like the FaidaHQ companion app.',
        highlights: [
            { title: 'Operations apps', body: 'Orders, deliveries, field teams and approvals — digitise paper notebooks.' },
            { title: 'Customer apps', body: 'Booking, loyalty, ordering and catalogues.' },
            { title: 'Offline-first engineering', body: 'Work without internet, sync automatically when connected.' },
        ],
        price: 'From TSh 800,000',
    },
    {
        id: 'systems',
        num: '03',
        tile: 'tile--c',
        badge: 'Business systems · Mifumo',
        tags: ['FAIDA POS', 'CARETRACK', 'SHULE DIRECT'],
        title: 'Platforms that run your whole operation.',
        body: 'Purpose-built platforms for sales, stock, attendance, fees and guardian communication — designed for limited connectivity: Faida POS for retail, CareTrack for care centres, ShuleDirect for schools.',
        highlights: [
            { title: 'Faida POS', body: 'Offline sales, stock alarms, staff tracking and instant thermal receipts.' },
            { title: 'CareTrack', body: 'Attendance, health records, caregiver notes and guardian updates with privacy by design.' },
            { title: 'ShuleDirect', body: 'School management, grading and parent communication. In development.' },
        ],
        price: 'From TSh 1,200,000',
    },
];

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <header className="pg-hero pg-hero--blue">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">Services · what we build</span>
                    <h1 className="pg-hero__title">Three crafts. <em>One standard.</em></h1>
                    <p className="pg-hero__intro">
                        From business sites to platforms that run your entire operation. Prices below are
                        starting points — every project ends with a fixed written quote after a free discovery call.
                    </p>
                    <div className="pg-hero__art">
                        <figure className="pg-art pg-art--l">
                            <img src="/assets/work/faidahq.png" alt="Faida POS terminal" loading="lazy" />
                            <figcaption>Faida POS · retail terminal</figcaption>
                        </figure>
                        <figure className="pg-art pg-art--r">
                            <img src="/assets/work/audenic.png" alt="Audenic audio store" loading="lazy" />
                            <figcaption>Audenic · Dar es Salaam studio</figcaption>
                        </figure>
                    </div>
                </div>
            </header>

            <section className="band band--paper">
                <div className="band__inner">
                    {SERVICES.map((s) => (
                        <article key={s.id} id={s.id} style={{ marginBottom: '2.5rem' }}>
                            <div className={`tile ${s.tile}`} style={{ padding: '2rem' }}>
                                <span className="tile__num">{s.num}</span>
                                <h3 style={{ fontSize: '1.6rem' }}>{s.badge}</h3>
                                <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{s.title}</p>
                                <p style={{ marginTop: '0.75rem' }}>{s.body}</p>
                                <div className="tagrow">
                                    {s.tags.map((t) => (
                                        <span key={t} className="tag">{t}</span>
                                    ))}
                                </div>
                                <div className="tiles" style={{ marginTop: '1.25rem' }}>
                                    {s.highlights.map((h) => (
                                        <div key={h.title} className="tile tile--e">
                                            <h3>{h.title}</h3>
                                            <p>{h.body}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '1.5rem' }}>
                                    <span className="price-sticker">{s.price}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/pricing" className="abtn abtn--pop">See pricing</Link>
                        <Link href="/contact" className="abtn">Start a project</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
