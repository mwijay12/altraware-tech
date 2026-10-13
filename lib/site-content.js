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
            image: '/assets/work/uautconnect.png',
            imageAlt: 'UAUT Connect campus portal',
            tag: '01 / WEB',
            title: 'websites',
            services: ['Business Websites', 'School Websites', 'Clinic & NGO Sites', 'Kiswahili & English', 'Contact & Maps', 'Basic SEO', 'Launch Support'],
        },
        {
            color: 'darkblue',
            icon: '/assets/tech/icon-apps.png',
            image: '/assets/work/audenic.png',
            imageAlt: 'Audenic audio store app',
            tag: '02 / SYS',
            title: 'apps & systems',
            services: ['Web & Mobile Apps', 'School Systems', 'Clinic Systems', 'Care Centre Systems', 'Contractor Tools', 'Offline-Friendly', 'Training & Handover'],
        },
        {
            color: 'orange',
            icon: '/assets/tech/icon-pos.png',
            image: '/assets/work/faidahq.png',
            imageAlt: 'Faida POS terminal',
            tag: '03 / POS',
            title: 'retail & pos',
            services: ['Faida POS Setup', 'Stock & Sales', 'Receipts', 'M-Pesa Records', 'Staff Accounts', 'Reports'],
        },
        {
            color: 'maroon',
            icon: '/assets/tech/icon-support.png',
            image: '/assets/work/tz-reach.png',
            imageAlt: 'TZ Reach portal',
            tag: '04 / HOST',
            title: 'support & hosting',
            services: ['Hosting Setup', 'Domain & Email', 'Backups', 'Security Basics', 'Updates', 'WhatsApp Support'],
        },
    ],
    posts: [
        {
            id: 'website-cost-tanzania',
            title: 'How much does a website cost in Tanzania?',
            excerpt: 'Web Starter, Growth and Pro Portal — what each package includes and how to choose.',
            cover: '/assets/work/uautconnect.png',
            date: '2026-09-20',
            body: [
                'A business website in Tanzania typically costs between TSh 350,000 and TSh 750,000 depending on size. Our Web Starter (TSh 350,000) is a fast one-page site with WhatsApp call buttons, Google Maps and basic SEO — enough for most small businesses to be found and contacted.',
                'The Growth Business Site (TSh 550,000) adds 4 to 6 pages, a product or service catalogue, quote forms and a Google Business profile. Choose it when customers need to browse before they message you.',
                'The Pro Web Portal (TSh 750,000) adds a database, booking or customer logins, and two months of priority support. Every package ends with a fixed written quote after a free discovery call — no hidden surprises.',
            ],
        },
        {
            id: 'offline-first-pos',
            title: 'Why your POS must work without internet',
            excerpt: 'Bundles run out, networks drop. Offline-first systems keep selling anyway.',
            cover: '/assets/work/faidahq.png',
            date: '2026-10-05',
            body: [
                'In a Dar es Salaam shop, the internet drops at the worst moment — right when a queue forms at the counter. A POS that needs constant connection stops your business. An offline-first POS keeps selling, prints receipts and updates stock with zero bundles.',
                'Faida POS stores every sale on the device and syncs to the cloud automatically when the connection returns. M-Pesa records sit next to cash records, so end-of-day reconciliation takes minutes, not hours.',
                'If you run a shop, duka or restaurant, ask any POS vendor one question first: what happens when the internet goes off? If the answer is not a clear it keeps working, walk away.',
            ],
        },
        {
            id: 'm-pesa-records',
            title: 'Matching M-Pesa payments to sales, without the midnight math',
            excerpt: 'Cash plus mobile money should reconcile itself. Here is how we set it up.',
            cover: '/assets/work/bongofoodie.png',
            date: '2026-10-12',
            body: [
                'Most shops take both cash and M-Pesa, then the owner spends the evening matching phone messages to counter-book entries. It is slow and mistakes hide in it.',
                'The fix is simple: record every payment method against the same sale, at the moment of sale. Faida POS does this — cash, M-Pesa and totals per method appear in one daily report.',
                'Start today even without software: one column for cash, one for M-Pesa, one for the total, per sale. When the columns stop adding up by hand, come talk to us on WhatsApp.',
            ],
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
