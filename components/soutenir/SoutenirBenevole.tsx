"use client";

import { useState } from "react";
import { Users, Send, Package, UtensilsCrossed, CalendarDays, Lightbulb } from "lucide-react";

const missions = [
  { icon: Package,         label: "Tri & logistique",       desc: "Réceptionner, trier et préparer les dons à la ressourcerie" },
  { icon: UtensilsCrossed, label: "Ateliers & animation",   desc: "Animer des ateliers cuisine, lien social ou savoir-faire" },
  { icon: CalendarDays,    label: "Événements",             desc: "Aider à l'organisation de distributions et d'événements" },
  { icon: Lightbulb,       label: "Compétences spécifiques",desc: "Communication, informatique, juridique ou autre expertise" },
];

const inputStyle =
  "w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite placeholder-anthracite/35 bg-blanc-doux/60 border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 focus:bg-blanc-doux transition-all";

const glassCard = {
  background: "rgba(255,253,248,0.70)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
};

export function SoutenirBenevole() {
  const [sent, setSent] = useState(false);

  return (
    <section id="benevole" className="relative bg-creme py-20 px-6 overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #687C6828 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
            Bénévolat
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite text-3xl md:text-4xl leading-tight mb-4">
            Donnez de votre{" "}
            <span className="bg-vert-profond/12 text-vert-profond px-2 py-0.5 rounded-lg">temps.</span>
          </h2>
          <p className="text-anthracite/75 font-manrope max-w-xl mx-auto">
            Quel que soit votre disponibilité ou vos compétences, il y a une place pour vous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* Missions */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {missions.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="rounded-2xl p-4 flex items-start gap-3" style={glassCard}>
                  <div className="w-9 h-9 rounded-xl bg-vert-profond flex items-center justify-center shrink-0">
                    <Icon className="text-blanc-doux" size={16} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-epilogue font-bold text-anthracite text-sm">{m.label}</p>
                    <p className="text-anthracite/75 text-xs font-manrope leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3 rounded-3xl p-6 md:p-8" style={glassCard}>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-vert-sauge/15 flex items-center justify-center">
                  <Users className="text-vert-sauge" size={22} />
                </div>
                <p className="font-epilogue font-bold text-anthracite text-xl">Merci pour votre intérêt !</p>
                <p className="text-anthracite/75 font-manrope text-sm max-w-xs">
                  Nous vous contacterons rapidement pour vous accueillir au sein de l'équipe.
                </p>
              </div>
            ) : (
              <>
                <p className="font-epilogue font-bold text-anthracite text-xl mb-5">Je souhaite m'impliquer</p>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
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
                    <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Disponibilités</label>
                    <select className={inputStyle}>
                      <option value="">Quand êtes-vous disponible ?</option>
                      <option>Semaine (journée)</option>
                      <option>Semaine (soir)</option>
                      <option>Week-end</option>
                      <option>Ponctuellement</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Message (optionnel)</label>
                    <textarea rows={3} placeholder="Vos compétences, motivations..." className={`${inputStyle} resize-none`} />
                  </div>

                  <button type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-vert-profond hover:bg-vert-profond/90 text-blanc-doux font-semibold px-8 py-4 rounded-full transition-all shadow-lg shadow-vert-profond/20 text-base font-manrope">
                    Envoyer ma candidature
                    <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
