"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { CheckCircle2, XCircle, Clock, LogOut, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

const STATUS_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  en_attente: { label: "En attente", color: "text-amber-600 bg-amber-50 border-amber-200", icon: <Clock size={12} /> },
  accepte: { label: "Acceptée", color: "text-green-700 bg-green-50 border-green-200", icon: <CheckCircle2 size={12} /> },
  refuse: { label: "Refusée", color: "text-red-600 bg-red-50 border-red-200", icon: <XCircle size={12} /> },
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function fmtDateTime(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "en_attente" | "accepte" | "refuse">("en_attente");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });
    setReservations(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchReservations();
  }, [authed, fetchReservations]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      sessionStorage.setItem("admin_pwd", password);
    } else {
      setAuthError("Mot de passe incorrect");
    }
    setAuthLoading(false);
  }

  async function handleAction(id: string, action: "accepte" | "refuse") {
    setActionLoading(id + action);
    const res = await fetch("/api/reservations/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": password || sessionStorage.getItem("admin_pwd") || "",
      },
      body: JSON.stringify({ id, action, note: notes[id] || "" }),
    });
    if (res.ok) {
      showToast(action === "accepte" ? "✓ Réservation acceptée — email envoyé" : "✗ Réservation refusée — email envoyé", action === "accepte" ? "success" : "error");
      fetchReservations();
      setExpanded(null);
    } else {
      showToast("Erreur lors de l'action", "error");
    }
    setActionLoading(null);
  }

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

  const filtered = filter === "all" ? reservations : reservations.filter(r => r.statut === filter);
  const counts = {
    all: reservations.length,
    en_attente: reservations.filter(r => r.statut === "en_attente").length,
    accepte: reservations.filter(r => r.statut === "accepte").length,
    refuse: reservations.filter(r => r.statut === "refuse").length,
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-3xl p-8"
          style={{
            background: "rgba(255,253,248,0.90)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.70)",
            boxShadow: "0 8px 40px rgba(47,69,55,0.10)",
          }}>
          <div className="w-12 h-12 rounded-2xl bg-vert-profond flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="font-epilogue font-bold text-anthracite text-2xl mb-1">Administration</h1>
          <p className="text-anthracite/50 font-manrope text-sm mb-6">Habitat Solidaire — Réservations</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors"
            />
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
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl text-sm font-manrope font-semibold shadow-lg transition-all ${toast.type === "success" ? "bg-vert-profond text-blanc-doux" : "bg-red-500 text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-anthracite/8 bg-blanc-doux/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-epilogue font-bold text-anthracite text-lg">Réservations</h1>
            <p className="text-anthracite/40 font-manrope text-xs">Habitat Solidaire — Administration</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchReservations} disabled={loading}
              className="w-9 h-9 rounded-full bg-anthracite/5 hover:bg-anthracite/10 flex items-center justify-center transition-colors">
              <RefreshCw size={14} className={`text-anthracite/60 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={() => { setAuthed(false); sessionStorage.removeItem("admin_pwd"); }}
              className="w-9 h-9 rounded-full bg-anthracite/5 hover:bg-anthracite/10 flex items-center justify-center transition-colors">
              <LogOut size={14} className="text-anthracite/60" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["en_attente", "all", "accepte", "refuse"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-manrope font-semibold transition-all border ${
                filter === f
                  ? "bg-anthracite text-blanc-doux border-anthracite"
                  : "bg-blanc-doux text-anthracite/60 border-anthracite/10 hover:border-anthracite/30"
              }`}>
              {f === "all" ? "Toutes" : f === "en_attente" ? "En attente" : f === "accepte" ? "Acceptées" : "Refusées"}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${filter === f ? "bg-blanc-doux/20" : "bg-anthracite/8"}`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>

        {/* Liste */}
        {loading ? (
          <div className="text-center py-20 text-anthracite/40 font-manrope text-sm">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-anthracite/40 font-manrope text-sm">Aucune réservation</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(r => {
              const status = STATUS_LABELS[r.statut] || STATUS_LABELS.en_attente;
              const isExpanded = expanded === r.id;
              const isPending = r.statut === "en_attente";

              return (
                <div key={r.id} className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,253,248,0.85)",
                    border: "1px solid rgba(255,255,255,0.70)",
                    boxShadow: "0 2px 16px rgba(47,69,55,0.06)",
                  }}>
                  {/* Ligne principale */}
                  <div className="p-5 flex items-center gap-4 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : r.id)}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-epilogue font-bold text-anthracite text-sm truncate">{r.association_name}</p>
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

                  {/* Détail expandé */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-anthracite/6 pt-4 flex flex-col gap-4">
                      {r.motif && (
                        <div>
                          <p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Motif</p>
                          <p className="text-sm text-anthracite/75 font-manrope">{r.motif}</p>
                        </div>
                      )}
                      {r.note_admin && (
                        <div>
                          <p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope mb-1">Note admin</p>
                          <p className="text-sm text-anthracite/75 font-manrope">{r.note_admin}</p>
                        </div>
                      )}

                      {isPending && (
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope">Message au client (optionnel)</label>
                            <textarea
                              rows={2}
                              value={notes[r.id] || ""}
                              onChange={e => setNotes(n => ({ ...n, [r.id]: e.target.value }))}
                              placeholder="Précisions, infos complémentaires..."
                              className="w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors resize-none"
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleAction(r.id, "accepte")}
                              disabled={actionLoading === r.id + "accepte"}
                              className="flex-1 inline-flex items-center justify-center gap-2 bg-vert-profond hover:bg-vert-profond/90 disabled:opacity-60 text-blanc-doux font-semibold px-5 py-3 rounded-full text-sm font-manrope transition-all">
                              <CheckCircle2 size={15} />
                              {actionLoading === r.id + "accepte" ? "Envoi..." : "Accepter"}
                            </button>
                            <button
                              onClick={() => handleAction(r.id, "refuse")}
                              disabled={actionLoading === r.id + "refuse"}
                              className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-full text-sm font-manrope transition-all">
                              <XCircle size={15} />
                              {actionLoading === r.id + "refuse" ? "Envoi..." : "Refuser"}
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
      </div>
    </div>
  );
}
