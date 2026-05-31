import { getTranslations } from "next-intl/server";
import ContactCard from "@/components/ui/ContactCard";
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
      {/* Decorative background glyph */}
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 select-none leading-none"
        style={{
          fontFamily: "var(--font-playfair), Playfair Display, serif",
          fontSize: "clamp(200px, 30vw, 400px)",
          color: "transparent",
          WebkitTextStroke: "1px oklch(71% 0.115 65 / 0.08)",
          fontStyle: "italic",
          fontWeight: 900,
        }}
        aria-hidden
      >
        ℒ
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h2
            className="leading-tight"
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "var(--ink)",
              fontWeight: 700,
              textWrap: "balance",
              letterSpacing: "-0.02em",
            }}
          >
            {t("headline1")}
            <br />
            <em style={{ color: "var(--gold-bright)", fontStyle: "italic" }}>
              {t("headline2")}
            </em>
          </h2>
        </div>

        {/* Contact cards — gold hairline separators */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "var(--border-gold)" }}
        >
          {contactItems.map((item) => (
            <ContactCard key={item.icon} item={item} />
          ))}
        </div>

        {/* Footer strip */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--ink-dim)" }}
          >
            {t("footer_copy")}
          </span>
          <span
            className="text-xs italic"
            style={{
              fontFamily: "var(--font-playfair), Playfair Display, serif",
              color: "var(--gold-dim)",
            }}
          >
            &ldquo;{t("footer_quote")}&rdquo;
          </span>
        </div>
      </div>
    </section>
  );
}
