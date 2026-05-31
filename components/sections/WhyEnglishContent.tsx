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
  // conclusionEyebrow omitted — second eyebrow within one section is AI grammar
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "oklch(17% 0.006 133)" }}
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6"
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
              {/* Sage rule accent */}
              <span
                className="shrink-0 block"
                style={{
                  width: "14px",
                  height: "1px",
                  background: "var(--sage)",
                  opacity: 0.65,
                  marginTop: "0.55rem",
                  flexShrink: 0,
                }}
                aria-hidden
              />

              <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                {benefit}
              </p>
            </div>
          ))}
        </div>

        {/* Investment tagline — pull-quote, no border */}
        <blockquote
          className="mt-12 text-center"
          style={{
            opacity: benefitsIn ? 1 : 0,
            transform: benefitsIn ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 700ms ${benefits.length * BENEFIT_STAGGER + 200}ms ${EXPO}, transform 700ms ${benefits.length * BENEFIT_STAGGER + 200}ms ${EXPO}`,
          }}
        >
          <p
            className="text-base md:text-lg italic leading-relaxed"
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              color: "var(--sage)",
            }}
          >
            &ldquo;{tagline}&rdquo;
          </p>
        </blockquote>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <p
            className="text-sm leading-loose"
            style={{
              color: "var(--ink-muted)",
              fontWeight: 300,
              textWrap: "pretty",
              opacity: conclusionIn ? 1 : 0,
              transform: conclusionIn ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 700ms 200ms ${EXPO}, transform 700ms 200ms ${EXPO}`,
            } as React.CSSProperties}
          >
            {conclusionBody1}
          </p>

          <p
            className="text-sm leading-loose"
            style={{
              color: "var(--ink-muted)",
              fontWeight: 300,
              textWrap: "pretty",
              opacity: conclusionIn ? 1 : 0,
              transform: conclusionIn ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 700ms 300ms ${EXPO}, transform 700ms 300ms ${EXPO}`,
            } as React.CSSProperties}
          >
            {conclusionBody2}
          </p>

          {/* Closing statement in display serif */}
          <p
            className="text-sm leading-loose italic"
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              color: "var(--ink)",
              fontWeight: 400,
              textWrap: "pretty",
              opacity: conclusionIn ? 1 : 0,
              transform: conclusionIn ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 700ms 400ms ${EXPO}, transform 700ms 400ms ${EXPO}`,
            } as React.CSSProperties}
          >
            {conclusionBody3}
          </p>
        </div>
      </div>

    </div>
  );
}
