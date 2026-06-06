"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");

  // TODO: Find way to calculate header height and remove it from the min-h-screen size
  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Logo brand mark — positioned right, replaces the ghost letter */}
      <div
        className="pointer-events-none absolute select-none hidden lg:block"
        style={{
          right: "clamp(24px, 4vw, 80px)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        aria-hidden
      >
        <Image
          className="animate-fade-up-hero-image delay-500"
          src="/logo.png"
          alt=""
          width={1080}
          height={335}
          priority
          fetchPriority="high"
          style={{
            width: "clamp(400px, 38vw, 1000px)",
            height: "auto",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col lg:justify-center flex-1 px-8 md:px-16 max-w-5xl lg:w-[60%]">
        {/* Logo — mobile only, signature after CTAs */}
        <div className="mt-4 lg:hidden animate-fade-in-hero-image delay-500">
          <Image
            src="/logo.png"
            alt="English Lessons by Thalia Kiosi"
            width={0}
            height={0}
            sizes="100vw"
            priority
            fetchPriority="high"
            style={{
              width: "100vw",
              // height: "auto",
              opacity: 0.85,
            }}
          />
        </div>

        <h1
          className="animate-fade-in delay-100 leading-[1.05] mb-8 max-lg:mt-10 text-nowrap"
          style={{
            fontFamily: "var(--font-playfair), Playfair Display, serif",
            fontSize: "clamp(36px, 5.5vw, 72px)",
            color: "var(--ink)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          {t("headline1")}
          <br />
          <em style={{ color: "var(--sage)", fontStyle: "italic" }}>
            {t("headline2")}
          </em>
        </h1>

        <div className="max-w-3xl flex flex-col gap-4 animate-fade-up delay-700 text-justify">
          <p
            className="text-sm 2xl:text-base leading-relaxed"
            style={{ color: "var(--ink-muted)", fontWeight: 400 }}
          >
            {t("description1")}
          </p>
          <p
            className="text-sm 2xl:text-base leading-relaxed"
            style={{ color: "var(--ink-muted)", fontWeight: 300 }}
          >
            {t("description2")}
          </p>
          <p
            className="text-sm 2xl:text-base leading-relaxed"
            style={{ color: "var(--ink-muted)", fontWeight: 300 }}
          >
            {t("description3")}
          </p>
          <p
            className="text-sm 2xl:text-base leading-relaxed"
            style={{ color: "var(--ink-muted)", fontWeight: 300 }}
          >
            {t("description4")}
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up delay-800">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300"
            style={{
              background: "var(--sage-bright)",
              color: "var(--ink)",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(70% 0.072 145)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 18px oklch(46% 0.085 145 / 0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--sage-bright)";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            {t("cta_primary")}
          </a>
          <a
            href="#classes"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300"
            style={{
              border: "1.5px solid var(--border-sage)",
              color: "var(--ink-muted)",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--sage)";
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-sage)";
              e.currentTarget.style.color = "var(--ink-muted)";
              e.currentTarget.style.transform = "";
            }}
          >
            {t("cta_secondary")}
          </a>
        </div>
      </div>

      {/* Scroll indicator — desktop only, purely decorative */}
      <a
        href="#classes"
        className="hidden lg:block absolute bottom-20 left-1/2 -translate-x-1/2 animate-fade-in delay-1500"
        aria-hidden="true"
        tabIndex={-1}
        style={{ lineHeight: 0 }}
      >
        <div
          style={{
            width: "1.5px",
            height: "52px",
            background: "var(--border-sage)",
            borderRadius: "1px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="scroll-dot" />
        </div>
      </a>

      {/* Bottom level rail */}
      <div
        className="relative z-10 mx-8 md:mx-16 mb-8 flex items-center gap-6 animate-fade-in delay-1500 max-sm:mt-8"
        style={{ color: "var(--ink-dim)" }}
      >
        <div
          className="flex-1 h-px"
          style={{ background: "var(--border-sage)" }}
        />
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--sage-dim)" }}
        >
          A1 · A2 · B1 · B2 · C1 · C2
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--border-sage)" }}
        />
      </div>
    </section>
  );
}
