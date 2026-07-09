"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightSmIcon } from "@/components/icons";
import type { Project } from "@/types/project";
import styles from "./ProjectsListPage.module.css";

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function ProjectCta({ href }: { href: string }) {
  return (
    <Link href={href} className={styles.cta}>
      <span className={styles.ctaLabel}>ПОДРОБНЕЕ</span>
      <span className={styles.ctaIconWrapper}>
        <span className={styles.ctaIconTrack}>
          <span className={styles.ctaIconSlot}>
            <ArrowUpRightSmIcon />
          </span>
          <span className={styles.ctaIconSlot}>
            <ArrowUpRightSmIcon />
          </span>
        </span>
      </span>
    </Link>
  );
}

function ProjectItem({
  project,
  thumbnailRef,
  imageRef,
}: {
  project: Project;
  thumbnailRef: (el: HTMLImageElement | null) => void;
  imageRef: (el: HTMLImageElement | null) => void;
}) {
  const href = `/projects/${project.slug}`;

  return (
    <div className={styles.projectItem}>
      <div className={styles.contentCol}>
        <div className={styles.head}>
          <Link href={href}>
            <h2 className={styles.projectTitle}>{project.title}</h2>
          </Link>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <Link href={href} className={styles.thumbnail}>
            {project.imageThumbUrl && (
              <Image
                ref={thumbnailRef}
                src={project.imageThumbUrl}
                fill
                unoptimized
                sizes="(min-width: 768px) 234px, 140px"
                className={`object-cover ${styles.parallaxImage}`}
                alt={project.title}
              />
            )}
          </Link>

          <div className={styles.descWrapper}>
            <p className={styles.desc}>{truncate(project.description, 120)}</p>
            <ProjectCta href={href} />
          </div>
        </div>
      </div>

      <Link href={href} className={styles.imageCol}>
        {project.images[0] && (
          <Image
            ref={imageRef}
            src={project.images[0].url}
            fill
            unoptimized
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover ${styles.parallaxImage}`}
            alt=""
          />
        )}
      </Link>
    </div>
  );
}

export function ProjectsListPage({ projects }: { projects: Project[] }) {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const thumbnailRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const applyParallax = (
      els: (HTMLImageElement | null)[],
      speed: number,
      viewportCenter: number,
    ) => {
      for (const el of els) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const offset = (viewportCenter - elCenter) * speed;
        el.style.setProperty("--parallax-y", `${offset}px`);
      }
    };

    const update = () => {
      const viewportCenter = window.innerHeight / 2;
      applyParallax(imageRefs.current, 0.08, viewportCenter);
      applyParallax(thumbnailRefs.current, 0.04, viewportCenter);
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
      {projects.map((project, index) => (
        <ProjectItem
          key={project.slug}
          project={project}
          thumbnailRef={(el) => {
            thumbnailRefs.current[index] = el;
          }}
          imageRef={(el) => {
            imageRefs.current[index] = el;
          }}
        />
      ))}
    </section>
  );
}
