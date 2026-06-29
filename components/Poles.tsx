import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Package, UtensilsCrossed, Lightbulb, Home } from "lucide-react";
import { BorderBeam } from "./BorderBeam";

const poles = [
  {
    id: 1,
    icon: Building2,
    label: "Pôle 1",
    title: "Centre associatif 600 m²",
    description:
      "Un lieu d'accueil et de coopération pour les associations partenaires. Réunions, formations, permanences et temps conviviaux.",
    features: ["Réunions & assemblées", "Ateliers & formations", "Permanences associatives", "Distributions & événements"],
    href: "#centre-associatif",
    gradient: "from-vert-profond/20 to-vert-sauge/10",
    iconBg: "bg-terracotta",
    iconColor: "text-blanc-doux",
    accentColor: "text-vert-profond",
    blob: "#2F453730",
    large: true,
  },
  {
    id: 2,
    icon: CalendarDays,
    label: "Pôle 2",
    title: "Réservation de salles",
    description: "Un calendrier en ligne pour demander un espace et suivre les disponibilités en temps réel.",
    href: "#reservation",
    gradient: "from-vert-sauge/20 to-vert-sauge/5",
    iconBg: "bg-terracotta",
    iconColor: "text-blanc-doux",
    accentColor: "text-vert-sauge",
    blob: "#687C6828",
    large: false,
  },
  {
    id: 3,
    icon: Package,
    label: "Pôle 3",
    title: "Gros lots de dons",
    description: "Réception, tri et dispatch gratuit aux associations partenaires selon les besoins du territoire.",
    href: "#dons",
    gradient: "from-terracotta/20 to-terracotta/5",
    iconBg: "bg-terracotta",
    iconColor: "text-blanc-doux",
    accentColor: "text-terracotta",
    blob: "#D9825B28",
    large: false,
  },
  {
    id: 4,
    icon: UtensilsCrossed,
    label: "Pôle 4",
    title: "Ateliers solidaires",
    description: "Cours de cuisine, lien social, savoir-faire et actions conviviales régulières pour créer du lien.",
    href: "#ateliers",
    gradient: "from-terracotta/15 to-vert-sauge/10",
    iconBg: "bg-terracotta",
    iconColor: "text-blanc-doux",
    accentColor: "text-terracotta",
    blob: "#D9825B20",
    large: false,
  },
  {
    id: 5,
    icon: Lightbulb,
    label: "Pôle 5",
    title: "Financement de projets",
    description: "Aide à la réalisation d'initiatives associatives locales et utiles pour les publics fragiles.",
    href: "#projets",
    gradient: "from-vert-sauge/20 to-vert-profond/10",
    iconBg: "bg-terracotta",
    iconColor: "text-blanc-doux",
    accentColor: "text-vert-sauge",
    blob: "#687C6828",
    large: false,
  },
  {
    id: 6,
    icon: Home,
    label: "Pôle 6",
    title: "Logements rebond",
    description: "Logements temporaires, dignes et sécurisés pour se poser, se reconstruire et repartir.",
    href: "#logements",
    gradient: "from-vert-profond/20 to-vert-profond/8",
    iconBg: "bg-terracotta",
    iconColor: "text-blanc-doux",
    accentColor: "text-vert-profond",
    blob: "#2F453730",
    large: false,
  },
];

const glassStyle = {
  background: "rgba(255,253,248,0.45)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.65)",
  boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
};

export function Poles() {
  const [large, ...rest] = poles;
  const Icon = large.icon;

  return (
    <section id="nos-actions" className="relative bg-blanc-doux py-28 px-6 overflow-hidden">

      {/* ── Blobs ── */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #687C6840 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #D9825B30 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div aria-hidden="true" className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #2F453720 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14 text-center md:text-left">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Nos pôles d'action
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-4xl md:text-5xl leading-tight">
            Un lieu, six façons<br className="hidden md:block" /> d'agir{" "}
            <span className="bg-vert-profond/12 text-vert-profond px-2 py-0.5 rounded-lg">ensemble.</span>
          </h2>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* Grande carte — Centre associatif */}
          <div
            className="group relative rounded-3xl p-7 flex flex-col gap-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 md:col-span-2 md:row-span-2"
            style={glassStyle}
          >
            <BorderBeam duration={8} delay={0} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className={`absolute inset-0 bg-gradient-to-br ${large.gradient} opacity-60 rounded-3xl pointer-events-none`} />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${large.blob} 0%, transparent 70%)`, filter: "blur(24px)" }} />

            {/* Icon */}
            <div className={`relative w-12 h-12 ${large.iconBg} rounded-2xl flex items-center justify-center shadow-sm`}>
              <Icon className={large.iconColor} size={22} strokeWidth={1.8} />
            </div>

            <div className="relative flex-1">
              <span className="inline-block bg-terracotta/10 text-terracotta/70 rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase font-manrope">{large.label}</span>
              <h3 className="font-epilogue font-bold text-anthracite text-2xl mt-1 mb-3">{large.title}</h3>
              <p className="text-anthracite/75 leading-relaxed text-sm font-manrope mb-6">{large.description}</p>

              {/* Feature list */}
              <ul className="flex flex-col gap-2">
                {large.features!.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-anthracite/70 font-manrope">
                    <span className="w-1.5 h-1.5 rounded-full bg-vert-profond/50 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link href={large.href}
              className="relative self-start inline-flex items-center gap-2 bg-anthracite hover:bg-anthracite/85 text-blanc-doux text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 font-manrope group-hover:gap-3">
              En savoir plus <ArrowRight size={14} />
            </Link>
          </div>

          {/* 5 cartes normales */}
          {rest.map((pole, i) => {
            const PoleIcon = pole.icon;
            return (
              <div
                key={pole.id}
                className="group relative rounded-3xl p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={glassStyle}
              >
                <BorderBeam duration={7} delay={i * 1.2} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${pole.gradient} opacity-60 rounded-3xl pointer-events-none`} />
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${pole.blob} 0%, transparent 70%)`, filter: "blur(16px)" }} />

                <div className={`relative w-11 h-11 ${pole.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                  <PoleIcon className={pole.iconColor} size={19} strokeWidth={1.8} />
                </div>

                <div className="relative flex-1">
                  <span className="inline-block bg-terracotta/10 text-terracotta/70 rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase font-manrope">{pole.label}</span>
                  <h3 className="font-epilogue font-bold text-anthracite text-lg mt-1 mb-2">{pole.title}</h3>
                  <p className="text-anthracite/75 leading-relaxed text-sm font-manrope">{pole.description}</p>
                </div>

                <Link href={pole.href}
                  className="relative self-start inline-flex items-center gap-2 bg-anthracite hover:bg-anthracite/85 text-blanc-doux text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 font-manrope group-hover:gap-3">
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
