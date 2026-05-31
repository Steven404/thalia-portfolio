"use client";

import { useTranslations } from "next-intl";
import Navbar from "@/components/ui/Navbar";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Decorative ghost letter */}
      <div
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none leading-none"
        style={{
          fontFamily: "var(--font-playfair), Playfair Display, serif",
          fontSize: "clamp(280px, 35vw, 520px)",
          color: "transparent",
          WebkitTextStroke: "1.5px oklch(71% 0.115 65 / 0.22)",
          fontStyle: "italic",
          fontWeight: 900,
        }}
        aria-hidden
      >
        E
      </div>

      <Navbar />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-8 md:px-16 pb-24 max-w-5xl">
        <p
          className="mb-6 text-xs font-medium tracking-[0.3em] uppercase animate-fade-up delay-100"
          style={{ color: "var(--gold)" }}
        >
          {t("eyebrow")}
        </p>

        <h1
          className="animate-fade-up delay-200 leading-[1.05] mb-8"
          style={{
            fontFamily: "var(--font-playfair), Playfair Display, serif",
            fontSize: "clamp(48px, 8.5vw, 96px)",
            color: "var(--ink)",
            fontWeight: 800,
            textWrap: "balance",
            letterSpacing: "-0.02em",
          }}
        >
          {t("headline1")}
          <br />
          <em style={{ color: "var(--gold-bright)", fontStyle: "italic" }}>
            {t("headline2")}
          </em>
        </h1>

        <p
          className="max-w-lg text-base md:text-lg leading-relaxed animate-fade-up delay-300"
          style={{ color: "var(--ink-muted)", fontWeight: 300 }}
        >
          {t("description")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up delay-400">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300"
            style={{
              background: "var(--gold)",
              color: "var(--bg)",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
          >
            {t("cta_primary")}
          </a>
          <a
            href="#classes"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300"
            style={{
              border: "1px solid var(--border-gold)",
              color: "var(--ink)",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.color = "var(--gold-bright)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-gold)";
              e.currentTarget.style.color = "var(--ink)";
            }}
          >
            {t("cta_secondary")}
          </a>
        </div>
      </div>

      {/* Bottom level rail */}
      <div
        className="relative z-10 mx-8 md:mx-16 mb-8 flex items-center gap-6 animate-fade-in delay-800"
        style={{ color: "var(--ink-dim)" }}
      >
        <div className="flex-1 h-px" style={{ background: "var(--border-gold)" }} />
        <span className="text-xs tracking-widest uppercase">A1 · A2 · B1 · B2 · C1 · C2</span>
        <div className="flex-1 h-px" style={{ background: "var(--border-gold)" }} />
      </div>
    </section>
  );
}
