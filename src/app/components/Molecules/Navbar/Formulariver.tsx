"use client";
import { useEffect, useRef } from "react";
import { EqType, Slot, Lane } from "@/app/types/navbar/particle.interface";

// ─── tuneable ─────────────────────────────────────────────────────────────
const LANE_COUNT = 3;
const PADDING = 80; // px gap between slots (on top of max label width)
const BASE_SPEED = 0.6; // px/frame for lane 0
const SPEED_STEP = 0.15; // extra px/frame per lane index
const FADE_WIDTH = 100; // px of left/right edge fade
const FONT_BASE = 10; // font size for lane 0 (px)
const FONT_STEP = 0.5; // extra px per lane index
// ──────────────────────────────────────────────────────────────────────────

const EQUATIONS: { t: EqType; label: string }[] = [
  { t: "math", label: "θ ← θ − η∇L(θ)" },
  { t: "math", label: "∇L(θ) = ∂L/∂θ" },
  { t: "math", label: "L(θ) = E[(y − f(x;θ))²]" },
  { t: "math", label: "θ̂ = argmax ℓ(θ)" },
  { t: "math", label: "ℓ(θ) = Σ log p(xᵢ|θ)" },
  { t: "math", label: "KL(p‖q) = Σ p log(p/q)" },
  { t: "math", label: "θ* = argmin L(θ)" },
  { t: "math", label: "‖∇L(θ)‖ → 0" },
  { t: "math", label: "y = Wx + b" },
  { t: "math", label: "Σ = E[(x−μ)(x−μ)ᵀ]" },
  { t: "math", label: "Σv = λv" },
  { t: "gauss", label: "𝒩(x | μ, σ²)" },
  { t: "gauss", label: "p(x) = e^{−(x−μ)²/2σ²} / σ√2π" },
  { t: "fourier", label: "F(ω) = ∫ f(t)e^{−iωt} dt" },
  { t: "fourier", label: "f(t) = Σ cₙ e^{inωt}" },
  { t: "laplace", label: "ℒ{f}(s) = ∫₀^∞ e^{−st} f(t) dt" },
  { t: "laplace", label: "∇²φ = 0" },
];

const COLORS: Record<EqType, string> = {
  math: "rgba(230,200,120,",
  gauss: "rgba(255,170, 60,",
  fourier: "rgba(120,200,255,",
  laplace: "rgba(190,150,255,",
};

function mkColor(t: EqType, a: number) {
  return COLORS[t] + a + ")";
}

export default function FormulaRiver() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let W = 0;
    let H = 0;
    let rafId = 0;
    let lanes: Lane[] = [];

    function measureMax(fontSize: number): number {
      ctx.font = `${fontSize}px monospace`;
      return Math.max(
        ...EQUATIONS.map((eq) => ctx.measureText(eq.label).width),
      );
    }

    function randomEq() {
      return EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)];
    }

    // ── resize ─────────────────────────────────────────────────────────────
    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const pad = H * 0.2;

      lanes = Array.from({ length: LANE_COUNT }, (_, i) => {
        const fontSize = FONT_BASE + i * FONT_STEP;
        const maxW = measureMax(fontSize);
        const slotWidth = maxW + PADDING;
        const y = pad + (i * (H - pad * 2)) / (LANE_COUNT - 1);

        // pre-fill enough slots to cover the screen immediately
        const slotCount = Math.ceil(W / slotWidth) + 2;
        const slots: Slot[] = Array.from({ length: slotCount }, (_, si) => ({
          eq: randomEq(),
          index: si,
        }));

        return {
          y,
          fontSize,
          speed: BASE_SPEED + i * SPEED_STEP,
          slotWidth,
          offset: 0,
          slots,
          nextIndex: slotCount,
          alpha: 0.52 + i * 0.07,
        };
      });
    }

    // ── update ─────────────────────────────────────────────────────────────
    function update() {
      for (const lane of lanes) {
        lane.offset += lane.speed;

        // remove slots that have scrolled off the right edge
        lane.slots = lane.slots.filter((slot) => {
          const x = lane.offset - slot.index * lane.slotWidth;
          return x < W + lane.slotWidth + 20;
        });

        if (lane.slots.length === 0) {
          lane.slots.push({ eq: randomEq(), index: lane.nextIndex++ });
          continue;
        }
        const rightmost = lane.slots.reduce(
          (best, s) => (s.index > best.index ? s : best),
          lane.slots[0],
        );
        const SAFE = lane.slotWidth * 2;
        const xRight = lane.offset - rightmost.index * lane.slotWidth;

        if (xRight > -SAFE) {
          lane.slots.push({ eq: randomEq(), index: lane.nextIndex++ });
        }
      }
    }

    // ── draw ───────────────────────────────────────────────────────────────
    function drawLanes() {
      for (const lane of lanes) {
        ctx.font = `${lane.fontSize}px monospace`;
        ctx.textBaseline = "middle";

        for (const slot of lane.slots) {
          const x = lane.offset - slot.index * lane.slotWidth;
          if (x > W + 20 || x < -lane.slotWidth - 20) continue;

          // smooth alpha fade at both edges
          let alpha = lane.alpha;
          if (x < FADE_WIDTH) alpha *= x / FADE_WIDTH;
          if (x > W - FADE_WIDTH) alpha *= (W - x) / FADE_WIDTH;
          alpha = Math.max(0, alpha);

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = mkColor(slot.eq.t, 1);
          ctx.shadowColor = mkColor(slot.eq.t, 0.7);
          ctx.shadowBlur = 4;
          ctx.fillText(slot.eq.label, x, lane.y);
          ctx.restore();
        }
      }
    }

    function drawEdgeFades() {
      const gl = ctx.createLinearGradient(0, 0, FADE_WIDTH, 0);
      gl.addColorStop(0, "rgba(10,8,5,1)");
      gl.addColorStop(1, "rgba(10,8,5,0)");
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, FADE_WIDTH, H);

      const gr = ctx.createLinearGradient(W - FADE_WIDTH, 0, W, 0);
      gr.addColorStop(0, "rgba(10,8,5,0)");
      gr.addColorStop(1, "rgba(10,8,5,1)");
      ctx.fillStyle = gr;
      ctx.fillRect(W - FADE_WIDTH, 0, FADE_WIDTH, H);
    }

    // ── loop ───────────────────────────────────────────────────────────────
    function loop() {
      ctx.clearRect(0, 0, W, H);
      update();
      drawLanes();
      drawEdgeFades();
      rafId = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative overflow-hidden h-8 bg-[var(--river-bg)] border-b border-[var(--river-border)]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
