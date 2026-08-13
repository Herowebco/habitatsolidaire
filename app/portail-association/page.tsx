"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Lightbulb, Building2, LogOut, CheckCircle2, Loader2, Send, CalendarCheck } from "lucide-react";

type Session = { nom: string; email: string };

const cardStyle = {
  background: "rgba(255,253,248,0.85)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 2px 16px rgba(47,69,55,0.06)",
};

const inputStyle =
  "w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite placeholder-anthracite/35 bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors";

const salles = [
  "Grande salle polyvalente (jusqu'à 50 personnes)",
  "Salle de réunion (jusqu'à 15 personnes)",
  "Espace atelier (jusqu'à 20 personnes)",
];

const creneaux = ["Matin (9h - 12h)", "Après-midi (14h - 17h)", "Soirée (18h - 21h)", "Journée entière"];

const budgets = ["Moins de 500 €", "500 € – 1 000 €", "1 000 € – 3 000 €", "3 000 € – 5 000 €", "Plus de 5 000 €"];

const secteurs = ["Social & solidarité", "Culture & loisirs", "Sport", "Environnement", "Éducation & insertion", "Santé", "Autre"];

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-manrope font-semibold transition-all ${
        active ? "bg-blanc-doux text-anthracite shadow-sm" : "text-anthracite/50 hover:text-anthracite"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function SuccessBlock({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-vert-sauge/15 flex items-center justify-center">
        <CheckCircle2 className="text-vert-sauge" size={24} />
      </div>
      <p className="font-epilogue font-bold text-anthracite text-xl">{title}</p>
      <p className="text-anthracite/70 font-manrope text-sm max-w-xs">{desc}</p>
    </div>
  );
}

export default function PortailAssociationPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<"reservation" | "projet" | "fiche">("reservation");

  useEffect(() => {
    const raw = sessionStorage.getItem("asso_session");
    if (!raw) {
      router.push("/connexion");
      return;
    }
    setSession(JSON.parse(raw));
  }, [router]);

  // Réservation
  const [resaSent, setResaSent] = useState(false);
  const [resaLoading, setResaLoading] = useState(false);
  const [resaForm, setResaForm] = useState({ salle: "", date_souhaitee: "", creneau: "", motif: "" });

  function handleResaSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResaLoading(true);
    setTimeout(() => {
      setResaLoading(false);
      setResaSent(true);
    }, 700);
  }

  // Projet
  const [projetSent, setProjetSent] = useState(false);
  const [projetLoading, setProjetLoading] = useState(false);
  const [projetForm, setProjetForm] = useState({ nom_projet: "", description: "", public_cible: "", budget_estime: "" });

  function handleProjetSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProjetLoading(true);
    setTimeout(() => {
      setProjetLoading(false);
      setProjetSent(true);
    }, 700);
  }

  // Fiche
  const [ficheSaved, setFicheSaved] = useState(false);
  const [ficheLoading, setFicheLoading] = useState(false);
  const [ficheForm, setFicheForm] = useState({ description: "", secteur: "", telephone: "", site_web: "" });

  function handleFicheSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFicheLoading(true);
    setTimeout(() => {
      setFicheLoading(false);
      setFicheSaved(true);
      setTimeout(() => setFicheSaved(false), 3000);
    }, 700);
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-creme">
      {/* Header */}
      <div className="border-b border-anthracite/8 bg-blanc-doux/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="font-epilogue font-bold text-anthracite text-lg">{session.nom || "Mon association"}</h1>
              <p className="text-anthracite/40 font-manrope text-xs">Espace association</p>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-anthracite/5 rounded-full p-1">
              <TabButton active={tab === "reservation"} onClick={() => setTab("reservation")} icon={<CalendarDays size={13} />} label="Réserver une salle" />
              <TabButton active={tab === "projet"} onClick={() => setTab("projet")} icon={<Lightbulb size={13} />} label="Soumettre un projet" />
              <TabButton active={tab === "fiche"} onClick={() => setTab("fiche")} icon={<Building2 size={13} />} label="Ma fiche" />
            </div>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("asso_session");
              router.push("/connexion");
            }}
            className="w-9 h-9 rounded-full bg-anthracite/5 hover:bg-anthracite/10 flex items-center justify-center transition-colors"
          >
            <LogOut size={14} className="text-anthracite/60" />
          </button>
        </div>
        {/* Onglets mobile */}
        <div className="sm:hidden flex border-t border-anthracite/8">
          <button onClick={() => setTab("reservation")} className={`flex-1 py-2.5 text-xs font-manrope font-semibold transition-colors ${tab === "reservation" ? "text-vert-sauge border-b-2 border-vert-sauge" : "text-anthracite/40"}`}>
            Salle
          </button>
          <button onClick={() => setTab("projet")} className={`flex-1 py-2.5 text-xs font-manrope font-semibold transition-colors ${tab === "projet" ? "text-vert-sauge border-b-2 border-vert-sauge" : "text-anthracite/40"}`}>
            Projet
          </button>
          <button onClick={() => setTab("fiche")} className={`flex-1 py-2.5 text-xs font-manrope font-semibold transition-colors ${tab === "fiche" ? "text-vert-sauge border-b-2 border-vert-sauge" : "text-anthracite/40"}`}>
            Ma fiche
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* ── RÉSERVATION ── */}
        {tab === "reservation" && (
          <div className="rounded-3xl p-6 md:p-8" style={cardStyle}>
            <h2 className="font-epilogue font-bold text-anthracite text-xl mb-1">Réserver une salle</h2>
            <p className="text-anthracite/50 font-manrope text-sm mb-6">Choisissez une salle, une date et un créneau.</p>

            {resaSent ? (
              <SuccessBlock title="Demande envoyée !" desc="Notre équipe vérifie la disponibilité et vous répond sous 48h." />
            ) : (
              <form onSubmit={handleResaSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Salle souhaitée</label>
                  <select required value={resaForm.salle} onChange={(e) => setResaForm((f) => ({ ...f, salle: e.target.value }))} className={inputStyle}>
                    <option value="">Choisir une salle</option>
                    {salles.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Date</label>
                    <input type="date" required value={resaForm.date_souhaitee} onChange={(e) => setResaForm((f) => ({ ...f, date_souhaitee: e.target.value }))} className={inputStyle} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Créneau</label>
                    <select required value={resaForm.creneau} onChange={(e) => setResaForm((f) => ({ ...f, creneau: e.target.value }))} className={inputStyle}>
                      <option value="">Choisir un créneau</option>
                      {creneaux.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Motif</label>
                  <textarea rows={3} value={resaForm.motif} onChange={(e) => setResaForm((f) => ({ ...f, motif: e.target.value }))} placeholder="Décrivez l'usage prévu..." className={`${inputStyle} resize-none`} />
                </div>
                <button type="submit" disabled={resaLoading} className="inline-flex items-center justify-center gap-2 bg-anthracite hover:bg-anthracite/85 disabled:opacity-60 text-blanc-doux font-semibold px-7 py-4 rounded-full text-sm transition-all font-manrope mt-1">
                  {resaLoading ? <Loader2 size={16} className="animate-spin" /> : <CalendarCheck size={16} />}
                  {resaLoading ? "Envoi en cours..." : "Envoyer la demande"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── PROJET ── */}
        {tab === "projet" && (
          <div className="rounded-3xl p-6 md:p-8" style={cardStyle}>
            <h2 className="font-epilogue font-bold text-anthracite text-xl mb-1">Soumettre un projet</h2>
            <p className="text-anthracite/50 font-manrope text-sm mb-6">Présentez votre initiative, notre équipe l'étudiera.</p>

            {projetSent ? (
              <SuccessBlock title="Projet soumis !" desc="Vous recevrez une réponse par email dès que votre projet aura été étudié." />
            ) : (
              <form onSubmit={handleProjetSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Nom du projet</label>
                  <input type="text" required value={projetForm.nom_projet} onChange={(e) => setProjetForm((f) => ({ ...f, nom_projet: e.target.value }))} placeholder="Donnez un titre à votre projet" className={inputStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Description</label>
                  <textarea rows={4} required value={projetForm.description} onChange={(e) => setProjetForm((f) => ({ ...f, description: e.target.value }))} placeholder="Objectifs, actions prévues, impact attendu..." className={`${inputStyle} resize-none`} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Public cible</label>
                  <input type="text" required value={projetForm.public_cible} onChange={(e) => setProjetForm((f) => ({ ...f, public_cible: e.target.value }))} placeholder="Ex : familles en difficulté, jeunes 16-25 ans..." className={inputStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Budget estimé</label>
                  <select value={projetForm.budget_estime} onChange={(e) => setProjetForm((f) => ({ ...f, budget_estime: e.target.value }))} className={inputStyle}>
                    <option value="">Non défini</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={projetLoading} className="inline-flex items-center justify-center gap-2 bg-vert-profond hover:bg-vert-profond/90 disabled:opacity-60 text-blanc-doux font-semibold px-7 py-4 rounded-full text-sm transition-all font-manrope mt-1">
                  {projetLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {projetLoading ? "Envoi en cours..." : "Soumettre le projet"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── FICHE ── */}
        {tab === "fiche" && (
          <div className="rounded-3xl p-6 md:p-8" style={cardStyle}>
            <h2 className="font-epilogue font-bold text-anthracite text-xl mb-1">Description de mon association</h2>
            <p className="text-anthracite/50 font-manrope text-sm mb-6">Ces informations restent visibles par l'équipe Habitat Solidaire.</p>

            <form onSubmit={handleFicheSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Nom de l'association</label>
                <input type="text" value={session.nom} disabled className={`${inputStyle} opacity-60 cursor-not-allowed`} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Secteur d'activité</label>
                <select value={ficheForm.secteur} onChange={(e) => setFicheForm((f) => ({ ...f, secteur: e.target.value }))} className={inputStyle}>
                  <option value="">Choisir un secteur</option>
                  {secteurs.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Description</label>
                <textarea rows={4} value={ficheForm.description} onChange={(e) => setFicheForm((f) => ({ ...f, description: e.target.value }))} placeholder="Présentez votre association, ses missions, ses actions..." className={`${inputStyle} resize-none`} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Téléphone</label>
                  <input type="tel" value={ficheForm.telephone} onChange={(e) => setFicheForm((f) => ({ ...f, telephone: e.target.value }))} placeholder="06 XX XX XX XX" className={inputStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Site web</label>
                  <input type="url" value={ficheForm.site_web} onChange={(e) => setFicheForm((f) => ({ ...f, site_web: e.target.value }))} placeholder="https://..." className={inputStyle} />
                </div>
              </div>
              <button type="submit" disabled={ficheLoading} className="inline-flex items-center justify-center gap-2 bg-vert-sauge hover:bg-vert-sauge/90 disabled:opacity-60 text-blanc-doux font-semibold px-7 py-4 rounded-full text-sm transition-all font-manrope mt-1">
                {ficheLoading ? <Loader2 size={16} className="animate-spin" /> : ficheSaved ? <CheckCircle2 size={16} /> : null}
                {ficheLoading ? "Enregistrement..." : ficheSaved ? "Enregistré !" : "Enregistrer ma fiche"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
