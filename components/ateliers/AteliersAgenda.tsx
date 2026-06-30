"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const evenements = [
  {
    date: "Juillet 2026",
    jour: "12",
    mois: "Juil.",
    titre: "Portes ouvertes de la ressourcerie",
    desc: "Venez découvrir les coulisses de la ressourcerie solidaire : tri, stockage et redistribution des dons. Visite guidée et échanges avec l'équipe.",
    heure: "10h - 16h",
    lieu: "105 Avenue du 8 Mai 1945, Masny",
    tag: "Événement",
    color: "terracotta",
  },
  {
    date: "Juillet 2026",
    jour: "19",
    mois: "Juil.",
    titre: "Atelier couture spécial été",
    desc: "Session intensive de couture créative : transformation de vêtements, personnalisation et upcycling. Matériel fourni, accessible à tous niveaux.",
    heure: "14h - 17h",
    lieu: "Centre associatif, 49C rue de la Fabrique",
    tag: "Atelier",
    color: "vert-sauge",
  },
  {
    date: "Août 2026",
    jour: "23",
    mois: "Août",
    titre: "Fête de quartier solidaire",
    desc: "Un moment festif ouvert à tout le quartier avec animations, stands associatifs, musique et repas partagé. Entrée libre, venez nombreux !",
    heure: "15h - 22h",
    lieu: "Parvis du centre associatif, Masny",
    tag: "Événement",
    color: "terracotta",
  },
  {
    date: "Septembre 2026",
    jour: "06",
    mois: "Sept.",
    titre: "Rentrée des ateliers 2026-2027",
    desc: "Reprise de tous les ateliers hebdomadaires avec de nouvelles sessions et de nouveaux intervenants. Inscription libre sur place.",
    heure: "9h - 17h",
    lieu: "Centre associatif, 49C rue de la Fabrique",
    tag: "Rentrée",
    color: "vert-profond",
  },
];

const tagColor: Record<string, string> = {
  terracotta: "bg-terracotta/12 text-terracotta",
  "vert-sauge": "bg-vert-sauge/12 text-vert-sauge",
  "vert-profond": "bg-vert-profond/12 text-vert-profond",
};

const dotColor: Record<string, string> = {
  terracotta: "bg-terracotta",
  "vert-sauge": "bg-vert-sauge",
  "vert-profond": "bg-vert-profond",
};

export function AteliersAgenda() {
  return (
    <section className="py-20 px-6" style={{ background: "rgba(104,124,104,0.04)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Agenda
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            Prochains{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">
              événements.
            </span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Tous nos événements sont gratuits et ouverts à toutes et tous. Pas besoin de s'inscrire, il suffit de venir.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {evenements.map((e, i) => (
            <motion.div
              key={e.titre}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 items-start"
            >
              {/* Date bloc */}
              <div
                className="shrink-0 w-16 text-center rounded-2xl py-3 px-2 hidden sm:flex flex-col items-center"
                style={{
                  background: "rgba(255,253,248,0.80)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 4px 16px rgba(47,69,55,0.06)",
                }}
              >
                <span className="font-epilogue font-extrabold text-anthracite text-2xl leading-none">{e.jour}</span>
                <span className="font-manrope text-anthracite/50 text-xs mt-0.5 uppercase tracking-wider">{e.mois}</span>
              </div>

              {/* Ligne + point */}
              <div className="hidden sm:flex flex-col items-center pt-4">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor[e.color]}`} />
                {i < evenements.length - 1 && (
                  <div className="w-px flex-1 bg-anthracite/10 mt-2" style={{ minHeight: "60px" }} />
                )}
              </div>

              {/* Carte */}
              <div
                className="flex-1 rounded-2xl p-6 mb-2"
                style={{
                  background: "rgba(255,253,248,0.75)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 4px 24px rgba(47,69,55,0.06)",
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <h3 className="font-epilogue font-bold text-anthracite text-base">{e.titre}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full font-manrope shrink-0 ${tagColor[e.color]}`}>
                    {e.tag}
                  </span>
                </div>
                <p className="text-anthracite/70 text-sm font-manrope leading-relaxed mb-4">{e.desc}</p>
                <div className="flex flex-wrap gap-4 text-xs text-anthracite/55 font-manrope">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-vert-sauge" />
                    {e.heure}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-terracotta" />
                    {e.lieu}
                  </span>
                  <span className="flex items-center gap-1.5 sm:hidden">
                    <CalendarDays size={12} className="text-anthracite/40" />
                    {e.jour} {e.mois}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
