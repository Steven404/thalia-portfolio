"use client";

import { useInView } from "@/hooks/useInView";
import ContactCard from "@/components/ui/ContactCard";
import type { ContactItem } from "@/lib/data";

interface Props {
  headline1: string;
  headline2: string;
  footerCopy: string;
  footerQuote: string;
  contactItems: ContactItem[];
}

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function ContactContent({
  headline1,
  headline2,
  footerCopy,
  footerQuote,
  contactItems,
}: Props) {
  const { ref: headerRef, inView: headerIn } = useInView(0.2);
  const { ref: gridRef, inView: gridIn } = useInView(0.06);
  const { ref: footerRef, inView: footerIn } = useInView(0.15);

  return (
    <>
      {/* Decorative background glyph — atmospheric entrance */}
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 select-none leading-none"
        style={{
          fontFamily: "var(--font-playfair), Playfair Display, serif",
          fontSize: "clamp(200px, 30vw, 400px)",
          color: "transparent",
          WebkitTextStroke: "1px oklch(67% 0.055 133 / 0.12)",
          fontStyle: "italic",
          fontWeight: 900,
          opacity: headerIn ? 1 : 0,
          transform: headerIn ? "translateY(0)" : "translateY(32px)",
          transition: `opacity 1400ms 400ms ${EXPO}, transform 1400ms 400ms ${EXPO}`,
        }}
        aria-hidden
      >
        ℒ
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ─────────────────────────────────── */}
        <div ref={headerRef} className="mb-20">
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
              transform: headerIn ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 700ms ${EXPO}, transform 700ms ${EXPO}`,
            } as React.CSSProperties}
          >
            {headline1}
            <br />
            <em
              style={{
                color: "var(--sage-bright)",
                fontStyle: "italic",
                display: "inline-block",
                transform: headerIn ? "translateY(0)" : "translateY(14px)",
                transition: `transform 700ms 100ms ${EXPO}`,
              }}
            >
              {headline2}
            </em>
          </h2>

          {/* Divider: scaleX from left */}
          <div
            className="mt-8 h-px w-full overflow-hidden"
            style={{ background: "oklch(22% 0.008 133)" }}
          >
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

        {/* ── Contact cards — staggered entrance ─────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "oklch(38% 0.030 133)" }}
        >
          {contactItems.map((item, i) => (
            <ContactCard key={item.icon} item={item} index={i} inView={gridIn} />
          ))}
        </div>

        {/* ── Footer strip ───────────────────────────── */}
        <div
          ref={footerRef}
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderTop: "1px solid oklch(28% 0.010 133)",
            opacity: footerIn ? 1 : 0,
            transform: footerIn ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 600ms ${EXPO}, transform 600ms ${EXPO}`,
          }}
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--ink-dim)" }}
          >
            {footerCopy}
          </span>
          <span
            className="text-xs italic"
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              color: "var(--sage-dim)",
              opacity: footerIn ? 1 : 0,
              transition: `opacity 600ms 120ms ${EXPO}`,
            }}
          >
            &ldquo;{footerQuote}&rdquo;
          </span>
        </div>

      </div>
    </>
  );
}
