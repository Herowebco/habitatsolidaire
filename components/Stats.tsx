import { Users, Star, Handshake, Heart } from "lucide-react";

const stats = [
  { icon: Handshake, value: "67",    label: "partenaires engagés sur le territoire",     color: "text-vert-profond", blob: "#2F453728" },
  { icon: Users,     value: "1 700", label: "adhérents actifs",                           color: "text-vert-sauge",   blob: "#687C6828" },
  { icon: Heart,     value: "10 000",label: "bénéficiaires accompagnés",                  color: "text-terracotta",   blob: "#D9825B28" },
  { icon: Star,      value: "1M €",  label: "de dons reçus et redistribués gratuitement", color: "text-vert-profond", blob: "#2F453728" },
];

export function Stats() {
  return (
    <section className="relative bg-creme py-28 px-6 overflow-hidden">

      {/* ── Blobs ── */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #687C6835 0%, transparent 70%)", filter: "blur(90px)" }} />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #D9825B25 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2F453712 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="inline-block bg-terracotta/12 text-terracotta rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope">
            Nos chiffres clés
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite mt-3 text-3xl md:text-5xl leading-tight">
            L'impact en{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">chiffres.</span>
          </h2>
        </div>

        {/* Cards 2×2 → 4 colonnes desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative rounded-3xl p-6 flex flex-col gap-4 overflow-hidden"
                style={{
                  background: "rgba(255,253,248,0.40)",
                  backdropFilter: "blur(28px) saturate(200%)",
                  WebkitBackdropFilter: "blur(28px) saturate(200%)",
                  border: "1px solid rgba(255,255,255,0.70)",
                  boxShadow: "0 8px 32px rgba(47,69,55,0.07), inset 0 1px 0 rgba(255,255,255,0.85)",
                }}
              >
                {/* Top inner shine */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

                {/* Blob coloré par card */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${stat.blob} 0%, transparent 70%)`, filter: "blur(16px)" }} />

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.60)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.70)",
                  }}>
                  <Icon className={stat.color} size={17} strokeWidth={1.8} />
                </div>

                {/* Value */}
                <div>
                  <p className={`font-epilogue font-extrabold text-2xl md:text-4xl ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-anthracite/75 text-[11px] md:text-sm leading-snug mt-1.5 font-manrope">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
