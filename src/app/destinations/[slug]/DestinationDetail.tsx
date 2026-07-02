"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Plane, MapPin, ArrowLeft, Star } from "lucide-react";
import type { DESTINATIONS, PACKAGES } from "@/lib/constants";

type Dest = (typeof DESTINATIONS)[number];
type Pkg = (typeof PACKAGES)[number];

const DEST_HERO: Record<string, string> = {
  turquie: "/images/istanbul.webp",
  tunisie: "/images/djerba.webp",
};

const PKG_PHOTOS: Record<string, string> = {
  "istanbul-5j": "/images/istanbul.webp",
  "cappadoce-7j": "/images/cappadoce.webp",
  "antalya-7j": "/images/antalya.webp",
  "djerba-5j": "/images/djerba.webp",
  "sousse-7j": "/images/sousse.webp",
};

export default function DestinationDetail({
  destination: dest,
  packages,
}: {
  destination: Dest;
  packages: Pkg[];
}) {
  const heroPhoto = DEST_HERO[dest.slug] || "/images/istanbul.webp";

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Photo Hero */}
      <div className="relative h-80 sm:h-96">
        <Image src={heroPhoto} alt={dest.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-end pb-10 pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Toutes les destinations
            </Link>
            <div className="flex items-end gap-5">
              <span className="text-7xl drop-shadow-2xl">{dest.flag}</span>
              <div>
                <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-2">
                  {dest.name}
                </h1>
                <p className="text-[#E8B85A] text-lg italic">&ldquo;{dest.tagline}&rdquo;</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Description + Highlights */}
      <div className="bg-white border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
            <p className="text-[#4A4A4A] text-lg max-w-2xl">{dest.description}</p>
            <div className="flex flex-wrap gap-2 shrink-0">
              {dest.highlights.map((h) => (
                <span
                  key={h}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F0E8] border border-[#E8E0D0] rounded-full text-sm text-[#4A4A4A]"
                >
                  <MapPin className="w-3 h-3 text-[#C9943A]" /> {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="section-tag mb-4">Séjours disponibles</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-4">
            Nos voyages en{" "}
            <span className="gradient-gold">{dest.name}</span>
          </h2>
          <p className="text-[#8A8A8A] mt-2">
            {packages.length} séjour{packages.length > 1 ? "s" : ""} disponible{packages.length > 1 ? "s" : ""} · Départ Alger
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => {
            const photo = PKG_PHOTOS[pkg.id] || heroPhoto;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-5 z-10">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#A07020] to-[#C9943A] text-white text-xs font-bold shadow-md">
                      ⭐ Populaire
                    </span>
                  </div>
                )}
                <div
                  className={`card h-full flex flex-col ${
                    pkg.popular ? "ring-2 ring-[#C9943A]/30" : ""
                  }`}
                >
                  {/* Photo */}
                  <div className="relative h-44 overflow-hidden">
                    <Image src={photo} alt={pkg.name} fill className="object-cover img-zoom" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
                        <Clock className="w-3 h-3" />{pkg.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Plane className="w-3 h-3" />Départ Alger
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-4 pb-4 border-b border-[#E8E0D0]">
                      <span className="text-2xl font-bold gradient-gold">
                        {pkg.price.toLocaleString("fr-DZ")}
                      </span>
                      <span className="text-[#8A8A8A] text-xs">DZD / pers.</span>
                    </div>

                    <ul className="space-y-1.5 mb-3">
                      {pkg.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <Star className="w-3.5 h-3.5 text-[#C9943A] fill-[#C9943A] shrink-0" /> {h}
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-1.5 mb-5 flex-1">
                      {pkg.includes.slice(0, 4).map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-xs text-[#4A4A4A]">
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /> {inc}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/contact?package=${pkg.id}`}
                      className="btn-primary w-full justify-center text-sm"
                    >
                      Réserver ce séjour
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
