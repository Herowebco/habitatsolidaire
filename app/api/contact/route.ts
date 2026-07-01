import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { nom, email, sujet, message } = body;

  if (!nom || !email || !sujet || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Habitat Solidaire <noreply@digible.fr>",
      to: [ADMIN_EMAIL, "must.fattah@gmail.com"],
      replyTo: email,
      subject: `[Contact] ${sujet} — ${nom}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f8f5; border-radius: 12px;">
          <h2 style="color: #2F4537; margin-bottom: 4px;">Nouveau message de contact</h2>
          <p style="color: #687C68; font-size: 13px; margin-bottom: 24px;">Reçu via le formulaire de contact du site</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888; width: 120px;">Nom</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A; font-weight: 600;">${nom}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">
                <a href="mailto:${email}" style="color: #D9825B;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Sujet</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A; font-weight: 600;">${sujet}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e5e3dc;">
            <p style="font-size: 13px; color: #888; margin: 0 0 8px 0;">Message</p>
            <p style="font-size: 14px; color: #26302A; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${sujet}"
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
