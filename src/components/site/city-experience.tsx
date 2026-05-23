"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  BedDouble,
  Car,
  ConciergeBell,
  Leaf,
  Menu,
  Sparkles,
  Wifi,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BnovoWidget } from "@/components/site/bnovo-widget";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cityConfigs, type CitySlug, type Room } from "@/lib/hotel-data";
import { cn } from "@/lib/utils";

const amenityIcons = [ConciergeBell, Leaf, Sparkles, Car, Wifi, BedDouble];
const amenityKeys = [
  "concierge",
  "wellness",
  "breakfast",
  "transfer",
  "workspace",
  "housekeeping",
] as const;

type CityExperienceProps = {
  city: CitySlug;
};

export function CityExperience({ city }: CityExperienceProps) {
  const t = useTranslations("city");
  const common = useTranslations("common");
  const locale = useLocale();
  const cityConfig = cityConfigs[city];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);
  const overlayOpacity = useTransform(scrollY, [0, 420], [0.4, 0.75]);

  useEffect(() => {
    let previous = 0;

    const onScroll = () => {
      const current = window.scrollY;
      setIsHeaderHidden(current > 140 && current > previous);
      previous = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || activeRoom) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [isMenuOpen, activeRoom]);

  const navItems = [
    { href: "#rooms", label: common("navigation.stay") },
    { href: "#about", label: common("navigation.story") },
    { href: "#amenities", label: common("navigation.amenities") },
    { href: "#contact", label: common("navigation.contact") },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090b0e] text-[#f4efe7]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_12%_18%,rgba(194,169,118,0.18),transparent_38%),radial-gradient(circle_at_84%_82%,rgba(133,112,77,0.13),transparent_32%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 mx-auto mt-4 w-[calc(100%-1.5rem)] max-w-6xl rounded-full border border-white/14 bg-[#0e1116]/56 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-500 sm:px-6",
          isHeaderHidden ? "-translate-y-28" : "translate-y-0",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="text-[0.7rem] tracking-[0.3em] text-[#f4ead9]/80 uppercase"
          >
            {common("brand")}
          </Link>

          <nav className="hidden items-center gap-6 text-xs tracking-[0.2em] text-[#eee4d4]/75 uppercase lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#f9f3e8]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {(["en", "ru", "kk"] as const).map((language) => (
              <Link
                key={language}
                href={`/${language}/${city}`}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[0.62rem] tracking-[0.22em] uppercase transition",
                  language === locale
                    ? "bg-white/16 text-[#faf4e9]"
                    : "text-[#ece2d0]/60 hover:bg-white/10 hover:text-[#f7efe2]",
                )}
              >
                {common(`languages.${language}`)}
              </Link>
            ))}
            <Button asChild size="sm" className="ml-2">
              <a href="#booking">{t("header.book")}</a>
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen((value) => !value)}
            className="rounded-full border border-white/15 p-2.5 text-[#f3ebdb] lg:hidden"
            aria-label="Open navigation menu"
          >
            {isMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-[#0a0d11]/96 px-6 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm tracking-[0.17em] text-[#f2e9d8] uppercase"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex gap-2">
                {(["en", "ru", "kk"] as const).map((language) => (
                  <Link
                    key={language}
                    href={`/${language}/${city}`}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs tracking-[0.2em] uppercase",
                      language === locale
                        ? "border-[#c2a976]/60 bg-[#c2a976]/20 text-[#f5ecdc]"
                        : "border-white/15 text-[#e9dcc8]/70",
                    )}
                  >
                    {common(`languages.${language}`)}
                  </Link>
                ))}
              </div>
              <Button asChild className="w-full" size="lg">
                <a href="#booking" onClick={() => setIsMenuOpen(false)}>
                  {t("header.book")}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative isolate min-h-screen">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src={cityConfig.heroImage}
            alt={cityConfig.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,9,0.18)_0%,rgba(6,7,9,0.72)_58%,rgba(6,7,9,0.92)_100%)]"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(194,169,118,0.28),transparent_42%)]" />

        <div className="relative z-10 flex min-h-screen items-end px-6 pb-14 pt-28 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <motion.p
              className="text-[0.65rem] tracking-[0.34em] text-[#ded0ba]/80 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {cityConfig.locationTag}
            </motion.p>
            <motion.h1
              className="mt-4 text-4xl leading-[0.9] font-semibold tracking-tight text-balance text-[#f9f3e8] sm:text-6xl lg:text-8xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24 }}
            >
              {t(`hero.${city}.headline`)}
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-sm leading-relaxed text-[#efe4d4]/80 sm:text-[1rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.36 }}
            >
              {t(`hero.${city}.description`)}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
            >
              <Button asChild size="lg">
                <a href="#booking">{t("hero.ctaPrimary")}</a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="#rooms">{t("hero.ctaSecondary")}</a>
              </Button>
            </motion.div>

            <motion.p
              className="mt-8 text-[0.63rem] tracking-[0.26em] text-[#ddceb6]/70 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
            >
              {t("hero.scroll")}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl space-y-24 px-6 pb-28 pt-10 sm:px-10 lg:px-16">
        <BnovoWidget city={city} />

        <section id="rooms" className="space-y-8">
          <div className="max-w-3xl">
            <p className="text-[0.66rem] tracking-[0.28em] text-[#d7c8ae]/70 uppercase">
              {common("navigation.stay")}
            </p>
            <h2 className="mt-3 text-3xl leading-[1.02] font-semibold text-[#f4eee4] sm:text-[2.55rem]">
              {t("rooms.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#e8decd]/74 sm:text-base">
              {t("rooms.description")}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cityConfig.rooms.map((room, index) => (
              <motion.button
                key={room.id}
                type="button"
                className="group relative h-[450px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0f1318] text-left shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
                onClick={() => setActiveRoom(room)}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 1.2 }}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/82" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_15%,rgba(194,169,118,0.24),transparent_42%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col justify-end p-5">
                  <p className="text-[0.62rem] tracking-[0.22em] text-[#e5d8c2]/72 uppercase">
                    {room.subtitle}
                  </p>
                  <h3 className="mt-2 text-[1.7rem] leading-[1.05] font-semibold text-[#fbf6ec]">
                    {room.name}
                  </h3>
                  <p className="mt-3 text-xs tracking-[0.17em] text-[#e7dbc7]/80 uppercase">
                    {room.area}m2 • {room.guests} {t("rooms.specGuests")}
                  </p>
                  <span className="mt-4 inline-flex w-fit rounded-full border border-white/20 bg-white/[0.09] px-3 py-1.5 text-[0.62rem] tracking-[0.16em] text-[#f8efe1] uppercase">
                    {t("rooms.details")}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-7 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-7 sm:p-9">
            <p className="text-[0.66rem] tracking-[0.28em] text-[#d7c8ae]/70 uppercase">
              {common("navigation.story")}
            </p>
            <h2 className="text-3xl leading-[1.02] font-semibold text-[#f4eee4] sm:text-[2.5rem]">
              {t("about.title")}
            </h2>
            <p className="text-sm leading-relaxed text-[#e7ddcd]/75 sm:text-[0.95rem]">
              {t("about.description")}
            </p>
            <p className="text-sm leading-relaxed text-[#e7ddcd]/75 sm:text-[0.95rem]">
              {t(`about.${city}`)}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="relative h-60 overflow-hidden rounded-[1.45rem] border border-white/10 sm:h-72 lg:h-[250px]">
              <Image
                src={cityConfig.aboutImagePrimary}
                alt={`${cityConfig.name} interiors`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
            <div className="relative h-60 overflow-hidden rounded-[1.45rem] border border-white/10 sm:h-72 lg:h-[250px]">
              <Image
                src={cityConfig.aboutImageSecondary}
                alt={`${cityConfig.name} atmosphere`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
          </div>
        </section>

        <section id="amenities" className="space-y-7">
          <div className="max-w-3xl">
            <p className="text-[0.66rem] tracking-[0.28em] text-[#d7c8ae]/70 uppercase">
              {common("navigation.amenities")}
            </p>
            <h2 className="mt-3 text-3xl leading-[1.02] font-semibold text-[#f4eee4] sm:text-[2.5rem]">
              {t("amenities.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#e7ddcd]/75 sm:text-base">
              {t("amenities.description")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {amenityKeys.map((itemKey, index) => {
              const Icon = amenityIcons[index];

              return (
                <motion.div
                  key={itemKey}
                  className="group rounded-[1.3rem] border border-white/10 bg-[#101419]/74 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition-colors hover:bg-[#131921]"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="inline-flex rounded-full border border-[#c2a976]/35 bg-[#c2a976]/10 p-2.5 text-[#d9c09a]">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-[#f3ebde]">
                    {t(`amenities.items.${itemKey}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#dfd3bf]/72">
                    {t(`amenities.items.${itemKey}Body`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[340px] overflow-hidden rounded-[1.6rem] border border-white/10">
            <Image
              src={cityConfig.contactMapImage}
              alt={`${cityConfig.name} map`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-xl">
              <p className="text-[0.62rem] tracking-[0.2em] text-[#e8dcc8]/70 uppercase">
                {t("contact.mapCaption")}
              </p>
              <p className="mt-1 text-sm text-[#f5eee2]">{cityConfig.coordinates}</p>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <p className="text-[0.66rem] tracking-[0.28em] text-[#d7c8ae]/70 uppercase">
              {common("navigation.contact")}
            </p>
            <h2 className="mt-3 text-3xl leading-[1.02] font-semibold text-[#f4eee4]">
              {t("contact.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#e7ddcd]/75">
              {t("contact.description")}
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#10151a]/70 p-4">
                <p className="text-[0.62rem] tracking-[0.2em] text-[#d8c6a8]/70 uppercase">
                  {t("contact.address")}
                </p>
                <p className="mt-2 text-sm text-[#efe7d8]">{cityConfig.address}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#10151a]/70 p-4">
                <p className="text-[0.62rem] tracking-[0.2em] text-[#d8c6a8]/70 uppercase">
                  {t("contact.whatsapp")}
                </p>
                <a
                  href={`https://wa.me/${cityConfig.whatsapp.replace(/\D/g, "")}`}
                  className="mt-2 inline-block text-sm text-[#efe7d8] transition hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  {cityConfig.whatsapp}
                </a>
              </div>
            </div>

            <Button asChild className="mt-6 w-full">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(cityConfig.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                {t("contact.directions")}
              </a>
            </Button>
          </div>
        </section>
      </div>

      <footer className="relative z-10 border-t border-white/10 bg-[#080a0d] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.68rem] tracking-[0.32em] text-[#d9cdbb]/70 uppercase">
              {common("brand")}
            </p>
            <p className="mt-2 text-sm text-[#e5dac8]/70">{t("footer.tagline")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.16em] text-[#d4c5ac]/65 uppercase">
            <a href="#" className="transition hover:text-[#f8f0e2]">
              {t("footer.privacy")}
            </a>
            <a href="#" className="transition hover:text-[#f8f0e2]">
              {t("footer.terms")}
            </a>
            <a href="#" className="transition hover:text-[#f8f0e2]">
              {t("footer.offers")}
            </a>
            <span className="text-[#c9bca5]/45">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
        <Button asChild className="h-12 w-full">
          <a href="#booking">{t("header.book")}</a>
        </Button>
      </div>

      <Dialog
        open={Boolean(activeRoom)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveRoom(null);
          }
        }}
      >
        {activeRoom && (
          <DialogContent
            hideClose
            className="h-[92vh] max-w-6xl overflow-hidden border-white/10 bg-[#0a0d11]/96 p-0"
          >
            <div className="grid h-full lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative h-80 lg:h-full">
                <Image
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="relative flex h-full flex-col overflow-y-auto p-6 sm:p-8">
                <button
                  type="button"
                  onClick={() => setActiveRoom(null)}
                  className="absolute right-4 top-4 rounded-full border border-white/15 p-2 text-[#f3ebdb] transition hover:bg-white/10"
                  aria-label={t("rooms.close")}
                >
                  <X className="size-4" />
                </button>

                <DialogHeader className="max-w-md">
                  <p className="text-[0.64rem] tracking-[0.26em] text-[#d8c7ab]/70 uppercase">
                    {cityConfig.locationTag}
                  </p>
                  <DialogTitle className="text-3xl leading-tight text-[#f8f0e3] sm:text-4xl">
                    {activeRoom.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed text-[#ebdfcc]/78">
                    {activeRoom.subtitle}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[0.6rem] tracking-[0.18em] text-[#cfbc9c]/70 uppercase">
                      {t("rooms.specArea")}
                    </p>
                    <p className="mt-1 text-sm text-[#f0e7d8]">{activeRoom.area}m2</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[0.6rem] tracking-[0.18em] text-[#cfbc9c]/70 uppercase">
                      {t("rooms.specGuests")}
                    </p>
                    <p className="mt-1 text-sm text-[#f0e7d8]">{activeRoom.guests}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[0.6rem] tracking-[0.18em] text-[#cfbc9c]/70 uppercase">
                      {t("rooms.specBed")}
                    </p>
                    <p className="mt-1 text-sm text-[#f0e7d8]">{activeRoom.bed}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[0.6rem] tracking-[0.18em] text-[#cfbc9c]/70 uppercase">
                      {t("rooms.specView")}
                    </p>
                    <p className="mt-1 text-sm text-[#f0e7d8]">{activeRoom.view}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs tracking-[0.2em] text-[#d5c4a8]/75 uppercase">
                    {t("rooms.highlights")}
                  </p>
                  <div className="mt-3 space-y-2">
                    {activeRoom.highlights.map((highlight) => (
                      <p
                        key={highlight}
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#ece0ce]/82"
                      >
                        {highlight}
                      </p>
                    ))}
                  </div>
                </div>

                <Button asChild className="mt-auto w-full">
                  <a href="#booking" onClick={() => setActiveRoom(null)}>
                    {t("rooms.reserve")}
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
