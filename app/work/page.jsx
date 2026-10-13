import Link from 'next/link';
import InnerNav from '@/components/InnerNav';
import { CONTACT } from '@/lib/data';

export const metadata = {
    title: 'Our Work — Altraware Technologies',
    description: 'Case studies from Altraware Technologies: Faida POS for retail shops, CareTrack for care centres, and ShuleDirect for schools. Plus live deployments. Based in Dar es Salaam, Tanzania.',
};

const CASES = [
    {
        id: 'faida-pos',
        badge: 'Faida POS',
        status: 'Live — ask us for a demo',
        title: 'Sales, stock and receipts for a retail shop in Dar es Salaam.',
        image: '/assets/work/faidahq.png',
        imageAlt: 'Faida POS terminal',
        problem:
            'The shop recorded sales in a counter book. Stock counts were guesses, receipts were handwritten, and M-Pesa payments were hard to match to sales at the end of the day.',
        solution:
            'Faida POS: a point of sale that records each sale, updates stock, prints receipts, keeps M-Pesa records alongside cash, and gives the owner a daily report. Staff get their own accounts.',
        scope: ['Sales and receipts', 'Stock in and out', 'M-Pesa and cash records', 'Staff accounts', 'Daily and weekly reports', 'Training for shop staff'],
        price: 'From TSh 1,200,000. Final price is fixed in a written quote after a free discovery call.',
        timeline: 'Timeline is agreed in writing before we start.',
        next: 'Send us a WhatsApp and we will arrange a demo.',
        demo: { label: 'Open the Faida POS demo', url: 'https://faida-hq.vercel.app/' },
    },
    {
        id: 'caretrack',
        badge: 'CareTrack',
        status: 'Live — demo uses fake data only',
        title: 'Simple records for a care centre.',
        image: null,
        imageAlt: '',
        problem:
            'Children’s files lived in paper folders. Finding one record took time, reports for partners took days to prepare, and papers could get lost or damaged.',
        solution:
            'CareTrack: one place for centre records, with clear roles for staff, safe backups, and reports at the press of a button. Our public demo only ever shows invented example entries — never real children’s names, photos or details.',
        scope: ['Records in one place', 'Staff roles and logins', 'Backups', 'One-click reports', 'Training and handover'],
        price: 'Custom quote. Final price is fixed in a written quote after a free discovery call.',
        timeline: 'Timeline is agreed in writing before we start.',
        next: 'Send us a WhatsApp and we will walk you through the demo.',
        demo: { label: 'Open the CareTrack demo', url: 'https://caretrack-six.vercel.app/dashboard' },
    },
    {
        id: 'shuledirect',
        badge: 'ShuleDirect',
        status: 'In development',
        title: 'Fees, attendance and reports for schools.',
        image: null,
        imageAlt: '',
        problem:
            'Many schools track fees and attendance on paper or in scattered spreadsheets. Following up on balances is slow, and term reports take weeks.',
        solution:
            'ShuleDirect (in development): fee tracking with M-Pesa records, attendance, and reports for head teachers and parents — in Kiswahili and English, friendly on slow connections.',
        scope: ['Fee tracking', 'M-Pesa records', 'Attendance', 'Term reports', 'Parent messages', 'Training for school staff'],
        price: 'Custom quote. Final price is fixed in a written quote after a free discovery call.',
        timeline: 'Timeline is agreed in writing before we start.',
        next: 'Run a school? Message us on WhatsApp and we will keep you posted.',
        demo: null,
    },
];

