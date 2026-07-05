"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProjectsSection.module.css";

const projects = [
  { name: "ЖК «Десяткино»", size: "ШТУКАТУРНЫЙ ФАСАД", location: "МУРИНО" },
  { name: "ЖК «Виктория»", size: "ОКОННЫЕ КОНСТРУКЦИИ", location: "МУРИНО" },
  { name: "ЖК «Актёрский Олимп»", size: "ФАСАДНЫЕ РАБОТЫ", location: "ВЫБОРГСКИЙ Р-Н" },
  { name: "Бассейн ВИФК (СКА)", size: "ОСТЕКЛЕНИЕ", location: "САНКТ-ПЕТЕРБУРГ" },
  { name: "ЖК Дом на Школьной", size: "ФАСАД, ОКНА", location: "ШУШАРЫ" },
  { name: "ЖК «Мой Город»", size: "АЛЮ. КОНСТРУКЦИИ", location: "ДЕВЯТКИНО" },
  { name: "ЖК Парколa", size: "ФАСАД, ОСТЕКЛЕНИЕ", location: "ПАРНАС" },
  { name: "ЖК «Австрийский Квартал»", size: "ШТУКАТУРНЫЙ ФАСАД", location: "КУДРОВО" },
  { name: "Военно-Медицинская Академия", size: "ФАСАДНЫЕ РАБОТЫ", location: "САНКТ-ПЕТЕРБУРГ" },
  { name: "ЖК «Три Ветра»", size: "ФАСАДНЫЕ РАБОТЫ", location: "САНКТ-ПЕТЕРБУРГ" },
  { name: "ЖК UP-квартал Светлановский", size: "ФАСАДНЫЕ РАБОТЫ", location: "САНКТ-ПЕТЕРБУРГ" },
];

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (imageContainerRef.current) {
        imageContainerRef.current.style.transform = `translateY(${rect.top * 0.12}px)`;
      }
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${rect.top * 0.1}px)`;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.featuredProjectSection}>
      {/* Featured Project */}
      <div className={styles.featuredProject} ref={sectionRef}>
        <div className={styles.featuredLeft}>
          <div>
            <h2 className={styles.featuredTitle}>ЖК «Триумф Парк»</h2>
            <div className={styles.featuredMeta}>
              <span>[ ШТУКАТУРНЫЙ ФАСАД ]</span>
              <span>[ ВИТРАЖНОЕ ОСТЕКЛЕНИЕ ]</span>
              <span>[ ПУЛКОВСКОЕ ШОССЕ ]</span>
            </div>
          </div>

          <div>
            <p className={styles.featuredCaption}>
              ФАСАДНЫЕ РАБОТЫ,
              <br />
              ОКОННЫЕ И ДВЕРНЫЕ БЛОКИ,
              <br />
              ВИТРАЖНОЕ ОСТЕКЛЕНИЕ.
            </p>
            <a href="/projects" className={styles.featuredCta}>
              ПОДРОБНЕЕ
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className={styles.featuredImage} ref={imageContainerRef}>
          <div ref={parallaxRef} className={styles.parallaxLayer}>
            <Image
              src="/images/hero-2.jpg"
              fill
              className="object-cover"
              alt="Villa Elektra"
            />
          </div>
        </div>

        {/* Project List */}
        <div className={styles.listWrapper}>
          <div className={styles.listCol}>
            {projects.map((project, index) => (
              <a
                key={project.name}
                href="#"
                className={styles.projectRow}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className={styles.projectName}>{project.name}</span>
                <div className={styles.projectMeta}>
                  <span className={styles.projectMetaText}>
                    {project.size}&nbsp;&nbsp;{project.location}
                  </span>
                  <span className={styles.projectArrow} aria-hidden="true">↗</span>
                </div>
              </a>
            ))}

            <div className={styles.allProjectsCta}>
              <a href="/projects" className={styles.allProjectsLink}>
                ВСЕ ПРОЕКТЫ
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
