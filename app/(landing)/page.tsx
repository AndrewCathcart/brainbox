import LandingContent from "@/components/landing-page/landing-content";
import LandingHero from "@/components/landing-page/landing-hero";
import LandingNavbar from "@/components/landing-page/landing-navbar";

export default function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
