import { AppHeader } from "@/components/AppHeader";
import { ProjectsListPage } from "@/components/ProjectsListPage";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";
import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "Skkomkor — Projects",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <ProjectsListPage projects={projects} />
      </main>
      <Footer />
    </>
  );
}
