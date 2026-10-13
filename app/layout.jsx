import './globals.css';
import PageWipe from '@/components/PageWipe';
import RevealAnims from '@/components/RevealAnims';
import KineticMenu from '@/components/KineticMenu';
import AiAssistant from '@/components/AiAssistant';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';

export const metadata = {
    title: 'Altraware Technologies — Websites, Apps & Systems in Tanzania',
    description: 'Altraware Technologies builds websites, web and mobile apps, and business systems for small businesses, schools, clinics, care centres and NGOs in Tanzania. Based in Dar es Salaam. Built with data privacy in mind.',
    icons: {
        icon: '/favicon.png',
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
            </body>
        </html>
    );
}
