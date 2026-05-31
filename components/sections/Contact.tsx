import { getTranslations } from "next-intl/server";
import ContactContent from "@/components/sections/ContactContent";
import { CONTACT_HREFS } from "@/lib/data";
import type { ContactItem } from "@/lib/data";

export default async function Contact() {
  const t = await getTranslations("contact");

  const contactItems: ContactItem[] = [
    {
      icon: "phone",
      ...CONTACT_HREFS.phone,
      label: t("phone.label"),
      subtitle: t("phone.subtitle"),
    },
    {
      icon: "email",
      ...CONTACT_HREFS.email,
      label: t("email.label"),
      subtitle: t("email.subtitle"),
    },
    {
      icon: "instagram",
      ...CONTACT_HREFS.instagram,
      label: t("instagram.label"),
      subtitle: t("instagram.subtitle"),
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 px-8 md:px-16"
      style={{ background: "var(--bg)" }}
    >
      <ContactContent
        headline1={t("headline1")}
        headline2={t("headline2")}
        footerCopy={t("footer_copy")}
        footerQuote={t("footer_quote")}
        contactItems={contactItems}
      />
    </section>
  );
}
