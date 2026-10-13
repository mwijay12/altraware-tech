'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import InnerNav from '@/components/InnerNav';
import { useSiteContent } from '@/lib/site-content';

export default function BlogPage() {
    const { posts } = useSiteContent();

    useEffect(() => {
        document.title = 'Blog — Altraware Technologies';
    }, []);

    return (
        <>
            <InnerNav />
            <header className="pg-hero pg-hero--blue">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">Blog · notes</span>
                    <h1 className="pg-hero__title">Plain answers, <em>no jargon.</em></h1>
                    <p className="pg-hero__intro">
                        Short notes on websites, systems and running a business in Tanzania.
                        New posts appear here as soon as they are published in /admin.
                    </p>
                </div>
            </header>

            <section className="band band--paper">
                <div className="band__inner">
                    <div className="tiles">
                        {(posts || []).map((p) => (
                            <Link
                                key={p.id}
                                href={`/blog/${p.id}`}
                                className="tile tile--e"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                {p.cover && (
                                    <div className="shot" style={{ boxShadow: '4px 4px 0 var(--color-dark)', marginBottom: '1rem' }}>
                                        <img src={p.cover} alt="" loading="lazy" style={{ maxHeight: '200px' }} />
                                    </div>
                                )}
                                <p className="band__kicker">{p.date}</p>
                                <h3 style={{ fontSize: '1.4rem', marginTop: '0.4rem' }}>{p.title}</h3>
                                <p style={{ marginTop: '0.5rem' }}>{p.excerpt}</p>
                                <p style={{ marginTop: '0.75rem', fontWeight: 800 }}>Read →</p>
                            </Link>
                        ))}
                    </div>
                    {(!posts || !posts.length) && <p>No posts yet. Check back soon.</p>}
                </div>
            </section>
        </>
    );
}
