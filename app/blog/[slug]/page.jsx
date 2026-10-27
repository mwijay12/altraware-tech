'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useSiteContent } from '@/lib/site-content';

export default function BlogPostPage() {
    const params = useParams();
    const { posts } = useSiteContent();
    const post = (posts || []).find((p) => p.id === params.slug);

    useEffect(() => {
        document.title = post ? `${post.title} — Altraware` : 'Post not found — Altraware';
    }, [post]);

    if (!post) {
        return (
            <>
                <Navbar />
                <main className="work-page">
                    <div className="work-page__inner">
                        <p className="work-page__kicker">blog</p>
                        <h1 className="work-page__title">No post here.</h1>
                        <p className="work-page__intro">It may have been renamed or removed in /admin.</p>
                        <Link href="/blog" className="abtn" style={{ marginTop: '1.5rem' }}>All posts</Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <header className="pg-hero pg-hero--paper">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">{post.date}</span>
                    <h1 className="pg-hero__title" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>{post.title}</h1>
                    <p className="pg-hero__intro">{post.excerpt}</p>
                </div>
            </header>

            <section className="band band--paper">
                <div className="band__inner" style={{ maxWidth: '720px' }}>
                    {post.cover && (
                        <div className="shot shot--l" style={{ marginBottom: '2rem' }}>
                            <img src={post.cover} alt="" loading="lazy" />
                        </div>
                    )}
                    {(post.body || []).map((para, i) => (
                        <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                            {para}
                        </p>
                    ))}
                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/blog" className="abtn">All posts</Link>
                        <Link href="/contact" className="abtn abtn--pop">Start a project</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
