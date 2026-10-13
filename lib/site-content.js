'use client';

// ─── Site content store ─────────────────────────────────────────────────────
// Defaults live here. The /admin panel saves overrides to localStorage,
// merged over these defaults on the client. Server renders defaults
// (no localStorage on the server), client hydrates then applies overrides.

import { useSyncExternalStore } from 'react';

const KEY = 'altraware-site-content-v1';

export const DEFAULT_CONTENT = {
    hero: {
        lineA: 'we build websites, apps',
        lineB: '& systems',
        lineC: 'for business in Tanzania',
    },
    motion: {
        badge: 'what we do best',
        titleA: 'Systems your team',
        titleB: 'actually uses.',
        subtitle: 'from websites to POS — M-Pesa ready, Kiswahili & English.',
        description:
            'To run a shop, a school or a clinic you need systems your team actually uses. We build websites, apps and tools for everyday work in Tanzania — simple to use, friendly on slow connections, and backed by real support.',
        labels: ['M-Pesa ready', 'Kiswahili & English', 'support after launch'],
        stats: [
            { num: '15+', label: 'live deployments' },
            { num: '100%', label: 'offline-ready builds' },
            { num: 'SW·EN', label: 'Kiswahili & English' },
        ],
    },
    servicesHeading: 'talk to us if you need:',
    services: [
        {
            color: 'green',
            icon: '/assets/tech/icon-websites.png',
            title: 'websites',
            services: ['Business Websites', 'School Websites', 'Clinic & NGO Sites', 'Kiswahili & English', 'Contact & Maps', 'Basic SEO', 'Launch Support'],
        },
        {
            color: 'darkblue',
            icon: '/assets/tech/icon-apps.png',
            title: 'apps & systems',
            services: ['Web & Mobile Apps', 'School Systems', 'Clinic Systems', 'Care Centre Systems', 'Contractor Tools', 'Offline-Friendly', 'Training & Handover'],
        },
        {
            color: 'orange',
            icon: '/assets/tech/icon-pos.png',
            title: 'retail & pos',
            services: ['Faida POS Setup', 'Stock & Sales', 'Receipts', 'M-Pesa Records', 'Staff Accounts', 'Reports'],
        },
        {
            color: 'maroon',
            icon: '/assets/tech/icon-support.png',
            title: 'support & hosting',
            services: ['Hosting Setup', 'Domain & Email', 'Backups', 'Security Basics', 'Updates', 'WhatsApp Support'],
        },
    ],
    contact: {
        email: 'altrawaretechnology@gmail.com',
        phonePrimary: '+255 792 867 427',
        phoneSecondary: '+255 790 942 616',
        whatsapp: 'https://wa.me/255792867427?text=Hi%20Altraware%2C%20I%20want%20to%20start%20a%20project',
        address: 'Dar es Salaam, Tanzania',
        hours: 'Mon–Sat · 8:00–18:00 EAT',
    },
    work: [
        {
            id: 'faida-pos',
            badge: 'Faida POS',
            status: 'Live — ask us for a demo',
            title: 'Sales, stock and receipts for a retail shop in Dar es Salaam.',
            image: '/assets/work/faidahq.png',
            problem:
                'The shop recorded sales in a counter book. Stock counts were guesses, receipts were handwritten, and M-Pesa payments were hard to match to sales at the end of the day.',
            solution:
                'Faida POS: a point of sale that records each sale, updates stock, prints receipts, keeps M-Pesa records alongside cash, and gives the owner a daily report. Staff get their own accounts.',
            scope: ['Sales and receipts', 'Stock in and out', 'M-Pesa and cash records', 'Staff accounts', 'Daily and weekly reports', 'Training for shop staff'],
            price: 'From TSh 1,200,000. Final price is fixed in a written quote after a free discovery call.',
            timeline: 'Timeline is agreed in writing before we start.',
            next: 'Send us a WhatsApp and we will arrange a demo.',
            demo: { label: 'Open the Faida POS demo', url: 'https://faida-hq.vercel.app/' },
        },
        {
            id: 'caretrack',
            badge: 'CareTrack',
            status: 'Live — demo uses fake data only',
            title: 'Simple records for a care centre.',
            image: null,
            problem:
                'Children’s files lived in paper folders. Finding one record took time, reports for partners took days to prepare, and papers could get lost or damaged.',
            solution:
                'CareTrack: one place for centre records, with clear roles for staff, safe backups, and reports at the press of a button. Our public demo only ever shows invented example entries — never real children’s names, photos or details.',
            scope: ['Records in one place', 'Staff roles and logins', 'Backups', 'One-click reports', 'Training and handover'],
            price: 'Custom quote. Final price is fixed in a written quote after a free discovery call.',
            timeline: 'Timeline is agreed in writing before we start.',
            next: 'Send us a WhatsApp and we will walk you through the demo.',
            demo: { label: 'Open the CareTrack demo', url: 'https://caretrack-six.vercel.app/dashboard' },
        },
        {
            id: 'shuledirect',
            badge: 'ShuleDirect',
            status: 'In development',
            title: 'Fees, attendance and reports for schools.',
            image: null,
            problem:
                'Many schools track fees and attendance on paper or in scattered spreadsheets. Following up on balances is slow, and term reports take weeks.',
            solution:
                'ShuleDirect (in development): fee tracking with M-Pesa records, attendance, and reports for head teachers and parents — in Kiswahili and English, friendly on slow connections.',
            scope: ['Fee tracking', 'M-Pesa records', 'Attendance', 'Term reports', 'Parent messages', 'Training for school staff'],
            price: 'Custom quote. Final price is fixed in a written quote after a free discovery call.',
            timeline: 'Timeline is agreed in writing before we start.',
            next: 'Run a school? Message us on WhatsApp and we will keep you posted.',
            demo: null,
        },
    ],
};

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
