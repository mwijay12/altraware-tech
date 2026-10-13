import Link from 'next/link';
import InnerNav from '@/components/InnerNav';

export const metadata = {
    title: 'Platforms — Altraware Technologies',
    description: 'Faida POS for retail and CareTrack for care centres. Live demos you can touch: Kiswahili-first, offline-ready, M-Pesa native.',
};

function BrowserBar() {
    return (
        <div className="shot__bar" aria-hidden="true"><i /><i /><i /></div>
    );
}

export default function PlatformsPage() {
    return (
        <>
            <InnerNav />
            <header className="pg-hero pg-hero--navy">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">Platforms · touch the software</span>
                    <h1 className="pg-hero__title">Don’t take our word. <em>Touch it.</em></h1>
                    <p className="pg-hero__intro">
                        Live platforms you can open right now — built the Altraware way: Kiswahili-first,
                        offline-ready, M-Pesa native.
                    </p>
                </div>
            </header>

            <section className="band band--paper">
                <div className="band__inner">
                    <p className="band__kicker">Retail · Duka · Restaurant</p>
                    <h2 className="band__title">Faida POS — sell anywhere, work offline.</h2>
                    <div className="shot shot--l">
                        <BrowserBar />
                        <img src="/assets/work/faidahq.png" alt="Faida POS terminal showing sales and stock" loading="lazy" />
                        <div className="shot__cap">FaidaHQ terminal · sales, stock &amp; receipts</div>
                    </div>
                    <div className="tiles" style={{ marginTop: '1.75rem' }}>
                        <div className="tile tile--a">
                            <h3>100% offline-first sales</h3>
                            <p>Sell with zero bundles. Digital receipts, automatic sync when connected.</p>
                        </div>
                        <div className="tile tile--b">
                            <h3>Smart stock alarms</h3>
                            <p>Low inventory alerts, daily summaries and exports the owner can read.</p>
                        </div>
                        <div className="tile tile--c">
                            <h3>Staff accounts</h3>
                            <p>Each attendant gets an account. Companion Android app included.</p>
                        </div>
                        <div className="tile tile--e">
                            <h3>Try it + price</h3>
                            <p>
                                <a href="https://faida-hq.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 800 }}>
                                    Open the live demo →
                                </a>
                            </p>
                            <p style={{ marginTop: '0.5rem' }}><span className="price-sticker">From TSh 1.2M</span></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="band band--blue">
                <div className="band__inner">
                    <p className="band__kicker">Care centres · Schools · NGOs</p>
                    <h2 className="band__title">CareTrack — attendance, health notes &amp; guardian trust.</h2>
                    <div className="tiles">
                        <div className="tile tile--e">
                            <h3>One-tap attendance</h3>
                            <p>Guardians get an SMS the moment their child arrives.</p>
                        </div>
                        <div className="tile tile--e">
                            <h3>Health &amp; meal logs</h3>
                            <p>Per-child notes with role-based access and encryption.</p>
                        </div>
                        <div className="tile tile--e">
                            <h3>Fees by M-Pesa</h3>
                            <p>Automatic receipts. Demos show invented example entries only.</p>
                        </div>
                        <div className="tile tile--d">
                            <h3>Try it live</h3>
                            <p>
                                <a href="https://caretrack-six.vercel.app/dashboard" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 800, color: 'inherit' }}>
                                    Open the CareTrack demo →
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="band band--paper">
                <div className="band__inner">
                    <p className="band__kicker">In development</p>
                    <h2 className="band__title">ShuleDirect — fees, attendance &amp; reports for schools.</h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65, maxWidth: '640px' }}>
                        Fee tracking with M-Pesa records, attendance and reports for head teachers and parents —
                        in Kiswahili and English, friendly on slow connections. Run a school? Message us and we
                        will keep you posted.
                    </p>
                    <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/contact" className="abtn abtn--pop">Start a project</Link>
                        <Link href="/work" className="abtn">Case studies</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
