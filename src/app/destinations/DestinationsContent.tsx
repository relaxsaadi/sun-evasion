"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Sun, Plane } from "lucide-react";
import { DESTINATIONS, PACKAGES } from "@/lib/constants";
import { useLang } from "@/contexts/LangContext";

const DEST_PHOTOS: Record<string, string> = {
  turquie: "/images/istanbul.webp",
  tunisie: "/images/djerba.webp",
};

export default function DestinationsContent() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <div className="pt-32 pb-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag mb-5">
              <MapPin className="w-3.5 h-3.5" /> {t("destinations_tag")}
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#1A1A1A] mt-4 mb-5">
              {t("destinations_title_1")} <span className="gradient-gold">{t("destinations_title_gold")}</span>
            </h1>
            <p className="text-[#4A4A4A] text-xl max-w-2xl mx-auto">
              {t("destinations_subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Destination cards */}
        <div className="space-y-20">
          {DESTINATIONS.map((dest, idx) => {
            const destPackages = PACKAGES.filter((p) => p.destination === dest.id);
            const photo = DEST_PHOTOS[dest.slug];
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    idx % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Photo */}
                  <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="relative h-[460px] rounded-3xl overflow-hidden group shadow-xl">
                      <Image
                        src={photo}
                        alt={dest.name}
                        fill
                        className="object-cover img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex flex-wrap gap-2">
                          {dest.highlights.slice(0, 4).map((h) => (
                            <span key={h} className="trust-badge text-xs">
                              <MapPin className="w-3 h-3 text-[#C9943A]" /> {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className="text-6xl mb-5">{dest.flag}</div>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-3">
                      {dest.name}
                    </h2>
                    <p className="text-[#C9943A] text-lg italic mb-5">&ldquo;{dest.tagline}&rdquo;</p>
                    <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">
                      {dest.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {[
                        { label: t("destinations_climate"), value: dest.climate.split(" /")[0], icon: Sun },
                        { label: t("destinations_flight"), value: t("destinations_flight_val"), icon: Plane },
                        { label: t("destinations_language"), value: dest.language.split(" / ")[0], icon: MapPin },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="bg-white border border-[#E8E0D0] rounded-xl p-3 text-center"
                        >
                          <m.icon className="w-4 h-4 text-[#C9943A] mx-auto mb-1" />
                          <div className="text-[#8A8A8A] text-xs mb-0.5">{m.label}</div>
                          <div className="text-[#1A1A1A] text-sm font-semibold">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    <Link href={`/destinations/${dest.slug}`} className="btn-primary">
                      {destPackages.length} {t("destinations_see_stays")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Omra CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-72">
              <Image src="/images/omra.jpg" alt="Omra" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="relative h-full flex items-center px-10 sm:px-14">
                <div>
                  <span className="text-[#C9943A] text-sm font-semibold uppercase tracking-widest mb-3 block">
                    {t("destinations_omra_tag")}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                    {t("destinations_omra_title")}
                  </h2>
                  <p className="text-white/75 mb-6 max-w-md">
                    {t("destinations_omra_desc")}
                  </p>
                  <Link href="/contact?destination=omra" className="btn-primary">
                    {t("destinations_omra_cta")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
