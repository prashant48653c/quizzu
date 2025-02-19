import HeroSection from "@/components/client/homepage/HeroSection";
import Features from "@/components/client/homepage/FeaturesSection";
import LearningJourney from "@/components/client/homepage/LearningJourney";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <HeroSection />
      <Features />
      <LearningJourney />
    </main>
  );
}
