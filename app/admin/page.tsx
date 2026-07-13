"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, Clock, LogOut, RefreshCw, ChevronDown, ChevronUp, CalendarDays, Lightbulb } from "lucide-react";

type Reservation = {
  id: string;
  association_name: string;
  email: string;
  salle: string;
  date_souhaitee: string;
  date_fin: string;
  creneau: string;
  motif: string | null;
  statut: string;
  note_admin: string | null;
  created_at: string;
};

type Projet = {
  id: string;
  association_name: string;
  email: string;
  nom_projet: string;
  description: string;
  public_cible: string;
  budget_estime: string | null;
  delai_souhaite: string | null;
  partenaires: string | null;
  statut: string;
  note_admin: string | null;
  created_at: string;
};

const STATUS_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  en_attente: { label: "En attente", color: "text-amber-600 bg-amber-50 border-amber-200", icon: <Clock size={12} /> },
  accepte: { label: "Accepté", color: "text-green-700 bg-green-50 border-green-200", icon: <CheckCircle2 size={12} /> },
  refuse: { label: "Refusé", color: "text-red-600 bg-red-50 border-red-200", icon: <XCircle size={12} /> },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}
function fmtDateTime(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const cardStyle = {
  background: "rgba(255,253,248,0.85)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 2px 16px rgba(47,69,55,0.06)",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [tab, setTab] = useState<"reservations" | "projets">("reservations");

  // Réservations
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [resaLoading, setResaLoading] = useState(false);
  const [resaFilter, setResaFilter] = useState<"all" | "en_attente" | "accepte" | "refuse">("en_attente");
  const [resaExpanded, setResaExpanded] = useState<string | null>(null);
  const [resaNotes, setResaNotes] = useState<Record<string, string>>({});
  const [resaActionLoading, setResaActionLoading] = useState<string | null>(null);

  // Projets
  const [projets, setProjets] = useState<Projet[]>([]);
  const [projetLoading, setProjetLoading] = useState(false);
  const [projetFilter, setProjetFilter] = useState<"all" | "en_attente" | "accepte" | "refuse">("en_attente");
  const [projetExpanded, setProjetExpanded] = useState<string | null>(null);
  const [projetNotes, setProjetNotes] = useState<Record<string, string>>({});
  const [projetActionLoading, setProjetActionLoading] = useState<string | null>(null);

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const getPwd = () => password || sessionStorage.getItem("admin_pwd") || "";

  const fetchReservations = useCallback(async () => {
    setResaLoading(true);
    const res = await fetch("/api/admin/reservations", { headers: { "x-admin-secret": getPwd() } });
    if (res.ok) setReservations(await res.json());
    setResaLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const fetchProjets = useCallback(async () => {
    setProjetLoading(true);
    const res = await fetch("/api/admin/projets", { headers: { "x-admin-secret": getPwd() } });
    if (res.ok) setProjets(await res.json());
    setProjetLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  useEffect(() => {
    if (authed) { fetchReservations(); fetchProjets(); }
  }, [authed, fetchReservations, fetchProjets]);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pwd");
    if (saved) {
      setPassword(saved);
      fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: saved }),
      }).then(r => { if (r.ok) setAuthed(true); });
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { setAuthed(true); sessionStorage.setItem("admin_pwd", password); }
    else setAuthError("Mot de passe incorrect");
    setAuthLoading(false);
  }

  async function handleResaAction(id: string, action: "accepte" | "refuse") {
    setResaActionLoading(id + action);
    const res = await fetch("/api/reservations/action", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": getPwd() },
      body: JSON.stringify({ id, action, note: resaNotes[id] || "" }),
    });
    if (res.ok) {
      showToast(action === "accepte" ? "✓ Réservation acceptée — email envoyé" : "✗ Réservation refusée — email envoyé", action === "accepte" ? "success" : "error");
      fetchReservations();
      setResaExpanded(null);
    } else showToast("Erreur lors de l'action", "error");
    setResaActionLoading(null);
  }

  async function handleProjetAction(id: string, action: "accepte" | "refuse") {
    setProjetActionLoading(id + action);
    const res = await fetch("/api/projets/action", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": getPwd() },
      body: JSON.stringify({ id, action, note: projetNotes[id] || "" }),
    });
    if (res.ok) {
      showToast(action === "accepte" ? "✓ Projet accepté — email envoyé" : "✗ Projet refusé — email envoyé", action === "accepte" ? "success" : "error");
      fetchProjets();
      setProjetExpanded(null);
    } else showToast("Erreur lors de l'action", "error");
    setProjetActionLoading(null);
  }

  const resaFiltered = resaFilter === "all" ? reservations : reservations.filter(r => r.statut === resaFilter);
  const resaCounts = {
    all: reservations.length,
    en_attente: reservations.filter(r => r.statut === "en_attente").length,
    accepte: reservations.filter(r => r.statut === "accepte").length,
    refuse: reservations.filter(r => r.statut === "refuse").length,
  };

  const projetFiltered = projetFilter === "all" ? projets : projets.filter(p => p.statut === projetFilter);
  const projetCounts = {
    all: projets.length,
    en_attente: projets.filter(p => p.statut === "en_attente").length,
    accepte: projets.filter(p => p.statut === "accepte").length,
    refuse: projets.filter(p => p.statut === "refuse").length,
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-3xl p-8"
          style={{ background: "rgba(255,253,248,0.90)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 8px 40px rgba(47,69,55,0.10)" }}>
          <div className="w-12 h-12 rounded-2xl bg-vert-profond flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="font-epilogue font-bold text-anthracite text-2xl mb-1">Administration</h1>
          <p className="text-anthracite/50 font-manrope text-sm mb-6">Habitat Solidaire</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe"
              className="w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors" />
            {authError && <p className="text-red-500 text-sm font-manrope">{authError}</p>}
            <button type="submit" disabled={authLoading}
              className="bg-vert-profond hover:bg-vert-profond/90 disabled:opacity-60 text-blanc-doux font-semibold px-6 py-3 rounded-full text-sm font-manrope transition-all">
              {authLoading ? "Vérification..." : "Accéder"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-creme">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl text-sm font-manrope font-semibold shadow-lg ${toast.type === "success" ? "bg-vert-profond text-blanc-doux" : "bg-red-500 text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-anthracite/8 bg-blanc-doux/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="font-epilogue font-bold text-anthracite text-lg">Administration</h1>
              <p className="text-anthracite/40 font-manrope text-xs">Habitat Solidaire</p>
            </div>
            {/* Onglets */}
            <div className="hidden sm:flex items-center gap-1 bg-anthracite/5 rounded-full p-1">
              <button onClick={() => setTab("reservations")}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-manrope font-semibold transition-all ${tab === "reservations" ? "bg-blanc-doux text-anthracite shadow-sm" : "text-anthracite/50 hover:text-anthracite"}`}>
                <CalendarDays size={13} /> Réservations
                {resaCounts.en_attente > 0 && <span className="w-4 h-4 rounded-full bg-terracotta text-blanc-doux text-[10px] flex items-center justify-center">{resaCounts.en_attente}</span>}
              </button>
              <button onClick={() => setTab("projets")}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-manrope font-semibold transition-all ${tab === "projets" ? "bg-blanc-doux text-anthracite shadow-sm" : "text-anthracite/50 hover:text-anthracite"}`}>
                <Lightbulb size={13} /> Projets
                {projetCounts.en_attente > 0 && <span className="w-4 h-4 rounded-full bg-terracotta text-blanc-doux text-[10px] flex items-center justify-center">{projetCounts.en_attente}</span>}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { fetchReservations(); fetchProjets(); }} disabled={resaLoading || projetLoading}
              className="w-9 h-9 rounded-full bg-anthracite/5 hover:bg-anthracite/10 flex items-center justify-center transition-colors">
              <RefreshCw size={14} className={`text-anthracite/60 ${resaLoading || projetLoading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={() => { setAuthed(false); sessionStorage.removeItem("admin_pwd"); }}
              className="w-9 h-9 rounded-full bg-anthracite/5 hover:bg-anthracite/10 flex items-center justify-center transition-colors">
              <LogOut size={14} className="text-anthracite/60" />
            </button>
          </div>
        </div>
        {/* Onglets mobile */}
        <div className="sm:hidden flex border-t border-anthracite/8">
          <button onClick={() => setTab("reservations")} className={`flex-1 py-2.5 text-sm font-manrope font-semibold transition-colors ${tab === "reservations" ? "text-vert-profond border-b-2 border-vert-profond" : "text-anthracite/40"}`}>
            Réservations {resaCounts.en_attente > 0 && `(${resaCounts.en_attente})`}
          </button>
          <button onClick={() => setTab("projets")} className={`flex-1 py-2.5 text-sm font-manrope font-semibold transition-colors ${tab === "projets" ? "text-vert-profond border-b-2 border-vert-profond" : "text-anthracite/40"}`}>
            Projets {projetCounts.en_attente > 0 && `(${projetCounts.en_attente})`}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── RÉSERVATIONS ── */}
        {tab === "reservations" && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {(["en_attente", "all", "accepte", "refuse"] as const).map(f => (
                <button key={f} onClick={() => setResaFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-manrope font-semibold transition-all border ${resaFilter === f ? "bg-anthracite text-blanc-doux border-anthracite" : "bg-blanc-doux text-anthracite/60 border-anthracite/10 hover:border-anthracite/30"}`}>
                  {f === "all" ? "Toutes" : f === "en_attente" ? "En attente" : f === "accepte" ? "Acceptées" : "Refusées"}
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${resaFilter === f ? "bg-blanc-doux/20" : "bg-anthracite/8"}`}>{resaCounts[f]}</span>
                </button>
              ))}
            </div>

            {resaLoading ? (
              <div className="text-center py-20 text-anthracite/40 font-manrope text-sm">Chargement...</div>
            ) : resaFiltered.length === 0 ? (
              <div className="text-center py-20 text-anthracite/40 font-manrope text-sm">Aucune réservation</div>
            ) : (
              <div className="flex flex-col gap-3">
                {resaFiltered.map(r => {
                  const status = STATUS_LABELS[r.statut] || STATUS_LABELS.en_attente;
                  const isExpanded = resaExpanded === r.id;
                  return (
                    <div key={r.id} className="rounded-2xl overflow-hidden" style={cardStyle}>
                      <div className="p-5 flex items-center gap-4 cursor-pointer" onClick={() => setResaExpanded(isExpanded ? null : r.id)}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="font-epilogue font-bold text-anthracite text-sm">{r.association_name}</p>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border font-manrope ${status.color}`}>
                              {status.icon}{status.label}
                            </span>
                          </div>
                          <p className="text-anthracite/50 font-manrope text-xs">{r.email} · {r.salle}</p>
                          <p className="text-anthracite/40 font-manrope text-xs mt-0.5">
                            {fmtDate(r.date_souhaitee)}{r.date_fin && r.date_fin !== r.date_souhaitee ? ` → ${fmtDate(r.date_fin)}` : ""} · {r.creneau}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <p className="text-anthracite/30 font-manrope text-xs hidden sm:block">{fmtDateTime(r.created_at)}</p>
                          {isExpanded ? <ChevronUp size={16} className="text-anthracite/40" /> : <ChevronDown size={16} className="text-anthracite/40" />}
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-anthracite/6 pt-4 flex flex-col gap-4">
                          {r.motif && <div><p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Motif</p><p className="text-sm text-anthracite/75 font-manrope">{r.motif}</p></div>}
                          {r.note_admin && <div><p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Note admin</p><p className="text-sm text-anthracite/75 font-manrope">{r.note_admin}</p></div>}
                          {r.statut === "en_attente" && (
                            <div className="flex flex-col gap-3">
                              <textarea rows={2} value={resaNotes[r.id] || ""} onChange={e => setResaNotes(n => ({ ...n, [r.id]: e.target.value }))}
                                placeholder="Message au client (optionnel)"
                                className="w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors resize-none" />
                              <div className="flex gap-3">
                                <button onClick={() => handleResaAction(r.id, "accepte")} disabled={resaActionLoading === r.id + "accepte"}
                                  className="flex-1 inline-flex items-center justify-center gap-2 bg-vert-profond hover:bg-vert-profond/90 disabled:opacity-60 text-blanc-doux font-semibold px-5 py-3 rounded-full text-sm font-manrope transition-all">
                                  <CheckCircle2 size={15} />{resaActionLoading === r.id + "accepte" ? "Envoi..." : "Accepter"}
                                </button>
                                <button onClick={() => handleResaAction(r.id, "refuse")} disabled={resaActionLoading === r.id + "refuse"}
                                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-full text-sm font-manrope transition-all">
                                  <XCircle size={15} />{resaActionLoading === r.id + "refuse" ? "Envoi..." : "Refuser"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── PROJETS ── */}
        {tab === "projets" && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {(["en_attente", "all", "accepte", "refuse"] as const).map(f => (
                <button key={f} onClick={() => setProjetFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-manrope font-semibold transition-all border ${projetFilter === f ? "bg-anthracite text-blanc-doux border-anthracite" : "bg-blanc-doux text-anthracite/60 border-anthracite/10 hover:border-anthracite/30"}`}>
                  {f === "all" ? "Tous" : f === "en_attente" ? "En attente" : f === "accepte" ? "Acceptés" : "Refusés"}
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${projetFilter === f ? "bg-blanc-doux/20" : "bg-anthracite/8"}`}>{projetCounts[f]}</span>
                </button>
              ))}
            </div>

            {projetLoading ? (
              <div className="text-center py-20 text-anthracite/40 font-manrope text-sm">Chargement...</div>
            ) : projetFiltered.length === 0 ? (
              <div className="text-center py-20 text-anthracite/40 font-manrope text-sm">Aucun projet soumis</div>
            ) : (
              <div className="flex flex-col gap-3">
                {projetFiltered.map(p => {
                  const status = STATUS_LABELS[p.statut] || STATUS_LABELS.en_attente;
                  const isExpanded = projetExpanded === p.id;
                  return (
                    <div key={p.id} className="rounded-2xl overflow-hidden" style={cardStyle}>
                      <div className="p-5 flex items-center gap-4 cursor-pointer" onClick={() => setProjetExpanded(isExpanded ? null : p.id)}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="font-epilogue font-bold text-anthracite text-sm">{p.nom_projet}</p>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border font-manrope ${status.color}`}>
                              {status.icon}{status.label}
                            </span>
                          </div>
                          <p className="text-anthracite/50 font-manrope text-xs">{p.association_name} · {p.email}</p>
                          <p className="text-anthracite/40 font-manrope text-xs mt-0.5">
                            {p.public_cible}{p.budget_estime ? ` · ${p.budget_estime}` : ""}{p.delai_souhaite ? ` · ${p.delai_souhaite}` : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <p className="text-anthracite/30 font-manrope text-xs hidden sm:block">{fmtDateTime(p.created_at)}</p>
                          {isExpanded ? <ChevronUp size={16} className="text-anthracite/40" /> : <ChevronDown size={16} className="text-anthracite/40" />}
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-anthracite/6 pt-4 flex flex-col gap-4">
                          <div><p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Description</p><p className="text-sm text-anthracite/75 font-manrope leading-relaxed">{p.description}</p></div>
                          {p.partenaires && <div><p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Partenaires</p><p className="text-sm text-anthracite/75 font-manrope">{p.partenaires}</p></div>}
                          {p.note_admin && <div><p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Note admin</p><p className="text-sm text-anthracite/75 font-manrope">{p.note_admin}</p></div>}
                          {p.statut === "en_attente" && (
                            <div className="flex flex-col gap-3">
                              <textarea rows={2} value={projetNotes[p.id] || ""} onChange={e => setProjetNotes(n => ({ ...n, [p.id]: e.target.value }))}
                                placeholder="Message à l'association (optionnel)"
                                className="w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors resize-none" />
                              <div className="flex gap-3">
                                <button onClick={() => handleProjetAction(p.id, "accepte")} disabled={projetActionLoading === p.id + "accepte"}
                                  className="flex-1 inline-flex items-center justify-center gap-2 bg-vert-profond hover:bg-vert-profond/90 disabled:opacity-60 text-blanc-doux font-semibold px-5 py-3 rounded-full text-sm font-manrope transition-all">
                                  <CheckCircle2 size={15} />{projetActionLoading === p.id + "accepte" ? "Envoi..." : "Accepter le projet"}
                                </button>
                                <button onClick={() => handleProjetAction(p.id, "refuse")} disabled={projetActionLoading === p.id + "refuse"}
                                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-full text-sm font-manrope transition-all">
                                  <XCircle size={15} />{projetActionLoading === p.id + "refuse" ? "Envoi..." : "Refuser"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
