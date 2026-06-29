import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { StarBorderButton } from "./StarBorderButton";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">

      {/* ── Background SVG ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-section.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center 80%",
        }}
      >
        <div className="absolute inset-0 bg-blanc-doux/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blanc-doux to-transparent" />
      </div>

      {/* ── Grid 2 colonnes ── */}
      <div className="relative z-10 max-w-5xl 3xl:max-w-7xl mx-auto w-full px-8 3xl:px-16 grid grid-cols-1 md:grid-cols-2 gap-6 3xl:gap-20 items-center pt-24 pb-12">

        {/* ── Colonne gauche : texte ── */}
        <div className="flex flex-col order-1">

          {/* Badge localisation */}
          <div className="inline-flex self-start items-center gap-2 bg-blanc-doux/70 backdrop-blur-sm border border-vert-sauge/25 rounded-full px-5 py-2 mb-5">
            <MapPin size={12} className="text-terracotta 3xl:hidden" />
            <MapPin size={15} className="text-terracotta hidden 3xl:block" />
            <span className="text-xs 3xl:text-sm font-semibold text-vert-profond tracking-widest uppercase font-manrope">
              Masny · Hauts-de-France
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-epilogue font-extrabold text-anthracite leading-[1.05] mb-4 tracking-tight"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)" }}
          >
            Ici, la solidarité
            <br />
            <span className="text-vert-profond">devient concrète.</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-anthracite/75 text-lg 3xl:text-xl leading-relaxed mb-5 max-w-md 3xl:max-w-xl font-manrope">
            Centre associatif solidaire de 600&nbsp;m² à Masny. Nous hébergeons,
            accompagnons et mobilisons pour construire une solidarité concrète sur le territoire.
          </p>

          {/* Pills de réassurance */}
          <div className="flex flex-wrap gap-3 mb-6">
            {["Partage des lieux", "Redistribution des dons", "Projets solidaires"].map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full px-4 3xl:px-5 py-2"
                style={{
                  background: "rgba(255,253,248,0.55)",
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.75)",
                  boxShadow: "0 4px 16px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <Check size={13} className="text-vert-sauge" />
                <span className="text-sm 3xl:text-base font-medium text-anthracite/80 font-manrope">{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#nos-actions"
              className="inline-flex items-center gap-2 bg-vert-profond hover:bg-vert-profond/90 text-blanc-doux font-semibold px-8 3xl:px-10 py-4 3xl:py-5 rounded-full transition-all shadow-lg shadow-vert-profond/20 text-base 3xl:text-lg"
            >
              Découvrir nos actions
              <ArrowRight size={16} className="3xl:hidden" />
              <ArrowRight size={20} className="hidden 3xl:block" />
            </Link>
            <StarBorderButton href="#faire-un-don">
              Faire un don
            </StarBorderButton>
          </div>
        </div>

        {/* ── Colonne droite : image ── */}
        <div className="relative order-2">
          {/* Image principale */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[340px] md:max-h-[520px] 3xl:max-h-[680px] shadow-2xl shadow-vert-profond/20">
            <Image
              src="/habitat-solidaire-masny.jpg"
              alt="Habitat Solidaire à Masny"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div className="absolute inset-0 bg-vert-profond/10" />
          </div>

          {/* Carte flottante */}
          <div
            className="absolute -bottom-6 -left-6 px-5 3xl:px-7 py-4 3xl:py-5 rounded-2xl"
            style={{
              background: "rgba(255,253,248,0.60)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: "0 8px 32px rgba(47,69,55,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <p className="text-xs 3xl:text-sm font-semibold text-vert-sauge uppercase tracking-widest font-manrope mb-1">
              Association locale
            </p>
            <p className="text-sm 3xl:text-base font-bold text-anthracite font-epilogue">
              600 m² dédiés à la solidarité
            </p>
          </div>

          {/* Blob décoratif */}
          <div
            aria-hidden="true"
            className="absolute -z-10 -top-8 -right-8 w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, #687C6840 0%, transparent 70%)", filter: "blur(40px)" }}
          />
        </div>
      </div>

    </section>
  );
}
