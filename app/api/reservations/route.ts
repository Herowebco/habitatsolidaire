import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { association_name, email, salle, date_souhaitee, date_fin, creneau, motif } = body;

  // Validation basique
  if (!association_name || !email || !salle || !date_souhaitee || !date_fin || !creneau) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  // Validation des dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxStart = new Date();
  maxStart.setDate(maxStart.getDate() + 30);
  maxStart.setHours(23, 59, 59, 999);

  const start = new Date(date_souhaitee);
  const end = new Date(date_fin);

  if (start < today) {
    return NextResponse.json({ error: "La date de début ne peut pas être dans le passé." }, { status: 400 });
  }
  if (start > maxStart) {
    return NextResponse.json({ error: "La réservation est limitée à 30 jours à l'avance." }, { status: 400 });
  }
  if (end < start) {
    return NextResponse.json({ error: "La date de fin doit être après la date de début." }, { status: 400 });
  }

  const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 7) {
    return NextResponse.json({ error: "La durée de réservation est limitée à 7 jours maximum." }, { status: 400 });
  }

  // Insertion dans Supabase
  const { error } = await supabase.from("reservations").insert({
    association_name,
    email,
    salle,
    date_souhaitee,
    date_fin,
    creneau,
    motif: motif || null,
  });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
  }

  // Formatage des dates
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const dateDebutFmt = fmtDate(date_souhaitee);
  const dateFinFmt = fmtDate(date_fin);
  const dureeLabel = diffDays === 0 ? "1 jour" : `${diffDays + 1} jours`;
  const periodLabel = date_souhaitee === date_fin
    ? dateDebutFmt
    : `Du ${dateDebutFmt} au ${dateFinFmt} (${dureeLabel})`;

  // Email de confirmation au client
  await resend.emails.send({
    from: "Habitat Solidaire <noreply@digible.fr>",
    to: email,
    subject: "Votre demande de réservation a bien été reçue",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
        <h2 style="color: #2F4537;">Demande reçue ✓</h2>
        <p>Bonjour <strong>${association_name}</strong>,</p>
        <p>Votre demande de réservation a bien été enregistrée. Nous l'examinerons dans les meilleurs délais et vous répondrons sous 48h.</p>
        <div style="background: #F6F1E8; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <p style="margin: 4px 0;"><strong>Salle :</strong> ${salle}</p>
          <p style="margin: 4px 0;"><strong>Période :</strong> ${periodLabel}</p>
          <p style="margin: 4px 0;"><strong>Créneau :</strong> ${creneau}</p>
          ${motif ? `<p style="margin: 4px 0;"><strong>Motif :</strong> ${motif}</p>` : ""}
        </div>
        <p style="color: #687C68;">À très bientôt,<br><strong>L'équipe Habitat Solidaire</strong></p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #9ca3af;">49C rue de la Fabrique, 59176 Masny — 03 74 47 27 33</p>
      </div>
    `,
  });

  // Email de notification à l'admin
  await resend.emails.send({
    from: "Habitat Solidaire <noreply@digible.fr>",
    to: [ADMIN_EMAIL, "must.fattah@gmail.com"],
    subject: `Nouvelle demande de réservation - ${association_name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #26302A;">
        <h2 style="color: #D9825B;">Nouvelle demande de réservation</h2>
        <div style="background: #F6F1E8; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <p style="margin: 4px 0;"><strong>Association / Nom :</strong> ${association_name}</p>
          <p style="margin: 4px 0;"><strong>Email :</strong> ${email}</p>
          <p style="margin: 4px 0;"><strong>Salle :</strong> ${salle}</p>
          <p style="margin: 4px 0;"><strong>Période :</strong> ${periodLabel}</p>
          <p style="margin: 4px 0;"><strong>Créneau :</strong> ${creneau}</p>
          ${motif ? `<p style="margin: 4px 0;"><strong>Motif :</strong> ${motif}</p>` : ""}
        </div>
        <p>Pour valider ou refuser cette demande, rendez-vous dans votre dashboard Supabase et modifiez le champ <strong>statut</strong> de la réservation.</p>
        <a href="https://supabase.com/dashboard/project/chmzqfhzxwawgxntugnj/editor"
           style="display: inline-block; background: #2F4537; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 8px;">
          Ouvrir Supabase
        </a>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
