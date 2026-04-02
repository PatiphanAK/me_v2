"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";
import clsx from "clsx";
import { NAV_ITEMS } from "@/app/types/navbar/nav.interface";
interface MobileMenuProps {
  isOpen: boolean;
  activeItem: string;
  onItemClick: (name: string, href: string, isScroll?: boolean) => void;
}

export default function MobileMenu({
  isOpen,
  activeItem,
  onItemClick,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // smoother open/close
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    } else {
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
      el.style.transform = "translateY(-6px)";
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      style={{
        maxHeight: 0,
        opacity: 0,
        transform: "translateY(-6px)",
        transition:
          "max-height .45s cubic-bezier(.16,1,.3,1), opacity .25s ease, transform .25s ease",
        overflow: "hidden",
      }}
      className="bg-[var(--nav-bg)] border-t border-[var(--nav-border)] backdrop-blur-xl"
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col gap-1 px-5 py-3 pb-6">
        {NAV_ITEMS.map((item) => {
          const isActive = activeItem === item.name;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.isScroll) e.preventDefault();
                onItemClick(item.name, item.href, item.isScroll);
              }}
              className={clsx(
                "group flex items-center gap-3 px-3.5 py-3 rounded-md",
                "font-mono text-[13px] font-semibold tracking-[1px] uppercase",
                "border transition-all duration-200",

                // active state
                isActive &&
                  "text-[var(--accent-primary)] bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] border-[var(--accent-primary)] shadow-[0_0_12px_var(--glow-primary)]",

                // default state
                !isActive &&
                  "text-[var(--text-dim)] border-transparent hover:text-[var(--text-main)] hover:bg-[color-mix(in_srgb,var(--accent-primary)_8%,transparent)] hover:border-[var(--nav-border)]",
              )}
            >
              <span className="text-base opacity-70 group-hover:opacity-100 transition">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* divider */}
        <div className="h-px bg-[var(--nav-border)] my-2 opacity-60" />

        {/* CTA */}
        <Link
          href="/#contact"
          onClick={(e) => {
            e.preventDefault();
            onItemClick("Contact", "/#contact", true);
          }}
          className={clsx(
            "block text-center py-3.5 rounded-md border",
            "font-mono font-bold text-[11px] tracking-[2px] uppercase",
            "transition-all duration-200",

            "border-[var(--accent-primary)] text-[var(--accent-primary)]",
            "hover:bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)]",
            "hover:shadow-[0_0_14px_var(--glow-primary)]",
          )}
        >
          Initiate Contact →
        </Link>
      </div>
    </div>
  );
}
