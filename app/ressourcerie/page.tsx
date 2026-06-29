import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RessourcerieHero } from "@/components/ressourcerie/RessourcerieHero";
import { RessourcerieQuoi } from "@/components/ressourcerie/RessourcerieQuoi";
import { RessourcerieComment } from "@/components/ressourcerie/RessourcerieComment";
import { RessourcerieTypes } from "@/components/ressourcerie/RessourcerieTypes";
import { RessourcerieCta } from "@/components/ressourcerie/RessourcerieCta";

export const metadata = {
  title: "La Ressourcerie - Habitat Solidaire",
  description: "Réception, tri et redistribution gratuite de dons aux associations partenaires à Masny.",
};

export default function RessourceriePage() {
  return (
    <>
      <Navbar />
      <main>
        <RessourcerieHero />
        <RessourcerieQuoi />
        <RessourcerieComment />
        <RessourcerieTypes />
        <RessourcerieCta />
      </main>
      <Footer />
    </>
  );
}
