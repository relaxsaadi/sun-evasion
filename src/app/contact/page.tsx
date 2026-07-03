import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact & Réservation | Sun Evasion Algérie",
  description: "Contactez Sun Evasion pour réserver votre voyage en Turquie, Tunisie ou Omra. Devis gratuit, réponse rapide. WhatsApp disponible 7j/7.",
  openGraph: { title: "Contact Sun Evasion", description: "Réservez votre voyage — réponse rapide", url: "https://voyage.tripsunevasion.com/contact", images: [{ url: "https://voyage.tripsunevasion.com/images/djerba.webp" }] },
  alternates: { canonical: "https://voyage.tripsunevasion.com/contact" },
};

export default function Page() { return <ContactContent />; }
