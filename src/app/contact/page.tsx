import { AppHeader } from "@/components/AppHeader";
import { ContactPage } from "@/components/ContactPage";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Archidomo — Contact",
};

export default function Contact() {
  return (
    <>
      <AppHeader />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
