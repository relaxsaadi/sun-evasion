import type { Metadata } from "next";
import DestinationsContent from "./DestinationsContent";

export const metadata: Metadata = {
  title: "Destinations — Turquie & Tunisie | Sun Evasion Algérie",
  description: "Découvrez nos destinations phares : Istanbul, Cappadoce et Antalya en Turquie, Djerba et Sousse en Tunisie. Forfaits tout compris depuis Alger.",
  openGraph: { title: "Destinations Sun Evasion", description: "Turquie & Tunisie — forfaits depuis Alger", url: "https://voyage.tripsunevasion.com/destinations", images: [{ url: "https://voyage.tripsunevasion.com/images/istanbul.webp" }] },
  alternates: { canonical: "https://voyage.tripsunevasion.com/destinations" },
};

export default function Page() { return <DestinationsContent />; }
