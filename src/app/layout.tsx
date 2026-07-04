import type { Metadata } from "next";
import { Playfair_Display, Inter, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LangProvider } from "@/contexts/LangContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sun Evasion — Agence de Voyage Algérie | Turquie & Tunisie",
  description:
    "Votre agence de voyage algérienne de confiance. Séjours inoubliables en Turquie et Tunisie. Vols, hôtels, transferts inclus. Départs depuis Alger. Devis gratuit.",
  keywords:
    "agence voyage algérie, voyage turquie algérie, voyage tunisie algérie, séjour istanbul, djerba, cappadoce, antalya",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Sun Evasion — Voyagez avec le soleil",
    description: "Séjours de rêve en Turquie et Tunisie depuis Alger",
    type: "website",
    locale: "fr_DZ",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${playfair.variable} ${inter.variable} ${cairo.variable} scroll-smooth`}>
      <body className="antialiased">
        <LangProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
