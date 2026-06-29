import Link from "next/link";
import { Heart } from "lucide-react";

export function CtaBanner() {
  return (
    <section
      id="faire-un-don"
      className="relative bg-vert-profond overflow-hidden py-24 px-6"
    >
      {/* Background texture blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #FFFDF8 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #D9825B 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Glassmorphism inner card */}
      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="font-epilogue font-extrabold text-blanc-doux text-4xl md:text-5xl leading-tight mb-5">
            Agir ensemble,
            <br />
            ça change tout.
          </h2>

          <p className="text-blanc-doux/60 text-lg leading-relaxed max-w-xl mx-auto mb-10 font-manrope">
            Votre soutien nous permet d'aller plus loin, chaque jour. Chaque don
            est directement reversé à nos missions sur le terrain.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#don"
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta/90 text-blanc-doux font-semibold px-8 py-4 rounded-full text-base transition-colors"
            >
              <Heart size={16} />
              Faire un don
            </Link>
            <Link
              href="#simpliquer"
              className="inline-flex items-center gap-2 bg-blanc-doux/10 backdrop-blur-sm hover:bg-blanc-doux/20 border border-blanc-doux/20 text-blanc-doux font-semibold px-8 py-4 rounded-full text-base transition-colors"
            >
              Devenir bénévole
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
