import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { citySlugs } from "@/lib/hotel-data";

const baseUrl = "https://hihotel.kz";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const localeRoots = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const cityRoutes = routing.locales.flatMap((locale) =>
    citySlugs.map((city) => ({
      url: `${baseUrl}/${locale}/${city}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  return [...localeRoots, ...cityRoutes];
}
