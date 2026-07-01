import { MetadataRoute } from "next";
import { DESTINATIONS, PACKAGES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sun-evasion.vercel.app";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/destinations`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/voyages`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/a-propos`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const destinationPages = DESTINATIONS.map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified: new Date() })),
    ...destinationPages.map((p) => ({ ...p, lastModified: new Date() })),
  ];
}
