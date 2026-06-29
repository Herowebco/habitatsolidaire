import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CentreHero } from "@/components/centre/CentreHero";
import { CentreUsages } from "@/components/centre/CentreUsages";
import { CentreEspaces } from "@/components/centre/CentreEspaces";
import { CentreReservation } from "@/components/centre/CentreReservation";

export const metadata = {
  title: "Le Centre associatif - Habitat Solidaire",
  description: "600 m² dédiés aux associations partenaires à Masny. Salles à disposition, ateliers, formations et réservation en ligne.",
};

export default function CentreAssociatifPage() {
  return (
    <>
      <Navbar />
      <main>
        <CentreHero />
        <CentreUsages />
        <CentreEspaces />
        <CentreReservation />
      </main>
      <Footer />
    </>
  );
}
