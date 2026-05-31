"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on Escape key + lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "#classes", label: t("classes") },
    { href: "#philosophy", label: t("philosophy") },
    { href: "#why-english", label: t("why") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <>
      <nav className="relative z-10 flex items-center justify-between px-8 py-8 md:px-16">
        <span
          className="text-sm font-medium tracking-[0.2em] uppercase animate-fade-in"
          style={{ color: "var(--sage)", animationDelay: "0s" }}
        >
          {t("name")}
        </span>

        {/* Desktop: links + locale toggle */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className="flex gap-8 text-sm animate-fade-in delay-200"
            style={{ color: "var(--ink-muted)" }}
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="transition-colors cursor-pointer"
                style={{ color: "var(--ink-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs font-medium tracking-widest animate-fade-in delay-300">
            <Link
              href={pathname}
              locale="en"
              className="transition-colors px-1 py-0.5"
              style={{
                color: locale === "en" ? "var(--sage)" : "var(--ink-dim)",
                borderBottom: locale === "en" ? "1px solid var(--sage)" : "1px solid transparent",
              }}
            >
              EN
            </Link>
            <span style={{ color: "var(--sage-dim)" }}>/</span>
            <Link
              href={pathname}
              locale="el"
              className="transition-colors px-1 py-0.5"
              style={{
                color: locale === "el" ? "var(--sage)" : "var(--ink-dim)",
                borderBottom: locale === "el" ? "1px solid var(--sage)" : "1px solid transparent",
              }}
            >
              ΕΛ
            </Link>
          </div>
        </div>

        {/* Mobile: hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px] cursor-pointer"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block h-px w-6 transition-colors"
            style={{ background: "var(--ink-muted)" }}
          />
          <span
            className="block h-px w-6 transition-colors"
            style={{ background: "var(--ink-muted)" }}
          />
          <span
            className="block h-px w-4 transition-colors"
            style={{ background: "var(--ink-muted)" }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 md:hidden"
          style={{ zIndex: 50 }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "oklch(4% 0.003 133 / 0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel */}
          <div
            className="relative flex flex-col h-full px-8 py-8"
            style={{
              animation: "menuSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium tracking-[0.2em] uppercase"
                style={{ color: "var(--sage)" }}
              >
                {t("name")}
              </span>

              {/* Close button */}
              <button
                className="flex items-center justify-center w-11 h-11 cursor-pointer"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <line
                    x1="3" y1="3" x2="17" y2="17"
                    stroke="var(--ink-muted)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="17" y1="3" x2="3" y2="17"
                    stroke="var(--ink-muted)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col justify-center flex-1 gap-2 -mt-12">
              {navLinks.map(({ href, label }, i) => (
                <a
                  key={href}
                  href={href}
                  className="py-4 text-3xl font-light tracking-wide transition-colors"
                  style={{
                    color: "var(--ink-muted)",
                    borderBottom: "1px solid var(--border)",
                    animationDelay: `${0.06 * i}s`,
                  }}
                  onClick={() => setMenuOpen(false)}
                  onTouchStart={(e) => (e.currentTarget.style.color = "var(--sage)")}
                  onTouchEnd={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Locale toggle */}
            <div className="flex items-center gap-3 pb-safe">
              <Link
                href={pathname}
                locale="en"
                className="text-sm font-medium tracking-widest px-2 py-2 transition-colors"
                style={{
                  color: locale === "en" ? "var(--sage)" : "var(--ink-dim)",
                  borderBottom: locale === "en" ? "1px solid var(--sage)" : "1px solid transparent",
                }}
                onClick={() => setMenuOpen(false)}
              >
                EN
              </Link>
              <span style={{ color: "var(--sage-dim)" }}>/</span>
              <Link
                href={pathname}
                locale="el"
                className="text-sm font-medium tracking-widest px-2 py-2 transition-colors"
                style={{
                  color: locale === "el" ? "var(--sage)" : "var(--ink-dim)",
                  borderBottom: locale === "el" ? "1px solid var(--sage)" : "1px solid transparent",
                }}
                onClick={() => setMenuOpen(false)}
              >
                ΕΛ
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
