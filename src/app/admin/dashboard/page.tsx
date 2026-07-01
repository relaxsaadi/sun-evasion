"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sun, LogOut, Users, Clock, CheckCircle, Phone, Mail, Calendar, Plane } from "lucide-react";
import { createClient } from "@/lib/supabase";

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

const STATUS_CONFIG = {
  pending:   { label: "En attente", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  contacted: { label: "Contacté",   color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  confirmed: { label: "Confirmé",   color: "text-green-400 bg-green-400/10 border-green-400/20" },
  cancelled: { label: "Annulé",     color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<{ email?: string; name?: string; avatar?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUser({
        email: session.user.email ?? undefined,
        name: session.user.user_metadata?.full_name,
        avatar: session.user.user_metadata?.avatar_url,
      });

      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      setBookings(data || []);
      setLoading(false);
    };

    init();
  }, [router]);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    const supabase = createClient();
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4a843] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Top bar */}
      <div className="border-b border-white/5 bg-[#060a14]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4a843] to-[#f0c96e] flex items-center justify-center">
              <Sun className="w-4 h-4 text-black" />
            </div>
            <span className="text-white font-semibold">Sun Evasion Admin</span>
          </div>
          <div className="flex items-center gap-4">
            {user?.avatar && (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            )}
            <span className="text-white/50 text-sm hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Users, label: "Total réservations", value: stats.total, color: "#d4a843" },
            { icon: Clock, label: "En attente", value: stats.pending, color: "#f59e0b" },
            { icon: CheckCircle, label: "Confirmées", value: stats.confirmed, color: "#22c55e" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <s.icon className="w-5 h-5 mb-3" style={{ color: s.color }} />
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-white/40 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bookings table */}
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-white font-semibold">Demandes de réservation</h2>
            <span className="text-white/30 text-sm">{bookings.length} total</span>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16 text-white/30">
              <Plane className="w-10 h-10 mx-auto mb-3 opacity-30" />
              Aucune réservation pour l&apos;instant
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {bookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-6 py-5 hover:bg-white/2 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Client info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4a843]/20 to-[#0891b2]/20 flex items-center justify-center text-[#d4a843] font-bold text-sm shrink-0">
                          {booking.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{booking.name}</div>
                          <div className="text-white/30 text-xs">
                            {new Date(booking.created_at).toLocaleDateString("fr-DZ", {
                              day: "numeric", month: "short", year: "numeric",
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-white/50 mb-2">
                        <a href={`tel:${booking.phone}`} className="flex items-center gap-1 hover:text-[#d4a843] transition-colors">
                          <Phone className="w-3.5 h-3.5" /> {booking.phone}
                        </a>
                        {booking.email && (
                          <a href={`mailto:${booking.email}`} className="flex items-center gap-1 hover:text-[#d4a843] transition-colors">
                            <Mail className="w-3.5 h-3.5" /> {booking.email}
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-white/40">
                        {booking.package_name && (
                          <span className="flex items-center gap-1 glass px-2 py-1 rounded-lg">
                            <Plane className="w-3 h-3" /> {booking.package_name}
                          </span>
                        )}
                        {booking.departure_date && (
                          <span className="flex items-center gap-1 glass px-2 py-1 rounded-lg">
                            <Calendar className="w-3 h-3" /> {booking.departure_date}
                          </span>
                        )}
                        <span className="flex items-center gap-1 glass px-2 py-1 rounded-lg">
                          <Users className="w-3 h-3" /> {booking.passengers} pers.
                        </span>
                      </div>

                      {booking.message && (
                        <p className="text-white/30 text-xs mt-2 italic">&ldquo;{booking.message}&rdquo;</p>
                      )}
                    </div>

                    {/* Status + actions */}
                    <div className="flex flex-row sm:flex-col items-center gap-2 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_CONFIG[booking.status].color}`}>
                        {STATUS_CONFIG[booking.status].label}
                      </span>

                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value as Booking["status"])}
                        className="text-xs bg-[#0f172a] border border-white/10 text-white/60 rounded-lg px-2 py-1 focus:outline-none focus:border-[#d4a843]/30"
                      >
                        <option value="pending">En attente</option>
                        <option value="contacted">Contacté</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="cancelled">Annulé</option>
                      </select>

                      <a
                        href={`https://wa.me/${booking.phone.replace(/\D/g, "")}?text=Bonjour ${encodeURIComponent(booking.name)}, suite à votre demande Sun Evasion pour ${booking.package_name || "votre voyage"}...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors whitespace-nowrap"
                      >
                        WhatsApp →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
