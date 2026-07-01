"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amina B.",
    city: "Alger",
    trip: "Istanbul + Cappadoce",
    rating: 5,
    text: "Une expérience absolument magique ! L'organisation était parfaite, le guide francophone exceptionnel. On a dormi dans une cave hotel en Cappadoce... inoubliable. Merci Sun Evasion !",
    avatar: "AB",
  },
  {
    name: "Karim M.",
    city: "Oran",
    trip: "Djerba 5 jours",
    rating: 5,
    text: "Voyage parfait pour la famille. Les enfants ont adoré les plages de Djerba. Prix très raisonnables, hôtel excellente qualité. Je recommande à tous mes amis !",
    avatar: "KM",
  },
  {
    name: "Sara & Ahmed",
    city: "Constantine",
    trip: "Antalya Tout-inclus",
    rating: 5,
    text: "Notre voyage de noces à Antalya a dépassé toutes nos attentes. L'équipe Sun Evasion a tout préparé aux moindres détails. On reviendra avec toute la famille !",
    avatar: "SA",
  },
];

const AVATAR_GRADIENTS = [
  "from-[#d4a843] to-[#f0c96e]",
  "from-[#0891b2] to-[#22d3ee]",
  "from-[#7c3aed] to-[#a78bfa]",
];

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#060a14]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a843]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
            <Star className="w-4 h-4 text-[#d4a843]" />
            <span className="text-[#d4a843] text-sm font-medium">Témoignages</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ils ont voyagé{" "}
            <span className="gradient-gold">avec nous</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#d4a843] text-[#d4a843]" />
            ))}
            <span className="ml-2 text-white/60 text-sm">4.9/5 · 500+ voyageurs</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-3xl p-7 border border-white/5 hover:border-[#d4a843]/15 transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#d4a843]/15" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#d4a843] text-[#d4a843]" />
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i]} flex items-center justify-center text-black font-bold text-sm`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">
                    {t.city} · {t.trip}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
