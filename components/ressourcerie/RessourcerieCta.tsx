"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, Phone } from "lucide-react";

export function RessourcerieCta() {
  return (
    <section className="py-20 px-6 bg-blanc-doux">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-10 md:p-14 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(47,69,55,0.92) 0%, rgba(38,48,42,0.96) 100%)",
            boxShadow: "0 20px 60px rgba(47,69,55,0.25)",
          }}
        >
          <span className="inline-block bg-blanc-doux/10 text-blanc-doux/80 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
            Proposer un don
          </span>
          <h2 className="font-epilogue font-extrabold text-blanc-doux text-3xl md:text-4xl leading-tight mb-4">
            Vous avez un lot à donner ?
          </h2>
          <p className="text-blanc-doux/70 text-lg font-manrope leading-relaxed mb-8 max-w-md mx-auto">
            Contactez-nous directement. Nous organisons la réception et vous tenons informé de l'impact de votre don.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-all font-manrope bg-terracotta hover:bg-terracotta/90 text-blanc-doux"
              style={{ boxShadow: "0 4px 20px rgba(217,130,91,0.35)" }}
            >
              <Package size={16} />
              Proposer un don
            </Link>
            <a
              href="tel:+33374472733"
              className="inline-flex items-center justify-center gap-2 bg-blanc-doux/10 hover:bg-blanc-doux/20 border border-blanc-doux/20 text-blanc-doux font-semibold px-8 py-4 rounded-full text-base transition-all font-manrope"
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
