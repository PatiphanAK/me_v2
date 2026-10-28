"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const N = 128; // samples per window
const BINS = 32; // spectrum bins shown
const TONES = [
  { bin: 3, amp: 0.55 },
  { bin: 9, amp: 0.3 },
];

const WIDTH = 300;
const TIME_H = 76;
const SPEC_H = 44;
const PAD = 8;

// deterministic noise so the spectrum stays stable between renders
const NOISE = (() => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: N }, () => (rand() + rand() + rand() - 1.5) * 0.35);
})();

const RAW = Array.from(
  { length: N },
  (_, n) =>
    TONES.reduce(
      (sum, t) => sum + t.amp * Math.sin((2 * Math.PI * t.bin * n) / N),
      0,
    ) + NOISE[n],
);

// naive DFT is fine at N = 128
const SPECTRUM = Array.from({ length: N }, (_, k) => {
  let re = 0;
  let im = 0;
  for (let n = 0; n < N; n++) {
    const a = (2 * Math.PI * k * n) / N;
    re += RAW[n] * Math.cos(a);
    im -= RAW[n] * Math.sin(a);
  }
  return { re, im };
});

const MAGNITUDES = SPECTRUM.slice(1, BINS + 1).map(
  ({ re, im }) => (2 * Math.hypot(re, im)) / N,
);
const MAX_MAG = Math.max(...MAGNITUDES);

// ideal low-pass: keep bins <= cutoff (and their mirror), inverse DFT
const lowPass = (cutoff: number) =>
  Array.from({ length: N }, (_, n) => {
    let sum = 0;
    for (let k = 0; k < N; k++) {
      if (k > cutoff && k < N - cutoff) continue;
      const a = (2 * Math.PI * k * n) / N;
      sum += SPECTRUM[k].re * Math.cos(a) - SPECTRUM[k].im * Math.sin(a);
    }
    return sum / N;
  });

const toX = (i: number, count: number) =>
  PAD + (i / (count - 1)) * (WIDTH - PAD * 2);
const toTimeY = (v: number) => TIME_H / 2 - (v / 1.4) * (TIME_H / 2 - 4);

const linePath = (values: number[], offset: number) =>
  values
    .map((_, i) => {
      const v = values[(i + offset) % values.length];
      return `${i === 0 ? "M" : "L"}${toX(i, values.length).toFixed(1)},${toTimeY(v).toFixed(1)}`;
    })
    .join(" ");

export default function SignalSpectrum({ active = true }: { active?: boolean }) {
  const [cutoff, setCutoff] = useState(5);
  const [offset, setOffset] = useState(0);
  const specRef = useRef<SVGSVGElement>(null);

  const filtered = useMemo(() => lowPass(cutoff), [cutoff]);

  // scroll the window like an oscilloscope
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      setOffset(Math.floor((now - start) / 40) % N);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const updateFromPointer = (clientX: number) => {
    const rect = specRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * WIDTH;
    const bin = Math.round(((x - PAD) / (WIDTH - PAD * 2)) * (BINS - 1)) + 1;
    setCutoff(Math.min(BINS - 1, Math.max(1, bin)));
  };

  const barWidth = (WIDTH - PAD * 2) / BINS;
  const cutoffX = PAD + cutoff * barWidth;

  return (
    <div className="relative">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          low-pass filter
        </span>
        <span className="text-xs text-[var(--text-secondary)]">
          f_c = {cutoff} Hz
        </span>
      </div>

      {/* time domain */}
      <svg
        viewBox={`0 0 ${WIDTH} ${TIME_H}`}
        className="w-full h-auto"
        aria-hidden="true"
      >
        <line
          x1={PAD}
          x2={WIDTH - PAD}
          y1={TIME_H / 2}
          y2={TIME_H / 2}
          stroke="var(--border-muted)"
          strokeDasharray="2 4"
        />
        <path
          d={linePath(RAW, offset)}
          fill="none"
          stroke="var(--text-muted)"
          strokeOpacity={0.6}
          strokeWidth={1}
        />
        <path
          d={linePath(filtered, offset)}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.75}
        />
      </svg>

      {/* spectrum */}
      <svg
        ref={specRef}
        viewBox={`0 0 ${WIDTH} ${SPEC_H}`}
        className="w-full h-auto mt-2 cursor-ew-resize touch-none select-none"
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
        <rect
          x={cutoffX}
          y={0}
          width={WIDTH - PAD - cutoffX}
          height={SPEC_H - 2}
          fill="var(--bg-base)"
          fillOpacity={0.5}
        />
        {MAGNITUDES.map((m, i) => {
          // rounded so server and client markup match exactly
          const h = Math.max(1, Math.round((m / MAX_MAG) * (SPEC_H - 6) * 10) / 10);
          const kept = i + 1 <= cutoff;
          return (
            <rect
              key={i}
              x={PAD + i * barWidth + 1}
              y={SPEC_H - 2 - h}
              width={barWidth - 2}
              height={h}
              fill={kept ? "var(--accent)" : "var(--text-muted)"}
              fillOpacity={kept ? 0.85 : 0.35}
            />
          );
        })}
        <line
          x1={cutoffX}
          x2={cutoffX}
          y1={0}
          y2={SPEC_H - 2}
          stroke="var(--text-primary)"
          strokeOpacity={0.7}
          strokeDasharray="3 3"
        />
        <line
          x1={PAD}
          x2={WIDTH - PAD}
          y1={SPEC_H - 2}
          y2={SPEC_H - 2}
          stroke="var(--border)"
        />
      </svg>

      <input
        type="range"
        min={1}
        max={BINS - 1}
        value={cutoff}
        onChange={(e) => setCutoff(Number(e.target.value))}
        aria-label="Low-pass cutoff frequency"
        className="sr-only"
      />

      <div className="flex gap-4 mt-3 text-xs">
        <span className="text-[var(--text-muted)]">— raw</span>
        <span className="text-[var(--accent)]">— filtered</span>
        <span className="ml-auto text-[var(--text-muted)]">drag spectrum</span>
      </div>
    </div>
  );
}
