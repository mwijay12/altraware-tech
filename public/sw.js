/* ─── Altraware service worker ─────────────────────────────────────────────
   Deliberately minimal: it exists so the site installs and stays reachable
   when the connection drops, which matters on the networks our clients use.

   Strategy
   - Navigations: network first, fall back to the cache, then to /offline.
   - Static assets (/_next/static, fonts, icons, images): cache first.
   - API routes and /admin are never cached.

   Bump CACHE_VERSION on release to drop old entries.
──────────────────────────────────────────────────────────────────────────── */

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `altraware-static-${CACHE_VERSION}`;
const PAGE_CACHE = `altraware-pages-${CACHE_VERSION}`;

const PRECACHE = ['/', '/offline', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(PAGE_CACHE)
            .then((cache) => cache.addAll(PRECACHE))
            .then(() => self.skipWaiting())
            .catch(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    const keep = new Set([STATIC_CACHE, PAGE_CACHE]);
    event.waitUntil(
        caches
            .keys()
            .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

function isStaticAsset(url) {
    return (
        url.pathname.startsWith('/_next/static/') ||
        url.pathname.startsWith('/fonts/') ||
        url.pathname.startsWith('/assets/') ||
        /\.(?:css|js|woff2?|ttf|png|jpe?g|svg|webp|ico)$/i.test(url.pathname)
    );
}

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Never cache API traffic or the admin console.
    if (url.origin !== self.location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin')) {
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(PAGE_CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(request);
                    return cached || (await caches.match('/offline')) || Response.error();
                })
        );
        return;
    }

    if (isStaticAsset(url)) {
        event.respondWith(
            caches.match(request).then(
                (cached) =>
                    cached ||
                    fetch(request)
                        .then((response) => {
                            const copy = response.clone();
                            caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
                            return response;
                        })
                        .catch(() => cached || Response.error())
            )
        );
    }
});
