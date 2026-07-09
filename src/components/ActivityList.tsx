"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ActivityList.module.css";

const PLUS_PATH =
  "M7.5 15V8.5H1C0.723858 8.5 0.5 8.27614 0.5 8C0.5 7.72386 0.723858 7.5 1 7.5H7.5V1C7.5 0.723858 7.72386 0.5 8 0.5C8.27614 0.5 8.5 0.723858 8.5 1V7.5H15C15.2761 7.5 15.5 7.72386 15.5 8C15.5 8.27614 15.2761 8.5 15 8.5H8.5V15C8.5 15.2761 8.27614 15.5 8 15.5C7.72386 15.5 7.5 15.2761 7.5 15Z";

const activities = [
  {
    title: "Фасадное остекление",
    image: "/images/activityList/activity-1.jpg",
    description:
      "Три системы алюминиевого остекления: стоечно-ригельная — несущий каркас из вертикальных стоек и горизонтальных ригелей, крепится изнутри и почти не заметен снаружи, отличается лёгкостью монтажа, прочностью и огнестойкостью; штапиковая (рамная) — стекло фиксируется в раме подкладками и штапиками, применяется для балконов и навесных фасадов благодаря малой толщине (40 мм) и экономичности; структурная — тёплое остекление без наружного алюминиевого профиля, стеклопакет держится на клею-герметике, который берёт на себя несущую функцию — подходит для сложных дизайнерских решений.",
  },
  {
    title: "Вентилируемые фасады",
    image: "/images/activityList/activity-2.jpg",
    description:
      "Система, зародившаяся в Германии в 1950-х и получившая массовое распространение в России с девяностых годов. Металлическая подсистема с утеплителем и облицовочный материал разделены вентиляционным зазором, в котором свободно циркулирует воздух — он устраняет конденсат и влагу, подсушивает утеплитель и снижает теплоотдачу здания, экономя строительные материалы. Подконструкция, крепёж и облицовка подбираются под конкретный проект по расчётам прочности и теплотехники с учётом климата и высотности здания.",
  },
  {
    title: "Штукатурные фасады",
    image: "/images/activityList/activity-3.jpg",
    description:
      "Система утепления с тонким декоративным штукатурным слоем: утеплитель крепится на клей и дюбели, поверх — армирующий слой со стеклосеткой и финишное декоративное покрытие. Экономичное решение с широкой палитрой цветов и способностью воссоздавать сложные архитектурные формы при улучшении теплоизоляции здания. Основное ограничение — работы ведутся при температуре не ниже +5°C, что сужает применение в северных регионах; для расширения диапазона используются специальные морозостойкие добавки.",
  },
  {
    title: "Световые фонари",
    image: "/images/activityList/activity-4.jpg",
    description:
      "Зенитные фонари — светопроёмы на кровле, не имеющие отношения к искусственным источникам света. В крупных зданиях это остеклённые купольные надстройки, в частных домах — одиночное кровельное окно. Строгих стандартов формы не существует, что открывает широкие возможности для дизайна: многогранные или округлые конструкции изготавливаются из стекла, полиэфира, акрила или поликарбоната.",
  },
  {
    title: "Цельностеклянные конструкции",
    image: "/images/activityList/activity-5.jpg",
    description:
      "Безрамные стеклянные перегородки для офисов, банков и жилых помещений — цена зависит от толщины и типа стекла, качества фурнитуры. Стеклянные козырьки над входными группами — функциональный и эстетический элемент фасада на несущих стеклянных рёбрах, вантовых, рамных или спайдерных системах, с подогревом стекла и встроенной подсветкой; используются закалённое, ламинированное, матовое, тонированное и гнутое стекло с фьюзингом, плёнками и рисунками. Стеклянные ограждения для лестниц, террас, балконов и смотровых площадок — прочные и безопасные, визуально расширяют пространство и могут дополняться подсветкой.",
  },
  {
    title: "Противопожарные конструкции",
    image: "/images/activityList/activity-6.jpg",
    description:
      "Окна, двери, перегородки и перекрытия из огнестойких стеклопакетов и материалов различной степени огнеупорности, сдерживающие распространение огня и дыма на время, зависящее от целостности, термоизоляции и несущей способности конструкции — это даёт спасателям время на эвакуацию людей. Все материалы проходят испытания на прочность перед применением.",
  },
  {
    title: "Автоматика",
    image: "/images/activityList/activity-7.jpg",
    description:
      "Автоматические раздвижные стеклянные двери для входных групп — удобное и практичное решение, особенно востребованное в бизнес-центрах, торговых и развлекательных комплексах, медицинских учреждениях, супермаркетах, спортивных объектах, отелях, ресторанах и кафе. Обеспечивают максимальную бесконтактную пропускную способность в местах с интенсивным потоком людей и отличаются износостойкостью и надёжностью в эксплуатации.",
  },
  {
    title: "Архитектурная подсветка",
    image: "/images/activityList/activity-8.jpg",
    description:
      "Внешнее декоративное освещение общественных зданий и частных домовладений, подчёркивающее особенности конструкции. Применяется для рекламы, привлечения внимания и обеспечения безопасности объекта. Современные световые приборы и кабельно-проводниковая продукция позволяют грамотно расположить источники света, сделать подсветку экономичной и создать завершённый архитектурный облик здания — для чего требуется помощь специалистов, знающих нюансы монтажа таких систем.",
  },
];

export function ActivityList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      const viewportCenter = window.innerHeight / 2;
      for (const el of imageRefs.current) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const offset = (viewportCenter - elCenter) * 0.15;
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
    <div className={styles.list}>
      {activities.map((activity, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={activity.title} className={styles.item}>
            <button
              type="button"
              className={styles.itemHeader}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={styles.itemNumber}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.itemTitle}>{activity.title}</span>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className={`${styles.itemIcon} ${isOpen ? styles.itemIconOpen : ""}`}
                aria-hidden="true"
              >
                <path d={PLUS_PATH} />
              </svg>
            </button>
            <div
              className={styles.itemBody}
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className={styles.itemBodyInner}>
                <div className={styles.itemBodyContent}>
                  <p className={styles.itemDescription}>{activity.description}</p>
                  <div
                    className={styles.itemImage}
                    ref={(el) => {
                      imageRefs.current[i] = el;
                    }}
                  >
                    <Image
                      src={activity.image}
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className={styles.itemImageEl}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
