"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const quote = "Habitat Solidaire agit comme un pont entre les donateurs, les associations partenaires et les bénéficiaires finaux.";
const words = quote.split(" ");

function Word({ word, index, total, progress }: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const color = word === "pont" ? undefined : undefined;

  if (word === "pont") {
    return (
      <motion.span
        className="inline-block mr-[0.28em] text-terracotta"
        style={{ opacity }}
      >
        {word}
      </motion.span>
    );
  }

  return (
    <motion.span
      className="inline-block mr-[0.28em] text-anthracite"
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

export function Promesse() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  return (
    <section className="relative bg-blanc-doux overflow-hidden py-24 px-6">

      {/* ── Blobs ── */}
      <div aria-hidden="true" className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(104,124,104,0.25) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div aria-hidden="true" className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,130,91,0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Eyebrow */}
        <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-8">
          Notre vision
        </span>

        {/* Guillemet décoratif */}
        <div className="text-[120px] leading-none text-anthracite/[0.06] font-epilogue font-extrabold -mb-8 select-none" aria-hidden="true">
          "
        </div>

        {/* Citation — scroll-driven word reveal */}
        <h2
          ref={containerRef}
          className="font-epilogue font-extrabold leading-[1.15] tracking-tight mb-8"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          aria-label={quote}
        >
          {words.map((word, i) => (
            <Word
              key={i}
              word={word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </h2>

        {/* Ligne décorative */}
        <div className="w-16 h-0.5 bg-terracotta mx-auto mb-8" />

        {/* Sous-texte */}
        <p className="text-anthracite/75 text-lg leading-relaxed font-manrope max-w-2xl mx-auto mb-12">
          Un projet conçu pour donner plus d'impact à chaque don et plus de moyens aux associations.
          Centraliser, redistribuer, accueillir, accompagner. Ici, à Masny.
        </p>

        {/* 3 piliers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Centraliser", desc: "Les ressources utiles au bon endroit" },
            { label: "Redistribuer", desc: "Gratuitement aux associations partenaires" },
            { label: "Accompagner", desc: "Les publics fragiles vers la stabilité" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(217,130,91,0.12) 0%, rgba(217,130,91,0.05) 100%)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(217,130,91,0.20)",
                boxShadow: "0 4px 24px rgba(217,130,91,0.08)",
              }}
            >
              <span className="font-epilogue font-bold text-anthracite text-lg">{item.label}</span>
              <span className="text-anthracite/50 text-sm font-manrope text-center">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="#nos-actions"
          className="inline-flex items-center gap-2 bg-vert-profond hover:bg-vert-profond/90 text-blanc-doux font-semibold px-8 py-4 rounded-full transition-all shadow-lg shadow-vert-profond/20 text-base font-manrope"
        >
          Découvrir nos actions
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
