"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRightSmIcon } from "@/components/icons";
import styles from "./InspirationSection.module.css";

interface Category {
  num: string;
  name: string;
  caption: string;
  images: string[];
}

const categories: Category[] = [
  {
    num: "01",
    name: "Фасадное остекление",
    caption: "АЛЮМИНИЕВЫЕ СВЕТОПРОЗРАЧНЫЕ КОНСТРУКЦИИ ЛЮБОЙ СЛОЖНОСТИ",
    images: [
      "/images/immersion/immersion-1.jpeg",
      "/images/immersion/immersion-2.jpeg",
      "/images/immersion/immersion-3.jpeg",
      "/images/immersion/immersion-4.jpeg",
    ],
  },
  {
    num: "02",
    name: "Вентилируемые фасады",
    caption: "НАДЁЖНЫЕ НАВЕСНЫЕ ФАСАДНЫЕ СИСТЕМЫ ДЛЯ ЛЮБЫХ ОБЪЕКТОВ",
    images: [
      "/images/immersion/immersion_2-1.jpeg",
      "/images/immersion/immersion_2-2.jpeg",
      "/images/immersion/immersion_2-3.jpeg",
      "/images/immersion/immersion_2-4.jpeg",
    ],
  },
];

export function InspirationSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);
  const galleryImageWrapRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const hero = heroRef.current;
    const imageWrap = heroImageWrapRef.current;
    if (!hero || !imageWrap) return;

    let ticking = false;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const progress = rect.top / window.innerHeight;
      const offset = progress * -60;
      imageWrap.style.transform = `translate3d(0, ${offset}px, 0)`;

      galleryImageWrapRefs.current.forEach((el) => {
        const itemRect = el.parentElement?.getBoundingClientRect();
        if (!itemRect) return;
        const itemProgress =
          (itemRect.top + itemRect.height / 2 - window.innerHeight / 2) /
          window.innerHeight;
        el.style.transform = `translate3d(0, ${itemProgress * -30}px, 0)`;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.hero} ref={heroRef}>
        <div className={styles.heroImageWrap} ref={heroImageWrapRef}>
          <Image
            src="/images/hero-5.JPG"
            alt="Направления работ"
            fill
            className={styles.heroImage}
            priority
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Направления работ</h2>
          <p className={styles.heroDescription}>
            Полный цикл фасадных и витражных работ — от проектирования до сдачи объекта.
          </p>
        </div>
      </div>

      <div className={styles.content}>

        <div className={styles.accordion}>
          {categories.map((cat, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={cat.num}
                className={`${styles.accordionSection} ${isOpen ? styles.open : ""}`}
              >

                <div className={styles.divider} />

                <div className={styles.galleryOuter}>
                  <div className={styles.galleryInner}>
                    <div className={styles.gallery}>
                      <div>
                        <button
                          type="button"
                          className={styles.accordionHead}
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          aria-expanded={isOpen}
                        >
                          <span className={styles.crossIcon} aria-hidden="true">
                            <span className={styles.crossLineV} />
                            <span className={styles.crossLineH} />
                          </span>
                          <span className={styles.accordionTitle}>
                            {cat.name}
                          </span>
                        </button>
                        <p className={styles.galleryCaption}>{cat.caption}</p>
                      </div>
                      <div className={styles.galleryImages}>
                        {cat.images.map((src) => (
                          <div key={src} className={styles.galleryItem}>
                            <div
                              className={styles.galleryImageWrap}
                              ref={(el) => {
                                const key = `${i}-${src}`;
                                if (el) galleryImageWrapRefs.current.set(key, el);
                                else galleryImageWrapRefs.current.delete(key);
                              }}
                            >
                              <Image
                                src={src}
                                alt={cat.name}
                                fill
                                className={styles.galleryImage}
                                sizes="(max-width: 640px) 110px, 150px"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <a href="/immersion" className={styles.cta}>
          <span className={styles.ctaLabel}>Все виды деятельности</span>
          <span className={styles.ctaIconBox}>
            <span className={styles.ctaIconTrack}>
              <span className={styles.ctaIconSlot}>
                <ArrowUpRightSmIcon className={styles.ctaIcon} />
              </span>
              <span className={styles.ctaIconSlot}>
                <ArrowUpRightSmIcon className={styles.ctaIcon} />
              </span>
            </span>
          </span>
        </a>

      </div>
    </section>
  );
}
