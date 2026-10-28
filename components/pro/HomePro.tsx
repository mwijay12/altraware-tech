import { useRef, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Link } from "@/lib/pro-router";
import {
  CONTACT,
  DEPLOYMENTS,
  MARQUEE_COLORS,
  MARQUEE_ITEMS,
  MOTION,
  SERVICE_CARDS,
  wa,
} from "@/lib/pro-content";
import { img } from "@/lib/pro-assets";
import { ArrowRight, ArrowUpRight, Reveal, WhatsAppIcon } from "@/components/pro/ui";
import Hero from "@/components/pro/Hero";
import HorizontalWords from "@/components/pro/HorizontalWords";

/* ── What we do best ────────────────────────────────────────────────────── */
function MotionSection() {
  return (
    <section className="band band--paper overflow-hidden">
      <div className="band-inner">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="motion-badge">{MOTION.badge}</span>
          </Reveal>
          <Reveal delay={80} className="group mt-5">
            <h2 className="mx-auto font-display text-[clamp(2.4rem,7.2vw,4.5rem)] leading-[0.94] font-black tracking-[-0.045em] lg:max-w-[16ch]">
              {MOTION.titleA}
              <br />
              <span className="relative inline-block whitespace-nowrap text-azure">
                {MOTION.titleB}
                <svg
                  viewBox="0 0 400 18"
                  preserveAspectRatio="none"
                  aria-hidden
                  className="absolute -bottom-[0.14em] left-0 h-[0.2em] w-full"
                >
                  <path
                    d="M3 12C70 3 140 17 205 8s140-5 192 3"
                    fill="none"
                    stroke="#0b2545"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                    className="ink-line ink-line--reveal"
                  />
                </svg>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-6 max-w-2xl font-display text-lg leading-snug font-extrabold text-royal sm:text-xl">
              {MOTION.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-[1.7] text-ink/80">
              {MOTION.description}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {MOTION.labels.map((l) => (
                <li key={l} className="chip bg-ice text-ink">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 gap-2.5 sm:gap-4">
            {MOTION.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={220 + i * 90}
                className={cn(
                  "tile !p-3 text-center sm:!p-5",
                  i === 0 && "tile--a",
                  i === 1 && "tile--d",
                  i === 2 && "tile--f"
                )}
              >
                <p className="font-display text-[clamp(1.5rem,6.2vw,2.7rem)] leading-none font-black tracking-[-0.05em]">
                  {s.num}
                </p>
                <p className="mt-2 text-[0.7rem] leading-tight font-bold sm:text-sm">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* collage — reference layout: centred cards floating over a blue blob */}
        <Reveal delay={120} className="relative mx-auto mt-14 w-full max-w-2xl sm:max-w-3xl">
          <div className="home-blob" aria-hidden="true" />
          <div className="relative aspect-[4/3.7]">
            <div className="frame absolute top-0 left-0 w-[84%] -rotate-2 transition-transform duration-500 hover:rotate-0">
              <div className="frame__bar" aria-hidden>
                <i />
                <i />
                <i />
              </div>
              <img src={img.work.faidahq} alt="Faida POS dashboard" loading="lazy" />
            </div>
            <div className="frame absolute right-0 bottom-0 w-[62%] rotate-3 transition-transform duration-500 hover:rotate-0">
              <div className="frame__bar" aria-hidden>
                <i />
                <i />
                <i />
              </div>
              <img src={img.work.uautconnect} alt="UAUT Connect portal" loading="lazy" />
            </div>
            <span className="price-sticker absolute top-[48%] left-[-2%] z-10 -rotate-6 !text-[0.8rem] sm:!text-[0.95rem]">
              ✓ M-Pesa ready
            </span>
            <span
              className="chip absolute top-[6%] right-[2%] z-10 rotate-3 border-ink bg-white text-ink shadow-[3px_3px_0_#0b2545]"
            >
              works offline
            </span>
            <img
              src={img.tech.pos}
              alt=""
              aria-hidden
              className="sticker-art absolute -right-2 top-[30%] z-10 size-20 animate-floaty drop-shadow-xl sm:size-28"
              style={{ "--r": "8deg" } as CSSProperties}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Work carousel ──────────────────────────────────────────────────────── */
function WorkCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("article");
    const w = card ? card.getBoundingClientRect().width + 20 : 340;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };
  const pad = "max(1.1rem, calc((100vw - 72rem) / 2 + 2rem))";

  return (
    <section className="band band--navy overflow-hidden !pb-14 sm:!pb-20">
      <div className="band-inner flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="band__kicker">selected work</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="band__title !mb-0">Live sites you can open right now.</h2>
            <svg viewBox="0 0 210 24" fill="none" aria-hidden="true" className="mt-4 h-5 w-36 text-sky sm:w-44">
              <path
                className="ink-line ink-line--reveal"
                d="M3 15C57 5 118 6 170 11c17 2 29 1 37-2M183 18l24-9-17-6"
                pathLength={1}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Reveal>
        </div>
        <div className="flex gap-3">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => step(d)}
              aria-label={d === 1 ? "Next project" : "Previous project"}
              className="grid size-12 place-items-center rounded-full border-2 border-sky text-sky transition hover:bg-sky hover:text-ink active:scale-95"
            >
              <ArrowRight className={cn("size-5", d === -1 && "rotate-180")} />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        aria-label="Project carousel"
        className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8"
        style={{ paddingInline: pad, scrollPaddingInline: pad }}
      >
        {DEPLOYMENTS.map((d) => (
          <article
            key={d.name}
            className="group w-[80vw] max-w-[24rem] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]"
          >
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tile tile--e !p-0 block overflow-hidden"
              style={{ "--tile-border": "#fff", "--tile-shadow": "#2f7bff" } as CSSProperties}
            >
              <div className="overflow-hidden border-b-2 border-ink bg-ice">
                <img
                  src={d.img}
                  alt={`${d.name} screenshot`}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="chip text-azure !text-[0.68rem]">{d.tag}</span>
                <h3 className="mt-3 !text-[1.35rem]">{d.name}</h3>
                <p className="!mt-2 line-clamp-3 text-ink/75">{d.desc}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 font-display font-extrabold text-azure">
                  Open live site <ArrowUpRight />
                </p>
              </div>
            </a>
          </article>
        ))}
      </div>

      <div className="band-inner">
        <Link to="/work" className="abtn abtn--dark">
          Case studies <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

/* ── Service cards (sticky stack on desktop) ────────────────────────────── */
function ServiceStack() {
  return (
    <section className="band band--paper !pb-16">
      <div className="band-inner">
        <Reveal>
          <p className="band__kicker">services</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-2 font-display text-[clamp(2.2rem,7vw,4.8rem)] leading-[0.95] font-black tracking-[-0.045em]">
            talk to us if you need:
          </h2>
          <svg viewBox="0 0 235 24" fill="none" aria-hidden="true" className="mt-4 mb-10 h-5 w-40 text-azure sm:mb-14 sm:w-48">
            <path
              className="ink-line ink-line--reveal"
              d="M3 14C54 4 119 7 173 10c23 1 42 1 58-4M48 21c42-4 84-4 129-3"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </Reveal>

        <div className="flex flex-col gap-5 lg:gap-8">
          {SERVICE_CARDS.map((s, i) => (
            <div key={s.title} className="stack-card" style={{ "--i": i } as CSSProperties}>
              <Reveal>
                <article
                  className="relative grid gap-8 overflow-hidden rounded-[2rem] border-2 border-ink p-6 shadow-[6px_6px_0_#0b2545] sm:p-9 lg:min-h-[27rem] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-12"
                  style={{ background: s.bg, color: s.fg }}
                >
                  <div className="relative z-[1]">
                    <span className="chip" style={{ color: s.chip }}>
                      {s.tag}
                    </span>
                    <h3 className="mt-4 font-display text-[clamp(2.3rem,8.4vw,5rem)] leading-[0.92] font-black tracking-[-0.05em]">
                      {s.title}
                    </h3>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className="rounded-full border-2 px-3.5 py-1.5 text-[0.82rem] font-bold sm:text-sm"
                          style={{ borderColor: `${s.chip}88` }}
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/services"
                      className="abtn abtn--dark abtn--sm mt-7"
                      style={{ "--sh": s.chip } as CSSProperties}
                    >
                      Learn more <ArrowRight />
                    </Link>
                  </div>

                  <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <div className="frame -rotate-2 transition-transform duration-500 hover:rotate-0" style={{ boxShadow: `6px 6px 0 ${s.chip}` }}>
                      <div className="frame__bar" aria-hidden>
                        <i />
                        <i />
                        <i />
                      </div>
                      <img src={s.image} alt={s.imageAlt} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                    </div>
                    <img
                      src={s.icon}
                      alt=""
                      aria-hidden
                      className="sticker-art absolute -top-8 -right-3 size-20 animate-floaty drop-shadow-xl sm:-right-6 sm:size-28"
                      style={{ "--r": "8deg", animationDelay: `${i * 0.4}s` } as CSSProperties}
                    />
                    <img
                      src={s.sticker}
                      alt=""
                      aria-hidden
                      className="sticker-art absolute -bottom-7 -left-3 size-16 sm:-left-6 sm:size-24"
                      style={{ "--r": "-12deg", transform: "rotate(-12deg)" } as CSSProperties}
                    />
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ────────────────────────────────────────────────────────────── */
const PALETTE = [...MARQUEE_COLORS, { bg: "#ffd23f", fg: "#0b2545" }]; // 8 colours for 8 items → seamless loop

function MarqueeRow({ reverse = false, offset = 0 }: { reverse?: boolean; offset?: number }) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee overflow-hidden py-2">
      <div
        className={cn("marquee-track", reverse && "marquee-track--rev")}
        style={{ "--dur": reverse ? "52s" : "44s" } as CSSProperties}
      >
        {items.map((t, i) => {
          const c = PALETTE[(i + offset) % PALETTE.length];
          return (
            <span
              key={i}
              aria-hidden={i >= MARQUEE_ITEMS.length}
              className="mx-2 inline-flex items-center gap-3 rounded-full border-2 border-ink px-6 py-3 font-display text-[1.35rem] font-black tracking-[-0.03em] whitespace-nowrap shadow-[4px_4px_0_#0b2545] sm:px-9 sm:py-4 sm:text-[2.1rem]"
              style={{ background: c.bg, color: c.fg, rotate: i % 2 ? "1.2deg" : "-1.2deg" }}
            >
              <span aria-hidden className="size-2.5 rounded-full bg-current opacity-60 sm:size-3" />
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <section aria-label="What we offer" className="overflow-hidden bg-white py-10 sm:py-16">
      <MarqueeRow />
      <div className="h-2 sm:h-3" />
      <MarqueeRow reverse offset={3} />
    </section>
  );
}

/* ── Closing CTA ────────────────────────────────────────────────────────── */
function CtaBand() {
  return (
    <section className="bg-white px-3 pb-16 sm:px-5 sm:pb-24">
      <Reveal>
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-2 border-ink bg-night p-7 text-white shadow-[8px_8px_0_#2f7bff] sm:rounded-[2.6rem] sm:p-14 lg:p-20">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(34rem_24rem_at_90%_0%,rgba(47,123,255,.5),transparent_60%),radial-gradient(28rem_20rem_at_0%_100%,rgba(91,156,255,.25),transparent_60%)]"
          />
          <img
            src={img.tech.websites}
            alt=""
            aria-hidden
            className="sticker-art pointer-events-none absolute -top-6 -right-4 -z-0 size-28 animate-floaty opacity-95 sm:top-8 sm:right-10 sm:size-44 lg:pointer-events-auto lg:size-56"
            style={{ "--r": "10deg" } as CSSProperties}
          />
          <span className="chip text-sky">ready when you are</span>
          <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.4rem,8.5vw,5.8rem)] leading-[0.92] font-black tracking-[-0.05em] text-balance">
            Let’s build something your team will use.
          </h2>
          <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-white/75 sm:text-lg">
            One conversation. Zero pressure. A written plan and an honest price within days — the
            fastest way to reach us is WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
            <a
              href={wa()}
              target="_blank"
              rel="noopener noreferrer"
              className="abtn abtn--pop"
              style={{ "--b": "#fff", "--sh": "#5b9cff" } as CSSProperties}
            >
              <WhatsAppIcon /> WhatsApp {CONTACT.phonePrimary}
            </a>
            <Link to="/pricing" className="abtn abtn--dark">
              See pricing
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalWords />
      <MotionSection />
      <WorkCarousel />
      <ServiceStack />
      <Marquee />
      <CtaBand />
    </>
  );
}
