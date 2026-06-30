import { AppHeader } from "@/components/AppHeader";
import { ProjectsListPage } from "@/components/ProjectsListPage";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Archidomo — Projects",
};

export default function ProjectsPage() {
  return (
    <>
      <AppHeader />
      <main>
        <ProjectsListPage />
      </main>
      <Footer />
    </>
  );
}
