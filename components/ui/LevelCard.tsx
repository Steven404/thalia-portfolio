"use client";

import type { Level } from "@/lib/data";

interface LevelCardProps {
  level: Level;
  /** Grid index for stagger timing. */
  index?: number;
  /** Controlled from parent IO; when true the card animates in. */
  inView?: boolean;
}

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const STAGGER_MS = 90;

export default function LevelCard({ level, index = 0, inView = true }: LevelCardProps) {
  const cardDelay = index * STAGGER_MS;
  const barDelay  = cardDelay + 1000;

  return (
    <div
      className="level-card group relative flex flex-col p-8"
      style={{
        background: "var(--surface-card)",
        /* entrance */
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: [
          `opacity 600ms ${cardDelay}ms ${EXPO}`,
          `transform 600ms ${cardDelay}ms ${EXPO}`,
          "background-color 250ms ease",
        ].join(", "),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--surface-hover)";
        e.currentTarget.style.transform   = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--surface-card)";
        e.currentTarget.style.transform   = "translateY(0)";
      }}
    >
      {/* Level code + fill bar */}
      <div className="flex items-start justify-between mb-6">
        <span
          className="text-5xl font-black leading-none transition-colors duration-200 group-hover:text-[var(--sage)]"
          style={{
            fontFamily: "var(--font-playfair), Playfair Display, serif",
            color: "oklch(87% 0.018 133)",
            letterSpacing: "-0.03em",
          }}
        >
          {level.code}
        </span>

        {/* Animated proficiency bar */}
        <div
          className="mt-2 rounded-full overflow-hidden"
          style={{ width: 48, height: 3, background: "oklch(22% 0.008 133)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "var(--sage)",
              transformOrigin: "left",
              transform: inView ? `scaleX(${level.fill / 100})` : "scaleX(0)",
              transition: `transform 700ms ${barDelay}ms ${EXPO}`,
            }}
          />
        </div>
      </div>

      <p
        className="mb-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 group-hover:text-[var(--sage)]"
        style={{ color: "var(--sage-dim)" }}
      >
        {level.name}
      </p>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--ink-muted)" }}
      >
        {level.description}
      </p>

      {/* Hover reveal arrow */}
      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="h-px flex-1" style={{ background: "var(--border-sage)" }} />
        <span className="text-xs" style={{ color: "var(--sage)" }}>→</span>
      </div>
    </div>
  );
}
