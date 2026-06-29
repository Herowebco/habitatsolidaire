"use client";

interface BorderBeamProps {
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  duration = 6,
  delay = 0,
  colorFrom = "#D9825B",
  colorTo = "rgba(217,130,91,0)",
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{
        padding: "1px",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: `conic-gradient(transparent 0deg, ${colorFrom} 60deg, ${colorTo} 130deg, transparent 180deg)`,
          animation: `border-beam ${duration}s linear ${delay ? `${delay}s` : "0s"} infinite`,
        }}
      />
    </div>
  );
}
