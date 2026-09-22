import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

const SUBJECTS = [
  "Réservation de salle",
  "Don ou redistribution",
  "Partenariat associatif",
  "Logement rebond",
  "Atelier ou événement",
  "Autre demande",
];

// ── Anti-spam ────────────────────────────────────────────────
const MIN_FILL_TIME_MS = 3000; // un humain met plus de 3 s à remplir le formulaire
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimit = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (rateLimit.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  rateLimit.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

// Détecte les chaînes aléatoires type "AwZNEmawrqhiuDdH" ou "DFizDduvovvktLze" :
// un mot sans espace avec plusieurs majuscules éparpillées en son milieu.
// Les noms réels ("MacDonald", "Al-Rashid", "DUPONT") ne déclenchent pas.
function looksLikeGibberish(text: string) {
  const t = text.trim();
  if (/\s/.test(t)) return false;
  const letters = t.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 8 || letters === letters.toUpperCase()) return false;
  const innerCaps = (letters.slice(1).match(/[A-Z]/g) ?? []).length;
  return innerCaps >= 3;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Trop de tentatives, réessayez plus tard" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const nom = String(body.nom ?? "").trim();
  const email = String(body.email ?? "").trim();
  const sujet = String(body.sujet ?? "").trim();
  const message = String(body.message ?? "").trim();
  const website = String(body.website ?? ""); // honeypot
  const startedAt = Number(body.startedAt ?? 0);

  // Bots : on répond "ok" pour ne pas leur signaler le rejet
  const isBot =
    website !== "" ||
    !startedAt ||
    Date.now() - startedAt < MIN_FILL_TIME_MS ||
    looksLikeGibberish(nom) ||
    looksLikeGibberish(message);
  if (isBot) {
    return NextResponse.json({ ok: true });
  }

  if (!nom || !email || !sujet || !message) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  if (
    nom.length > 100 ||
    email.length > 200 ||
    message.length > 5000 ||
    !SUBJECTS.includes(sujet) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  ) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const safe = {
    nom: escapeHtml(nom),
    email: escapeHtml(email),
    sujet: escapeHtml(sujet),
    message: escapeHtml(message),
  };

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
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
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A; font-weight: 600;">${safe.nom}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A;">
                <a href="mailto:${safe.email}" style="color: #D9825B;">${safe.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 13px; color: #888;">Sujet</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e3dc; font-size: 14px; color: #26302A; font-weight: 600;">${safe.sujet}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e5e3dc;">
            <p style="font-size: 13px; color: #888; margin: 0 0 8px 0;">Message</p>
            <p style="font-size: 14px; color: #26302A; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safe.message}</p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${safe.email}?subject=Re: ${encodeURIComponent(sujet)}"
              style="display: inline-block; background: #2F4537; color: #fff; padding: 12px 24px; border-radius: 999px; font-size: 13px; font-weight: 600; text-decoration: none;">
              Répondre à ${safe.nom}
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
