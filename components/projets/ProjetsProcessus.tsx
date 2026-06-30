"use client";

import { motion } from "framer-motion";
import { Send, Search, CheckCircle, Banknote, BarChart3 } from "lucide-react";
import { BorderBeam } from "@/components/BorderBeam";

const etapes = [
  {
    num: "1",
    icon: Send,
    titre: "Déposer une demande",
    desc: "Envoyez-nous une présentation de votre projet via le formulaire de contact ou par email. Décrivez l'action, les bénéficiaires et vos besoins.",
    side: "left",
  },
  {
    num: "2",
    icon: Search,
    titre: "Étude par Habitat Solidaire",
    desc: "Notre équipe analyse la demande selon les critères d'éligibilité. Un retour vous est adressé sous 2 semaines.",
    side: "right",
  },
  {
    num: "3",
    icon: CheckCircle,
    titre: "Validation ou ajustement",
    desc: "Le projet est validé tel quel ou nous vous proposons des ajustements pour maximiser son impact et sa faisabilité.",
    side: "left",
  },
  {
    num: "4",
    icon: Banknote,
    titre: "Financement & appui",
    desc: "Selon le projet : apport financier, mise à disposition de locaux, soutien logistique, mise en réseau avec nos partenaires.",
    side: "right",
  },
  {
    num: "5",
    icon: BarChart3,
    titre: "Bilan et valorisation",
    desc: "À l'issue de l'action, un bilan est réalisé ensemble. Les résultats sont partagés sur nos supports de communication.",
    side: "left",
  },
];

export function ProjetsProcessus() {
  return (
    <section className="py-20 px-6" style={{ background: "rgba(104,124,104,0.04)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Comment ça marche
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            De la demande{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">
              au projet réalisé.
            </span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Un processus simple et transparent pour accompagner chaque projet de A à Z.
          </p>
        </div>

        {/* Zigzag desktop */}
        <div className="hidden md:block relative">
          {/* Ligne centrale verticale */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(104,124,104,0.3), rgba(217,130,91,0.3))" }}
          />

          <div className="flex flex-col gap-6">
            {etapes.map((e, i) => {
              const Icon = e.icon;
              const isLeft = e.side === "left";
              return (
                <motion.div
                  key={e.num}
                  initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Carte */}
                  <div className="flex-1">
                    <div
                      className="relative rounded-2xl p-6 flex flex-col gap-3"
                      style={{
                        background: "rgba(255,253,248,0.85)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.70)",
                        boxShadow: "0 8px 32px rgba(47,69,55,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
                      }}
                    >
                      <BorderBeam
                        duration={8}
                        delay={i * 1.3}
                        colorFrom={i < 2 ? "rgba(104,124,104,0.7)" : "rgba(217,130,91,0.7)"}
                        colorTo="rgba(255,255,255,0)"
                      />
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${i < 2 ? "bg-vert-sauge/12" : "bg-terracotta/12"}`}>
                          <Icon size={17} className={i < 2 ? "text-vert-sauge" : "text-terracotta"} strokeWidth={1.8} />
                        </div>
                        <h3 className="font-epilogue font-bold text-anthracite text-sm leading-snug">{e.titre}</h3>
                      </div>
                      <p className="text-anthracite/65 text-xs font-manrope leading-relaxed">{e.desc}</p>
                    </div>
                  </div>

                  {/* Bulle centrale */}
                  <div className="shrink-0 z-10 w-11 h-11 rounded-full bg-anthracite flex items-center justify-center shadow-lg">
                    <span className="text-blanc-doux font-epilogue font-bold text-sm">{e.num}</span>
                  </div>

                  {/* Espace vide côté opposé */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile : vertical centré */}
        <div className="md:hidden flex flex-col gap-4 items-center">
          {etapes.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={e.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative w-full rounded-2xl p-6 flex flex-col items-center text-center gap-3"
                style={{
                  background: "rgba(255,253,248,0.85)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.70)",
                  boxShadow: "0 8px 32px rgba(47,69,55,0.07)",
                }}
              >
                <BorderBeam
                  duration={8}
                  delay={i * 1.3}
                  colorFrom={i < 2 ? "rgba(104,124,104,0.7)" : "rgba(217,130,91,0.7)"}
                  colorTo="rgba(255,255,255,0)"
                />
                <div className="w-10 h-10 rounded-full bg-anthracite flex items-center justify-center shadow">
                  <span className="text-blanc-doux font-epilogue font-bold text-sm">{e.num}</span>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${i < 2 ? "bg-vert-sauge/12" : "bg-terracotta/12"}`}>
                  <Icon size={17} className={i < 2 ? "text-vert-sauge" : "text-terracotta"} strokeWidth={1.8} />
                </div>
                <h3 className="font-epilogue font-bold text-anthracite text-sm leading-snug">{e.titre}</h3>
                <p className="text-anthracite/65 text-xs font-manrope leading-relaxed">{e.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
