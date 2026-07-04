"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle, Phone, MessageCircle, Calendar,
  MapPin, Users, Shield, ArrowRight, Moon, Plane,
  Building2, Baby,
} from "lucide-react";
import { SITE } from "@/lib/constants";

// ─── Real data from official programme PDF ───────────────────────────────────
const DEPARTURES = [
  {
    id: 1,
    depart: "03 Août",
    departTime: "21H20",
    retour: "18 Août",
    retourTime: "05H00",
    duree: "14 jours",
    hotel: "Al Manara Ajyad P750",
    hotelAr: "المنارة اجياد",
    programme: "Petit déjeuner",
    ch5: 209000,
    ch4: 219000,
    ch3: 249000,
    ch2: 269000,
    badge: "Départ Août",
    badgeColor: "bg-[#C9943A] text-white",
  },
  {
    id: 2,
    depart: "10 Août",
    departTime: "17H20",
    retour: "25 Août",
    retourTime: "08H00",
    duree: "15 jours",
    hotel: "Masar Al Misk",
    hotelAr: "مسار المسك",
    programme: "Logement seul",
    ch5: 199000,
    ch4: 209000,
    ch3: 229000,
    ch2: 249000,
    badge: "Meilleur prix",
    badgeColor: "bg-emerald-600 text-white",
  },
  {
    id: 3,
    depart: "17 Août",
    departTime: "20H20",
    retour: "01 Sept.",
    retourTime: "05H00",
    duree: "14 jours",
    hotel: "Al Manara Ajyad P750",
    hotelAr: "المنارة اجياد",
    programme: "Petit déjeuner",
    ch5: 235000,
    ch4: 245000,
    ch3: 275000,
    ch2: 315000,
    badge: "Départ Août",
    badgeColor: "bg-[#C9943A] text-white",
  },
  {
    id: 4,
    depart: "23 Août",
    departTime: "17H20",
    retour: "07 Sept.",
    retourTime: "11H00",
    duree: "15 jours",
    hotel: "Masar Al Misk",
    hotelAr: "مسار المسك",
    programme: "Logement seul",
    ch5: 219000,
    ch4: 229000,
    ch3: 249000,
    ch2: 279000,
    badge: "Dernier départ",
    badgeColor: "bg-purple-700 text-white",
  },
];

const CHILD_RATES = [
  { age: "2 à 12 ans (sans lit)", reduction: "− 40 000 DA", base: "par rapport au tarif chambre quadruple" },
  { age: "2 à 12 ans (avec lit)", reduction: "− 20 000 DA", base: "par rapport au tarif chambre quadruple" },
  { age: "0 à 2 ans",            reduction: "80 000 DA",   base: "tarif fixe" },
];

const ROOM_TYPES = [
  { key: "ch5", label: "Ch. 5", sublabel: "Quintuple", field: "ch5" as const },
  { key: "ch4", label: "Ch. 4", sublabel: "Quadruple", field: "ch4" as const },
  { key: "ch3", label: "Ch. 3", sublabel: "Triple",    field: "ch3" as const },
  { key: "ch2", label: "Ch. 2", sublabel: "Double",    field: "ch2" as const },
];

const PILLARS = [
  { icon: Shield,    title: "Visa Omra inclus",    desc: "Toutes les démarches administratives prises en charge" },
  { icon: Users,     title: "Guide religieux",      desc: "Accompagnement spirituel par un guide algérien certifié" },
  { icon: MapPin,    title: "Hôtels sélectionnés",  desc: "Établissements proches du Haram, soigneusement vérifiés" },
  { icon: Calendar,  title: "Départs garantis",     desc: "Groupes constitués, départs confirmés depuis Alger" },
];

function fmt(n: number) {
  return n.toLocaleString("fr-DZ") + " DA";
}

