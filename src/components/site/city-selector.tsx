"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cityConfigs, citySlugs, type CitySlug } from "@/lib/hotel-data";

export function CitySelector() {
  const t = useTranslations("entry");
  const common = useTranslations("common");
  const locale = useLocale();
  const [activeCity, setActiveCity] = useState<CitySlug | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0b0d] text-[#f3eee4]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(194,169,118,0.20),transparent_46%),radial-gradient(circle_at_80%_70%,rgba(149,126,88,0.12),transparent_40%)]" />

      <header className="absolute inset-x-0 top-0 z-20 px-6 pb-8 pt-7 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <p className="text-[0.66rem] tracking-[0.38em] text-[#d9cfbe]/75 uppercase">
            {common("brand")}
          </p>
          <p className="hidden text-xs tracking-[0.22em] text-[#d6cbb8]/55 uppercase sm:block">
            {t("eyebrow")}
          </p>
        </div>
      </header>

      <section className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-8 pt-28 sm:px-10 lg:px-16">
        <motion.div
          className="mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="max-w-4xl text-4xl leading-[0.95] font-semibold tracking-tight text-balance text-[#f4efe7] sm:text-5xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#dfd4c4]/75 sm:text-base">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {citySlugs.map((city, index) => {
            const cityData = cityConfigs[city];
            const isActive = activeCity === city;

            return (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveCity(city)}
                onMouseLeave={() => setActiveCity(null)}
              >
                <Link
                  href={`/${locale}/${city}`}
                  className="group relative block h-[47vh] min-h-[350px] overflow-hidden rounded-[1.65rem] border border-white/12 bg-[#101215] shadow-[0_20px_80px_rgba(0,0,0,0.38)] md:h-[58vh]"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: isActive ? 1.06 : 1.01 }}
                    transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={cityData.entryImage}
                      alt={cityData.name}
                      fill
                      priority={index === 0}
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/75"
                    animate={{ opacity: isActive ? 0.82 : 0.94 }}
                    transition={{ duration: 0.9 }}
                  />

                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(194,169,118,0.28),transparent_48%)]"
                    animate={{
                      opacity: isActive ? 0.95 : 0.45,
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{ duration: 1.2 }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-9">
                    <div>
                      <p className="text-[0.65rem] tracking-[0.28em] text-[#e5d9c7]/70 uppercase">
                        {cityData.locationTag}
                      </p>
                      <h2 className="mt-3 text-4xl leading-[0.92] font-semibold tracking-tight text-[#f7f1e8] sm:text-5xl">
                        {common(`cityNames.${city}`)}
                      </h2>
                      <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#e9decd]/80">
                        {t(`cards.${city}.description`)}
                      </p>
                    </div>

                    <motion.div
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-4 py-2 text-xs tracking-[0.14em] text-[#f6efe4] uppercase backdrop-blur-lg"
                      animate={{ x: isActive ? 6 : 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span>{t(`cards.${city}.cta`)}</span>
                      <span aria-hidden>+</span>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-7 max-w-2xl text-xs tracking-[0.17em] text-[#d5c8b4]/65 uppercase">
          {t("bottomNote")}
        </p>
      </section>
    </main>
  );
}
