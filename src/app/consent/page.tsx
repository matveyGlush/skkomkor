import { AppHeader } from "@/components/AppHeader";
import { ConsentPage } from "@/components/ConsentPage";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";

export const metadata = {
  title: "Skkomkor — Согласие на обработку персональных данных",
};

export default function Consent() {
  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <ConsentPage />
      </main>
      <Footer />
    </>
  );
}
