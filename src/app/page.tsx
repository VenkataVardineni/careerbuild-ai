import { BannerBar } from "@/components/BannerBar";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PlatformSection } from "@/components/PlatformSection";
import { ProcessSection } from "@/components/ProcessSection";
import { RevenueSection } from "@/components/RevenueSection";
import { TrainingsSection } from "@/components/TrainingsSection";
import { TwoWaysSection } from "@/components/TwoWaysSection";
import { WhyTeachSection } from "@/components/WhyTeachSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BannerBar />
        <RevenueSection />
        <TwoWaysSection />
        <WhyTeachSection />
        <PlatformSection />
        <ProcessSection />
        <TrainingsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
