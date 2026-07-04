import { NextRequest, NextResponse } from "next/server";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "vortex_data~google-maps";

export async function POST(req: NextRequest) {
  if (!APIFY_TOKEN) return NextResponse.json({ error: "APIFY_TOKEN manquant" }, { status: 400 });

  const { query, city, country } = await req.json();
  if (!query) return NextResponse.json({ error: "Query requise" }, { status: 400 });

  const countryCode = country === "turquie" ? "TR" : country === "tunisie" ? "TN" : "DZ";

  try {
    const runRes = await fetch(
      `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchStringsArray: [`${query} ${city}`],
          maxCrawledPlacesPerSearch: 15,
          language: "fr",
          countryCode,
        }),
      }
    );
    const run = await runRes.json();
    const runId = run?.data?.id;
    if (!runId) return NextResponse.json({ error: "Échec démarrage scan" }, { status: 500 });

    // Poll up to 60s
    for (let i = 0; i < 12; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      const s = await (await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`)).json();
      if (["SUCCEEDED", "FAILED", "ABORTED"].includes(s?.data?.status)) break;
    }

    const dataRes = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}&limit=15`
    );
    const items = await dataRes.json();

    const hotels = (Array.isArray(items) ? items : [])
      .map((p: Record<string, unknown>) => {
        const imgs = p.images as { imageUrl?: string }[] | undefined;
        const imageUrl =
          (p.imageUrl as string) ||
          (imgs && imgs[0]?.imageUrl) ||
          null;
        const priceLevel = p.priceLevel as string | undefined;
        const price = p.price as string | undefined;
        return {
          name: p.title || p.name,
          address: p.address,
          phone: p.phone,
          website: p.website,
          rating: p.totalScore,
          reviewCount: p.reviewsCount,
          category: p.categoryName,
          googleUrl: p.url,
          imageUrl,
          priceLabel: price || priceLevel || null,
          neighborhood: p.neighborhood || p.subTitle || null,
          openingHours: p.openingHours || null,
        };
      })
      .filter((h) => h.name);

    return NextResponse.json({ hotels, runId });
  } catch {
    return NextResponse.json({ error: "Erreur lors du scan" }, { status: 500 });
  }
}
