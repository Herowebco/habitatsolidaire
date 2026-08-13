import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LogementsHero } from "@/components/logements/LogementsHero";
import { LogementsCriteres } from "@/components/logements/LogementsCriteres";
import { LogementsProcessus } from "@/components/logements/LogementsProcessus";
import { LogementsCta } from "@/components/logements/LogementsCta";

export const metadata = {
  title: "Logements rebond - Habitat Solidaire",
  description: "Logements temporaires, dignes et sécurisés pour les publics fragiles, avec accompagnement social à Masny.",
};

export default function LogementsReboundPage() {
  return (
    <>
      <Navbar />
      <main>
        <LogementsHero />
        <LogementsCriteres />
        <LogementsProcessus />
        <LogementsCta />
      </main>
      <Footer />
    </>
  );
}
