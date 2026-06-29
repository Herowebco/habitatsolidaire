"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const glassCard = {
  background: "rgba(255,253,248,0.70)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
};

const inputStyle =
  "w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite placeholder-anthracite/35 bg-blanc-doux/60 border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 focus:bg-blanc-doux transition-all";

const subjects = [
  "Réservation de salle",
  "Don ou redistribution",
  "Partenariat associatif",
  "Logement rebond",
  "Atelier ou événement",
  "Autre demande",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="relative bg-blanc-doux py-16 px-6 overflow-hidden">
      {/* Blobs */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #687C6828 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #D9825B18 0%, transparent 70%)", filter: "blur(70px)" }} />

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">

        {/* ── Formulaire ── */}
        <div className="lg:col-span-3 rounded-3xl p-6 md:p-8" style={glassCard}>
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-5">
            Formulaire de contact
          </span>
          <h2 className="font-epilogue font-bold text-anthracite text-2xl md:text-3xl mb-6">
            Écrivez-nous
          </h2>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-vert-sauge/15 flex items-center justify-center">
                <Send className="text-vert-sauge" size={22} />
              </div>
              <p className="font-epilogue font-bold text-anthracite text-xl">Message envoyé !</p>
              <p className="text-anthracite/75 font-manrope text-sm max-w-xs">
                Merci pour votre message. Nous vous répondrons dans les meilleurs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Nom</label>
                  <input type="text" required placeholder="Votre nom" className={inputStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Email</label>
                  <input type="email" required placeholder="votre@email.fr" className={inputStyle} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Sujet</label>
                <select required className={inputStyle}>
                  <option value="">Choisir un sujet</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Décrivez votre demande..."
                  className={`${inputStyle} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-vert-profond hover:bg-vert-profond/90 text-blanc-doux font-semibold px-8 py-4 rounded-full transition-all shadow-lg shadow-vert-profond/20 text-base font-manrope"
              >
                Envoyer le message
                <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* ── Infos de contact ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Email */}
          <div className="rounded-2xl p-5 flex items-start gap-4" style={glassCard}>
            <div className="w-11 h-11 rounded-xl bg-terracotta flex items-center justify-center shrink-0 shadow-sm">
              <Mail className="text-blanc-doux" size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Email</p>
              <a href="mailto:habitatsolidairenord@gmail.com"
                className="text-sm font-medium text-anthracite hover:text-terracotta transition-colors font-manrope break-all">
                habitatsolidairenord@gmail.com
              </a>
            </div>
          </div>

          {/* Téléphone */}
          <div className="rounded-2xl p-5 flex items-start gap-4" style={glassCard}>
            <div className="w-11 h-11 rounded-xl bg-terracotta flex items-center justify-center shrink-0 shadow-sm">
              <Phone className="text-blanc-doux" size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Téléphone</p>
              <a href="tel:+33374472733"
                className="text-sm font-medium text-anthracite hover:text-terracotta transition-colors font-manrope">
                03 74 47 27 33
              </a>
            </div>
          </div>

          {/* Centre associatif */}
          <div className="rounded-2xl p-5 flex items-start gap-4" style={glassCard}>
            <div className="w-11 h-11 rounded-xl bg-vert-profond flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="text-blanc-doux" size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Centre associatif</p>
              <p className="text-sm font-medium text-anthracite font-manrope">49C rue de la Fabrique</p>
              <p className="text-sm text-anthracite/60 font-manrope">59176 Masny</p>
            </div>
          </div>

          {/* Ressourcerie */}
          <div className="rounded-2xl p-5 flex items-start gap-4" style={glassCard}>
            <div className="w-11 h-11 rounded-xl bg-vert-sauge flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="text-blanc-doux" size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">La ressourcerie</p>
              <p className="text-sm font-medium text-anthracite font-manrope">105 Avenue du 8 Mai 1945</p>
              <p className="text-sm text-anthracite/60 font-manrope">59176 Masny</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
