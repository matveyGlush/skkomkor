import { cn } from "@/lib/utils";

interface Category {
  label: string;
  name: string;
  caption: string;
}

const categories: Category[] = [
  {
    label: "ARCHITECTURE",
    name: "Architecture",
    caption: "WHEN LINES SHAPE SPACE AND CELEBRATE CHARACTER",
  },
  {
    label: "VIEWS",
    name: "Views",
    caption:
      "A 360° TRIBUTE TO THOSE WHO KNOW HOW TO ASTONISH US, DAY AFTER DAY",
  },
  {
    label: "POOLS & OUTDOOR",
    name: "Pools & Outdoor Spaces",
    caption: "POOLS AND OUTDOOR SPACES THAT EXTEND LIVING INTO NATURE",
  },
  {
    label: "SHOWROOM",
    name: "Showroom",
    caption: "DISCOVER OUR ANNECY SHOWROOM",
  },
];

export function InspirationSection() {
  return (
    <section className={cn("bg-[#bcb5a3] py-24 px-4 md:px-6")}>
      {/* Header */}
      <div className="mb-12">
        <h2
          className="text-[#0b080d] leading-none mb-8"
          style={{
            fontFamily: '"Canela", "Georgia", serif',
            fontWeight: 300,
            fontSize: "clamp(48px, 6vw, 80px)",
          }}
        >
          Inspiration
        </h2>
        <p
          className="text-[#0b080d]/80 text-[20px] leading-relaxed max-w-[620px] mb-4"
          style={{ fontFamily: '"Maison Neue", sans-serif', fontWeight: 400 }}
        >
          Grandeur finds its true measure in precision and in the surprises it
          reveals.
        </p>
        <p
          className="text-[#0b080d] text-[20px] leading-relaxed max-w-[620px]"
          style={{ fontFamily: '"Maison Neue", sans-serif', fontWeight: 400 }}
        >
          Materials that converse with their surroundings. Unobstructed views
          that quite simply take your breath away. Sunlit immersions experienced
          in panoramic perspective.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
        {categories.map((cat) => (
          <div key={cat.label} className="group cursor-pointer">
            <div className="aspect-[4/3] bg-[#a09890] mb-4 overflow-hidden" />
            <p
              className="text-[11px] uppercase tracking-[0.08em] text-[#0b080d]/60 mb-1"
              style={{ fontFamily: '"Maison Neue Mono", monospace' }}
            >
              {cat.label}
            </p>
            <h3
              className="text-[22px] text-[#0b080d]"
              style={{
                fontFamily: '"Maison Neue", sans-serif',
                fontWeight: 500,
              }}
            >
              {cat.name}
            </h3>
            <p
              className="text-[11px] uppercase tracking-[0.08em] text-[#0b080d]/70 mt-2 max-w-[280px] leading-[1.8]"
              style={{ fontFamily: '"Maison Neue Mono", monospace' }}
            >
              {cat.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
