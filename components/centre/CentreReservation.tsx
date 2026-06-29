"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";

const salles = [
  "Grande salle polyvalente (jusqu'à 50 personnes)",
  "Salle de réunion (jusqu'à 15 personnes)",
  "Espace atelier (jusqu'à 20 personnes)",
];

const creneaux = [
  "Matin (9h - 12h)",
  "Après-midi (14h - 17h)",
  "Soirée (18h - 21h)",
  "Journée entière",
];

export function CentreReservation() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    association_name: "",
    email: "",
    salle: "",
    date_souhaitee: "",
    creneau: "",
    motif: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="reserver" className="py-20 px-6 bg-blanc-doux">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Réservation
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-4xl leading-tight">
            Réservez{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">un espace.</span>
          </h2>
          <p className="text-anthracite/75 text-base font-manrope mt-4 max-w-xl mx-auto">
            Remplissez le formulaire ci-dessous. Notre équipe confirme la disponibilité et revient vers vous rapidement.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 rounded-3xl p-8"
            style={{
              background: "rgba(255,253,248,0.70)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "0 8px 40px rgba(47,69,55,0.08)",
            }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle2 size={40} className="text-vert-sauge" />
                <h3 className="font-epilogue font-bold text-anthracite text-xl">Demande envoyée !</h3>
                <p className="text-anthracite/70 font-manrope text-sm max-w-xs">
                  Un email de confirmation vient de vous être envoyé. Nous vérifions la disponibilité et vous répondrons sous 48h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-manrope">Association / Nom</label>
                    <input
                      type="text"
                      name="association_name"
                      required
                      value={form.association_name}
                      onChange={handleChange}
                      placeholder="Votre association ou nom"
                      className="rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-manrope">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="votre@email.fr"
                      className="rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-manrope">Salle souhaitée</label>
                  <select
                    name="salle"
                    required
                    value={form.salle}
                    onChange={handleChange}
                    className="rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors"
                  >
                    <option value="">Choisir une salle</option>
                    {salles.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-manrope">Date souhaitée</label>
                    <input
                      type="date"
                      name="date_souhaitee"
                      required
                      value={form.date_souhaitee}
                      onChange={handleChange}
                      className="rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-manrope">Créneau</label>
                    <select
                      name="creneau"
                      required
                      value={form.creneau}
                      onChange={handleChange}
                      className="rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors"
                    >
                      <option value="">Choisir un créneau</option>
                      {creneaux.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/70 uppercase tracking-wider font-manrope">Motif de la réservation</label>
                  <textarea
                    name="motif"
                    rows={3}
                    value={form.motif}
                    onChange={handleChange}
                    placeholder="Décrivez l'usage prévu : réunion, atelier, formation..."
                    className="rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-manrope">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-anthracite hover:bg-anthracite/85 disabled:opacity-60 text-blanc-doux font-semibold px-7 py-4 rounded-full text-sm transition-all font-manrope mt-1"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <CalendarCheck size={16} />}
                  {loading ? "Envoi en cours..." : "Envoyer la demande"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Étapes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {[
              { num: "1", label: "Demande", desc: "Choisissez une salle, une date et un créneau." },
              { num: "2", label: "Confirmation immédiate", desc: "Un email vous est envoyé automatiquement pour confirmer la réception." },
              { num: "3", label: "Validation sous 48h", desc: "L'équipe examine la demande et vous confirme la disponibilité." },
              { num: "4", label: "Votre événement", desc: "Accueil sur place le jour J. L'espace est prêt pour vous." },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl p-5 flex items-start gap-4"
                style={{
                  background: "rgba(255,253,248,0.55)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.60)",
                  boxShadow: "0 4px 20px rgba(47,69,55,0.05)",
                }}
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-vert-sauge/15 text-vert-sauge text-xs font-bold font-epilogue flex items-center justify-center">
                  {step.num}
                </span>
                <div>
                  <p className="font-epilogue font-bold text-anthracite text-sm mb-0.5">{step.label}</p>
                  <p className="text-anthracite/65 text-xs font-manrope leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
