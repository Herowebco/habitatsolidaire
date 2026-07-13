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

  // Récupérer la réservation
  const { data: reservation, error: fetchError } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !reservation) {
    return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
  }

  // Mettre à jour le statut
  const { error: updateError } = await supabase
    .from("reservations")
    .update({ statut: action, note_admin: note || null })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }

  // Envoyer l'email au client
  const resend = new Resend(process.env.RESEND_API_KEY);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const dateDebutFmt = fmtDate(reservation.date_souhaitee);
  const dateFinFmt = reservation.date_fin ? fmtDate(reservation.date_fin) : null;
  const periodLabel = dateFinFmt && reservation.date_fin !== reservation.date_souhaitee
    ? `Du ${dateDebutFmt} au ${dateFinFmt}`
    : dateDebutFmt;

  if (action === "accepte") {
    await resend.emails.send({
      from: "Habitat Solidaire <noreply@digible.fr>",
      to: reservation.email,
      subject: "Votre réservation est confirmée ✓",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
          <h2 style="color: #2F4537;">Réservation confirmée ✓</h2>
          <p>Bonjour <strong>${reservation.association_name}</strong>,</p>
          <p>Bonne nouvelle ! Votre demande de réservation a été <strong style="color: #2F4537;">acceptée</strong>.</p>
          <div style="background: #F6F1E8; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Salle :</strong> ${reservation.salle}</p>
            <p style="margin: 4px 0;"><strong>Période :</strong> ${periodLabel}</p>
            <p style="margin: 4px 0;"><strong>Créneau :</strong> ${reservation.creneau}</p>
          </div>
          ${note ? `<p><strong>Message de l'équipe :</strong> ${note}</p>` : ""}
          <p>Nous vous attendons au <strong>49C rue de la Fabrique, 59176 Masny</strong>.</p>
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
      to: reservation.email,
      subject: "Votre demande de réservation",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
          <h2 style="color: #D9825B;">Demande non disponible</h2>
          <p>Bonjour <strong>${reservation.association_name}</strong>,</p>
          <p>Nous n'avons malheureusement pas pu confirmer votre demande pour le créneau suivant :</p>
          <div style="background: #F6F1E8; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Salle :</strong> ${reservation.salle}</p>
            <p style="margin: 4px 0;"><strong>Période :</strong> ${periodLabel}</p>
            <p style="margin: 4px 0;"><strong>Créneau :</strong> ${reservation.creneau}</p>
          </div>
          ${note ? `<p><strong>Message de l'équipe :</strong> ${note}</p>` : ""}
          <p>N'hésitez pas à nous recontacter pour proposer une autre date.</p>
          <p style="color: #687C68;">Cordialement,<br><strong>L'équipe Habitat Solidaire</strong></p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">03 74 47 27 33 — habitatsolidairenord@gmail.com</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ success: true, action });
}
