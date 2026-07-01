"use client";

import { motion } from "framer-motion";
import { Scissors, Monitor, Leaf, Palette, BookOpen, Users } from "lucide-react";
import { BorderBeam } from "@/components/BorderBeam";

const activites = [
  {
    icon: Scissors,
    titre: "Couture & recyclage textile",
    desc: "Apprenez à réparer, transformer et créer à partir de vêtements et tissus donnés. Un atelier pratique pour donner une seconde vie aux textiles.",
    freq: "Tous les mardis",
    color: "terracotta",
  },
  {
    icon: Monitor,
    titre: "Initiation numérique",
    desc: "Prise en main des outils informatiques, internet, démarches en ligne. Accompagnement bienveillant pour tous les niveaux, des débutants aux confirmés.",
    freq: "Tous les mercredis",
    color: "vert-sauge",
  },
  {
    icon: Leaf,
    titre: "Jardinage & compostage",
    desc: "Techniques de jardinage naturel, fabrication de compost et initiation au potager partagé. Un lien concret avec la nature au coeur de Masny.",
    freq: "Tous les jeudis",
    color: "vert-profond",
  },
  {
    icon: Palette,
    titre: "Ateliers créatifs",
    desc: "Peinture, dessin, collage et arts plastiques accessibles à tous. Un espace d'expression libre, sans jugement, pour adultes et enfants.",
    freq: "Le 1er samedi du mois",
    color: "terracotta",
  },
  {
    icon: BookOpen,
    titre: "Aide aux démarches",
    desc: "Accompagnement administratif pour les démarches courantes : formulaires, courriers, accès aux droits. Un soutien concret pour les personnes isolées.",
    freq: "Tous les vendredis",
    color: "vert-sauge",
  },
  {
    icon: Users,
    titre: "Café solidaire",
    desc: "Un moment convivial et informel pour se retrouver, échanger et tisser des liens. Ouvert à toutes et tous, sans inscription nécessaire.",
    freq: "Tous les lundis",
    color: "vert-profond",
  },
];

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  terracotta: {
    bg: "bg-terracotta/10",
    text: "text-terracotta",
    badge: "bg-terracotta/12 text-terracotta",
  },
  "vert-sauge": {
    bg: "bg-vert-sauge/10",
    text: "text-vert-sauge",
    badge: "bg-vert-sauge/12 text-vert-sauge",
  },
  "vert-profond": {
    bg: "bg-vert-profond/10",
    text: "text-vert-profond",
    badge: "bg-vert-profond/12 text-vert-profond",
  },
};

export function AteliersActivites() {
  return (
    <section className="py-20 px-6 bg-blanc-doux">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-vert-sauge/12 text-vert-sauge rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Nos ateliers
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            Des activités pour{" "}
            <span className="bg-vert-sauge/15 text-vert-sauge px-2 py-0.5 rounded-lg">
              tous et toutes.
            </span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Chaque atelier est gratuit ou à participation libre. Aucune inscription préalable
            requise, venez comme vous êtes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activites.map((a, i) => {
            const Icon = a.icon;
            const c = colorMap[a.color];
            return (
              <motion.div
                key={a.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative rounded-2xl p-5 md:p-7 flex flex-col gap-4"
                style={{
                  background: "linear-gradient(135deg, rgba(104,124,104,0.06) 0%, rgba(255,253,248,0.90) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 8px 32px rgba(47,69,55,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <BorderBeam duration={8} delay={i * 1.1} colorFrom="rgba(104,124,104,0.6)" colorTo="rgba(217,130,91,0)" />

                <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <Icon className={c.text} size={19} strokeWidth={1.8} />
                </div>

                <div className="flex-1">
                  <h3 className="font-epilogue font-bold text-anthracite text-base mb-2">
                    {a.titre}
                  </h3>
                  <p className="text-anthracite/70 text-sm font-manrope leading-relaxed">
                    {a.desc}
                  </p>
                </div>

                <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full font-manrope ${c.badge}`}>
                  {a.freq}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
