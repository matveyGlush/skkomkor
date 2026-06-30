import Image from "next/image";

const PLUS_PATH =
  "M7.5 15V8.5H1C0.723858 8.5 0.5 8.27614 0.5 8C0.5 7.72386 0.723858 7.5 1 7.5H7.5V1C7.5 0.723858 7.72386 0.5 8 0.5C8.27614 0.5 8.5 0.723858 8.5 1V7.5H15C15.2761 7.5 15.5 7.72386 15.5 8C15.5 8.27614 15.2761 8.5 15 8.5H8.5V15C8.5 15.2761 8.27614 15.5 8 15.5C7.72386 15.5 7.5 15.2761 7.5 15Z";

const clientRows: { brands: string[]; sep: string }[] = [
  {
    brands: ["Boffi", "Flexform", "Rimadesio", "Flos", "Kettal", "Fantini"],
    sep: "■",
  },
  {
    brands: ["Brokis", "Atlas Concorde", "Effe", "Ressource", "Gessi", "Cassina"],
    sep: "□",
  },
  {
    brands: ["Desalto", "E15", "Agape", "Tom Dixon", "B&B Italia", "Gan Rugs"],
    sep: "■",
  },
  {
    brands: [
      "Salvatori",
      "Vitra",
      "Technogym",
      "Tubes",
      "Buster and Punch",
      "Bang & Olufsen",
    ],
    sep: "□",
  },
  {
    brands: [
      "Royal Botania",
      "Minotti",
      "Mutina",
      "Basalte",
      "Carré Sol",
      "Gaggenau",
    ],
    sep: "■",
  },
  {
    brands: [
      "Bulthaup",
      "Christian Fischbacher",
      "Decor Walter",
      "Maison de Vacances",
      "Listone Giordano",
      "USM",
    ],
    sep: "□",
  },
  {
    brands: ["Artemide", "Serax", "Penta", "Ligne Pure", "CVL", "And many more"],
    sep: "■",
  },
];

function Hero() {
  return (
    <section
      style={{
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0b080d",
      }}
    >
      {/* Background landscape image */}
      <Image
        src="/images/immersion/ce9722a6c7a28afb0f17d38e2a01b9706daba786-3840x1878.jpg"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        alt=""
      />

      {/* Hero text content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
          gap: "28px",
        }}
      >
        <h1
          style={{
            fontFamily: "Canela, serif",
            fontSize: "100.8px",
            fontWeight: 300,
            lineHeight: 1,
            color: "#ffffff",
            margin: 0,
            textAlign: "center",
          }}
        >
          Showroom
        </h1>

        {/* Plus cross icon */}
        <svg
          viewBox="0 0 16 16"
          fill="white"
          style={{ width: "22px", height: "22px" }}
          aria-hidden="true"
        >
          <path d={PLUS_PATH} />
        </svg>

        <p
          style={{
            fontFamily: "Canela, serif",
            fontSize: "31.5px",
            fontWeight: 300,
            lineHeight: "39.375px",
            color: "#ffffff",
            textAlign: "center",
            maxWidth: "648px",
            margin: 0,
          }}
        >
          Overlooking the bay of Talloires, our studio is set high above Lake
          Annecy. An aerial haven conceived as a place for dialogue and
          creation.
        </p>
      </div>
    </section>
  );
}

function LargeText() {
  return (
    <section
      style={{
        height: "100dvh",
        backgroundColor: "#F7F1E9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 140px",
      }}
    >
      <p
        style={{
          fontFamily: "Canela, serif",
          fontSize: "75.6px",
          fontWeight: 300,
          lineHeight: "90.72px",
          color: "#0b080d",
          textAlign: "center",
          margin: 0,
        }}
      >
        The house defies gravity. Suspended between sky and water, it overlooks
        the lake in a vertiginous face-to-face.
      </p>
    </section>
  );
}

