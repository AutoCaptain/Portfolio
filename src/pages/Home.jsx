import HeroSection from "../sections/HeroSection.jsx";
import SubmersedSection from "../sections/SubmersedSection.jsx";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <SubmersedSection heightVh={230} />
    </main>
  );
}
