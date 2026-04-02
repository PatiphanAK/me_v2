"use client";
import Link from "next/link";
import clsx from "clsx";

interface NavItemProps {
  index: number;
  label: string;
  href: string;
  isScroll?: boolean;
  isActive: boolean;
  onClick: () => void;
}

export default function NavItem({
  index,
  label,
  href,
  isScroll,
  isActive,
  onClick,
}: NavItemProps) {
  const num = String(index).padStart(2, "0");

  const handleClick = (e: React.MouseEvent) => {
    if (isScroll) {
      e.preventDefault();
      const hash = href.replace("/#", "#");
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "group flex items-center gap-1.5 px-3 py-1.5 rounded-md",
        "font-mono text-[11px] font-semibold tracking-[1.5px] uppercase",
        "border transition-all duration-200 select-none",

        // active
        isActive &&
          "text-[var(--accent-primary)] border-[var(--accent-primary)] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] shadow-[0_0_12px_var(--glow-primary)]",

        // inactive
        !isActive &&
          "text-[var(--text-dim)] border-transparent hover:text-[var(--text-main)] hover:border-[var(--nav-border)] hover:bg-[color-mix(in_srgb,var(--accent-primary)_6%,transparent)]",
      )}
    >
      <span
        className={clsx(
          "text-[9px] italic font-normal transition",
          isActive
            ? "text-[var(--accent-primary)] opacity-80"
            : "text-[var(--text-dim)] opacity-50 group-hover:opacity-80",
        )}
      >
        {num}.
      </span>

      <span>{label}</span>
    </Link>
  );
}
