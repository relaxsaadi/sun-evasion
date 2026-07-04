"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Send, Phone, Mail, MessageCircle, CheckCircle,
  Loader2, ArrowRight, Shield, Clock, Star
} from "lucide-react";
import { SITE, PACKAGES, OMRA_PACKAGES } from "@/lib/constants";
import { useLang } from "@/contexts/LangContext";

const ALL_PACKAGES = [...PACKAGES, ...OMRA_PACKAGES];

function ContactForm() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const prePackage = searchParams.get("package") || "";

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    packageId: prePackage, departureDate: "",
    passengers: "2", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-3">{t("contact_success_title")}</h3>
        <p className="text-[#4A4A4A] max-w-sm mx-auto mb-6">
          {t("contact_success_desc")}
        </p>
        <a
          href={`https://wa.me/${SITE.whatsapp}?text=Bonjour, j'ai rempli le formulaire de contact sur votre site`}
          target="_blank" rel="noopener noreferrer"
          className="btn-primary inline-flex"
        >
          <MessageCircle className="w-4 h-4" /> {t("contact_success_wa")}
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">{t("contact_name")}</label>
          <input name="name" required value={form.name} onChange={handleChange}
            placeholder="Mohamed Benali" className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">{t("contact_phone")}</label>
          <input name="phone" required value={form.phone} onChange={handleChange}
            placeholder="+213 7XX XXX XXX" className="form-input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">{t("contact_email")}</label>
        <input name="email" type="email" value={form.email} onChange={handleChange}
          placeholder="votre@email.com" className="form-input" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">{t("contact_voyage")}</label>
        <select name="packageId" value={form.packageId} onChange={handleChange} className="form-input">
          <option value="">{t("contact_voyage_ph")}</option>
          <optgroup label={t("contact_turkey_group")}>
            {PACKAGES.filter(p => p.destination === "turquie").map(p => (
              <option key={p.id} value={p.id}>{p.name} · {p.price.toLocaleString("fr-DZ")} DA</option>
            ))}
          </optgroup>
          <optgroup label={t("contact_tunisia_group")}>
            {PACKAGES.filter(p => p.destination === "tunisie").map(p => (
              <option key={p.id} value={p.id}>{p.name} · {p.price.toLocaleString("fr-DZ")} DA</option>
            ))}
          </optgroup>
          <optgroup label={t("contact_omra_group")}>
            {OMRA_PACKAGES.map(p => (
              <option key={p.id} value={p.id}>{p.name} · {p.price} DA</option>
            ))}
          </optgroup>
          <option value="custom">{t("contact_custom")}</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">{t("contact_depart")}</label>
          <input name="departureDate" type="date" value={form.departureDate}
            onChange={handleChange} className="form-input" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">{t("contact_travelers")}</label>
          <select name="passengers" value={form.passengers} onChange={handleChange} className="form-input">
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n} value={n}>{n} {n > 1 ? t("contact_persons") : t("contact_person")}</option>
            ))}
            <option value="9">{t("contact_group")}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-1.5">{t("contact_message")}</label>
        <textarea name="message" rows={3} value={form.message} onChange={handleChange}
          placeholder={t("contact_message_ph")} className="form-input resize-none" />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-xl p-3">
          {t("contact_error")}
        </p>
      )}

      <button type="submit" disabled={status === "loading"}
        className="btn-primary w-full justify-center text-base !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "loading"
          ? <><Loader2 className="w-5 h-5 animate-spin" /> {t("contact_sending")}</>
          : <><Send className="w-4 h-4" /> {t("contact_submit")} <ArrowRight className="w-4 h-4" /></>
        }
      </button>
      <p className="text-center text-[#8A8A8A] text-xs">{t("contact_footer_text")}</p>
    </form>
  );
}

