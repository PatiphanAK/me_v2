"use client";

import React from "react";
import { Cpu, Database, Cloud, Wrench, Brain } from "lucide-react";

import sections from "../../data/skill/sections.json";

import programming from "@/app/data/skill/programming.json";
import modeling from "@/app/data/skill/modeling.json";
import proxy from "@/app/data/skill/proxy.json";
import edge from "@/app/data/skill/edge.json";
import system from "@/app/data/skill/system.json";
import cloud from "@/app/data/skill/cloud.json";
import mlops from "@/app/data/skill/mlops.json";
import data_processing from "@/app/data/skill/data_processing.json";
import distributed from "@/app/data/skill/distributed.json";
import containers from "@/app/data/skill/containers.json";
import backend from "@/app/data/skill/back.json";
import database from "@/app/data/skill/database.json";
import infra from "@/app/data/skill/infra.json";
import devtool from "@/app/data/skill/devtool.json";
import streaming from "@/app/data/skill/streaming.json";
import llm from "@/app/data/skill/llm.json";
// ─── ICON MAP ─────────────────────────────────────────

const ICON_MAP = {
  cpu: <Cpu size={16} />,
  database: <Database size={16} />,
  cloud: <Cloud size={16} />,
  wrench: <Wrench size={16} />,
  brain: <Brain size={16} />,
} as const;

// ─── DATA MAP ─────────────────────────────────────────

const DATA_MAP = {
  programming,
  backend,
  database,
  infra,
  devtool,
  data_processing,
  streaming,
  distributed,
  mlops,
  containers,
  proxy,
  modeling,
  edge,
  system,
  cloud,
  llm,
} as const;

type DataKey = keyof typeof DATA_MAP;

// ─── SECTION CARD ─────────────────────────────────────

const Section = ({
  title,
  icon,
  description,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  items?: { name: string }[];
}) => {
  const safeItems = items ?? [];

  return (
    <div
      className="
        group flex flex-col h-full
        border border-[var(--border-muted)]
        bg-[var(--bg-elevated)]
        rounded-lg
        p-4
        hover:border-[var(--border)]
        hover:shadow-[0_0_20px_var(--glow-primary)]
        transition
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <div className="text-[var(--accent)] opacity-80 group-hover:opacity-100 transition">
          {icon}
        </div>

        <h2 className="text-sm font-mono text-[var(--text-primary)]">
          {title}
        </h2>
      </div>

      {/* DESCRIPTION */}
      <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
        {description}
      </p>

      {/* ITEMS */}
      <div className="flex flex-wrap gap-2">
        {safeItems.length === 0 ? (
          <span className="text-[10px] text-red-400">
            no data (check source)
          </span>
        ) : (
          safeItems.map((item, i) => (
            <span
              key={i}
              className="
                text-[10px] px-2 py-1
                border border-[var(--border-muted)]
                rounded
                font-mono
                text-[var(--text-muted)]
                hover:text-[var(--text-primary)]
                hover:border-[var(--border)]
                transition
              "
            >
              {item.name}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

// ─── MAIN ─────────────────────────────────────────────

export default function Skill() {
  return (
    <section
      className="relative min-h-screen px-6 py-20"
      style={{
        background: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* GRID BG */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-14">
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] mb-4">
            ./skills
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">./skills</h1>

          <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
            Focused on building scalable systems, data pipelines, and
            cloud-native infrastructure.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-4
          "
        >
          {sections.map((section, i) => {
            const key = section.source as DataKey;
            const items = DATA_MAP[key];

            // 🔥 debug ถ้ามีพัง
            if (!items) {
              console.error("Missing DATA_MAP key:", section.source);
            }

            return (
              <Section
                key={i}
                title={section.title}
                icon={
                  ICON_MAP[section.icon as keyof typeof ICON_MAP] ?? (
                    <Cpu size={16} />
                  )
                }
                description={section.description}
                items={items}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
