'use client';

import { useSiteContent } from '@/lib/site-content';
import { CONTACT } from '@/lib/data';

const PRODUCTS = [
    {
        badge: 'Faida POS',
        title: 'Sales, stock and receipts for retail shops.',
        status: 'Live — talk to us for a demo.',
        statusTone: 'live',
    },
    {
        badge: 'CareTrack',
        title: 'Simple records for care centres. Demo uses fake data only.',
        status: 'Live — talk to us for a demo.',
        statusTone: 'live',
    },
    {
        badge: 'ShuleDirect',
        title: 'Fees, attendance and reports for schools.',
        status: 'In development.',
        statusTone: 'development',
    },
];

export default function Showreel() {
    const { contact } = useSiteContent();
    return (
        <section className="showreel-section" id="showreel-section">
            <div className="showreel__content products__content">
                <p className="showreel__subtitle">our products</p>
                <h2 className="showreel__title">Tools we build<br />and support.</h2>
                <div className="products__grid">
                    {PRODUCTS.map((p) => (
                        <div key={p.badge} className="products__card">
                            <span className="products__badge">{p.badge}</span>
                            <p className="products__desc">{p.title}</p>
                            <span className={`products__status products__status--${p.statusTone}`}>{p.status}</span>
                        </div>
                    ))}
                </div>
                <a className="products__cta" href={contact?.whatsapp || CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                    Ask us about a product <span aria-hidden="true">↗</span>
                </a>
            </div>
        </section>
    );
}
