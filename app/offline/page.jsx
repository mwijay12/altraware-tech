import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CONTACT } from '@/lib/data';

export const metadata = {
    title: 'Offline — Altraware Technologies',
    description: 'You are offline. Reach Altraware Technologies on WhatsApp.',
    robots: { index: false, follow: false },
};

export default function OfflinePage() {
    return (
        <>
            <Navbar />
            <header className="pg-hero pg-hero--paper">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">No connection</span>
                    <h1 className="pg-hero__title">
                        You are <em>offline.</em>
                    </h1>
                    <p className="pg-hero__intro">
                        The page you wanted needs a connection. We have saved this screen so you are never stuck —
                        reconnect and try again, or message us on WhatsApp.
                    </p>
                    <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="abtn abtn--pop">
                            WhatsApp {CONTACT.phonePrimary}
                        </a>
                        <Link href="/" className="abtn">
                            Try the home page
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
