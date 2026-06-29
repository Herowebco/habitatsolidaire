"use client";

import { motion } from "framer-motion";
import { MapPin, Package } from "lucide-react";

export function RessourcerieHero() {
  return (
    <section className="relative min-h-[480px] flex items-center pt-28 pb-20 px-6 overflow-hidden">
      {/* Background SVG */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-section.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      >
        <div className="absolute inset-0 bg-blanc-doux/60" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blanc-doux to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
            Dons &amp; redistribution
          </span>
          <h1
            className="font-epilogue font-extrabold text-anthracite leading-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
          >
            La Ressourcerie{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">
              solidaire.
            </span>
          </h1>
          <p className="text-anthracite/75 text-lg font-manrope leading-relaxed mb-8 max-w-xl">
            Un espace dédié à la réception, au tri et à la redistribution gratuite
            des dons aux associations partenaires du territoire.
          </p>

          {/* Address badge */}
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
            <MapPin size={15} className="text-terracotta shrink-0" />
            <span className="font-semibold">105 Avenue du 8 Mai 1945, 59176 Masny</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
