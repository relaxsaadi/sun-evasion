"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle, Mail, ChevronDown } from "lucide-react";
import { SITE } from "@/lib/constants";

type Template = {
  id: string;
  label: string;
  subject: string;
  body: string;
  tag: string;
  tagColor: string;
};

const TEMPLATES: Template[] = [
  {
    id: "confirmation",
    label: "Confirmation de réservation",
    tag: "Client",
    tagColor: "bg-emerald-100 text-emerald-700",
    subject: "✅ Confirmation de votre réservation — Sun Evasion",
    body: `Objet : ✅ Confirmation de votre réservation — Sun Evasion

Bonjour [Prénom],

Nous avons bien reçu votre demande de réservation pour [Forfait] et nous vous en remercions.

📋 Récapitulatif de votre réservation :
• Séjour : [Forfait]
• Départ prévu : [Date de départ]
• Nombre de voyageurs : [Nombre]
• Statut : En cours de traitement

📌 Prochaines étapes :
1. Notre équipe vous contactera sous 24h pour confirmer les disponibilités
2. Vous recevrez un devis détaillé avec les modalités de paiement
3. Un acompte de 30% sera demandé pour confirmer votre réservation

Pour toute question, n'hésitez pas à nous contacter :
📞 ${SITE.phone} / ${SITE.phone2}
💬 WhatsApp : ${SITE.phone}
📧 ${SITE.email}

À très bientôt pour votre voyage !

Cordialement,
L'équipe Sun Evasion
🌐 voyage.tripsunevasion.com`,
  },
  {
    id: "payment-reminder",
    label: "Rappel de paiement",
    tag: "Paiement",
    tagColor: "bg-amber-100 text-amber-700",
    subject: "⏰ Rappel — Acompte en attente pour votre voyage Sun Evasion",
    body: `Objet : ⏰ Rappel — Acompte en attente pour votre voyage Sun Evasion

Bonjour [Prénom],

Nous espérons que vous vous portez bien. Nous revenons vers vous concernant votre réservation pour [Forfait], départ prévu le [Date].

💳 Rappel de paiement :
Un acompte de [Montant] DA est en attente pour confirmer définitivement votre place.

Sans réception de l'acompte avant le [Date limite], nous ne pourrons malheureusement pas garantir votre réservation.

📲 Modes de paiement acceptés :
• Virement bancaire (RIB disponible sur demande)
• Paiement en agence (Alger)
• CCP (numéro sur demande)

Contactez-nous dès que possible pour finaliser :
📞 ${SITE.phone}
💬 WhatsApp disponible 7j/7

Merci de votre confiance et à bientôt !

Cordialement,
L'équipe Sun Evasion`,
  },
  {
    id: "itinerary",
    label: "Programme du voyage",
    tag: "Voyage",
    tagColor: "bg-blue-100 text-blue-700",
    subject: "🗺️ Votre programme détaillé — [Forfait] avec Sun Evasion",
    body: `Objet : 🗺️ Votre programme détaillé — [Forfait] avec Sun Evasion

Bonjour [Prénom],

Votre départ approche ! Voici votre programme complet pour [Forfait].

✈️ INFORMATIONS PRATIQUES :
• Date de départ : [Date départ]
• Date de retour : [Date retour]
• Aéroport : Alger — Houari Boumediene
• Heure de rendez-vous : [Heure RDV]
• Vol : [Numéro de vol]

🏨 HÉBERGEMENT :
• Hôtel : [Nom de l'hôtel]
• Adresse : [Adresse]
• Check-in : [Date] / Check-out : [Date]

📋 DOCUMENTS À PRÉPARER :
✓ Passeport valide (6 mois minimum après retour)
✓ Visa [Destination] (fourni par Sun Evasion si inclus)
✓ Assurance voyage
✓ Billets imprimés ou sur téléphone

📅 PROGRAMME JOUR PAR JOUR :
Jour 1 : Arrivée et installation à l'hôtel
Jour 2 : [Activités]
...
Dernier jour : Transfert aéroport et retour

Pour toute question de dernière minute :
📞 ${SITE.phone} (disponible 24h avant le départ)

Bon voyage !

Cordialement,
L'équipe Sun Evasion`,
  },
  {
    id: "post-trip",
    label: "Message post-voyage",
    tag: "Fidélisation",
    tagColor: "bg-purple-100 text-purple-700",
    subject: "🌟 Comment s'est passé votre voyage ? — Sun Evasion",
    body: `Objet : 🌟 Comment s'est passé votre voyage ? — Sun Evasion

Bonjour [Prénom],

Nous espérons que vous êtes bien rentré(e) de [Destination] et que ce voyage restera un souvenir inoubliable !

Chez Sun Evasion, votre satisfaction est notre priorité. C'est pourquoi nous souhaiterions avoir votre retour :

⭐ Laissez-nous votre avis :
Votre témoignage aide d'autres voyageurs algériens à faire confiance à Sun Evasion.
→ Répondez simplement à cet email avec votre avis

🎁 OFFRE FIDÉLITÉ :
En tant que client Sun Evasion, bénéficiez de :
• -5% sur votre prochaine réservation
• Priorité sur les nouvelles dates
• Accès aux offres exclusives en avant-première

📅 NOS PROCHAINS DÉPARTS :
• Istanbul — [Date] → [Prix] DA
• Djerba — [Date] → [Prix] DA
• Omra — [Date] → [Prix] DA

Contactez-nous pour réserver :
📞 ${SITE.phone}
💬 WhatsApp : ${SITE.phone}

À bientôt pour de nouvelles aventures !

Cordialement,
L'équipe Sun Evasion
🌐 voyage.tripsunevasion.com`,
  },
  {
    id: "partnership",
    label: "Email de partenariat",
    tag: "B2B",
    tagColor: "bg-[#F5F0E8] text-[#C9943A]",
    subject: "Demande de partenariat tour-opérateur — Sun Evasion Algérie",
    body: `Objet : Demande de partenariat tour-opérateur — Sun Evasion Algérie

Madame, Monsieur,

Je me permets de vous contacter au nom de Sun Evasion, agence de voyage algérienne spécialisée dans les séjours en [Destination].

PRÉSENTATION DE SUN EVASION :
• Agence basée à Alger, active depuis plusieurs années
• Spécialiste des séjours [Destination]
• Volume estimé : 200–500 voyageurs/an vers votre destination
• Clientèle algérienne haut de gamme — familles et couples

NOTRE DEMANDE :
Nous souhaitons établir un partenariat tour-opérateur afin de proposer votre établissement dans nos forfaits. Nous recherchons :
1. Tarif net B2B / allotement garanti
2. Conditions de commission
3. Politique d'annulation pour groupes
4. Disponibilités saisons printemps, été, automne

CE QUE NOUS PROPOSONS :
✓ Volume garanti de réservations annuelles
✓ Paiement rapide et professionnel
✓ Promotion sur notre site et réseaux sociaux
✓ Partenariat durable sur le long terme

Pourriez-vous nous communiquer votre grille tarifaire B2B ?

Cordialement,
[Votre nom]
Sun Evasion — Alger, Algérie
📞 ${SITE.phone}
📧 ${SITE.email}
🌐 voyage.tripsunevasion.com`,
  },
];

