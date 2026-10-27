"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const logos = [
  { name: "Red Bull", src: "/brand-logos/red-bull.webp" },
  { name: "Kroger", src: "/brand-logos/kroger.webp" },
  { name: "Emirates", src: "/brand-logos/emirates.webp" },
  { name: "Shark Ninja", src: "/brand-logos/shark-ninja.webp" },
  { name: "Sixt", src: "/brand-logos/sixt.webp" },
  { name: "XBox", src: "/brand-logos/xbox.webp" },
  { name: "PlayStation", src: "/brand-logos/playstation.webp" },
  { name: "HubSpot", src: "/brand-logos/hubspot.webp" },
  { name: "AXA", src: "/brand-logos/axa.webp" },
  { name: "Red Bull", src: "/brand-logos/red-bull.webp" },
  { name: "Kroger", src: "/brand-logos/kroger.webp" },
  { name: "JD", src: "/brand-logos/jd.webp" },
  { name: "Emirates", src: "/brand-logos/emirates.webp" },
  { name: "Shark Ninja", src: "/brand-logos/shark-ninja.webp" },
  { name: "Sixt", src: "/brand-logos/sixt.webp" },
  { name: "XBox", src: "/brand-logos/xbox.webp" },
  { name: "PlayStation", src: "/brand-logos/playstation.webp" },
  { name: "AXA", src: "/brand-logos/axa.webp" },
  { name: "HubSpot", src: "/brand-logos/hubspot.webp" },
  { name: "JD", src: "/brand-logos/jd.webp" },
];

export default function LogoCloud() {
  const swiperRef = useRef<any>(null);
  const [isPaused, setIsPaused] = useState(false);

  const pauseAnimation = () => {
    setIsPaused(true);
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const resumeAnimation = () => {
    setIsPaused(false);
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <section className="py-10 lg:py-20 px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Desktop: Text left, Logos right */}
        <div className="hidden md:grid grid-cols-12 gap-12 items-center mb-12">
          {/* Text */}
          <div className="col-span-2">
            <h2 className="text-base font-medium tracking-tight leading-[1.1]">
              The agency behind..
            </h2>
          </div>

          {/* Logo Scroll - Desktop */}
          <div className="col-span-10 relative">
            {/* Left Shadow Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#EFEEEC] to-transparent z-10 pointer-events-none" />

            {/* Right Shadow Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#EFEEEC] to-transparent z-10 pointer-events-none" />

            {/* Swiper Logos */}
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              spaceBetween={90}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={3000}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                if (isPaused) swiper.autoplay.stop();
              }}
              className="logo-swiper"
            >
              {logos.map((logo, index) => (
                <SwiperSlide key={`${logo.name}-${index}`} style={{ width: "auto" }}>
                  <div
                    className="h-14 aspect-[20/9] rounded-xl flex items-center justify-center text-white font-bold text-lg pointer-events-none"
                  >
                    <img src={logo.src} alt={logo.name} className="w-full h-full object-contain" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Mobile: Text top, Logos bottom in column */}
        <div className="md:hidden flex flex-col gap-8">
          {/* Text */}
          <h2 className="text-base font-medium tracking-tight leading-[1.1]">
            The agency behind...
          </h2>

          {/* Logo Scroll - Mobile */}
          <div className="relative">
            {/* Left Shadow Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#EFEEEC] to-transparent z-10 pointer-events-none" />

            {/* Right Shadow Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#EFEEEC] to-transparent z-10 pointer-events-none" />

            {/* Swiper Logos */}
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              spaceBetween={32}
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={3000}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                if (isPaused) swiper.autoplay.stop();
              }}
              className="logo-swiper"
            >
              {logos.map((logo, index) => (
                <SwiperSlide key={`${logo.name}-${index}`} style={{ width: "auto" }}>
                  <div
                    className="h-12 aspect-[20/9] rounded-xl flex items-center justify-center text-white font-bold text-base"
                  >
                    <img src={logo.src} alt={logo.name} className="w-full h-full object-contain" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
