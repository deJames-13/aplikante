import type React from 'react';
import { LandingAnnouncementBar } from './LandingAnnouncementBar';
import { LandingHero } from './LandingHero';
import { LandingMetricsMarquee } from './LandingMetricsMarquee';
import { LandingFeaturesGrid } from './LandingFeaturesGrid';
import { LandingInteractivePreview } from './LandingInteractivePreview';
import { LandingAboutSection } from './LandingAboutSection';
import { LandingContactSection } from './LandingContactSection';

export const LandingView: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-[#121212] text-[#f4f4f4] select-none">
      {/* 1. Announcement Banner */}
      <LandingAnnouncementBar />

      {/* 2. Hero Section with Render Squary Grid */}
      <LandingHero />

      {/* 3. Tech Stack & Ecosystems Marquee */}
      <LandingMetricsMarquee />

      {/* 4. Core Features Grid */}
      <LandingFeaturesGrid />

      {/* 5. Interactive Data Grid Preview Console */}
      <LandingInteractivePreview />

      {/* 6. Philosophy & About Us */}
      <LandingAboutSection />

      {/* 7. Contact & Dispatch Form */}
      <LandingContactSection />
    </div>
  );
};
