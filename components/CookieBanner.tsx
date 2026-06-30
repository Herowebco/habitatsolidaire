"use client";

import { useState, useEffect } from "react";
import { Cookie, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

type Consent = "accepted" | "refused" | "custom" | null;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(false);
  const [functional, setFunctional] = useState(true); // toujours actif

  useEffect(() => {
    const saved = localStorage.getItem("hs-cookie-consent");
    if (!saved) setVisible(true);
  }, []);

  function save(choice: Consent) {
    localStorage.setItem("hs-cookie-consent", choice ?? "refused");
    window.dispatchEvent(new Event("hs-consent-changed"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 flex justify-center">
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,253,248,0.92)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.70)",
          boxShadow: "0 -4px 40px rgba(47,69,55,0.12), 0 8px 32px rgba(47,69,55,0.08)",
        }}
      >
        {/* Barre colorée en haut */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #687C68, #D9825B)" }} />

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-vert-sauge/12 flex items-center justify-center shrink-0">
                <Cookie size={17} className="text-vert-sauge" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-epilogue font-bold text-anthracite text-sm">Respect de votre vie privée</h3>
                <p className="text-anthracite/55 text-xs font-manrope mt-0.5">
                  Nous utilisons des cookies pour assurer le bon fonctionnement du site.{" "}
                  <Link href="/mentions-legales" className="underline hover:text-anthracite/80 transition-colors">
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>
            <button
              onClick={() => save("refused")}
              className="shrink-0 p-1.5 rounded-full hover:bg-anthracite/08 transition-colors text-anthracite/40 hover:text-anthracite"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Détail personnalisation */}
          {detail && (
            <div className="mb-4 rounded-xl p-4 bg-anthracite/04 border border-anthracite/06">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-anthracite font-manrope">Cookies fonctionnels</p>
                  <p className="text-xs text-anthracite/50 font-manrope mt-0.5">Nécessaires au fonctionnement du site. Toujours actifs.</p>
                </div>
                <div className="w-10 h-5 rounded-full bg-vert-sauge flex items-center justify-end pr-0.5">
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          )}

          {/* Boutons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => save("accepted")}
              className="flex-1 sm:flex-none bg-anthracite hover:bg-anthracite/85 text-blanc-doux font-semibold text-xs px-5 py-2.5 rounded-full transition-all font-manrope"
            >
              Tout accepter
            </button>
            <button
              onClick={() => save("refused")}
              className="flex-1 sm:flex-none bg-transparent hover:bg-anthracite/06 text-anthracite/70 hover:text-anthracite font-semibold text-xs px-5 py-2.5 rounded-full border border-anthracite/15 transition-all font-manrope"
            >
              Tout refuser
            </button>
            <button
              onClick={() => setDetail((d) => !d)}
              className="inline-flex items-center gap-1 text-anthracite/45 hover:text-anthracite/70 text-xs font-manrope transition-colors ml-auto"
            >
              Personnaliser
              {detail ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            {detail && (
              <button
                onClick={() => save("custom")}
                className="bg-vert-sauge/15 hover:bg-vert-sauge/25 text-vert-sauge font-semibold text-xs px-5 py-2.5 rounded-full transition-all font-manrope"
              >
                Enregistrer mes choix
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
