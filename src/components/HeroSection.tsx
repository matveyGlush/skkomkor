"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import styles from "./HeroSection.module.css";

const slides = [
  { src: "/images/hero-3.webp", alt: "Luxury residence interior" },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const smallParallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      parallaxRefs.current.forEach((el) => {
        if (el) el.style.transform = `translateY(${y * 0.3}px)`;
      });
      if (smallParallaxRef.current) {
        smallParallaxRef.current.style.transform = `translateY(${y * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.section}>
      <h1 className="">SKKOMKOR</h1>
      <div className={styles.background}></div>

      <div className={styles.carousel}>
        <div className={styles.textShadow}></div>
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={cn(
              styles.slide,
              index === activeIndex ? styles.slideActive : styles.slideHidden
            )}
          >
            <div
              ref={(el) => { parallaxRefs.current[index] = el; }}
              className={styles.parallaxLayer}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : undefined}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tagline}>
        <p className={styles.taglineText}>
          Профессиональные фасадные
          <br />
          и реставрационные работы.
          <br />
          Качество, надежность и внимание к каждой детали.
        </p>
      </div>

      <div className={styles.smallImageContainer}>
        <div ref={smallParallaxRef} className={styles.smallParallaxLayer}>
          <Image
            src={"/images/hero-5.webp"}
            alt={"Luxury residence interior"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 43vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
}
