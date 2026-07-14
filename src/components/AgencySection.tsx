'use client';
import { useEffect, useRef } from 'react';
import styles from "./AgencySection.module.css";

export function AgencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteOneRef = useRef<HTMLParagraphElement>(null);
  const quoteTwoRef = useRef<HTMLParagraphElement>(null);
  const quoteThreeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.innerWidth < 1024) {
        if (quoteOneRef.current)   quoteOneRef.current.style.transform   = '';
        if (quoteTwoRef.current)   quoteTwoRef.current.style.transform   = '';
        if (quoteThreeRef.current) quoteThreeRef.current.style.transform = '';
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = 1 - (rect.bottom / (viewH + rect.height));
      const range = rect.height * 0.12;
      if (quoteOneRef.current)   quoteOneRef.current.style.transform   = `translateY(${-progress * range * 2.9}px)`;
      if (quoteTwoRef.current)   quoteTwoRef.current.style.transform   = `translateY(${-progress * range * 0.7}px)`;
      if (quoteThreeRef.current) quoteThreeRef.current.style.transform = `translateY(${-progress * range * 1.9}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.circle} />

      <div className={styles.row1}>
        <h2 className={styles.heading}>
          Наша компания
        </h2>
        <p className={styles.bodyLine}>
          C&nbsp;сентября 2013 года
        </p>
        <p className={styles.bodyText}>
          компания динамично развивается и&nbsp;активно работает на&nbsp;строительном рынке Санкт-Петербурга (СПб) и&nbsp;всего Северо-Запада России.
        </p>
      </div>

       <div className={styles.circle_2} />

      <div className={styles.quotes}>
        <p ref={quoteOneRef} className={styles.quote_one}>
          <span className={styles.quotePlus}></span>
          КОМКОР имеет производственный цех <br/> по&nbsp;изготовлению алюминиевых светопрозрачных <br/> конструкций.
        </p>
        <p ref={quoteTwoRef} className={styles.quote_two}>
          <span className={styles.quotePlus}></span>
          Более 30&nbsp;инженерно-технических сотрудников <br/> и&nbsp;300 квалифицированных рабочих разных <br/> специальностей составляют штат компании.
        </p>
        <p ref={quoteThreeRef} className={styles.quote_three}>
          <span className={styles.quotePlus}></span>
          Парк техники компании состоит из&nbsp;80&nbsp;единиц <br/> фасадных подъемников и&nbsp;насчитывает более <br/> 10&nbsp;000 м2&nbsp;фасадных лесов.
        </p>
      </div>
    </section>
  );
}
