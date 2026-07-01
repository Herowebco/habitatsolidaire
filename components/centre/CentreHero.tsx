"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

export function CentreHero() {
  return (
    <section className="relative min-h-[560px] overflow-hidden flex items-center">

      {/* Background SVG — identique au reste du site */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-section.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center 80%",
        }}
      >
        <div className="absolute inset-0 bg-blanc-doux/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blanc-doux to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-28 pb-16">

        {/* Texte gauche */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col order-1"
        >
          <span className="inline-block self-start bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
            Pôle associatif
          </span>
          <h1
            className="font-epilogue font-extrabold text-anthracite leading-tight mb-5 whitespace-nowrap"
            style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}
          >
            Le Centre{" "}
            <span className="bg-vert-profond/12 text-vert-profond px-2 py-0.5 rounded-lg">
              associatif.
            </span>
          </h1>
          <p className="text-anthracite/75 text-lg font-manrope leading-relaxed mb-6 max-w-md">
            600 m² dédiés aux associations partenaires, aux ateliers, aux formations
            et aux temps de coopération. Un lieu vivant, mutualisé et accessible.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="#reserver"
              className="inline-flex items-center justify-center gap-2 bg-anthracite hover:bg-anthracite/85 text-blanc-doux font-semibold px-7 py-3.5 rounded-full text-sm transition-all font-manrope"
            >
              Réserver une salle
            </a>
            <a
              href="#les-espaces"
              className="inline-flex items-center justify-center gap-2 border border-anthracite/20 hover:border-anthracite/40 text-anthracite font-semibold px-7 py-3.5 rounded-full text-sm transition-all font-manrope"
            >
              Voir les espaces
            </a>
          </div>

          <div
            className="inline-flex self-start items-center gap-2.5 rounded-2xl px-5 py-3 font-manrope text-sm text-anthracite/80"
            style={{
              background: "rgba(255,253,248,0.55)",
              backdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "0 4px 20px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <MapPin size={15} className="text-vert-sauge shrink-0" />
            <span className="font-semibold">49C rue de la Fabrique, 59176 Masny</span>
          </div>
        </motion.div>

        {/* Photo droite */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative order-2"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[340px] md:max-h-[500px] shadow-2xl shadow-vert-profond/20">
            <Image
              src="/habitat-solidaire-partenaires.jpg"
              alt="Habitat Solidaire avec Delbo Pro et le Lycée Charlotte Delbo"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-vert-profond/10" />
          </div>

          {/* Carte flottante */}
          <div
            className="absolute -bottom-5 -left-5 px-5 py-4 rounded-2xl"
            style={{
              background: "rgba(255,253,248,0.70)",
              backdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "0 8px 32px rgba(47,69,55,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <p className="text-xs font-semibold text-vert-sauge uppercase tracking-widest font-manrope mb-0.5">
              Partenaires
            </p>
            <p className="text-sm font-bold text-anthracite font-epilogue">
              Delbo Pro · Lycée Charlotte Delbo
            </p>
          </div>

          {/* Blob décoratif */}
          <div
            aria-hidden="true"
            className="absolute -z-10 -top-8 -right-8 w-40 h-40 md:w-72 md:h-72 rounded-full"
            style={{ background: "radial-gradient(circle, #687C6840 0%, transparent 70%)", filter: "blur(40px)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
