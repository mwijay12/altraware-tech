import { DEFAULT_CONTENT } from '@/lib/content-defaults';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://altraware-tech.vercel.app').replace(/\/$/, '');

/** Static routes plus every blog post that ships with the site. */
export default function sitemap() {
    const staticRoutes = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly' },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/platforms', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/work', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/process', priority: 0.7, changeFrequency: 'yearly' },
        { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
        { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
        { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
    ];

    const posts = (DEFAULT_CONTENT.posts || []).map((post) => ({
        url: `${BASE_URL}/blog/${post.id}`,
        lastModified: post.date ? new Date(post.date) : undefined,
        changeFrequency: 'monthly',
        priority: 0.5,
    }));

    return [
        ...staticRoutes.map((r) => ({
            url: `${BASE_URL}${r.path}`,
            changeFrequency: r.changeFrequency,
            priority: r.priority,
        })),
        ...posts,
    ];
}
