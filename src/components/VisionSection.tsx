import styles from "./VisionSection.module.css";

export function VisionSection() {
  return (
    <section className={styles.section}>
      <div className={styles.row1}>
        <h2 className={styles.heading}>Наш подход</h2>
        <p className={styles.body}>
          СК&nbsp;КОМКОР самостоятельно выполняет проектирование, изготовление и&nbsp;монтаж
          алюминиевых навесных фасадных систем, вентилируемых и&nbsp;штукатурных фасадов,
          а&nbsp;также мягкой и&nbsp;жёсткой кровли. Мы&nbsp;сотрудничаем с&nbsp;надёжными
          производителями и&nbsp;проектировщиками металлических конструкций, обеспечивая
          высокое качество на&nbsp;каждом этапе работы.
        </p>
      </div>

      <div className={styles.imageGrid}>
        <div className={styles.imagePlaceholder1} />
        <div className={styles.imagePlaceholder2} />
      </div>

      <div className={styles.row3}>
        <p className={styles.caption}>
          БОЛЕЕ ДЕСЯТИ ЛЕТ
          <br />
          НА СТРОИТЕЛЬНОМ РЫНКЕ
          <br />
          САНКТ-ПЕТЕРБУРГА
          <br />
          И СЕВЕРО-ЗАПАДА РОССИИ.
        </p>
        <a href="/projects" className={styles.cta}>+ ПРОЕКТЫ</a>
      </div>

      <div className={styles.taglineWrapper}>
        <p className={styles.tagline}>
          Опыт, техника
          <br />
          и собственное
          <br />
          производство.
        </p>
      </div>
    </section>
  );
}
