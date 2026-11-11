// Crawler rules. Keeps /admin and the internal API out of search results.
// Replace the host below with the production domain once it is fixed.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://altraware-tech.vercel.app';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api/'],
            },
        ],
        sitemap: `${BASE_URL.replace(/\/$/, '')}/sitemap.xml`,
    };
}
