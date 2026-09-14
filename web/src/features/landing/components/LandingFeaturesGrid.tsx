import type React from 'react';
import { Link } from '@tanstack/react-router';
import {
  Layers,
  Calendar as CalendarIcon,
  FileText,
  CheckCircle2,
  TrendingUp,
  Database,
  ArrowRight,
} from 'lucide-react';

interface FeatureCardProps {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  ctaText: string;
  badgeText: string;
  previewWidget: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  title,
  tagline,
  description,
  icon,
  route,
  ctaText,
  badgeText,
  previewWidget,
}) => {
  return (
    <article className="bg-[#161616] border border-[#262626] hover:border-[#393939] p-6 flex flex-col justify-between transition-colors group">
      <div className="space-y-4">
        {/* Header: Number + Badge */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#6f6f6f]">{number}</span>
          <span className="text-[10px] font-['IBM_Plex_Mono'] px-2 py-0.5 bg-[#222222] border border-[#333333] text-[#a8a8a8] uppercase">
            {badgeText}
          </span>
        </div>

        {/* Title + Icon */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-[#262626] text-white shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight font-['IBM_Plex_Sans']">
              {title}
            </h3>
            <p className="text-xs text-[#0f62fe] font-['IBM_Plex_Mono'] mt-0.5">{tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#a8a8a8] font-light leading-relaxed font-['IBM_Plex_Sans']">
          {description}
        </p>

        {/* Feature Visual Widget */}
        <div className="pt-2">{previewWidget}</div>
      </div>

      {/* Footer CTA Link */}
      <div className="pt-6 mt-4 border-t border-[#262626] flex items-center justify-between">
        <Link
          to={route}
          className="text-xs font-medium text-white group-hover:text-[#0f62fe] flex items-center space-x-1 font-['IBM_Plex_Mono'] uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-[#0f62fe]"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
        <span className="text-[10px] font-['IBM_Plex_Mono'] text-[#525252]">VSA SLICE</span>
      </div>
    </article>
  );
};

export const LandingFeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="w-full bg-[#121212] py-20 px-4 sm:px-6 border-b border-[#262626]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-['IBM_Plex_Mono'] text-[#0f62fe] uppercase tracking-wider">
            <span>[ SECTION 02 ]</span>
            <span>•</span>
            <span>CORE ARCHITECTURAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-['IBM_Plex_Sans']">
            Engineered for <span className="font-semibold text-white">high data density.</span>
          </h2>
          <p className="text-sm text-[#a8a8a8] font-light leading-relaxed">
            Every feature in Aplikante is built as an isolated vertical slice with strict single responsibility, zero-radius Carbon controls, and direct keyboard shortcuts.
          </p>
        </div>

        {/* 6-Card Modular Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Data Grid */}
          <FeatureCard
            number="[01]"
            title="Job Data Grid & Bulk Actions"
            tagline="Dense multi-density tabular engine"
            description="Manage dozens of concurrent submissions with compact/normal/tall density switches, multi-select batch status updates, and zero-latency instant filtering."
            icon={<Layers className="w-4 h-4 text-[#0f62fe]" />}
            route="/dashboard"
            ctaText="Open Data Grid"
            badgeText="Grid Engine"
            previewWidget={
              <div className="p-2.5 bg-[#0c0c0c] border border-[#262626] font-['IBM_Plex_Mono'] text-[11px] space-y-1">
                <div className="flex justify-between text-[#8d8d8d]">
                  <span>IBM Enterprise Cloud</span>
                  <span className="text-[#b28600]">INTERVIEW</span>
                </div>
                <div className="flex justify-between text-[#8d8d8d]">
                  <span>Datadog Platform UI</span>
                  <span className="text-[#24a148]">OFFER ($192K)</span>
                </div>
                <div className="flex justify-between text-[#8d8d8d]">
                  <span>Stripe Infra Engineer</span>
                  <span className="text-[#0f62fe]">TAKE-HOME</span>
                </div>
              </div>
            }
          />

          {/* Card 2: Interview Calendar */}
          <FeatureCard
            number="[02]"
            title="Interview Schedule Calendar"
            tagline="Live round telemetry & video links"
            description="Never miss a round. Track technical phone screens, take-home reviews, and virtual onsites with direct launch links for Zoom, Google Meet, and Webex."
            icon={<CalendarIcon className="w-4 h-4 text-[#b28600]" />}
            route="/calendar"
            ctaText="View Calendar"
            badgeText="Synchronized"
            previewWidget={
              <div className="p-2.5 bg-[#0c0c0c] border border-[#262626] font-['IBM_Plex_Mono'] text-[11px] space-y-1.5">
                <div className="flex items-center space-x-2 text-[#e0e0e0]">
                  <span className="w-1.5 h-1.5 bg-[#b28600]"></span>
                  <span>Sep 16 • 1:30 PM (IBM System Design)</span>
                </div>
                <div className="flex items-center space-x-2 text-[#a8a8a8] text-[10px]">
                  <span>Meet Link: webex.com/ibm-design</span>
                </div>
              </div>
            }
          />

          {/* Card 3: Tailored Resumes */}
          <FeatureCard
            number="[03]"
            title="Tailored Resumes & ATS Scoring"
            tagline="Role-specific PDF version control"
            description="Stop submitting one-size-fits-all resumes. Associate tailored PDFs with target industries, track ATS keyword compatibility scores, and monitor linked applications."
            icon={<FileText className="w-4 h-4 text-[#8a3ffc]" />}
            route="/resumes"
            ctaText="Manage Resumes"
            badgeText="ATS Matcher"
            previewWidget={
              <div className="p-2.5 bg-[#0c0c0c] border border-[#262626] font-['IBM_Plex_Mono'] text-[11px] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#e0e0e0]">Alex_Vance_Frontend_v3.1.pdf</span>
                  <span className="text-[#24a148] font-bold">98% ATS</span>
                </div>
                <div className="w-full bg-[#262626] h-1">
                  <div className="bg-[#24a148] h-1 w-[98%]"></div>
                </div>
              </div>
            }
          />

          {/* Card 4: Smart Reminders */}
          <FeatureCard
            number="[04]"
            title="Smart Actionable Reminders"
            tagline="Automated 7-day follow-up dispatcher"
            description="Logging a new application automatically schedules a 7-day follow-up reminder. Flag tasks as Critical, Warning, or Info, with 1-click snooze intervals."
            icon={<CheckCircle2 className="w-4 h-4 text-[#24a148]" />}
            route="/reminders"
            ctaText="Check Reminders"
            badgeText="Automated"
            previewWidget={
              <div className="p-2.5 bg-[#0c0c0c] border border-[#262626] font-['IBM_Plex_Mono'] text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-[#da1e28]">
                  <span>CRITICAL ALERT</span>
                  <span>Due in 24h</span>
                </div>
                <div className="text-[#c6c6c6] text-[10px]">
                  Follow up with Sarah Chen regarding System Design
                </div>
              </div>
            }
          />

          {/* Card 5: Pipeline Funnel */}
          <FeatureCard
            number="[05]"
            title="Pipeline Velocity & Funnel"
            tagline="Stage conversion & offer analytics"
            description="Quantify your job search velocity. Visualize conversion drop-offs from submission to recruiter screen, technical loop, and final written offer."
            icon={<TrendingUp className="w-4 h-4 text-[#0f62fe]" />}
            route="/dashboard"
            ctaText="Analyze Funnel"
            badgeText="Analytics"
            previewWidget={
              <div className="p-2.5 bg-[#0c0c0c] border border-[#262626] font-['IBM_Plex_Mono'] text-[11px] space-y-1">
                <div className="flex justify-between text-[#8d8d8d]">
                  <span>Funnel Throughput</span>
                  <span className="text-white">40% to Offer</span>
                </div>
                <div className="flex space-x-1 h-1.5">
                  <div className="bg-[#0f62fe] w-1/4"></div>
                  <div className="bg-[#8a3ffc] w-1/4"></div>
                  <div className="bg-[#b28600] w-1/4"></div>
                  <div className="bg-[#24a148] w-1/4"></div>
                </div>
              </div>
            }
          />

          {/* Card 6: Django REST API */}
          <FeatureCard
            number="[06]"
            title="Django REST API Inspector"
            tagline="Direct backend test bench & schemas"
            description="Explore live REST API endpoints, request schemas, curl test bench, and Python model definitions directly inside the browser interface."
            icon={<Database className="w-4 h-4 text-[#0043ce]" />}
            route="/django-api"
            ctaText="Inspect Endpoints"
            badgeText="REST v1.4"
            previewWidget={
              <div className="p-2.5 bg-[#0c0c0c] border border-[#262626] font-['IBM_Plex_Mono'] text-[11px] space-y-1 text-[#a8a8a8]">
                <div><span className="text-[#24a148]">GET</span> /api/v1/applications/</div>
                <div><span className="text-[#0f62fe]">POST</span> /api/v1/applications/</div>
                <div><span className="text-[#da1e28]">DELETE</span> /api/v1/applications/:id/</div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};
