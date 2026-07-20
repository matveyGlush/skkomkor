"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightSmIcon } from "@/components/icons";
import { useProjects } from "@/lib/useProjects";
import styles from "./ProjectsSection.module.css";

function stripBrackets(tag: string) {
  return tag.replace(/^\[\s*/, "").replace(/\s*\]$/, "");
}

export function ProjectsSection() {
  const projects = useProjects();
  const [featured, ...rest] = projects.slice(0, 12);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const isMobile = mobileQuery.matches;
      if (imageContainerRef.current) {
        imageContainerRef.current.style.transform = isMobile
          ? ""
          : `translateY(${rect.top * 0.12}px)`;
      }
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${rect.top * 0.1}px)`;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!featured) return null;

  return (
    <section className={styles.featuredProjectSection}>
      {/* Featured Project */}
      <div className={styles.featuredProject} ref={sectionRef}>
        <div className={styles.featuredLeft}>
          <div>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <div className={styles.featuredMeta}>
              {featured.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={styles.featuredImage} ref={imageContainerRef}>
            <div ref={parallaxRef} className={styles.parallaxLayer}>
              {featured.images[0] && (
                <Image
                  src={featured.images[0].url}
                  fill
                  unoptimized
                  className="object-cover"
                  alt={featured.title}
                />
              )}
            </div>
          </div>

          <div>
            <p className={styles.featuredCaption}>{featured.description}</p>
            <Link href={`/projects/${featured.slug}`} className={styles.featuredCta}>
              ПОДРОБНЕЕ
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Project List */}
        <div className={styles.listWrapper}>
          <div className={styles.listCol}>
            {rest.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={styles.projectRow}
              >
                <span className={styles.projectName}>{project.title}</span>
                <div className={styles.projectMeta}>
                  <span className={styles.projectMetaText}>
                    {stripBrackets(project.tags[0] ?? "")}&nbsp;&nbsp;
                    {stripBrackets(project.tags[project.tags.length - 1] ?? "")}
                  </span>
                  <span className={styles.projectArrow} aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}

            <div className={styles.allProjectsCta}>
              <Link href="/projects" className={styles.allProjectsLink}>
                <span className={styles.allProjectsLabel}>ВСЕ ПРОЕКТЫ</span>
                <span className={styles.allProjectsIconBox}>
                  <span className={styles.allProjectsIconTrack}>
                    <span className={styles.allProjectsIconSlot}>
                      <ArrowUpRightSmIcon className={styles.allProjectsIcon} />
                    </span>
                    <span className={styles.allProjectsIconSlot}>
                      <ArrowUpRightSmIcon className={styles.allProjectsIcon} />
                    </span>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
