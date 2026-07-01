"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0d1525] to-[#0a0e1a]" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#d4a843]/10 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#0891b2]/10 blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(212,168,67,0.1)",
              border: "1px solid rgba(212,168,67,0.3)",
            }}
          >
            <span className="text-[#d4a843] text-sm font-medium">🌟 Votre rêve commence ici</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Prêt à vivre{" "}
            <span className="gradient-gold text-glow-gold">l&apos;aventure</span>
            <br />
            de votre vie ?
          </h2>

          <p className="text-white/60 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Contactez-nous aujourd&apos;hui et obtenez votre devis personnalisé gratuit.
            Notre équipe est disponible 7j/7 pour vous aider à organiser votre voyage parfait.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button size="xl" asChild>
              <Link href="/contact">
                Demander un devis gratuit <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Bonjour Sun Evasion ! Je souhaite des informations sur vos voyages.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Contact details */}
          <div className="flex flex-wrap gap-6 justify-center text-white/40 text-sm">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 hover:text-[#d4a843] transition-colors"
            >
              <Phone className="w-4 h-4" />
              {SITE.phone}
            </a>
            <span className="hidden sm:block">·</span>
            <span>Disponible 7j/7</span>
            <span className="hidden sm:block">·</span>
            <span>Réponse sous 2h</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
