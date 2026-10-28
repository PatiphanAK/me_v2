"use client";
import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import { withBasePath } from "@/app/helpers/helper";
import Terminal from "@/app/components/Molecules/About/Terminal";
import StatsGrid from "@/app/components/Molecules/About/StatsGrid";
import VizPanel from "@/app/components/Molecules/About/VizPanel";

// ─── CONFIG ─────────────────────────────────────────────

const PROFILE = {
  name: "Patiphan Akkahadsri",
  location: "Bangkok, TH",
  status: "Open to opportunities",
  avatar: "/assets/me/me.jpg",
  headline: {
    text: "Intelligent systems, from algorithms to",
    accent: "infrastructure.",
  },
  bio: "Information Technology student with internship experience in backend systems and data workflows. Interested in open-source, cloud-native architecture, and building scalable, reliable systems — from low-level Unix environments to distributed infrastructure.",
};

const STATS = [
  { value: "Internship", label: "Experience" },
  { value: "5+", label: "Projects" },
  { value: "Cloud Native", label: "Focus" },
];

const TERMINAL_LINES: { text: string; type: "cmd" | "out" }[] = [
  { text: "patiphan@portfolio:~$ whoami", type: "cmd" },
  { text: "programmer", type: "out" },
  { text: "patiphan@portfolio:~$ cat focus.txt", type: "cmd" },
  { text: "pipelines · distributed systems · cloud-native", type: "out" },
  { text: "patiphan@portfolio:~$ █", type: "cmd" },
];

const CURRENTLY = [
  { label: "building", value: "data pipelines on Kubernetes" },
  { label: "learning", value: "distributed systems & data mesh" },
];

const INTERESTS = [
  {
    label: "academic",
    items: [
      "Convex Optimization & Operations Research",
      "Fuzzy Systems & Evolutionary Computation",
      "Computer Vision & Digital Signal Processing",
      "Machine Learning & Statistical Learning",
    ],
  },
  {
    label: "practical",
    items: [
      "AI/ML Systems Engineering",
      "Internal Developer Platforms (IDPs)",
      "Cloud-Native Infrastructure & Kubernetes",
      "Distributed Systems & Resource Scheduling",
      "DevOps & MLOps Engineering",
    ],
  },
];

const CREDLY_URL =
  "https://www.credly.com/users/patiphan-akkahadsri.41c7b44d";

const CTA = [
  {
    label: "explore systems →",
    href: "#projects",
    variant: "primary" as const,
  },
  { label: "contact", href: "#contact", variant: "ghost" as const },
];

const AVATAR_SIZE = 88;

// ─── MAIN ───────────────────────────────────────────────

export default function About() {
  return (
    <section
      className="relative min-h-screen pt-8 md:pt-10 lg:pt-12 pb-16"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      {/* grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent-dim) 1px, transparent 1px), linear-gradient(90deg, var(--accent-dim) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        <p className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] mb-6 lg:mb-8">
          ./about
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── LEFT ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* profile */}
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  border: "1px solid var(--border)",
                }}
                className="overflow-hidden "
              >
                <Image
                  src={withBasePath(PROFILE.avatar)}
                  alt={PROFILE.name}
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <p className="font-mono font-semibold">{PROFILE.name}</p>
                <p className="text-sm text-[var(--text-muted)]">
                  {PROFILE.location}
                </p>
                <span
                  className="text-xs mt-2 inline-block px-2 py-1"
                  style={{
                    border: "1px solid var(--accent-dim)",
                    color: "var(--accent)",
                  }}
                >
                  {PROFILE.status}
                </span>
              </div>
            </div>

            {/* terminal */}
            <Terminal lines={TERMINAL_LINES} speed={500} />

            {/* visualizations */}
            <VizPanel />

            {/* stats */}
            <StatsGrid stats={STATS} />
          </div>
          {/* ── RIGHT ── */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* headline */}
            <h1 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] max-w-3xl text-balance lg:-mt-1">
              {PROFILE.headline.text}{" "}
              <span className="text-[var(--accent)]">
                {PROFILE.headline.accent}
              </span>
            </h1>

            {/* bio */}
            <p className="text-sm leading-7 text-[var(--text-secondary)] max-w-2xl">
              {PROFILE.bio}
            </p>

            <div className="h-px bg-[var(--border-muted)]" />

            {/* currently */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                currently
              </p>

              <div className="flex flex-col gap-3">
                {CURRENTLY.map((item) => (
                  <div key={item.label} className="flex gap-4 text-sm">
                    <span className="w-28 text-right text-[var(--text-secondary)]">
                      {item.label}
                    </span>
                    <span className="border-l pl-4 text-[var(--text-muted)] border-[var(--border-muted)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* interests */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                interests
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {INTERESTS.map((group) => (
                  <div key={group.label}>
                    <p className="font-mono text-sm text-[var(--text-secondary)] mb-2">
                      {group.label}
                    </p>
                    <ul className="flex flex-col gap-1.5 border-l pl-4 border-[var(--border-muted)]">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-[var(--text-muted)]"
                        >
                          <span className="text-[var(--accent)] opacity-70">
                            ▹
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* credentials */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                certifications &amp; credentials
              </p>

              <a
                href={CREDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition"
              >
                <Award size={16} className="text-[var(--accent)]" />
                verified badges on Credly
                <ExternalLink
                  size={12}
                  className="opacity-60 group-hover:opacity-100 transition"
                />
              </a>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              {CTA.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  className="px-5 py-2 font-mono text-sm transition"
                  style={
                    c.variant === "primary"
                      ? {
                          background: "var(--accent)",
                          color: "#05070d",
                        }
                      : {
                          border: "1px solid var(--border)",
                          color: "var(--text-secondary)",
                        }
                  }
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
