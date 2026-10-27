'use client';

// ─── Firebase client init (Google Auth) ─────────────────────────────────────
// Config comes from NEXT_PUBLIC_FIREBASE_* env vars (see .env.example).
// If vars are missing (local dev without setup), module exports nulls and
// UI components degrade gracefully to passcode-only login.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId
);

let app = null;
let auth = null;
let googleProvider = null;

if (isFirebaseConfigured) {
    try {
        app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({ prompt: 'select_account' });
    } catch (err) {
        console.warn('[firebase] init failed:', err?.message);
        app = null;
        auth = null;
        googleProvider = null;
    }
} else if (typeof window !== 'undefined') {
    console.warn('[firebase] NEXT_PUBLIC_FIREBASE_* vars missing — Google login disabled, passcode still works.');
}

export { app, auth, googleProvider };
