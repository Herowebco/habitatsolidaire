export function ContactMap() {
  return (
    <section className="bg-blanc-doux pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.65)",
            boxShadow: "0 8px 32px rgba(47,69,55,0.10)",
          }}
        >
          <iframe
            title="Habitat Solidaire - Masny"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.8!2d3.1!3d50.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2f5e5e5e5e5e5%3A0x0!2s49C+Rue+de+la+Fabrique%2C+59176+Masny!5e0!3m2!1sfr!2sfr!4v1"
            width="100%"
            height="380"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-center text-xs text-anthracite/35 font-manrope mt-4">
          49C rue de la Fabrique · 59176 Masny (centre associatif)
        </p>
      </div>
    </section>
  );
}
