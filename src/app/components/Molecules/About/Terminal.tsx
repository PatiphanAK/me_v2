"use client";

import { useEffect, useState } from "react";

type Line = {
  text: string;
  type: "cmd" | "out";
};

interface TerminalProps {
  lines?: Line[];
  speed?: number;
  user?: string;
  host?: string;
}

export default function Terminal({
  lines = [],
  speed = 500,
  user = "patiphan",
  host = "machine",
}: TerminalProps) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= lines.length) return;

    const t = setTimeout(() => {
      setVisible((v) => v + 1);
    }, speed);

    return () => clearTimeout(t);
  }, [visible, lines, speed]);

  return (
    <div
      className="font-mono text-sm p-4 rounded-xl overflow-auto"
      style={{
        background: "#0d1117", // dark terminal bg
        border: "1px solid #30363d",
        color: "#c9d1d9",
        maxHeight: "300px",
      }}
    >
      {/* lines */}
      {lines.slice(0, visible).map((line, i) => (
        <div key={i} className="whitespace-pre-wrap leading-relaxed">
          {line.type === "cmd" ? (
            <span>
              <span style={{ color: "#58a6ff" }}>
                {user}@{host}
              </span>
              <span style={{ color: "#8b949e" }}>:~$ </span>
              <span style={{ color: "#c9d1d9" }}>{line.text}</span>
            </span>
          ) : (
            <span style={{ color: "#3fb950" }}>{line.text}</span>
          )}
        </div>
      ))}

      {/* cursor */}
      {visible < lines.length && (
        <div className="animate-pulse text-white">█</div>
      )}
    </div>
  );
}
