import { getTranslations } from "next-intl/server";
import ContactContent from "@/components/sections/ContactContent";
import { CONTACT_HREFS } from "@/lib/data";

export default async function Contact() {
  const t = await getTranslations("contact");

  const emailItem = {
    icon: "email" as const,
    ...CONTACT_HREFS.email,
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
        contactItem={emailItem}
      />
    </section>
  );
}
