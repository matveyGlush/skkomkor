import { cn } from "@/lib/utils";

export function VisionSection() {
  return (
    <section className={cn("bg-white py-24 px-4 md:px-6")}>
      {/* Row 1: Heading + body */}
      <div className="flex flex-col md:flex-row md:gap-24 mb-16">
        <h2
          className="text-[#0b080d] leading-none mb-8 md:mb-0 shrink-0"
          style={{
            fontFamily: '"Canela", "Georgia", serif',
            fontWeight: 300,
            fontSize: "clamp(48px, 6vw, 80px)",
          }}
        >
          The vision
        </h2>
        <p
          className="text-[#0b080d] text-[20px] leading-relaxed max-w-[540px]"
          style={{ fontFamily: '"Maison Neue", sans-serif', fontWeight: 400 }}
        >
          Archidomo imagines spaces that deeply connect us to what uplifts us.
          The beauty we celebrate is not abstract: it engages with sensations
          and honors pure emotions. Sometimes spectacular, never ostentatious,
          it offers a rare and infinitely personal experience.
        </p>
      </div>

      {/* Row 2: Two images side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="aspect-[4/3] bg-[#c8c2ba]" />
        <div className="aspect-[4/3] bg-[#222]" />
      </div>

      {/* Row 3: Caption + CTA */}
      <div className="mt-16 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <p
          className="text-[11px] uppercase tracking-[0.08em] text-[#0b080d]/70 leading-[1.8]"
          style={{ fontFamily: '"Maison Neue Mono", monospace' }}
        >
          HERE OUR IDEAS ARE BORN,
          <br />
          INSPIRED BY THE MAJESTY OF
          <br />
          THE MOUNTAINS AND THE
          <br />
          SERENITY OF THE LAKE.
        </p>
        <a
          href="#"
          className="text-[14px] uppercase tracking-widest text-[#0b080d] hover:opacity-60 transition-opacity"
          style={{ fontFamily: '"Maison Neue", sans-serif', fontWeight: 500 }}
        >
          + AGENCY
        </a>
      </div>

      {/* Row 4: Italic/light tagline */}
      <div className="mt-16 max-w-xl">
        <p
          className="text-[#0b080d] text-4xl leading-snug"
          style={{
            fontFamily: '"Canela", "Georgia", serif',
            fontWeight: 300,
          }}
        >
          Reality is not a limitation,
          <br />
          but possibilities to
          <br />
          transcend.
        </p>
      </div>
    </section>
  );
}
