"use client";

import { motion } from "framer-motion";
import { Shield, HeartHandshake, Clock, Award, MessageCircle, Plane } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Agence de confiance",
    description: "Agence agréée, basée à Alger. Tous nos voyages sont sécurisés et assurés.",
    color: "#d4a843",
  },
  {
    icon: HeartHandshake,
    title: "Service personnalisé",
    description: "Chaque voyage est adapté à vos besoins. Notre équipe vous accompagne de A à Z.",
    color: "#0891b2",
  },
  {
    icon: Clock,
    title: "Départs réguliers",
    description: "Des départs organisés chaque semaine depuis Alger pour toutes nos destinations.",
    color: "#d4a843",
  },
  {
    icon: Award,
    title: "Qualité premium",
    description: "Hôtels sélectionnés, guides francophones, transferts confortables inclus.",
    color: "#0891b2",
  },
  {
    icon: MessageCircle,
    title: "Support 24/7",
    description: "Notre équipe reste disponible pendant votre séjour via WhatsApp.",
    color: "#d4a843",
  },
  {
    icon: Plane,
    title: "Tout inclus",
    description: "Vols, hébergement, transferts. Vous n'avez qu'à profiter du voyage.",
    color: "#0891b2",
  },
];

export default function WhyUs() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 hero-bg" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a843]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
            <Award className="w-4 h-4 text-[#d4a843]" />
            <span className="text-[#d4a843] text-sm font-medium">Pourquoi nous choisir</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            L&apos;excellence du{" "}
            <span className="gradient-gold">voyage algérien</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Sun Evasion, c&apos;est votre partenaire voyage de confiance depuis Alger.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-[#d4a843]/20 transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
              >
                <feature.icon
                  className="w-6 h-6"
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
