import { motion, useReducedMotion } from "framer-motion";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuBadgeCheck,
  LuBellRing,
  LuMapPin,
  LuNavigation,
  LuRoute,
  LuShieldCheck,
} from "react-icons/lu";
import CommunitySection from "../components/sections/CommunitySection";
import CoreFeaturesSection from "../components/sections/CoreFeaturesSection";
import HeroSection from "../components/hero/HeroSection";
import MapPreviewSection from "../components/sections/MapPreviewSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import StatsSection from "../components/sections/StatsSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import NewHeroSection from "@/components/hero/NewHeroSection";
import ScrollFrameSection from "../components/sections/ScrollFrameSection";

function Reveal({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <Navbar />
      <main>
        {/* <HeroSection /> */}
        <NewHeroSection/>
        <ScrollFrameSection />
        <StatsSection />
        <HowItWorksSection />
        <CoreFeaturesSection />
        <MapPreviewSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
