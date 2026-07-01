"use client";

import Image from "next/image";

const partenaires = [
  { nom: "Done", logo: "/1.png" },
  { nom: "Mairie de Masny", logo: "/2.png" },
  { nom: "Toqué comme un chef", logo: "/3.png" },
];

const items = [...partenaires, ...partenaires, ...partenaires];

const LOGO_W_MOBILE = 160;
const LOGO_W_DESKTOP = 280;
const GAP_MOBILE = 24;
const GAP_DESKTOP = 40;
const TOTAL_W_MOBILE = partenaires.length * (LOGO_W_MOBILE + GAP_MOBILE);
const TOTAL_W_DESKTOP = partenaires.length * (LOGO_W_DESKTOP + GAP_DESKTOP);

export function Partenaires() {
  return (
    <div className="py-8 bg-blanc-doux">
      <style>{`
        @keyframes marquee-logos-mobile {
          from { transform: translateX(0); }
          to   { transform: translateX(-${TOTAL_W_MOBILE}px); }
        }
        @keyframes marquee-logos-desktop {
          from { transform: translateX(0); }
          to   { transform: translateX(-${TOTAL_W_DESKTOP}px); }
        }
        .marquee-track-mobile {
          animation: marquee-logos-mobile ${partenaires.length * 4}s linear infinite;
        }
        .marquee-track-desktop {
          animation: marquee-logos-desktop ${partenaires.length * 5}s linear infinite;
        }
      `}</style>

      <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-anthracite/30 font-manrope mb-6">
        Ils nous font confiance
      </p>

      {/* Mobile */}
      <div
        className="mx-auto overflow-hidden md:hidden"
        style={{
          maxWidth: "100vw",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center marquee-track-mobile"
          style={{ gap: `${GAP_MOBILE}px`, width: "max-content" }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-90 transition-all duration-300"
              style={{ width: `${LOGO_W_MOBILE}px` }}
              title={p.nom}
            >
              <Image src={p.logo} alt={p.nom} width={LOGO_W_MOBILE} height={64} className="object-contain h-16 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div
        className="mx-auto overflow-hidden hidden md:block"
        style={{
          maxWidth: `${LOGO_W_DESKTOP * 3 + GAP_DESKTOP * 2}px`,
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center marquee-track-desktop"
          style={{ gap: `${GAP_DESKTOP}px`, width: "max-content" }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-90 transition-all duration-300"
              style={{ width: `${LOGO_W_DESKTOP}px` }}
              title={p.nom}
            >
              <Image src={p.logo} alt={p.nom} width={LOGO_W_DESKTOP} height={96} className="object-contain h-24 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
