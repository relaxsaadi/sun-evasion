"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Clock, Plane, MapPin, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DESTINATIONS, PACKAGES } from "@/lib/constants";

type Dest = (typeof DESTINATIONS)[number];
type Pkg = (typeof PACKAGES)[number];

export default function DestinationDetail({
  destination: dest,
  packages,
}: {
  destination: Dest;
  packages: Pkg[];
}) {
  return (
    <div className="min-h-screen bg-[#0a0e1a] pt-28 pb-24">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, ${dest.accent}25 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(212,168,67,0.08) 0%, transparent 40%),
              #0a0e1a
            `,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Toutes les destinations
            </Link>

            <div className="flex items-start gap-6">
              <span className="text-8xl drop-shadow-2xl">{dest.flag}</span>
              <div>
                <h1 className="text-5xl sm:text-7xl font-bold text-white mb-3">{dest.name}</h1>
                <p className="text-[#d4a843] text-xl italic mb-4">&ldquo;{dest.tagline}&rdquo;</p>
                <p className="text-white/60 text-lg max-w-2xl">{dest.description}</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3 mt-8">
              {dest.highlights.map((h) => (
                <span key={h} className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-[#d4a843]" /> {h}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-white">
            Nos séjours en{" "}
            <span className="gradient-gold">{dest.name}</span>
          </h2>
          <p className="text-white/40 mt-2">{packages.length} voyages disponibles · Départ Alger</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#d4a843] to-[#f0c96e] text-black text-xs font-bold">
                    ⭐ Populaire
                  </span>
                </div>
              )}
              <div
                className={`h-full rounded-3xl border overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#0a0e1a] transition-all duration-300 ${
                  pkg.popular ? "border-[#d4a843]/30 shadow-[0_0_40px_rgba(212,168,67,0.1)]" : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    <span className="glass px-2 py-0.5 rounded-full text-xs text-[#d4a843]">{pkg.category}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-white/40">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><Plane className="w-3.5 h-3.5" />Départ Alger</span>
                  </div>
                </div>

                <div className="px-6 py-4 border-b border-white/5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold gradient-gold">{pkg.price.toLocaleString("fr-DZ")}</span>
                    <span className="text-white/40 text-sm">DZD / pers.</span>
                  </div>
                </div>

                <div className="p-6">
                  <ul className="space-y-2 mb-4">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-white/60">
                        <Star className="w-3.5 h-3.5 text-[#d4a843] fill-[#d4a843]" /> {h}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2 mb-6">
                    {pkg.includes.slice(0, 4).map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-xs text-white/50">
                        <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" /> {inc}
                      </li>
                    ))}
                  </ul>
                  <Button variant={pkg.popular ? "gold" : "outline"} className="w-full" asChild>
                    <Link href={`/contact?package=${pkg.id}`}>Réserver</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
