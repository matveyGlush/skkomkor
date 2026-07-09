import { ActivityList } from "./ActivityList";
import styles from "./ImmersionPage.module.css";

const PLUS_PATH =
  "M7.5 15V8.5H1C0.723858 8.5 0.5 8.27614 0.5 8C0.5 7.72386 0.723858 7.5 1 7.5H7.5V1C7.5 0.723858 7.72386 0.5 8 0.5C8.27614 0.5 8.5 0.723858 8.5 1V7.5H15C15.2761 7.5 15.5 7.72386 15.5 8C15.5 8.27614 15.2761 8.5 15 8.5H8.5V15C8.5 15.2761 8.27614 15.5 8 15.5C7.72386 15.5 7.5 15.2761 7.5 15Z";

function Hero() {
  return (
    <section className={styles.hero}>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Виды деятельности</h1>

        <svg
          viewBox="0 0 16 16"
          fill="black"
          className={styles.heroIcon}
          aria-hidden="true"
        >
          <path d={PLUS_PATH} />
        </svg>

        <p className={styles.heroSubtitle}>
          Фасадные и реставрационные работы полного цикла — от проектирования
          и изготовления конструкций до монтажа и сдачи объекта.
        </p>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className={styles.clients}>
      <ActivityList />
    </section>
  );
}

export function ImmersionPage() {
  return (
    <>
      <Hero />
      <Clients />
    </>
  );
}
