"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Sun, Thermometer } from "lucide-react";
import { DESTINATIONS } from "@/lib/constants";

export default function DestinationsPreview() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0d1220] to-[#0a0e1a]" />

      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#0891b2]/5 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-[#d4a843]/5 blur-3xl -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
            <MapPin className="w-4 h-4 text-[#d4a843]" />
            <span className="text-[#d4a843] text-sm font-medium">Nos Destinations</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Explorez le{" "}
            <span className="gradient-gold">monde</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Deux destinations d&apos;exception, des milliers de souvenirs. Choisissez votre
            prochaine aventure.
          </p>
        </motion.div>

        {/* Destination cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/destinations/${dest.slug}`} className="group block">
                <div className="relative rounded-3xl overflow-hidden h-[420px] card-glow transition-all duration-500 border border-white/5 group-hover:border-[#d4a843]/20">
                  {/* Background */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `
                        radial-gradient(ellipse at 30% 30%, ${dest.accent}25 0%, transparent 60%),
                        radial-gradient(ellipse at 70% 70%, rgba(212,168,67,0.1) 0%, transparent 50%),
                        linear-gradient(135deg, #0a0e1a 0%, #0f172a 100%)
                      `,
                    }}
                  />

                  {/* Decorative pattern */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(${dest.accent}50 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />

                  {/* Flag + country name */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="text-4xl drop-shadow-lg">{dest.flag}</span>
                    <div>
                      <div className="text-white/40 text-xs uppercase tracking-widest">
                        Destination
                      </div>
                      <div className="text-white font-bold text-xl">{dest.name}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-4">
                      <p className="text-[#d4a843] text-sm font-medium mb-2 italic">
                        &ldquo;{dest.tagline}&rdquo;
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                        {dest.description}
                      </p>
                    </div>

                    {/* Highlights pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {dest.highlights.slice(0, 4).map((h) => (
                        <span
                          key={h}
                          className="px-3 py-1 rounded-full text-xs font-medium glass text-white/70"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Sun className="w-3 h-3" />
                          {dest.climate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Thermometer className="w-3 h-3" />
                          {dest.currency}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[#d4a843] text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                        Explorer <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/60 to-transparent" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-[#d4a843] hover:text-[#f0c96e] font-semibold transition-colors duration-200"
          >
            Voir toutes les destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
