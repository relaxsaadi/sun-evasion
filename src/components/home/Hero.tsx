"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Star, Users, Plane } from "lucide-react";

const SLIDES = [
  {
    city: "Istanbul",
    country: "Turquie",
    flag: "🇹🇷",
    tagline: "Là où l'Orient rencontre l'Occident",
    gradient: "from-red-950/80 via-black/50 to-transparent",
    color: "#dc2626",
  },
  {
    city: "Cappadoce",
    country: "Turquie",
    flag: "🇹🇷",
    tagline: "Des paysages de conte de fées",
    gradient: "from-orange-950/80 via-black/50 to-transparent",
    color: "#ea580c",
  },
  {
    city: "Djerba",
    country: "Tunisie",
    flag: "🇹🇳",
    tagline: "La méditerranée à portée de main",
    gradient: "from-amber-950/80 via-black/50 to-transparent",
    color: "#d97706",
  },
];

const STATS = [
  { icon: Users, value: "500+", label: "Voyageurs satisfaits" },
  { icon: MapPin, value: "2", label: "Destinations phares" },
  { icon: Star, value: "4.9", label: "Note moyenne" },
  { icon: Plane, value: "100%", label: "Satisfaction garantie" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Simulated destination background with CSS gradients */}
            <div
              className="absolute inset-0 animate-gradient"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 40%, ${slide.color}30 0%, transparent 60%),
                  radial-gradient(ellipse at 70% 60%, rgba(212,168,67,0.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 100%, ${slide.color}20 0%, transparent 40%),
                  linear-gradient(135deg, #060a14 0%, #0a0e1a 50%, #060a14 100%)
                `,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#d4a843]/40"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${8 + (i % 5) * 2}s`,
            }}
            animate={{
              y: [800, -50],
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8 + (i % 5) * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,168,67,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="max-w-4xl">
          {/* Location badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-6"
            >
              <span className="text-lg">{slide.flag}</span>
              <span className="text-[#d4a843] text-sm font-medium">
                {slide.city}, {slide.country}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843] animate-pulse" />
            </motion.div>
          </AnimatePresence>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-4"
          >
            <span className="text-white">Voyagez</span>
            <br />
            <span className="gradient-gold text-glow-gold">avec le</span>
            <br />
            <span className="text-white">soleil</span>
          </motion.h1>

          {/* Tagline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`tagline-${current}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="text-white/60 text-xl sm:text-2xl mb-2"
            >
              {slide.tagline}
            </motion.p>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/40 text-base sm:text-lg mb-10 max-w-xl"
          >
            Sun Evasion — votre agence algérienne de confiance pour des séjours inoubliables en
            Turquie et Tunisie.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Button size="lg" asChild>
              <Link href="/voyages">
                <Plane className="w-5 h-5" />
                Découvrir nos voyages
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/destinations">Nos destinations</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="glass rounded-2xl p-4 text-center card-glow"
              >
                <stat.icon className="w-5 h-5 text-[#d4a843] mx-auto mb-2" />
                <div className="text-2xl font-bold gradient-gold">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-[#d4a843]" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#d4a843]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
