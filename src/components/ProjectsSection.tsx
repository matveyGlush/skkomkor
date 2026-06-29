"use client";

import { useState } from "react";
import Image from "next/image";

const projects = [
  { name: "Chalets Twin and brother", size: "800 M²", location: "COURCHEVEL" },
  { name: "Villa Akila", size: "480 M²", location: "LAC D'ANNECY" },
  { name: "Chalet Ultima", size: "2100 M²", location: "COURCHEVEL" },
  { name: "Villa Gibson", size: "620 M²", location: "CANNES" },
  { name: "Chalets NØR + SNØ", size: "420 M²", location: "COURCHEVEL" },
  { name: "Villa Restanque", size: "450 M²", location: "NICE" },
  { name: "Villa Verdi", size: "380 M²", location: "AIX EN PROVENCE" },
  { name: "Chalet Haven", size: "310 M²", location: "MEGÈVE" },
  { name: "Villa Mirador", size: "350 M²", location: "LAC DE GENÈVE" },
  { name: "Chalet Arka", size: "320 M²", location: "MEGÈVE" },
  { name: "Villa Seren", size: "360 M²", location: "LAC D'ANNECY" },
];

export function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section>
      {/* Featured Project */}
      <div className="flex min-h-[500px] bg-[#f0ece4]">
        {/* Left: project info */}
        <div className="flex w-[40%] flex-col justify-between p-16">
          {/* Top: title + meta */}
          <div>
            <h2
              className="mb-6 text-[38px] leading-tight text-[#0b080d]"
              style={{ fontWeight: 500, fontFamily: "var(--font-maison, sans-serif)" }}
            >
              Villa Elektra
            </h2>
            <div
              className="flex flex-col gap-2 text-[13px] uppercase tracking-[0.05em] text-[rgba(11,8,13,0.6)]"
              style={{ fontFamily: "var(--font-maison-mono, monospace)" }}
            >
              <span>[ 1150 M² ]</span>
              <span>[ LAKE GENEVA ]</span>
              <span>[ 2025 ]</span>
            </div>
          </div>

          {/* Bottom: caption + CTA */}
          <div>
            <p
              className="mb-8 text-[11px] uppercase leading-relaxed tracking-[0.08em] text-[#0b080d]"
              style={{ fontFamily: "var(--font-maison-mono, monospace)" }}
            >
              WITH VILLA ELEKTRA,
              <br />
              ARCHIDOMO PERFORMS A
              <br />
              MAJESTIC SLEIGHT OF HAND.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.05em] text-[#0b080d] transition-opacity duration-200 hover:opacity-70"
              style={{ fontFamily: "var(--font-maison, sans-serif)" }}
            >
              SEE PROJECT
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Right: hero image */}
        <div className="relative w-[60%]">
          <Image
            src="/images/hero-2.jpg"
            fill
            className="object-cover"
            alt="Villa Elektra"
          />
        </div>
      </div>

      {/* Project List */}
      <div className="flex bg-white">
        {/* List column */}
        <div className="flex-1 px-16 py-12">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href="#"
              className="flex cursor-pointer items-center justify-between border-b border-[rgba(11,8,13,0.12)] py-5 transition-opacity duration-200 hover:opacity-70"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span
                className="text-[24px] text-[#0b080d]"
                style={{ fontWeight: 500, fontFamily: "var(--font-maison, sans-serif)" }}
              >
                {project.name}
              </span>
              <div className="flex items-center gap-8">
                <span
                  className="text-[12px] uppercase tracking-[0.05em] text-[rgba(11,8,13,0.6)]"
                  style={{ fontFamily: "var(--font-maison-mono, monospace)" }}
                >
                  {project.size}&nbsp;&nbsp;{project.location}
                </span>
                <span
                  className="text-[18px] text-[#0b080d]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </a>
          ))}

          {/* CTA row */}
          <div className="pt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.05em] text-[#0b080d] transition-opacity duration-200 hover:opacity-70"
              style={{ fontFamily: "var(--font-maison, sans-serif)" }}
            >
              ALL PROJECTS
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Hover image panel */}
        <div className="relative hidden w-[45%] md:block">
          {hoveredIndex !== null && (
            <Image
              src="/images/hero-1.jpg"
              fill
              className="object-cover"
              alt=""
            />
          )}
        </div>
      </div>
    </section>
  );
}
