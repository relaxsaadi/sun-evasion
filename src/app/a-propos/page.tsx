import type { Metadata } from "next";
import AProposContent from "./AProposContent";

export const metadata: Metadata = {
  title: "À Propos de Sun Evasion | Agence de Voyage Algérie",
  description: "Sun Evasion, votre agence de voyage de confiance basée à Alger. Spécialiste des séjours en Turquie, Tunisie et Omra. Des années d'expérience, des milliers de clients satisfaits.",
  openGraph: { title: "À Propos — Sun Evasion", description: "Votre agence de voyage algérienne de confiance", url: "https://voyage.tripsunevasion.com/a-propos", images: [{ url: "https://voyage.tripsunevasion.com/images/istanbul.webp" }] },
  alternates: { canonical: "https://voyage.tripsunevasion.com/a-propos" },
};

export default function Page() { return <AProposContent />; }
