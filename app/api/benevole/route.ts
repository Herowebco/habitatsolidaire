import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { nom, email, disponibilites, message } = body;

  if (!nom || !email) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Habitat Solidaire <noreply@digible.fr>",
      to: [ADMIN_EMAIL, "must.fattah@gmail.com"],
      replyTo: email,
      subject: `[Bénévolat] Candidature de ${nom}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f8f5; border-radius: 12px;">
          <h2 style="color: #2F4537; margin-bottom: 4px;">Nouvelle candidature bénévole</h2>
          <p style="color: #687C68; font-size: 13px; margin-bottom: 24px;">Reçue via le formulaire "Je souhaite m'impliquer"</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888; width: 140px;">Nom</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A; font-weight: 600;">${nom}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">
                <a href="mailto:${email}" style="color: #D9825B;">${email}</a>
              </td>
            </tr>
            ${disponibilites ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Disponibilités</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">${disponibilites}</td>
            </tr>` : ""}
          </table>

          ${message ? `
          <div style="margin-top: 20px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e5e3dc;">
            <p style="font-size: 13px; color: #888; margin: 0 0 8px 0;">Message</p>
            <p style="font-size: 14px; color: #26302A; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>` : ""}

          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}?subject=Re: Votre candidature bénévole"
              style="display: inline-block; background: #2F4537; color: #fff; padding: 12px 24px; border-radius: 999px; font-size: 13px; font-weight: 600; text-decoration: none;">
              Répondre à ${nom}
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
