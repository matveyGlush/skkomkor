"use client";

import Image from "next/image";
import { ArrowUpRightSmIcon } from "@/components/icons";

interface Project {
  title: string;
  tags: string[];
  desc: string;
  slug: string;
}

const projects: Project[] = [
  {
    slug: "villa-elektra",
    title: "Villa Elektra",
    tags: ["[ 1150 M² ]", "[ LAKE GENEVA ]", "[ 2025 ]"],
    desc: "WITH VILLA ELEKTRA, ARCHIDOMO PERFORMS A MAJESTIC SLEIGHT OF HAND.",
  },
  {
    slug: "chalets-twin",
    title: "Chalets Twin and brother",
    tags: ["[ 800 M² ]", "[ COURCHEVEL ]", "[ 2021 ]"],
    desc: "IN ADDITION TO THEIR INCREDIBLE PANORAMIC VIEW OVER THE VALLEY AND THEIR FULL-HEIGHT BAY WINDOWS, THESE TWO CHALETS HAVE A SECRET.",
  },
  {
    slug: "villa-akila",
    title: "Villa Akila",
    tags: ["[ 480 M² ]", "[ LAC D'ANNECY ]", "[ 2019 ]"],
    desc: "CLINGING TO THE SLOPE, VILLA AKILA ANCHORS ITSELF INTO THE TERRAIN WHILE OVERLOOKING THE BAY OF TALLOIRES, THE MOST BEAUTIFUL BAY IN THE WORLD ACCORDING TO CHURCHILL.",
  },
  {
    slug: "chalet-ultima",
    title: "Chalet Ultima",
    tags: ["[ 2100 M² ]", "[ COURCHEVEL ]", "[ 2020 ]"],
    desc: "AIRY. CONTEMPORARY. SPECTACULAR. NESTLED IN THE HEIGHTS OF COURCHEVEL, CHALET ULTIMA UNFOLDS ITS VOLUMES IN A PLAY OF BALANCE AND OVERHANGS.",
  },
  {
    slug: "villa-gibson",
    title: "Villa Gibson",
    tags: ["[ 620 M² ]", "[ CANNES ]", "[ 2023 ]"],
    desc: "PERCHED LIKE A PROMONTORY ABOVE THE LANDSCAPE, THIS VILLA DESIGNED FOR A MUSICIAN REINVENTS TWO SEMI-DETACHED HOUSES INTO A CONTEMPORARY ARCHITECTURE DEFINED BY HORIZONTALITY AND ROOF TERRACES.",
  },
  {
    slug: "chalets-nor-sno",
    title: "Chalets NØR + SNØ",
    tags: ["[ 420 M² ]", "[ COURCHEVEL ]", "[ 2019 ]"],
    desc: "THESE TWIN CHALETS BLEND DELICATELY INTO THE NATURAL RELIEF, OFFERING STRIKING VIEWS OVER THE VALLEY.",
  },
  {
    slug: "villa-restanque",
    title: "Villa Restanque",
    tags: ["[ 450 M² ]", "[ NICE ]", "[ 2017 ]"],
    desc: "IN THE MIRROR OF THE POOL, THE FULL GRANDEUR OF VILLA RESTANQUE IS REFLECTED: A NOD TO ITS VERY ESSENCE: A WAY OF LIVING WIDELY OPEN TO THE LANDSCAPE AND BATHED IN LIGHT.",
  },
  {
    slug: "villa-verdi",
    title: "Villa Verdi",
    tags: ["[ 380 M² ]", "[ AIX EN PROVENCE ]", "[ 2017 ]"],
    desc: "FACING THE HILLS OF THE LUBERON, VILLA VERDI STRIKES A GRAND BALANCE: OPEN, MAJESTIC, YET DEEPLY INTIMATE.",
  },
  {
    slug: "chalet-haven",
    title: "Chalet Haven",
    tags: ["[ 310 M² ]", "[ MEGÈVE ]", "[ 2020 ]"],
    desc: "PERCHED ABOVE MEGÈVE, THIS CHALET EMBODIES ALPINE ELEGANCE IN ALL ITS SUBTLETY.",
  },
  {
    slug: "villa-mirador",
    title: "Villa Mirador",
    tags: ["[ 350 M² ]", "[ LAC DE GENÈVE ]", "[ 2022 ]"],
    desc: "FROM THE CONSTRAINT OF A LIMITED ROOF HEIGHT EMERGED A POWERFUL CREATIVE PROPOSAL: THE VILLA IS EMBEDDED INTO THE TERRAIN, FREEING A LOWER LEVEL OPEN ONTO THE LAKE.",
  },
  {
    slug: "chalet-arka",
    title: "Chalet Arka",
    tags: ["[ 320 M² ]", "[ MEGÈVE ]", "[ 2020 ]"],
    desc: "THIS SINGULAR CHALET, POISED BETWEEN MODERNITY AND TRADITION, IS SET IN THE HEART OF MEGÈVE.",
  },
  {
    slug: "villa-seren",
    title: "Villa Seren",
    tags: ["[ 360 M² ]", "[ LAC D'ANNECY ]", "[ 2022 ]"],
    desc: "MAGNIFIED BY THE PRESENCE OF LAKE ANNECY, THIS CONTEMPORARY VILLA STANDS OUT THROUGH ITS CUBIC VOLUMES AND REFINED GEOMETRY.",
  },
];

