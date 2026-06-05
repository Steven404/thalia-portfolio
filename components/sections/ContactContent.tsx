"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import type { ContactItem } from "@/lib/data";

interface Props {
  headline1: string;
  headline2: string;
  body: string;
  footerCopy: string;
  footerQuote: string;
  contactItem: ContactItem;
}

const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

const EmailIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ArrowDiagIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

export default function ContactContent({
  headline1,
  headline2,
  body,
  footerCopy,
  footerQuote,
  contactItem,
}: Props) {
  const { ref: headerRef, inView: headerIn } = useInView(0.4);
  const { ref: blockRef, inView: blockIn } = useInView(0.30);
  const { ref: footerRef, inView: footerIn } = useInView(0.30);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Decorative background glyph */}
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 select-none leading-none"
        style={{
          fontFamily: "var(--font-playfair), Playfair Display, serif",
          fontSize: "clamp(100px, 28vw, 400px)",
          color: "transparent",
          WebkitTextStroke: "1px oklch(46% 0.085 145 / 0.07)",
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
        <div ref={headerRef} className="mb-10 md:mb-16">
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
                color: "var(--sage)",
                fontStyle: "italic",
                display: "inline-block",
                transform: headerIn ? "translateY(0)" : "translateY(14px)",
                transition: `transform 700ms 100ms ${EXPO}`,
              }}
            >
              {headline2}
            </em>
          </h2>

          {/* Divider */}
          <div
            className="mt-8 h-px w-full overflow-hidden"
            style={{ background: "var(--border)" }}
          >
            <div
              style={{
                height: "100%",
                background: `linear-gradient(to right, var(--sage), var(--border))`,
                transformOrigin: "left",
                transform: headerIn ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 900ms 200ms ${EXPO}`,
              }}
            />
          </div>

          {/* Intro body */}
          <p
            className="mt-8 max-w-xl text-base leading-relaxed"
            style={{
              color: "var(--ink-muted)",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 700ms 300ms ${EXPO}, transform 700ms 300ms ${EXPO}`,
            }}
          >
            {body}
          </p>
        </div>

        {/* ── Email contact block ─────────────────────── */}
        <div
          ref={blockRef}
          style={{
            opacity: blockIn ? 1 : 0,
            transform: blockIn ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 700ms ${EXPO}, transform 700ms ${EXPO}`,
          }}
        >
          <a
            href={contactItem.href}
            aria-label={`Send an email to ${contactItem.value}`}
            className="flex items-center justify-between gap-6 px-8 py-10 md:px-12 md:py-12 rounded-2xl"
            style={{
              background: hovered ? "var(--surface-hover)" : "var(--surface)",
              transition: `background 300ms ${EXPO}`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Left: icon badge + contact info */}
            <div className="flex items-center gap-6 md:gap-8 min-w-0">
              <div
                className="shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: 56,
                  height: 56,
                  background: hovered
                    ? "oklch(74% 0.065 145 / 0.25)"
                    : "oklch(74% 0.065 145 / 0.15)",
                  color: "var(--sage)",
                  transition: `background 300ms ${EXPO}`,
                }}
              >
                <EmailIcon />
              </div>

              <div className="min-w-0">
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "var(--sage)" }}
                >
                  {contactItem.label}
                </p>
                <p
                  className="font-semibold truncate"
                  style={{
                    fontSize: "clamp(17px, 2.2vw, 26px)",
                    color: hovered ? "var(--sage)" : "var(--ink)",
                    transition: `color 300ms ${EXPO}`,
                  }}
                >
                  {contactItem.value}
                </p>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {contactItem.subtitle}
                </p>
              </div>
            </div>

            {/* Right: arrow */}
            <div
              className="shrink-0"
              style={{
                color: "var(--sage)",
                transform: hovered ? "translate(3px, -3px)" : "translate(0, 0)",
                transition: `transform 250ms ${EXPO}`,
              }}
            >
              <ArrowDiagIcon />
            </div>
          </a>
        </div>

        {/* ── Footer strip ───────────────────────────── */}
        <div
          ref={footerRef}
          className="mt-10 md:mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            borderTop: "1px solid var(--border)",
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
              color: "var(--sage)",
              opacity: footerIn ? 1 : 0,
              transition: `opacity 600ms 120ms ${EXPO}`,
            }}
          >
            &ldquo;{footerQuote}&rdquo;
          </span>
        </div>

        {/* ── Developer credit ────────────────────────── */}
        <div
          className="mt-6 flex items-center justify-center"
          style={{
            opacity: footerIn ? 1 : 0,
            transition: `opacity 600ms 240ms ${EXPO}`,
          }}
        >
          <span
            className="text-xs tracking-[0.12em]"
            style={{ color: "var(--ink-dim)" }}
          >
            Designed &amp; Developed by{" "}
            <a
              href="https://www.stefanos-michelakis.gr"
              target="_blank"
              rel="noopener noreferrer"
              title="Στέφανος Μιχελάκης"
              style={{
                color: "var(--sage)",
                textUnderlineOffset: "3px",
                textDecorationColor: "oklch(46% 0.085 145 / 0.4)",
                transition: "color 300ms ease",
              }}
              className="underline decoration-1 hover:text-foreground"
            >
              Stefanos Michelakis
            </a>
          </span>
        </div>

      </div>
    </>
  );
}
