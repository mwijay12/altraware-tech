import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { img } from "@/lib/pro-assets";

/* ── Reveal on scroll ───────────────────────────────────────────────────── */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
  [k: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", shown && "is-in", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ── Band section ───────────────────────────────────────────────────────── */
export function Band({
  tone = "paper",
  kicker,
  title,
  className,
  children,
  id,
}: {
  tone?: "paper" | "tint" | "blue" | "navy";
  kicker?: string;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("band scroll-mt-24", `band--${tone}`, className)}>
      <div className="band-inner">
        {kicker && (
          <Reveal>
            <p className="band__kicker">{kicker}</p>
          </Reveal>
        )}
        {title && (
          <Reveal delay={60}>
            <h2 className="band__title">{title}</h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/* ── Inner page hero ────────────────────────────────────────────────────── */
const HERO_BG = {
  ice: "bg-ice text-ink",
  mist: "bg-mist text-ink",
  sky: "bg-sky text-ink",
  navy: "bg-night text-white",
};

export function PageHero({
  variant = "ice",
  badge,
  title,
  intro,
  art,
  children,
}: {
  variant?: keyof typeof HERO_BG;
  badge: string;
  title: ReactNode;
  intro: ReactNode;
  art?: ReactNode;
  children?: ReactNode;
}) {
  const dark = variant === "navy";
  return (
    <header
      className={cn(
        "relative isolate overflow-hidden pt-[6.6rem] pb-14 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24",
        HERO_BG[variant]
      )}
    >
      {/* decorative layers */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-60",
          dark
            ? "bg-[radial-gradient(40rem_28rem_at_88%_-10%,rgba(47,123,255,.45),transparent_60%),radial-gradient(30rem_24rem_at_0%_110%,rgba(91,156,255,.25),transparent_60%)]"
            : "bg-[radial-gradient(34rem_24rem_at_90%_0%,rgba(255,255,255,.7),transparent_60%)]"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 [background-size:34px_34px]",
          dark
            ? "opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]"
            : "opacity-[.06] [background-image:linear-gradient(#0b2545_1px,transparent_1px),linear-gradient(90deg,#0b2545_1px,transparent_1px)]"
        )}
      />

      <div className="band-inner grid items-center gap-10 lg:grid-cols-[1.5fr_0.7fr]">
        <div>
          <span
            className={cn(
              "page-enter-fast chip",
              dark ? "text-sky" : "text-ink bg-white/60 backdrop-blur"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            <span className="size-2 rounded-full bg-azure [animation:pulse-dot_2s_infinite]" />
            {badge}
          </span>
          <h1
            className="hero-title page-enter-fast mt-5 font-display text-[clamp(2.35rem,8.4vw,5.6rem)] leading-[0.95] font-black tracking-[-0.045em] text-balance"
            style={
              {
                animationDelay: "0.4s",
                "--em": dark ? "rgba(47,123,255,.55)" : "rgba(47,123,255,.32)",
              } as CSSProperties
            }
          >
            {title}
          </h1>
          <svg
            viewBox="0 0 180 15"
            fill="none"
            aria-hidden="true"
            className={cn("mt-4 h-3 w-32 sm:w-40", dark ? "text-sky" : "text-royal")}
          >
            <path
              className="ink-line ink-line--enter"
              d="M2 9C43 3 84 3 127 6c19 1 35 1 51-2"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              className="ink-line ink-line--enter"
              d="M34 13c33-3 65-3 97-2"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p
            className={cn(
              "page-enter-fast mt-6 max-w-2xl text-[1.05rem] leading-relaxed sm:text-lg",
              dark ? "text-white/80" : "text-ink/80"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            {intro}
          </p>
          {children && (
            <div className="page-enter-fast mt-8" style={{ animationDelay: "0.6s" }}>
              {children}
            </div>
          )}
        </div>
        {art && (
          <div
            className="page-enter-fast relative hidden min-h-[16rem] lg:block"
            style={{ animationDelay: "0.55s" }}
          >
            <svg
              viewBox="0 0 420 300"
              fill="none"
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)]",
                dark ? "text-sky/70" : "text-royal/60"
              )}
            >
              <path
                className="ink-line ink-line--enter"
                d="M18 157C53 47 180 15 288 48c60 18 91 48 102 85"
                pathLength={1}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                className="ink-line ink-line--enter"
                d="m379 116 11 17 12-17"
                pathLength={1}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {art}
          </div>
        )}
      </div>
    </header>
  );
}

/** Big floating sticker used as page-hero art */
export function Sticker({
  src,
  className,
  rotate = 0,
  delay = 0,
}: {
  src: string;
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={cn("sticker-art animate-floaty drop-shadow-[0_14px_20px_rgba(11,37,69,.25)]", className)}
      style={{ "--r": `${rotate}deg`, animationDelay: `${delay}s` } as CSSProperties}
    />
  );
}

/* ── Browser frame for screenshots ──────────────────────────────────────── */
export function BrowserFrame({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("frame", className)}>
      <div className="frame__bar" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <img src={src} alt={alt} loading="lazy" className="w-full" />
      {caption && (
        <figcaption className="border-t-2 border-ink bg-white px-4 py-2.5 text-[0.82rem] font-bold">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ── Icons ──────────────────────────────────────────────────────────────── */
type IconProps = { className?: string };

export const ArrowRight = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-[1.1em]", className)}
    aria-hidden
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-[1.05em]", className)}
    aria-hidden
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const WhatsAppIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-5", className)} aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.9-.4-4.16-1.15l-.3-.18-3.08.89.9-3-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.3-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.54.12.16 1.73 2.65 4.2 3.72 1.55.67 2.15.73 2.92.62.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.23-.16-.48-.28Z" />
  </svg>
);

export const MailIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-5", className)}
    aria-hidden
  >
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 8 8 6 8-6" />
  </svg>
);

export const SocialIcon = ({ name, className }: { name: string; className?: string }) => {
  const c = cn("size-5", className);
  if (name === "LinkedIn")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={c} aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.8v1.57h.06c.53-1 1.82-2.07 3.75-2.07 4 0 4.74 2.63 4.74 6.05v5.95h-4v-5.28c0-1.26-.02-2.88-1.76-2.88-1.76 0-2.03 1.37-2.03 2.79v5.37h-4V9.75Z" />
      </svg>
    );
  if (name === "Instagram")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={c}
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r=".6" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={c} aria-hidden>
      <path d="M16.6 3c.3 2.4 1.7 3.9 4 4.1v3.1c-1.4.1-2.7-.3-4-1.1v6.1c0 3.9-2.7 6.2-5.9 6.2-3.4 0-5.9-2.6-5.9-5.8 0-3.5 2.9-6.2 6.6-5.7v3.2c-1.8-.5-3.4.6-3.4 2.4 0 1.5 1.1 2.6 2.7 2.6 1.6 0 2.8-1.1 2.8-3.1V3h3.1Z" />
    </svg>
  );
};

export const LogoMark = ({ className }: IconProps) => (
  <img
    src={img.logo}
    alt=""
    width={40}
    height={40}
    className={cn("size-9 object-contain", className)}
  />
);

/** Wrap long copy blocks */
export const Prose = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("max-w-2xl text-[1.02rem] leading-[1.7]", className)}>{children}</p>
);
