"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Package2, SlidersHorizontal, Send } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: Phone,
    label: "Contact",
    title: "Vous nous signalez un lot",
    desc: "Vous disposez d'un stock de matériel, de surplus ou d'invendus ? Contactez-nous par téléphone ou email pour nous décrire votre don.",
  },
  {
    num: 2,
    icon: Package2,
    label: "Réception",
    title: "Livraison à la ressourcerie",
    desc: "Nous organisons la réception du lot au 105 Avenue du 8 Mai 1945, Masny. Possibilité de collecte pour les grands volumes.",
  },
  {
    num: 3,
    icon: SlidersHorizontal,
    label: "Tri",
    title: "Contrôle & organisation",
    desc: "L'équipe trie, contrôle et range chaque article. Les ressources sont préparées selon les besoins remontés par les associations partenaires.",
  },
  {
    num: 4,
    icon: Send,
    label: "Dispatch",
    title: "Redistribution gratuite",
    desc: "Les ressources partent gratuitement vers les associations qui en ont besoin. Un bilan avec photos vous est envoyé pour valoriser votre geste.",
  },
];

function StepDot({ index, total, progress }: {
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
      className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center shadow-md"
      style={{ opacity }}
    >
      <span className="text-blanc-doux text-xs font-bold font-epilogue">{index + 1}</span>
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
    <div className={`flex items-center ${isRight ? "flex-row-reverse" : "flex-row"}`}>
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
          <div className="shrink-0 w-12 h-12 rounded-xl bg-terracotta flex items-center justify-center shadow-sm">
            <Icon className="text-blanc-doux" size={20} strokeWidth={1.8} />
          </div>
          <div>
            <span className="inline-block bg-terracotta/10 text-terracotta/70 rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase font-manrope">
              {step.label}
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
      <div className="hidden md:block w-[16%] shrink-0" />
    </div>
  );
}

export function RessourcerieComment() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section className="relative py-24 px-6 overflow-hidden">
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
        <div className="text-center mb-16">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Comment proposer un don
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-4xl md:text-5xl leading-tight">
            Un processus simple,{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">en 4 étapes.</span>
          </h2>
          <p className="text-anthracite/75 text-lg font-manrope mt-4 max-w-xl mx-auto">
            Du premier contact jusqu'au bilan d'impact, chaque étape est suivie et valorisée.
          </p>
        </div>

        <div ref={ref} className="relative">
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
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 items-center justify-center">
                  <StepDot index={i} total={steps.length} progress={scrollYProgress} />
                </div>
                <StepCard step={step} index={i} progress={scrollYProgress} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
