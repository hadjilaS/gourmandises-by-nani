"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.3 }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.4"
        );

      // Subtle scroll parallax on the background image
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex h-svh min-h-155 w-full items-center justify-center overflow-hidden"
    >
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/gallery/pack.png"
          alt="Wedding cake trois étages de Gourmandises By Nani, entouré de roses et de décor de mariage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-chocolate-900/55 via-chocolate-900/35 to-chocolate-900/70" />
      <div className="absolute inset-0 bg-linear-to-t from-cream via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center text-cream">
        <span className="hero-eyebrow mb-5 inline-block rounded-full border border-gold-300/60 bg-cream/10 px-5 py-1.5 text-xs uppercase tracking-[0.3em] backdrop-blur-sm">
          Pâtisserie artisanale &middot; sur commande
        </span>

        <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
          <span className="hero-title-line block">Gourmandises</span>
          <span className="hero-title-line block italic text-gradient-gold">By Nani</span>
        </h1>

        <p className="hero-subtitle mt-6 max-w-xl text-balance text-base leading-relaxed text-cream/90 md:text-lg">
          Des créations gourmandes faites avec passion pour rendre chaque
          événement inoubliable.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#creations"
            className="hero-cta rounded-full bg-cream px-8 py-3.5 text-sm font-medium tracking-wide text-chocolate-700 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:bg-rose-100"
          >
            Découvrir nos créations
          </a>
          <a
            href="#order"
            className="hero-cta rounded-full border border-gold-300/70 bg-transparent px-8 py-3.5 text-sm font-medium tracking-wide text-cream backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-cream/10"
          >
            Commander maintenant
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-cream/80">
        <ChevronDown size={28} aria-hidden="true" />
      </div>
    </section>
  );
}
