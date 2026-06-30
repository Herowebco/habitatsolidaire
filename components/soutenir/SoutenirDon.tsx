import { ExternalLink, Check } from "lucide-react";

const HELLOASSO_URL = "https://www.helloasso.com/associations/habitat-solidaire"; // À remplacer

const amounts = [
  { value: "5 €",   label: "Un café solidaire" },
  { value: "20 €",  label: "Un coup de main" },
  { value: "50 €",  label: "Un vrai impact" },
  { value: "Libre", label: "Votre montant" },
];

const impacts = [
  "100% des dons sont reversés aux missions",
  "Reçu fiscal disponible sur HelloAsso",
  "Traçabilité garantie de votre don",
];

const glassCard = {
  background: "rgba(255,253,248,0.70)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
};

export function SoutenirDon() {
  return (
    <section id="don" className="relative bg-blanc-doux py-20 px-6 overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #D9825B18 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
            Faire un don
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite text-3xl md:text-4xl leading-tight mb-4">
            Votre don a un impact{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">direct.</span>
          </h2>
          <p className="text-anthracite/75 font-manrope max-w-xl mx-auto">
            Chaque contribution finance concrètement nos actions sur le territoire de Masny.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* Montants */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-3">
            {amounts.map((a) => (
              <div
                key={a.value}
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "linear-gradient(135deg, rgba(217,130,91,0.10) 0%, rgba(255,253,248,0.75) 100%)",
                  border: "1px solid rgba(217,130,91,0.18)",
                  boxShadow: "0 4px 16px rgba(217,130,91,0.06)",
                }}
              >
                <span className="font-epilogue font-extrabold text-terracotta text-3xl">{a.value}</span>
                <span className="font-epilogue font-bold text-anthracite text-base">{a.label}</span>
              </div>
            ))}
          </div>

          {/* CTA HelloAsso + garanties */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl p-6 flex flex-col gap-5" style={glassCard}>
              <div>
                <p className="font-epilogue font-bold text-anthracite text-lg mb-1">Prêt à donner ?</p>
                <p className="text-anthracite/75 text-sm font-manrope">
                  Le paiement est sécurisé via HelloAsso, plateforme de référence pour les associations françaises.
                </p>
              </div>

              <a
                href={HELLOASSO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-4 font-semibold text-base transition-all font-manrope"
                style={{
                  background: "#FF6B5B",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(255,107,91,0.35)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.2"/>
                  <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 16c-3.314 0-6-1.343-6-3v-1c0-1.657 2.686-3 6-3s6 1.343 6 3v1c0 1.657-2.686 3-6 3z" fill="white"/>
                </svg>
                Faire un don sur HelloAsso
                <ExternalLink size={15} />
              </a>

              <ul className="flex flex-col gap-2">
                {impacts.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-anthracite/75 font-manrope">
                    <Check size={13} className="text-vert-sauge mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
