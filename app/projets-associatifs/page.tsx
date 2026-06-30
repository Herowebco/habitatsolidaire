import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjetsHero } from "@/components/projets/ProjetsHero";
import { ProjetsCriteres } from "@/components/projets/ProjetsCriteres";
import { ProjetsProcessus } from "@/components/projets/ProjetsProcessus";
import { ProjetsCta } from "@/components/projets/ProjetsCta";

export const metadata = {
  title: "Projets associatifs - Habitat Solidaire",
  description: "Habitat Solidaire accompagne et finance des projets associatifs à impact local sur le territoire de Masny.",
};

export default function ProjetsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjetsHero />
        <ProjetsCriteres />
        <ProjetsProcessus />
        <ProjetsCta />
      </main>
      <Footer />
    </>
  );
}
