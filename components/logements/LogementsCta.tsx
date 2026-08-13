"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export function LogementsCta() {
  return (
    <section className="py-20 px-6 bg-anthracite relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(104,124,104,0.15) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[400px] h-[250px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(217,130,91,0.12) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-vert-sauge/15 text-vert-sauge rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-5">
            Orienter une personne
          </span>
          <h2 className="font-epilogue font-extrabold text-blanc-doux text-3xl md:text-4xl leading-tight mb-5">
            Vous accompagnez une personne{" "}
            <span className="text-vert-sauge">sans solution de logement ?</span>
          </h2>
          <p className="text-blanc-doux/60 font-manrope text-base leading-relaxed max-w-xl mx-auto mb-10">
            Contactez notre équipe pour étudier ensemble la situation et voir si un accueil est possible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-vert-sauge hover:bg-vert-sauge/90 text-blanc-doux font-semibold px-7 py-4 rounded-full text-sm transition-all font-manrope"
              style={{ boxShadow: "0 4px 20px rgba(104,124,104,0.30)" }}
            >
              Nous contacter
              <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+33374472733"
              className="inline-flex items-center justify-center gap-2 bg-blanc-doux/08 hover:bg-blanc-doux/12 text-blanc-doux font-semibold px-7 py-4 rounded-full text-sm transition-all font-manrope border border-blanc-doux/15"
            >
              <Phone size={16} />
              03 74 47 27 33
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
