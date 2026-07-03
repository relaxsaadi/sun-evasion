import type { Metadata } from "next";
import VoyagesContent from "./VoyagesContent";

export const metadata: Metadata = {
  title: "Nos Voyages & Forfaits | Sun Evasion Algérie",
  description: "Tous nos forfaits voyage : Istanbul 5 jours, Cappadoce 7 jours, Antalya, Djerba, Sousse. Prix compétitifs, vols + hôtel + transferts inclus. Réservez depuis Alger.",
  openGraph: { title: "Voyages Sun Evasion — Turquie & Tunisie", description: "Tous nos forfaits voyage depuis Alger", url: "https://voyage.tripsunevasion.com/voyages", images: [{ url: "https://voyage.tripsunevasion.com/images/cappadoce.webp" }] },
  alternates: { canonical: "https://voyage.tripsunevasion.com/voyages" },
};

export default function Page() { return <VoyagesContent />; }