function LivingSpace() {
  return (
    <section>
      {/* Part A: beige background — intro text + full-width image */}
      <div style={{ backgroundColor: "#F7F1E9" }}>
        {/* Intro text */}
        <div
          style={{
            padding: "94.5px 15.75px 94.5px 140px",
          }}
        >
          <p
            style={{
              fontFamily: '"Maison Neue", sans-serif',
              fontSize: "31.5px",
              fontWeight: 400,
              lineHeight: "37.8px",
              color: "#0b080d",
              margin: 0,
              maxWidth: "800px",
            }}
          >
            At once a place to live, work, and demonstrate, it embodies
            Archidomo&apos;s construction mastery and bold design choices — a
            technical feat made invisible through an effortless reading.
          </p>
        </div>

        {/* Full-width hero image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "851px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/immersion/82554d7095c8c334a2c37b94c97aa8c99820e8a4-3840x2160.jpg"
            fill
            sizes="100vw"
            className="object-cover"
            alt="Archidomo showroom exterior"
          />
        </div>
      </div>

      {/* Part B: white background — main text + images */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "0 15.75px",
        }}
      >
        {/* Main: large Canela text + small image right */}
        <div
          style={{
            paddingLeft: "124px",
            position: "relative",
            paddingTop: "94.5px",
            paddingBottom: "94.5px",
          }}
        >
          <div
            style={{
              fontFamily: "Canela, serif",
              fontSize: "75.6px",
              fontWeight: 300,
              lineHeight: "90.72px",
              color: "#0b080d",
              width: "662px",
            }}
          >
            Inside, space becomes a statement. Concrete, oak, and glass respond
            to one another in a dialogue of materials, while light sculpts the
            volumes.
          </div>

          {/* Small landscape image — absolute right */}
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: "0px",
              width: "357px",
              height: "238px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/immersion/62648c825c6f5331bd7030c88acc351c083df758-906x604.jpg"
              fill
              sizes="357px"
              className="object-cover"
              alt="Interior living space"
            />
          </div>
        </div>

        {/* Bottom: text + 3-image gallery */}
        <div style={{ paddingLeft: "124px", paddingBottom: "94.5px" }}>
          <p
            style={{
              fontFamily: '"Maison Neue", sans-serif',
              fontSize: "31.5px",
              fontWeight: 400,
              lineHeight: "37.8px",
              color: "#0b080d",
              margin: "0 0 47.25px 0",
              maxWidth: "664px",
            }}
          >
            Every detail expresses Archidomo&apos;s signature: precision,
            harmony, and that sense of place capable of giving rise to moments
            of grace.
          </p>

          {/* 3-image gallery */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15.75px",
              alignItems: "flex-start",
            }}
          >
            {/* Portrait image */}
            <div
              style={{
                width: "361px",
                height: "596px",
                position: "relative",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/immersion/cba7cea352aceefd8a7a831b2272c8b96522c1fe-918x1376.jpg"
                fill
                sizes="361px"
                className="object-cover"
                alt="Staircase interior"
              />
            </div>

            {/* Right column — square + wide landscape stacked */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "15.75px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "390px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/immersion/b6d6a951e5c75b287f0e160a0e268203be7d1623-910x910.jpg"
                  fill
                  sizes="50vw"
                  className="object-cover"
                  alt="Interior space"
                />
              </div>
              <div
                style={{
                  position: "relative",
                  height: "400px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/immersion/254fad0b4cfb98fd503face54b3bec75a9819b4f-2494x1400.jpg"
                  fill
                  sizes="50vw"
                  className="object-cover"
                  alt="Terrace with mountain view"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section
      style={{
        backgroundColor: "#bcb5a3",
        padding: "111px 15.75px 94.5px",
      }}
    >
      {/* Intro */}
      <p
        style={{
          fontFamily: '"Maison Neue", sans-serif',
          fontSize: "31.5px",
          fontWeight: 400,
          lineHeight: "37.8px",
          color: "#0b080d",
          margin: "0 0 79px 0",
          maxWidth: "664px",
        }}
      >
        In the showroom, a selection of exceptional brands, chosen for their
        rigor, coherence, and timeless beauty.
      </p>

      {/* Brand rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "47px" }}>
        {clientRows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {row.brands.map((brand, i) => (
              <div
                key={brand}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "28px",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Maison Neue", sans-serif',
                    fontSize: "18.9px",
                    fontWeight: 400,
                    color: "#0b080d",
                  }}
                >
                  {brand}
                </span>
                {i < row.brands.length - 1 && (
                  <span
                    style={{
                      fontFamily: '"Maison Neue", sans-serif',
                      fontSize: "8px",
                      color: "#0b080d",
                    }}
                  >
                    {row.sep}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ImmersionPage() {
  return (
    <>
      <Hero />
      <LargeText />
      <LivingSpace />
      <Clients />
    </>
  );
}
