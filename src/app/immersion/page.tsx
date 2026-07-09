import { AppHeader } from "@/components/AppHeader";
import { ImmersionPage } from "@/components/ImmersionPage";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";

export const metadata = {
  title: "Skkomkor — Immersion",
};

export default function Immersion() {
  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <ImmersionPage />
      </main>
      <Footer />
    </>
  );
}
