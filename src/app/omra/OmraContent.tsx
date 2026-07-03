"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, CheckCircle, Phone, MessageCircle, Calendar,
  MapPin, Users, Shield, ArrowRight, Moon, Heart,
} from "lucide-react";
import { SITE, OMRA_PACKAGES } from "@/lib/constants";

const BADGE_STYLE: Record<string, string> = {
  "Meilleur prix": "bg-emerald-600 text-white",
  "Populaire":     "bg-[#C9943A] text-white",
  "Ramadan":       "bg-purple-700 text-white",
  "VIP":           "bg-[#1C1C1C] text-white",
};

const PILLARS = [
  { icon: Shield,   title: "Visa Omra inclus",    desc: "Nous prenons en charge toutes les démarches administratives" },
  { icon: Users,    title: "Guide religieux",       desc: "Accompagnement spirituel par un guide algérien certifié" },
  { icon: MapPin,   title: "Hôtels sélectionnés",  desc: "Établissements proches du Haram, soigneusement vérifiés" },
  { icon: Calendar, title: "Départs garantis",      desc: "Groupes constitués, départs confirmés depuis Alger" },
];

export default function OmraContent() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", package: "", pilgrims: "1", date: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, package_name: `Omra — ${form.package}`, passengers: +form.pilgrims }),
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="bg-[#FAFAF7] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end pb-16 overflow-hidden">
        <Image src="/images/omra.jpg" alt="Omra La Mecque" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-[#C9943A]/20 border border-[#C9943A]/40 text-[#E8B85A] px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <Moon className="w-4 h-4" /> Voyages spirituels
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
              Omra avec<br />Sun Evasion
            </h1>
            <p className="text-white/80 text-lg max-w-xl">
              Vivez votre pèlerinage dans les meilleures conditions. Accompagnement complet depuis Alger — visa, hôtel, guide religieux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="bg-white border-b border-[#E8E0D0]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#C9943A]/10 flex items-center justify-center mx-auto mb-3">
                <p.icon className="w-5 h-5 text-[#C9943A]" />
              </div>
              <h3 className="font-semibold text-[#1C1C1C] text-sm mb-1">{p.title}</h3>
              <p className="text-[#8A8A8A] text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Packages ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="section-tag">Nos forfaits</span>
          <h2 className="font-display text-4xl font-bold text-[#1C1C1C] mt-3">Choisissez votre formule</h2>
          <p className="text-[#6A6A6A] mt-3 max-w-xl mx-auto">Du séjour économique au VIP, chaque forfait inclut vol, hébergement, visa et guide religieux.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OMRA_PACKAGES.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
              {/* Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${BADGE_STYLE[pkg.badge] || "bg-[#F5F0E8] text-[#C9943A]"}`}>
                  {pkg.badge}
                </span>
                <Heart className="w-4 h-4 text-[#C9943A]" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1C1C1C] mb-1">{pkg.name}</h3>
              <p className="text-[#8A8A8A] text-sm mb-1">{pkg.duration}</p>
              <p className="text-[#6A6A6A] text-xs mb-4">{pkg.hotels}</p>
              {/* Price */}
              <div className="py-3 border-t border-b border-[#E8E0D0] mb-4">
                <span className="text-2xl font-bold text-[#C9943A]">{pkg.price}</span>
                <span className="text-[#8A8A8A] text-sm"> DA / pers.</span>
              </div>
              {/* Includes */}
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-[#4A4A4A]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
              <a href="#inscription" className="btn-primary justify-center py-3 text-sm">
                Réserver ce forfait <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="bg-[#1C1C1C] py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block text-[#C9943A] text-sm font-semibold uppercase tracking-widest mb-4">Pourquoi nous choisir</span>
          <h2 className="font-display text-4xl font-bold text-white mb-10">Un pèlerinage sans stress</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {[
              { n: "500+", label: "pèlerins accompagnés", sub: "depuis notre création" },
              { n: "100%", label: "visa accordés",        sub: "aucun refus à ce jour" },
              { n: "4.9★", label: "satisfaction client",  sub: "avis vérifiés" },
            ].map((s) => (
              <div key={s.label} className="border border-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold text-[#C9943A] mb-1">{s.n}</div>
                <div className="text-white font-semibold">{s.label}</div>
                <div className="text-white/50 text-sm mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inscription form ── */}
      <section id="inscription" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <span className="section-tag">Inscription</span>
          <h2 className="font-display text-3xl font-bold text-[#1C1C1C] mt-3">Réservez votre Omra</h2>
          <p className="text-[#6A6A6A] mt-2">Remplissez le formulaire — nous vous recontactons sous 24h</p>
        </div>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 text-center">
            <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-[#1C1C1C] mb-2">Demande reçue !</h3>
            <p className="text-[#6A6A6A] mb-6">Notre équipe vous contacte dans les 24h via WhatsApp ou téléphone.</p>
            <a href={`https://wa.me/${SITE.phone.replace(/\s/g,"")}`} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center py-3">
              <MessageCircle className="w-4 h-4" /> Nous écrire sur WhatsApp
            </a>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Nom complet *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="form-input" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Téléphone / WhatsApp *</label>
                <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="form-input" placeholder="+213 7XX XXX XXX" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="form-input" placeholder="votre@email.com" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Forfait souhaité *</label>
                <select required value={form.package} onChange={e => setForm(f => ({ ...f, package: e.target.value }))} className="form-input">
                  <option value="">Choisir un forfait</option>
                  {OMRA_PACKAGES.map(p => <option key={p.id} value={p.name}>{p.name} — {p.price} DA</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Nombre de pèlerins</label>
                <select value={form.pilgrims} onChange={e => setForm(f => ({ ...f, pilgrims: e.target.value }))} className="form-input">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} personne{n>1?"s":""}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Période souhaitée</label>
              <input type="month" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="form-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Message (optionnel)</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} className="form-input resize-none" placeholder="Questions, précisions…" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
              {loading ? "Envoi en cours…" : "Envoyer ma demande"}
            </button>
            <div className="flex items-center gap-4 pt-2 border-t border-[#E8E0D0]">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-[#4A4A4A] text-sm hover:text-[#C9943A] transition-colors">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
              <a href={`https://wa.me/${SITE.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 text-sm hover:text-emerald-700 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
