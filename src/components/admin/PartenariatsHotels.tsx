"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Hotel, Star, Globe, Mail, Phone, Filter, X,
  CheckCircle, ExternalLink, Copy, Send, ChevronDown,
  MapPin, TrendingUp, Users, Handshake, Search, RefreshCw, Scan,
} from "lucide-react";
import { HOTELS, COUNTRIES, CITIES, type Hotel as HotelType } from "@/lib/hotels-data";
import { SITE } from "@/lib/constants";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < count ? "fill-amber-400 text-amber-400" : "text-[#E8E0D0]"}`}
        />
      ))}
    </div>
  );
}

function EmailModal({
  hotel,
  onClose,
}: {
  hotel: HotelType;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const emailBody = `Objet : Demande de partenariat tour-opérateur — Sun Evasion Algérie

Madame, Monsieur,

Je me permets de vous contacter au nom de Sun Evasion, agence de voyage algérienne spécialisée dans les séjours en ${hotel.country === "turquie" ? "Turquie" : "Tunisie"}.

**Présentation de Sun Evasion :**
• Agence basée à Alger, opérant depuis plusieurs années
• Spécialiste des séjours ${hotel.country === "turquie" ? "Turquie (Istanbul, Cappadoce, Antalya)" : "Tunisie (Djerba, Sousse, Hammamet)"}
• Volume estimé : 200–500 voyageurs/an vers votre destination
• Clientèle algérienne familiale et couples — fort pouvoir d'achat

**Notre demande :**
Nous souhaitons établir un partenariat tour-opérateur avec ${hotel.name} afin de proposer votre établissement dans nos forfaits. Nous recherchons spécifiquement :

1. Tarif net B2B / allotement garanti (minimum ${hotel.groupMin} personnes)
2. Conditions de commission (nous notons votre taux habituel de ${hotel.commission}%)
3. Politique d'annulation et acomptes pour groupes
4. Disponibilité pour les saisons : printemps, été, automne
5. Informations sur les services spécifiques pour clientèle arabophone

**Ce que nous proposons :**
✓ Volume garanti de réservations annuelles
✓ Paiement rapide et sérieux (agréée, professionnelle)
✓ Promotion de votre établissement sur notre site web et réseaux sociaux
✓ Fidélité sur le long terme — partenariat durable

Pourriez-vous nous communiquer votre grille tarifaire B2B ainsi que vos conditions de partenariat ? Nous sommes disponibles pour un appel ou une visioconférence à votre convenance.

Dans l'attente de votre retour, nous vous adressons nos cordiales salutations.

