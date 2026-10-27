'use client';

const PRODUCTS = [
    {
        badge: 'Faida POS',
        title: 'Sales, stock and receipts for retail shops.',
        status: 'Live — talk to us for a demo.',
    },
    {
        badge: 'CareTrack',
        title: 'Simple records for care centres. Demo uses fake data only.',
        status: 'Live — talk to us for a demo.',
    },
    {
        badge: 'ShuleDirect',
        title: 'Fees, attendance and reports for schools.',
        status: 'In development.',
    },
];

export default function Showreel() {
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
                            <span className="products__status">{p.status}</span>
                        </div>
                    ))}
                </div>
                <p className="products__cta">One clear next step: send us a WhatsApp.</p>
            </div>
        </section>
    );
}
