'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import InnerNav from '@/components/InnerNav';
import FirebaseAuth from '@/components/FirebaseAuth';
import { DEFAULT_CONTENT, resetSiteContent, saveSiteContent, useSiteContent } from '@/lib/site-content';

function Field({ label, value, onChange, hint }) {
    return (
        <label className="admin-field">
            <span>{label}</span>
            <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
            {hint && <small>{hint}</small>}
        </label>
    );
}

function Area({ label, value, onChange, hint, rows }) {
    return (
        <label className="admin-field">
            <span>{label}</span>
            <textarea value={value ?? ''} rows={rows || 4} onChange={(e) => onChange(e.target.value)} />
            {hint && <small>{hint}</small>}
        </label>
    );
}

const linesToText = (arr) => (arr || []).join('\n');
const textToLines = (s) => s.split('\n').map((x) => x.trim()).filter(Boolean);

function Section({ title, children, onSave, saved }) {
    return (
        <section className="tile tile--e admin-section">
            <h3 style={{ fontSize: '1.3rem' }}>{title}</h3>
            {children}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button className="abtn abtn--pop" onClick={onSave}>Save {title}</button>
                {saved && <span style={{ fontWeight: 700, color: '#0e6634' }}>Saved ✓</span>}
            </div>
        </section>
    );
}

