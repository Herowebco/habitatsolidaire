import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Building2, Server, Shield, Cookie, FileText } from "lucide-react";

const sections = [
  {
    icon: FileText,
    titre: "Éditeur du site",
    contenu: [
      { label: "Dénomination", value: "Habitat Solidaire" },
      { label: "Forme juridique", value: "Association déclarée (loi 1901)" },
      { label: "SIREN", value: "923 384 150" },
      { label: "SIRET", value: "923 384 150 00010" },
      { label: "Siège social", value: "35 Avenue du 8 Mai 1945, 59176 Masny" },
      { label: "Email", value: "habitatsolidairenord@gmail.com" },
      { label: "Téléphone", value: "03 74 47 27 33" },
      { label: "Date de création", value: "7 avril 2023" },
    ],
  },
  {
    icon: Server,
    titre: "Hébergement",
    contenu: [
      { label: "Hébergeur", value: "Netlify Inc." },
      { label: "Adresse", value: "2325 3rd Street Suite 215, San Francisco, CA 94107, États-Unis" },
      { label: "Site", value: "www.netlify.com" },
    ],
  },
  {
    icon: Building2,
    titre: "Propriété intellectuelle",
    texte: "L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes) est la propriété exclusive d'Habitat Solidaire ou de ses partenaires. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable est interdite et constituerait une contrefaçon sanctionnée par le Code de la propriété intellectuelle.",
  },
  {
    icon: Shield,
    titre: "Données personnelles (RGPD)",
    texte: "Les données personnelles collectées via les formulaires de ce site (contact, réservation de salle) sont utilisées exclusivement pour traiter vos demandes. Elles ne sont ni vendues, ni transmises à des tiers sans votre consentement. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : habitatsolidairenord@gmail.com",
  },
  {
    icon: Cookie,
    titre: "Cookies",
    texte: "Ce site utilise des cookies fonctionnels nécessaires à son bon fonctionnement. Aucun cookie de traçage ou publicitaire n'est utilisé sans votre consentement explicite. Vous pouvez à tout moment modifier vos préférences via le bandeau de gestion des cookies disponible en bas de page.",
  },
];

export const metadata = {
  title: "Mentions légales - Habitat Solidaire",
  description: "Mentions légales et politique de confidentialité du site Habitat Solidaire.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-blanc-doux">

        {/* Hero minimaliste */}
        <div
          className="relative pt-36 pb-16 px-6 overflow-hidden"
          style={{
            backgroundImage: "url('/hero-section.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-blanc-doux/70" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blanc-doux to-transparent" />
          <div className="relative max-w-3xl mx-auto">
            <span className="inline-block bg-anthracite/08 text-anthracite/60 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
              Informations légales
            </span>
            <h1 className="font-epilogue font-extrabold text-anthracite text-4xl md:text-5xl leading-tight">
              Mentions légales.
            </h1>
            <p className="text-anthracite/55 font-manrope mt-3 text-base">
              Dernière mise à jour : juin 2026
            </p>
          </div>
        </div>

        {/* Contenu */}
        <div className="max-w-3xl mx-auto px-6 pb-24 flex flex-col gap-5">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.titre}
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(255,253,248,0.80)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 4px 24px rgba(47,69,55,0.05)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-vert-sauge/12 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-vert-sauge" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-epilogue font-bold text-anthracite text-lg">{s.titre}</h2>
                </div>

                {s.contenu && (
                  <dl className="flex flex-col gap-2.5">
                    {s.contenu.map((item) => (
                      <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-anthracite/40 font-manrope sm:w-40 shrink-0">
                          {item.label}
                        </dt>
                        <dd className="text-sm text-anthracite/80 font-manrope">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {s.texte && (
                  <p className="text-sm text-anthracite/70 font-manrope leading-relaxed">{s.texte}</p>
                )}
              </div>
            );
          })}

          <p className="text-center text-xs text-anthracite/30 font-manrope mt-4">
            Pour toute question relative à ces mentions légales, contactez-nous à{" "}
            <a href="mailto:habitatsolidairenord@gmail.com" className="underline hover:text-anthracite/60 transition-colors">
              habitatsolidairenord@gmail.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
