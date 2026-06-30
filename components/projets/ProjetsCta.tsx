"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export function ProjetsCta() {
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
            Soumettre un projet
          </span>
          <h2 className="font-epilogue font-extrabold text-blanc-doux text-3xl md:text-4xl leading-tight mb-5">
            Vous avez un projet{" "}
            <span className="text-vert-sauge">à faire vivre ?</span>
          </h2>
          <p className="text-blanc-doux/60 font-manrope text-base leading-relaxed max-w-xl mx-auto mb-10">
            Présentez-nous votre initiative. Notre équipe l'étudiera avec attention
            et vous recontactera rapidement pour envisager un accompagnement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-vert-sauge hover:bg-vert-sauge/90 text-blanc-doux font-semibold px-7 py-4 rounded-full text-sm transition-all font-manrope"
              style={{ boxShadow: "0 4px 20px rgba(104,124,104,0.30)" }}
            >
              Déposer une demande
              <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:habitatsolidairenord@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-blanc-doux/08 hover:bg-blanc-doux/12 text-blanc-doux font-semibold px-7 py-4 rounded-full text-sm transition-all font-manrope border border-blanc-doux/15"
            >
              <Mail size={16} />
              habitatsolidairenord@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
