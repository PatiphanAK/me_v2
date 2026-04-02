"use client";
import React from "react";
import Image from "next/image";
import { Project } from "@/app/types/project/project.type";
import { isValidImageUrl } from "@/app/helpers/helper";

const flattenStack = (stack: Project["stack"]) => {
  if (!stack) return [];
  return Object.values(stack).flat().filter(Boolean);
};

const stripMarkdown = (text: string) => text.replace(/\*\*(.*?)\*\*/g, "$1");

interface ProjectCardProps {
  project: Project;
  variant?: "grid" | "list";
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = "grid",
}) => {
  const techList = flattenStack(project.stack);
  const techPreview = variant === "grid" ? techList.slice(0, 4) : techList;

  if (variant === "list") {
    return (
      <div
        className="
          group flex min-h-[160px]
          border border-[var(--border-muted)]
          bg-[var(--bg-elevated)]
          rounded-lg overflow-hidden
          transition
          hover:border-[var(--border)]
          hover:shadow-[0_0_12px_var(--glow-primary)]
        "
      >
        {/* IMAGE */}
        <div className="relative w-48 flex-shrink-0 border-r border-[var(--border-muted)] overflow-hidden">
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
          <div className="absolute top-1.5 left-1.5">
            <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--border-muted)] bg-[var(--bg-base)]">
              {project.status}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 gap-4 min-w-0 p-3">
          {/* LEFT */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div>
              <h3 className="font-mono text-xs text-[var(--text-primary)] truncate">
                {project.title}
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-0.5 leading-relaxed">
                {project.description}
              </p>
            </div>

            <ul className="text-[10px] text-[var(--text-muted)] font-mono space-y-0.5">
              {project.highlights?.slice(0, 3).map((h, i) => (
                <li key={i}>- {stripMarkdown(h)}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1">
              {techPreview.map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-[2px] border border-[var(--border-muted)] rounded font-mono text-[var(--text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 text-[11px] font-mono mt-auto pt-1">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition"
                >
                  [code]
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition"
                >
                  [live]
                </a>
              )}
            </div>
          </div>

          {/* RIGHT: metrics */}
          {project.metrics && (
            <div className="w-48 flex-shrink-0 flex flex-col gap-2 border-l border-[var(--border-muted)] pl-3">
              {Object.entries(project.metrics).map(([k, v]) => (
                <div
                  key={k}
                  className="font-mono text-[10px] flex flex-col gap-0.5"
                >
                  <span className="text-slate-500 uppercase tracking-wider">
                    {k.replace(/_/g, " ")}
                  </span>
                  <span className="text-[var(--accent)] line-clamp-3 leading-relaxed">
                    {stripMarkdown(v)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div
      className="
        group flex flex-col h-full
        border border-[var(--border-muted)]
        bg-[var(--bg-elevated)]
        rounded-lg overflow-hidden transition
        hover:border-[var(--border)]
        hover:-translate-y-1
        hover:shadow-[0_0_20px_var(--glow-primary)]
      "
    >
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
        <div className="absolute top-1.5 right-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--border-muted)] bg-[var(--bg-base)]">
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2.5 flex-1">
        <div>
          <h3 className="font-mono text-xs text-[var(--text-primary)] line-clamp-1">
            {project.title}
          </h3>
          <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-1">
            {project.description}
          </p>
        </div>

        <ul className="text-[10px] text-[var(--text-muted)] font-mono space-y-0.5">
          {project.highlights?.slice(0, 2).map((h, i) => (
            <li key={i}>- {stripMarkdown(h)}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1">
          {techPreview.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-[2px] border border-[var(--border-muted)] rounded font-mono text-[var(--text-muted)]"
            >
              {tech}
            </span>
          ))}
          {techList.length > 4 && (
            <span className="text-[10px] px-2 py-[2px] border border-[var(--border-muted)] rounded font-mono text-[var(--text-muted)]">
              +{techList.length - 4}
            </span>
          )}
        </div>

        {/* grid: only show short metrics (≤20 chars) */}
        {project.metrics && (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {Object.entries(project.metrics)
              .filter(([, v]) => stripMarkdown(v).length <= 20)
              .map(([k, v]) => (
                <div key={k} className="font-mono text-[10px] flex gap-1">
                  <span className="text-slate-500 uppercase tracking-wider">
                    {k.replace(/_/g, " ")}:
                  </span>
                  <span className="text-[var(--accent)]">
                    {stripMarkdown(v)}
                  </span>
                </div>
              ))}
          </div>
        )}

        <div className="mt-auto flex gap-3 pt-1.5 text-[11px] font-mono">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition"
            >
              [code]
            </a>
          )}
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition"
            >
              [live]
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