export default function ContactPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#FAFAF7]">

      {/* ── HERO BANNER ── */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <Image src="/images/antalya.webp" alt="Réserver votre voyage" fill priority
          className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5 text-white text-sm font-medium mb-4">
              <Send className="w-3.5 h-3.5 text-[#E8B85A]" /> {t("contact_hero_badge")}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              {t("contact_hero_title_1")} <span className="text-[#E8B85A]">{t("contact_hero_title_gold")}</span>
            </h1>
            <p className="text-white/80 mt-3 text-lg">{t("contact_hero_sub")}</p>
          </motion.div>
        </div>
      </div>

      {/* ── TRUST STRIP ── */}
      <div className="bg-white border-b border-[#E8E0D0]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: <Shield className="w-4 h-4 text-green-600" />, text: t("contact_trust_1") },
            { icon: <Clock className="w-4 h-4 text-[#C9943A]" />, text: t("contact_trust_2") },
            { icon: <Star className="w-4 h-4 text-yellow-500 fill-current" />, text: t("contact_trust_3") },
            { icon: <CheckCircle className="w-4 h-4 text-blue-600" />, text: t("contact_trust_4") },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-[#4A4A4A] font-medium">
              {item.icon} {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-[0_4px_30px_rgba(0,0,0,0.07)] p-8">
              <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-1">{t("contact_form_title")}</h2>
              <p className="text-[#8A8A8A] text-sm mb-7">{t("contact_form_sub")}</p>
              <Suspense fallback={<div className="text-[#8A8A8A] text-sm py-8 text-center">{t("contact_loading")}</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* WhatsApp 1 */}
            <a href={`https://wa.me/${SITE.whatsapp}?text=Bonjour Sun Evasion ! Je souhaite réserver un voyage.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-4 bg-white rounded-2xl border border-[#E8E0D0] p-5 hover:border-green-400 hover:shadow-md transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1A1A1A]">WhatsApp</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{t("contact_wa_instant")}</span>
                </div>
                <p className="text-[#C9943A] text-sm font-medium mt-0.5">{SITE.phone}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8A8A8A] group-hover:text-green-600 transition-colors mt-1 shrink-0" />
            </a>

            {/* WhatsApp 2 */}
            <a href={`https://wa.me/${SITE.whatsapp2}?text=Bonjour Sun Evasion ! Je souhaite réserver un voyage.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-4 bg-white rounded-2xl border border-[#E8E0D0] p-5 hover:border-green-400 hover:shadow-md transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1A1A1A]">WhatsApp</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{t("contact_wa_direct")}</span>
                </div>
                <p className="text-[#C9943A] text-sm font-medium mt-0.5">{SITE.phone2}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8A8A8A] group-hover:text-green-600 transition-colors mt-1 shrink-0" />
            </a>

            {/* Phone */}
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${SITE.phone}`}
                className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-[#E8E0D0] p-4 hover:border-[#C9943A] hover:shadow-md transition-all duration-200 group text-center">
                <div className="w-10 h-10 rounded-xl bg-[rgba(201,148,58,0.1)] flex items-center justify-center group-hover:bg-[rgba(201,148,58,0.2)] transition-colors">
                  <Phone className="w-4 h-4 text-[#C9943A]" />
                </div>
                <div>
                  <div className="text-xs text-[#8A8A8A] font-medium">{t("contact_phone_1")}</div>
                  <div className="text-xs font-semibold text-[#1A1A1A] mt-0.5">{SITE.phone}</div>
                </div>
              </a>
              <a href={`tel:${SITE.phone2}`}
                className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-[#E8E0D0] p-4 hover:border-[#C9943A] hover:shadow-md transition-all duration-200 group text-center">
                <div className="w-10 h-10 rounded-xl bg-[rgba(201,148,58,0.1)] flex items-center justify-center group-hover:bg-[rgba(201,148,58,0.2)] transition-colors">
                  <Phone className="w-4 h-4 text-[#C9943A]" />
                </div>
                <div>
                  <div className="text-xs text-[#8A8A8A] font-medium">{t("contact_phone_2")}</div>
                  <div className="text-xs font-semibold text-[#1A1A1A] mt-0.5">{SITE.phone2}</div>
                </div>
              </a>
            </div>

            {/* Email */}
            <a href={`mailto:${SITE.email}`}
              className="flex items-start gap-4 bg-white rounded-2xl border border-[#E8E0D0] p-5 hover:border-[#0EA5E9] hover:shadow-md transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1A1A1A]">Email</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{t("contact_email_delay")}</span>
                </div>
                <p className="text-[#4A4A4A] text-sm mt-0.5">{SITE.email}</p>
              </div>
            </a>

            {/* Trust box */}
            <div className="bg-gradient-to-br from-[#FDF8F0] to-[#F5F0E8] rounded-2xl border border-[rgba(201,148,58,0.2)] p-5">
              <h3 className="font-semibold text-[#A07020] text-sm uppercase tracking-wide mb-3">{t("contact_commit_title")}</h3>
              <ul className="space-y-2.5">
                {[
                  t("contact_commit_1"),
                  t("contact_commit_2"),
                  t("contact_commit_3"),
                  t("contact_commit_4"),
                  t("contact_commit_5"),
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2.5 text-sm text-[#4A4A4A]">
                    <CheckCircle className="w-4 h-4 text-[#C9943A] shrink-0 mt-0.5" />
                    <span>{g}</span>
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
