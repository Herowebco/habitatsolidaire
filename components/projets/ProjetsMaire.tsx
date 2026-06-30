import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export function ProjetsMaire() {
  return (
    <section className="relative bg-blanc-doux py-16 px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(104,124,104,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block bg-vert-sauge/12 text-vert-sauge rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Soutien institutionnel
          </span>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center gap-8 rounded-3xl p-8"
          style={{
            background: "rgba(255,253,248,0.70)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.70)",
            boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {/* Photo */}
          <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-lg shadow-vert-profond/15">
            <Image
              src="/habitat-solidaire-maire-masny.jpg"
              alt="Maire de Masny avec Habitat Solidaire"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>

          {/* Texte */}
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <BadgeCheck size={18} className="text-vert-sauge shrink-0" />
              <span className="font-epilogue font-bold text-anthracite text-lg">Mairie de Masny</span>
            </div>
            <p className="text-anthracite/65 font-manrope text-sm leading-relaxed max-w-sm">
              Habitat Solidaire bénéficie du soutien de la Mairie de Masny, partenaire institutionnel engagé aux côtés de l&apos;association depuis sa création.
            </p>
            <div
              className="inline-flex items-center gap-2 self-center sm:self-start rounded-full px-4 py-1.5 mt-1"
              style={{
                background: "rgba(104,124,104,0.10)",
                border: "1px solid rgba(104,124,104,0.20)",
              }}
            >
              <span className="text-xs font-semibold text-vert-sauge font-manrope">Masny · Hauts-de-France</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
