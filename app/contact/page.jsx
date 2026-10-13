import InnerNav from '@/components/InnerNav';
import { CONTACT } from '@/lib/data';

export const metadata = {
    title: 'Contact — Altraware Technologies',
    description: 'Start a project with Altraware Technologies in Dar es Salaam. WhatsApp +255 792 867 427, email altrawaretechnology@gmail.com. Mon–Sat, 8:00–18:00 EAT.',
};

export default function ContactPage() {
    return (
        <>
            <InnerNav />
            <header className="pg-hero">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">Contact · start a project</span>
                    <h1 className="pg-hero__title">Welcome home. <em>Let’s build.</em></h1>
                    <p className="pg-hero__intro">
                        One conversation. Zero pressure. A written plan and honest price within days.
                        The fastest way to reach us is WhatsApp.
                    </p>
                    <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="abtn abtn--pop">
                            WhatsApp {CONTACT.phonePrimary}
                        </a>
                        <a href={`mailto:${CONTACT.email}`} className="abtn">Email us</a>
                    </div>
                </div>
            </header>

            <section className="band band--navy">
                <div className="band__inner">
                    <div className="tiles">
                        <div className="tile tile--e">
                            <h3>WhatsApp (fastest)</h3>
                            <p>
                                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 800 }}>
                                    {CONTACT.phonePrimary} →
                                </a>
                            </p>
                            <p>{CONTACT.hours}</p>
                        </div>
                        <div className="tile tile--e">
                            <h3>Email</h3>
                            <p>
                                <a href={`mailto:${CONTACT.email}`} style={{ fontWeight: 800 }}>{CONTACT.email}</a>
                            </p>
                            <p>We reply within one working day.</p>
                        </div>
                        <div className="tile tile--e">
                            <h3>Phone</h3>
                            <p>{CONTACT.phonePrimary}</p>
                            <p>{CONTACT.phoneSecondary}</p>
                        </div>
                        <div className="tile tile--e">
                            <h3>Office</h3>
                            <p>{CONTACT.address}</p>
                            <p>{CONTACT.hours}</p>
                        </div>
                    </div>
                    <div className="map-embed">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8121083.165202397!2d29.686476509624033!3d-6.345767185778589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb655bb5a1860615%3A0x815b0f25ed425796!2sAltraware%20Technology!5e0!3m2!1sen!2stz!4v1791875517058!5m2!1sen!2stz"
                            title="Altraware Technology on Google Maps"
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            <section className="band band--paper">
                <div className="band__inner">
                    <p className="band__kicker">What to tell us</p>
                    <h2 className="band__title">Two short paragraphs are enough.</h2>
                    <div className="tiles">
                        <div className="tile tile--a">
                            <span className="tile__num">1</span>
                            <h3>About your business</h3>
                            <p>What you sell or run, where you are, and how your team works today — paper, spreadsheets, or nothing yet.</p>
                        </div>
                        <div className="tile tile--b">
                            <span className="tile__num">2</span>
                            <h3>What you need</h3>
                            <p>A website, an app, a POS, or a full system? Tell us in your own words — Kiswahili or English, both are fine.</p>
                        </div>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", marginTop: '1.75rem', lineHeight: 1.65, maxWidth: '640px' }}>
                        Our agreements are written plainly — and for contracts, we always recommend independent
                        legal review before you sign anything.
                    </p>
                </div>
            </section>
        </>
    );
}
