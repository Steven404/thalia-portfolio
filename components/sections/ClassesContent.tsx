"use client";

import { useInView } from "@/hooks/useInView";
import LevelCard from "@/components/ui/LevelCard";
import type { Level } from "@/lib/data";

interface Props {
  headline1: string;
  headline2: string;
  description: string;
  footnote: string;
  levels: Level[];
}

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function ClassesContent({
  headline1,
  headline2,
  description,
  footnote,
  levels,
}: Props) {
  const { ref: headerRef, inView: headerIn } = useInView(0.2);
  const { ref: gridRef, inView: gridIn } = useInView(0.08);

  return (
    <div className="max-w-6xl mx-auto">

      {/* ── Section header ─────────────────────────── */}
      <div ref={headerRef} className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <h2
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "var(--ink)",
              fontWeight: 700,
              textWrap: "balance",
              letterSpacing: "-0.02em",
              /* entrance */
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(22px)",
              transition: `opacity 700ms ${EXPO}, transform 700ms ${EXPO}`,
            } as React.CSSProperties}
          >
            {headline1}
            <br />
            <em style={{ color: "var(--sage)", fontStyle: "italic" }}>{headline2}</em>
          </h2>

          <p
            className="max-w-xs text-sm leading-relaxed md:text-right"
            style={{
              color: "var(--ink-muted)",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 700ms 120ms ${EXPO}, transform 700ms 120ms ${EXPO}`,
            }}
          >
            {description}
          </p>
        </div>

        {/* Divider: scaleX from left */}
        <div className="mt-8 h-px w-full overflow-hidden" style={{ background: "oklch(22% 0.008 133)" }}>
          <div
            style={{
              height: "100%",
              background: `linear-gradient(to right, var(--sage), oklch(22% 0.008 133))`,
              transformOrigin: "left",
              transform: headerIn ? "scaleX(1)" : "scaleX(0)",
              transition: `transform 900ms 200ms ${EXPO}`,
            }}
          />
        </div>
      </div>

      {/* ── Level grid ─────────────────────────────── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "oklch(22% 0.008 133)" }}
      >
        {levels.map((level, i) => (
          <LevelCard key={level.code} level={level} index={i} inView={gridIn} />
        ))}
      </div>

      {/* Footnote fades in after the last card */}
      <p
        className="mt-10 text-xs text-center leading-relaxed"
        style={{
          color: "var(--sage-dim)",
          opacity: gridIn ? 1 : 0,
          transition: `opacity 600ms ${(levels.length - 1) * 60 + 420}ms ${EXPO}`,
        }}
      >
        {footnote}
      </p>
    </div>
  );
}
