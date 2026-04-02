"use client";

type Stat = {
  value: string;
  label: string;
};

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div
      className="grid gap-px rounded-xl overflow-hidden"
      style={{
        background: "var(--border-muted)",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="py-6 px-4 flex flex-col items-center justify-center"
          style={{ background: "var(--bg-elevated)" }}
        >
          <p className="font-mono text-2xl text-[var(--accent)] leading-none">
            {s.value}
          </p>
          <p className="text-xs text-[var(--text-muted)] uppercase mt-2 tracking-wide">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