function ProjectCta() {
  return (
    <a
      href="#"
      className="group inline-flex items-center border border-[#0b080d] gap-[7.875px]"
      style={{ padding: "7.875px" }}
    >
      <span
        style={{
          fontFamily: '"Maison Neue", sans-serif',
          fontSize: "7.875px",
          lineHeight: "9.45px",
          color: "#0b080d",
        }}
      >
        SEE PROJECT
      </span>
      {/* Sliding arrow icon box */}
      <span
        className="relative block overflow-hidden"
        style={{ width: "31.5px", height: "31.5px" }}
      >
        <span
          className="flex flex-col transition-transform duration-500 group-hover:-translate-y-[31.5px]"
          style={{ transitionTimingFunction: "cubic-bezier(0.165, 0.84, 0.44, 1)" }}
        >
          <span className="flex items-center justify-center" style={{ width: "31.5px", height: "31.5px" }}>
            <ArrowUpRightSmIcon />
          </span>
          <span className="flex items-center justify-center" style={{ width: "31.5px", height: "31.5px" }}>
            <ArrowUpRightSmIcon />
          </span>
        </span>
      </span>
    </a>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <div
      className="relative flex border-b border-[rgb(188,181,163)]"
      style={{ padding: "15.75px 0", gap: "15.75px" }}
    >
      {/* Content column — left half */}
      <div
        className="flex flex-col justify-between"
        style={{ flex: "0 0 50%", height: "582px" }}
      >
        {/* Head: title + tags — indented 140px */}
        <div
          className="flex flex-col"
          style={{ paddingLeft: "140px", gap: "39px" }}
        >
          <h2
            style={{
              fontFamily: '"Canela", serif',
              fontSize: "clamp(36px, 5.25vw, 76px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#111111",
            }}
          >
            {project.title}
          </h2>
          <div className="flex flex-wrap" style={{ gap: "0 39px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: '"Maison Neue Mono", monospace',
                  fontSize: "12.6px",
                  textTransform: "uppercase",
                  color: "#0b080d",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: thumbnail + description + CTA — flush left */}
        <div
          className="flex items-end"
          style={{ gap: "156px" }}
        >
          {/* Thumbnail */}
          <div
            className="relative shrink-0 overflow-hidden bg-[#bcb5a3]"
            style={{ width: "234px", height: "234px" }}
          >
            <Image
              src={`/images/projects/${project.slug}-thumb.jpg`}
              fill
              sizes="234px"
              className="object-cover"
              alt={project.title}
            />
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col" style={{ gap: "47px", width: "205px" }}>
            <p
              style={{
                fontFamily: '"Maison Neue Mono", monospace',
                fontSize: "12.6px",
                lineHeight: "1.2",
                textTransform: "uppercase",
                maxWidth: "228px",
                color: "#0b080d",
              }}
            >
              {project.desc}
            </p>
            <ProjectCta />
          </div>
        </div>
      </div>

      {/* Image column — right half */}
      <div
        className="relative overflow-hidden bg-[#bcb5a3]"
        style={{ flex: "1 1 0", height: "582px" }}
      >
        <Image
          src={`/images/projects/${project.slug}-large.jpg`}
          fill
          sizes="50vw"
          className="object-cover"
          alt=""
        />
      </div>
    </div>
  );
}

export function ProjectsListPage() {
  return (
    <section style={{ backgroundColor: "#F7F1E9", paddingTop: "185px" }}>
      {projects.map((project) => (
        <ProjectItem key={project.slug} project={project} />
      ))}
    </section>
  );
}
