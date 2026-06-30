import Image from "next/image";
import { Quote } from "lucide-react";

export function SoutenirPresident() {
  return (
    <section className="relative bg-blanc-doux py-20 px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(104,124,104,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-vert-sauge/12 text-vert-sauge rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Mot du président
          </span>
        </div>

        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,253,248,0.70)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.70)",
            boxShadow: "0 8px 40px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {/* Photo pleine largeur horizontale */}
          <div className="relative w-full h-80 md:h-[480px]">
            <Image
              src="/damien-bacro-president.png"
              alt="Damien Bacro, président d'Habitat Solidaire"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-anthracite/60 via-anthracite/10 to-transparent" />
            <div className="absolute bottom-6 left-7">
              <p className="font-epilogue font-bold text-blanc-doux text-xl">Damien Bacro</p>
              <p className="text-blanc-doux/70 font-manrope text-sm mt-1">Président · Habitat Solidaire</p>
            </div>
          </div>

          {/* Citation */}
          <div className="flex flex-col gap-5 p-8 md:p-10">
            <Quote size={32} className="text-vert-sauge/30 shrink-0" />
            <blockquote className="font-epilogue text-anthracite text-lg md:text-xl leading-relaxed font-medium">
              Habitat Solidaire est né d'une conviction simple : la solidarité ne se décrète pas, elle se construit ensemble, sur un territoire, avec des gens qui s'engagent.
            </blockquote>
            <p className="text-anthracite/65 font-manrope text-sm leading-relaxed">
              Depuis la création de l'association, nous avons fait le choix de la proximité et de l'action concrète. Chaque don reçu repart directement vers ceux qui en ont besoin. Chaque bénévole, chaque partenaire, chaque salle partagée contribue à tisser un peu plus de lien social à Masny et sur l'ensemble du territoire.
            </p>
            <p className="text-anthracite/65 font-manrope text-sm leading-relaxed">
              Si vous choisissez de nous soutenir aujourd'hui, sachez que votre geste aura un impact direct, traçable et humain. Merci.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
