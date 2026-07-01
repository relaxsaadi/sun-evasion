"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, Clock, Plane, Star, Filter } from "lucide-react";
import { PACKAGES, DESTINATIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const FILTERS = [
  { label: "Tous", value: "all" },
  { label: "🇹🇷 Turquie", value: "turquie" },
  { label: "🇹🇳 Tunisie", value: "tunisie" },
];

export default function VoyagesPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? PACKAGES : PACKAGES.filter((p) => p.destination === filter);

  return (
    <div className="min-h-screen bg-[#0a0e1a] pt-32 pb-24">
      {/* Header */}
      <div className="relative overflow-hidden mb-16">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#d4a843]/5 blur-3xl -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
              <Plane className="w-4 h-4 text-[#d4a843]" />
              <span className="text-[#d4a843] text-sm font-medium">Nos Voyages</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Tous nos <span className="gradient-gold">séjours</span>
            </h1>
            <p className="text-white/50 text-xl max-w-xl mx-auto">
              {PACKAGES.length} voyages disponibles · Départs depuis Alger
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-10 flex-wrap"
        >
          <Filter className="w-4 h-4 text-white/30" />
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f.value
                  ? "bg-gradient-to-r from-[#d4a843] to-[#f0c96e] text-black"
                  : "glass text-white/60 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-white/30 text-sm">{filtered.length} résultats</span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg, i) => {
              const dest = DESTINATIONS.find((d) => d.id === pkg.destination);
              return (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="relative"
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-6 z-10">
                      <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-[#d4a843] to-[#f0c96e] text-black text-xs font-bold">
                        ⭐ Populaire
                      </span>
                    </div>
                  )}
                  <div
                    className={`h-full rounded-3xl border overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#0a0e1a] transition-all duration-300 card-glow ${
                      pkg.popular
                        ? "border-[#d4a843]/30 shadow-[0_0_40px_rgba(212,168,67,0.1)]"
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    {/* Destination color strip */}
                    <div
                      className="h-1 w-full"
                      style={{
                        background: `linear-gradient(90deg, ${dest?.accent || "#d4a843"}, rgba(212,168,67,0.3))`,
                      }}
                    />

                    <div className="p-6 border-b border-white/5">
                      <span className="text-xs text-white/30 uppercase tracking-widest">
                        {dest?.flag} {dest?.name}
                      </span>
                      <div className="flex items-start justify-between mt-1 mb-2">
                        <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                        <span className="glass px-2 py-0.5 rounded-full text-xs text-[#d4a843] ml-2 shrink-0">
                          {pkg.category}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Plane className="w-3 h-3" /> Alger
                        </span>
                      </div>
                    </div>

                    <div className="px-6 py-3 border-b border-white/5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold gradient-gold">
                          {pkg.price.toLocaleString("fr-DZ")}
                        </span>
                        <span className="text-white/30 text-xs">DZD / pers.</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pkg.highlights.map((h) => (
                          <span key={h} className="px-2 py-0.5 rounded text-xs glass text-white/50 flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 text-[#d4a843] fill-[#d4a843]" /> {h}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-1.5 mb-5">
                        {pkg.includes.slice(0, 3).map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-xs text-white/50">
                            <Check className="w-3 h-3 text-green-400 mt-0.5 shrink-0" /> {inc}
                          </li>
                        ))}
                        {pkg.includes.length > 3 && (
                          <li className="text-xs text-white/20 ml-5">+{pkg.includes.length - 3} inclus...</li>
                        )}
                      </ul>
                      <Button variant={pkg.popular ? "gold" : "outline"} className="w-full" size="sm" asChild>
                        <Link href={`/contact?package=${pkg.id}`}>Réserver ce séjour</Link>
                      </Button>
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
