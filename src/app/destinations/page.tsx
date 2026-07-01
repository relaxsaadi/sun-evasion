"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Plane, Sun } from "lucide-react";
import { DESTINATIONS, PACKAGES } from "@/lib/constants";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] pt-32 pb-24">
      {/* Header */}
      <div className="relative overflow-hidden mb-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#d4a843]/5 blur-3xl -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-[#0891b2]/5 blur-3xl -translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
              <MapPin className="w-4 h-4 text-[#d4a843]" />
              <span className="text-[#d4a843] text-sm font-medium">Nos Destinations</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Explorez le <span className="gradient-gold">monde</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">
              Deux destinations d&apos;exception choisies pour vous offrir le meilleur de la
              Méditerranée et de l&apos;Orient.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Destination cards */}
        <div className="space-y-24">
          {DESTINATIONS.map((dest, idx) => {
            const destPackages = PACKAGES.filter((p) => p.destination === dest.id);
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                    idx % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Visual panel */}
                  <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div
                      className="relative h-[500px] rounded-3xl overflow-hidden border border-white/5"
                      style={{
                        background: `
                          radial-gradient(ellipse at 30% 30%, ${dest.accent}30 0%, transparent 60%),
                          radial-gradient(ellipse at 70% 70%, rgba(212,168,67,0.1) 0%, transparent 50%),
                          linear-gradient(135deg, #0f172a 0%, #0a0e1a 100%)
                        `,
                      }}
                    >
                      {/* Flag */}
                      <div className="absolute top-8 left-8">
                        <span className="text-8xl drop-shadow-2xl">{dest.flag}</span>
                      </div>

                      {/* Highlights grid */}
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="grid grid-cols-2 gap-2">
                          {dest.highlights.map((h, i) => (
                            <motion.div
                              key={h}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              className="glass rounded-xl px-3 py-2 text-sm text-white/70 flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843]" />
                              {h}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Decorative pattern */}
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: `radial-gradient(${dest.accent}80 1px, transparent 1px)`,
                          backgroundSize: "25px 25px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className="text-5xl mb-4">{dest.flag}</div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                      {dest.name}
                    </h2>
                    <p className="text-[#d4a843] text-lg italic mb-4">&ldquo;{dest.tagline}&rdquo;</p>
                    <p className="text-white/60 text-lg leading-relaxed mb-8">
                      {dest.description}
                    </p>

                    {/* Meta info */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {[
                        { label: "Climat", value: dest.climate, icon: Sun },
                        { label: "Monnaie", value: dest.currency.split(" ")[0], icon: Plane },
                        { label: "Langue", value: dest.language.split(" / ")[0], icon: MapPin },
                      ].map((m) => (
                        <div key={m.label} className="glass rounded-xl p-3 text-center">
                          <m.icon className="w-4 h-4 text-[#d4a843] mx-auto mb-1" />
                          <div className="text-white/30 text-xs mb-0.5">{m.label}</div>
                          <div className="text-white text-sm font-medium">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Packages count */}
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/destinations/${dest.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4a843] to-[#f0c96e] text-black font-semibold hover:shadow-[0_0_30px_rgba(212,168,67,0.4)] hover:scale-105 transition-all duration-300"
                      >
                        Voir {destPackages.length} séjours <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
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
