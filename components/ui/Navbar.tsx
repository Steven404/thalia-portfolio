"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-8 md:px-16">
      <span
        className="text-sm font-medium tracking-[0.2em] uppercase animate-fade-in"
        style={{ color: "var(--sage)", animationDelay: "0s" }}
      >
        {t("name")}
      </span>

      <div className="flex items-center gap-8">
        {/* Page links */}
        <div
          className="flex gap-8 text-sm animate-fade-in delay-200"
          style={{ color: "var(--ink-muted)" }}
        >
          <a
            href="#classes"
            className="transition-colors cursor-pointer"
            style={{ color: "var(--ink-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
          >
            {t("classes")}
          </a>
          <a
            href="#contact"
            className="transition-colors cursor-pointer"
            style={{ color: "var(--ink-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
          >
            {t("contact")}
          </a>
        </div>

        {/* Locale toggle */}
        <div
          className="flex items-center gap-1 text-xs font-medium tracking-widest animate-fade-in delay-300"
        >
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
    </nav>
  );
}
