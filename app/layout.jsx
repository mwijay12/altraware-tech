import './globals.css';
import PageWipe from '@/components/PageWipe';
import RevealAnims from '@/components/RevealAnims';
import KineticMenu from '@/components/KineticMenu';
import AiAssistant from '@/components/AiAssistant';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';

export const viewport = {
    themeColor: '#111111',
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://altraware-tech.vercel.app';

const DESCRIPTION =
    'Altraware Technologies builds websites, web and mobile apps, and business systems for small businesses, schools, clinics, care centres and NGOs in Tanzania. Based in Dar es Salaam. Built with data privacy in mind.';

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Altraware Technologies — Websites, Apps & Systems in Tanzania',
        template: '%s',
    },
    description: DESCRIPTION,
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'Altraware',
    },
    icons: {
        icon: [{ url: '/favicon.png', sizes: '32x32', type: 'image/png' }],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    openGraph: {
        type: 'website',
        siteName: 'Altraware Technologies',
        title: 'Altraware Technologies — Websites, Apps & Systems in Tanzania',
        description: DESCRIPTION,
        url: '/',
        images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'Altraware Technologies' }],
    },
    twitter: {
        card: 'summary',
        title: 'Altraware Technologies — Websites, Apps & Systems in Tanzania',
        description: DESCRIPTION,
        images: ['/icon-512.png'],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <CursorBubble />
                <RevealAnims />
                <KineticMenu />
                <AiAssistant />
                {children}
                <footer className="main-footer">
                    <Footer />
                </footer>
                <PageWipe />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                window.addEventListener('load', function() {
                                    navigator.serviceWorker.register('/sw.js').catch(function(err) {
                                        console.warn('SW registration failed:', err);
                                    });
                                });
                            }
                        `,
                    }}
                />
            </body>
        </html>
    );
}
