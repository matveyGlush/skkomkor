"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = [
  { src: "/images/hero-1.jpg", alt: "Luxury residence exterior" },
  { src: "/images/hero-2.jpg", alt: "Luxury residence interior" },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-white">
      {/* Visually hidden h1 for screen readers */}
      <h1 className="sr-only">ARCHIDOMO</h1>

      {/* Carousel image container — 88% of viewport height */}
      <div className="absolute top-0 right-0 left-0 h-[88%] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Tagline — bottom-left, sits in the white strip below the carousel */}
      <div className="absolute bottom-4 left-4">
        <p
          className="text-[22px] font-normal leading-[1.3] text-[#0b080d] max-w-[400px]"
          style={{ fontFamily: '"Maison Neue", sans-serif' }}
        >
          Our architecture agency designs
          <br />
          exceptional residences in rare
          <br />
          locations, in France and around the
          <br />
          world.
        </p>
      </div>
    </section>
  );
}
