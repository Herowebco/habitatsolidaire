import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id, action, note } = await req.json();

  if (!id || !["accepte", "refuse"].includes(action)) {
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  }

  const { data: projet, error: fetchError } = await supabase
    .from("projets")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !projet) {
    return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("projets")
    .update({ statut: action, note_admin: note || null })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (action === "accepte") {
    await resend.emails.send({
      from: "Habitat Solidaire <noreply@digible.fr>",
      to: projet.email,
      subject: `Votre projet "${projet.nom_projet}" a été accepté ✓`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
          <h2 style="color: #2F4537;">Projet accepté ✓</h2>
          <p>Bonjour <strong>${projet.association_name}</strong>,</p>
          <p>Bonne nouvelle ! Votre projet <strong>${projet.nom_projet}</strong> a été <strong style="color: #2F4537;">accepté</strong> par notre équipe.</p>
          <div style="background: #F6F1E8; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Projet :</strong> ${projet.nom_projet}</p>
            <p style="margin: 4px 0;"><strong>Public cible :</strong> ${projet.public_cible}</p>
          </div>
          ${note ? `<p><strong>Message de l'équipe :</strong> ${note}</p>` : ""}
          <p>Nous prendrons contact avec vous très prochainement pour discuter des prochaines étapes.</p>
          <p style="color: #687C68;">À très bientôt,<br><strong>L'équipe Habitat Solidaire</strong></p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">03 74 47 27 33 — habitatsolidairenord@gmail.com</p>
        </div>
      `,
    });
  }

  if (action === "refuse") {
    await resend.emails.send({
      from: "Habitat Solidaire <noreply@digible.fr>",
      to: projet.email,
      subject: `Votre projet "${projet.nom_projet}"`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
          <h2 style="color: #D9825B;">Suite de votre soumission</h2>
          <p>Bonjour <strong>${projet.association_name}</strong>,</p>
          <p>Merci pour votre soumission du projet <strong>${projet.nom_projet}</strong>. Après étude, nous ne sommes malheureusement pas en mesure de l'accompagner dans l'immédiat.</p>
          ${note ? `<p><strong>Message de l'équipe :</strong> ${note}</p>` : ""}
          <p>N'hésitez pas à nous recontacter pour d'autres initiatives ou pour plus d'informations.</p>
          <p style="color: #687C68;">Cordialement,<br><strong>L'équipe Habitat Solidaire</strong></p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">03 74 47 27 33 — habitatsolidairenord@gmail.com</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ success: true, action });
}
