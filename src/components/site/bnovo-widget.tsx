"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type CitySlug, cityConfigs } from "@/lib/hotel-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type BnovoWidgetProps = {
  city: CitySlug;
};

export function BnovoWidget({ city }: BnovoWidgetProps) {
  const t = useTranslations("city.booking");
  const [isSearching, setIsSearching] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);

  const cityConfig = cityConfigs[city];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSearchComplete(false);
    setIsSearching(true);
    window.setTimeout(() => {
      setIsSearching(false);
      setSearchComplete(true);
    }, 1200);
  }

  return (
    <section
      id="booking"
      className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] px-6 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-[#c2a976]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-[#a4875e]/15 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <p className="text-[0.65rem] tracking-[0.26em] text-[#ddcfbb]/70 uppercase">
            Bnovo Ready Container
          </p>
          <h2 className="max-w-xl text-3xl leading-[1.02] font-semibold text-[#f4ede2] sm:text-[2.45rem]">
            {t("title")}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#e7ddcd]/75 sm:text-[0.95rem]">
            {t("description")}
          </p>

          <div className="rounded-2xl border border-dashed border-[#d6c5a7]/35 bg-black/20 p-4 text-xs leading-relaxed text-[#dbcfb9]/85">
            <p className="font-medium text-[#efe6d7]">{t("integrationTitle")}</p>
            <p className="mt-2">{t("integrationBody")}</p>
            <p className="mt-3 text-[#d2c3aa]/80">{t("placeholder")}</p>
          </div>

          <div
            className="hidden"
            data-bnovo-city={city}
            data-bnovo-u-id={cityConfig.bnovoUidPlaceholder}
            id={`bnovo-${city}`}
          />
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-[#0f1318]/70 p-5 sm:p-6"
          initial={{ opacity: 0.8, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <label className="block space-y-2">
            <span className="text-xs tracking-[0.18em] text-[#dfcfb5]/75 uppercase">
              {t("checkIn")}
            </span>
            <Input type="date" required />
          </label>

          <label className="block space-y-2">
            <span className="text-xs tracking-[0.18em] text-[#dfcfb5]/75 uppercase">
              {t("checkOut")}
            </span>
            <Input type="date" required />
          </label>

          <label className="block space-y-2">
            <span className="text-xs tracking-[0.18em] text-[#dfcfb5]/75 uppercase">
              {t("guests")}
            </span>
            <select
              className="h-11 w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 text-sm text-[#f5f1ea] outline-none transition-colors focus-visible:border-[#c2a976]/70 focus-visible:ring-2 focus-visible:ring-[#c2a976]/40"
              defaultValue="2"
            >
              <option value="1" className="bg-[#111418] text-[#f5f1ea]">
                {t("guestsSingle")}
              </option>
              <option value="2" className="bg-[#111418] text-[#f5f1ea]">
                {t("guestsDouble")}
              </option>
              <option value="3" className="bg-[#111418] text-[#f5f1ea]">
                {t("guestsFamily")}
              </option>
            </select>
          </label>

          <Button type="submit" className="w-full" size="lg">
            {isSearching ? t("searching") : t("search")}
          </Button>

          {isSearching && (
            <div className="space-y-2 pt-2">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-5/6" />
            </div>
          )}

          {!isSearching && searchComplete && (
            <p className="rounded-xl border border-[#c2a976]/30 bg-[#c2a976]/10 px-3 py-2 text-xs text-[#f2e7d4]">
              {t("placeholder")}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
