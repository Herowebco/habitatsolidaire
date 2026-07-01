"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Package, Search, Handshake, Heart } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: Users,
    title: "Donateurs",
    desc: "Particuliers, entreprises et partenaires qui donnent des lots de matériel.",
    color: "bg-terracotta",
    light: false,
  },
  {
    num: 2,
    icon: Package,
    title: "Réception des dons",
    desc: "Collecte et réception à la ressourcerie solidaire, 105 Avenue du 8 Mai 1945, Masny.",
    color: "bg-terracotta",
    light: false,
  },
  {
    num: 3,
    icon: Search,
    title: "Tri & contrôle",
    desc: "Vérification, tri et préparation selon les besoins des associations partenaires.",
    color: "bg-terracotta",
    light: false,
  },
  {
    num: 4,
    icon: Handshake,
    title: "Redistribution gratuite",
    desc: "Dispatch gratuit aux associations selon les besoins du territoire.",
    color: "bg-terracotta",
    light: false,
  },
  {
    num: 5,
    icon: Heart,
    title: "Bénéficiaires & projets",
    desc: "Les publics accompagnés reçoivent une aide concrète, traçable et utile.",
    color: "bg-terracotta",
    light: false,
  },
];

function StepDot({ step, index, total, progress }: {
  step: typeof steps[0];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(
    progress,
    [(index / total) * 0.85, ((index + 0.5) / total) * 0.85],
    [0, 1]
  );
  return (
    <motion.div
      className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center shadow-md`}
      style={{ opacity }}
    >
      <span className="text-blanc-doux text-xs font-bold font-epilogue">{step.num}</span>
    </motion.div>
  );
}

function StepCard({ step, index, progress }: {
  step: typeof steps[0];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const Icon = step.icon;
  const isRight = index % 2 === 1;
  const start = (index / steps.length) * 0.85;
  const end = ((index + 1) / steps.length) * 0.85;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [20, 0]);

  return (
    <div className={`flex items-center gap-0 ${isRight ? "flex-row-reverse" : "flex-row"}`}>

      {/* Carte */}
      <motion.div
        className={`w-full md:w-[42%] ${isRight ? "md:ml-auto" : "md:mr-auto"}`}
        style={{ opacity, y }}
      >
        <div
          className="rounded-2xl p-6 flex gap-4 items-start"
          style={{
            background: "linear-gradient(135deg, rgba(217,130,91,0.10) 0%, rgba(255,253,248,0.75) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(217,130,91,0.18)",
            boxShadow: "0 8px 32px rgba(47,69,55,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Icône */}
          <div className={`shrink-0 w-12 h-12 rounded-xl ${step.color} flex items-center justify-center shadow-sm`}>
            <Icon className="text-blanc-doux" size={20} strokeWidth={1.8} />
          </div>

          {/* Texte */}
          <div>
            <span className="inline-block bg-terracotta/10 text-terracotta/70 rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase font-manrope">
              Étape {step.num}
            </span>
            <h3 className="font-epilogue font-bold text-anthracite text-lg mt-0.5 mb-1.5">
              {step.title}
            </h3>
            <p className="text-anthracite/80 text-sm font-manrope leading-relaxed">
              {step.desc}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Espace central (ligne passe ici sur desktop) */}
      <div className="hidden md:block w-[16%] shrink-0" />
    </div>
  );
}

export function CircuitDon() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section className="relative py-24 px-6 overflow-hidden">

      {/* Background SVG hero */}
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

      <div className="relative max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Comment ça marche
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-5xl leading-tight">
            Un circuit du don simple,<br className="hidden md:block" /> lisible et{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">rassurant.</span>
          </h2>
          <p className="text-anthracite/75 text-lg font-manrope mt-4 max-w-xl mx-auto">
            Le donateur comprend le chemin de son don et l'association partenaire reçoit une aide organisée.
          </p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">

          {/* Ligne centrale verticale — desktop seulement */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-anthracite/10" />
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px overflow-hidden" style={{ bottom: 0 }}>
            <motion.div
              className="w-full bg-terracotta origin-top"
              style={{ scaleY: scrollYProgress, transformOrigin: "top", height: "100%" }}
            />
          </div>

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Point central sur la ligne — desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 items-center justify-center">
                  <StepDot step={step} index={i} total={steps.length} progress={scrollYProgress} />
                </div>

                <StepCard step={step} index={i} progress={scrollYProgress} />
              </div>
            ))}
          </div>
        </div>

        {/* Promesse bottom */}
        <div
          className="mt-14 text-center px-8 py-6 rounded-2xl"
          style={{
            background: "rgba(255,253,248,0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 4px 24px rgba(47,69,55,0.06)",
          }}
        >
          <p className="font-epilogue font-bold text-anthracite text-lg md:text-xl">
            Donner, valoriser, partager :{" "}
            <span className="text-vert-profond">ensemble pour un impact solidaire.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
