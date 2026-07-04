"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Plane, Star, Filter } from "lucide-react";
import { PACKAGES, DESTINATIONS } from "@/lib/constants";
import { useLang } from "@/contexts/LangContext";

const PKG_PHOTOS: Record<string, string> = {
  "istanbul-5j": "/images/istanbul.webp",
  "cappadoce-7j": "/images/cappadoce.webp",
  "antalya-7j": "/images/antalya.webp",
  "djerba-5j": "/images/djerba.webp",
  "sousse-7j": "/images/sousse.webp",
};

export default function VoyagesContent() {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? PACKAGES : PACKAGES.filter((p) => p.destination === filter);

  const FILTERS = [
    { label: t("voyages_filter_all"), value: "all" },
    { label: "🇹🇷 Turquie", value: "turquie" },
    { label: "🇹🇳 Tunisie", value: "tunisie" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <div className="relative h-72 sm:h-80">
        <Image src="/images/cappadoce.webp" alt="Voyages Sun Evasion" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/25 mb-4">
              <Plane className="w-3.5 h-3.5" /> {t("voyages_tag")}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              {t("voyages_title")}
            </h1>
            <p className="text-white/80 text-lg">
              {PACKAGES.length} {t("voyages_subtitle_from")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3 mb-10 flex-wrap"
        >
          <Filter className="w-4 h-4 text-[#8A8A8A]" />
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === f.value
                  ? "bg-gradient-to-r from-[#A07020] to-[#C9943A] text-white shadow-md"
                  : "bg-white border border-[#E8E0D0] text-[#4A4A4A] hover:border-[#C9943A] hover:text-[#C9943A]"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-[#8A8A8A] text-sm">{filtered.length} {t("voyages_results")}</span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg, i) => {
              const dest = DESTINATIONS.find((d) => d.id === pkg.destination);
              const photo = PKG_PHOTOS[pkg.id] || "/images/istanbul.webp";
              return (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="relative"
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-5 z-10">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#A07020] to-[#C9943A] text-white text-xs font-bold shadow-md">
                        ⭐ {t("voyages_popular")}
                      </span>
                    </div>
                  )}
                  <div
                    className={`card h-full flex flex-col ${
                      pkg.popular ? "ring-2 ring-[#C9943A]/30" : ""
                    }`}
                  >
                    {/* Photo */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={photo}
                        alt={pkg.name}
                        fill
                        className="object-cover img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-white/90 text-xs font-medium">
                          {dest?.flag} {dest?.name}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/90 text-[#4A4A4A] text-xs font-semibold px-2.5 py-1 rounded-full">
                          {pkg.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-1.5">
                        {pkg.name}
                      </h3>
                      <div className="flex gap-4 text-xs text-[#8A8A8A] mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Plane className="w-3 h-3" /> {t("voyages_depart_alger")}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1.5 mb-4 pb-4 border-b border-[#E8E0D0]">
                        <span className="text-2xl font-bold gradient-gold">
                          {pkg.price.toLocaleString("fr-DZ")}
                        </span>
                        <span className="text-[#8A8A8A] text-xs">{t("voyages_from")}</span>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pkg.highlights.slice(0, 3).map((h) => (
                          <span
                            key={h}
                            className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#F5F0E8] text-[#4A4A4A] text-xs"
                          >
                            <Star className="w-2.5 h-2.5 text-[#C9943A] fill-[#C9943A]" /> {h}
                          </span>
                        ))}
                      </div>

                      {/* Includes */}
                      <ul className="space-y-1.5 mb-5 flex-1">
                        {pkg.includes.slice(0, 3).map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-xs text-[#4A4A4A]">
                            <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> {inc}
                          </li>
                        ))}
                        {pkg.includes.length > 3 && (
                          <li className="text-xs text-[#8A8A8A] ml-5">
                            +{pkg.includes.length - 3} {t("voyages_more_includes")}
                          </li>
                        )}
                      </ul>

                      <Link href={`/contact?package=${pkg.id}`} className="btn-primary w-full justify-center text-sm">
                        {t("voyages_book")}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
