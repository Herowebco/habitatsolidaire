"use client";

import { motion } from "framer-motion";
import { Heart, Handshake, MapPin, ClipboardCheck } from "lucide-react";
import { BorderBeam } from "@/components/BorderBeam";

const criteres = [
  {
    num: "1",
    icon: Heart,
    titre: "Utilité sociale",
    desc: "Le projet répond à un besoin réel du territoire et améliore concrètement la vie des habitants.",
    color: "terracotta",
  },
  {
    num: "2",
    icon: Handshake,
    titre: "Partenariat",
    desc: "L'action est portée par une association ou une structure partenaire engagée sur le territoire.",
    color: "vert-sauge",
  },
  {
    num: "3",
    icon: MapPin,
    titre: "Impact local",
    desc: "Les publics fragiles bénéficient directement ou indirectement des retombées du projet.",
    color: "vert-profond",
  },
  {
    num: "4",
    icon: ClipboardCheck,
    titre: "Sérieux",
    desc: "Budget, calendrier et objectifs sont clairement présentés et réalistes.",
    color: "terracotta",
  },
];

const colorMap: Record<string, { icon: string; num: string }> = {
  terracotta: { icon: "text-terracotta", num: "bg-terracotta/12 text-terracotta" },
  "vert-sauge": { icon: "text-vert-sauge", num: "bg-vert-sauge/12 text-vert-sauge" },
  "vert-profond": { icon: "text-vert-profond", num: "bg-vert-profond/12 text-vert-profond" },
};

export function ProjetsCriteres() {
  return (
    <section className="py-20 px-6 bg-blanc-doux">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-vert-sauge/12 text-vert-sauge rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Critères d'éligibilité
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            Quels projets{" "}
            <span className="bg-vert-sauge/15 text-vert-sauge px-2 py-0.5 rounded-lg">
              soutenons-nous ?
            </span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Habitat Solidaire peut devenir un levier pour permettre aux partenaires de lancer
            des actions concrètes, même avec peu de moyens.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {criteres.map((c, i) => {
            const Icon = c.icon;
            const col = colorMap[c.color];
            return (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl p-7 flex items-start gap-5"
                style={{
                  background: "linear-gradient(135deg, rgba(104,124,104,0.06) 0%, rgba(255,253,248,0.90) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 8px 32px rgba(47,69,55,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <BorderBeam duration={9} delay={i * 1.5} colorFrom="rgba(104,124,104,0.55)" colorTo="rgba(217,130,91,0)" />

                <span className={`shrink-0 w-10 h-10 rounded-full text-sm font-bold font-epilogue flex items-center justify-center ${col.num}`}>
                  {c.num}
                </span>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className={col.icon} strokeWidth={1.8} />
                    <h3 className="font-epilogue font-bold text-anthracite text-base">{c.titre}</h3>
                  </div>
                  <p className="text-anthracite/70 text-sm font-manrope leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
