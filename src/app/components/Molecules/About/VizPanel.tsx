"use client";

import FuzzyMembership from "@/app/components/Molecules/About/FuzzyMembership";
import SignalSpectrum from "@/app/components/Molecules/About/SignalSpectrum";
import AdaptiveFuzzyNet from "@/app/components/Molecules/About/AdaptiveFuzzyNet";

const TABS = [
  { id: "signal", label: "signal", component: SignalSpectrum },
  { id: "fuzzy", label: "fuzzy", component: FuzzyMembership },
  { id: "anfis", label: "anfis", component: AdaptiveFuzzyNet },
] as const;

export type TabId = (typeof TABS)[number]["id"];

interface VizPanelProps {
  active: TabId;
  onChange: (id: TabId) => void;
}

export default function VizPanel({ active, onChange }: VizPanelProps) {

  return (
    <div
      className="font-mono text-sm rounded-xl"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-muted)",
      }}
    >
      <div
        role="tablist"
        aria-label="Visualizations"
        className="flex border-b border-[var(--border-muted)] text-xs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-2 transition border-b ${
              active === tab.id
                ? "text-[var(--accent)] border-[var(--accent)]"
                : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* panels share one grid cell so the card keeps the tallest height */}
      <div className="grid p-4">
        {TABS.map(({ id, component: Panel }) => (
          <div
            key={id}
            role="tabpanel"
            aria-hidden={active !== id}
            className={`[grid-area:1/1] ${active === id ? "" : "invisible"}`}
          >
            <Panel active={active === id} />
          </div>
        ))}
      </div>
    </div>
  );
}
