import { Header } from "./Header";
import { HeroSection } from "./HeroSection";

export function Home() {
  return (
    <div className="bg-gray-100 font-sans text-gray-800">
      <Header />
      <HeroSection />
    </div>
  );
}
