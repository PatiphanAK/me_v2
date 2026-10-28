"use client";

import { useEffect, useRef, useState } from "react";

type FuzzySet = {
  label: string;
  // trapezoid corners [a, b, c, d]: rises a→b, flat b→c, falls c→d
  points: [number, number, number, number];
  color: string;
};

const SETS: FuzzySet[] = [
  { label: "low", points: [0, 0, 20, 45], color: "#3fb950" },
  { label: "medium", points: [25, 50, 50, 75], color: "#4f7cff" },
  { label: "high", points: [55, 80, 100, 100], color: "#a78bfa" },
];

const WIDTH = 300;
const HEIGHT = 120;
const PAD = 8;

const membership = (x: number, [a, b, c, d]: FuzzySet["points"]) => {
  if (x < a || x > d) return 0;
  if (x >= b && x <= c) return 1;
  if (x < b) return (x - a) / (b - a);
  return (d - x) / (d - c);
};

const toX = (v: number) => PAD + (v / 100) * (WIDTH - PAD * 2);
const toY = (mu: number) => HEIGHT - PAD - mu * (HEIGHT - PAD * 2);

export default function FuzzyMembership({ active = true }: { active?: boolean }) {
  const [input, setInput] = useState(35);
  const [auto, setAuto] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  // slow sweep until the visitor interacts
  useEffect(() => {
    if (!auto || !active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 6000;
      setInput(50 - 45 * Math.cos(t * Math.PI * 2));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [auto, active]);

  const updateFromPointer = (clientX: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = ((clientX - rect.left) / rect.width) * WIDTH;
    const value = ((ratio - PAD) / (WIDTH - PAD * 2)) * 100;
    setAuto(false);
    setInput(Math.min(100, Math.max(0, value)));
  };

  const degrees = SETS.map((s) => ({ ...s, mu: membership(input, s.points) }));

  return (
    <div className="relative">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          fuzzy membership
        </span>
        <span className="text-xs text-[var(--text-secondary)]">
          load = {input.toFixed(0)}%
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto cursor-ew-resize touch-none select-none"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            updateFromPointer(e.clientX);
        }}
        aria-hidden="true"
      >
        {/* axis */}
        <line
          x1={PAD}
          x2={WIDTH - PAD}
          y1={toY(0)}
          y2={toY(0)}
          stroke="var(--border)"
        />
        <line
          x1={PAD}
          x2={WIDTH - PAD}
          y1={toY(1)}
          y2={toY(1)}
          stroke="var(--border-muted)"
          strokeDasharray="2 4"
        />

        {/* membership functions */}
        {degrees.map((s) => {
          const [a, b, c, d] = s.points;
          const path = `M${toX(a)},${toY(0)} L${toX(b)},${toY(1)} L${toX(c)},${toY(1)} L${toX(d)},${toY(0)}`;
          return (
            <g key={s.label}>
              <path
                d={`${path} Z`}
                fill={s.color}
                fillOpacity={0.06 + s.mu * 0.14}
              />
              <path
                d={path}
                fill="none"
                stroke={s.color}
                strokeWidth={1.5}
                strokeOpacity={0.4 + s.mu * 0.6}
              />
            </g>
          );
        })}

        {/* crisp input */}
        <line
          x1={toX(input)}
          x2={toX(input)}
          y1={toY(0)}
          y2={PAD / 2}
          stroke="var(--text-primary)"
          strokeOpacity={0.7}
          strokeDasharray="3 3"
        />
        {degrees
          .filter((s) => s.mu > 0)
          .map((s) => (
            <circle
              key={s.label}
              cx={toX(input)}
              cy={toY(s.mu)}
              r={3.5}
              fill={s.color}
            />
          ))}
      </svg>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(input)}
        onChange={(e) => {
          setAuto(false);
          setInput(Number(e.target.value));
        }}
        aria-label="Input value for fuzzy membership"
        className="sr-only"
      />

      {/* degrees */}
      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
        {degrees.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <span style={{ color: s.color }}>μ_{s.label}</span>
            <span className="text-[var(--text-secondary)] tabular-nums">
              {s.mu.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
