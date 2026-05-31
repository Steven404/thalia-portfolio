"use client";

import { useInView } from "@/hooks/useInView";

interface Props {
  eyebrow: string;
  headline1: string;
  headline2: string;
  body1: string;
  body2: string;
}

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function PhilosophyContent({ eyebrow, headline1, headline2, body1, body2 }: Props) {
  const { ref: headerRef, inView: headerIn } = useInView(0.3);
  const { ref: bodyRef, inView: bodyIn } = useInView(0.20);

  return (
    <div className="max-w-6xl mx-auto">

      {/* ── Section header ─────────────────────────── */}
      <div ref={headerRef} className="mb-20">
        <p
          className="mb-6 text-xs font-medium tracking-[0.3em] uppercase"
          style={{
            color: "var(--sage)",
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 600ms ${EXPO}, transform 600ms ${EXPO}`,
          }}
        >
          {eyebrow}
        </p>

        <h2
          className="leading-tight"
          style={{
            fontFamily: "var(--font-playfair), Playfair Display, serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            color: "var(--ink)",
            fontWeight: 700,
            textWrap: "balance",
            letterSpacing: "-0.02em",
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "translateY(0)" : "translateY(22px)",
            transition: `opacity 700ms 80ms ${EXPO}, transform 700ms 80ms ${EXPO}`,
          }}
        >
          {headline1}
          <br />
          <em style={{ color: "var(--sage)", fontStyle: "italic" }}>{headline2}</em>
        </h2>

        {/* Divider: scaleX from left */}
        <div className="mt-8 h-px w-full overflow-hidden" style={{ background: "oklch(22% 0.008 133)" }}>
          <div
            style={{
              height: "100%",
              background: `linear-gradient(to right, var(--sage), transparent)`,
              transformOrigin: "left",
              transform: headerIn ? "scaleX(1)" : "scaleX(0)",
              transition: `transform 900ms 200ms ${EXPO}`,
            }}
          />
        </div>
      </div>

      {/* ── Two-column body ─────────────────────────── */}
      <div
        ref={bodyRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
      >
        <p
          className="text-base leading-loose"
          style={{
            color: "var(--ink-muted)",
            opacity: bodyIn ? 1 : 0,
            transform: bodyIn ? "translateY(0)" : "translateY(18px)",
            transition: `opacity 700ms ${EXPO}, transform 700ms ${EXPO}`,
          }}
        >
          {body1}
        </p>

        <div
          style={{
            opacity: bodyIn ? 1 : 0,
            transform: bodyIn ? "translateY(0)" : "translateY(18px)",
            transition: `opacity 700ms 130ms ${EXPO}, transform 700ms 130ms ${EXPO}`,
          }}
        >
          {/* Subtle left accent on second paragraph */}
          <div
            className="pl-6"
            style={{ borderLeft: "2px solid oklch(67% 0.055 133 / 0.35)" }}
          >
            <p className="text-base leading-loose" style={{ color: "var(--ink-muted)" }}>
              {body2}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
