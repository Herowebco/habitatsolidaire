import Image from "next/image";
import { clsx } from "clsx";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export function Logo({ className, iconOnly = false, light = false }: LogoProps) {
  const textColor = light ? "text-blanc-doux" : "text-anthracite";

  return (
    <div className={clsx("flex items-center gap-2.5", className)}>
      <Image
        src="/Logo-habitat-solidaire.png"
        alt="Habitat Solidaire"
        width={36}
        height={36}
        style={light ? { filter: "brightness(0) invert(1)" } : undefined}
      />

      {!iconOnly && (
        <div className="leading-tight">
          <span className={clsx("block text-[15px] font-extrabold tracking-tight font-epilogue", textColor)}>
            Habitat
          </span>
          <span className={clsx("block text-[15px] font-extrabold tracking-tight font-epilogue", textColor)}>
            Solidaire
          </span>
        </div>
      )}
    </div>
  );
}
