"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  previewImage?: string;
}

const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/services/",
    previewImage: "/work-images/work-1.jpg",
    children: [
      { label: "Search & Growth Strategy", href: "#", previewImage: "/work-images/work-2.jpg" },
      { label: "Onsite SEO", href: "#", previewImage: "/work-images/work-3.jpg" },
      { label: "Content Experience", href: "#", previewImage: "/work-images/work-1.jpg" },
      { label: "B2B Marketing", href: "#", previewImage: "/work-images/work-4.jpg" },
      { label: "Digital PR", href: "#", previewImage: "/work-images/work-3.jpg" },
      { label: "Social Media & Campaigns", href: "#", previewImage: "/work-images/work-1.jpg" },
      { label: "Data & Insights", href: "#", previewImage: "/work-images/work-4.jpg" },
      { label: "Social SEO/Search", href: "#", previewImage: "/work-images/work-2.jpg" },
    ],
  },
  {
    label: "Industries",
    href: "/industries/",
    previewImage: "/work-images/work-4.jpg",
    children: [
      { label: "B2B Marketing", href: "#", previewImage: "/work-images/work-3.jpg" },
    ],
  },
  {
    label: "International",
    href: "/international/",
    previewImage: "/work-images/work-2.jpg",
    children: [
      { label: "US Digital PR", href: "#", previewImage: "/work-images/work-2.jpg" },
      { label: "Spain Digital PR", href: "#", previewImage: "/work-images/work-3.jpg" },
      { label: "Germany Digital PR", href: "#", previewImage: "/work-images/work-1.jpg" },
      { label: "Netherlands Digital PR", href: "#", previewImage: "/work-images/work-4.jpg" },
    ],
  },
  {
    label: "About",
    href: "/about/",
    previewImage: "/work-images/work-1.jpg",
    children: [
      { label: "About Us", href: "#", previewImage: "/work-images/work-2.jpg" },
      { label: "Meet The Risers", href: "#", previewImage: "/work-images/work-1.jpg" },
      { label: "Culture", href: "#", previewImage: "/work-images/work-4.jpg" },
      { label: "Testimonials", href: "#", previewImage: "/work-images/work-3.jpg" },
    ],
  },
  { label: "Work", href: "/work/" },
  { label: "Careers", href: "/careers/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<NavItem | null>(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [hideAnnouncement, setHideAnnouncement] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  const hoverBgRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const previousScrollY = (handleScroll as any).previousScrollY || 0;

      setIsAtTop(scrollY < 20);
      setHideAnnouncement(scrollY > 20);

      if (scrollY > 100) {
        if (scrollY > previousScrollY) {
          setHideHeader(true); // Scrolling down
        } else {
          setHideHeader(false); // Scrolling up
        }
      } else {
        setHideHeader(false);
      }

      (handleScroll as any).previousScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu fade animation
  useEffect(() => {
    if (mobileMenu && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [mobileMenu]);

  // Close mobile menu with fade out
  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setMobileMenu(false);
          setExpandedMobileItem(null);
        }
      });
    } else {
      setMobileMenu(false);
      setExpandedMobileItem(null);
    }
  };

  // Handle nav hover - GSAP slider
  const handleNavHover = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const navContainer = target.closest(".nav-items-container");
    if (navContainer && hoverBgRef.current) {
      const containerRect = (navContainer as HTMLElement).getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      gsap.to(hoverBgRef.current, {
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleNavLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      // Only hide if no submenu is active
      if (!activeSubmenu) {
        if (hoverBgRef.current) {
          gsap.to(hoverBgRef.current, { opacity: 0, duration: 0.2 });
        }
        setActiveSubmenu(null);
        setHoveredSubItem(null);
      }
    }, 150);
  };

  // Function to pin hover bg to a specific item (used for active state)
  const pinHoverBg = (label: string) => {
    const navContainer = document.querySelector(".nav-items-container");
    const target = Array.from(document.querySelectorAll(".nav-item-link")).find(
      (el) => el.textContent?.trim().includes(label)
    );

    if (navContainer && target && hoverBgRef.current) {
      const containerRect = navContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      gsap.to(hoverBgRef.current, {
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Handle submenu hover
  const handleSubmenuEnter = (item: NavItem) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveSubmenu(item.label);
    pinHoverBg(item.label); // Pin the background
    if (!hoveredSubItem && item.children) {
      setHoveredSubItem(item.children[0]);
    }
  };

  const handleSubmenuLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
      setHoveredSubItem(null);
      if (hoverBgRef.current) {
        gsap.to(hoverBgRef.current, { opacity: 0, duration: 0.2 });
      }
    }, 150);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div
        className={`pt-2.5 px-2.5 w-full transition-all duration-500 ${mobileMenu ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          } ${hideAnnouncement ? "h-0 overflow-hidden py-0" : ""}`}
      >
        <Link
          href="/multi-channel-search-report-2026/"
          className="group flex justify-center z-[60] relative items-center text-xs w-full py-2 px-5 text-balance text-center tracking-tight leading-none font-semibold rounded-2xl transition transition-rounded lg:text-sm text-grey-900 bg-mint"
        >
          <span className="block mt-0.5 lg:hidden">
            🚨 The Category Leaderboard - Live Now
          </span>
          <span className="relative overflow-hidden mt-0.5 hidden lg:block">
            <span className="transition inline-block pointer-fine:group-hover:-translate-y-6">
              🚨 The Category Leaderboard - Live Now
            </span>
            <span className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0">
              🚨 The Category Leaderboard - Live Now
            </span>
          </span>
        </Link>
      </div>

      {/* Navbar container */}
      <div
        className={`w-full fixed top-0 left-0 z-50 flex transition-all duration-700 h-18 lg:h-20  ${hideHeader ? "-translate-y-full" : ""
          } ${mobileMenu ? "bg-transparent" : ""} px-[0.625rem] ${isAtTop ? "pt-[5rem]" : "pt-[0.625rem]"}`}
        onMouseLeave={handleNavLeave}
      >
        {/* Background with blur - shown when scrolled */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${isAtTop ? "bg-transparent" : "bg-white/70 backdrop-blur-sm lg:mx-4 z-90"
            } ${hideAnnouncement || !isAtTop ? "lg:rounded-full lg:top-2.5" : "lg:top-2.5"}`}
        />

        <div className="relative w-full flex items-center justify-between px-4 lg:px-6 py-3">
          {/* Logo */}
          <Link href="/" className="w-32 inline-flex md:w-40 z-100">
            <svg
              className={`w-full h-full object-contain transition-colors ${isAtTop ? "text-white" : "text-grey-900"
                }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 168 21"
              fill="currentColor"
            >
              <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z" />
              <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z" />
              <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z" />
              <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z" />
              <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z" />
              <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z" />
              <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z" />
              <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z" />
              <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z" />
              <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z" />
              <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z" />
              <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z" />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-x-1 nav-items-container relative">
            {/* Hover Background Slider */}
            <div
              ref={hoverBgRef}
              className="absolute top-1/2 -translate-y-1/2 h-full bg-white rounded-full pointer-events-none z-95"
            />

            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={(e) => {
                  handleNavHover(e);
                  if (item.children) {
                    handleSubmenuEnter(item);
                  } else {
                    // Close any open submenu but keep the slider visible
                    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                    setActiveSubmenu(null);
                    setHoveredSubItem(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  className={`nav-item-link relative z-100 px-4 py-1 flex items-center font-medium transition-all duration-200 ease-in-out ${isAtTop ? "text-white hover:text-grey-900 group rounded-full" : "text-grey-900 rounded-full"
                    } ${item.children && activeSubmenu === item.label && "!text-grey-900"}`}
                >
                  {item.label} {item.children && <i className="fa-sharp fa-regular fa-plus text-[10px] ml-1"></i>}
                  {item.label === "Work" && <span className="text-[8px] px-1 py-0.5 rounded-full bg-mint text-grey-900 absolute -top-2 group-hover:-top-4 right-0.5 transition-all duration-200 ease-in-out">25</span>}
                </Link>

                {/* Submenu */}
                {item.children && activeSubmenu === item.label && (
                  <div
                    className="fixed left-0 right-0 top-0 h-screen pointer-events-none z-40"
                    onMouseEnter={() => handleSubmenuEnter(item)}
                  >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-md pointer-events-auto" onClick={handleSubmenuLeave} />

                    {/* Submenu Panel */}
                    <div
                      className={`absolute ${isAtTop ? "top-20 lg:top-30" : "top-20 lg:top-24"} left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 pointer-events-auto flex gap-6 overflow-hidden w-max items-center`}
                      onMouseEnter={() => handleSubmenuEnter(item)}
                      onMouseLeave={handleSubmenuLeave}
                    >
                      {/* Left: Content */}
                      <div className="flex flex-col">
                        {/* Category Label */}
                        <span className="text-grey-500 text-sm font-medium mb-6 uppercase tracking-wider">
                          {item.label === "Services" ? "Core Services" : `Explore ${item.label}`}
                        </span>

                        {/* 2-Column Links */}
                        <div className={`grid ${item.children.length < 5 ? "grid-cols-1" : "grid-cols-2"} gap-x-12 gap-y-0.5`}>
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="group block py-0.25 relative overflow-hidden"
                              onMouseEnter={() => setHoveredSubItem(child)}
                            >
                              <div className="relative h-7 overflow-hidden pr-8">
                                <span className="block transition-transform duration-500 group-hover:-translate-y-full text-xl font-semibold text-grey-900 whitespace-nowrap leading-tight">
                                  {child.label}
                                </span>
                                <span className="absolute top-full left-0 block transition-transform duration-500 group-hover:-translate-y-full text-xl font-semibold text-grey-900 whitespace-nowrap leading-tight">
                                  {child.label}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right: Image Preview */}
                      <div className="relative w-[250px] h-[250px] rounded-2xl overflow-hidden bg-grey-900 flex-shrink-0 shadow-sm">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={hoveredSubItem?.previewImage || item.previewImage}
                            src={hoveredSubItem?.previewImage || item.previewImage}
                            alt=""
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </AnimatePresence>

                        {/* Overlay with Button (Bottom Left) */}
                        {item.label === "Services" && <div className="absolute inset-0 flex items-end justify-start p-6 bg-gradient-to-t from-black/40 to-transparent">
                          <Link
                            href={item.href}
                            className="bg-black text-white px-6 py-3 rounded-full hover:rounded-md text-sm font-semibold flex items-center gap-3 transition-all group/btn"
                          >
                            View All Services <i className="fa-sharp fa-regular fa-arrow-right -rotate-45 group-hover/btn:rotate-0 transition-transform" />
                          </Link>
                        </div>
                        }
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Get in Touch Button */}
          <Link
            href="/contact/"
            className={`group hidden lg:inline-flex items-center gap-x-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-500 hover:rounded-lg z-100 ${isAtTop ? "text-grey-900 bg-white" : "text-white bg-grey-900"} transition-transform duration-300 ease-in-out`}
          >
            <span className="relative overflow-hidden">
              <span className="transition inline-block group-hover:-translate-y-6">Get in touch <i className="fa-sharp fa-regular fa-arrow-up-right" /></span>
              <span className="absolute top-0 left-0 translate-y-6 group-hover:translate-y-0 transition">Get in touch <i className="fa-sharp fa-regular fa-arrow-up-right" /></span>
            </span>

          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenu(!mobileMenu);
              setExpandedMobileItem(null);
            }}
            className={`lg:hidden inline-flex items-center justify-center w-12 h-8 ${isAtTop ? "text-white" : "text-grey-900 z-100"
              }`}
            aria-label="Toggle menu"
          >
            <div className="flex w-5 h-2 flex-col items-start justify-between">
              <div
                className={`w-full h-px transition-transform duration-500 ${mobileMenu ? `transform rotate-45 translate-y-1 ${isAtTop ? "bg-white" : "bg-gray-900"}` : `bg-current`
                  }`}
              />
              <div
                className={`w-full h-px transition-transform duration-500 ${mobileMenu ? `transform -rotate-45 -translate-y-1 ${isAtTop ? "bg-white" : "bg-gray-900"}` : `bg-current`
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenu && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-50 lg:hidden p-1 backdrop-blur-sm"
          onClick={closeMobileMenu}
        >
          <div
            className="w-full h-full bg-grey-900/85 rounded-3xl p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top: Logo and Close */}
            <div className="flex items-center justify-between mb-10">
              <Link href="/" className="w-32" onClick={closeMobileMenu}>
                <svg
                  className={`w-full h-full object-contain text-white`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 168 21"
                  fill="currentColor"
                >
                  <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z" />
                  <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z" />
                  <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z" />
                  <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z" />
                  <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z" />
                  <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z" />
                  <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z" />
                  <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z" />
                  <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z" />
                  <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z" />
                  <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z" />
                  <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z" />
                </svg>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="w-12 h-12 flex items-center justify-center"
              >
                <div className="w-6 h-6 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-white rotate-45 absolute" />
                    <div className="w-full h-0.5 bg-white -rotate-45 absolute" />
                  </div>
                </div>
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="text-white text-[36px] tracking-tight font-medium leading-none"
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault();
                            setExpandedMobileItem(
                              expandedMobileItem === item.label ? null : item.label
                            );
                          } else {
                            closeMobileMenu();
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          onClick={() =>
                            setExpandedMobileItem(
                              expandedMobileItem === item.label ? null : item.label
                            )
                          }
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs border border-grey-300 transition-transform ${expandedMobileItem === item.label ? "rotate-180" : ""
                            }`}
                        >
                          <i className="fa-sharp fa-regular fa-angle-down" />
                        </button>
                      )}
                    </div>
                    {/* Mobile Submenu */}
                    {item.children && expandedMobileItem === item.label && (
                      <div className="py-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block text-grey-200 text-[22px] font-medium hover:text-white transition"
                            onClick={closeMobileMenu}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Bottom: Get in Touch */}
            <div className="pt-6">
              <Link
                href="/contact/"
                className="block w-full text-center py-3 bg-white text-grey-900 rounded-full font-medium"
                onClick={closeMobileMenu}
              >
                Get in touch <i className="fa-sharp fa-regular fa-arrow-up-right pl-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
