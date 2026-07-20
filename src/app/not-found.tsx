"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";
import { useProject } from "@/lib/useProjects";

const PROJECTS_PREFIX = "/projects/";

function ProjectFallback({ slug }: { slug: string }) {
  const project = useProject(slug);

  if (project === undefined) {
    return null;
  }

  if (project === null) {
    return <NotFoundMessage />;
  }

  return (
    <main>
      <ProjectDetailPage project={project} />
    </main>
  );
}

function NotFoundMessage() {
  return (
    <main style={{ padding: "8rem 1.5rem", textAlign: "center" }}>
      <p>Страница не найдена.</p>
    </main>
  );
}

export default function NotFound() {
  const pathname = usePathname();
  const slug = pathname.startsWith(PROJECTS_PREFIX)
    ? pathname.slice(PROJECTS_PREFIX.length).replace(/\/$/, "")
    : "";

  return (
    <>
      <MainTitle />
      <AppHeader />
      {slug ? <ProjectFallback slug={slug} /> : <NotFoundMessage />}
      <Footer />
    </>
  );
}
