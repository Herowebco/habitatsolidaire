// Fond vert (collines) commun aux espaces connectés : connexion, admin, portail association.
// Fixé à l'écran pour rester visible même quand le contenu défile.
export function PortalBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10"
      style={{
        backgroundImage: "url('/hero-section.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center 60%",
      }}
    >
      <div className="absolute inset-0 bg-blanc-doux/55" />
    </div>
  );
}
