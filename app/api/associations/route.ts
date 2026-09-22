import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Récupère la fiche d'une association par email (portail : préremplissage de "Ma fiche")
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("associations")
    .select("nom, email, secteur, telephone, site_web, description")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// Inscrit l'association (à la connexion) ou met à jour sa fiche (onglet "Ma fiche").
// L'email sert d'identifiant : une seule fiche par email.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const nom = String(body.nom ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!nom || !email) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  if (nom.length > 120 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const fiche: Record<string, string | null> = { nom, email };
  // Champs de la fiche : seulement s'ils sont fournis, pour ne pas écraser
  // une fiche existante lors d'une simple connexion
  for (const key of ["secteur", "telephone", "site_web", "description"] as const) {
    if (key in body) fiche[key] = String(body[key] ?? "").trim() || null;
  }
  if (Object.keys(fiche).length > 2) fiche.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from("associations")
    .upsert(fiche, { onConflict: "email" });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
