"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import FormulaRiver from "@/app/components/Molecules/Navbar/Formulariver";
import LogoIcon from "@/app/components/Molecules/Navbar/LogoIcon";
import NavItem from "@/app/components/Molecules/Navbar/NavItem";
import MobileMenu from "@/app/components/Molecules/Navbar/Mobilemenu";
import clsx from "clsx";
import { NAV_ITEMS } from "@/app/types/navbar/nav.interface";

function scrollTo(href: string) {
  const hash = href.startsWith("/#") ? href.slice(1) : href;
  document
    .querySelector(hash)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("About");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(
    (name: string, href: string, isScroll?: boolean) => {
      if (isScroll) scrollTo(href);
      setActiveItem(name);
      setMenuOpen(false);
    },
    [],
  );

  return (
    <header className="sticky top-0 z-50">
      {/* ── Formula River ── */}
      <FormulaRiver />

      {/* ── Main Bar ── */}
      <div
        className={clsx(
          "relative overflow-hidden backdrop-blur-xl border-b transition-shadow duration-300",
          "bg-[var(--nav-bg)] border-[var(--nav-border)]",
          scrolled && "shadow-[0_4px_30px_var(--nav-shadow)]",
        )}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Container */}
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 h-[62px] flex items-center justify-between">
          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 border rounded bg-[var(--logo-bg)] border-[var(--accent-primary)] transition-all duration-300 group-hover:border-[var(--accent-hover)] group-hover:shadow-[var(--glow-strong)]">
              <LogoIcon />
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-['Special_Elite'] text-[15px] text-[var(--text-main)] tracking-wide">
                Patiphan<span className="text-[var(--accent-hover)]">AK</span>
              </span>
              <span className="font-mono text-[9px] text-[var(--text-dim)] tracking-[2px] uppercase mt-0.5">
                Programmer
              </span>
            </div>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex flex-1 justify-center">
            {NAV_ITEMS.map((route, i) => (
              <NavItem
                key={route.name}
                index={i + 1}
                label={route.name}
                href={route.href}
                isScroll={route.isScroll}
                isActive={activeItem === route.name}
                onClick={() =>
                  handleNavClick(route.name, route.href, route.isScroll)
                }
              />
            ))}
          </nav>

          {/* ── CTA ── */}
          <Link
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Contact", "/#contact", true);
            }}
            className="hidden md:flex items-center px-4 py-2 border rounded text-[10px] font-mono font-bold tracking-[2px] uppercase transition-all duration-200 border-[var(--accent-primary)] text-[var(--accent-hover)] hover:border-[var(--accent-hover)] hover:text-[var(--text-main)] hover:shadow-[var(--glow-accent)]"
          >
            ⚗ Initiate
          </Link>

          {/* ── Mobile Button ── */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className={clsx(
              "md:hidden flex flex-col gap-[5px] p-[7px] border rounded transition",
              menuOpen
                ? "border-[var(--nav-border)]"
                : "border-transparent hover:border-[var(--nav-border)]",
            )}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-[2px] bg-[var(--text-main)] transition-all duration-300"
                style={{
                  transform: menuOpen
                    ? i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <MobileMenu
          isOpen={menuOpen}
          activeItem={activeItem}
          onItemClick={handleNavClick}
        />
      </div>
    </header>
  );
}
