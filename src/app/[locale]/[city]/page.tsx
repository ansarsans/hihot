import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CityExperience } from "@/components/site/city-experience";
import { cityConfigs, citySlugs, isCitySlug } from "@/lib/hotel-data";
import { routing } from "@/i18n/routing";

type CityPageProps = {
  params: Promise<{ locale: string; city: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    citySlugs.map((city) => ({ locale, city })),
  );
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { locale, city } = await params;

  if (!isCitySlug(city)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "city.hero" });
  const cityConfig = cityConfigs[city];
  const title = cityConfig.name;
  const description = t(`${city}.description`);

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/${city}`,
      languages: {
        en: `/en/${city}`,
        ru: `/ru/${city}`,
        kk: `/kk/${city}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${locale}/${city}`,
      images: [
        {
          url: cityConfig.heroImage,
          alt: cityConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cityConfig.heroImage],
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { locale, city } = await params;

  if (!isCitySlug(city)) {
    notFound();
  }

  setRequestLocale(locale);

  const cityConfig = cityConfigs[city];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: cityConfig.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: cityConfig.address,
      addressCountry: "KZ",
    },
    telephone: cityConfig.whatsapp,
    image: [cityConfig.heroImage],
    url: `https://hihotel.kz/${locale}/${city}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityExperience city={city} />
    </>
  );
}