const DEPLOYMENTS = [
    { name: 'UAUT Connect', desc: 'Campus and admissions portal for the United African University of Tanzania, Kigamboni.', url: 'https://www.uautconnect.com/', img: '/assets/work/uautconnect.png' },
    { name: 'Nike TZ Store', desc: 'Online sneaker store with live catalogue and mobile-money checkout.', url: 'https://niketz.vercel.app/', img: 'https://res.cloudinary.com/oc8018um/image/upload/f_auto,q_auto,w_600/v1791497526/niketz_web.png' },
    { name: 'AYMI Africa Hub', desc: 'Pan-African youth movement hub with programs and membership.', url: 'https://www.aymiafrica.org/', img: '/assets/work/aymi.png' },
    { name: 'Volta Rentals', desc: 'Car-rental platform with fleet registry and trip calculator.', url: 'https://volta-rentals.vercel.app/', img: 'https://res.cloudinary.com/oc8018um/image/upload/f_auto,q_auto,w_600/v1791497522/voltarentals.png' },
    { name: 'Bongo Foodie', desc: 'Authentic Swahili gastronomy with Chef AI, campaigns and ordering.', url: 'https://bongofoodie.vercel.app/', img: '/assets/work/bongofoodie.png' },
    { name: 'Audenic Audio Labs', desc: 'Hand-tuned audio e-commerce from a Dar es Salaam studio.', url: 'https://audenic.vercel.app/', img: '/assets/work/audenic.png' },
    { name: 'TZ Reach', desc: 'Navigate Tanzania: investment, legal and sector intelligence.', url: 'https://tanzaniareach.com/', img: '/assets/work/tz-reach.png' },
];

export default function WorkPage() {
    return (
        <>
            <InnerNav />
            <header className="pg-hero pg-hero--pink">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">Work · case studies</span>
                    <h1 className="pg-hero__title">Tools we build <em>and support.</em></h1>
                    <p className="pg-hero__intro">
                        Three products, one habit: plain systems your team actually uses, with training and
                        support after launch. Built with data privacy in mind.
                    </p>
                </div>
            </header>

            <main className="band band--paper">
                <div className="band__inner">
                    {CASES.map((c) => (
                        <article key={c.id} id={c.id} style={{ marginBottom: '2.5rem' }}>
                            <div className="tile tile--e" style={{ padding: '2rem' }}>
                                <div className="tagrow">
                                    <span className="products__badge">{c.badge}</span>
                                    <span className="work-case__status">{c.status}</span>
                                </div>
                                <h2 className="work-case__title">{c.title}</h2>
                                {c.image && (
                                    <div className="shot shot--r" style={{ margin: '1.25rem 0' }}>
                                        <div className="shot__bar" aria-hidden="true"><i /><i /><i /></div>
                                        <img src={c.image} alt={c.imageAlt} loading="lazy" />
                                    </div>
                                )}
                                <div className="work-case__grid">
                                    <div className="work-case__block">
                                        <h3>Problem</h3>
                                        <p>{c.problem}</p>
                                    </div>
                                    <div className="work-case__block">
                                        <h3>Solution</h3>
                                        <p>{c.solution}</p>
                                    </div>
                                    <div className="work-case__block">
                                        <h3>Scope</h3>
                                        <ul>
                                            {c.scope.map((s) => (
                                                <li key={s}>{s}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="work-case__block">
                                        <h3>Price</h3>
                                        <p>{c.price}</p>
                                    </div>
                                    <div className="work-case__block">
                                        <h3>Timeline</h3>
                                        <p>{c.timeline}</p>
                                    </div>
                                    <div className="work-case__block work-case__next">
                                        <h3>Next step</h3>
                                        <p>{c.next}</p>
                                        {c.demo && (
                                            <p style={{ marginTop: '0.5rem' }}>
                                                <a href={c.demo.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>
                                                    {c.demo.label} →
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}

                    <p className="band__kicker" style={{ marginTop: '3rem' }}>More live deployments</p>
                    <h2 className="band__title">Every link opens a live site.</h2>
                    <div className="tiles">
                        {DEPLOYMENTS.map((d, i) => (
                            <div key={d.name} className={`tile ${i % 2 ? 'tile--b' : 'tile--a'}`}>
                                <div className="shot" style={{ boxShadow: '4px 4px 0 var(--color-dark)', marginBottom: '1rem' }}>
                                    <img src={d.img} alt={`${d.name} screenshot`} loading="lazy" style={{ maxHeight: '220px' }} />
                                </div>
                                <h3>{d.name}</h3>
                                <p>{d.desc}</p>
                                <p style={{ marginTop: '0.5rem' }}>
                                    <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 800 }}>
                                        Open live site →
                                    </a>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="work-page__cta" style={{ marginTop: '2.5rem' }}>
                        <h2>Have something similar in mind?</h2>
                        <p>One clear next step: message us and tell us about your business.</p>
                        <div className="work-page__cta-row">
                            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="work-page__btn">Message us on WhatsApp</a>
                            <a href={`mailto:${CONTACT.email}`} className="work-page__btn work-page__btn--ghost">
                                {CONTACT.email}
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
