import { getTranslations } from "next-intl/server";
import ClassesContent from "@/components/sections/ClassesContent";
import { LEVEL_CODES, LEVEL_FILLS } from "@/lib/data";

export default async function Classes() {
  const t = await getTranslations("classes");

  const levels = LEVEL_CODES.map((code) => ({
    code,
    fill: LEVEL_FILLS[code],
    name: t(`levels.${code}.name`),
    description: t(`levels.${code}.description`),
  }));

  return (
    <section
      id="classes"
      className="py-28 px-8 md:px-16"
      style={{ background: "var(--surface)" }}
    >
      <ClassesContent
        headline1={t("headline1")}
        headline2={t("headline2")}
        description={t("description")}
        footnote={t.rich("footnote", { br: () => <br /> })}
        levels={levels}
      />
    </section>
  );
}
