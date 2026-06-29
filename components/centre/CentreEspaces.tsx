"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Maximize2, Wifi } from "lucide-react";

const espaces = [
  {
    title: "Grande salle polyvalente",
    desc: "Idéale pour les formations, ateliers collectifs, événements et assemblées générales. Modulable selon vos besoins.",
    capacite: "jusqu'à 50 personnes",
    surface: "environ 80 m²",
    equipements: ["Tables & chaises modulables", "Vidéoprojecteur", "Wifi inclus"],
    photo: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80&fit=crop",
  },
  {
    title: "Salle de réunion",
    desc: "Un espace calme et équipé pour vos réunions de bureau, permanences associatives et petits groupes de travail.",
    capacite: "jusqu'à 15 personnes",
    surface: "environ 30 m²",
    equipements: ["Grande table de réunion", "Tableau blanc", "Wifi inclus"],
    photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop",
  },
  {
    title: "Espace atelier",
    desc: "Conçu pour les activités pratiques : couture, bricolage, réparation, préparation de kits et ateliers manuels.",
    capacite: "jusqu'à 20 personnes",
    surface: "environ 50 m²",
    equipements: ["Plans de travail", "Rangements dédiés", "Accès logistique"],
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
  },
];

export function CentreEspaces() {
  return (
    <section id="les-espaces" className="relative py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-section.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blanc-doux/55" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blanc-doux to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Nos espaces
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            Des salles pour chaque{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">besoin.</span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Trois espaces distincts, disponibles à la réservation pour les associations partenaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {espaces.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "rgba(255,253,248,0.70)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.65)",
                boxShadow: "0 8px 32px rgba(47,69,55,0.08)",
              }}
            >
              {/* Photo */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={e.photo}
                  alt={e.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/30 to-transparent" />
              </div>

              {/* Contenu */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="font-epilogue font-bold text-anthracite text-base">
                  {e.title}
                </h3>
                <p className="text-anthracite/75 text-sm font-manrope leading-relaxed">
                  {e.desc}
                </p>

                {/* Infos capacité */}
                <div className="flex gap-3 mt-1">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-manrope text-anthracite/60 bg-anthracite/5 rounded-full px-2.5 py-1">
                    <Users size={11} />
                    {e.capacite}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-manrope text-anthracite/60 bg-anthracite/5 rounded-full px-2.5 py-1">
                    <Maximize2 size={11} />
                    {e.surface}
                  </span>
                </div>

                {/* Équipements */}
                <ul className="flex flex-col gap-1 mt-1">
                  {e.equipements.map((eq) => (
                    <li key={eq} className="flex items-center gap-2 text-xs font-manrope text-anthracite/65">
                      <span className="w-1 h-1 rounded-full bg-vert-sauge shrink-0" />
                      {eq}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
