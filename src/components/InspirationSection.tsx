"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./InspirationSection.module.css";

interface Category {
  num: string;
  label: string;
  name: string;
  caption: string;
  image: string | null;
}

const categories: Category[] = [
  {
    num: "01",
    label: "ФАСАДНОЕ ОСТЕКЛЕНИЕ",
    name: "Фасадное остекление",
    caption: "АЛЮМИНИЕВЫЕ СВЕТОПРОЗРАЧНЫЕ КОНСТРУКЦИИ ЛЮБОЙ СЛОЖНОСТИ",
    image: "/images/hero-1.JPG",
  },
  {
    num: "02",
    label: "ВЕНТИЛИРУЕМЫЕ ФАСАДЫ",
    name: "Вентилируемые фасады",
    caption: "НАДЁЖНЫЕ НАВЕСНЫЕ ФАСАДНЫЕ СИСТЕМЫ ДЛЯ ЛЮБЫХ ОБЪЕКТОВ",
    image: "/images/hero-2.JPG",
  },
  {
    num: "03",
    label: "ШТУКАТУРНЫЕ ФАСАДЫ",
    name: "Утеплённые фасады",
    caption: "УТЕПЛЕНИЕ И ДЕКОРАТИВНАЯ ОТДЕЛКА — ПОД КЛЮЧ",
    image: "/images/hero-3.JPG",
  },
  {
    num: "04",
    label: "КРОВЕЛЬНЫЕ РАБОТЫ",
    name: "Кровля",
    caption: "МЯГКАЯ И ЖЁСТКАЯ КРОВЛЯ — ОТ ПРОЕКТИРОВАНИЯ ДО МОНТАЖА",
    image: null,
  },
];

export function InspirationSection() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Направления работ</h2>
        <p className={styles.bodyText1}>
          Полный цикл фасадных и кровельных работ — от проектирования до сдачи объекта.
        </p>
        <p className={styles.bodyText2}>
          Собственный производственный цех, парк из 80 фасадных подъёмников
          и более 10&nbsp;000&nbsp;м² лесов позволяют реализовывать проекты
          любого масштаба в срок.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.tabs}>
          {categories.map((cat, i) => (
            <button
              key={cat.num}
              className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.tabNum}>{cat.num}</span>
              <span className={styles.tabName}>{cat.name}</span>
            </button>
          ))}
          <p className={styles.caption}>{current.caption}</p>
        </div>

        <div className={styles.imageWrap}>
          {current.image ? (
            <Image
              src={current.image}
              alt={current.name}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 65vw"
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>
      </div>
    </section>
  );
}
