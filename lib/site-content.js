'use client';

// ─── Site content store ─────────────────────────────────────────────────────
// Defaults live here. The /admin panel saves overrides to localStorage,
// merged over these defaults on the client. Server renders defaults
// (no localStorage on the server), client hydrates then applies overrides.

import { useSyncExternalStore } from 'react';
import { DEFAULT_CONTENT } from './content-defaults';

export { DEFAULT_CONTENT };

const KEY = 'altraware-site-content-v1';

let cache = null;
const listeners = new Set();

function loadOverrides() {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function ensureCache() {
    if (!cache) {
        cache = { ...DEFAULT_CONTENT, ...(loadOverrides() || {}) };
    }
    return cache;
}

function emit() {
    listeners.forEach((fn) => fn());
}

export function getSiteContent() {
    if (typeof window === 'undefined') return DEFAULT_CONTENT;
    return ensureCache();
}

export function getServerContent() {
    return DEFAULT_CONTENT;
}

export function saveSiteContent(patch) {
    const next = { ...(cache || DEFAULT_CONTENT), ...patch };
    cache = next;
    try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
        /* storage full or blocked */
    }
    emit();
}

export function resetSiteContent() {
    cache = { ...DEFAULT_CONTENT };
    try {
        window.localStorage.removeItem(KEY);
    } catch {
        /* noop */
    }
    emit();
}

function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export function useSiteContent() {
    return useSyncExternalStore(subscribe, getSiteContent, getServerContent);
}
