"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { label: "À propos", href: "#a-propos" },
  { label: "Nos actions", href: "#nos-actions" },
  { label: "S'impliquer", href: "#simpliquer" },
  { label: "Actualités", href: "#actualites" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      {/* Floating pill */}
      <header
        className={clsx(
          "w-full max-w-4xl 3xl:max-w-6xl transition-all duration-500",
          scrolled
            ? "max-w-3xl 3xl:max-w-5xl"
            : "max-w-4xl 3xl:max-w-6xl"
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-between h-14 3xl:h-16 px-5 3xl:px-8 rounded-full border transition-all duration-500",
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm 3xl:text-base font-medium px-4 3xl:px-5 py-1.5 rounded-full transition-all",
                  scrolled
                    ? "text-anthracite/80 hover:text-anthracite hover:bg-anthracite/5"
                    : "text-anthracite/75 hover:text-anthracite hover:bg-anthracite/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="#faire-un-don"
              className="bg-terracotta hover:bg-terracotta/90 text-blanc-doux text-sm 3xl:text-base font-semibold px-5 3xl:px-7 py-2 3xl:py-2.5 rounded-full transition-all shadow-sm"
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
          <div className="md:hidden mt-2 bg-blanc-doux/95 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-anthracite py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#faire-un-don"
              onClick={() => setMenuOpen(false)}
              className="bg-terracotta text-blanc-doux text-sm font-semibold px-5 py-3 rounded-full text-center mt-2"
            >
              Faire un don
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
