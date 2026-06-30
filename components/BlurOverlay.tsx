"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function BlurOverlay() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => {
      const saved = localStorage.getItem("hs-cookie-consent");
      setHasConsent(!!saved);
    };
    check();
    window.addEventListener("hs-consent-changed", check);
    return () => window.removeEventListener("hs-consent-changed", check);
  }, []);

  // Pas encore hydraté, mentions légales : on ne bloque rien
  if (hasConsent === null || hasConsent || pathname === "/mentions-legales") return null;

  return (
    <div
      className="fixed inset-0 z-[90] pointer-events-none"
      style={{
        backdropFilter: "blur(12px) saturate(80%)",
        WebkitBackdropFilter: "blur(12px) saturate(80%)",
        background: "rgba(255,253,248,0.25)",
      }}
    />
  );
}
