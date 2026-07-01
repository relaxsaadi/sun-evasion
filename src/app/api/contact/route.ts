import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { PACKAGES, OMRA_PACKAGES } from "@/lib/constants";

async function pushToGHL(data: {
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  departureDate?: string;
  passengers?: number;
  message?: string;
  packageName?: string;
  source?: string;
}) {
  const token = process.env.GHL_PIT;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) return;

  const [firstName, ...rest] = data.name.trim().split(" ");
  const lastName = rest.join(" ") || "";

  // Format Algerian phone for GHL (+213...)
  const phone = data.phone.replace(/\s/g, "").replace(/^0/, "+213");

  const tags = ["website-lead", "sun-evasion"];
  if (data.source === "omra") tags.push("omra");
  else tags.push("voyage");

  const contactPayload = {
    firstName,
    lastName,
    phone,
    ...(data.email ? { email: data.email } : {}),
    locationId,
    source: "Sun Evasion Website",
    tags,
    customFields: [
      ...(data.destination ? [{ key: "destination", field_value: data.destination }] : []),
      ...(data.departureDate ? [{ key: "departure_date", field_value: data.departureDate }] : []),
      ...(data.passengers ? [{ key: "passengers", field_value: String(data.passengers) }] : []),
      ...(data.packageName ? [{ key: "package", field_value: data.packageName }] : []),
      ...(data.message ? [{ key: "message", field_value: data.message }] : []),
    ],
  };

  const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Version": "2021-07-28",
    },
    body: JSON.stringify(contactPayload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("GHL contact error:", err);
    return null;
  }

  const contact = await res.json();
  const contactId = contact?.contact?.id;

  // Create opportunity/lead pipeline entry
  if (contactId) {
    await fetch("https://services.leadconnectorhq.com/opportunities/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Version": "2021-07-28",
      },
      body: JSON.stringify({
        title: `${data.name} — ${data.packageName || data.destination || "Voyage"}`,
        contactId,
        locationId,
        status: "open",
        source: "Website Sun Evasion",
      }),
    });
  }

  return contactId;
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { name, phone, email, packageId, destination, departureDate, passengers, message, date } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Nom et téléphone requis" }, { status: 400 });
    }

    const pkg = PACKAGES.find((p) => p.id === packageId)
      || OMRA_PACKAGES.find((p) => p.id === packageId);

    const resolvedDestination = destination || (pkg as { destination?: string })?.destination || null;
    const resolvedDate = departureDate || date || null;
    const isOmra = packageId?.includes("omra") || destination?.toLowerCase().includes("omra") || destination?.toLowerCase().includes("mecque");

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from("bookings").insert({
      name,
      phone,
      email: email || null,
      package_id: packageId || null,
      package_name: pkg?.name || resolvedDestination || "Sur mesure",
      departure_date: resolvedDate || null,
      passengers: parseInt(passengers) || 1,
      message: message || null,
      status: "pending",
    });
    if (dbError) console.error("Supabase error:", dbError);

    // 2. Push to GoHighLevel CRM
    pushToGHL({
      name,
      phone,
      email,
      destination: resolvedDestination,
      departureDate: resolvedDate,
      passengers: parseInt(passengers) || 1,
      message,
      packageName: pkg?.name,
      source: isOmra ? "omra" : "voyage",
    }).catch((e) => console.error("GHL push error:", e));

    // 3. Notify agency
    await resend.emails.send({
      from: "Sun Evasion <noreply@sunevasion.dz>",
      to: ["contact@sunevasion.dz"],
      replyTo: email || undefined,
      subject: `🌟 Nouvelle demande${isOmra ? " OMRA" : ""} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1C1C1C; color: #f0f4ff; padding: 30px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #C9943A; font-size: 24px;">☀️ Sun Evasion</h1>
            <p style="color: #888;">Nouvelle demande via le site web</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #C9943A; margin-top: 0;">👤 Client</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            ${email ? `<p><strong>Email :</strong> ${email}</p>` : ""}
          </div>
          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <h2 style="color: #C9943A; margin-top: 0;">✈️ Voyage demandé</h2>
            <p><strong>Séjour :</strong> ${pkg?.name || resolvedDestination || "Non spécifié"}</p>
            ${resolvedDate ? `<p><strong>Départ :</strong> ${resolvedDate}</p>` : ""}
            <p><strong>Voyageurs :</strong> ${passengers || 1}</p>
          </div>
          ${message ? `<div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;"><h2 style="color: #C9943A; margin-top: 0;">💬 Message</h2><p>${message}</p></div>` : ""}
          <div style="text-align: center; margin-top: 24px; display: flex; gap: 12px; justify-content: center;">
            <a href="https://wa.me/213770708326?text=Bonjour ${encodeURIComponent(name)}" style="background: #25d366; color: white; padding: 12px 20px; border-radius: 24px; text-decoration: none; font-weight: bold;">
              📱 WhatsApp 1
            </a>
            <a href="https://wa.me/213770760360?text=Bonjour ${encodeURIComponent(name)}" style="background: #25d366; color: white; padding: 12px 20px; border-radius: 24px; text-decoration: none; font-weight: bold;">
              📱 WhatsApp 2
            </a>
          </div>
          <p style="text-align:center; color:#555; font-size:11px; margin-top:16px;">Lead synchronisé dans GoHighLevel CRM ✓</p>
        </div>
      `,
    });

    // 4. Auto-reply to client
    if (email) {
      await resend.emails.send({
        from: "Sun Evasion <contact@sunevasion.dz>",
        to: [email],
        subject: "☀️ Votre demande a bien été reçue — Sun Evasion",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1C1C1C; color: #f0f4ff; padding: 30px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #C9943A;">☀️ Sun Evasion</h1>
            </div>
            <p>Bonjour <strong>${name}</strong>,</p>
            <p>Merci pour votre demande ! Notre équipe vous contactera dans les <strong>2 heures</strong>.</p>
            ${pkg ? `<div style="background: rgba(201,148,58,0.1); border: 1px solid rgba(201,148,58,0.3); border-radius: 8px; padding: 16px; margin: 16px 0;"><p style="color: #C9943A; font-weight: bold;">${pkg.name}</p><p>Durée : ${pkg.duration}</p></div>` : ""}
            <p>Contactez-nous directement :</p>
            <ul>
              <li>📱 WhatsApp : +213 770 70 83 26</li>
              <li>📱 WhatsApp : +213 770 76 03 60</li>
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
