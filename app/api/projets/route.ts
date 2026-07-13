import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { association_name, email, nom_projet, description, public_cible, budget_estime, delai_souhaite, partenaires } = body;

  if (!association_name || !email || !nom_projet || !description || !public_cible) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const { error } = await supabase.from("projets").insert({
    association_name,
    email,
    nom_projet,
    description,
    public_cible,
    budget_estime: budget_estime || null,
    delai_souhaite: delai_souhaite || null,
    partenaires: partenaires || null,
    statut: "en_attente",
  });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
  }

  // Confirmation au porteur de projet
  await resend.emails.send({
    from: "Habitat Solidaire <noreply@digible.fr>",
    to: email,
    subject: "Votre soumission de projet a bien été reçue",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
        <h2 style="color: #2F4537;">Projet reçu ✓</h2>
        <p>Bonjour <strong>${association_name}</strong>,</p>
        <p>Votre projet <strong>${nom_projet}</strong> a bien été reçu. Notre équipe l'étudiera et vous recontactera dans les meilleurs délais.</p>
        <div style="background: #F6F1E8; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <p style="margin: 4px 0;"><strong>Projet :</strong> ${nom_projet}</p>
          <p style="margin: 4px 0;"><strong>Public cible :</strong> ${public_cible}</p>
          ${budget_estime ? `<p style="margin: 4px 0;"><strong>Budget estimé :</strong> ${budget_estime}</p>` : ""}
          ${delai_souhaite ? `<p style="margin: 4px 0;"><strong>Délai souhaité :</strong> ${delai_souhaite}</p>` : ""}
        </div>
        <p style="color: #687C68;">À très bientôt,<br><strong>L'équipe Habitat Solidaire</strong></p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #9ca3af;">49C rue de la Fabrique, 59176 Masny — 03 74 47 27 33</p>
      </div>
    `,
  });

  // Notification admin
  const adminTo = [ADMIN_EMAIL, "must.fattah@gmail.com"].filter(Boolean) as string[];
  await resend.emails.send({
    from: "Habitat Solidaire <noreply@digible.fr>",
    to: adminTo,
    replyTo: email,
    subject: `[Projet] ${nom_projet} — ${association_name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f8f5; border-radius: 12px;">
        <h2 style="color: #2F4537; margin-bottom: 4px;">Nouvelle soumission de projet</h2>
        <p style="color: #687C68; font-size: 13px; margin-bottom: 24px;">Reçue via le formulaire projets associatifs</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888; width: 160px;">Association</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A; font-weight: 600;">${association_name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">
              <a href="mailto:${email}" style="color: #D9825B;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Nom du projet</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A; font-weight: 600;">${nom_projet}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Public cible</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">${public_cible}</td>
          </tr>
          ${budget_estime ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Budget estimé</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">${budget_estime}</td>
          </tr>` : ""}
          ${delai_souhaite ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Délai souhaité</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">${delai_souhaite}</td>
          </tr>` : ""}
          ${partenaires ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Partenaires</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">${partenaires}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top: 20px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e5e3dc;">
          <p style="font-size: 13px; color: #888; margin: 0 0 8px 0;">Description</p>
          <p style="font-size: 14px; color: #26302A; line-height: 1.6; margin: 0; white-space: pre-wrap;">${description}</p>
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <a href="https://habitat-solidaire.netlify.app/admin"
            style="display: inline-block; background: #2F4537; color: #fff; padding: 12px 24px; border-radius: 999px; font-size: 13px; font-weight: 600; text-decoration: none;">
            Voir dans l'administration
          </a>
        </div>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