—
Sun Evasion
Agence de voyage — Alger, Algérie
📞 ${SITE.phone} / ${SITE.phone2}
📧 ${SITE.email}
🌐 voyage.tripsunevasion.com`;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openMailto = () => {
    const subject = encodeURIComponent(`Demande de partenariat tour-opérateur — Sun Evasion Algérie`);
    const body = encodeURIComponent(emailBody);
    window.open(`mailto:${hotel.email}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#E8E0D0]">
          <div>
            <h3 className="font-display text-xl font-bold text-[#1A1A1A]">
              Email de partenariat
            </h3>
            <p className="text-[#8A8A8A] text-sm mt-0.5">
              À envoyer à {hotel.name} — {hotel.email}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F5F0E8] rounded-xl transition-colors">
            <X className="w-5 h-5 text-[#8A8A8A]" />
          </button>
        </div>

        {/* Email content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-[#FAFAF7] border border-[#E8E0D0] rounded-2xl p-5">
            <p className="text-xs font-semibold text-[#4A4A4A] mb-1">
              À : <span className="text-[#C9943A]">{hotel.email}</span>
            </p>
            <pre className="text-sm text-[#1A1A1A] whitespace-pre-wrap font-sans leading-relaxed mt-3">
              {emailBody}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-[#E8E0D0] flex gap-3">
          <button
            onClick={copyEmail}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E8E0D0] text-[#4A4A4A] hover:border-[#C9943A] hover:text-[#C9943A] transition-all text-sm font-medium"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copié !" : "Copier le texte"}
          </button>
          <button
            onClick={openMailto}
            className="flex-1 btn-primary justify-center py-3 text-sm"
          >
            <Send className="w-4 h-4" /> Ouvrir dans ma messagerie
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function HotelCard({
  hotel,
  onContact,
  onToggleContract,
}: {
  hotel: HotelType;
  onContact: (h: HotelType) => void;
  onToggleContract: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Photo + stars */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Contract badge */}
        {hotel.hasContract && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" /> Partenaire
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span className="bg-white/90 text-[#1A1A1A] text-xs font-bold px-2.5 py-1 rounded-full">
            {hotel.stars}★
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{hotel.name}</p>
            <p className="text-white/75 text-xs flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {hotel.city}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-sm">{hotel.pricePerNight}€</p>
            <p className="text-white/70 text-xs">/nuit B2B</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Rating + commission */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StarRating count={hotel.stars} />
            <span className="text-xs font-semibold text-[#1A1A1A]">{hotel.rating}/10</span>
            <span className="text-xs text-[#8A8A8A]">({hotel.reviewCount.toLocaleString("fr")} avis)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            {hotel.commission}% comm.
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {hotel.tags.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 bg-[#F5F0E8] text-[#4A4A4A] text-xs rounded-full">
              {t}
            </span>
          ))}
        </div>

        <p className="text-xs text-[#4A4A4A] leading-relaxed mb-3 line-clamp-2">{hotel.description}</p>

        {/* Min pax */}
        <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A] mb-4">
          <Users className="w-3.5 h-3.5" />
          Minimum {hotel.groupMin} pax · {hotel.country === "turquie" ? "🇹🇷 Turquie" : "🇹🇳 Tunisie"}
        </div>

        {/* Expandable details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-[#C9943A] font-medium mb-3 hover:underline"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Masquer" : "Voir"} avantages & conditions
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs font-semibold text-[#4A4A4A] mb-1.5">✅ Avantages agence</p>
                  <ul className="space-y-1">
                    {hotel.advantages.map((a) => (
                      <li key={a} className="text-xs text-[#4A4A4A] flex items-start gap-1">
                        <span className="text-emerald-500 shrink-0 mt-0.5">•</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#4A4A4A] mb-1.5">📋 Conditions</p>
                  <ul className="space-y-1">
                    {hotel.conditions.map((c) => (
                      <li key={c} className="text-xs text-[#4A4A4A] flex items-start gap-1">
                        <span className="text-[#C9943A] shrink-0 mt-0.5">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-[#E8E0D0]">
          <a
            href={hotel.website}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-[#E8E0D0] text-[#8A8A8A] hover:text-[#C9943A] hover:border-[#C9943A] transition-all"
          >
            <Globe className="w-4 h-4" />
          </a>
          {hotel.phone && (
            <a
              href={`tel:${hotel.phone}`}
              className="p-2 rounded-lg border border-[#E8E0D0] text-[#8A8A8A] hover:text-[#C9943A] hover:border-[#C9943A] transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={() => onToggleContract(hotel.id)}
            className={`p-2 rounded-lg border transition-all ${
              hotel.hasContract
                ? "border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                : "border-[#E8E0D0] text-[#8A8A8A] hover:text-emerald-600 hover:border-emerald-300"
            }`}
            title={hotel.hasContract ? "Marquer sans contrat" : "Marquer comme partenaire"}
          >
            <Handshake className="w-4 h-4" />
          </button>
          <button
            onClick={() => onContact(hotel)}
            className="flex-1 btn-primary justify-center py-2 text-xs"
          >
            <Mail className="w-3.5 h-3.5" /> Envoyer email
          </button>
        </div>
      </div>
    </motion.div>
  );
}

type ScannedHotel = {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  googleUrl?: string;
  imageUrl?: string | null;
  priceLabel?: string | null;
  neighborhood?: string | null;
  openingHours?: unknown;
};

export default function PartenariatsHotels() {
  const [country, setCountry] = useState("all");
  const [city, setCity] = useState("all");
  const [minStars, setMinStars] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [onlyPartners, setOnlyPartners] = useState(false);
  const [emailHotel, setEmailHotel] = useState<HotelType | null>(null);
  const [hotels, setHotels] = useState<HotelType[]>(HOTELS);

  // Scanner state
  const [scanQuery, setScanQuery] = useState("hôtels 4 étoiles");
  const [scanCity, setScanCity] = useState("Istanbul");
  const [scanCountry, setScanCountry] = useState("turquie");
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScannedHotel[]>([]);
  const [scanError, setScanError] = useState("");

  const [scanStatus, setScanStatus] = useState("");

  const runScan = async () => {
    setScanning(true);
    setScanError("");
    setScanResults([]);
    setScanStatus("Démarrage du scan…");

    try {
      // 1. Start the run (fast — returns immediately)
      const startRes = await fetch("/api/admin/hotel-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: scanQuery, city: scanCity, country: scanCountry }),
      });
      const startData = await startRes.json();
      if (startData.error) { setScanError(startData.error); setScanning(false); return; }

      const { runId } = startData;
      setScanStatus("Scan en cours… (peut prendre 1–2 min)");

      // 2. Poll from browser every 6s — no Vercel timeout risk
      let attempts = 0;
      const maxAttempts = 25; // ~2.5 min max
      const poll = async (): Promise<void> => {
        attempts++;
        if (attempts > maxAttempts) {
          setScanError("Temps dépassé. Réessayez.");
          setScanning(false);
          return;
        }
        const res = await fetch(`/api/admin/hotel-scan/status?runId=${runId}`);
        const data = await res.json();
        if (data.error && data.status !== "RUNNING") {
          setScanError(data.error);
          setScanning(false);
          return;
        }
        if (data.status === "SUCCEEDED") {
          setScanResults(data.hotels || []);
          setScanStatus("");
          setScanning(false);
          return;
        }
        if (["FAILED", "ABORTED", "TIMED-OUT"].includes(data.status)) {
          setScanError(`Scan échoué (${data.status})`);
          setScanning(false);
          return;
        }
        // Still running — wait 6s and retry
        await new Promise((r) => setTimeout(r, 6000));
        return poll();
      };
      await poll();
    } catch {
      setScanError("Erreur réseau");
      setScanning(false);
    }
  };

  const toggleContract = (id: string) => {
    setHotels((prev) =>
      prev.map((h) => (h.id === id ? { ...h, hasContract: !h.hasContract } : h))
    );
  };

  const availableCities = country !== "all" ? ["all", ...(CITIES[country] || [])] : ["all"];

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (country !== "all" && h.country !== country) return false;
      if (city !== "all" && h.city !== city) return false;
      if (h.stars < minStars) return false;
      if (maxPrice < 1000 && h.pricePerNight > maxPrice) return false;
      if (onlyPartners && !h.hasContract) return false;
      return true;
    });
  }, [hotels, country, city, minStars, maxPrice, onlyPartners]);

  const stats = useMemo(() => ({
    total: hotels.length,
    partners: hotels.filter((h) => h.hasContract).length,
    avgCommission: Math.round(
      hotels.reduce((s, h) => s + h.commission, 0) / hotels.length
    ),
  }), [hotels]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[#1A1A1A]">Partenariats Hôtels</h1>
        <p className="text-[#8A8A8A] text-sm mt-1">
          Hôtels partenaires potentiels · Filtrez, contactez, suivez vos partenariats
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Hotel, label: "Hôtels identifiés", value: stats.total, color: "#C9943A" },
          { icon: Handshake, label: "Partenaires actifs", value: stats.partners, color: "#10B981" },
          { icon: TrendingUp, label: "Commission moyenne", value: `${stats.avgCommission}%`, color: "#0EA5E9" },
        ].map((s, i) => (
          <div key={s.label} className="bg-white border border-[#E8E0D0] rounded-2xl p-5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}15` }}
            >
              <s.icon className="w-4.5 h-4.5" style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-bold text-[#1A1A1A]">{s.value}</div>
            <div className="text-[#8A8A8A] text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scanner */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Scan className="w-4 h-4 text-[#C9943A]" />
          <span className="text-sm font-semibold text-[#1A1A1A]">Scanner de nouveaux hôtels</span>
          <span className="ml-auto text-xs text-[#8A8A8A]">Recherche via Google Maps</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-[#4A4A4A] mb-1">Recherche</label>
            <input
              type="text"
              value={scanQuery}
              onChange={(e) => setScanQuery(e.target.value)}
              placeholder="hôtels 4 étoiles"
              className="form-input py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A4A4A] mb-1">Ville</label>
            <input
              type="text"
              value={scanCity}
              onChange={(e) => setScanCity(e.target.value)}
              placeholder="Istanbul"
              className="form-input py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A4A4A] mb-1">Destination</label>
            <select
              value={scanCountry}
              onChange={(e) => setScanCountry(e.target.value)}
              className="form-input py-2 text-sm"
            >
              <option value="turquie">🇹🇷 Turquie</option>
              <option value="tunisie">🇹🇳 Tunisie</option>
            </select>
          </div>
        </div>
        <button
          onClick={runScan}
          disabled={scanning}
          className="btn-primary py-2.5 px-6 text-sm disabled:opacity-60"
        >
          {scanning ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> {scanStatus || "Scan en cours…"}</>
          ) : (
            <><Search className="w-4 h-4" /> Lancer le scan</>
          )}
        </button>

        {scanError && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
            {scanError}
          </p>
        )}

        {scanResults.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-semibold text-[#4A4A4A] mb-4">
              {scanResults.length} hôtel{scanResults.length > 1 ? "s" : ""} trouvé{scanResults.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {scanResults.map((h, i) => (
                <div key={i} className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  {/* Photo */}
                  <div className="relative h-40 overflow-hidden bg-[#F0EBE0]">
                    {h.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={h.imageUrl} alt={h.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Hotel className="w-12 h-12 text-[#C9943A] opacity-30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {h.rating && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/90 text-[#1A1A1A] text-xs font-bold px-2.5 py-1 rounded-full">
                          ★ {Number(h.rating).toFixed(1)}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-semibold text-sm leading-tight">{h.name}</p>
                      {(h.neighborhood || h.address) && (
                        <p className="text-white/75 text-xs flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {h.neighborhood || h.address}
                        </p>
                      )}
                    </div>
                    {h.priceLabel && (
                      <div className="absolute bottom-3 right-3 text-right">
                        <p className="text-white font-bold text-sm">{h.priceLabel}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {/* Rating + reviews */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {h.rating && (
                          <>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, si) => (
                                <Star key={si} className={`w-3 h-3 ${si < Math.round(Number(h.rating) / 2) ? "fill-amber-400 text-amber-400" : "text-[#E8E0D0]"}`} />
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-[#1A1A1A]">{Number(h.rating).toFixed(1)}/5</span>
                          </>
                        )}
                        {h.reviewCount && (
                          <span className="text-xs text-[#8A8A8A]">({Number(h.reviewCount).toLocaleString("fr")} avis)</span>
                        )}
                      </div>
                    </div>

                    {/* Category tag */}
                    {h.category && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="px-2 py-0.5 bg-[#F5F0E8] text-[#C9943A] text-xs rounded-full font-medium">
                          {h.category}
                        </span>
                      </div>
                    )}

                    {/* Address */}
                    {h.address && (
                      <p className="text-xs text-[#4A4A4A] leading-relaxed mb-3 line-clamp-2 flex items-start gap-1">
                        <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-[#C9943A]" />
                        {h.address}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-[#E8E0D0] flex-wrap">
                      {h.website && (
                        <a href={h.website} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-[#E8E0D0] text-[#8A8A8A] hover:text-[#C9943A] hover:border-[#C9943A] transition-all"
                          title="Site web">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                      {h.phone && (
                        <a href={`tel:${h.phone}`}
                          className="p-2 rounded-lg border border-[#E8E0D0] text-[#8A8A8A] hover:text-[#C9943A] hover:border-[#C9943A] transition-all"
                          title={h.phone}>
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
                      {h.googleUrl && (
                        <a href={h.googleUrl} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-lg border border-[#E8E0D0] text-[#8A8A8A] hover:text-[#C9943A] hover:border-[#C9943A] transition-all"
                          title="Google Maps">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {h.phone && (
                        <a
                          href={`https://wa.me/${h.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Bonjour, je suis de Sun Evasion (agence de voyage algérienne). Je souhaite discuter d'un partenariat hôtelier.")}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all text-xs font-medium"
                        >
                          <Send className="w-3.5 h-3.5" /> WhatsApp
                        </a>
                      )}
                      {!h.phone && h.googleUrl && (
                        <a href={h.googleUrl} target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg btn-primary text-xs font-medium">
                          <ExternalLink className="w-3.5 h-3.5" /> Voir sur Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E8E0D0] rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-[#C9943A]" />
          <span className="text-sm font-semibold text-[#1A1A1A]">Filtres</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Country */}
          <div>
            <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">Destination</label>
            <select
              value={country}
              onChange={(e) => { setCountry(e.target.value); setCity("all"); }}
              className="form-input py-2 text-sm"
            >
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">Ville</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={country === "all"}
              className="form-input py-2 text-sm disabled:opacity-50"
            >
              {availableCities.map((c) => (
                <option key={c} value={c}>{c === "all" ? "Toutes les villes" : c}</option>
              ))}
            </select>
          </div>

          {/* Stars */}
          <div>
            <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
              Minimum {minStars > 0 ? `${minStars}★` : "toutes étoiles"}
            </label>
            <div className="flex gap-1">
              {[0, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setMinStars(s)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                    minStars === s
                      ? "bg-[#C9943A] text-white border-[#C9943A]"
                      : "border-[#E8E0D0] text-[#4A4A4A] hover:border-[#C9943A]"
                  }`}
                >
                  {s === 0 ? "Tous" : `${s}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
              Prix max B2B : {maxPrice >= 1000 ? "Tous" : `${maxPrice}€/nuit`}
            </label>
            <input
              type="range"
              min={50}
              max={1000}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="w-full accent-[#C9943A]"
            />
          </div>
        </div>

        {/* Only partners */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setOnlyPartners(!onlyPartners)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              onlyPartners
                ? "bg-emerald-500 text-white border-emerald-500"
                : "border-[#E8E0D0] text-[#4A4A4A] hover:border-emerald-400"
            }`}
          >
            <Handshake className="w-4 h-4" />
            Partenaires uniquement
          </button>
          <span className="text-[#8A8A8A] text-sm">{filtered.length} hôtel{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Hotel grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onContact={setEmailHotel}
              onToggleContract={toggleContract}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#8A8A8A]">
          <Hotel className="w-10 h-10 mx-auto mb-3 opacity-25" />
          <p>Aucun hôtel ne correspond à vos filtres</p>
        </div>
      )}

      {/* Email modal */}
      <AnimatePresence>
        {emailHotel && (
          <EmailModal hotel={emailHotel} onClose={() => setEmailHotel(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
