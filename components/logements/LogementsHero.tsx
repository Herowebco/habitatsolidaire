"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Home, ShieldCheck } from "lucide-react";

export function LogementsHero() {
  return (
    <section className="relative pt-28 pb-16 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-section.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      >
        <div className="absolute inset-0 bg-blanc-doux/55" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blanc-doux to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Texte gauche */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-vert-profond/12 text-vert-profond rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
              Hébergement solidaire
            </span>
            <h1
              className="font-epilogue font-extrabold text-anthracite leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Se poser,{" "}
              <span className="bg-vert-profond/12 text-vert-profond px-2 py-0.5 rounded-lg">
                repartir.
              </span>
            </h1>
            <p className="text-anthracite/75 text-lg font-manrope leading-relaxed mb-8 max-w-md">
              Des logements temporaires, dignes et sécurisés pour les publics fragiles,
              avec un accompagnement social vers un projet de vie stable.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 rounded-2xl px-5 py-3 font-manrope text-sm text-anthracite/80"
                style={{
                  background: "rgba(255,253,248,0.55)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 4px 20px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <Home size={15} className="text-vert-profond shrink-0" />
                <span className="font-semibold">Logement temporaire</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2.5 rounded-2xl px-5 py-3 font-manrope text-sm text-anthracite/80"
                style={{
                  background: "rgba(255,253,248,0.55)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 4px 20px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <ShieldCheck size={15} className="text-terracotta shrink-0" />
                <span className="font-semibold">Accompagnement social</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Photo droite */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[340px] md:max-h-[500px] shadow-2xl">
              <Image
                src="/logement-rebond.webp"
                alt="Logements rebond Habitat Solidaire à Masny"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
