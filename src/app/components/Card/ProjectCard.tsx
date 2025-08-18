import React from "react";
import Image from "next/image";
import { Project } from "@/app/types/project/project.type";
import { isValidImageUrl } from "@/app/helpers/helper";
import { ChipColor, ChipVariant, Chip } from "../Atomic/Chip";

// Constants for Project Status Configuration
const PROJECT_STATUS_CONFIG: Record<
  Project["status"],
  { color: ChipColor; variant: ChipVariant; bgColor?: string }
> = {
  Active: { color: "success", variant: "soft" },
  "In-Progress": { color: "warning", variant: "soft" },
  Completed: { color: "info", variant: "soft" },
  Legacy: { color: "secondary", variant: "soft" },
} as const;

// Constants for Project Categories Configuration
const PROJECT_CATEGORIES_CONFIG: Record<
  string,
  { color: string; variant: ChipVariant }
> = {
  "Full Stack": {
    color: "#3B82F6",
    variant: "soft",
  },
  "Real-time App": {
    color: "#F59E0B",
    variant: "soft",
  },
  Backend: {
    color: "#6B7280",
    variant: "soft",
  },
  "AI/ML": {
    color: "#10B981",
    variant: "soft",
  },
  Notebook: {
    color: "#06B6D4",
    variant: "soft",
  },
  NLP: {
    color: "#EF4444",
    variant: "soft",
  },
  CV: {
    color: "#8B5CF6",
    variant: "soft",
  },
  default: {
    color: "#06B6D4",
    variant: "soft",
  },
} as const;

const TECH_STACK_CONFIG = {
  color: "primary" as ChipColor,
  variant: "soft" as ChipVariant,
  size: "xs" as const,
} as const;

const TECH_OVERFLOW_CONFIG = {
  color: "secondary" as ChipColor,
  variant: "soft" as ChipVariant,
  size: "xs" as const,
} as const;

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const statusConfig =
    PROJECT_STATUS_CONFIG[project.status] || PROJECT_STATUS_CONFIG["Legacy"];
  const categoryKey =
    Array.isArray(project.categories) && project.categories.length > 0
      ? project.categories[0]
      : typeof project.categories === "string"
      ? project.categories
      : "default";
  const categoryConfig =
    PROJECT_CATEGORIES_CONFIG[categoryKey] ||
    PROJECT_CATEGORIES_CONFIG["default"];

  return (
    <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 overflow-hidden hover:shadow-2xl hover:bg-white/80 transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        {isValidImageUrl(project.image) ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-200"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
          </>
        )}

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

        {/* Status Chip */}
        <div className="absolute top-4 right-4">
          <Chip
            color={statusConfig.color}
            variant={statusConfig.variant}
            size="xs"
            className="backdrop-blur-sm bg-white/10"
          >
            {project.status}
          </Chip>
        </div>

        {/* Category Chip */}
        <div className="absolute bottom-4 left-4">
          <div className="flex flex-wrap gap-2">
            {project.categories?.map((category, index) => {
              const categoryConfig =
                PROJECT_CATEGORIES_CONFIG[category] ||
                PROJECT_CATEGORIES_CONFIG["default"];
              return (
                <Chip
                  key={index}
                  color={categoryConfig.color}
                  variant={categoryConfig.variant}
                  size="xs"
                  className="backdrop-blur-sm bg-white/10"
                >
                  {category}
                </Chip>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech, index) => (
            <Chip
              key={index}
              color={TECH_STACK_CONFIG.color}
              variant={TECH_STACK_CONFIG.variant}
              size={TECH_STACK_CONFIG.size}
            >
              {tech}
            </Chip>
          ))}
          {project.techStack.length > 4 && (
            <Chip
              color={TECH_OVERFLOW_CONFIG.color}
              variant={TECH_OVERFLOW_CONFIG.variant}
              size={TECH_OVERFLOW_CONFIG.size}
            >
              +{project.techStack.length - 4}
            </Chip>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
            >
              View Live
            </a>
          )}
          {project.githubURL && (
            <a
              href={project.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border-2 border-cyan-400 text-cyan-600 px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-cyan-400 hover:text-white transition-all duration-300"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
