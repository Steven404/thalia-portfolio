import ScrollRestoration from "@/components/ScrollRestoration";
import Navbar from "@/components/ui/Navbar";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

interface LayoutParams {
  locale: string;
}

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://english-with-thalia.site"),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "en" ? "/" : "/el",
      languages: { en: "/", el: "/el", "x-default": "/" },
    },
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
    keywords: t("keywords"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/thalia.png"></link>
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <ScrollRestoration />
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
