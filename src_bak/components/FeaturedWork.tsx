"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  { id: 1, name: "SIXT", title: "An extra 3m clicks regionally through SEO", image: "/work-images/work-1.jpg", badge: "Car Rental", timeline: "2023-2025", bg: "bg-teal-400" },
  { id: 2, name: "Dojo - B2B", title: "A B2B success story for Dojo card machines", image: "/work-images/work-2.jpg", badge: "Card Machines", timeline: "2021-2025", bg: "bg-purple-400" },
  { id: 3, name: "Magnet Trade - B2B", title: "A full service SEO success story 170%+ increase", image: "/work-images/work-3.jpg", badge: "SEO", timeline: "2025-2026", bg: "bg-orange-400" },
  { id: 4, name: "Financial Services", title: "B2B Marketing", image: "/work-images/work-4.jpg", badge: "Finance", timeline: "2022-2023", bg: "bg-pink-400" },
  { id: 5, name: "Global Fashion Brand", title: "SEO & Digital PR", image: "/work-images/work-1.jpg", badge: "Fashion", timeline: "2024-2025", bg: "bg-blue-400" },
  { id: 6, name: "Tech Startup Scale-up", title: "Content & Growth Strategy", image: "/work-images/work-2.jpg", badge: "Technology", timeline: "2023-2024", bg: "bg-teal-400" },
  { id: 7, name: "Travel & Hospitality", title: "Digital PR Campaign", image: "/work-images/work-3.jpg", badge: "Travel", timeline: "2025-2026", bg: "bg-orange-400" },
  { id: 8, name: "Financial Services", title: "B2B Marketing", image: "/work-images/work-4.jpg", badge: "Finance", timeline: "2022-2023", bg: "bg-pink-400" },
  { id: 9, name: "Global Fashion Brand", title: "SEO & Digital PR", image: "/work-images/work-1.jpg", badge: "Fashion", timeline: "2024-2025", bg: "bg-blue-400" },
  { id: 10, name: "Tech Startup Scale-up", title: "Content & Growth Strategy", image: "/work-images/work-2.jpg", badge: "Technology", timeline: "2023-2024", bg: "bg-teal-400" },
  { id: 11, name: "Travel & Hospitality", title: "Digital PR Campaign", image: "/work-images/work-3.jpg", badge: "Travel", timeline: "2025-2026", bg: "bg-orange-400" },
  { id: 12, name: "Financial Services", title: "B2B Marketing", image: "/work-images/work-4.jpg", badge: "Finance", timeline: "2022-2023", bg: "bg-pink-400" },
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: mousePos.x,
        y: mousePos.y,
        duration: 0.1,
        ease: "power2.out",
      });
    }
  }, [mousePos]);

  const mobileCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    // Shared config for pinning with 12px margin
    const pinConfig = {
      start: "top 12px",
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    };

    // Desktop
    mm.add("(min-width: 1024px)", () => {
      const container = containerRef.current;
      const names = namesRef.current;
      const images = imagesRef.current;
      if (!container || !names || !images) return;

      const imagesScroll = images.offsetHeight - container.offsetHeight;
      const namesScroll = names.offsetHeight - (container.offsetHeight * 0.45); // 0.45 matches h-[45vh]

      const tl = gsap.timeline({
        scrollTrigger: {
          ...pinConfig,
          trigger: container,
          end: () => `+=${imagesScroll}`,
        },
      });

      tl.to(images, { y: -imagesScroll, ease: "none" }, 0);
      tl.to(names, { y: -namesScroll, ease: "none" }, 0);
    });

    // Mobile
    mm.add("(max-width: 1023px)", () => {
      const container = containerRef.current;
      const mobileCards = mobileCardsRef.current;
      if (!container || !mobileCards) return;

      const scrollDistance = mobileCards.offsetHeight - container.offsetHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          ...pinConfig,
          trigger: container,
          end: () => `+=${scrollDistance}`,
        },
      });

      tl.to(mobileCards, { y: -scrollDistance, ease: "none" }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-black w-full h-[calc(100vh-24px)] overflow-hidden rounded-[2rem] lg:rounded-[3rem]"
      id="featured-work"
    >
      {/* Custom Cursor - Desktop Only */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-48 h-48 bg-white rounded-full z-[100] pointer-events-none hidden lg:flex items-center justify-center text-black mix-blend-difference transition-opacity duration-300 ${hoveredIndex !== null ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        style={{ left: -100, top: -100 }}
      >
        <i className="fa-solid fa-arrow-up-right text-[60px] text-black mix-blend-normal" />
      </div>

      <div className="flex flex-col lg:flex-row h-full w-full mx-auto px-6 lg:px-12 lg:gap-10">
        {/* Left Column: Work Names - Desktop Only */}
        <div
          ref={leftColumnRef}
          className="hidden lg:flex w-1/2 h-full flex-col justify-center relative z-10"
        >
          <div className="mb-8">
            <h2 className="text-white text-[22px] font-medium mb-2">Featured Work</h2>
          </div>

          <div className="relative h-[45vh] overflow-hidden">
            {/* Shadow Overlays */}
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            <div ref={namesRef} className="flex flex-col py-[12vh]">
              {works.map((work, index) => (
                <div
                  key={`${work.id}-${index}`}
                  className={`flex items-start gap-4 transition-all duration-500 transform text-white ${hoveredIndex === index
                    ? "translate-x-2"
                    : ""
                    }`}
                >
                  <h3 className="text-3xl lg:text-[75px] font-semibold leading-none cursor-default">
                    {work.name}
                  </h3>
                  <span className="text-base font-mono">[{work.timeline}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Images - Desktop Only */}
        <div
          ref={rightColumnRef}
          className="hidden lg:block w-1/2 h-full relative"
        >
          <div ref={imagesRef} className="flex flex-col gap-7 py-[20vh]">
            {works.map((work, index) => (
              <div
                key={`${work.id}-${index}-img`}
                className="w-full relative aspect-[6/4] mx-auto group cursor-none overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={work.image}
                  alt={work.name}
                  className="w-full h-full object-cover"
                />

                {/* Eclipse Overlay (Circular Clip-Path) */}
                <div
                  className={`absolute inset-0 ${work.bg} z-30 transition-all duration-500 ease-out flex flex-col p-10 overflow-hidden pointer-events-none`}
                  style={{
                    clipPath: hoveredIndex === index
                      ? "circle(150% at 50% 100%)"
                      : "circle(0% at 50% 100%)"
                  }}
                >
                  <div className={`transition-opacity duration-300 delay-150 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}>
                    <h4 className="text-5xl font-medium text-black leading-none">{work.title}</h4>
                  </div>
                  <div className={`mt-auto flex justify-end transition-opacity duration-300 delay-150 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}>
                    <span className="px-6 py-2 bg-white/20 rounded-full text-lg font-medium text-black tracking-tighter flex gap-2 items-center">
                      <i className="fa-sharp fa-regular fa-search text-lg" /> {work.badge} <i className="fa-sharp fa-regular fa-chart-line text-lg" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: Cards - Tablet/Mobile Only */}
        <div className="lg:hidden flex-1 overflow-hidden relative">
          <div ref={mobileCardsRef} className="flex flex-col gap-4 pb-20 pt-10">
            {/* Mobile Header */}
            <div className="lg:hidden">
              <h2 className="text-white text-[20px] font-medium">Feature Work</h2>
            </div>
            {works.map((work) => (
              <div key={work.id} className="relative aspect-[6/5] w-full rounded-2xl overflow-hidden shadow-2xl">
                <img src={work.image} alt={work.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />

                {/* Mobile Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-medium flex items-center gap-2">
                    <i className="fa-sharp fa-regular fa-search text-[10px]" /> {work.badge} <i className="fa-sharp fa-regular fa-chart-line text-[10px]" />
                  </span>
                </div>

                {/* Mobile Info */}
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-mono">[{work.timeline}]</p>
                    <h3 className="text-3xl font-semibold leading-tight tracking-tight">{work.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
