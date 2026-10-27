"use client";

import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
