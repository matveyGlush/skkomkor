"use client";

import Image from "next/image";
import { ArrowUpRightSmIcon } from "@/components/icons";
import styles from "./ProjectsListPage.module.css";

interface Project {
  title: string;
  tags: string[];
  desc: string;
  slug: string;
}

const projects: Project[] = [
  {
    slug: "triumf-park",
    title: "ЖК «Триумф Парк»",
    tags: ["[ ШТУКАТУРНЫЙ ФАСАД ]", "[ ВИТРАЖНОЕ ОСТЕКЛЕНИЕ ]", "[ ПУЛКОВСКОЕ ШОССЕ ]"],
    desc: "ШТУКАТУРНЫЕ ФАСАДНЫЕ РАБОТЫ, МОНТАЖ ОКОННЫХ И ДВЕРНЫХ БЛОКОВ, ВИТРАЖНОЕ ОСТЕКЛЕНИЕ.",
  },
  {
    slug: "desyatkino",
    title: "ЖК «Десяткино»",
    tags: ["[ ШТУКАТУРНЫЙ ФАСАД ]", "[ ОКОННЫЕ БЛОКИ ]", "[ МУРИНО ]"],
    desc: "ШТУКАТУРНЫЕ ФАСАДНЫЕ РАБОТЫ, МОНТАЖ ОКОННЫХ И ДВЕРНЫХ БЛОКОВ.",
  },
  {
    slug: "viktoriya",
    title: "ЖК «Виктория»",
    tags: ["[ ОКОННЫЕ КОНСТРУКЦИИ ]", "[ МУРИНО ]"],
    desc: "МОНТАЖ ОКОННЫХ И ДВЕРНЫХ БЛОКОВ.",
  },
  {
    slug: "aktiorsky-olimp",
    title: "ЖК «Актёрский Олимп»",
    tags: ["[ ФАСАДНЫЕ РАБОТЫ ]", "[ ВЫБОРГСКИЙ Р-Н ]"],
    desc: "ФАСАДНЫЕ РАБОТЫ НА ЖИЛОМ КОМПЛЕКСЕ В ВЫБОРГСКОМ РАЙОНЕ САНКТ-ПЕТЕРБУРГА.",
  },
  {
    slug: "bassein-vifk",
    title: "Бассейн ВИФК (СКА)",
    tags: ["[ ВИТРАЖНОЕ ОСТЕКЛЕНИЕ ]", "[ ОКОННЫЕ БЛОКИ ]", "[ САНКТ-ПЕТЕРБУРГ ]"],
    desc: "МОНТАЖ ОКОННЫХ И ДВЕРНЫХ БЛОКОВ, ВИТРАЖНОЕ ОСТЕКЛЕНИЕ СПОРТИВНОГО ОБЪЕКТА.",
  },
  {
    slug: "dom-na-shkolnoy",
    title: "ЖК Дом на Школьной",
    tags: ["[ АЛЮ. И СТ. КОНСТРУКЦИИ ]", "[ ШТУКАТУРНЫЙ ФАСАД ]", "[ ШУШАРЫ ]"],
    desc: "АЛЮМИНИЕВЫЕ И СТАЛЬНЫЕ КАРКАСНЫЕ КОНСТРУКЦИИ, ШТУКАТУРНЫЙ ФАСАД, ОКОННЫЕ БЛОКИ.",
  },
  {
    slug: "moy-gorod",
    title: "ЖК «Мой Город»",
    tags: ["[ АЛЮМИНИЕВЫЕ КОНСТРУКЦИИ ]", "[ ОКОННЫЕ БЛОКИ ]", "[ ДЕВЯТКИНО ]"],
    desc: "АЛЮМИНИЕВЫЕ КОНСТРУКЦИИ, МОНТАЖ ОКОННЫХ И ДВЕРНЫХ БЛОКОВ.",
  },
  {
    slug: "parkola",
    title: "ЖК Парколa",
    tags: ["[ ФАСАД, ОСТЕКЛЕНИЕ ]", "[ ОГРАЖДЕНИЯ ]", "[ ПАРНАС ]"],
    desc: "ШТУКАТУРНЫЙ ФАСАД, ОКОННЫЕ БЛОКИ, ВИТРАЖИ, ОГРАЖДЕНИЯ, СТАЛЬНЫЕ КОЗЫРЬКИ.",
  },
  {
    slug: "kadetskoe-uchilishche",
    title: "Петрозаводское кадетское училище",
    tags: ["[ ФАСАДНЫЕ РАБОТЫ ]", "[ ПЕТРОЗАВОДСК ]"],
    desc: "ФАСАДНЫЕ РАБОТЫ НА ПЕТРОЗАВОДСКОМ ПРЕЗИДЕНТСКОМ КАДЕТСКОМ УЧИЛИЩЕ.",
  },
  {
    slug: "avstriysky-kvartal",
    title: "ЖК «Австрийский Квартал»",
    tags: ["[ ШТУКАТУРНЫЙ ФАСАД ]", "[ КУДРОВО ]"],
    desc: "ШТУКАТУРНЫЕ ФАСАДНЫЕ РАБОТЫ НА ЖИЛОМ КОМПЛЕКСЕ В КУДРОВО.",
  },
  {
    slug: "voenny-med-akademiya",
    title: "Военно-Медицинская Академия",
    tags: ["[ ФАСАДНЫЕ РАБОТЫ ]", "[ САНКТ-ПЕТЕРБУРГ ]"],
    desc: "ФАСАДНЫЕ РАБОТЫ НА ОБЪЕКТЕ ВОЕННО-МЕДИЦИНСКОЙ АКАДЕМИИ.",
  },
  {
    slug: "tri-vetra",
    title: "ЖК «Три Ветра»",
    tags: ["[ ФАСАДНЫЕ РАБОТЫ ]", "[ САНКТ-ПЕТЕРБУРГ ]"],
    desc: "ФАСАДНЫЕ РАБОТЫ НА ЖИЛОМ КОМПЛЕКСЕ «ТРИ ВЕТРА».",
  },
  {
    slug: "okhta-park",
    title: "Охта Парк",
    tags: ["[ ФАСАДНЫЕ РАБОТЫ ]", "[ САНКТ-ПЕТЕРБУРГ ]"],
    desc: "ФАСАДНЫЕ РАБОТЫ НА ОБЪЕКТЕ ОХТА ПАРК.",
  },
  {
    slug: "up-svetlanovsky",
    title: "ЖК UP-квартал Светлановский",
    tags: ["[ ФАСАДНЫЕ РАБОТЫ ]", "[ САНКТ-ПЕТЕРБУРГ ]"],
    desc: "ФАСАДНЫЕ РАБОТЫ НА ЖИЛОМ КОМПЛЕКСЕ UP-КВАРТАЛ СВЕТЛАНОВСКИЙ.",
  },
];

function ProjectCta() {
  return (
    <a href="#" className={styles.cta}>
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
    </a>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <div className={styles.projectItem}>
      <div className={styles.contentCol}>
        <div className={styles.head}>
          <h2 className={styles.projectTitle}>{project.title}</h2>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.thumbnail}>
            <Image
              src={`/images/projects/${project.slug}-thumb.jpg`}
              fill
              sizes="234px"
              className="object-cover"
              alt={project.title}
            />
          </div>

          <div className={styles.descWrapper}>
            <p className={styles.desc}>{project.desc}</p>
            <ProjectCta />
          </div>
        </div>
      </div>

      <div className={styles.imageCol}>
        <Image
          src={`/images/projects/${project.slug}-large.jpg`}
          fill
          sizes="50vw"
          className="object-cover"
          alt=""
        />
      </div>
    </div>
  );
}

export function ProjectsListPage() {
  return (
    <section className={styles.section}>
      {projects.map((project) => (
        <ProjectItem key={project.slug} project={project} />
      ))}
    </section>
  );
}
