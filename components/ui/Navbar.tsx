"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ignoreOpenRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "#classes", label: t("classes"), id: "classes" },
    { href: "#philosophy", label: t("philosophy"), id: "philosophy" },
    { href: "#why-english", label: t("why"), id: "why" },
    { href: "#contact", label: t("contact"), id: "contact" },
  ];

  useEffect(() => {
    const HEADER_HEIGHT = 64;

    const updateActive = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setScrolled(scrollY > 20);

      const sections = navLinks.map(({ id }) => {
        const el = document.getElementById(id);
        return {
          id,
          top: el ? el.getBoundingClientRect().top + scrollY : Infinity,
        };
      });

      const nearBottom = scrollY + windowHeight >= docHeight - 4;
      // if (nearBottom) {
      //   setActiveSection(sections[sections.length - 1].id);
      //   return;
      // }

      // const passed = sections.filter(({ top }) => top <= scrollY + HEADER_HEIGHT + 10);
      // setActiveSection(passed.length === 0 ? '' : passed[passed.length - 1].id);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  useEffect(() => setMounted(true), []);

  const closeMenu = () => {
    setMenuOpen(false);
    // Block ghost clicks from re-opening the menu after close (mobile)
    ignoreOpenRef.current = true;
    window.setTimeout(() => {
      ignoreOpenRef.current = false;
    }, 400);
  };

  const openMenu = () => {
    if (ignoreOpenRef.current) return;
    setMenuOpen(true);
  };

  // Close on Escape key + lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="z-50 flex items-center justify-between px-8 py-8 md:px-16 sticky md:fixed md:w-full top-0 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgb(146, 182, 146, 0.5)" // sage-bright with less opacity
            : "rgba(0,49,53,0)",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--sage-bright)"
            : "1px solid transparent",
        }}
      >
        <div className="flex gap-1 items-center">
          <span
            className="text-sm lg:text-md font-medium tracking-[0.2em] uppercase animate-fade-in"
            style={{ color: "var(--sage)", animationDelay: "0s" }}
          >
            {t("name")}
          </span>
        </div>

        {/* Desktop: links + locale toggle */}
        <div className="pl-5 hidden lg:flex items-center gap-4 xl:gap-8">
          <div
            className="flex gap-4 xl:gap-8 text-sm animate-fade-in delay-200"
            style={{ color: "var(--ink-muted)" }}
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="transition-colors cursor-pointer whitespace-nowrap"
                style={{ color: "var(--ink-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--sage)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ink-muted)")
                }
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
                borderBottom:
                  locale === "en"
                    ? "1px solid var(--sage)"
                    : "1px solid transparent",
              }}
            >
              EN
            </Link>
            <span
              style={{
                color: scrolled ? "var(--sage-bright)" : "var(--sage-dim)",
              }}
            >
              /
            </span>
            <Link
              href={pathname}
              locale="el"
              className="transition-colors px-1 py-0.5"
              style={{
                color: locale === "el" ? "var(--sage)" : "var(--ink-dim)",
                borderBottom:
                  locale === "el"
                    ? "1px solid var(--sage)"
                    : "1px solid transparent",
              }}
            >
              ΕΛ
            </Link>
          </div>
        </div>

        {/* Mobile: hamburger button — hidden while menu is open to avoid ghost-click reopen */}
        <button
          className={`lg:hidden pl-5 flex flex-col justify-center items-center w-11 h-11 gap-[6px] cursor-pointer ${
            menuOpen ? "pointer-events-none invisible" : ""
          }`}
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          tabIndex={menuOpen ? -1 : 0}
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
      </header>

      {/* Mobile menu overlay — portaled to body to escape overflow/stacking contexts */}
      {mounted &&
        menuOpen &&
        createPortal(
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
              style={{
                background: "oklch(97.5% 0.017 75 / 0.96)",
                backdropFilter: "blur(16px)",
              }}
              onClick={closeMenu}
            />

            {/* Panel */}
            <div
              className="relative z-10 flex flex-col h-full px-8 py-8"
              style={{
                animation:
                  "menuSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              {/* Header row */}
              <div className="flex items-center justify-end">
                {/* <span
                className="text-sm font-medium tracking-[0.2em] uppercase"
                style={{ color: "var(--sage)" }}
              >
                {t("name")}
              </span> */}

                {/* Close button */}
                <button
                  type="button"
                  className="relative z-20 flex items-center justify-center w-11 h-11 cursor-pointer touch-manipulation"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeMenu();
                  }}
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
                      x1="3"
                      y1="3"
                      x2="17"
                      y2="17"
                      stroke="var(--ink-muted)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="17"
                      y1="3"
                      x2="3"
                      y2="17"
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
                      color: "var(--sage)",
                      borderBottom: "1px solid var(--border)",
                      animationDelay: `${0.06 * i}s`,
                    }}
                    onClick={closeMenu}
                    onTouchStart={(e) =>
                      (e.currentTarget.style.color = "var(--sage)")
                    }
                    onTouchEnd={(e) =>
                      (e.currentTarget.style.color = "var(--ink-muted)")
                    }
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
                    borderBottom:
                      locale === "en"
                        ? "1px solid var(--sage)"
                        : "1px solid transparent",
                  }}
                  onClick={closeMenu}
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
                    borderBottom:
                      locale === "el"
                        ? "1px solid var(--sage)"
                        : "1px solid transparent",
                  }}
                  onClick={closeMenu}
                >
                  ΕΛ
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
