"use client";

import { motion } from "framer-motion";
import { Sun, Heart, Award, Users, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

const VALUES = [
  { icon: Heart, title: "Passion du voyage", desc: "Nous vivons pour voyager et partageons cette passion avec vous." },
  { icon: Award, title: "Excellence", desc: "Des séjours soigneusement sélectionnés pour une qualité garantie." },
  { icon: Users, title: "Confiance", desc: "Plus de 500 voyageurs nous font confiance chaque année." },
  { icon: MapPin, title: "Expertise locale", desc: "Basés à Alger, nous connaissons les besoins des voyageurs algériens." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] pt-32 pb-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden mb-10">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-[#d4a843]/5 blur-3xl -translate-y-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4a843] to-[#f0c96e] flex items-center justify-center mx-auto mb-6 animate-pulse-gold">
              <Sun className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Notre <span className="gradient-gold">histoire</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
              Sun Evasion est née d&apos;une passion simple : offrir aux Algériens des voyages
              inoubliables, organisés avec soin et professionnalisme, depuis Alger.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Qui sommes-<span className="gradient-gold">nous</span> ?
            </h2>
            <div className="space-y-4 text-white/60 text-lg leading-relaxed">
              <p>
                Sun Evasion est une agence de voyage algérienne spécialisée dans les séjours en
                Turquie et en Tunisie. Nous proposons des voyages clé en main, pensés pour les
                familles algériennes, les couples et les voyageurs individuels.
              </p>
              <p>
                Notre équipe de passionnés prend en charge tout — du vol à l&apos;hébergement, en
                passant par les transferts et les visites guidées avec des guides francophones.
              </p>
              <p>
                Basés à Alger, nous comprenons les besoins et les attentes de nos voyageurs. Notre
                objectif : que chaque client rentre chez lui avec des souvenirs plein les yeux et
                l&apos;envie de repartir.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "500+", label: "Voyageurs satisfaits", color: "#d4a843" },
              { value: "2", label: "Destinations phares", color: "#0891b2" },
              { value: "4.9★", label: "Note moyenne", color: "#d4a843" },
              { value: "24/7", label: "Support WhatsApp", color: "#0891b2" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
                style={{ border: `1px solid ${s.color}20` }}
              >
                <div className="text-4xl font-bold mb-2" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Nos <span className="gradient-gold">valeurs</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-[#d4a843]/20 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-[#d4a843]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-gold rounded-3xl p-10 text-center border border-[#d4a843]/20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à partir avec <span className="gradient-gold">Sun Evasion</span> ?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Contactez-nous pour organiser votre prochain voyage. Devis gratuit, réponse rapide.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Demander un devis</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
