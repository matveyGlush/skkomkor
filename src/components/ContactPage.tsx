import Image from "next/image";
import styles from "./ContactPage.module.css";

const PLUS_PATH =
  "M7.5 15V8.5H1C0.723858 8.5 0.5 8.27614 0.5 8C0.5 7.72386 0.723858 7.5 1 7.5H7.5V1C7.5 0.723858 7.72386 0.5 8 0.5C8.27614 0.5 8.5 0.723858 8.5 1V7.5H15C15.2761 7.5 15.5 7.72386 15.5 8C15.5 8.27614 15.2761 8.5 15 8.5H8.5V15C8.5 15.2761 8.27614 15.5 8 15.5C7.72386 15.5 7.5 15.2761 7.5 15Z";

const addresses = [
  {
    name: "Санкт-Петербург",
    lines: ["СЕВЕРО-ЗАПАДНЫЙ РЕГИОН РОССИИ"],
  },
];

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="#0b080d"
      style={{ width: "11.8125px", height: "11.8125px", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d={PLUS_PATH} />
    </svg>
  );
}

export function ContactPage() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {/* Col 1 — title only; image is absolute relative to wrapper */}
        <div className={styles.titleCol}>
          <h1 className={styles.title}>Контакты</h1>

          <div className={styles.smallImage}>
            <Image
              src="/images/contact/hero-small.jpg"
              fill
              sizes="234px"
              className="object-cover"
              alt="Annecy showroom"
            />
          </div>
        </div>

        {/* Col 2 — description, contact links, addresses */}
        <div className={styles.contentCol}>
          <p className={styles.description}>
            Работаем в&nbsp;Санкт-Петербурге и&nbsp;Северо-Западном регионе России.
            Готовы рассмотреть проекты в&nbsp;других регионах страны.
          </p>

          <div className={styles.contactLinks}>
            {[
              { href: "tel:+79111695757", label: "+7 (911) 169-57-57" },
              { href: "mailto:Komarvm@yandex.ru", label: "Komarvm@yandex.ru" },
            ].map(({ href, label }) => (
              <a key={label} href={href} className={styles.contactLink}>
                <PlusIcon />
                <span className={styles.contactLinkLabel}>{label}</span>
              </a>
            ))}
          </div>

          <div className={styles.addresses}>
            {addresses.map((addr) => (
              <div key={addr.name} className={styles.address}>
                <div className={styles.addressName}>{addr.name}</div>
                <div className={styles.addressLines}>
                  {addr.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3 — portrait image */}
        <div className={styles.portraitCol}>
          <Image
            src="/images/contact/hero-large.jpg"
            fill
            sizes="382px"
            className="object-cover"
            alt="Archidomo project"
          />
        </div>
      </div>
    </section>
  );
}
