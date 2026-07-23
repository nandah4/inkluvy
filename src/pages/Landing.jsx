import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JourneyHero from "../components/landing/JourneyHero";
import CityJourneyPreview from "../components/landing/CityJourneyPreview";
import ImpactStats from "../components/landing/ImpactStats";
import JourneySteps from "../components/landing/JourneySteps";
import ProductFeatures from "../components/landing/ProductFeatures";
import AccessibleMapPreview from "../components/landing/AccessibleMapPreview";
import CommunityVoices from "../components/landing/CommunityVoices";
import VerifiedPartners from "../components/landing/VerifiedPartners";
import PlanRouteCta from "../components/landing/PlanRouteCta";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <Navbar />
      <main>
        <JourneyHero />
        <CityJourneyPreview />
        <ImpactStats />
        <JourneySteps />
        <ProductFeatures />
        <AccessibleMapPreview />
        <CommunityVoices />
        {/* <VerifiedPartners /> */}
        <PlanRouteCta />
      </main>
      <Footer />
    </div>
  );
}
