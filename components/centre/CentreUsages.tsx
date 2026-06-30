"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, CalendarCheck, Package, Heart } from "lucide-react";
import { BorderBeam } from "@/components/BorderBeam";

const usages = [
  {
    icon: Users,
    title: "Réunions & assemblées",
    desc: "Mettez à disposition de votre association un espace calme et équipé pour vos réunions, conseils d'administration et assemblées générales.",
  },
  {
    icon: GraduationCap,
    title: "Ateliers & formations",
    desc: "Organisez vos ateliers collectifs, sessions de formation, permanences et cours dans des salles adaptées à vos besoins.",
  },
  {
    icon: CalendarCheck,
    title: "Permanences associatives",
    desc: "Tenez vos permanences régulières dans un cadre stable et accessible, au cœur de Masny, proche des publics que vous accompagnez.",
  },
  {
    icon: Package,
    title: "Distributions & préparation",
    desc: "Organisez la préparation et la distribution de lots, colis ou ressources grâce aux espaces logistiques du centre.",
  },
  {
    icon: Heart,
    title: "Temps conviviaux & événements",
    desc: "Créez du lien social avec des moments de convivialité, des événements ouverts au territoire et des actions d'entraide.",
  },
];

export function CentreUsages() {
  return (
    <section className="py-20 px-6 bg-blanc-doux">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Ce qu'on y fait
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            Un lieu ressource pour{" "}
            <span className="bg-vert-profond/12 text-vert-profond px-2 py-0.5 rounded-lg">
              faire plus, ensemble.
            </span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Le centre associatif est un outil collectif : un espace vivant, mutualisé, utile et accessible aux partenaires.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {usages.map((u, i) => {
            const Icon = u.icon;
            return (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  background: "linear-gradient(135deg, rgba(104,124,104,0.08) 0%, rgba(255,253,248,0.85) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 8px 32px rgba(47,69,55,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <BorderBeam
                  duration={8}
                  delay={i * 1.2}
                  colorFrom="rgba(104,124,104,0.7)"
                  colorTo="rgba(217,130,91,0)"
                />
                <div className="w-11 h-11 rounded-xl bg-vert-sauge flex items-center justify-center shadow-sm">
                  <Icon className="text-blanc-doux" size={19} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-epilogue font-bold text-anthracite text-base mb-1.5">
                    {u.title}
                  </h3>
                  <p className="text-anthracite/75 text-sm font-manrope leading-relaxed">
                    {u.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
