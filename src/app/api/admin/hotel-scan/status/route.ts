import { NextRequest, NextResponse } from "next/server";

const APIFY_TOKEN = process.env.APIFY_TOKEN;

export async function GET(req: NextRequest) {
  if (!APIFY_TOKEN) {
    return NextResponse.json({ error: "APIFY_TOKEN manquant" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const runId = searchParams.get("runId");
  if (!runId) return NextResponse.json({ error: "runId requis" }, { status: 400 });

  try {
    // Check run status
    const statusRes = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
    );
    const statusData = await statusRes.json();
    const status = statusData?.data?.status as string;

    if (!["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"].includes(status)) {
      // Still running
      return NextResponse.json({ status, hotels: [] });
    }

    if (status !== "SUCCEEDED") {
      return NextResponse.json({ status, error: `Run ${status}`, hotels: [] });
    }

    // Fetch results
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
          priceLabel: (p.price as string) || (p.priceLevel as string) || null,
          neighborhood: (p.neighborhood as string) || (p.subTitle as string) || null,
        };
      })
      .filter((h) => h.name);

    return NextResponse.json({ status: "SUCCEEDED", hotels });
  } catch (e) {
    return NextResponse.json({ error: String(e), hotels: [] }, { status: 500 });
  }
}
