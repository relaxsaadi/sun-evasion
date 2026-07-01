"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Plane, Star, Shield, Clock, Users, Phone, MessageCircle,
  ChevronRight, CheckCircle, MapPin, Calendar, ArrowRight, Sparkles
} from "lucide-react";
import { SITE, OMRA_PACKAGES } from "@/lib/constants";

const IMAGES = {
  istanbul: "/images/istanbul.webp",
  cappadoce: "/images/cappadoce.webp",
  antalya: "/images/antalya.webp",
  djerba: "/images/djerba.webp",
  omra: "/images/omra.jpg",
};

const PACKAGES = [
  {
    id: "istanbul-5j",
    name: "Istanbul Magique",
    destination: "Turquie",
    duration: "5 jours / 4 nuits",
    price: "89 000",
    image: IMAGES.istanbul,
    highlights: ["Hagia Sophia", "Grand Bazar", "Bosphore", "Vol + Hôtel"],
    badge: "Populaire",
    badgeColor: "bg-[#C9943A]",
  },
  {
    id: "cappadoce-7j",
    name: "Cappadoce Étoilée",
    destination: "Turquie",
    duration: "7 jours / 6 nuits",
    price: "145 000",
    image: IMAGES.cappadoce,
    highlights: ["Montgolfière", "Grottes de Göreme", "Vallée Rose", "Tout inclus"],
    badge: "Coup de cœur",
    badgeColor: "bg-[#0EA5E9]",
  },
  {
    id: "antalya-7j",
    name: "Antalya Turquoise",
    destination: "Turquie",
    duration: "7 jours / 6 nuits",
    price: "129 000",
    image: IMAGES.antalya,
    highlights: ["Plage 5 étoiles", "All Inclusive", "Piscine", "Spa inclus"],
    badge: "All Inclusive",
    badgeColor: "bg-green-600",
  },
  {
    id: "djerba-5j",
    name: "Djerba Paradis",
    destination: "Tunisie",
    duration: "5 jours / 4 nuits",
    price: "65 000",
    image: IMAGES.djerba,
    highlights: ["Plage de sable blanc", "Médina", "Excursions", "Vol direct"],
    badge: "Meilleur prix",
    badgeColor: "bg-[#C9943A]",
  },
  {
    id: "sousse-7j",
    name: "Sousse & Carthage",
    destination: "Tunisie",
    duration: "7 jours / 6 nuits",
    price: "95 000",
    image: IMAGES.djerba,
    highlights: ["Sousse medina", "Carthage antique", "Port El-Kantaoui", "Guide inclus"],
    badge: "Culture & Détente",
    badgeColor: "bg-purple-600",
  },
];

