import ContactContent from "@/components/sections/ContactContent";
import { getTranslations } from "next-intl/server";

export default async function Contact() {
  const t = await getTranslations("contact");

  const emailItem = {
    label: t("email.label"),
    subtitle: t("email.subtitle"),
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 md:py-28 px-8 md:px-16"
      style={{ background: "var(--bg)" }}
    >
      <ContactContent
        headline1={t("headline1")}
        headline2={t("headline2")}
        body={t("body")}
        footerCopy={t("footer_copy")}
        footerQuote={t("footer_quote")}
        emailItem={emailItem}
      />
    </section>
  );
}
