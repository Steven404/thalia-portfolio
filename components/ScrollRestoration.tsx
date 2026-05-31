"use client";

import { useLayoutEffect } from "react";
import { useLocale } from "next-intl";

/**
 * Scrolls to top on load and locale change so scroll-triggered entrance
 * animations always start from a clean state. Disables browser scroll
 * restoration on reload for the same reason.
 */
export default function ScrollRestoration() {
  const locale = useLocale();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [locale]);

  return null;
}
