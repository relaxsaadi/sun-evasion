"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Share2, Globe, MessageCircle } from "lucide-react";
import { SITE, DESTINATIONS } from "@/lib/constants";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return null;
  return (
    <footer className="bg-[#1C1C1C] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image src="/logo.png" alt="Sun Evasion" height={44} width={100} className="h-11 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Votre agence de voyage algérienne de confiance. Des séjours de rêve en Turquie et Tunisie, conçus pour vous.
            </p>
            <div className="flex items-center gap-3">
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-[#C9943A] hover:border-[#C9943A]/40 transition-all duration-200">
                <Globe className="w-4 h-4" />
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-[#C9943A] hover:border-[#C9943A]/40 transition-all duration-200">
                <Share2 className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-green-400 hover:border-green-400/40 transition-all duration-200">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white/60 font-semibold mb-5 text-xs uppercase tracking-widest">Destinations</h3>
            <ul className="space-y-3">
              {DESTINATIONS.map((d) => (
                <li key={d.id}>
                  <Link href={`/destinations/${d.slug}`}
                    className="text-white/50 hover:text-[#C9943A] text-sm transition-colors duration-200 flex items-center gap-2">
                    <span>{d.flag}</span> {d.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/voyages" className="text-[#C9943A] hover:text-[#E8B85A] text-sm transition-colors duration-200">
                  Tous nos voyages →
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/60 font-semibold mb-5 text-xs uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: "Accueil", href: "/" },
                { label: "Destinations", href: "/destinations" },
                { label: "Voyages", href: "/voyages" },
                { label: "À propos", href: "/a-propos" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-[#C9943A] text-sm transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/60 font-semibold mb-5 text-xs uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-start gap-3 text-white/50 hover:text-[#C9943A] text-sm transition-colors duration-200">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#C9943A]" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone2}`} className="flex items-start gap-3 text-white/50 hover:text-[#C9943A] text-sm transition-colors duration-200">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#C9943A]" />
                  {SITE.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}
                  className="flex items-start gap-3 text-white/50 hover:text-[#C9943A] text-sm transition-colors duration-200">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#C9943A]" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#C9943A]" />
                {SITE.address}
              </li>
              <li className="flex flex-col gap-2 mt-1">
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=Bonjour Sun Evasion, je voudrais des informations sur vos voyages.`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm hover:bg-green-500/20 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" /> {SITE.phone}
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsapp2}?text=Bonjour Sun Evasion, je voudrais des informations sur vos voyages.`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm hover:bg-green-500/20 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" /> {SITE.phone2}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Sun Evasion · Tous droits réservés
          </p>
          <p className="text-white/20 text-xs">Agence agréée · Alger, Algérie</p>
        </div>
      </div>
    </footer>
  );
}
