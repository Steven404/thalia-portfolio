import { getTranslations } from "next-intl/server";
import PhilosophyContent from "@/components/sections/PhilosophyContent";

export default async function Philosophy() {
  const t = await getTranslations("philosophy");

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden py-28 px-8 md:px-16"
      style={{ background: "var(--bg)" }}
    >
      {/* Decorative ghost letter */}
      <div
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none leading-none"
        style={{
          fontFamily: "var(--font-playfair), Playfair Display, serif",
          fontSize: "clamp(180px, 26vw, 360px)",
          color: "transparent",
          WebkitTextStroke: "1px oklch(67% 0.055 133 / 0.10)",
          fontStyle: "italic",
          fontWeight: 900,
        }}
        aria-hidden
      >
        A
      </div>

      <div className="relative z-10">
        <PhilosophyContent
          eyebrow={t("eyebrow")}
          headline1={t("headline1")}
          headline2={t("headline2")}
          body1={t("body1")}
          body2={t("body2")}
        />
      </div>
    </section>
  );
}
