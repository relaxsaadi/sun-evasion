"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MessageCircle, Check, Loader2 } from "lucide-react";
import { SITE, PACKAGES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

function ContactForm() {
  const searchParams = useSearchParams();
  const prePackage = searchParams.get("package") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    packageId: prePackage,
    departureDate: "",
    passengers: "2",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Demande envoyée !</h3>
        <p className="text-white/60 max-w-sm mx-auto">
          Merci {form.name}. Notre équipe vous contactera sous 2h pour confirmer votre séjour.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Nom complet *</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-white/30 focus:outline-none focus:border-[#d4a843]/50 transition-colors"
          />
        </div>
        {/* Phone */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Téléphone *</label>
          <input
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+213 ..."
            className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-white/30 focus:outline-none focus:border-[#d4a843]/50 transition-colors"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-white/60 text-sm mb-2">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="votre@email.com"
          className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-white/30 focus:outline-none focus:border-[#d4a843]/50 transition-colors"
        />
      </div>

      {/* Package */}
      <div>
        <label className="block text-white/60 text-sm mb-2">Voyage souhaité</label>
        <select
          name="packageId"
          value={form.packageId}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-[#0a0e1a] text-white focus:outline-none focus:border-[#d4a843]/50 transition-colors"
        >
          <option value="">-- Choisir un séjour --</option>
          {PACKAGES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.price.toLocaleString("fr-DZ")} DZD
            </option>
          ))}
          <option value="custom">Autre / Sur mesure</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Date */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Date de départ souhaitée</label>
          <input
            name="departureDate"
            type="date"
            value={form.departureDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-[#0a0e1a] text-white focus:outline-none focus:border-[#d4a843]/50 transition-colors"
          />
        </div>
        {/* Passengers */}
        <div>
          <label className="block text-white/60 text-sm mb-2">Nombre de voyageurs</label>
          <select
            name="passengers"
            value={form.passengers}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-[#0a0e1a] text-white focus:outline-none focus:border-[#d4a843]/50 transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} personne{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-white/60 text-sm mb-2">Message / Demandes spéciales</label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Précisez vos besoins, préférences, questions..."
          className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-white/30 focus:outline-none focus:border-[#d4a843]/50 transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Une erreur est survenue. Contactez-nous directement par WhatsApp.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> Envoyer ma demande
          </>
        )}
      </Button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold mb-4">
            <Send className="w-4 h-4 text-[#d4a843]" />
            <span className="text-[#d4a843] text-sm font-medium">Contact & Réservation</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Réservez votre <span className="gradient-gold">voyage</span>
          </h1>
          <p className="text-white/50 text-xl max-w-xl mx-auto">
            Devis gratuit · Réponse sous 2h · Paiement sécurisé
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6">Votre demande</h2>
              <Suspense fallback={<div className="text-white/40">Chargement...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Bonjour Sun Evasion ! Je souhaite réserver un voyage.`}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">WhatsApp</div>
                  <div className="text-green-400 text-xs">Réponse immédiate</div>
                </div>
              </div>
              <p className="text-white/50 text-sm">
                Chattez directement avec notre équipe sur WhatsApp pour une réponse ultra-rapide.
              </p>
            </a>

            {/* Phone */}
            <a
              href={`tel:${SITE.phone}`}
              className="block glass rounded-2xl p-6 border border-white/5 hover:border-[#d4a843]/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#d4a843]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#d4a843]" />
                </div>
                <div>
                  <div className="text-white font-semibold">Téléphone</div>
                  <div className="text-[#d4a843] text-xs">7j/7</div>
                </div>
              </div>
              <p className="text-white text-sm font-medium">{SITE.phone}</p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE.email}`}
              className="block glass rounded-2xl p-6 border border-white/5 hover:border-[#0891b2]/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#0891b2]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#0891b2]" />
                </div>
                <div>
                  <div className="text-white font-semibold">Email</div>
                  <div className="text-[#0891b2] text-xs">Réponse sous 24h</div>
                </div>
              </div>
              <p className="text-white/70 text-sm">{SITE.email}</p>
            </a>

            {/* Guarantee */}
            <div className="glass-gold rounded-2xl p-6">
              <h3 className="text-[#d4a843] font-semibold mb-3">✅ Nos engagements</h3>
              <ul className="space-y-2 text-sm text-white/60">
                {[
                  "Devis gratuit sans engagement",
                  "Réponse sous 2h en semaine",
                  "Prix transparents tout inclus",
                  "Accompagnement 24/7 pendant le voyage",
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#d4a843] mt-0.5 shrink-0" /> {g}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