export default function AdminPage() {
    const live = useSiteContent();
    const [authed, setAuthed] = useState(null);
    const [passcode, setPasscode] = useState('');
    const [loginError, setLoginError] = useState('');
    const [saved, setSaved] = useState('');
    const [resetDone, setResetDone] = useState(false);

    const [hero, setHero] = useState(live.hero);
    const [motion, setMotion] = useState(live.motion);
    const [heading, setHeading] = useState(live.servicesHeading);
    const [services, setServices] = useState(live.services);
    const [work, setWork] = useState(live.work);
    const [contact, setContact] = useState(live.contact);
    const [posts, setPosts] = useState(live.posts);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        document.title = 'Admin — Altraware Technologies';
        fetch('/api/admin/session')
            .then((r) => r.json())
            .then((d) => setAuthed(!!d.authed))
            .catch(() => setAuthed(false));
    }, []);

    useEffect(() => {
        setHero(live.hero);
        setMotion(live.motion);
        setHeading(live.servicesHeading);
        setServices(live.services);
        setWork(live.work);
        setContact(live.contact);
        setPosts(live.posts);
    }, [live]);

    const login = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await fetch('/api/admin/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: passcode }),
            });
            const data = await res.json();
            if (res.ok) {
                setAuthed(true);
            } else {
                setLoginError(data.error || 'Wrong passcode.');
            }
        } catch {
            setLoginError('Server error. Is the dev server running?');
        }
    };

    const save = (key, value) => {
        saveSiteContent({ [key]: value });
        setSaved(key);
        setTimeout(() => setSaved(''), 2000);
    };

    if (authed === null) {
        return (
            <>
                <InnerNav />
                <main className="work-page"><div className="work-page__inner"><p>Checking session…</p></div></main>
            </>
        );
    }

    if (!authed) {
        return (
            <>
                <InnerNav />
                <main className="work-page">
                    <div className="work-page__inner" style={{ maxWidth: '520px' }}>
                        <p className="work-page__kicker">admin</p>
                        <h1 className="work-page__title">Console login.</h1>
                        <p className="work-page__intro">
                            Sign in with an allowed Google account — or use the admin passcode (ADMIN_MASTER_KEY from .env.local).
                            Get it wrong and nothing happens — the site stays public and safe.
                        </p>
                        <FirebaseAuth onAuthed={() => setAuthed(true)} />
                        <form onSubmit={login} className="tile tile--e" style={{ marginTop: '1rem' }}>
                            <Field label="Passcode (alternative)" value={passcode} onChange={setPasscode} />
                            {loginError && <p style={{ color: '#a0325a', fontWeight: 700 }}>{loginError}</p>}
                            <button className="abtn abtn--pop" type="submit" style={{ marginTop: '1rem' }}>Unlock</button>
                        </form>
                    </div>
                </main>
            </>
        );
    }

    const setService = (i, patch) => setServices((s) => s.map((c, j) => (j === i ? { ...c, ...patch } : c)));
    const setCase = (i, patch) => setWork((w) => w.map((c, j) => (j === i ? { ...c, ...patch } : c)));

    return (
        <>
            <InnerNav />
            <main className="work-page">
                <div className="work-page__inner">
                    <p className="work-page__kicker">admin console</p>
                    <h1 className="work-page__title">Edit the site.</h1>
                    <p className="work-page__intro">
                        Changes save to this browser immediately and show on the site right away.
                        Nothing touches the code. Images: paste a /assets/… path or a https:// image (Cloudinary) URL.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
                        <Link href="/" className="abtn">View site</Link>
                        <button
                            className="abtn"
                            onClick={async () => {
                                try {
                                    await fetch('/api/admin/session', { method: 'DELETE' });
                                } catch { /* noop */ }
                                try {
                                    const { signOut } = await import('firebase/auth');
                                    const { auth } = await import('@/lib/firebase');
                                    if (auth) await signOut(auth).catch(() => {});
                                } catch { /* firebase not configured */ }
                                setAuthed(false);
                            }}
                        >
                            Sign out
                        </button>
                        <button
                            className="abtn"
                            onClick={() => {
                                if (window.confirm('Reset ALL content to defaults?')) {
                                    resetSiteContent();
                                    setResetDone(true);
                                    setTimeout(() => setResetDone(false), 2000);
                                }
                            }}
                        >
                            Reset everything
                        </button>
                        {resetDone && <span style={{ fontWeight: 700 }}>Reset ✓</span>}
                    </div>

                    <div className="work-cases">
                        <Section title="Hero" onSave={() => save('hero', hero)} saved={saved === 'hero'}>
                            <Field label="Line 1" value={hero.lineA} onChange={(v) => setHero({ ...hero, lineA: v })} />
                            <Field label="Line 2" value={hero.lineB} onChange={(v) => setHero({ ...hero, lineB: v })} />
                            <Field label="Line 3" value={hero.lineC} onChange={(v) => setHero({ ...hero, lineC: v })} />
                        </Section>

                        <Section title="Motion section" onSave={() => save('motion', motion)} saved={saved === 'motion'}>
                            <Field label="Badge" value={motion.badge} onChange={(v) => setMotion({ ...motion, badge: v })} />
                            <Field label="Title line 1" value={motion.titleA} onChange={(v) => setMotion({ ...motion, titleA: v })} />
                            <Field label="Title line 2 (italic)" value={motion.titleB} onChange={(v) => setMotion({ ...motion, titleB: v })} />
                            <Field label="Subtitle" value={motion.subtitle} onChange={(v) => setMotion({ ...motion, subtitle: v })} />
                            <Area label="Description" value={motion.description} onChange={(v) => setMotion({ ...motion, description: v })} />
                            {[0, 1, 2].map((i) => (
                                <Field
                                    key={i}
                                    label={`Floating label ${i + 1}`}
                                    value={motion.labels[i]}
                                    onChange={(v) => setMotion({ ...motion, labels: motion.labels.map((x, j) => (j === i ? v : x)) })}
                                />
                            ))}
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="admin-grid-2">
                                    <Field
                                        label={`Stat ${i + 1} number`}
                                        value={motion.stats[i]?.num}
                                        onChange={(v) => setMotion({ ...motion, stats: motion.stats.map((x, j) => (j === i ? { ...x, num: v } : x)) })}
                                    />
                                    <Field
                                        label={`Stat ${i + 1} label`}
                                        value={motion.stats[i]?.label}
                                        onChange={(v) => setMotion({ ...motion, stats: motion.stats.map((x, j) => (j === i ? { ...x, label: v } : x)) })}
                                    />
                                </div>
                            ))}
                        </Section>

                        <Section title="Home service cards" onSave={() => { save('servicesHeading', heading); save('services', services); }} saved={saved === 'services' || saved === 'servicesHeading'}>
                            <Field label="Section heading" value={heading} onChange={setHeading} hint="Shown exactly as typed." />
                            {services.map((c, i) => (
                                <div key={i} style={{ borderTop: '2px dashed var(--color-dark)', marginTop: '1rem', paddingTop: '1rem' }}>
                                    <Field label={`Card ${i + 1} title`} value={c.title} onChange={(v) => setService(i, { title: v })} />
                                    <Field label={`Card ${i + 1} badge (e.g. 01 / WEB)`} value={c.tag} onChange={(v) => setService(i, { tag: v })} />
                                    <Field label={`Card ${i + 1} photo`} value={c.image} onChange={(v) => setService(i, { image: v })} hint="/assets/… path or https:// URL" />
                                    <Field label={`Card ${i + 1} icon`} value={c.icon} onChange={(v) => setService(i, { icon: v })} />
                                    <Area label={`Card ${i + 1} services (one per line)`} value={linesToText(c.services)} onChange={(v) => setService(i, { services: textToLines(v) })} rows={7} />
                                </div>
                            ))}
                        </Section>

                        <Section title="Work cases" onSave={() => save('work', work)} saved={saved === 'work'}>
                            {work.map((c, i) => (
                                <div key={c.id + i} style={{ borderTop: '2px dashed var(--color-dark)', marginTop: '1rem', paddingTop: '1rem' }}>
                                    <Field label={`Case ${i + 1} badge`} value={c.badge} onChange={(v) => setCase(i, { badge: v })} />
                                    <Field label={`Case ${i + 1} status`} value={c.status} onChange={(v) => setCase(i, { status: v })} />
                                    <Field label={`Case ${i + 1} title`} value={c.title} onChange={(v) => setCase(i, { title: v })} />
                                    <Field label={`Case ${i + 1} image (blank = none)`} value={c.image || ''} onChange={(v) => setCase(i, { image: v || null })} />
                                    <Area label={`Case ${i + 1} problem`} value={c.problem} onChange={(v) => setCase(i, { problem: v })} />
                                    <Area label={`Case ${i + 1} solution`} value={c.solution} onChange={(v) => setCase(i, { solution: v })} />
                                    <Area label={`Case ${i + 1} scope (one per line)`} value={linesToText(c.scope)} onChange={(v) => setCase(i, { scope: textToLines(v) })} rows={6} />
                                    <Field label={`Case ${i + 1} price`} value={c.price} onChange={(v) => setCase(i, { price: v })} />
                                    <Field label={`Case ${i + 1} timeline`} value={c.timeline} onChange={(v) => setCase(i, { timeline: v })} />
                                    <Field label={`Case ${i + 1} next step`} value={c.next} onChange={(v) => setCase(i, { next: v })} />
                                    <Field label={`Case ${i + 1} demo label`} value={c.demo?.label || ''} onChange={(v) => setCase(i, { demo: { label: v, url: c.demo?.url || '' } })} />
                                    <Field label={`Case ${i + 1} demo URL`} value={c.demo?.url || ''} onChange={(v) => setCase(i, { demo: { label: c.demo?.label || '', url: v } })} />
                                </div>
                            ))}
                        </Section>

                        <Section title="Contact info" onSave={() => save('contact', contact)} saved={saved === 'contact'}>
                            <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
                            <Field label="Phone (primary)" value={contact.phonePrimary} onChange={(v) => setContact({ ...contact, phonePrimary: v })} />
                            <Field label="Phone (secondary)" value={contact.phoneSecondary} onChange={(v) => setContact({ ...contact, phoneSecondary: v })} />
                            <Field label="WhatsApp link" value={contact.whatsapp} onChange={(v) => setContact({ ...contact, whatsapp: v })} hint="Full https://wa.me/… link" />
                            <Field label="Address" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} />
                            <Field label="Hours" value={contact.hours} onChange={(v) => setContact({ ...contact, hours: v })} />
                        </Section>

                        <Section title="Blog posts" onSave={() => save('posts', posts)} saved={saved === 'posts'}>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                {posts.map((p, i) => (
                                    <button
                                        key={p.id + i}
                                        className="abtn"
                                        style={{ opacity: editingPost === i ? 1 : 0.6 }}
                                        onClick={() => setEditingPost(i)}
                                    >
                                        {p.title.slice(0, 24)}…
                                    </button>
                                ))}
                                <button
                                    className="abtn abtn--pop"
                                    onClick={() => {
                                        setPosts([...posts, { id: 'new-post-' + Date.now(), title: 'New post', excerpt: '', cover: '', date: new Date().toISOString().slice(0, 10), body: [''] }]);
                                        setEditingPost(posts.length);
                                    }}
                                >
                                    + New
                                </button>
                            </div>
                            {editingPost !== null && posts[editingPost] && (
                                <div>
                                    <Field label="Title" value={posts[editingPost].title} onChange={(v) => setPosts(posts.map((p, j) => (j === editingPost ? { ...p, title: v } : p)))} />
                                    <Field label="URL slug" value={posts[editingPost].id} onChange={(v) => setPosts(posts.map((p, j) => (j === editingPost ? { ...p, id: v } : p)))} hint="Lowercase, dashes only. Changing it changes the post URL." />
                                    <Field label="Excerpt" value={posts[editingPost].excerpt} onChange={(v) => setPosts(posts.map((p, j) => (j === editingPost ? { ...p, excerpt: v } : p)))} />
                                    <Field label="Cover image" value={posts[editingPost].cover} onChange={(v) => setPosts(posts.map((p, j) => (j === editingPost ? { ...p, cover: v } : p)))} hint="/assets/… or https:// URL" />
                                    <Field label="Date" value={posts[editingPost].date} onChange={(v) => setPosts(posts.map((p, j) => (j === editingPost ? { ...p, date: v } : p)))} />
                                    <Area label="Body (blank line = new paragraph)" value={(posts[editingPost].body || []).join('\n\n')} rows={12} onChange={(v) => setPosts(posts.map((p, j) => (j === editingPost ? { ...p, body: v.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean) } : p)))} />
                                    <button
                                        className="abtn"
                                        style={{ marginTop: '0.75rem' }}
                                        onClick={() => {
                                            if (window.confirm('Delete this post?')) {
                                                setPosts(posts.filter((_, j) => j !== editingPost));
                                                setEditingPost(null);
                                            }
                                        }}
                                    >
                                        Delete post
                                    </button>
                                </div>
                            )}
                        </Section>
                    </div>
                </div>
            </main>
        </>
    );
}
