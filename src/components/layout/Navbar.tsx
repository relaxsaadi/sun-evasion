"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sun } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Voyages", href: "/voyages" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(212,168,67,0.05)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4a843] to-[#f0c96e] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sun className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-lg font-bold gradient-gold tracking-wide">Sun Evasion</span>
                <div className="text-[10px] text-white/40 tracking-widest uppercase -mt-1">
                  Agence de Voyage
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-all duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-[#d4a843] transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>{SITE.phone}</span>
              </a>
              <Button size="sm" asChild>
                <Link href="/contact">Réserver</Link>
              </Button>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-white/70 hover:text-white p-2"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-[#0f172a] border-l border-white/10 z-50 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold gradient-gold">Menu</span>
                <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <Button className="w-full" asChild>
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Réserver maintenant
                  </Link>
                </Button>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2 mt-4 text-sm text-white/50 hover:text-[#d4a843] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {SITE.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