export default function OmraContent() {
  const [selectedDep, setSelectedDep] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", package: "", pilgrims: "1", message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        package_name: `Omra — ${form.package}`,
        passengers: +form.pilgrims,
      }),
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
              <Moon className="w-4 h-4" /> Voyages spirituels — Nisan 1448 H
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
              Programme Omra<br />Été 2025
            </h1>
            <p className="text-white/80 text-lg max-w-xl">
              4 départs garantis depuis Alger · Air Algérie · La Mecque & Médine · Guide religieux inclus
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="bg-white border-b border-[#E8E0D0]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#C9943A]/10 flex items-center justify-center mx-auto mb-3">
                <p.icon className="w-5 h-5 text-[#C9943A]" />
              </div>
              <h3 className="font-semibold text-[#1C1C1C] text-sm mb-1">{p.title}</h3>
              <p className="text-[#8A8A8A] text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Pricing Table ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="section-tag">Tarifs officiels</span>
          <h2 className="font-display text-4xl font-bold text-[#1C1C1C] mt-3">
            Programmes & Prix 2025
          </h2>
          <p className="text-[#6A6A6A] mt-3 max-w-xl mx-auto">
            Air Algérie · Départ Alger · La Mecque + Médine · Visa + Transferts inclus
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-[#E8E0D0] shadow-sm mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C1C1C] text-white">
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">Départ</th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider">Retour</th>
                <th className="text-center px-4 py-4 text-xs font-semibold uppercase tracking-wider">Durée</th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider">Hôtel</th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider">Programme</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-[#C9943A]">Ch. 5</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-[#C9943A]">Ch. 4</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-[#C9943A]">Ch. 3</th>
                <th className="text-center px-4 py-4 text-xs font-semibold text-[#C9943A]">Ch. 2</th>
                <th className="px-4 py-4"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#F0EBE0]">
              {DEPARTURES.map((d, i) => (
                <tr key={d.id} className={`hover:bg-[#FAFAF7] transition-colors ${i % 2 === 0 ? "" : "bg-[#FDFCFA]"}`}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C9943A]/10 flex items-center justify-center shrink-0">
                        <Plane className="w-3.5 h-3.5 text-[#C9943A]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1C1C1C] text-sm">{d.depart}</p>
                        <p className="text-[#8A8A8A] text-xs">{d.departTime}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-[#1C1C1C] text-sm font-medium">{d.retour}</p>
                    <p className="text-[#8A8A8A] text-xs">{d.retourTime}</p>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="inline-block bg-[#F5F0E8] text-[#C9943A] text-xs font-semibold px-3 py-1 rounded-full">
                      {d.duree}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-[#1C1C1C] text-sm font-medium">{d.hotel}</p>
                    <p className="text-[#8A8A8A] text-xs" dir="rtl">{d.hotelAr}</p>
                  </td>
                  <td className="px-4 py-5">
                    {d.programme === "Petit déjeuner" ? (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Petit déjeuner
                      </span>
                    ) : (
                      <span className="text-xs text-[#8A8A8A]">Logement seul</span>
                    )}
                  </td>
                  <td className="px-4 py-5 text-center">
                    <p className="font-bold text-[#1C1C1C] text-sm">{d.ch5.toLocaleString("fr")}</p>
                    <p className="text-[#8A8A8A] text-xs">DA</p>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <p className="font-bold text-[#1C1C1C] text-sm">{d.ch4.toLocaleString("fr")}</p>
                    <p className="text-[#8A8A8A] text-xs">DA</p>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <p className="font-bold text-[#1C1C1C] text-sm">{d.ch3.toLocaleString("fr")}</p>
                    <p className="text-[#8A8A8A] text-xs">DA</p>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <p className="font-bold text-[#C9943A] text-sm">{d.ch2.toLocaleString("fr")}</p>
                    <p className="text-[#8A8A8A] text-xs">DA</p>
                  </td>
                  <td className="px-4 py-5">
                    <a href="#inscription"
                      onClick={() => setForm(f => ({ ...f, package: `${d.depart} — ${d.hotel}` }))}
                      className="flex items-center gap-1.5 bg-[#C9943A] hover:bg-[#B8832A] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                      Réserver <ArrowRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-5 mb-8">
          {DEPARTURES.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-[#1C1C1C] px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="w-4 h-4 text-[#C9943A]" />
                  <div>
                    <p className="text-white font-semibold text-sm">{d.depart} {d.departTime}</p>
                    <p className="text-white/60 text-xs">→ {d.retour} {d.retourTime}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${d.badgeColor}`}>
                  {d.duree}
                </span>
              </div>

              {/* Hotel & programme */}
              <div className="px-5 pt-4 pb-3 border-b border-[#F0EBE0]">
                <div className="flex items-start gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-[#C9943A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1C1C1C]">{d.hotel}</p>
                    <p className="text-xs text-[#8A8A8A]" dir="rtl">{d.hotelAr}</p>
                  </div>
                </div>
                {d.programme === "Petit déjeuner" && (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium mt-1">
                    <CheckCircle className="w-3 h-3" /> Petit déjeuner inclus
                  </span>
                )}
              </div>

              {/* Prices grid */}
              <div className="grid grid-cols-4 divide-x divide-[#F0EBE0] px-0">
                {ROOM_TYPES.map((rt) => (
                  <div key={rt.key} className="py-4 text-center">
                    <p className="text-xs font-bold text-[#C9943A] mb-0.5">{rt.label}</p>
                    <p className="text-xs text-[#8A8A8A] mb-1.5">{rt.sublabel}</p>
                    <p className="text-sm font-bold text-[#1C1C1C]">{d[rt.field].toLocaleString("fr")}</p>
                    <p className="text-xs text-[#8A8A8A]">DA</p>
                  </div>
                ))}
              </div>

              <div className="px-5 pb-5 pt-3">
                <a href="#inscription"
                  onClick={() => setForm(f => ({ ...f, package: `${d.depart} — ${d.hotel}` }))}
                  className="btn-primary justify-center py-3 text-sm w-full">
                  Réserver ce départ <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Room type legend */}
        <div className="bg-white border border-[#E8E0D0] rounded-2xl p-5 mb-6">
          <p className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-3">Légende des types de chambres</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { code: "Ch. 2", desc: "Chambre double — 2 personnes" },
              { code: "Ch. 3", desc: "Chambre triple — 3 personnes" },
              { code: "Ch. 4", desc: "Chambre quadruple — 4 personnes" },
              { code: "Ch. 5", desc: "Chambre quintuple — 5 personnes" },
            ].map((r) => (
              <div key={r.code} className="flex items-center gap-2">
                <span className="shrink-0 font-bold text-[#C9943A] text-sm w-12">{r.code}</span>
                <span className="text-xs text-[#6A6A6A]">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Children pricing */}
        <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2.5 px-6 py-4 border-b border-[#E8E0D0] bg-[#FAFAF7]">
            <Baby className="w-4 h-4 text-[#C9943A]" />
            <span className="font-semibold text-[#1C1C1C] text-sm">Tarifs enfants</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F0E8]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider">Âge</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider">Réduction / Tarif</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider">Base de calcul</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE0]">
              {CHILD_RATES.map((r) => (
                <tr key={r.age} className="hover:bg-[#FAFAF7] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#1C1C1C]">{r.age}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${r.reduction.startsWith("−") ? "text-emerald-600" : "text-[#C9943A]"}`}>
                      {r.reduction}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6A6A6A]">{r.base}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-3 bg-[#FAFAF7] border-t border-[#E8E0D0]">
            <p className="text-xs text-[#8A8A8A]">
              * Les tarifs enfants s'appliquent avec accompagnement d'au moins un parent.
            </p>
          </div>
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
            <a href={`https://wa.me/${SITE.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
              className="btn-primary justify-center py-3">
              <MessageCircle className="w-4 h-4" /> Nous écrire sur WhatsApp
            </a>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Nom complet *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="form-input" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Téléphone / WhatsApp *</label>
                <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="form-input" placeholder="+213 7XX XXX XXX" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="form-input" placeholder="votre@email.com" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Départ souhaité *</label>
                <select required value={form.package} onChange={e => setForm(f => ({ ...f, package: e.target.value }))}
                  className="form-input">
                  <option value="">Choisir un départ</option>
                  {DEPARTURES.map(d => (
                    <option key={d.id} value={`${d.depart} — ${d.hotel}`}>
                      {d.depart} · {d.hotel} · à partir de {fmt(d.ch5)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Type de chambre</label>
                <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} className="form-input">
                  <option value="">Choisir</option>
                  <option value="ch5">Chambre 5 personnes (quintuple)</option>
                  <option value="ch4">Chambre 4 personnes (quadruple)</option>
                  <option value="ch3">Chambre 3 personnes (triple)</option>
                  <option value="ch2">Chambre 2 personnes (double)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Nombre de pèlerins</label>
              <select value={form.pilgrims} onChange={e => setForm(f => ({ ...f, pilgrims: e.target.value }))}
                className="form-input">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} personne{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-wide">Message (optionnel)</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={3} className="form-input resize-none"
                placeholder="Questions sur le programme, enfants à bord, besoins spéciaux…" />
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
              {loading ? "Envoi en cours…" : "Envoyer ma demande"}
            </button>
            <div className="flex items-center gap-4 pt-2 border-t border-[#E8E0D0]">
              <a href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 text-[#4A4A4A] text-sm hover:text-[#C9943A] transition-colors">
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
              <a href={`https://wa.me/${SITE.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 text-sm hover:text-emerald-700 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
