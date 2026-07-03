"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sun, Heart, Award, Users, MapPin, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

const VALUES = [
  { icon: Heart, title: "Passion du voyage", desc: "Nous vivons pour voyager et partageons cette passion avec vous à chaque séjour." },
  { icon: Award, title: "Excellence", desc: "Des séjours soigneusement sélectionnés pour une qualité garantie à chaque étape." },
  { icon: Users, title: "Confiance", desc: "Plus de 500 voyageurs algériens nous font confiance chaque année." },
  { icon: MapPin, title: "Expertise locale", desc: "Basés à Alger, nous connaissons parfaitement les besoins des voyageurs algériens." },
];

const STATS = [
  { value: "500+", label: "Voyageurs satisfaits" },
  { value: "2", label: "Destinations phares" },
  { value: "4.9★", label: "Note moyenne" },
  { value: "24/7", label: "Support WhatsApp" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Photo Hero */}
      <div className="relative h-72 sm:h-80">
        <Image src="/images/istanbul.webp" alt="À propos de Sun Evasion" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9943A] to-[#E8B85A] flex items-center justify-center mx-auto mb-5">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              Notre histoire
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Une agence née de la passion du voyage, pour les Algériens
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Story + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <div>
            <span className="section-tag mb-5">Qui sommes-nous</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-4 mb-6">
              Sun Evasion, votre agence<br />
              <span className="gradient-gold">de voyage de confiance</span>
            </h2>
            <div className="space-y-4 text-[#4A4A4A] text-lg leading-relaxed">
              <p>
                Sun Evasion est une agence de voyage algérienne spécialisée dans les séjours en
                Turquie et en Tunisie. Nous proposons des voyages clé en main, pensés pour les
                familles algériennes, les couples et les voyageurs individuels.
              </p>
              <p>
                Notre équipe prend en charge tout — du vol à l&apos;hébergement, en passant par les
                transferts et les visites guidées avec des guides francophones.
              </p>
              <p>
                Basés à Alger, nous comprenons les besoins de nos voyageurs. Notre objectif : que
                chaque client rentre avec des souvenirs plein les yeux et l&apos;envie de repartir.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#E8E0D0] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="stat-number mb-2">{s.value}</div>
                <div className="text-[#4A4A4A] text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="section-tag mb-4">Ce qui nous définit</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-4">
              Nos <span className="gradient-gold">valeurs</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5F0E8] border border-[#E8E0D0] flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-[#C9943A]" />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">{v.title}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photo + Story visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20"
        >
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
            <Image src="/images/antalya.webp" alt="Antalya" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl lg:mt-10">
            <Image src="/images/djerba.webp" alt="Djerba" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#1C1C1C] rounded-3xl p-10 sm:p-14 text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Prêt à partir avec{" "}
            <span className="gradient-gold">Sun Evasion</span> ?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
            Contactez-nous pour organiser votre prochain voyage. Devis gratuit, réponse en 2 heures.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Demander un devis gratuit
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Bonjour Sun Evasion, je voudrais des informations.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#20BC5A] transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-full border border-white/20 hover:bg-white/15 transition-colors"
            >
              <Phone className="w-5 h-5" /> {SITE.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
