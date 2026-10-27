"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PageReveal() {
  const ellipseRef = useRef<SVGEllipseElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page load animation - circle reveal
    const ellipse = document.querySelector("#reveal-ellipse") as SVGEllipseElement;
    if (ellipse) {
      gsap.to(ellipse, {
        attr: { rx: 2700, ry: 2150 },
        duration: 1.25,
        ease: "power2.out",
        onComplete: () => {
          const mask = document.getElementById("page-reveal-mask");
          if (mask) {
            gsap.to(mask, {
              opacity: 0, duration: 0.5, onComplete: () => {
                mask.style.display = "none";
              }
            });
          }
        },
      });
    }
  }, []);

  return (
    <div
      ref={maskRef}
      className="fixed inset-0 w-screen h-screen z-[100] pointer-events-none hidden lg:block"
      id="page-reveal-mask"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className="block w-screen h-svh"
      >
        <defs>
          <mask id="circle-reveal-mask">
            <rect width="100%" height="100%" fill="white" />
            <ellipse
              id="reveal-ellipse"
              cx="960"
              cy="2000"
              rx="0"
              ry="0"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="var(--mask-colour)"
          mask="url(#circle-reveal-mask)"
        />
      </svg>
    </div>
  );
}
