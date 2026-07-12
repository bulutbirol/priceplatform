import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const english = locale === "en";
  return {
    title: english ? "Price Explained" : "Fiyatın Anatomisi",
    description: english ? "Understand the specifications, components, and market factors behind product prices." : "Ürün fiyatlarını oluşturan teknik özellikleri, parçaları ve piyasa etkenlerini sade bir dille anlayın.",
    alternates: { canonical: `/${locale}`, languages: { tr: "/tr", en: "/en" } },
    openGraph: { locale: english ? "en_US" : "tr_TR", type: "website" },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(locale)}` }} />
      <div className="site-frame">
        <Header locale={locale} />
        <main className="site-main">{children}</main>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
