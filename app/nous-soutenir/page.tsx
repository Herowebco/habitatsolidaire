import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SoutenirHero } from "@/components/soutenir/SoutenirHero";
import { SoutenirOptions } from "@/components/soutenir/SoutenirOptions";
import { SoutenirDon } from "@/components/soutenir/SoutenirDon";
import { SoutenirBenevole } from "@/components/soutenir/SoutenirBenevole";
import { SoutenirPartenariat } from "@/components/soutenir/SoutenirPartenariat";
export const metadata = {
  title: "Nous soutenir - Habitat Solidaire",
  description: "Soutenez l'association Habitat Solidaire à Masny : don, bénévolat ou partenariat.",
};

export default function NousSoutenirPage() {
  return (
    <>
      <Navbar />
      <main>
        <SoutenirHero />
        <SoutenirOptions />
        <SoutenirDon />
        <SoutenirBenevole />
        <SoutenirPartenariat />
      </main>
      <Footer />
    </>
  );
}
