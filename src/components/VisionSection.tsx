"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./VisionSection.module.css";

export function VisionSection() {
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [
      { el: image1Ref.current, speed: 0.12 },
      { el: image2Ref.current, speed: 0.12 },
    ];

    let ticking = false;

    const update = () => {
      const viewportCenter = window.innerHeight / 2;
      for (const { el, speed } of targets) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const offset = (viewportCenter - elCenter) * speed;
        el.style.setProperty("--parallax-y", `${offset}px`);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
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
      <div className={styles.circle} />
      <div className={styles.circle_2} />

      <div className={styles.row1}>
        <h2 className={styles.heading}>Наш подход</h2>
        <p className={styles.body}>
          КОМКОР самостоятельно выполняет проектирование, изготовление и&nbsp;монтаж
          алюминиевых навесных фасадных систем, вентилируемых и&nbsp;штукатурных фасадов. 
          Мы&nbsp;сотрудничаем с&nbsp;надёжными производителями и&nbsp;проектировщиками 
          металлических конструкций, обеспечивая
          высокое качество на&nbsp;каждом этапе работы.
        </p>
      </div>

      <div className={styles.imageGrid}>
        <div className={styles.imageContainer1}>
          <Image
            ref={image1Ref}
            src="/images/vision/vision-3.jpg"
            fill
            className={`object-cover ${styles.parallaxImage}`}
            alt="Villa Elektra"
          />
        </div>
        <div className={styles.imageContainer2}>
          <Image
            ref={image2Ref}
            src="/images/vision/vision-4.jpeg"
            fill
            className={`object-cover ${styles.parallaxImage}`}
            alt="Villa Elektra"
          />
        </div>
      </div>

      <div className={styles.row3}>
        <p className={styles.caption}>
          <span className={styles.captionPlus} aria-hidden="true"></span>
          БОЛЕЕ ДЕСЯТИ ЛЕТ
          <br />
          НА СТРОИТЕЛЬНОМ РЫНКЕ
          <br />
          САНКТ-ПЕТЕРБУРГА
          <br />
          И СЕВЕРО-ЗАПАДА РОССИИ.
        </p>
      </div>

      <div className={styles.taglineWrapper}>
        <p className={styles.tagline}>
          Опыт, техника и собственное производство.
        </p>
      </div>
    </section>
  );
}
