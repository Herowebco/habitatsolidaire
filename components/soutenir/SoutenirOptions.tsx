import { Heart, Users, Handshake, ArrowRight } from "lucide-react";

const options = [
  {
    icon: Heart,
    title: "Faire un don",
    desc: "Financez nos actions directement. Chaque euro est reversé sur le terrain.",
    color: "bg-terracotta",
    href: "#don",
  },
  {
    icon: Users,
    title: "Devenir bénévole",
    desc: "Donnez de votre temps pour aider, trier, animer ou accompagner.",
    color: "bg-vert-profond",
    href: "#benevole",
  },
  {
    icon: Handshake,
    title: "Devenir partenaire",
    desc: "Associations, entreprises, institutions : construisons ensemble.",
    color: "bg-vert-sauge",
    href: "#partenariat",
  },
];

const glassCard = {
  background: "rgba(255,253,248,0.70)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 32px rgba(47,69,55,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
};

export function SoutenirOptions() {
  return (
    <section className="relative bg-blanc-doux pb-6 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <a
              key={opt.title}
              href={opt.href}
              className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              style={glassCard}
            >
              <div className={`w-11 h-11 rounded-xl ${opt.color} flex items-center justify-center shadow-sm`}>
                <Icon className="text-blanc-doux" size={19} strokeWidth={1.8} />
              </div>
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-epilogue font-bold text-anthracite text-lg mb-1">{opt.title}</h3>
                <p className="text-anthracite/75 text-sm font-manrope leading-relaxed">{opt.desc}</p>
              </div>
              <div className={`self-start inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold font-manrope text-blanc-doux transition-all ${opt.color}`}>
                En savoir plus
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
