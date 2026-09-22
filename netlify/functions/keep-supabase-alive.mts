// Fonction planifiée Netlify : interroge Supabase chaque jour pour éviter
// la mise en pause automatique du projet (plan gratuit : pause après 7 jours
// d'inactivité). La requête lit une seule ligne, sans rien modifier.

export default async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("keep-supabase-alive : variables Supabase manquantes");
    return new Response("Configuration manquante", { status: 500 });
  }

  const res = await fetch(`${url}/rest/v1/reservations?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });

  if (!res.ok) {
    console.error(`keep-supabase-alive : Supabase a répondu ${res.status}`);
    return new Response(`Supabase ${res.status}`, { status: 500 });
  }

  console.log("keep-supabase-alive : Supabase actif");
  return new Response("OK");
};

// Tous les jours à 6h UTC
export const config = { schedule: "0 6 * * *" };
