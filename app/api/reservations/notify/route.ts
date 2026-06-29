import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  // Vérification du secret webhook
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const payload = await req.json();

  // Supabase envoie { type, table, record, old_record }
  const { type, record, old_record } = payload;

  if (type !== "UPDATE") {
    return NextResponse.json({ skipped: true });
  }

  // On réagit uniquement si le statut a changé
  if (record.statut === old_record.statut) {
    return NextResponse.json({ skipped: true });
  }

  // Uniquement accepte ou refuse
  if (!["accepte", "refuse"].includes(record.statut)) {
    return NextResponse.json({ skipped: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const dateFormatted = new Date(record.date_souhaitee).toLocaleDateString("fr-FR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  if (record.statut === "accepte") {
    await resend.emails.send({
      from: "Habitat Solidaire <noreply@digible.fr>",
      to: record.email,
      subject: "Votre réservation est confirmée",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
          <h2 style="color: #2F4537;">Réservation confirmée ✓</h2>
          <p>Bonjour <strong>${record.association_name}</strong>,</p>
          <p>Bonne nouvelle ! Votre demande de réservation a été <strong style="color: #2F4537;">acceptée</strong>.</p>
          <div style="background: #F6F1E8; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Salle :</strong> ${record.salle}</p>
            <p style="margin: 4px 0;"><strong>Date :</strong> ${dateFormatted}</p>
            <p style="margin: 4px 0;"><strong>Créneau :</strong> ${record.creneau}</p>
          </div>
          ${record.note_admin ? `<p><strong>Message de l'équipe :</strong> ${record.note_admin}</p>` : ""}
          <p>Nous vous attendons au <strong>49C rue de la Fabrique, 59176 Masny</strong>.</p>
          <p style="color: #687C68;">À très bientôt,<br><strong>L'équipe Habitat Solidaire</strong></p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">03 74 47 27 33 — habitatsolidairenord@gmail.com</p>
        </div>
      `,
    });
  }

  if (record.statut === "refuse") {
    await resend.emails.send({
      from: "Habitat Solidaire <noreply@digible.fr>",
      to: record.email,
      subject: "Votre demande de réservation",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
          <h2 style="color: #D9825B;">Demande non disponible</h2>
          <p>Bonjour <strong>${record.association_name}</strong>,</p>
          <p>Nous n'avons malheureusement pas pu confirmer votre demande pour le créneau suivant :</p>
          <div style="background: #F6F1E8; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Salle :</strong> ${record.salle}</p>
            <p style="margin: 4px 0;"><strong>Date :</strong> ${dateFormatted}</p>
            <p style="margin: 4px 0;"><strong>Créneau :</strong> ${record.creneau}</p>
          </div>
          ${record.note_admin ? `<p><strong>Message de l'équipe :</strong> ${record.note_admin}</p>` : ""}
          <p>N'hésitez pas à nous recontacter pour proposer une autre date.</p>
          <p style="color: #687C68;">Cordialement,<br><strong>L'équipe Habitat Solidaire</strong></p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">03 74 47 27 33 — habitatsolidairenord@gmail.com</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ success: true, statut: record.statut });
}
