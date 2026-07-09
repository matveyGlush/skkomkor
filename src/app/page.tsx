import { AppHeader } from "@/components/AppHeader";
import { HeroSection } from "@/components/HeroSection";
import { AgencySection } from "@/components/AgencySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { VisionSection } from "@/components/VisionSection";
import { InspirationSection } from "@/components/InspirationSection";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <HeroSection />
        <AgencySection />
        <ProjectsSection projects={projects.slice(0, 12)} />
        <VisionSection />
        <InspirationSection />
      </main>
      <Footer />
    </>
  );
}
