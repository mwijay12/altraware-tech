"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const phrase = "Ready to Rise at Seven?";

  useEffect(() => {
    let ctx = gsap.context(() => {
      const letters = textRef.current?.querySelectorAll(".letter");
      if (!letters || letters.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 1. Move the entire container horizontally to preserve the "text" look
      // Start from 100vw (right) and move to -250vw (left)
      tl.fromTo(textRef.current,
        { x: "100vw" },
        {
          x: "-250vw",
          duration: 1,
          ease: "none"
        }
      );

      // 2. Stagger the "y" animation of the letters so they "land" sequentially
      // They start at the top (0) and drop to the bottom (220) early in the scroll
      tl.to(letters, {
        y: 140,
        stagger: {
          each: 0.02,
          from: "start"
        },
        duration: 0.2, // Drop quickly to stay visible at the bottom
        ease: "power2.inOut"
      }, 0); // Start at the same time as the horizontal move

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[460px] overflow-hidden flex items-start"
    >
      <div className="w-full relative h-full">
        <h2
          ref={textRef}
          className="text-grey-900 text-[200px] font-medium whitespace-nowrap flex flex-nowrap select-none absolute top-0"
        >
          {phrase.split("").map((char, i) => (
            <span
              key={i}
              className="letter inline-block"
              style={{ minWidth: char === " " ? "0.4em" : "auto" }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
