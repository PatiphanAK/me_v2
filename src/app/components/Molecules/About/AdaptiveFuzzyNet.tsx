"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// First-order Sugeno ANFIS: one input t ∈ [0, 1], Gaussian memberships,
// linear consequents y_i = p_i·t + r_i trained online with LMS
// on noisy samples of a clean target signal.

const RULES = 9;
const CENTERS = Array.from({ length: RULES }, (_, i) => i / (RULES - 1));
const SIGMA = 0.6 / (RULES - 1);
const LEARNING_RATE = 0.5;
const NOISE = 0.25;
const MAX_STEPS = 4000;
const STEPS_PER_FRAME = 6;
const TRAIL = 28;
const CURVE_POINTS = 80;

const WIDTH = 300;
const HEIGHT = 110;
const MF_H = 18;
const PAD = 8;

const target = (t: number) =>
  0.55 * Math.sin(2 * Math.PI * (t + 0.1)) + 0.3 * Math.sin(2 * Math.PI * 3 * t);

const gaussian = () =>
  Math.sqrt(-2 * Math.log(1 - Math.random())) *
  Math.cos(2 * Math.PI * Math.random());

const firing = (t: number) => {
  const w = CENTERS.map((c) => Math.exp(-((t - c) ** 2) / (2 * SIGMA ** 2)));
  const total = w.reduce((a, b) => a + b, 0);
  return w.map((v) => v / total);
};

type Model = { p: number[]; r: number[]; step: number };

const newModel = (): Model => ({
  p: Array(RULES).fill(0),
  r: Array(RULES).fill(0),
  step: 0,
});

const predict = (m: Model, t: number) =>
  firing(t).reduce((y, w, i) => y + w * (m.p[i] * t + m.r[i]), 0);

const train = (m: Model, trail: [number, number][]) => {
  const t = Math.random();
  const y = target(t) + NOISE * gaussian();
  const e = y - predict(m, t);
  firing(t).forEach((w, i) => {
    m.p[i] += LEARNING_RATE * e * w * t;
    m.r[i] += LEARNING_RATE * e * w;
  });
  m.step++;
  trail.push([t, y]);
  if (trail.length > TRAIL) trail.shift();
};

const toX = (t: number) => PAD + t * (WIDTH - PAD * 2);
const toY = (v: number) => (HEIGHT - MF_H) / 2 - (v / 1.3) * ((HEIGHT - MF_H) / 2 - 4);

const curve = (f: (t: number) => number) =>
  Array.from({ length: CURVE_POINTS }, (_, i) => {
    const t = i / (CURVE_POINTS - 1);
    return `${i === 0 ? "M" : "L"}${toX(t).toFixed(1)},${toY(f(t)).toFixed(1)}`;
  }).join(" ");

export default function AdaptiveFuzzyNet({ active = true }: { active?: boolean }) {
  const model = useRef<Model>(newModel());
  const trail = useRef<[number, number][]>([]);
  const [, setFrame] = useState(0);
  const [run, setRun] = useState(0);

  const retrain = useCallback(() => {
    model.current = newModel();
    trail.current = [];
    setRun((r) => r + 1);
  }, []);

  useEffect(() => {
    if (!active) return;

    // reduced motion: train to convergence instantly and show the result
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      while (model.current.step < MAX_STEPS) train(model.current, trail.current);
      setFrame((f) => f + 1);
      return;
    }

    let frame: number;
    const tick = () => {
      for (let i = 0; i < STEPS_PER_FRAME; i++) train(model.current, trail.current);
      setFrame((f) => f + 1);
      if (model.current.step < MAX_STEPS) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, active]);

  const m = model.current;
  const rmse = Math.sqrt(
    Array.from({ length: CURVE_POINTS }, (_, i) => {
      const t = i / (CURVE_POINTS - 1);
      return (target(t) - predict(m, t)) ** 2;
    }).reduce((a, b) => a + b, 0) / CURVE_POINTS,
  );

  return (
    <div className="relative">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          adaptive neuro-fuzzy
        </span>
        <span className="text-xs text-[var(--text-secondary)] tabular-nums">
          rmse = {rmse.toFixed(3)}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* noisy samples */}
        {trail.current.map(([t, y], i) => (
          <circle
            key={i}
            cx={toX(t)}
            cy={toY(Math.max(-1.25, Math.min(1.25, y)))}
            r={1.75}
            fill="var(--text-muted)"
            fillOpacity={0.15 + (i / TRAIL) * 0.6}
          />
        ))}

        {/* clean target vs learned output */}
        <path
          d={curve(target)}
          fill="none"
          stroke="var(--text-muted)"
          strokeDasharray="3 3"
          strokeWidth={1}
        />
        <path
          d={curve((t) => predict(m, t))}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.75}
        />

        {/* fuzzy partition of the input */}
        {CENTERS.map((c, i) => (
          <path
            key={i}
            d={Array.from({ length: 25 }, (_, j) => {
              const t = c - 3 * SIGMA + (j / 24) * 6 * SIGMA;
              const mu = Math.exp(-((t - c) ** 2) / (2 * SIGMA ** 2));
              const x = toX(Math.max(0, Math.min(1, t)));
              const y = HEIGHT - 1 - mu * (MF_H - 4);
              return `${j === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(" ")}
            fill="none"
            stroke="#a78bfa"
            strokeOpacity={0.45}
            strokeWidth={1}
          />
        ))}
        <line
          x1={PAD}
          x2={WIDTH - PAD}
          y1={HEIGHT - 1}
          y2={HEIGHT - 1}
          stroke="var(--border)"
        />
      </svg>

      <div className="flex items-center gap-4 mt-3 text-xs">
        <span className="text-[var(--text-muted)]">-- target</span>
        <span className="text-[var(--accent)]">— anfis</span>
        <span className="text-[#a78bfa]">∩ rules</span>
        <button
          type="button"
          onClick={retrain}
          className="ml-auto text-[var(--text-secondary)] hover:text-[var(--accent)] transition"
        >
          [retrain]
        </button>
      </div>

      <p className="mt-2 text-[10px] text-[var(--text-muted)] tabular-nums">
        step {m.step} / {MAX_STEPS} · {RULES} rules · LMS consequents
      </p>
    </div>
  );
}
