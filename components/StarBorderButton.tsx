import Link from "next/link";
import { clsx } from "clsx";

interface StarBorderButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function StarBorderButton({ href, children, className }: StarBorderButtonProps) {
  return (
    <Link
      href={href}
      className={clsx("relative inline-flex rounded-full p-[2px] overflow-hidden group", className)}
    >
      {/* Rotating comet — terracotta partout, comète blanche qui tourne */}
      <span
        aria-hidden="true"
        className="absolute inset-[-100%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #D9825B 0%, #D9825B 45%, #ffffff 52%, #fff8e7 58%, #ffffff 64%, #D9825B 70%, #D9825B 100%)",
          animation: "star-spin 2s linear infinite",
        }}
      />
      {/* Bouton intérieur */}
      <span className="relative z-10 inline-flex items-center gap-2 bg-terracotta group-hover:bg-terracotta/95 text-blanc-doux font-semibold px-8 py-4 rounded-full text-base transition-colors">
        {children}
      </span>
    </Link>
  );
}
