'use client';

import HeroSection from "@/components/HeroSection";
import BannerSection from "@/components/BannerSection";
import WhyNursingSection from "@/components/WhyNursingSection";
import ProgramsSection from "@/components/ProgramsSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <BannerSection />
      <WhyNursingSection />
      <ProgramsSection />
      {/* Add other components or sections as needed */}
    </>
  );
}