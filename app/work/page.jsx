'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useSiteContent } from '@/lib/site-content';

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
    const { work, contact } = useSiteContent();

    useEffect(() => {
        document.title = 'Our Work — Altraware Technologies';
    }, []);

    return (
        <>
            <Navbar />
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
                    {work.map((c) => (
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
                            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="work-page__btn">Message us on WhatsApp</a>
                            <a href={`mailto:${contact.email}`} className="work-page__btn work-page__btn--ghost">
                                {contact.email}
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
