import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { PACKAGES } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { name, phone, email, packageId, departureDate, passengers, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Nom et téléphone requis" }, { status: 400 });
    }

    const pkg = PACKAGES.find((p) => p.id === packageId);

    // Save to Supabase
    const { error: dbError } = await supabase.from("bookings").insert({
      name,
      phone,
      email: email || null,
      package_id: packageId || null,
      package_name: pkg?.name || "Sur mesure",
      departure_date: departureDate || null,
      passengers: parseInt(passengers) || 1,
      message: message || null,
      status: "pending",
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
    }

    // Send notification email to agency
    await resend.emails.send({
      from: "Sun Evasion <noreply@sunevasion.dz>",
      to: ["contact@sunevasion.dz"],
      replyTo: email || undefined,
      subject: `🌟 Nouvelle demande de réservation — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e1a; color: #f0f4ff; padding: 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #d4a843; font-size: 24px;">☀️ Sun Evasion</h1>
            <p style="color: #666;">Nouvelle demande de réservation</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #d4a843; margin-top: 0;">Client</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            ${email ? `<p><strong>Email :</strong> ${email}</p>` : ""}
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #d4a843; margin-top: 0;">Voyage demandé</h2>
            <p><strong>Séjour :</strong> ${pkg?.name || packageId || "Non spécifié"}</p>
            ${pkg ? `<p><strong>Prix :</strong> ${pkg.price.toLocaleString("fr-DZ")} DZD/pers.</p>` : ""}
            ${departureDate ? `<p><strong>Départ souhaité :</strong> ${departureDate}</p>` : ""}
            <p><strong>Voyageurs :</strong> ${passengers}</p>
          </div>
          ${message ? `<div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;"><h2 style="color: #d4a843; margin-top: 0;">Message</h2><p>${message}</p></div>` : ""}
          <div style="text-align: center; margin-top: 24px;">
            <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP?.replace("+", "")}?text=Bonjour ${encodeURIComponent(name)}, suite à votre demande Sun Evasion..." style="background: #25d366; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: bold;">
              Répondre sur WhatsApp
            </a>
          </div>
        </div>
      `,
    });

    // Auto-reply to client if email provided
    if (email) {
      await resend.emails.send({
        from: "Sun Evasion <contact@sunevasion.dz>",
        to: [email],
        subject: "☀️ Votre demande de voyage a bien été reçue — Sun Evasion",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e1a; color: #f0f4ff; padding: 30px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #d4a843;">☀️ Sun Evasion</h1>
            </div>
            <p>Bonjour <strong>${name}</strong>,</p>
            <p>Merci pour votre demande de voyage ! Notre équipe l'a bien reçue et vous contactera dans les <strong>2 heures</strong> pour confirmer les détails de votre séjour.</p>
            ${pkg ? `<div style="background: rgba(212,168,67,0.1); border: 1px solid rgba(212,168,67,0.3); border-radius: 8px; padding: 16px; margin: 16px 0;"><p style="color: #d4a843; font-weight: bold;">${pkg.name}</p><p>Durée : ${pkg.duration}</p><p>Prix : ${pkg.price.toLocaleString("fr-DZ")} DZD / personne</p></div>` : ""}
            <p>En attendant, vous pouvez nous contacter directement :</p>
            <ul>
              <li>📱 WhatsApp : +213 770 60 47 71</li>
              <li>📧 Email : contact@sunevasion.dz</li>
            </ul>
            <p style="color: #666; font-size: 12px; margin-top: 24px;">— L'équipe Sun Evasion, Alger</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
