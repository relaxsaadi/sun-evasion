import type { Metadata } from "next";
import OmraContent from "./OmraContent";

export const metadata: Metadata = {
  title: "Omra depuis Algérie — Forfaits Économique, Standard, Ramadan, VIP | Sun Evasion",
  description: "Réservez votre Omra avec Sun Evasion. Forfaits tout compris depuis Alger : vol, hôtel proche Haram, visa, guide religieux. Départs garantis en groupes. Prix dès 250 000 DA.",
  openGraph: { title: "Omra avec Sun Evasion — Algérie", description: "Forfaits Omra depuis Alger, visa inclus, guide religieux", url: "https://voyage.tripsunevasion.com/omra", images: [{ url: "https://voyage.tripsunevasion.com/images/omra.jpg" }] },
  alternates: { canonical: "https://voyage.tripsunevasion.com/omra" },
};

export default function Page() { return <OmraContent />; }
