"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sun, LogOut, Users, Clock, CheckCircle, Phone, Mail,
  Calendar, Plane, Search, TrendingUp, Globe, RefreshCw,
  ExternalLink, BarChart2, Download, MessageCircle,
} from "lucide-react";
import PartenariatsHotels from "@/components/admin/PartenariatsHotels";
import EmailTemplates from "@/components/admin/EmailTemplates";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  package_name: string | null;
  departure_date: string | null;
  passengers: number;
  message: string | null;
  status: "pending" | "contacted" | "confirmed" | "cancelled";
};

type Tab = "overview" | "bookings" | "calendrier" | "veille" | "partenariats" | "emails";

const STATUS_CONFIG = {
  pending:   { label: "En attente", color: "text-amber-600 bg-amber-50 border-amber-200" },
  contacted: { label: "Contacté",   color: "text-blue-600 bg-blue-50 border-blue-200" },
  confirmed: { label: "Confirmé",   color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  cancelled: { label: "Annulé",     color: "text-red-500 bg-red-50 border-red-200" },
};

function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-4 h-28">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-xs font-bold text-[#1A1A1A]">{d.value}</span>
          <div
            className="w-full rounded-t-xl transition-all duration-700"
            style={{ height: `${Math.max((d.value / max) * 80, 4)}px`, background: d.color }}
          />
          <span className="text-[10px] text-[#8A8A8A] text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [apifyUrl, setApifyUrl] = useState("");
  const [apifyLoading, setApifyLoading] = useState(false);
  const [apifyResults, setApifyResults] = useState<{ title?: string; price?: string; description?: string; url?: string }[]>([]);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      setBookings(data || []);
      setLoading(false);
    };
    init();
  }, []);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    const supabase = createClient();
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
  };

  const exportCSV = () => {
    const headers = ["Nom","Téléphone","Email","Forfait","Date départ","Passagers","Statut","Date demande","Message"];
    const rows = bookings.map(b => [
      b.name, b.phone, b.email||"", b.package_name||"",
      b.departure_date||"", b.passengers, b.status,
      new Date(b.created_at).toLocaleDateString("fr-FR"),
      (b.message||"").replace(/,/g," "),
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob(["﻿"+csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `reservations-sun-evasion-${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const waMessage = (b: Booking) => {
    const pkg = b.package_name || "votre voyage";
    const date = b.departure_date ? ` prévu le ${b.departure_date}` : "";
    return encodeURIComponent(
      `Bonjour ${b.name} 👋\n\nJe suis de l'équipe Sun Evasion. Merci pour votre demande concernant *${pkg}*${date}.\n\nNous avons bien reçu votre réservation et nous allons vous contacter très prochainement pour confirmer les détails et les modalités de paiement.\n\nEn attendant, n'hésitez pas à nous poser vos questions ici.\n\nCordialement,\nSun Evasion 🌟`
    );
  };

  const stats = useMemo(() => {
    const contacted = bookings.filter((b) => b.status === "contacted").length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;
    const turquie = bookings.filter((b) =>
      ["istanbul", "cappadoce", "turquie", "côte turquoise", "antalya"].some((k) =>
        b.package_name?.toLowerCase().includes(k)
      )
    ).length;
    const tunisie = bookings.filter((b) =>
      ["djerba", "sousse", "tunisie", "carthage"].some((k) =>
        b.package_name?.toLowerCase().includes(k)
      )
    ).length;
    const omra = bookings.filter((b) => b.package_name?.toLowerCase().includes("omra")).length;
    const AVG_PRICE_DZD = 150000;
    const estimatedRevenue = confirmed * AVG_PRICE_DZD *
      (bookings.filter(b=>b.status==="confirmed").reduce((s,b)=>s+b.passengers,0) /
       Math.max(bookings.filter(b=>b.status==="confirmed").length,1));
    return {
      total: bookings.length,
      pending,
      contacted,
      confirmed,
      cancelled,
      turquie,
      tunisie,
      omra,
      other: Math.max(bookings.length - turquie - tunisie - omra, 0),
      conversionRate: bookings.length ? Math.round((confirmed / bookings.length) * 100) : 0,
      estimatedRevenue: Math.round(estimatedRevenue),
      totalPassengers: bookings.filter(b=>b.status==="confirmed").reduce((s,b)=>s+b.passengers,0),
    };
  }, [bookings]);

  const filtered = useMemo(() => {
    let b = bookings;
    if (statusFilter !== "all") b = b.filter((x) => x.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      b = b.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.phone.includes(q) ||
          x.email?.toLowerCase().includes(q) ||
          x.package_name?.toLowerCase().includes(q)
      );
    }
    return b;
  }, [bookings, search, statusFilter]);

  const runApify = async () => {
    if (!apifyUrl) return;
    setApifyLoading(true);
    setApifyResults([]);
    try {
      const res = await fetch("/api/admin/competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: apifyUrl }),
      });
      const data = await res.json();
      setApifyResults(data.results || []);
    } catch {
      // silent
    }
    setApifyLoading(false);
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: "overview",      label: "Vue d'ensemble" },
    { id: "bookings",      label: "Réservations" },
    { id: "calendrier",    label: "📅 Calendrier" },
    { id: "emails",        label: "✉️ Templates" },
    { id: "partenariats",  label: "🤝 Partenariats" },
    { id: "veille",        label: "Veille marché" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#C9943A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[#8A8A8A] text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#E8E0D0] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo + tabs */}
          <div className="flex items-center gap-5 min-w-0">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9943A] to-[#E8B85A] flex items-center justify-center">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-[#1A1A1A]">Sun Evasion</span>
              <span className="text-[#8A8A8A] text-sm hidden sm:block">Admin</span>
            </div>
            <div className="hidden md:flex items-center gap-1 bg-[#F5F0E8] rounded-full p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white text-[#C9943A] shadow-sm"
                      : "text-[#4A4A4A] hover:text-[#1A1A1A]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* User */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F5F0E8]"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>
        {/* Mobile tabs */}
        <div className="md:hidden flex gap-1 px-4 pb-3 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#C9943A] text-white"
                  : "bg-[#F5F0E8] text-[#4A4A4A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold text-[#1A1A1A]">Vue d&apos;ensemble</h1>
              <p className="text-[#8A8A8A] text-sm mt-1">Toutes vos métriques en un coup d&apos;œil</p>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[
                { icon: Users, label: "Total réservations", value: stats.total, color: "#C9943A", bg: "#FDF8F0" },
                { icon: Clock, label: "En attente", value: stats.pending, color: "#F59E0B", bg: "#FFFBEB" },
                { icon: CheckCircle, label: "Confirmées", value: stats.confirmed, color: "#10B981", bg: "#F0FDF4" },
                { icon: TrendingUp, label: "Taux conversion", value: `${stats.conversionRate}%`, color: "#0EA5E9", bg: "#F0F9FF" },
                { icon: BarChart2, label: "Revenus est.", value: stats.estimatedRevenue > 0 ? `${(stats.estimatedRevenue/1000).toFixed(0)}k DA` : "—", color: "#8B5CF6", bg: "#F5F3FF" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white border border-[#E8E0D0] rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div className="text-3xl font-bold text-[#1A1A1A] mb-1">{s.value}</div>
                  <div className="text-[#8A8A8A] text-xs">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart2 className="w-4 h-4 text-[#C9943A]" />
                  <h3 className="font-semibold text-[#1A1A1A]">Par destination</h3>
                </div>
                <p className="text-[#8A8A8A] text-xs mb-6">{stats.total} réservations au total</p>
                <BarChart
                  data={[
                    { label: "🇹🇷 Turquie", value: stats.turquie, color: "linear-gradient(180deg,#C9943A,#E8B85A)" },
                    { label: "🇹🇳 Tunisie", value: stats.tunisie, color: "linear-gradient(180deg,#0EA5E9,#38BDF8)" },
                    { label: "🕌 Omra", value: stats.omra, color: "linear-gradient(180deg,#8B5CF6,#A78BFA)" },
                    { label: "Autre", value: stats.other, color: "linear-gradient(180deg,#E8E0D0,#D1C9BA)" },
                  ]}
                />
              </div>

              <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#C9943A]" />
                  <h3 className="font-semibold text-[#1A1A1A]">Statut des demandes</h3>
                </div>
                <p className="text-[#8A8A8A] text-xs mb-5">Distribution par état</p>
                <div className="space-y-3.5">
                  {[
                    { label: "En attente", value: stats.pending, color: "#F59E0B" },
                    { label: "Contacté", value: stats.contacted, color: "#0EA5E9" },
                    { label: "Confirmé", value: stats.confirmed, color: "#10B981" },
                    { label: "Annulé", value: stats.cancelled, color: "#EF4444" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="text-sm text-[#4A4A4A] w-24 shrink-0">{s.label}</span>
                      <div className="flex-1 h-2 bg-[#F5F0E8] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${stats.total ? (s.value / stats.total) * 100 : 0}%`,
                            background: s.color,
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#1A1A1A] w-6 text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent bookings */}
            <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E8E0D0] flex items-center justify-between">
                <h3 className="font-semibold text-[#1A1A1A]">Dernières demandes</h3>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className="text-xs text-[#C9943A] hover:underline"
                >
                  Voir tout →
                </button>
              </div>
              <div className="divide-y divide-[#E8E0D0]">
                {bookings.slice(0, 5).map((b) => (
                  <div key={b.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#FAFAF7] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D0] flex items-center justify-center text-[#C9943A] font-bold text-sm shrink-0">
                        {b.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A1A1A]">{b.name}</p>
                        <p className="text-xs text-[#8A8A8A]">{b.package_name || "—"} · {b.passengers} pers.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`hidden sm:inline px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_CONFIG[b.status].color}`}>
                        {STATUS_CONFIG[b.status].label}
                      </span>
                      <span className="text-xs text-[#8A8A8A]">
                        {new Date(b.created_at).toLocaleDateString("fr-DZ", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && (
                  <div className="text-center py-14 text-[#8A8A8A]">
                    <Plane className="w-8 h-8 mx-auto mb-2 opacity-25" />
                    <p className="text-sm">Aucune réservation pour l&apos;instant</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── BOOKINGS ── */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-[#1A1A1A]">Réservations</h1>
                <p className="text-[#8A8A8A] text-sm mt-1">{bookings.length} demandes au total</p>
              </div>
              <div className="sm:ml-auto flex gap-3 flex-wrap">
                <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E8E0D0] text-sm text-[#4A4A4A] hover:border-[#C9943A] hover:text-[#C9943A] transition-all font-medium">
                  <Download className="w-4 h-4" /> Exporter CSV
                </button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nom, téléphone, séjour…"
                    className="form-input pl-9 py-2 text-sm w-52"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-input py-2 text-sm"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="contacted">Contactés</option>
                  <option value="confirmed">Confirmés</option>
                  <option value="cancelled">Annulés</option>
                </select>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {[
                { label: `Tous (${bookings.length})`, value: "all" },
                { label: `En attente (${stats.pending})`, value: "pending" },
                { label: `Contactés (${stats.contacted})`, value: "contacted" },
                { label: `Confirmés (${stats.confirmed})`, value: "confirmed" },
                { label: `Annulés (${stats.cancelled})`, value: "cancelled" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    statusFilter === f.value
                      ? "bg-[#C9943A] text-white border-[#C9943A]"
                      : "bg-white text-[#4A4A4A] border-[#E8E0D0] hover:border-[#C9943A]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
              <div className="px-6 py-3 bg-[#FAFAF7] border-b border-[#E8E0D0]">
                <span className="text-xs text-[#8A8A8A]">{filtered.length} résultats</span>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-[#8A8A8A]">
                  <Plane className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  <p>Aucune réservation trouvée</p>
                </div>
              ) : (
                <div className="divide-y divide-[#E8E0D0]">
                  {filtered.map((booking, i) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="px-6 py-5 hover:bg-[#FAFAF7] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D0] flex items-center justify-center text-[#C9943A] font-bold text-sm shrink-0">
                              {booking.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-[#1A1A1A] font-semibold">{booking.name}</p>
                              <p className="text-[#8A8A8A] text-xs">
                                {new Date(booking.created_at).toLocaleDateString("fr-DZ", {
                                  day: "numeric", month: "short", year: "numeric",
                                  hour: "2-digit", minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 text-sm text-[#4A4A4A] mb-2">
                            <a
                              href={`tel:${booking.phone}`}
                              className="flex items-center gap-1.5 hover:text-[#C9943A] transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" /> {booking.phone}
                            </a>
                            {booking.email && (
                              <a
                                href={`mailto:${booking.email}`}
                                className="flex items-center gap-1.5 hover:text-[#C9943A] transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" /> {booking.email}
                              </a>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs text-[#4A4A4A]">
                            {booking.package_name && (
                              <span className="flex items-center gap-1 bg-[#F5F0E8] px-2 py-1 rounded-lg">
                                <Plane className="w-3 h-3 text-[#C9943A]" /> {booking.package_name}
                              </span>
                            )}
                            {booking.departure_date && (
                              <span className="flex items-center gap-1 bg-[#F5F0E8] px-2 py-1 rounded-lg">
                                <Calendar className="w-3 h-3 text-[#C9943A]" /> {booking.departure_date}
                              </span>
                            )}
                            <span className="flex items-center gap-1 bg-[#F5F0E8] px-2 py-1 rounded-lg">
                              <Users className="w-3 h-3 text-[#C9943A]" /> {booking.passengers} pers.
                            </span>
                          </div>

                          {booking.message && (
                            <p className="text-[#8A8A8A] text-xs mt-2 italic">&ldquo;{booking.message}&rdquo;</p>
                          )}
                        </div>

                        <div className="flex flex-row sm:flex-col items-center gap-2 shrink-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_CONFIG[booking.status].color}`}>
                            {STATUS_CONFIG[booking.status].label}
                          </span>
                          <select
                            value={booking.status}
                            onChange={(e) => updateStatus(booking.id, e.target.value as Booking["status"])}
                            className="text-xs bg-white border border-[#E8E0D0] text-[#4A4A4A] rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#C9943A]"
                          >
                            <option value="pending">En attente</option>
                            <option value="contacted">Contacté</option>
                            <option value="confirmed">Confirmé</option>
                            <option value="cancelled">Annulé</option>
                          </select>
                          <a
                            href={`https://wa.me/${booking.phone.replace(/\D/g,"").replace(/^0/,"213")}?text=${waMessage(booking)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 transition-colors whitespace-nowrap"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── VEILLE MARCHÉ ── */}
        {activeTab === "veille" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold text-[#1A1A1A]">Veille marché</h1>
              <p className="text-[#8A8A8A] text-sm mt-1">
                Analysez les prix et offres de vos concurrents
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scraper tool */}
              <div className="bg-white border border-[#E8E0D0] rounded-2xl p-6">
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Analyser un concurrent</h3>
                <p className="text-[#8A8A8A] text-xs mb-5">
                  Entrez l&apos;URL d&apos;un site concurrent pour extraire ses offres et prix
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">URL du site</label>
                    <input
                      value={apifyUrl}
                      onChange={(e) => setApifyUrl(e.target.value)}
                      placeholder="https://agence-concurrente.dz"
                      className="form-input text-sm"
                    />
                  </div>
                  <button
                    onClick={runApify}
                    disabled={apifyLoading || !apifyUrl}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {apifyLoading ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> Analyse en cours…</>
                    ) : (
                      <><Search className="w-4 h-4" /> Lancer l&apos;analyse</>
                    )}
                  </button>
                </div>

                {apifyResults.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[#E8E0D0]">
                    <p className="text-xs font-semibold text-[#4A4A4A] mb-3">
                      {apifyResults.length} résultats trouvés
                    </p>
                    <div className="space-y-2">
                      {apifyResults.slice(0, 8).map((r, i) => (
                        <div key={i} className="bg-[#FAFAF7] rounded-xl p-3 text-xs">
                          <p className="font-semibold text-[#1A1A1A] truncate">{r.title || r.url}</p>
                          {r.price && (
                            <p className="text-[#C9943A] font-bold mt-1">{r.price}</p>
                          )}
                          {r.description && (
                            <p className="text-[#8A8A8A] mt-1 line-clamp-2">{r.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sites de référence */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-4">Sites à surveiller</h3>
                <div className="space-y-3">
                  {[
                    { name: "Booking.com Turquie", desc: "Prix hôtels, disponibilités et avis pour Istanbul, Antalya, Cappadoce", icon: "🏨", badge: "Hôtels", url: "https://www.booking.com/country/tr.fr.html" },
                    { name: "TripAdvisor Algérie", desc: "Avis agences, e-réputation et classements des meilleures agences", icon: "⭐", badge: "Avis", url: "https://www.tripadvisor.fr/Tourism-g293713-Algeria-Vacations.html" },
                    { name: "Booking.com Tunisie", desc: "Hôtels Djerba, Sousse, Hammamet — tarifs et disponibilités", icon: "🌊", badge: "Hôtels", url: "https://www.booking.com/country/tn.fr.html" },
                    { name: "Skyscanner Alger", desc: "Suivi des prix billets d'avion Alger → Istanbul / Tunis", icon: "✈️", badge: "Vols", url: "https://www.skyscanner.fr/vols/alger/" },
                  ].map((site) => (
                    <a key={site.name} href={site.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-3 bg-white border border-[#E8E0D0] rounded-xl p-4 hover:border-[#C9943A] hover:shadow-sm transition-all group">
                      <span className="text-2xl shrink-0">{site.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-[#1A1A1A] group-hover:text-[#C9943A] transition-colors">{site.name}</span>
                          <span className="px-2 py-0.5 bg-[#F5F0E8] text-[#C9943A] text-xs rounded-full font-medium">{site.badge}</span>
                        </div>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed">{site.desc}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#8A8A8A] shrink-0 mt-0.5 group-hover:text-[#C9943A] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CALENDRIER DÉPARTS ── */}
        {activeTab === "calendrier" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold text-[#1A1A1A]">Calendrier des départs</h1>
              <p className="text-[#8A8A8A] text-sm mt-1">Réservations confirmées groupées par mois de départ</p>
            </div>
            {(() => {
              const confirmed = bookings.filter(b => b.status === "confirmed" && b.departure_date);
              const grouped: Record<string, typeof confirmed> = {};
              confirmed.forEach(b => {
                const key = b.departure_date!.slice(0, 7);
                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(b);
              });
              const months = Object.keys(grouped).sort();
              if (!months.length) return (
                <div className="text-center py-20 text-[#8A8A8A]">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Aucune réservation confirmée avec date de départ</p>
                </div>
              );
              return (
                <div className="space-y-6">
                  {months.map(m => {
                    const [year, month] = m.split("-");
                    const label = new Date(+year, +month-1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
                    return (
                      <div key={m} className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-[#C9943A]/10 to-transparent border-b border-[#E8E0D0] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#C9943A]" />
                            <span className="font-semibold text-[#1A1A1A] capitalize">{label}</span>
                          </div>
                          <span className="text-xs bg-[#C9943A] text-white px-2.5 py-1 rounded-full font-medium">{grouped[m].length} départ{grouped[m].length>1?"s":""}</span>
                        </div>
                        <div className="divide-y divide-[#F0EAE0]">
                          {grouped[m].map(b => (
                            <div key={b.id} className="px-6 py-3 flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#C9943A] font-bold text-sm shrink-0">
                                {b.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#1A1A1A]">{b.name}</p>
                                <p className="text-xs text-[#8A8A8A] truncate">{b.package_name || "—"} · {b.passengers} pers.</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs font-medium text-[#1A1A1A]">{b.departure_date}</p>
                                <a href={`https://wa.me/${b.phone.replace(/\D/g,"").replace(/^0/,"213")}?text=${waMessage(b)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline">{b.phone}</a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* ── EMAIL TEMPLATES ── */}
        {activeTab === "emails" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <EmailTemplates />
          </motion.div>
        )}

        {/* ── PARTENARIATS HÔTELS ── */}
        {activeTab === "partenariats" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <PartenariatsHotels />
          </motion.div>
        )}
      </div>
    </div>
  );
}
