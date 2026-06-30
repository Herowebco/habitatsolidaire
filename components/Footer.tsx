import Link from "next/link";
import { Logo } from "./Logo";
import { Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "La ressourcerie", href: "/ressourcerie" },
  { label: "Centre associatif", href: "/centre-associatif" },
  { label: "Réserver une salle", href: "/centre-associatif#reserver" },
  { label: "Ateliers & événements", href: "/ateliers-evenements" },
  { label: "Projets associatifs", href: "/projets-associatifs" },
  { label: "Nous soutenir", href: "/nous-soutenir" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-anthracite text-blanc-doux/70 overflow-hidden">

      {/* Ligne séparatrice dégradée */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent 0%, rgba(104,124,104,0.8) 30%, rgba(217,130,91,0.7) 60%, transparent 100%)",
        }}
      />

      {/* Glows décoratifs */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(104,124,104,0.12) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(217,130,91,0.10) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">

        {/* Grille principale */}
        <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-blanc-doux/10">

          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <Logo light />
            <p className="text-sm leading-relaxed font-manrope max-w-sm text-blanc-doux/60">
              Un centre associatif solidaire qui relie les lieux, les dons, les
              projets et les solutions d'habitat pour construire une solidarité
              concrète sur le territoire.
            </p>
            <p className="text-xs text-blanc-doux/30 uppercase tracking-widest font-manrope">
              humain · local · solidaire
            </p>

            {/* Adresses en cartes glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <div
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <MapPin size={14} className="mt-0.5 shrink-0 text-vert-sauge" />
                <div>
                  <p className="text-[10px] text-blanc-doux/35 uppercase tracking-widest font-manrope mb-1">Centre associatif</p>
                  <span className="text-xs font-manrope text-blanc-doux/70 leading-snug block">49C rue de la Fabrique, Masny</span>
                </div>
              </div>
              <div
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <MapPin size={14} className="mt-0.5 shrink-0 text-terracotta" />
                <div>
                  <p className="text-[10px] text-blanc-doux/35 uppercase tracking-widest font-manrope mb-1">La ressourcerie</p>
                  <span className="text-xs font-manrope text-blanc-doux/70 leading-snug block">105 Avenue du 8 Mai 1945, Masny</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-blanc-doux/90 font-epilogue font-bold text-xs uppercase tracking-widest mb-5">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-blanc-doux transition-colors font-manrope text-blanc-doux/55 hover:translate-x-0.5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-blanc-doux/90 font-epilogue font-bold text-xs uppercase tracking-widest mb-5">
              Contact
            </h3>
            <div className="flex flex-col gap-3">

              {/* Email card */}
              <a
                href="/contact"
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Mail size={14} className="shrink-0 text-vert-sauge" />
                <span className="text-xs font-manrope text-blanc-doux/60 group-hover:text-blanc-doux/90 transition-colors break-all leading-snug">
                  habitatsolidairenord@gmail.com
                </span>
              </a>

              {/* Téléphone card */}
              <a
                href="tel:+33374472733"
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Phone size={14} className="shrink-0 text-vert-sauge" />
                <span className="text-sm font-manrope text-blanc-doux/60 group-hover:text-blanc-doux/90 transition-colors">
                  03 74 47 27 33
                </span>
              </a>

              {/* CTA don */}
              <a
                href="/nous-soutenir"
                className="mt-2 inline-flex items-center justify-center bg-terracotta hover:bg-terracotta/90 text-blanc-doux font-semibold text-sm px-5 py-3 rounded-full transition-all font-manrope"
                style={{ boxShadow: "0 4px 20px rgba(217,130,91,0.25)" }}
              >
                Faire un don
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blanc-doux/25 font-manrope">
          <p>© {new Date().getFullYear()} Habitat Solidaire. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-blanc-doux/50 transition-colors">
              Mentions légales
            </Link>
            <Link href="/mentions-legales#cookies" className="hover:text-blanc-doux/50 transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
