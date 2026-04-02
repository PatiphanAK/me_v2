"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { Project } from "@/app/types/project/project.type";
import { isValidImageUrl } from "@/app/helpers/helper";
import Link from "next/link"; // อย่าลืม Import

const ProjectLink = ({
  href,
  label,
}: {
  href?: string | null;
  label: string;
}) => {
  if (!href) return null;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-mono"
    >
      [{label}]
    </Link>
  );
};
// --- 1. Pure Helper Functions (Logic) ---
const utils = {
  flattenStack: (stack: Project["stack"]) =>
    stack ? Object.values(stack).flat().filter(Boolean) : [],

  stripMarkdown: (text: string) =>
    text ? text.replace(/\*\*(.*?)\*\*/g, "$1") : "",
};

// --- 2. Shared Atomic Components (UI) ---
const StatusBadge = ({ status }: { status: string }) => (
  <div className="absolute top-1.5 left-1.5 z-10">
    <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--border-muted)] bg-[var(--bg-base)]/80 backdrop-blur-sm">
      {status}
    </span>
  </div>
);

const TechBadge = ({ name }: { name: string }) => (
  <span className="text-[10px] px-2 py-[2px] border border-[var(--border-muted)] rounded font-mono text-[var(--text-muted)] bg-[var(--bg-base)]/30">
    {name}
  </span>
);

// --- 3. Refactored View Variants ---

const ProjectCardList = ({
  project,
  techList,
}: {
  project: Project;
  techList: string[];
}) => (
  <div className="group flex min-h-[160px] h-auto border border-[var(--border-muted)] bg-[var(--bg-elevated)] rounded-lg overflow-hidden transition hover:border-[var(--border)] hover:shadow-[0_0_12px_var(--glow-primary)]">
    {/* Image Container */}
    <div className="relative w-48 flex-shrink-0 border-r border-[var(--border-muted)] bg-black/20">
      {isValidImageUrl(project.image) ? (
        <Image
          src={project.image!}
          alt={project.title}
          fill
          className="object-cover opacity-80 transition group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[10px] text-[var(--text-muted)] font-mono">
          no preview
        </div>
      )}
      <StatusBadge status={project.status} />
    </div>

    {/* Content Container */}
    <div className="flex flex-1 gap-4 p-4 min-w-0">
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div>
          <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] truncate">
            {project.title}
          </h3>
          <p className="text-[11px] text-[var(--text-muted)] line-clamp-3 mt-1 leading-relaxed">
            {project.description}
          </p>
        </div>

        <ul className="text-[10px] text-[var(--text-muted)] font-mono space-y-1">
          {project.highlights?.slice(0, 3).map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[var(--accent)] opacity-70">▹</span>{" "}
              {utils.stripMarkdown(h)}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1 mt-auto">
          {techList.map((tech, i) => (
            <TechBadge key={i} name={tech} />
          ))}
        </div>

        <div className="flex gap-3 text-[11px] pt-1">
          <ProjectLink href={project.links?.github} label="code" />
          <ProjectLink href={project.links?.demo} label="live" />
        </div>
      </div>

      {/* Metrics Section (Right) */}
      {project.metrics && (
        <div className="w-56 flex-shrink-0 flex flex-col gap-4 border-l border-[var(--border-muted)] pl-4 py-1 bg-[var(--bg-base)]/10">
          {Object.entries(project.metrics).map(([k, v]) => (
            <div key={k} className="font-mono text-[10px] flex flex-col gap-1">
              <span className="text-slate-500 uppercase tracking-widest text-[9px]">
                {k.replace(/_/g, " ")}
              </span>
              <span className="text-[var(--accent)] leading-relaxed break-words">
                {utils.stripMarkdown(v)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const ProjectCardGrid = ({
  project,
  techList,
}: {
  project: Project;
  techList: string[];
}) => (
  <div className="group flex flex-col h-full border border-[var(--border-muted)] bg-[var(--bg-elevated)] rounded-lg overflow-hidden transition hover:border-[var(--border)] hover:-translate-y-1 hover:shadow-[0_0_20px_var(--glow-primary)]">
    <div className="relative aspect-[16/9] border-b border-[var(--border-muted)] overflow-hidden">
      {isValidImageUrl(project.image) ? (
        <Image
          src={project.image!}
          alt={project.title}
          fill
          className="object-cover opacity-80 transition group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[10px] text-[var(--text-muted)] font-mono">
          no preview
        </div>
      )}
      <StatusBadge status={project.status} />
    </div>

    <div className="p-4 flex flex-col gap-3 flex-1">
      <h3 className="font-mono text-sm text-[var(--text-primary)] line-clamp-1 font-bold">
        {project.title}
      </h3>
      <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1">
        {techList.slice(0, 4).map((tech, i) => (
          <TechBadge key={i} name={tech} />
        ))}
        {techList.length > 4 && (
          <span className="text-[9px] text-slate-600 self-center">
            +{techList.length - 4} more
          </span>
        )}
      </div>

      <div className="mt-auto flex justify-between items-center pt-3 border-t border-[var(--border-muted)]/50">
        <div className="flex gap-3 text-[11px]">
          <ProjectLink href={project.links?.github} label="code" />
          <ProjectLink href={project.links?.demo} label="live" />
        </div>
      </div>
    </div>
  </div>
);

// --- 4. Main Component (Dispatcher) ---

interface ProjectCardProps {
  project: Project;
  variant?: "grid" | "list";
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = "grid",
}) => {
  const techList = useMemo(
    () => utils.flattenStack(project.stack),
    [project.stack],
  );

  return variant === "list" ? (
    <ProjectCardList project={project} techList={techList} />
  ) : (
    <ProjectCardGrid project={project} techList={techList} />
  );
};
