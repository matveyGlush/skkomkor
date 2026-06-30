import Image from "next/image";

const PLUS_PATH =
  "M7.5 15V8.5H1C0.723858 8.5 0.5 8.27614 0.5 8C0.5 7.72386 0.723858 7.5 1 7.5H7.5V1C7.5 0.723858 7.72386 0.5 8 0.5C8.27614 0.5 8.5 0.723858 8.5 1V7.5H15C15.2761 7.5 15.5 7.72386 15.5 8C15.5 8.27614 15.2761 8.5 15 8.5H8.5V15C8.5 15.2761 8.27614 15.5 8 15.5C7.72386 15.5 7.5 15.2761 7.5 15Z";

const addresses = [
  {
    name: "Annecy - Showroom",
    lines: ["2 LE THORON – RD 909A", "TALLOIRES-MONTMIN 74290"],
  },
  {
    name: "Cannes",
    lines: ["230 ROUTE DES DOLINES", "SOPHIA ANTIPOLIS 06560"],
  },
  {
    name: "Lyon",
    lines: ["PLACE DU CHANGE", "LYON 69005"],
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
    <section
      style={{
        backgroundColor: "#F7F1E9",
        paddingTop: "261.45px",
        minHeight: "100dvh",
      }}
    >
      {/* 3-column flex wrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "94.5px",
          margin: "0 15.75px",
          position: "relative",
        }}
      >
        {/* Col 1 — title only; image is absolute relative to wrapper */}
        <div style={{ width: "280px", flexShrink: 0, paddingLeft: "23.625px" }}>
          <h1
            style={{
              fontFamily: "Canela, serif",
              fontSize: "75.6px",
              fontWeight: 300,
              lineHeight: "90.72px",
              color: "#0b080d",
              margin: 0,
            }}
          >
            Contact
          </h1>

          {/* Small square image — absolute at bottom-left of wrapper */}
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "233.883px",
              height: "233.883px",
              overflow: "hidden",
            }}
          >
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
        <div
          style={{ flex: 1, paddingLeft: "23.625px", minWidth: 0 }}
        >
          <p
            style={{
              fontFamily: "Canela, serif",
              fontSize: "31.5px",
              fontWeight: 300,
              lineHeight: "39.375px",
              color: "#111111",
              margin: 0,
            }}
          >
            We operate from Annecy, Lyon &amp; Cannes. A single point of
            contact for any bespoke request.
          </p>

          {/* Contact links */}
          <div
            style={{
              marginTop: "47.25px",
              display: "flex",
              flexDirection: "column",
              gap: "3.9375px",
            }}
          >
            {[
              { href: "tel:+33450460624", label: "+33 (0)4 50 46 06 24" },
              { href: "mailto:infos@archidomo.fr", label: "infos@archidomo.fr" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  textDecoration: "none",
                }}
              >
                <PlusIcon />
                <span
                  style={{
                    fontFamily: '"Maison Neue", sans-serif',
                    fontSize: "28.35px",
                    fontWeight: 500,
                    color: "#111111",
                  }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Addresses */}
          <div
            style={{
              marginTop: "70.875px",
              display: "flex",
              flexDirection: "row",
              gap: "63px",
            }}
          >
            {addresses.map((addr) => (
              <div
                key={addr.name}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div
                  style={{
                    fontFamily: '"Maison Neue", sans-serif',
                    fontSize: "15.75px",
                    fontWeight: 400,
                    lineHeight: "18.9px",
                    color: "#0b080d",
                  }}
                >
                  {addr.name}
                </div>
                <div
                  style={{
                    fontFamily: '"Maison Neue Mono", monospace',
                    fontSize: "12.6px",
                    fontWeight: 400,
                    lineHeight: "18.9px",
                    textTransform: "uppercase",
                    color: "#0b080d",
                    whiteSpace: "nowrap",
                  }}
                >
                  {addr.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3 — portrait image */}
        <div
          style={{
            width: "382px",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
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
