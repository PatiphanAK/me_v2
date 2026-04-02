"use client";

import React, { useState, useMemo } from "react";
import { Search, Grid, List } from "lucide-react";
import {
  Project,
  ProjectCategory,
  ProjectStatus,
  FilterCategory,
  FilterStatus,
  ViewMode,
} from "@/app/types/project/project.type";
import { ProjectCard } from "@/app/components/Molecules/Card/ProjectCard";
import { projectData } from "@/app/data/project/project";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const projects: Project[] = projectData;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const q = searchTerm.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        project.categories.includes(categoryFilter as ProjectCategory);

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projects, searchTerm, statusFilter, categoryFilter]);

  return (
    <section
      className="min-h-screen relative"
      style={{
        background: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl font-semibold tracking-tight font-mono">
            ./projects
          </h1>
          <p className="text-[var(--text-secondary)] mt-3 max-w-xl">
            Selected work on distributed systems, data pipelines, and machine
            learning systems.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
          {/* Search */}
          <div
            className="
            flex items-center gap-2
            border border-[var(--border-muted)]
            rounded-lg px-3 py-2
            w-full md:w-80
            bg-[var(--bg-elevated)]
          "
          >
            <Search size={16} className="text-[var(--text-muted)]" />
            <input
              className="
                bg-transparent outline-none text-sm w-full
                text-[var(--text-primary)]
                placeholder:text-[var(--text-muted)]
              "
              placeholder="search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              className="
                bg-[var(--bg-elevated)]
                border border-[var(--border-muted)]
                px-3 py-2 rounded-lg text-sm
                text-[var(--text-secondary)]
              "
            >
              <option value="All">all status</option>
              {Object.values(ProjectStatus).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as FilterCategory)
              }
              className="
                bg-[var(--bg-elevated)]
                border border-[var(--border-muted)]
                px-3 py-2 rounded-lg text-sm
                text-[var(--text-secondary)]
              "
            >
              <option value="All">all categories</option>
              {Object.values(ProjectCategory).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* View toggle */}
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`
                p-2 rounded border
                ${
                  viewMode === "grid"
                    ? "bg-[var(--accent-dim)] text-[var(--text-primary)] border-[var(--accent-dim)]"
                    : "text-[var(--text-muted)] border-[var(--border-muted)]"
                }
              `}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`
                p-2 rounded border
                ${
                  viewMode === "list"
                    ? "bg-[var(--accent-dim)] text-[var(--text-primary)] border-[var(--accent-dim)]"
                    : "text-[var(--text-muted)] border-[var(--border-muted)]"
                }
              `}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* RESULT COUNT */}
        <div className="mb-8 text-sm text-[var(--text-muted)]">
          {filteredProjects.length} / {projects.length} projects
        </div>

        {/* PROJECT LIST */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-[var(--text-muted)]">
            no projects found.
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-3"
            }
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
