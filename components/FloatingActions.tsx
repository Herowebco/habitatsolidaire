"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Heart, CalendarCheck, X, Menu } from "lucide-react";

const glass = {
  background: "rgba(255,253,248,0.92)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 32px rgba(47,69,55,0.15), inset 0 1px 0 rgba(255,255,255,0.85)",
};

export function FloatingActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-3">

      {/* Panneau déplié */}
      {open && (
        <div className="flex flex-col gap-2 items-end">

          {/* Infos contact */}
          <div className="rounded-2xl p-4 w-[min(16rem,calc(100vw-3rem))]" style={glass}>
            <p className="font-epilogue font-bold text-anthracite text-sm mb-3">Nous contacter</p>
            <div className="flex flex-col gap-2.5">
              <a
                href="tel:+33374472733"
                className="flex items-center gap-3 text-anthracite/70 hover:text-anthracite transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-vert-sauge/12 flex items-center justify-center shrink-0 group-hover:bg-vert-sauge/20 transition-colors">
                  <Phone size={14} className="text-vert-sauge" />
                </div>
                <span className="font-manrope text-sm">03 74 47 27 33</span>
              </a>
              <a
                href="mailto:habitatsolidairenord@gmail.com"
                className="flex items-center gap-3 text-anthracite/70 hover:text-anthracite transition-colors group"
              >
                <div className="w-8 h-8 rounded-xl bg-vert-sauge/12 flex items-center justify-center shrink-0 group-hover:bg-vert-sauge/20 transition-colors">
                  <Mail size={14} className="text-vert-sauge" />
                </div>
                <span className="font-manrope text-sm">Envoyer un email</span>
              </a>
              <div className="flex items-center gap-3 text-anthracite/50">
                <div className="w-8 h-8 rounded-xl bg-vert-sauge/12 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-vert-sauge" />
                </div>
                <div>
                  <p className="font-manrope text-xs font-semibold text-anthracite/60">Centre associatif</p>
                  <span className="font-manrope text-xs leading-snug">49C rue de la Fabrique, 59176 Masny</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-anthracite/50">
                <div className="w-8 h-8 rounded-xl bg-terracotta/12 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-terracotta" />
                </div>
                <div>
                  <p className="font-manrope text-xs font-semibold text-anthracite/60">Ressourcerie</p>
                  <span className="font-manrope text-xs leading-snug">105 Avenue du 8 Mai 1945, 59176 Masny</span>
                </div>
              </div>
            </div>
          </div>

          {/* Faire un don */}
          <Link
            href="/nous-soutenir#don"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl px-5 py-3.5 font-manrope font-semibold text-sm text-blanc-doux transition-all hover:opacity-90 w-[min(16rem,calc(100vw-3rem))]"
            style={{
              background: "#D9825B",
              boxShadow: "0 4px 20px rgba(217,130,91,0.35)",
            }}
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Heart size={14} className="text-blanc-doux" />
            </div>
            Faire un don
          </Link>

          {/* Réserver une salle */}
          <Link
            href="/centre-associatif#reserver"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl px-5 py-3.5 font-manrope font-semibold text-sm text-blanc-doux transition-all hover:opacity-90 w-[min(16rem,calc(100vw-3rem))]"
            style={{
              background: "#2F4537",
              boxShadow: "0 4px 20px rgba(47,69,55,0.30)",
            }}
          >
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <CalendarCheck size={14} className="text-blanc-doux" />
            </div>
            Réserver une salle
          </Link>
        </div>
      )}

      {/* Bouton principal */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        style={{
          background: open ? "#26302A" : "#D9825B",
          boxShadow: open ? "0 4px 24px rgba(47,69,55,0.35)" : "0 4px 24px rgba(217,130,91,0.40)",
        }}
        aria-label={open ? "Fermer" : "Actions rapides"}
      >
        {open
          ? <X size={20} className="text-blanc-doux" />
          : <Menu size={20} className="text-blanc-doux" />
        }
      </button>
    </div>
  );
}
