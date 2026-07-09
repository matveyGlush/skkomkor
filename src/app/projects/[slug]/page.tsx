import { notFound } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";
import { getProjects, getProjectBySlug } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return {
    title: project ? `Skkomkor — ${project.title}` : "Skkomkor — Projects",
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <ProjectDetailPage project={project} />
      </main>
      <Footer />
    </>
  );
}
