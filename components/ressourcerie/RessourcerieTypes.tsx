"use client";

import { motion } from "framer-motion";
import { Building2, ShoppingBag, RotateCcw, Handshake } from "lucide-react";

const types = [
  {
    icon: Building2,
    label: "Entreprises",
    title: "Surplus & stocks invendus",
    desc: "Fins de séries, retours, stocks déclassés : tout matériel en bon état peut trouver une seconde vie utile.",
  },
  {
    icon: ShoppingBag,
    label: "Particuliers",
    title: "Déménagement & donation",
    desc: "Meubles, électroménager, vêtements, jouets : plutôt que jeter, donnez à ceux qui en ont besoin.",
  },
  {
    icon: RotateCcw,
    label: "Distributeurs",
    title: "Invendus & retours",
    desc: "Produits non commercialisables mais en parfait état : hygiène, alimentation, habillement, matériel de bureau.",
  },
  {
    icon: Handshake,
    label: "Partenaires",
    title: "Dons réguliers",
    desc: "Vous souhaitez établir un partenariat durable ? Nous organisons des collectes régulières adaptées à vos volumes.",
  },
];

export function RessourcerieTypes() {
  return (
    <section className="py-20 px-6 bg-blanc-doux">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Ce qu'on accepte
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            Qui peut faire un{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">don ?</span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Tout le monde peut contribuer. Particuliers, entreprises, commerçants ou partenaires associatifs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {types.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: "rgba(255,253,248,0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 8px 32px rgba(47,69,55,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-terracotta flex items-center justify-center shadow-sm">
                  <Icon className="text-blanc-doux" size={19} strokeWidth={1.8} />
                </div>
                <div>
                  <span className="inline-block bg-terracotta/10 text-terracotta/70 rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase font-manrope mb-1.5">
                    {t.label}
                  </span>
                  <h3 className="font-epilogue font-bold text-anthracite text-base mb-1.5">
                    {t.title}
                  </h3>
                  <p className="text-anthracite/75 text-sm font-manrope leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
