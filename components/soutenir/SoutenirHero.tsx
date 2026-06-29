import { Heart } from "lucide-react";

export function SoutenirHero() {
  return (
    <section className="relative overflow-hidden flex items-center justify-center pt-32 pb-16 px-6">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-section.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center 80%",
        }}
      >
        <div className="absolute inset-0 bg-blanc-doux/55" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blanc-doux to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blanc-doux/70 backdrop-blur-sm border border-vert-sauge/25 rounded-full px-5 py-2 mb-6">
          <Heart size={12} className="text-terracotta" />
          <span className="text-xs font-semibold text-vert-profond tracking-widest uppercase font-manrope">
            Agir ensemble
          </span>
        </div>

        <h1
          className="font-epilogue font-extrabold text-anthracite leading-tight tracking-tight mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
        >
          Chaque geste compte,{" "}
          <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">vraiment.</span>
        </h1>
        <p className="text-anthracite/75 text-lg font-manrope leading-relaxed max-w-xl mx-auto">
          Don, bénévolat ou partenariat : il y a une façon de s'impliquer pour chacun.
          Trouvez la vôtre et rejoignez l'aventure solidaire.
        </p>
      </div>
    </section>
  );
}
