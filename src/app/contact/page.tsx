import { AppHeader } from "@/components/AppHeader";
import { ContactPage } from "@/components/ContactPage";
import { Footer } from "@/components/Footer";
import { MainTitle } from "@/components/MainTitle";

export const metadata = {
  title: "Skkomkor — Contact",
};

export default function Contact() {
  return (
    <>
      <MainTitle />
      <AppHeader />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
