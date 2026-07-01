"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Star, Clock, Plane, ArrowRight } from "lucide-react";
import { PACKAGES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function FeaturedPackages() {
  const featured = PACKAGES.filter((p) => p.popular || p.id === "istanbul-5j").slice(0, 3);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] to-[#060a14]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-[#d4a843]/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
            <Star className="w-4 h-4 text-[#d4a843]" />
            <span className="text-[#d4a843] text-sm font-medium">Nos Voyages Phares</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Voyages{" "}
            <span className="gradient-gold">sélectionnés</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Des séjours soigneusement préparés pour vous offrir une expérience inoubliable.
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#d4a843] to-[#f0c96e] text-black text-xs font-bold uppercase tracking-wider">
                    ⭐ Populaire
                  </span>
                </div>
              )}

              <div
                className={`h-full rounded-3xl border transition-all duration-300 overflow-hidden ${
                  pkg.popular
                    ? "border-[#d4a843]/40 shadow-[0_0_40px_rgba(212,168,67,0.15)]"
                    : "border-white/5 hover:border-white/10"
                } bg-gradient-to-b from-[#0f172a] to-[#0a0e1a] card-glow`}
              >
                {/* Card header */}
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs text-white/30 uppercase tracking-widest">
                        {pkg.destination === "turquie" ? "🇹🇷 Turquie" : "🇹🇳 Tunisie"}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">{pkg.name}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium glass text-[#d4a843]">
                      {pkg.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Plane className="w-3.5 h-3.5" />
                      Départ Alger
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="px-6 py-4 border-b border-white/5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold gradient-gold">
                      {pkg.price.toLocaleString("fr-DZ")}
                    </span>
                    <span className="text-white/40 text-sm">DZD / pers.</span>
                  </div>
                  <p className="text-white/30 text-xs mt-1">Vol + hébergement inclus</p>
                </div>

                {/* Includes */}
                <div className="p-6 flex-1">
                  <ul className="space-y-2.5 mb-6">
                    {pkg.includes.slice(0, 5).map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-white/70">
                        <Check className="w-4 h-4 text-[#d4a843] mt-0.5 shrink-0" />
                        {inc}
                      </li>
                    ))}
                    {pkg.includes.length > 5 && (
                      <li className="text-xs text-white/30 ml-6">
                        +{pkg.includes.length - 5} autres inclus...
                      </li>
                    )}
                  </ul>

                  <Button
                    variant={pkg.popular ? "gold" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link href={`/contact?package=${pkg.id}`}>Réserver ce séjour</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button variant="ghost" size="lg" asChild>
            <Link href="/voyages">
              Voir tous nos voyages <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