const TESTIMONIALS = [
  {
    name: "Karim B.",
    city: "Alger",
    rating: 5,
    text: "Voyage à Istanbul absolument parfait ! Sun Evasion s'est occupé de tout, de l'aéroport à l'hôtel. Je recommande sans hésitation.",
    dest: "Istanbul, Turquie",
  },
  {
    name: "Amira M.",
    city: "Oran",
    rating: 5,
    text: "La Cappadoce c'était un rêve d'enfant. Grâce à Sun Evasion, ce rêve est devenu réalité. Le vol en montgolfière était magique !",
    dest: "Cappadoce, Turquie",
  },
  {
    name: "Farid D.",
    city: "Constantine",
    rating: 5,
    text: "Excellent rapport qualité-prix pour Djerba. Famille très satisfaite, les enfants ont adoré. On repart l'année prochaine avec eux !",
    dest: "Djerba, Tunisie",
  },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({ name: "", phone: "", destination: "", date: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, passengers: 2 }),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={IMAGES.istanbul} alt="Istanbul au coucher du soleil" fill priority className="object-cover" sizes="100vw" />
          <div className="hero-overlay absolute inset-0" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-2 text-white text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Agence de voyage algérienne · Turquie &amp; Tunisie
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Votre Évasion<br />
            <span className="text-[#E8B85A]">Commence Ici</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/85 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Des voyages inoubliables depuis l&apos;Algérie vers la Turquie et la Tunisie.
            Vol + Hôtel + Transferts — tout inclus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#devis" className="btn-primary text-base !px-8 !py-3.5">
              Devis gratuit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Bonjour Sun Evasion, je voudrais des infos sur vos voyages`}
              target="_blank" rel="noopener noreferrer"
              className="btn-outline text-base !px-8 !py-3.5"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-12"
          >
            {[
              { icon: <Shield className="w-3.5 h-3.5 text-green-400" />, text: "Paiement sécurisé" },
              { icon: <Star className="w-3.5 h-3.5 text-yellow-400" />, text: "500+ avis 5 étoiles" },
              { icon: <CheckCircle className="w-3.5 h-3.5 text-blue-400" />, text: "Prix tout inclus" },
            ].map((b) => (
              <div key={b.text} className="trust-badge">
                {b.icon}
                <span>{b.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
            className="w-6 h-9 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white border-y border-[#E8E0D0] py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Voyageurs satisfaits" },
              { number: "5★", label: "Note moyenne" },
              { number: "10+", label: "Années d'expérience" },
              { number: "24h", label: "Support client" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="stat-number">{s.number}</div>
                <div className="text-[#8A8A8A] text-sm mt-1">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="py-20 px-4" id="destinations">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="section-tag">
              <MapPin className="w-3.5 h-3.5" /> Nos destinations
            </span>
            <h2 className="section-title mt-4 mb-1">Turquie, Tunisie &amp; Omra</h2>
            <div className="w-14 h-[3px] bg-gradient-to-r from-[#C9943A] to-[#E8B85A] rounded-full mx-auto mt-3 mb-4" />
            <p className="text-[#4A4A4A] max-w-xl mx-auto">Voyages de loisirs ou pèlerinage — tout inclus, depuis Alger.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer">
                <Image src={IMAGES.cappadoce} alt="Turquie" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <div className="text-[#E8B85A] text-sm font-semibold uppercase tracking-wider mb-2">À partir de 89 000 DA</div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Turquie</h3>
                  <p className="text-white/75 text-sm mb-4 max-w-xs">Istanbul, Cappadoce, Antalya — 3 univers uniques vous attendent.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Istanbul", "Cappadoce", "Antalya"].map((d) => (
                      <span key={d} className="bg-white/15 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">{d}</span>
                    ))}
                  </div>
                  <Link href="/destinations" className="inline-flex items-center gap-2 bg-[#C9943A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#A07020] transition-colors">
                    Découvrir <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer">
                <Image src={IMAGES.djerba} alt="Tunisie" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <div className="text-[#E8B85A] text-sm font-semibold uppercase tracking-wider mb-2">À partir de 65 000 DA</div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Tunisie</h3>
                  <p className="text-white/75 text-sm mb-4 max-w-xs">Djerba, Sousse, Carthage — mer turquoise et soleil sans fin.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Djerba", "Sousse", "Carthage"].map((d) => (
                      <span key={d} className="bg-white/15 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">{d}</span>
                    ))}
                  </div>
                  <Link href="/destinations" className="inline-flex items-center gap-2 bg-[#C9943A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#A07020] transition-colors">
                    Découvrir <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer">
                <Image src={IMAGES.omra} alt="Omra — La Mecque" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">🕌 Service Omra</span>
                </div>
                <div className="absolute bottom-0 left-0 p-7">
                  <div className="text-emerald-300 text-sm font-semibold uppercase tracking-wider mb-2">À partir de 250 000 DA</div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Omra</h3>
                  <p className="text-white/75 text-sm mb-4 max-w-xs">La Mecque &amp; Médine — visa inclus, guide religieux, hôtels proches du Haram.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["La Mecque", "Médine", "Ziyarat"].map((d) => (
                      <span key={d} className="bg-white/15 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">{d}</span>
                    ))}
                  </div>
                  <Link href="#omra" className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-700 transition-colors">
                    Voir les forfaits <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-4 bg-[#F5F0E8]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="section-tag">Pourquoi nous choisir</span>
            <h2 className="section-title mt-4">L&apos;excellence à chaque étape</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Agence agréée", text: "Agence officielle reconnue en Algérie. Vos réservations sont 100% sécurisées.", color: "text-green-600", bg: "bg-green-50" },
              { icon: Star, title: "Qualité 5 étoiles", text: "Hôtels sélectionnés, guides professionnels, expérience premium garantie.", color: "text-yellow-500", bg: "bg-yellow-50" },
              { icon: Clock, title: "Disponible 24h/24", text: "Notre équipe vous accompagne avant, pendant et après votre voyage.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Users, title: "Prix tout inclus", text: "Vol, hôtel, transferts, excursions — aucune surprise sur place.", color: "text-purple-600", bg: "bg-purple-50" },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <div className="card p-6 group h-full">
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-[#1A1A1A] text-lg mb-2">{f.title}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">{f.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-20 px-4" id="voyages">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="section-tag">
              <Plane className="w-3.5 h-3.5" /> Nos forfaits
            </span>
            <h2 className="section-title mt-4 mb-1">Voyages tout inclus</h2>
            <div className="w-14 h-[3px] bg-gradient-to-r from-[#C9943A] to-[#E8B85A] rounded-full mx-auto mt-3 mb-4" />
            <p className="text-[#4A4A4A] max-w-xl mx-auto">Vol + Hôtel + Transferts + Excursions. Réservez en ligne ou contactez-nous.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <FadeIn key={pkg.id} delay={i * 0.08}>
                <div className="card group h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover transition-transform duration-600 group-hover:scale-105" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                    <div className="absolute top-3 left-3">
                      <span className={`${pkg.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>{pkg.badge}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C9943A]" /> {pkg.destination}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-bold text-[#1A1A1A] text-xl">{pkg.name}</h3>
                        <div className="flex items-center gap-1 text-[#8A8A8A] text-sm mt-1">
                          <Calendar className="w-3.5 h-3.5" /> {pkg.duration}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className="text-[#8A8A8A] text-xs">à partir de</div>
                        <div className="font-display font-bold text-[#C9943A] text-xl">{pkg.price} DA</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 mb-5 flex-1">
                      {pkg.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-1.5 text-[#4A4A4A] text-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-[#E8E0D0]">
                      <a
                        href={`https://wa.me/${SITE.whatsapp}?text=Bonjour, je suis intéressé par le forfait ${pkg.name} (${pkg.duration})`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                      <Link href="/contact" className="btn-primary flex-1 !py-2.5 !px-4 justify-center text-sm">
                        Réserver
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OMRA ── */}
      <section className="py-20 px-4 bg-[#F5F0E8]" id="omra">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <span className="section-tag !bg-emerald-50 !text-emerald-800 !border-emerald-200">
                  🕌 Service Omra
                </span>
                <h2 className="section-title mt-4 mb-4">
                  Voyages <span className="gradient-gold">Omra</span>
                </h2>
                <div className="w-14 h-[3px] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full mb-5" />
                <p className="text-[#4A4A4A] text-lg leading-relaxed mb-6">
                  Sun Evasion vous accompagne pour votre pèlerinage avec des forfaits tout inclus —
                  La Mecque &amp; Médine — conçus pour vous permettre de vous concentrer
                  pleinement sur votre spiritualité.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Visa Omra inclus", "Guide religieux", "Hôtels proches Haram", "Ziyarat inclus", "Pension complète"].map((f) => (
                    <span key={f} className="flex items-center gap-1.5 bg-white border border-emerald-200 text-emerald-800 text-sm px-3 py-1.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image src={IMAGES.omra} alt="La Mecque — Omra" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl shrink-0">🕌</div>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">La Mecque &amp; Médine</div>
                      <div className="text-[#8A8A8A] text-sm">Départs depuis Alger · Visa inclus</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Omra packages grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OMRA_PACKAGES.map((pkg, i) => (
              <FadeIn key={pkg.id} delay={i * 0.08}>
                <div className="card h-full flex flex-col group">
                  <div className={`${pkg.color} px-5 pt-5 pb-4 rounded-t-[1.2rem]`}>
                    <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">{pkg.badge}</span>
                    <h3 className="font-display text-xl font-bold text-white mt-3 mb-1">{pkg.name}</h3>
                    <div className="text-white/75 text-sm flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {pkg.duration}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-[#8A8A8A] text-xs mb-1">à partir de</div>
                    <div className="font-display font-bold text-[#C9943A] text-2xl mb-1">{pkg.price} DA</div>
                    <div className="text-[#4A4A4A] text-xs mb-4 pb-4 border-b border-[#E8E0D0]">
                      🏨 {pkg.hotels}
                    </div>
                    <ul className="space-y-2 flex-1 mb-5">
                      {pkg.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-[#4A4A4A] text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/${SITE.whatsapp}?text=Bonjour, je suis intéressé par le forfait ${pkg.name} (${pkg.duration}) pour l'Omra`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Demander ce forfait
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Omra CTA banner */}
          <FadeIn delay={0.2}>
            <div className="mt-10 bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Omra sur mesure ?</h3>
                <p className="text-emerald-100">Dates personnalisées, groupe familial, budget spécifique — contactez-nous pour un forfait adapté.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2 bg-white text-emerald-800 font-semibold px-5 py-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" /> Appeler
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=Bonjour, je voudrais un forfait Omra personnalisé`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-500 text-white font-semibold px-5 py-3 rounded-xl hover:bg-emerald-400 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── LEAD MAGNET ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A]" id="devis">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="section-tag !bg-white/10 !text-[#E8B85A] !border-white/20">
                <Sparkles className="w-3.5 h-3.5" /> Gratuit &amp; sans engagement
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-5 mb-5 leading-tight">
                Obtenez votre<br />
                <span className="text-[#E8B85A]">devis personnalisé</span>
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Partagez-nous votre projet de voyage. Notre expert vous rappelle sous 2h avec une offre sur mesure.
              </p>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, text: "Réponse garantie en moins de 2 heures" },
                  { icon: Shield, text: "Aucun engagement, devis 100% gratuit" },
                  { icon: Phone, text: "Conseiller dédié pour votre voyage" },
                ].map((p) => (
                  <div key={p.text} className="flex items-center gap-3 text-white/80">
                    <p.icon className="w-5 h-5 text-[#C9943A] shrink-0" />
                    <span>{p.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-white/8 rounded-xl border border-white/10">
                <p className="text-[#8A8A8A] text-sm mb-2">Ou contactez-nous directement</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-white font-semibold hover:text-[#E8B85A] transition-colors">
                    <Phone className="w-4 h-4 text-[#C9943A]" /> {SITE.phone}
                  </a>
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-semibold hover:text-green-400 transition-colors">
                    <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-2">Demande envoyée !</h3>
                    <p className="text-[#4A4A4A]">Notre équipe vous contacte dans les 2 heures.</p>
                    <a
                      href={`https://wa.me/${SITE.whatsapp}?text=Bonjour, j'ai envoyé une demande de devis sur votre site`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-primary mt-6 inline-flex"
                    >
                      <MessageCircle className="w-4 h-4" /> Confirmer sur WhatsApp
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-6">Votre devis gratuit</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">Nom complet *</label>
                        <input type="text" required placeholder="Mohamed Benali" className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">Téléphone *</label>
                        <input type="tel" required placeholder="+213 7XX XXX XXX" className="form-input" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">Destination souhaitée *</label>
                      <select required className="form-input" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })}>
                        <option value="">Choisir une destination...</option>
                        <option value="Istanbul, Turquie">Istanbul, Turquie</option>
                        <option value="Cappadoce, Turquie">Cappadoce, Turquie</option>
                        <option value="Antalya, Turquie">Antalya, Turquie</option>
                        <option value="Djerba, Tunisie">Djerba, Tunisie</option>
                        <option value="Sousse, Tunisie">Sousse, Tunisie</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">Date de départ souhaitée</label>
                      <input type="date" className="form-input" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">Message (optionnel)</label>
                      <textarea rows={3} placeholder="Nombre de personnes, budget, demandes spéciales..." className="form-input resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full justify-center text-base !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                      {sending ? "Envoi en cours..." : <><span>Obtenir mon devis gratuit</span> <ArrowRight className="w-4 h-4" /></>}
                    </button>
                    <p className="text-center text-[#8A8A8A] text-xs">Réponse garantie sous 2h · Sans engagement</p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 bg-[#F5F0E8]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="section-tag"><Star className="w-3.5 h-3.5" /> Témoignages</span>
            <h2 className="section-title mt-4">Ils ont voyagé avec nous</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="card p-7 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4 stars">
                    {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-[#4A4A4A] italic leading-relaxed mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E8E0D0]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9943A] to-[#E8B85A] flex items-center justify-center text-white font-bold font-display shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A] text-sm">{t.name}</div>
                      <div className="text-[#8A8A8A] text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {t.city} · {t.dest}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANTALYA BANNER CTA ── */}
      <section className="relative h-72 md:h-80 overflow-hidden">
        <Image src={IMAGES.antalya} alt="Antalya Turquie" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <FadeIn>
            <p className="text-white/80 text-lg mb-3">Prêt pour votre prochaine aventure ?</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">Réservez dès maintenant</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#devis" className="btn-primary !text-base !px-8">Devis gratuit</Link>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Bonjour, je veux réserver un voyage`}
                target="_blank" rel="noopener noreferrer"
                className="btn-outline !text-base !px-8"
              >
                <MessageCircle className="w-4 h-4" /> Contacter sur WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STICKY WHATSAPP ── */}
      <a
        href={`https://wa.me/${SITE.whatsapp}?text=Bonjour Sun Evasion 👋 Je veux des infos sur vos voyages`}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl whatsapp-pulse"
        aria-label="Chat WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.843L.057 23.428a.75.75 0 00.918.919l5.618-1.47A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.721 9.721 0 01-4.96-1.355l-.356-.211-3.685.963.982-3.596-.232-.37A9.718 9.718 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/>
        </svg>
      </a>
    </div>
  );
}
