import { notFound } from "next/navigation";
import { DESTINATIONS, PACKAGES } from "@/lib/constants";
import DestinationDetail from "./DestinationDetail";

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: `Voyage ${dest.name} depuis Alger — Sun Evasion`,
    description: dest.description,
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) notFound();
  const packages = PACKAGES.filter((p) => p.destination === dest.id);
  return <DestinationDetail destination={dest} packages={packages} />;
}
