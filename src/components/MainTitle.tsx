import Link from "next/link";
import styles from "./MainTitle.module.css";

export function MainTitle() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Link href="/">
          <h1 className={styles.title}>КОМКОР</h1>
        </Link>
        <Link href="/">
          <p className={styles.subtitle}>Cтроительная <br/> компания</p>
        </Link>
      </div>
      <div className={styles.divider} />
    </section>
  );
}
