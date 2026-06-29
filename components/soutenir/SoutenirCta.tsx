import Link from "next/link";
import { Heart, Users } from "lucide-react";

const HELLOASSO_URL = "https://www.helloasso.com/associations/habitat-solidaire";

export function SoutenirCta() {
  return (
    <section className="relative bg-vert-profond py-20 px-6 overflow-hidden">
      <div aria-hidden="true" className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFFDF8 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div aria-hidden="true" className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D9825B 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <div
          className="rounded-3xl p-10 md:p-14"
          style={{
            background: "rgba(255,253,248,0.05)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <h2 className="font-epilogue font-extrabold text-blanc-doux text-3xl md:text-4xl leading-tight mb-4">
            Prêt à agir ?
          </h2>
          <p className="text-blanc-doux/70 text-lg font-manrope leading-relaxed mb-8 max-w-md mx-auto">
            Choisissez votre façon de soutenir Habitat Solidaire et rejoignez la communauté.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={HELLOASSO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base transition-all font-manrope"
              style={{ background: "#FF6B5B", color: "#fff", boxShadow: "0 4px 20px rgba(255,107,91,0.4)" }}
            >
              <Heart size={16} />
              Faire un don
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blanc-doux/10 hover:bg-blanc-doux/20 border border-blanc-doux/20 text-blanc-doux font-semibold px-8 py-4 rounded-full text-base transition-all font-manrope"
            >
              <Users size={16} />
              Devenir bénévole
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
