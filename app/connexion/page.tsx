"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";

const cardStyle = {
  background: "rgba(255,253,248,0.90)",
  backdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 40px rgba(47,69,55,0.10)",
};

const inputStyle =
  "w-full rounded-xl px-4 py-3 text-sm font-manrope text-anthracite placeholder-anthracite/35 bg-blanc-doux border border-anthracite/10 focus:outline-none focus:border-vert-sauge/50 transition-colors";

export default function ConnexionPage() {
  const router = useRouter();
  const [role, setRole] = useState<"choix" | "association">("choix");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Enregistre l'association (ou la retrouve si déjà inscrite) dans Supabase
      const res = await fetch("/api/associations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: form.nom, email: form.email }),
      });
      if (!res.ok) throw new Error("Erreur");
      sessionStorage.setItem("asso_session", JSON.stringify({ nom: form.nom, email: form.email.trim().toLowerCase() }));
      router.push("/portail-association");
    } catch {
      setError("Une erreur est survenue. Réessayez dans un instant.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-section.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      >
        <div className="absolute inset-0 bg-blanc-doux/55" />
      </div>

      <div className="relative w-full max-w-md rounded-3xl p-8" style={cardStyle}>
        <Link href="/" className="inline-flex items-center gap-1.5 text-anthracite/40 hover:text-anthracite/70 text-xs font-manrope font-semibold mb-6 transition-colors">
          <ArrowLeft size={13} /> Retour au site
        </Link>

        {role === "choix" && (
          <>
            <h1 className="font-epilogue font-bold text-anthracite text-2xl mb-1">Connexion</h1>
            <p className="text-anthracite/50 font-manrope text-sm mb-8">Choisissez votre espace</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setRole("association")}
                className="flex items-center gap-4 p-5 rounded-2xl border border-anthracite/10 hover:border-vert-sauge/40 hover:bg-vert-sauge/05 transition-all text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-vert-sauge/12 flex items-center justify-center shrink-0">
                  <Building2 size={20} className="text-vert-sauge" />
                </div>
                <div>
                  <p className="font-epilogue font-bold text-anthracite text-sm">Espace association</p>
                  <p className="text-anthracite/50 font-manrope text-xs mt-0.5">Réservation, projets, fiche association</p>
                </div>
              </button>

              <Link
                href="/admin"
                className="flex items-center gap-4 p-5 rounded-2xl border border-anthracite/10 hover:border-vert-profond/40 hover:bg-vert-profond/05 transition-all text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-vert-profond/12 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-vert-profond" />
                </div>
                <div>
                  <p className="font-epilogue font-bold text-anthracite text-sm">Administration</p>
                  <p className="text-anthracite/50 font-manrope text-xs mt-0.5">Gestion des demandes</p>
                </div>
              </Link>
            </div>
          </>
        )}

        {role === "association" && (
          <>
            <button
              onClick={() => setRole("choix")}
              className="inline-flex items-center gap-1.5 text-anthracite/40 hover:text-anthracite/70 text-xs font-manrope font-semibold mb-4 transition-colors"
            >
              <ArrowLeft size={13} /> Changer d'espace
            </button>
            <h1 className="font-epilogue font-bold text-anthracite text-2xl mb-1">Espace association</h1>
            <p className="text-anthracite/50 font-manrope text-sm mb-6">Connectez-vous pour accéder à votre portail</p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Association</label>
                <input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder="Nom de votre association" className={inputStyle} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Email</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="votre@email.fr" className={inputStyle} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-anthracite/50 uppercase tracking-widest font-manrope">Mot de passe</label>
                <input type="password" name="password" required value={form.password} onChange={handleChange} placeholder="••••••••" className={inputStyle} />
              </div>

              {error && <p className="text-sm text-red-500 font-manrope">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-vert-sauge hover:bg-vert-sauge/90 disabled:opacity-60 text-blanc-doux font-semibold px-6 py-3.5 rounded-full text-sm font-manrope transition-all"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading ? "Connexion..." : "Accéder à mon espace"}
              </button>

              <p className="text-anthracite/35 font-manrope text-[11px] text-center mt-1">
                Version de démonstration — tout identifiant fonctionne.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
