import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AteliersHero } from "@/components/ateliers/AteliersHero";
import { AteliersActivites } from "@/components/ateliers/AteliersActivites";
import { AteliersAgenda } from "@/components/ateliers/AteliersAgenda";
import { AteliersCta } from "@/components/ateliers/AteliersCta";

export const metadata = {
  title: "Ateliers & Evenements - Habitat Solidaire",
  description: "Ateliers couture, numérique, jardinage et événements ouverts à tous à Masny. Gratuits, sans inscription.",
};

export default function AteliersPage() {
  return (
    <>
      <Navbar />
      <main>
        <AteliersHero />
        <AteliersActivites />
        <AteliersAgenda />
        <AteliersCta />
      </main>
      <Footer />
    </>
  );
}
