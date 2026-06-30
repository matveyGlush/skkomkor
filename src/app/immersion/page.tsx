import { AppHeader } from "@/components/AppHeader";
import { ImmersionPage } from "@/components/ImmersionPage";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Archidomo — Immersion",
};

export default function Immersion() {
  return (
    <>
      <AppHeader />
      <main>
        <ImmersionPage />
      </main>
      <Footer />
    </>
  );
}
