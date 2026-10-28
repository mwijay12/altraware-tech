import { useEffect, useRef, type CSSProperties } from "react";
import { img } from "@/lib/pro-assets";
import { Reveal } from "@/components/pro/ui";

const STORY = "We build systems for Tanzanian business";

export default function HorizontalWords() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const arrow = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let frame = 0;
    let active = true;
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      frame = 0;
      const section = wrap.current;
      const words = track.current;
      if (!section || !words) return;

      if (!desktop.matches || reduced.matches) {
        words.style.transform = "";
        return;
      }

      // Travel only while the desktop scene is pinned, so each phrase has time to be read.
      const viewport = document.documentElement.clientWidth;
      const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      const margin = Math.min(96, viewport * 0.065);
      const start = margin;
      const end = Math.min(start, viewport - margin - words.scrollWidth);
      words.style.transform = `translate3d(${start + (end - start) * progress}px,0,0)`;
      section.style.setProperty("--story-progress", String(Math.min(1, progress * 1.4)));
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;

      if (arrow.current) {
        const left = arrow.current.getBoundingClientRect().left;
        const drawn = Math.min(1, Math.max(0, (viewport * 1.1 - left) / (viewport * 0.55)));
        arrow.current.style.setProperty("--draw", String(1 - drawn));
      }
    };
    const requestUpdate = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    desktop.addEventListener("change", requestUpdate);
    reduced.addEventListener("change", requestUpdate);
    document.fonts?.ready.then(requestUpdate);
    return () => {
      active = false;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      desktop.removeEventListener("change", requestUpdate);
      reduced.removeEventListener("change", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const sticker = "sticker-art mx-[0.06em] h-[0.72em] w-auto shrink-0 animate-floaty";

  return (
    <section
      ref={wrap}
      aria-labelledby="horizontal-words-title"
      className="horizontal-words relative bg-white text-ink md:h-[320vh]"
    >
      <h2 id="horizontal-words-title" className="sr-only">{STORY}</h2>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.06] [background-image:radial-gradient(#0b2545_1.5px,transparent_1.5px)] [background-size:26px_26px]"
      />

      {/* On phones the whole thought stays readable instead of travelling off screen. */}
      <div className="horizontal-words__mobile relative md:hidden">
        <Reveal className="mobile-words__stage">
          <div aria-hidden="true" className="mobile-words__headline">
            <img
              src={img.sticker.thumbs}
              alt=""
              className="sticker-art mobile-words__sticker animate-floaty"
            />
            <span className="mobile-words__line" style={{ "--word": 0 } as CSSProperties}>We build</span>
            <span className="mobile-words__line mobile-words__emphasis" style={{ "--word": 1 } as CSSProperties}>
              systems
              <svg viewBox="0 0 280 22" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path className="ink-line ink-line--reveal" d="M3 13C65 3 137 7 210 9c26 1 49 0 67-3" pathLength={1} stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                <path className="ink-line ink-line--reveal mobile-words__second-stroke" d="M28 20c55-5 117-5 178-4" pathLength={1} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="mobile-words__line" style={{ "--word": 2 } as CSSProperties}>for Tanzanian</span>
            <span className="mobile-words__line mobile-words__business" style={{ "--word": 3 } as CSSProperties}>
              business
              <svg className="mobile-words__spark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M20 1 22 18l17 2-17 2-2 17-2-17L1 20l17-2L20 1Z" fill="#2f7bff" />
              </svg>
            </span>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <p className="mobile-words__support">
            Shops, schools, clinics and NGOs run on clear systems. We design for mobile money,
            Kiswahili and low connectivity, and we stay after launch.
          </p>
        </Reveal>
      </div>

      {/* Desktop gets a longer, scroll-drawn story with a hand-drawn path. */}
      <div className="horizontal-words__viewport sticky top-0 hidden h-[100svh] flex-col justify-center overflow-hidden md:flex">
        <svg className="horizontal-words__trace" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path
            className="ink-line"
            d="M-30 180C115 120 215 238 354 181S562 131 698 197s248 41 368-8 253-43 404 12"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ strokeDashoffset: "calc(1 - var(--story-progress, 0))" }}
          />
        </svg>
        <div
          ref={track}
          aria-hidden="true"
          className="horizontal-words__track flex w-max items-center gap-[0.2em] font-display text-[clamp(3.75rem,9vw,8.5rem)] leading-[1.1] font-black tracking-[-0.05em] whitespace-nowrap will-change-transform"
        >
          <span>We build</span>
          <img src={img.sticker.thumbs} alt="" className={sticker} />
          <span className="text-azure">systems</span>
          <svg
            ref={arrow}
            viewBox="0 0 386 127"
            fill="none"
            className="h-[0.6em] w-auto shrink-0 text-ink"
            style={{ "--draw": 1 } as CSSProperties}
          >
            <path
              d="M2 123C9 36 84.5 17 124 26c93.8 21.4 83 89 53.5 97-71.7 19.5-66.8-121 55-121 78 0 134 77 143.5 116L356.5 105.5M376 118 384 97"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              className="ink-line"
              style={{ strokeDashoffset: "var(--draw)" }}
            />
          </svg>
          <img src={img.sticker.cursor} alt="" className={sticker} style={{ animationDelay: ".5s" }} />
          <span>for Tanzanian</span>
          <img src={img.sticker.phone} alt="" className={sticker} style={{ animationDelay: "1s" }} />
          <span className="text-royal underline decoration-azure decoration-[0.06em] underline-offset-[0.1em]">business</span>
        </div>

        <p
          className="horizontal-words__support support-card absolute bottom-[max(4.5rem,7vh)] left-1/2 -translate-x-1/2"
        >
          <span>
            Shops, schools, clinics and NGOs run on clear systems. We design for mobile money,
            Kiswahili and low connectivity, and we stay after launch.
          </span>
        </p>
        <div aria-hidden="true" className="horizontal-words__progress absolute inset-x-0 bottom-0 h-1.5 bg-ink/10">
          <span ref={bar} className="block h-full origin-left scale-x-0 bg-azure" />
        </div>
      </div>
    </section>
  );
}