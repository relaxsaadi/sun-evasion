import { NextRequest, NextResponse } from "next/server";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
// compass/crawler-google-places — 1M+ runs, very reliable
const ACTOR_ID = "compass~crawler-google-places";

export async function POST(req: NextRequest) {
  if (!APIFY_TOKEN) {
    return NextResponse.json({ error: "APIFY_TOKEN manquant dans les variables d'environnement" }, { status: 400 });
  }

  const { query, city, country } = await req.json();
  if (!query) return NextResponse.json({ error: "Query requise" }, { status: 400 });

  const countryCode = country === "turquie" ? "TR" : country === "tunisie" ? "TN" : "DZ";
  const searchString = `${query} ${city}`;

  try {
    const runRes = await fetch(
      `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchStringsArray: [searchString],
          maxCrawledPlacesPerSearch: 15,
          language: "fr",
          countryCode,
          includeHistogram: false,
          includeOpeningHours: false,
          includePeopleAlsoSearch: false,
        }),
      }
    );

    if (!runRes.ok) {
      const err = await runRes.text();
      return NextResponse.json({ error: `Apify error: ${err}` }, { status: 500 });
    }

    const run = await runRes.json();
    const runId = run?.data?.id;
    const datasetId = run?.data?.defaultDatasetId;

    if (!runId) {
      return NextResponse.json({ error: "Impossible de démarrer le scan" }, { status: 500 });
    }

    // Return immediately — frontend polls /status?runId=xxx
    return NextResponse.json({ runId, datasetId, status: "RUNNING" });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
