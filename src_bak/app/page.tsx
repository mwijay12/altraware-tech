import Navbar from "@/components/Navbar";
import PageReveal from "@/components/PageReveal";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import FeaturedWork from "@/components/FeaturedWork";
import Footer from "@/components/Footer";
import AboutPreview from "@/components/AboutPreview";
import PrimaryButton from "@/components/ui/PrimaryButton";
import OurServices from "@/components/OurServices";
import MarketingHero from "@/components/MarketingHero";
import LegacySection from "@/components/LegacySection";
import WhatsNew from "@/components/WhatsNew";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <main className="bg-[#EFEEEC]" data-barba="container" data-barba-namespace="home">
      <PageReveal />
      <Navbar />
      <div className="px-3">
        <Hero />
      </div>
      <LogoCloud />
      <AboutPreview />
      <div className="p-3">
        <FeaturedWork />
        <div className="flex justify-center items-center mt-6">
          <PrimaryButton lable="Explore Our Work" url="#" />
        </div>
      </div>
      <OurServices />
      <MarketingHero />
      <LegacySection />
      <WhatsNew />
      <div className="hidden lg:block">
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
