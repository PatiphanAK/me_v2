"use client";
import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

export default function LogoIcon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let rafId = 0;
    let t = 0;

    function draw() {
      t += 0.03;
      ctx.clearRect(0, 0, 76, 76);

      const cx = 38;
      const cy = 38;

      // dynamic colors from CSS
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-primary")
        .trim();

      const glow = getComputedStyle(document.documentElement)
        .getPropertyValue("--glow-primary")
        .trim();

      // ── axes ──
      ctx.strokeStyle = "rgba(120,160,255,0.25)";
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      ctx.moveTo(8, cy);
      ctx.lineTo(68, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, 68);
      ctx.lineTo(cx, 8);
      ctx.stroke();

      // ── gaussian ──
      const sig = 10 + 4 * Math.sin(t);

      ctx.beginPath();
      for (let x = 0; x <= 60; x++) {
        const xv = x - 30;
        const y = 28 * Math.exp(-(xv * xv) / (2 * sig * sig));

        if (x === 0) ctx.moveTo(8 + x, cy - y);
        else ctx.lineTo(8 + x, cy - y);
      }

      // glow layer
      ctx.strokeStyle = glow;
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.25;
      ctx.stroke();

      // main line
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 1;
      ctx.stroke();

      // ── peak ──
      ctx.beginPath();
      ctx.arc(cx, cy - 28, 2.2, 0, TAU);

      ctx.fillStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 8;
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={76}
      height={76}
      className="absolute inset-0 w-full h-full"
    />
  );
}
