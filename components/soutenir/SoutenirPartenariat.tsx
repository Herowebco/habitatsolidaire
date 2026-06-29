import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const niveaux = [
  {
    label: "Partenaire donateur",
    color: "bg-vert-sauge",
    accent: "text-vert-sauge",
    border: "border-vert-sauge/20",
    bg: "rgba(104,124,104,0.08)",
    avantages: [
      "Logo sur notre site internet",
      "Mention dans nos communications",
      "Reçu fiscal pour les dons en nature",
      "Accès à nos événements partenaires",
    ],
  },
  {
    label: "Partenaire projet",
    color: "bg-vert-profond",
    accent: "text-vert-profond",
    border: "border-vert-profond/20",
    bg: "rgba(47,69,55,0.08)",
    highlight: true,
    avantages: [
      "Tout du niveau Partenaire donateur",
      "Co-construction de projets solidaires",
      "Visibilité lors des actions terrain",
      "Reporting d'impact personnalisé",
      "Réunions trimestrielles dédiées",
    ],
  },
  {
    label: "Mécène fondateur",
    color: "bg-terracotta",
    accent: "text-terracotta",
    border: "border-terracotta/20",
    bg: "rgba(217,130,91,0.08)",
    avantages: [
      "Tout du niveau Partenaire projet",
      "Présence au conseil d'administration",
      "Naming possible sur un espace du centre",
      "Communication dédiée et relations presse",
      "Bilan d'impact annuel exclusif",
    ],
  },
];

export function SoutenirPartenariat() {
  return (
    <section id="partenariat" className="relative bg-blanc-doux py-20 px-6 overflow-hidden">
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #2F453720 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
            Partenariat
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite text-3xl md:text-4xl leading-tight mb-4">
            Construisons{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">ensemble.</span>
          </h2>
          <p className="text-anthracite/75 font-manrope max-w-xl mx-auto">
            Associations, entreprises, collectivités : trois niveaux d'engagement pour un impact croissant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {niveaux.map((n) => (
            <div
              key={n.label}
              className={`relative rounded-3xl p-6 flex flex-col gap-5 ${n.highlight ? "ring-2 ring-vert-profond/30" : ""}`}
              style={{
                background: `linear-gradient(135deg, ${n.bg} 0%, rgba(255,253,248,0.75) 100%)`,
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: `1px solid rgba(255,255,255,0.70)`,
                boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
              }}
            >
              {n.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-block bg-vert-profond text-blanc-doux text-[10px] font-semibold tracking-widest uppercase font-manrope px-3 py-1 rounded-full">
                  Recommandé
                </span>
              )}

              <div className={`w-10 h-10 rounded-xl ${n.color} flex items-center justify-center shadow-sm`}>
                <Check className="text-blanc-doux" size={16} strokeWidth={2.5} />
              </div>

              <div>
                <h3 className={`font-epilogue font-bold text-xl ${n.accent} mb-3`}>{n.label}</h3>
                <ul className="flex flex-col gap-2">
                  {n.avantages.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-anthracite/80 font-manrope">
                      <Check size={13} className={`${n.accent} mt-0.5 shrink-0`} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="mt-auto inline-flex items-center gap-2 bg-anthracite hover:bg-anthracite/85 text-blanc-doux text-sm font-semibold px-5 py-2.5 rounded-full transition-all font-manrope"
              >
                Nous contacter <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
