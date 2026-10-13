'use client';

import { useState } from 'react';

const TYPES = ['Website', 'Web / Mobile App', 'Faida POS', 'CareTrack', 'School System', 'Support Plan', 'Something else'];

/** Project inquiry form → /api/inquiries → client auto-reply + admin alert email. */
export default function InquiryForm() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', type: 'Website', message: '' });
    const [state, setState] = useState({ sending: false, done: null, error: '' });

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.phone.trim()) {
            setState({ sending: false, done: null, error: 'Please add your name and phone number.' });
            return;
        }
        setState({ sending: true, done: null, error: '' });
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send.');
            setState({ sending: false, done: data, error: '' });
            setForm({ name: '', phone: '', email: '', type: 'Website', message: '' });
        } catch (err) {
            setState({ sending: false, done: null, error: err.message });
        }
    };

    if (state.done) {
        return (
            <div className="tile tile--a">
                <h3>Message received ✓</h3>
                <p>
                    Thanks! Your reference is <strong>{state.done.refCode}</strong>.
                    {state.done.clientSent
                        ? ' A confirmation email is on its way to you.'
                        : ' We will reply within one working day.'}{' '}
                    For a faster reply, WhatsApp us anytime.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="tile tile--e">
            <h3>Send a project brief</h3>
            <p style={{ marginBottom: '1rem' }}>We reply within one working day — with a reference number and next steps.</p>
            <label className="admin-field">
                <span>Your name *</span>
                <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Neema Mwakalinga" />
            </label>
            <label className="admin-field">
                <span>Phone / WhatsApp *</span>
                <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+255 …" />
            </label>
            <label className="admin-field">
                <span>Email (for our reply)</span>
                <input value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@business.co.tz" />
            </label>
            <label className="admin-field">
                <span>What do you need?</span>
                <select value={form.type} onChange={(e) => set('type', e.target.value)} style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', border: '2px solid var(--color-dark)', borderRadius: '0.75rem', padding: '0.65rem 0.9rem', background: '#fff' }}>
                    {TYPES.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </label>
            <label className="admin-field">
                <span>About your project</span>
                <textarea value={form.message} rows={4} onChange={(e) => set('message', e.target.value)} placeholder="I run a shop in Kariakoo and I need…" />
            </label>
            {state.error && <p style={{ color: '#a0325a', fontWeight: 700 }}>{state.error}</p>}
            <button className="abtn abtn--pop" type="submit" disabled={state.sending} style={{ marginTop: '1rem' }}>
                {state.sending ? 'Sending…' : 'Send brief'}
            </button>
        </form>
    );
}
