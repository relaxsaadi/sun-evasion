import Hero from "@/components/home/Hero";
import DestinationsPreview from "@/components/home/DestinationsPreview";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationsPreview />
      <FeaturedPackages />
      <WhyUs />
      <Testimonials />
      <CTABanner />
    </>
  );
}
