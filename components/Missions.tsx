import Link from "next/link";
import { ArrowRight, Home, Heart, Users } from "lucide-react";

const missions = [
  {
    icon: Home,
    gradient: "from-vert-profond/20 to-vert-sauge/10",
    iconBg: "bg-vert-profond/15",
    iconColor: "text-vert-profond",
    accentColor: "text-vert-profond",
    title: "Héberger",
    description:
      "Offrir un logement digne et temporaire à celles et ceux qui en ont besoin. Chaque personne accueillie repart avec un projet de vie.",
    href: "#heberger",
  },
  {
    icon: Heart,
    gradient: "from-terracotta/20 to-terracotta/5",
    iconBg: "bg-terracotta/15",
    iconColor: "text-terracotta",
    accentColor: "text-terracotta",
    title: "Accompagner",
    description:
      "Soutenir les personnes dans leurs démarches et leur reconstruction. Nos bénévoles sont présents à chaque étape du parcours.",
    href: "#accompagner",
  },
  {
    icon: Users,
    gradient: "from-vert-sauge/20 to-vert-sauge/5",
    iconBg: "bg-vert-sauge/15",
    iconColor: "text-vert-sauge",
    accentColor: "text-vert-sauge",
    title: "Mobiliser",
    description:
      "Fédérer les habitants et les partenaires autour de projets solidaires qui renforcent le tissu associatif local.",
    href: "#mobiliser",
  },
];

export function Missions() {
  return (
    <section id="nos-actions" className="relative bg-blanc-doux py-28 px-6 overflow-hidden">

      {/* ── Blobs décoratifs pour que le glassmorphisme ait du fond ── */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #687C6840 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #D9825B30 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2F453718 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-semibold text-vert-sauge uppercase tracking-widest font-manrope">
            Nos missions
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-4xl md:text-5xl leading-tight">
            Ce que nous faisons,<br className="hidden md:block" /> chaque jour.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <div
                key={mission.title}
                className="group relative rounded-3xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  background: "rgba(255,253,248,0.45)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                {/* Top inner shine */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                {/* Gradient tint de fond */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mission.gradient} opacity-60 rounded-3xl pointer-events-none`} />

                {/* Icon */}
                <div className={`relative w-12 h-12 ${mission.iconBg} rounded-2xl flex items-center justify-center`}
                  style={{ backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.5)" }}>
                  <Icon className={mission.iconColor} size={21} strokeWidth={1.8} />
                </div>

                <div className="relative flex-1">
                  <h3 className="font-epilogue font-bold text-anthracite text-xl mb-2.5">
                    {mission.title}
                  </h3>
                  <p className="text-anthracite/60 leading-relaxed text-sm font-manrope">
                    {mission.description}
                  </p>
                </div>

                <Link
                  href={mission.href}
                  className={`relative inline-flex items-center gap-1.5 text-sm font-semibold ${mission.accentColor} group-hover:gap-3 transition-all duration-200 font-manrope`}
                >
                  En savoir plus
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
