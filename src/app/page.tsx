import { AppHeader } from "@/components/AppHeader";
import { HeroSection } from "@/components/HeroSection";
import { AgencySection } from "@/components/AgencySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { VisionSection } from "@/components/VisionSection";
import { InspirationSection } from "@/components/InspirationSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
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
