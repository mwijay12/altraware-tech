"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT } from "@/lib/data";
import { useSiteContent } from "@/lib/site-content";

export default function ServiceCards() {
  const { servicesHeading, services, contact } = useSiteContent();
  const waBase = (contact && contact.whatsapp) || CONTACT.whatsapp;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Underline draw on scroll
    gsap.to(".title-underline-svg path", {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".service-cards-wrapper",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Entrance cascade — clearProps on complete so hover tweens
    // can never strand a card half-faded if interrupted.
    gsap.fromTo(
      ".service-cards-grid .card",
      { y: 90, opacity: 0, rotation: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.1,
        clearProps: "all",
        scrollTrigger: { trigger: ".service-cards-wrapper", start: "top 72%", once: true },
      }
    );

    // Hover lift — overwrite:'auto' only touches its own props,
    // so it can never kill the entrance opacity mid-flight.
    const fineHover = window.matchMedia("(hover: hover)").matches;
    if (fineHover) {
      document.querySelectorAll(".service-cards-grid .card").forEach((card) => {
        const chip = card.querySelector(".tech-chip");
        const onEnter = () => {
          gsap.to(card, { y: -12, rotation: 0, scale: 1.02, duration: 0.5, ease: "expo.out", overwrite: "auto" });
          if (chip) gsap.to(chip, { rotation: "+=360", duration: 0.9, ease: "power2.inOut", overwrite: "auto" });
        };
        const onLeave = () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }

    // Tech chips pop in, then float (y only — hover owns rotation)
    gsap.utils.toArray(".service-cards-grid .tech-chip").forEach((chip, i) => {
      gsap.fromTo(
        chip,
        { scale: 0, rotation: -20 },
        {
          scale: 1,
          rotation: i % 2 === 0 ? 6 : -6,
          duration: 0.9,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".service-cards-wrapper", start: "top 70%", once: true },
          onComplete: () =>
            gsap.to(chip, {
              y: -10,
              duration: 1.8 + (i % 4) * 0.25,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }),
        }
      );
    });

    // List items cascade per card
    gsap.utils.toArray(".service-cards-grid .card").forEach((card) => {
      gsap.fromTo(
        card.querySelectorAll(".card-list li"),
        { x: -16, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      );
    });

    // Title cloud: slow spin + bob
    gsap.to(".title-tech-icon", { rotation: 360, duration: 26, ease: "none", repeat: -1 });
    gsap.to(".title-tech-icon", { y: -8, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true });
  }, []);

  return (
    <>
      {/* ─── Heading ─── */}
      <div className="title-container">
        <h2 className="main-title">
          {servicesHeading}
          <img
            src="/assets/tech/icon-cloud.png"
            alt=""
            aria-hidden="true"
            className="title-tech-icon"
            loading="lazy"
          />
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          viewBox="0 0 159 17"
          fill="none"
          className="title-underline-svg"
        >
          <path
            d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>

      {/* ─── Service Cards Grid ─── */}
      <div className="cards-wrapper service-cards-grid" id="cards-wrapper">
        {services.map((card) => (
          <article key={card.color + card.title} className={`card card-${card.color}`}>
            <div className="card-photo">
              <img src={card.image} alt={card.imageAlt || card.title} loading="lazy" />
              <span className="card-badge">{card.tag}</span>
              <div className="tech-chip">
                <img src={card.icon} alt="" aria-hidden="true" loading="lazy" />
              </div>
            </div>
            <h3 className="card-title">{card.title}</h3>
            <svg width="100%" height="10" className="card-divider-svg" aria-hidden="true">
              <use href="#card-divider" />
            </svg>
            <ul className="card-list">
              {card.services.map((service) => (
                <li key={service}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="16"
                    className="services-card__bullet-svg"
                    aria-hidden="true"
                  >
                    <use href="#bullet-icon" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
            <a
              href={`${waBase}%20I%20want%20to%20discuss%20${encodeURIComponent(card.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-action-hint"
            >
              <span>Chat on WhatsApp</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
