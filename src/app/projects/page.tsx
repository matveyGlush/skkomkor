import { AppHeader } from "@/components/AppHeader";
import { ProjectsListPage } from "@/components/ProjectsListPage";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";

export const metadata = {
  title: "Archidomo — Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <ProjectsListPage />
      </main>
      <Footer />
    </>
  );
}
