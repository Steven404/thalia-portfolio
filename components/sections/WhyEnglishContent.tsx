"use client";

import { useInView } from "@/hooks/useInView";

interface Props {
  eyebrow: string;
  headline1: string;
  headline2: string;
  intro: string;
  subIntro: string;
  benefits: string[];
  tagline: string;
  conclusionEyebrow: string;
  conclusionBody1: string;
  conclusionBody2: string;
  conclusionBody3: string;
}

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const BENEFIT_STAGGER = 50;

export default function WhyEnglishContent({
  eyebrow,
  headline1,
  headline2,
  intro,
  subIntro,
  benefits,
  tagline,
  conclusionEyebrow,
  conclusionBody1,
  conclusionBody2,
  conclusionBody3,
}: Props) {
  const { ref: headerRef, inView: headerIn } = useInView(0.2);
  const { ref: benefitsRef, inView: benefitsIn } = useInView(0.06);
  const { ref: conclusionRef, inView: conclusionIn } = useInView(0.15);

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

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "var(--ink)",
              fontWeight: 700,
              textWrap: "balance",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(22px)",
              transition: `opacity 700ms 80ms ${EXPO}, transform 700ms 80ms ${EXPO}`,
            } as React.CSSProperties}
          >
            {headline1}
            <br />
            <em style={{ color: "var(--sage-bright)", fontStyle: "italic" }}>{headline2}</em>
          </h2>

          <p
            className="max-w-xs text-sm leading-relaxed md:text-right"
            style={{
              color: "var(--ink-muted)",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 700ms 160ms ${EXPO}, transform 700ms 160ms ${EXPO}`,
            }}
          >
            {intro}
          </p>
        </div>

        {/* Divider */}
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

      {/* ── Benefits grid ───────────────────────────── */}
      <div ref={benefitsRef} className="mb-16">
        <p
          className="mb-8 text-sm font-medium"
          style={{
            color: "var(--ink-muted)",
            letterSpacing: "0.01em",
            opacity: benefitsIn ? 1 : 0,
            transition: `opacity 600ms ${EXPO}`,
          }}
        >
          {subIntro}
        </p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-px"
          style={{ background: "oklch(17% 0.006 133)" }}
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-5 p-6 group"
              style={{
                background: "var(--surface-card)",
                opacity: benefitsIn ? 1 : 0,
                transform: benefitsIn ? "translateY(0)" : "translateY(16px)",
                transition: [
                  `opacity 500ms ${i * BENEFIT_STAGGER}ms ${EXPO}`,
                  `transform 500ms ${i * BENEFIT_STAGGER}ms ${EXPO}`,
                  "background-color 200ms ease",
                ].join(", "),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--surface-card)";
              }}
            >
              {/* Numbered label */}
              <span
                className="shrink-0 tabular-nums"
                style={{
                  fontFamily: "var(--font-playfair), Playfair Display, serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--sage)",
                  letterSpacing: "-0.03em",
                  marginTop: "0.05rem",
                  opacity: 0.75,
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                {benefit}
              </p>
            </div>
          ))}
        </div>

        {/* Investment tagline */}
        <div
          className="mt-10 pl-6 py-3"
          style={{
            borderLeft: "2px solid var(--sage-dim)",
            opacity: benefitsIn ? 1 : 0,
            transform: benefitsIn ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 700ms ${benefits.length * BENEFIT_STAGGER + 200}ms ${EXPO}, transform 700ms ${benefits.length * BENEFIT_STAGGER + 200}ms ${EXPO}`,
          }}
        >
          <p
            className="text-sm italic leading-relaxed"
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              color: "var(--sage-dim)",
            }}
          >
            &ldquo;{tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* ── Conclusion ──────────────────────────────── */}
      <div ref={conclusionRef}>
        {/* Divider */}
        <div className="mb-12 h-px w-full overflow-hidden" style={{ background: "oklch(22% 0.008 133)" }}>
          <div
            style={{
              height: "100%",
              background: `linear-gradient(to right, var(--sage), transparent)`,
              transformOrigin: "left",
              transform: conclusionIn ? "scaleX(1)" : "scaleX(0)",
              transition: `transform 900ms ${EXPO}`,
            }}
          />
        </div>

        <p
          className="mb-10 text-xs font-medium tracking-[0.3em] uppercase"
          style={{
            color: "var(--sage)",
            opacity: conclusionIn ? 1 : 0,
            transition: `opacity 600ms 100ms ${EXPO}`,
          }}
        >
          {conclusionEyebrow}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* First two paragraphs in muted body text */}
          <p
            className="text-sm leading-loose"
            style={{
              color: "var(--ink-muted)",
              fontWeight: 300,
              opacity: conclusionIn ? 1 : 0,
              transform: conclusionIn ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 700ms 200ms ${EXPO}, transform 700ms 200ms ${EXPO}`,
            }}
          >
            {conclusionBody1}
          </p>

          <p
            className="text-sm leading-loose"
            style={{
              color: "var(--ink-muted)",
              fontWeight: 300,
              opacity: conclusionIn ? 1 : 0,
              transform: conclusionIn ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 700ms 300ms ${EXPO}, transform 700ms 300ms ${EXPO}`,
            }}
          >
            {conclusionBody2}
          </p>

          {/* Third paragraph styled as a closing statement */}
          <p
            className="text-sm leading-loose italic"
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              color: "var(--ink)",
              fontWeight: 400,
              opacity: conclusionIn ? 1 : 0,
              transform: conclusionIn ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 700ms 400ms ${EXPO}, transform 700ms 400ms ${EXPO}`,
            }}
          >
            {conclusionBody3}
          </p>
        </div>
      </div>

    </div>
  );
}
