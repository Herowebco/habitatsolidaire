import type { Metadata } from "next";
import { Urbanist, Manrope } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { BlurOverlay } from "@/components/BlurOverlay";
import { FloatingActions } from "@/components/FloatingActions";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Habitat Solidaire - Centre associatif solidaire à Masny",
  description:
    "Centre associatif solidaire à Masny (Hauts-de-France). Salles pour associations, dons redistribués gratuitement, ateliers solidaires et logements rebond.",
  keywords: ["habitat solidaire", "Masny", "Hauts-de-France", "association", "logement", "solidarité"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${urbanist.variable} ${manrope.variable}`}>
      <body className="antialiased">
        {children}
        <FloatingActions />
        <BlurOverlay />
        <CookieBanner />
      </body>
    </html>
  );
}
