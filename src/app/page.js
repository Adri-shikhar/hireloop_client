import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeroSection />
      <StatsSection />
    </main>
  );
}
