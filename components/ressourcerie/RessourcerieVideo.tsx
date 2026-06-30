export function RessourcerieVideo() {
  return (
    <section className="relative bg-blanc-doux py-20 px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(104,124,104,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-vert-sauge/12 text-vert-sauge rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase font-manrope mb-4">
            En vidéo
          </span>
          <h2 className="font-epilogue font-extrabold text-anthracite text-3xl md:text-4xl leading-tight mb-4">
            La ressourcerie{" "}
            <span className="bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-lg">en action.</span>
          </h2>
          <p className="text-anthracite/70 font-manrope max-w-xl mx-auto">
            Comment vos dons sont réceptionnés, triés et redistribués gratuitement aux associations du territoire.
          </p>
          <p className="text-anthracite/45 font-manrope text-sm mt-2">
            Vidéo réalisée par notre partenaire{" "}
            <span className="font-semibold text-anthracite/60">Done</span>
          </p>
        </div>

        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,253,248,0.60)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.70)",
            boxShadow: "0 8px 40px rgba(47,69,55,0.12), inset 0 1px 0 rgba(255,255,255,0.85)",
            padding: "6px",
          }}
        >
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/W-ajECzeqVI"
              title="Habitat Solidaire — Ressourcerie et circuit du don"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
