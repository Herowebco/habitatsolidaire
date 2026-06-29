"use client";

import { motion } from "framer-motion";
import { Truck, ListChecks, HeartHandshake, Camera } from "lucide-react";

const pillars = [
  {
    icon: Truck,
    title: "Réception des lots",
    desc: "Habitat Solidaire réceptionne des dons en gros volumes : surplus, invendus ou partenariats entreprises, directement à l'adresse de la ressourcerie.",
  },
  {
    icon: ListChecks,
    title: "Tri & préparation",
    desc: "Chaque lot est contrôlé, trié, rangé et préparé selon les besoins recensés auprès des associations partenaires du territoire.",
  },
  {
    icon: HeartHandshake,
    title: "Redistribution gratuite",
    desc: "Les ressources triées sont distribuées gratuitement aux structures partenaires. Aucun intermédiaire, aucun profit. Seulement de l'utilité.",
  },
  {
    icon: Camera,
    title: "Traçabilité & impact",
    desc: "Photos, bilans et rapports d'actions sont transmis aux donateurs pour valoriser concrètement l'impact de chaque don reçu.",
  },
];

export function RessourcerieQuoi() {
  return (
    <section className="py-20 px-6 bg-blanc-doux">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Notre rôle
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            Transformer le don en{" "}
            <span className="bg-vert-profond/12 text-vert-profond px-2 py-0.5 rounded-lg">
              ressource partagée.
            </span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Une base logistique solidaire pour que chaque don arrive là où il est le plus utile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-7 flex gap-5 items-start"
                style={{
                  background: "linear-gradient(135deg, rgba(217,130,91,0.08) 0%, rgba(255,253,248,0.8) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(217,130,91,0.15)",
                  boxShadow: "0 8px 32px rgba(47,69,55,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-terracotta flex items-center justify-center shadow-sm">
                  <Icon className="text-blanc-doux" size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-epilogue font-bold text-anthracite text-lg mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-anthracite/75 text-sm font-manrope leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Phrase forte */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center px-8 py-6 rounded-2xl"
          style={{
            background: "rgba(255,253,248,0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.65)",
            boxShadow: "0 4px 24px rgba(47,69,55,0.06)",
          }}
        >
          <p className="font-epilogue font-bold text-anthracite text-lg md:text-xl">
            Chaque don reçu devient une{" "}
            <span className="text-vert-profond">ressource partagée.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
