import { NextRequest, NextResponse } from "next/server";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "apify~web-scraper";

export async function POST(req: NextRequest) {
  if (!APIFY_TOKEN) {
    return NextResponse.json(
      { error: "APIFY_TOKEN non configuré. Ajoutez-le dans les variables Vercel.", results: [] },
      { status: 400 }
    );
  }

  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ error: "URL requise", results: [] }, { status: 400 });
  }

  // Start the actor run
  const runRes = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/runs`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${APIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startUrls: [{ url }],
        maxRequestsPerCrawl: 15,
        pageFunction: `
          async function pageFunction(context) {
            const { $, request } = context;
            const results = [];
            // Extract offers/prices — common selectors
            const selectors = [
              { type: "package", sel: ".package, .voyage, .offre, .offer, .product, article" },
              { type: "price", sel: ".price, .prix, .tarif, .amount, [class*=price], [class*=prix]" },
            ];
            $("h2, h3").each(function() {
              const title = $(this).text().trim();
              if (title && title.length > 5 && title.length < 120) {
                const parent = $(this).closest("article, .card, .offre, .package, section").first();
                const price = parent.find("[class*=price],[class*=prix],[class*=tarif]").first().text().trim()
                  || parent.find("strong, b").filter((_, el) => /\\d/.test($(el).text())).first().text().trim();
                results.push({ title, price: price || null, url: request.url });
              }
            });
            return results.slice(0, 20);
          }
        `,
      }),
    }
  );

  if (!runRes.ok) {
    const err = await runRes.text();
    console.error("Apify run error:", err);
    return NextResponse.json({ error: "Échec du lancement Apify", results: [] }, { status: 500 });
  }

  const runData = await runRes.json();
  const runId = runData.data?.id;
  if (!runId) {
    return NextResponse.json({ error: "Run ID manquant", results: [] }, { status: 500 });
  }

  // Poll for completion (max ~45s — 9 × 5s)
  for (let i = 0; i < 9; i++) {
    await new Promise((r) => setTimeout(r, 5000));

    const statusRes = await fetch(
      `https://api.apify.com/v2/acts/${ACTOR_ID}/runs/${runId}`,
      { headers: { Authorization: `Bearer ${APIFY_TOKEN}` } }
    );
    const statusData = await statusRes.json();
    const status = statusData.data?.status;

    if (status === "SUCCEEDED") {
      const datasetId = statusData.data?.defaultDatasetId;
      const itemsRes = await fetch(
        `https://api.apify.com/v2/datasets/${datasetId}/items?limit=30`,
        { headers: { Authorization: `Bearer ${APIFY_TOKEN}` } }
      );
      const items = await itemsRes.json();
      const results = Array.isArray(items) ? items.flat().filter(Boolean) : [];
      return NextResponse.json({ results });
    }

    if (status === "FAILED" || status === "ABORTED") {
      return NextResponse.json({ error: "Run échoué", results: [] }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Timeout — le scraping a pris trop de temps", results: [] }, { status: 504 });
}
