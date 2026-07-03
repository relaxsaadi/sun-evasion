import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Sun Evasion — Agence de Voyage Algérie | Turquie, Tunisie & Omra",
  description: "Votre agence de voyage algérienne de confiance. Séjours en Turquie (Istanbul, Cappadoce, Antalya) et Tunisie (Djerba, Sousse). Omra organisée. Vols, hôtels, transferts inclus depuis Alger.",
  keywords: "agence voyage algérie, voyage turquie algérie, voyage tunisie algérie, séjour istanbul, djerba, cappadoce, omra algérie, sun evasion",
  openGraph: {
    title: "Sun Evasion — Voyagez avec le soleil",
    description: "Séjours de rêve en Turquie, Tunisie et Omra depuis Alger",
    type: "website",
    locale: "fr_DZ",
    url: "https://voyage.tripsunevasion.com",
    images: [{ url: "https://voyage.tripsunevasion.com/images/istanbul.webp", width: 1200, height: 630, alt: "Sun Evasion — Istanbul" }],
  },
  twitter: { card: "summary_large_image", title: "Sun Evasion — Agence de Voyage Algérie", description: "Séjours Turquie, Tunisie & Omra depuis Alger", images: ["https://voyage.tripsunevasion.com/images/istanbul.webp"] },
  alternates: { canonical: "https://voyage.tripsunevasion.com" },
};

export default function Page() { return <HomeContent />; }
