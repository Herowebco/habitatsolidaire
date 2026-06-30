"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export function AteliersHero() {
  return (
    <section className="relative pt-28 pb-16 px-6 overflow-hidden">
      {/* Background SVG */}
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
            <span className="inline-block bg-vert-sauge/12 text-vert-sauge rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
              Ateliers & événements
            </span>
            <h1
              className="font-epilogue font-extrabold text-anthracite leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Apprendre, créer{" "}
              <span className="bg-vert-sauge/15 text-vert-sauge px-2 py-0.5 rounded-lg">
                ensemble.
              </span>
            </h1>
            <p className="text-anthracite/75 text-lg font-manrope leading-relaxed mb-8 max-w-md">
              Des ateliers pratiques, des formations et des événements ouverts à tous
              pour renforcer les liens et développer de nouvelles compétences.
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
                <MapPin size={15} className="text-vert-sauge shrink-0" />
                <span className="font-semibold">49C rue de la Fabrique, 59176 Masny</span>
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
                <Calendar size={15} className="text-terracotta shrink-0" />
                <span className="font-semibold">Ouvert à tous, accès libre</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Photo droite */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80"
              alt="Atelier collectif Habitat Solidaire"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-anthracite/40 via-transparent to-transparent" />

            {/* Floating card */}
            <div
              className="absolute bottom-5 left-5 right-5 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(255,253,248,0.80)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.70)",
              }}
            >
              <p className="font-epilogue font-bold text-anthracite text-sm">Ateliers réguliers</p>
              <p className="text-anthracite/60 text-xs font-manrope mt-0.5">Couture, numérique, jardinage et bien plus</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
