import './globals.css';
import PageWipe from '@/components/PageWipe';
import RevealAnims from '@/components/RevealAnims';
import InnerPageAnimations from '@/components/InnerPageAnimations';
import KineticMenu from '@/components/KineticMenu';
import AiAssistant from '@/components/AiAssistant';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';

export const viewport = {
    themeColor: '#111111',
};

export const metadata = {
    title: 'Altraware Technologies — Websites, Apps & Systems in Tanzania',
    description: 'Altraware Technologies builds websites, web and mobile apps, and business systems for small businesses, schools, clinics, care centres and NGOs in Tanzania. Based in Dar es Salaam. Built with data privacy in mind.',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'Altraware',
    },
    icons: {
        icon: '/assets/altraware/logo.png',
        apple: '/assets/altraware/logo.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <CursorBubble />
                <RevealAnims />
                <InnerPageAnimations />
                <KineticMenu />
                <AiAssistant />
                {children}
                <footer className="main-footer">
                    <Footer />
                </footer>
                <PageWipe />
            </body>
        </html>
    );
}
