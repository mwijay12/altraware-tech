import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'Process — Altraware Technologies',
    description: 'Five written phases: discovery, prototyping, engineering, launch and training, then long-term support. You approve each step before we bill the next.',
};

const PHASES = [
    { num: '01', tile: 'tile--a', title: 'Discovery & Scope', weeks: 'Week 1', body: 'Written scope, fixed quote, and launch date agreed upfront.', deliverables: ['Scope map', 'Written quote'] },
    { num: '02', tile: 'tile--b', title: 'UI/UX Prototyping', weeks: 'Week 1–2', body: 'Clickable prototypes tested on your phone before a single line of production code.', deliverables: ['Live prototype', 'Design sign-off'] },
    { num: '03', tile: 'tile--c', title: 'Agile Engineering', weeks: 'Week 2–6', body: 'Fast sprints with offline tests, device checks, and weekly demos you can open.', deliverables: ['Weekly preview', 'Staging link'] },
    { num: '04', tile: 'tile--d', title: 'Launch & Training', weeks: 'Final week', body: 'Production rollout, team training, and 30-day hypercare after go-live.', deliverables: ['Production rollout', 'Staff training'] },
    { num: '05', tile: 'tile--f', title: 'Care & Support', weeks: 'Long-term', body: 'Daily backups, security updates, and WhatsApp support plans from TSh 99,000/month.', deliverables: ['Automated backups', 'WhatsApp support line'] },
];

export default function ProcessPage() {
    return (
        <>
            <Navbar />
            <header className="pg-hero pg-hero--blue">
                <div className="pg-hero__inner">
                    <span className="pg-hero__badge">Process · no surprises</span>
                    <h1 className="pg-hero__title">A clear path, <em>in writing.</em></h1>
                    <p className="pg-hero__intro">
                        Five phases. You approve each step before we bill the next — no surprises, only a clear
                        njia forward.
                    </p>
                </div>
            </header>

            <section className="band band--paper">
                <div className="band__inner">
                    <div className="tiles">
                        {PHASES.map((p) => (
                            <article key={p.num} className={`tile ${p.tile}`}>
                                <span className="tile__num">{p.num}</span>
                                <div className="tagrow">
                                    <span className="tag">{p.weeks}</span>
                                </div>
                                <h3 style={{ fontSize: '1.4rem' }}>{p.title}</h3>
                                <p>{p.body}</p>
                                <p style={{ marginTop: '0.75rem' }}>
                                    <strong>You receive:</strong> {p.deliverables.join(' · ')}
                                </p>
                            </article>
                        ))}
                        <div className="tile tile--e">
                            <span className="tile__num">→</span>
                            <h3 style={{ fontSize: '1.4rem' }}>Phase one is free</h3>
                            <p>A discovery call costs nothing and ends with a written plan.</p>
                            <p style={{ marginTop: '0.75rem' }}>
                                <Link href="/contact" className="abtn abtn--pop">Start a project</Link>
                            </p>
                        </div>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <Link href="/pricing" className="abtn">See pricing</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