export default function EmailTemplates() {
  const [expanded, setExpanded] = useState<string | null>("confirmation");
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[#1A1A1A]">Templates Email</h1>
        <p className="text-[#8A8A8A] text-sm mt-1">
          5 modèles prêts à l'emploi · Copiez, personnalisez les [crochets], envoyez
        </p>
      </div>

      {/* Tip */}
      <div className="bg-[#F5F0E8] border border-[#E8D5A0] rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Mail className="w-5 h-5 text-[#C9943A] shrink-0 mt-0.5" />
        <p className="text-sm text-[#4A4A4A]">
          Remplacez les éléments entre <strong>[crochets]</strong> par les informations du client avant d'envoyer.
          Copiez le sujet et le corps séparément.
        </p>
      </div>

      <div className="space-y-3">
        {TEMPLATES.map((tpl) => (
          <div key={tpl.id} className="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setExpanded(expanded === tpl.id ? null : tpl.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAFAF7] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9943A]" />
                <div>
                  <span className="font-semibold text-[#1A1A1A]">{tpl.label}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${tpl.tagColor}`}>{tpl.tag}</span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#8A8A8A] transition-transform ${expanded === tpl.id ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {expanded === tpl.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 border-t border-[#E8E0D0]">
                    {/* Subject */}
                    <div className="mt-4 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wide">Objet</span>
                        <button
                          onClick={() => copyText(`${tpl.id}-subject`, tpl.subject)}
                          className="flex items-center gap-1.5 text-xs text-[#C9943A] hover:underline"
                        >
                          {copied === `${tpl.id}-subject` ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === `${tpl.id}-subject` ? "Copié !" : "Copier l'objet"}
                        </button>
                      </div>
                      <div className="bg-[#FAFAF7] border border-[#E8E0D0] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] font-medium">
                        {tpl.subject}
                      </div>
                    </div>

                    {/* Body */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wide">Corps du message</span>
                        <button
                          onClick={() => copyText(`${tpl.id}-body`, tpl.body)}
                          className="flex items-center gap-1.5 text-xs text-[#C9943A] hover:underline"
                        >
                          {copied === `${tpl.id}-body` ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied === `${tpl.id}-body` ? "Copié !" : "Copier le message"}
                        </button>
                      </div>
                      <pre className="bg-[#FAFAF7] border border-[#E8E0D0] rounded-xl px-4 py-4 text-xs text-[#1A1A1A] whitespace-pre-wrap font-sans leading-relaxed max-h-72 overflow-y-auto">
                        {tpl.body}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
