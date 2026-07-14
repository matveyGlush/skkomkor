import { AppHeader } from "@/components/AppHeader";
import { PrivacyPage } from "@/components/PrivacyPage";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";

export const metadata = {
  title: "Skkomkor — Политика конфиденциальности",
};

export default function Privacy() {
  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <PrivacyPage />
      </main>
      <Footer />
    </>
  );
}
