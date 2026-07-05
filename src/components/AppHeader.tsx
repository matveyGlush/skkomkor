"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./AppHeader.module.css";

const navMainLinks = [
  { label: "Проекты", href: "/projects" },
  { label: "Виды деятельности", href: "/immersion" },
  { label: "Контакты", href: "/contact" },
];

const navSecondaryLinks = [
  { label: "Обратная связь", href: "/news" },
  { label: "Связаться с нами", href: "/socials" },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Main navigation">
          <span className={styles.mobileBrand}>КОМКОР</span>

          <div className={styles.primaryLinks}>
            {navMainLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <a key={link.label} href={link.href} className={styles.navLink}>
                  {isActive ? "■" : "+"} {link.label}
                </a>
              );
            })}
          </div>

          <div className={styles.secondaryLinks}>
            {navSecondaryLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                + {link.label}
              </a>
            ))}
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {isOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Navigation menu">
          <nav className={styles.mobileMenuInner}>
            {[...navMainLinks, ...navSecondaryLinks].map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsOpen(false)}
                >
                  {isActive ? "■" : "+"} {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
