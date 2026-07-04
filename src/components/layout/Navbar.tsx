"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, Globe } from "lucide-react";
import { SITE } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { useLang } from "@/contexts/LangContext";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  // All hooks before any conditional returns
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return null;

  const NAV_LINKS = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_destinations"), href: "/destinations" },
    { label: t("nav_voyages"), href: "/voyages" },
    { label: t("nav_omra"), href: "/omra" },
    { label: t("nav_about"), href: "/a-propos" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? "navbar-scrolled py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className={`relative h-10 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}>
                <Image
                  src="/logo.png"
                  alt="Sun Evasion"
                  height={40}
                  width={90}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 font-medium ${
                    scrolled
                      ? "text-[#4A4A4A] hover:text-[#C9943A] hover:bg-[rgba(201,148,58,0.08)]"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + lang switcher */}
            <div className="hidden md:flex items-center gap-3">
              <div className={`flex flex-col items-end text-xs font-medium transition-colors duration-200 ${scrolled ? "text-[#4A4A4A]" : "text-white/80"}`}>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-1 hover:text-[#C9943A] transition-colors">
                  <Phone className="w-3 h-3" /> {SITE.phone}
                </a>
                <a href={`tel:${SITE.phone2}`} className="flex items-center gap-1 hover:text-[#C9943A] transition-colors">
                  <Phone className="w-3 h-3" /> {SITE.phone2}
                </a>
              </div>
              {/* Language switcher */}
              <button
                onClick={() => setLang(lang === "ar" ? "fr" : "ar")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  scrolled
                    ? "border-[#E8E0D0] text-[#4A4A4A] hover:border-[#C9943A] hover:text-[#C9943A]"
                    : "border-white/30 text-white/80 hover:border-white hover:text-white"
                }`}
                aria-label="Switch language"
              >
                <Globe className="w-3 h-3" />
                {t("nav_lang_switch")}
              </button>
              <Link href="/contact" className="btn-primary text-sm !py-2 !px-5">
                {t("nav_book")}
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(true)}
              className={`md:hidden p-2 transition-colors ${
                scrolled ? "text-[#1A1A1A]" : "text-white"
              }`}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: lang === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: lang === "ar" ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className={`fixed ${lang === "ar" ? "left-0" : "right-0"} top-0 bottom-0 w-72 bg-white shadow-2xl z-50 p-6`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Image src="/logo.png" alt="Sun Evasion" height={32} width={72} className="h-8 w-auto object-contain" />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-[#8A8A8A] hover:text-[#1A1A1A] p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: lang === "ar" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-[#4A4A4A] hover:text-[#C9943A] hover:bg-[rgba(201,148,58,0.06)] rounded-xl transition-all duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#E8E0D0] space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  {t("nav_book")}
                </Link>
                {/* Mobile language switcher */}
                <button
                  onClick={() => setLang(lang === "ar" ? "fr" : "ar")}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#4A4A4A] hover:text-[#C9943A] border border-[#E8E0D0] hover:border-[#C9943A] rounded-xl transition-all duration-200 font-medium"
                >
                  <Globe className="w-4 h-4" />
                  {t("nav_lang_switch")}
                </button>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-[#C9943A] transition-colors">
                  <Phone className="w-4 h-4" /> {SITE.phone}
                </a>
                <a href={`tel:${SITE.phone2}`} className="flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-[#C9943A] transition-colors">
                  <Phone className="w-4 h-4" /> {SITE.phone2}
                </a>
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors font-medium">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
