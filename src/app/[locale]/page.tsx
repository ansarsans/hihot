import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CitySelector } from "@/components/site/city-selector";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "entry" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ru: "/ru",
        kk: "/kk",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: `/${locale}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CitySelector />;
}
