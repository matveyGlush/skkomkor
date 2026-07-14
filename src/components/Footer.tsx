import styles from "./Footer.module.css";

const navLinks = [
  { label: "О компании", href: "/" },
  { label: "Виды деятельности", href: "/immersion" },
  { label: "Проекты", href: "/projects" },
  { label: "Контакты", href: "/contact" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>КОМКОР</p>

      <div className={styles.grid}>
        {/* Col 1: Navigation */}
        <div>
          <p className={styles.colLabel}>Навигация</p>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.navLink}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Contact */}
        <div>
          <p className={styles.colLabel}>Контакты</p>
          <div className={styles.contactBlock}>
            <a href="tel:+79111695757" className={styles.contactPhone}>
              +7 (911) 169-57-57
            </a>
            <a href="mailto:Komarvm@yandex.ru" className={styles.contactEmail}>
              Komarvm@yandex.ru
            </a>
          </div>

          <p className={styles.colLabel}>Отдел снабжения</p>
          <div className={styles.contactBlock}>
            <a href="tel:+79111695757" className={styles.contactPhone}>
              +7 (921) 905-00-10 
            </a>
            <a href="mailto:Komarvm@yandex.ru" className={styles.contactEmail}>
              snab@skkomkor.ru
            </a>
          </div>
        </div>

        {/* Col 3: Location */}
        <div>
          <p className={styles.colLabel}>Регион работ</p>
          <address className={styles.addressLast}>
            САНКТ-ПЕТЕРБУРГ
            <br />
            СЕВЕРО-ЗАПАДНЫЙ РЕГИОН
          </address>
        </div>

        {/* Col 4: empty for grid balance */}
        <div />
      </div>

      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} — ВСЕ ПРАВА ЗАЩИЩЕНЫ</span>
        <div className={styles.legalLinks}>
          <a href="/privacy" className={styles.legalLink}>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
          <a href="/consent" className={styles.legalLink}>СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ</a>
        </div>
      </div>
    </footer>
  );
}
