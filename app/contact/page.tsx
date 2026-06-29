import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";

export const metadata = {
  title: "Contact - Habitat Solidaire",
  description: "Contactez l'association Habitat Solidaire à Masny. Formulaire, email, téléphone et adresses.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactMap />
      </main>
      <Footer />
    </>
  );
}
