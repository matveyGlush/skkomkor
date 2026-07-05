import { AppHeader } from "@/components/AppHeader";
import { HeroSection } from "@/components/HeroSection";
import { AgencySection } from "@/components/AgencySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { VisionSection } from "@/components/VisionSection";
import { InspirationSection } from "@/components/InspirationSection";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";

export default function Home() {
  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <HeroSection />
        <AgencySection />
        <ProjectsSection />
        <VisionSection />
        <InspirationSection />
      </main>
      <Footer />
    </>
  );
}
