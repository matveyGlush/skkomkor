"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightSmIcon } from "@/components/icons";
import type { Project } from "@/types/project";
import styles from "./ProjectDetailPage.module.css";

export function ProjectDetailPage({ project }: { project: Project }) {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      const viewportCenter = window.innerHeight / 2;
      for (const el of imageRefs.current) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const offset = (viewportCenter - elCenter) * 0.12;
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
      <div className={styles.sidebar}>
        <Link href="/projects" className={styles.breadcrumb}>
          <span className={styles.breadcrumbIcon}>
            <ArrowUpRightSmIcon className={styles.breadcrumbArrow} />
          </span>
          ВСЕ ПРОЕКТЫ
        </Link>

        <h1 className={styles.title}>{project.title}</h1>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <p className={styles.desc}>{project.description}</p>
      </div>

      <div className={styles.gallery}>
        {project.images.map((image, index) => (
          <div className={styles.galleryImage} key={image.id}>
            <Image
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              src={image.url}
              fill
              unoptimized
              priority={index === 0}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className={`object-cover ${styles.parallaxImage}`}
              alt={index === 0 ? project.title : ""}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
