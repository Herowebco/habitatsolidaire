"use client";

import Image from "next/image";

const partenaires = [
  { nom: "Done", logo: "/1.png" },
  { nom: "Mairie de Masny", logo: "/2.png" },
  { nom: "Toqué comme un chef", logo: "/3.png" },
];

const items = [...partenaires, ...partenaires, ...partenaires];

const LOGO_W = 360;
const GAP = 48;
const TOTAL_W = partenaires.length * (LOGO_W + GAP);

export function Partenaires() {
  return (
    <div className="py-8 bg-blanc-doux">
      <style>{`
        @keyframes marquee-logos {
          from { transform: translateX(0); }
          to   { transform: translateX(-${TOTAL_W}px); }
        }
      `}</style>

      <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-anthracite/30 font-manrope mb-6">
        Ils nous font confiance
      </p>

      <div
        className="mx-auto overflow-hidden"
        style={{
          maxWidth: `${LOGO_W * 3 + GAP * 2}px`,
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center"
          style={{
            gap: `${GAP}px`,
            animation: `marquee-logos ${partenaires.length * 5}s linear infinite`,
            width: "max-content",
          }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-90 transition-all duration-300"
              style={{ width: `${LOGO_W}px` }}
              title={p.nom}
            >
              <Image
                src={p.logo}
                alt={p.nom}
                width={LOGO_W}
                height={112}
                className="object-contain h-28 w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
