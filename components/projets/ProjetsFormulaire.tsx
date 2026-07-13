"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const inputStyle =
  "w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite placeholder-anthracite/35 bg-blanc-doux/60 border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 focus:bg-blanc-doux transition-all";

const glassCard = {
  background: "rgba(255,253,248,0.75)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
};

const budgets = [
  "Moins de 500 €",
  "500 € – 1 000 €",
  "1 000 € – 3 000 €",
  "3 000 € – 5 000 €",
  "Plus de 5 000 €",
];

const delais = [
  "Moins d'1 mois",
  "1 à 3 mois",
  "3 à 6 mois",
  "6 mois à 1 an",
  "Plus d'1 an",
];

export function ProjetsFormulaire() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    association_name: "",
    email: "",
    nom_projet: "",
    description: "",
    public_cible: "",
    budget_estime: "",
    delai_souhaite: "",
    partenaires: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Contactez-nous directement par email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="soumettre" className="relative bg-creme py-20 px-6 overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #687C6828 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #D9825B18 0%, transparent 70%)", filter: "blur(70px)" }} />

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-vert-profond/12 text-vert-profond rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
            Soumettre un projet
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite text-3xl md:text-4xl leading-tight mb-4">
            Vous avez un projet{" "}
            <span className="bg-vert-profond/12 text-vert-profond px-2 py-0.5 rounded-lg">à faire vivre ?</span>
          </h2>
          <p className="text-anthracite/70 font-manrope max-w-xl mx-auto text-sm leading-relaxed">
            Réservé aux associations partenaires. Présentez-nous votre initiative — notre équipe l'étudiera et vous recontactera rapidement.
          </p>
        </div>

        <div className="rounded-3xl p-6 md:p-10" style={glassCard}>
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-vert-sauge/15 flex items-center justify-center">
                <CheckCircle2 className="text-vert-sauge" size={24} />
              </div>
              <p className="font-epilogue font-bold text-anthracite text-xl">Projet soumis !</p>
              <p className="text-anthracite/70 font-manrope text-sm max-w-xs">
                Merci ! Vous recevrez un email de confirmation et notre équipe reviendra vers vous rapidement.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Infos association */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Association *</label>
                  <input type="text" name="association_name" required value={form.association_name} onChange={handleChange}
                    placeholder="Nom de votre association" className={inputStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Email de contact *</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange}
                    placeholder="votre@email.fr" className={inputStyle} />
                </div>
              </div>

              {/* Nom du projet */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Nom du projet *</label>
                <input type="text" name="nom_projet" required value={form.nom_projet} onChange={handleChange}
                  placeholder="Donnez un titre à votre projet" className={inputStyle} />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Description du projet *</label>
                <textarea name="description" required rows={4} value={form.description} onChange={handleChange}
                  placeholder="Décrivez votre projet : objectifs, actions prévues, impact attendu..."
                  className={`${inputStyle} resize-none`} />
              </div>

              {/* Public cible */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Public cible *</label>
                <input type="text" name="public_cible" required value={form.public_cible} onChange={handleChange}
                  placeholder="Ex : familles en difficulté, jeunes de 16-25 ans, personnes isolées..." className={inputStyle} />
              </div>

              {/* Budget + Délai */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Budget estimé</label>
                  <select name="budget_estime" value={form.budget_estime} onChange={handleChange} className={inputStyle}>
                    <option value="">Non défini</option>
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Délai souhaité</label>
                  <select name="delai_souhaite" value={form.delai_souhaite} onChange={handleChange} className={inputStyle}>
                    <option value="">Non défini</option>
                    {delais.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Partenaires */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Partenaires déjà impliqués</label>
                <input type="text" name="partenaires" value={form.partenaires} onChange={handleChange}
                  placeholder="Autres associations, collectivités, entreprises... (optionnel)" className={inputStyle} />
              </div>

              {error && <p className="text-sm text-red-500 font-manrope">{error}</p>}

              <button type="submit" disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-vert-profond hover:bg-vert-profond/90 disabled:opacity-60 text-blanc-doux font-semibold px-8 py-4 rounded-full transition-all shadow-lg shadow-vert-profond/20 text-base font-manrope">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {loading ? "Envoi en cours..." : "Soumettre le projet"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
