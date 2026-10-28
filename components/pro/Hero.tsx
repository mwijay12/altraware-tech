import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "@/lib/pro-router";
import { HERO } from "@/lib/pro-content";
import { img } from "@/lib/pro-assets";
import { ArrowRight } from "@/components/pro/ui";

const TRAIL = [
  img.work.faidahq,
  img.work.uautconnect,
  img.work.audenic,
  img.work.niketz,
  img.work.volta,
  img.work.bongofoodie,
  img.work.aymi,
  img.work.tzReach,
];

const FAN = [
  { src: img.work.uautconnect, left: "0%", r: -4, w: "w-[56%] sm:w-[38%] lg:w-[31%]", z: 1, d: 0.2, alt: "UAUT Connect" },
  { src: img.work.audenic, left: "46%", r: 4, w: "w-[56%] sm:w-[38%] lg:w-[31%]", z: 1, d: 0.9, alt: "Audenic" },
  { src: img.work.faidahq, left: "23%", r: -1.5, w: "w-[60%] sm:w-[42%] lg:w-[34%]", z: 2, d: 0, alt: "Faida POS" },
];

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 113 113" className={className} aria-hidden>
      <path
        d="M56.4 .4 60.4 52.5 112.4 56.4 60.4 60.4 56.4 112.4 52.5 60.4 .4 56.4 52.5 52.5 56.4 .4Z"
        fill="#ffd23f"
      />
    </svg>
  );
}

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  // Mouse trail of project screenshots — desktop pointers only
  useEffect(() => {
    const el = section.current;
    const box = trail.current;
    if (!el || !box) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let last = { x: -999, y: -999 };
    let i = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (Math.hypot(x - last.x, y - last.y) < 120) return;
      last = { x, y };
      const node = document.createElement("img");
      node.src = TRAIL[i++ % TRAIL.length];
      node.alt = "";
      node.className = "hero-trail";
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.setProperty("--r", `${(Math.random() * 16 - 8).toFixed(1)}deg`);
      node.addEventListener("animationend", () => node.remove());
      box.appendChild(node);
      while (box.childElementCount > 14) box.firstElementChild?.remove();
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      box.replaceChildren();
    };
  }, []);

  const a = HERO.lineA.split(" ").filter(Boolean);
  const b = HERO.lineB.split(" ").filter(Boolean);
  const c = HERO.lineC.split(" ").filter(Boolean);
  const delay = (n: number) => ({ animationDelay: `${0.32 + n * 0.07}s` }) as CSSProperties;
  let n = 0;

  return (
    <section
      id="home-hero"
      ref={section}
      className="relative isolate m-3 flex min-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[26px] bg-night text-white"
    >
      {/* background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_38rem_at_85%_-8%,rgba(47,123,255,.55),transparent_60%),radial-gradient(44rem_32rem_at_-5%_95%,rgba(91,156,255,.30),transparent_62%),linear-gradient(180deg,#07172e,#0b2545)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_50%_35%,#000_30%,transparent_75%)]"
      />
      <svg
        viewBox="0 0 320 260"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute top-[26%] right-[3%] z-[1] hidden w-[clamp(12rem,18vw,17rem)] animate-floaty text-sky/60 xl:block"
      >
        <path
          className="ink-line ink-line--enter"
          d="M24 216c58 1 87-22 91-58 4-33-27-42-39-20-17 31 18 67 58 55 40-13 55-69 71-100 16-30 44-44 85-48"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="ink-line ink-line--enter"
          d="m274 33 16 12-13 15"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_38%,rgba(0,0,0,.22)_66%,rgba(0,0,0,.58)_100%)]"
      />
      <div ref={trail} aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" />

      {/* content */}
      <div className="relative z-[2] mx-auto flex w-full max-w-[78rem] flex-1 flex-col justify-end px-5 pt-[7.2rem] pb-6 sm:px-8 sm:pt-32 lg:justify-center lg:pt-36 lg:pb-10">
        <span
          className="chip w-fit animate-rise text-sky"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="size-2 rounded-full bg-sky [animation:pulse-dot_2s_infinite]" />
          Dar es Salaam · Tanzania
        </span>

        <h1 className="sticker-type mt-5 font-display text-[clamp(2.55rem,8.6vw,5.5rem)] leading-[0.95] font-black tracking-[-0.05em] sm:mt-6 lg:text-center lg:leading-[1] lg:tracking-[-3px]">
          {/* line A */}
          {a.map((w, i) => (
            <span key={`a${i}`} className="inline-block animate-rise whitespace-nowrap" style={delay(n++)}>
              {w}
              {i === a.length - 1 ? "" : "\u00A0"}
              {i === a.length - 1 && (
                <img
                  src={img.sticker.smiley}
                  alt=""
                  aria-hidden
                  className="sticker-art ml-[0.12em] inline-block size-[0.74em] translate-y-[0.04em] align-baseline [animation:pop_.9s_cubic-bezier(.34,1.56,.64,1)_1s_both]"
                />
              )}
            </span>
          ))}
          <br />
          {/* line B — circled */}
          <span className="relative mt-[0.06em] inline-block px-[0.16em]">
            {b.map((w, i) => (
              <span key={`b${i}`} className="inline-block animate-rise whitespace-pre text-sky" style={delay(n++)}>
                {w}
                {i < b.length - 1 ? " " : ""}
              </span>
            ))}
            <svg
              viewBox="0 0 608 100"
              preserveAspectRatio="none"
              aria-hidden
              className="pointer-events-none absolute -inset-x-[3%] -inset-y-[14%] h-[128%] w-[106%]"
            >
              <path
                d="M322.9 99C232.5 99 140.6 94.8 58 80.9 31.5 76.4 2.9 69.1 1.1 58.1c-1.3-8 12.3-15.1 27.5-20.6C61.3 25.6 103.4 18.1 146.2 12.7 228.6 2.3 316.9-1.2 403.2 2.4c53.1 2.2 106.3 7.3 152.1 17.7 26.1 6 51.4 15.2 51.7 26.7.1 6.9-9.2 13.5-22.2 18.3-13 4.8-29.4 8.1-46.1 10.8-75.6 12.2-159.6 13.9-241.7 15.3"
                fill="none"
                stroke="#5b9cff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
                className="ink-line ink-line--enter"
              />
            </svg>
          </span>{" "}
          {/* line C */}
          {c.map((w, i) => {
            const last = i === c.length - 1;
            return (
              <span
                key={`c${i}`}
                className="relative inline-block animate-rise whitespace-pre"
                style={delay(n++)}
              >
                {w}
                {last ? "" : " "}
                {last && (
                  <Star className="absolute -top-[0.22em] -right-[0.34em] size-[0.46em] animate-spin-slow" />
                )}
              </span>
            );
          })}
        </h1>

        <p
          className="mt-6 max-w-xl animate-rise text-[1.05rem] leading-relaxed text-white/80 sm:text-lg lg:mx-auto lg:text-center"
          style={{ animationDelay: "0.95s" }}
        >
          Websites, apps and POS for shops, schools, clinics and NGOs — simple to use, friendly on
          slow connections, and backed by real support.
        </p>

        <div
          className="mt-7 flex animate-rise flex-col gap-3 min-[460px]:flex-row lg:justify-center"
          style={{ animationDelay: "1.05s" }}
        >
          <Link
            to="/contact"
            className="abtn abtn--pop"
            style={{ "--b": "#fff", "--sh": "#5b9cff" } as CSSProperties}
          >
            Start a project <ArrowRight />
          </Link>
          <Link to="/work" className="abtn abtn--dark">
            See our work
          </Link>
        </div>

        <ul
          className="mt-7 flex animate-rise flex-wrap justify-center gap-2 text-white/75"
          style={{ animationDelay: "1.15s" }}
        >
          {["M-Pesa ready", "Kiswahili & English", "Offline-friendly"].map((t) => (
            <li key={t} className="chip !border-white/25 !text-[0.72rem]">
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* floating screenshot fan */}
      <div
        aria-hidden
        className="relative z-[2] mx-auto h-[10rem] w-full max-w-5xl px-5 pb-4 sm:h-[12.5rem] sm:px-8 lg:h-[14.5rem]"
      >
        <div className="relative size-full">
          {FAN.map((f) => (
            <div
              key={f.alt}
              className={`absolute bottom-0 ${f.w}`}
              style={{ left: f.left, zIndex: f.z }}
            >
              <div
                className="animate-floaty overflow-hidden rounded-t-2xl border-2 border-white/30 bg-white shadow-[0_-18px_50px_rgba(0,0,0,.35)]"
                style={{ "--r": `${f.r}deg`, animationDelay: `${f.d}s` } as CSSProperties}
              >
                <div className="flex gap-1.5 border-b-2 border-ink bg-ice px-3 py-2">
                  <i className="size-2 rounded-full bg-ink" />
                  <i className="size-2 rounded-full bg-sky" />
                  <i className="size-2 rounded-full bg-sun" />
                </div>
                <img src={f.src} alt="" className="aspect-[16/10] w-full object-cover object-top" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
