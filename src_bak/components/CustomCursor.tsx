"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [icon, setIcon] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      const left = e.clientX - cursor.clientWidth / 2;
      const top = e.clientY - cursor.clientHeight / 2;
      cursor.style.left = `${left}px`;
      cursor.style.top = `${top}px`;
    };

    document.addEventListener("pointermove", handleMouseMove);

    // Listen for custom events from other components
    const handleCursorUpdate = (e: CustomEvent) => {
      if (e.detail.active !== undefined) {
        setActive(e.detail.active);
      }
      if (e.detail.icon !== undefined) {
        setIcon(e.detail.icon);
      }
      if (e.detail.text !== undefined) {
        setText(e.detail.text);
      }
    };

    document.addEventListener(
      "component-cursor" as any,
      handleCursorUpdate as any
    );
    document.addEventListener(
      "component-cursor-button" as any,
      handleCursorUpdate as any
    );

    return () => {
      document.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener(
        "component-cursor" as any,
        handleCursorUpdate as any
      );
      document.removeEventListener(
        "component-cursor-button" as any,
        handleCursorUpdate as any
      );
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 isolate overflow-hidden rounded-full transition-transform hidden lg:flex ${
        active ? "scale-100" : "scale-0"
      } ${icon ? "w-24 h-24 lg:w-32 lg:h-32" : ""} ${
        text ? "w-auto px-6 py-3" : ""
      } ${active ? "bg-mint text-grey-900" : ""}`}
      style={{ transition: "transform 0.3s ease, width 0.3s ease, height 0.3s ease" }}
    >
      {icon && (
        <i
          className={`fa-regular fa-sharp ${icon} text-2xl lg:text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        />
      )}
      {text && (
        <span className="text-lg font-medium whitespace-nowrap">{text}</span>
      )}
    </div>
  );
}
