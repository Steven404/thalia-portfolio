import { getTranslations } from "next-intl/server";
import WhyEnglishContent from "@/components/sections/WhyEnglishContent";

const BENEFIT_KEYS = [
  "benefit_1",
  "benefit_2",
  "benefit_3",
  "benefit_4",
  "benefit_5",
  "benefit_6",
  "benefit_7",
  "benefit_8",
  "benefit_9",
] as const;

export default async function WhyEnglish() {
  const t = await getTranslations("why");

  const benefits = BENEFIT_KEYS.map((key) => t(key));

  return (
    <section
      id="why-english"
      className="relative overflow-hidden py-28 px-8 md:px-16"
      style={{ background: "var(--surface)" }}
    >
      {/* Decorative ghost glyph */}
      <div
        className="pointer-events-none absolute -right-6 -bottom-10 select-none leading-none"
        style={{
          fontFamily: "var(--font-playfair), Playfair Display, serif",
          fontSize: "clamp(180px, 26vw, 360px)",
          color: "transparent",
          WebkitTextStroke: "1px oklch(46% 0.085 145 / 0.06)",
          fontStyle: "italic",
          fontWeight: 900,
        }}
        aria-hidden
      >
        ?
      </div>

      <div className="relative z-10">
        <WhyEnglishContent
          eyebrow={t("eyebrow")}
          headline1={t("headline1")}
          headline2={t("headline2")}
          intro={t("intro")}
          subIntro={t("sub_intro")}
          benefits={benefits}
          tagline={t("tagline")}
          conclusionEyebrow={t("conclusion_eyebrow")}
          conclusionBody1={t("conclusion_body1")}
          conclusionBody2={t("conclusion_body2")}
          conclusionBody3={t("conclusion_body3")}
        />
      </div>
    </section>
  );
}
