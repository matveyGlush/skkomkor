import { cn } from "@/lib/utils";
import { ArchidomoLogo } from "@/components/icons";

const navLinks = ["Agency", "Projects", "Immersion", "Contact"];

export function Footer() {
  return (
    <footer className={cn("bg-[#111110] text-white py-16 px-4 md:px-6")}>
      {/* Full-width wordmark */}
      <ArchidomoLogo className="text-[#bcb5a3] mb-16 w-full" />

      {/* 4-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Col 1: Navigation */}
        <div>
          <p
            className="text-[11px] uppercase tracking-widest text-white/50 mb-4"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            Navigation
          </p>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[22px] text-white hover:opacity-60 transition-opacity block"
                  style={{
                    fontFamily: '"Maison Neue", sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Contact + Socials */}
        <div>
          <p
            className="text-[11px] uppercase tracking-widest text-white/50 mb-4"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            Contact
          </p>
          <div className="space-y-2 mb-8">
            <a
              href="tel:+33450460624"
              className="text-[22px] text-white hover:opacity-60 transition-opacity block"
              style={{
                fontFamily: '"Maison Neue", sans-serif',
                fontWeight: 400,
              }}
            >
              +33 (0)4 50 46 06 24
            </a>
            <a
              href="mailto:infos@archidomo.fr"
              className="text-[14px] uppercase tracking-widest text-white hover:opacity-60 transition-opacity block"
              style={{
                fontFamily: '"Maison Neue Mono", monospace',
              }}
            >
              INFOS@ARCHIDOMO.FR
            </a>
          </div>
          <p
            className="text-[11px] uppercase tracking-widest text-white/50 mb-4"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            Socials
          </p>
          <div className="space-y-2">
            <a
              href="https://www.instagram.com/archidomo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] uppercase tracking-widest text-white hover:opacity-60 transition-opacity block"
              style={{ fontFamily: '"Maison Neue Mono", monospace' }}
            >
              + INSTAGRAM
            </a>
            <a
              href="https://www.linkedin.com/company/archidomo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] uppercase tracking-widest text-white hover:opacity-60 transition-opacity block"
              style={{ fontFamily: '"Maison Neue Mono", monospace' }}
            >
              + LINKEDIN
            </a>
          </div>
        </div>

        {/* Col 3: Annecy + Cannes */}
        <div>
          <p
            className="text-[11px] uppercase tracking-widest text-white/50 mb-4"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            Annecy — Showroom
          </p>
          <address
            className="not-italic text-[12px] uppercase tracking-[0.04em] text-white/60 leading-[1.8] mb-8"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            2 LE THORON – RD 909A
            <br />
            TALLOIRES-MONTMIN 74290
          </address>
          <p
            className="text-[11px] uppercase tracking-widest text-white/50 mb-4"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            Cannes
          </p>
          <address
            className="not-italic text-[12px] uppercase tracking-[0.04em] text-white/60 leading-[1.8]"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            230, ROUTE DES DOLINES
            <br />
            SOPHIA ANTIPOLIS 06560
          </address>
        </div>

        {/* Col 4: Lyon */}
        <div>
          <p
            className="text-[11px] uppercase tracking-widest text-white/50 mb-4"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            Lyon
          </p>
          <address
            className="not-italic text-[12px] uppercase tracking-[0.04em] text-white/60 leading-[1.8]"
            style={{ fontFamily: '"Maison Neue Mono", monospace' }}
          >
            PLACE DU CHANGE
            <br />
            LYON 69005
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row sm:justify-between gap-2 text-[11px] uppercase tracking-widest text-white/40"
        style={{ fontFamily: '"Maison Neue Mono", monospace' }}
      >
        <span>© 2018 - ALL RIGHTS RESERVED</span>
        <div className="flex gap-6">
          <a href="#" className="hover:opacity-80 transition-opacity">
            LEGALS
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            PRIVACY POLICY
          </a>
        </div>
      </div>
    </footer>
  );
}
