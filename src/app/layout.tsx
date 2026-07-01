import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sun Evasion — Agence de Voyage Algérie | Turquie & Tunisie",
  description:
    "Votre agence de voyage algérienne de confiance. Séjours inoubliables en Turquie et Tunisie. Vols, hôtels, transferts inclus. Départs depuis Alger.",
  keywords:
    "agence voyage algérie, voyage turquie algérie, voyage tunisie algérie, séjour istanbul, djerba, cappadoce",
  openGraph: {
    title: "Sun Evasion — Voyagez avec le soleil",
    description: "Séjours de rêve en Turquie et Tunisie depuis Alger",
    type: "website",
    locale: "fr_DZ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
