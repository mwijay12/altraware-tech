'use client';

import { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';

/**
 * Google login button (Firebase). On success it POSTs the email to
 * /api/admin/session so the server can set the same `altraware_admin`
 * cookie the passcode flow uses — then calls onAuthed().
 */
export default function FirebaseAuth({ onAuthed }) {
    const [user, setUser] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!auth) return;
        const unsub = onAuthStateChanged(auth, setUser);
        return () => unsub();
    }, []);

    if (!isFirebaseConfigured || !auth) {
        return (
            <div className="tile tile--b" style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Google login — setup needed</h3>
                <p style={{ marginTop: '0.5rem', lineHeight: 1.6 }}>
                    Add <code>NEXT_PUBLIC_FIREBASE_*</code> to <code>.env.local</code> (see <code>.env.example</code>) and restart the dev server.
                    Passcode login below still works.
                </p>
            </div>
        );
    }

    const login = async () => {
        setBusy(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const email = result?.user?.email || '';
            if (!email) {
                setError('No email address returned from Google account.');
                return;
            }
            const res = await fetch('/api/admin/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ googleEmail: email }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                await signOut(auth).catch(() => {});
                setUser(null);
                setError(data.error || 'That Google account is not allowed as admin.');
                return;
            }
            onAuthed?.({ email });
        } catch (err) {
            const msg = String(err?.code || err?.message || '');
            if (msg.includes('popup-closed') || msg.includes('cancelled')) {
                setError('Popup closed — try again.');
            } else if (msg.includes('unauthorized-domain')) {
                setError('This domain is not authorized in Firebase Console → Authentication → Settings.');
            } else {
                setError('Google login failed. Try again or use passcode.');
            }
        } finally {
            setBusy(false);
        }
    };

    const logout = async () => {
        await signOut(auth).catch(() => {});
        setUser(null);
        try {
            await fetch('/api/admin/session', { method: 'DELETE' });
        } catch {
            /* noop */
        }
        window.location.reload();
    };

    return (
        <div className="tile tile--e" style={{ marginTop: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Continue with Google</h3>
            <p style={{ margin: '0.5rem 0 1rem', lineHeight: 1.6 }}>
                {user ? (
                    <>Signed in as <strong>{user.email}</strong>.</>
                ) : (
                    <>Admins sign in with an allowed Google account. Others stay locked out.</>
                )}
            </p>
            {!user ? (
                <button className="abtn abtn--light" onClick={login} disabled={busy} type="button">
                    {busy ? 'Opening Google…' : '🔵 Sign in with Google'}
                </button>
            ) : (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="abtn abtn--pop" onClick={() => onAuthed?.({ email: user.email })} type="button">
                        Enter console
                    </button>
                    <button className="abtn" onClick={logout} type="button">
                        Sign out
                    </button>
                </div>
            )}
            {error && <p style={{ color: '#a0325a', fontWeight: 700, marginTop: '0.75rem' }}>{error}</p>}
        </div>
    );
}
