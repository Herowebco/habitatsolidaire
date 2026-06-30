"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Ressourcerie", href: "/ressourcerie" },
  { label: "Centre associatif", href: "/centre-associatif" },
  { label: "Nous soutenir", href: "/nous-soutenir" },
  { label: "Contact", href: "/contact" },
];

const dropdownLinks = [
  { label: "Ateliers & événements", href: "/ateliers-evenements" },
  { label: "Projets associatifs", href: "/projets-associatifs" },
  { label: "Logements rebond", href: "/logements-rebond" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = clsx(
    "text-sm font-medium px-3 py-1.5 rounded-full transition-all whitespace-nowrap",
    scrolled
      ? "text-anthracite/80 hover:text-anthracite hover:bg-anthracite/5"
      : "text-anthracite/75 hover:text-anthracite hover:bg-anthracite/5"
  );

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <header className={clsx("w-full transition-all duration-500", scrolled ? "max-w-4xl" : "max-w-5xl")}>
        <div
          className={clsx(
            "flex items-center justify-between h-14 px-5 rounded-full border transition-all duration-500",
            scrolled
              ? "bg-blanc-doux/90 backdrop-blur-xl border-vert-sauge/20 shadow-xl shadow-anthracite/10"
              : "bg-blanc-doux/55 backdrop-blur-md border-vert-sauge/15 shadow-md shadow-anthracite/5"
          )}
        >
          {/* Logo */}
          <Link href="/" aria-label="Habitat Solidaire - accueil">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/ressourcerie" className={linkClass}>Ressourcerie</Link>
            <Link href="/centre-associatif" className={linkClass}>Centre associatif</Link>

            {/* Dropdown "Nos actions" */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className={clsx(linkClass, "inline-flex items-center gap-1", dropdownOpen && "bg-anthracite/5 text-anthracite")}
              >
                Nos actions
                <ChevronDown
                  size={14}
                  className={clsx("transition-transform duration-200", dropdownOpen && "rotate-180")}
                />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[220px] rounded-2xl py-2 overflow-hidden"
                  style={{
                    background: "rgba(255,253,248,0.95)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.70)",
                    boxShadow: "0 8px 32px rgba(47,69,55,0.12)",
                  }}
                >
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-5 py-2.5 text-sm font-manrope text-anthracite/75 hover:text-anthracite hover:bg-vert-sauge/06 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/nous-soutenir" className={linkClass}>Nous soutenir</Link>
            <Link href="/contact" className={linkClass}>Contact</Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/nous-soutenir"
              className="bg-terracotta hover:bg-terracotta/90 text-blanc-doux text-sm font-semibold px-5 py-2 rounded-full transition-all shadow-sm whitespace-nowrap"
            >
              Faire un don
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-1.5 rounded-full transition-colors text-anthracite"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-blanc-doux/95 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-anthracite py-2 px-2 rounded-xl hover:bg-anthracite/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Sous-section mobile */}
            <div className="border-t border-anthracite/8 mt-2 pt-3">
              <p className="text-xs font-semibold text-anthracite/40 uppercase tracking-widest font-manrope px-2 mb-2">Nos actions</p>
              {dropdownLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-anthracite/80 py-2 px-2 rounded-xl hover:bg-anthracite/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/nous-soutenir"
              onClick={() => setMenuOpen(false)}
              className="bg-terracotta text-blanc-doux text-sm font-semibold px-5 py-3 rounded-full text-center mt-3"
            >
              Faire un don
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
