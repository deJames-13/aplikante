import type React from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronRight, Database, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import { RenderSquaryGrid } from './RenderSquaryGrid';

export const LandingHero: React.FC = () => {
  return (
    <section className="relative w-full bg-[#121212] border-b border-[#262626] py-16 sm:py-24 overflow-hidden">
      {/* Background subtle grid pattern (Render squary aesthetic) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1c1c1c_1px,transparent_1px),linear-gradient(to_bottom,#1c1c1c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Typography & Actions (Render-style) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-[#1c1c1c] border border-[#393939] text-xs font-['IBM_Plex_Mono'] text-[#c6c6c6]">
              <span className="w-2 h-2 bg-[#0f62fe]"></span>
              <span>ENTERPRISE CAREER INFRASTRUCTURE</span>
              <span className="text-[#6f6f6f]">•</span>
              <span className="text-[#a8a8a8]">CARBON v11 SYSTEM</span>
            </div>

            {/* Giant Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-[1.08] font-['IBM_Plex_Sans']">
                Your fastest path <br />
                <span className="font-semibold text-white">to offer letters.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#a8a8a8] font-light max-w-2xl leading-relaxed font-['IBM_Plex_Sans'] pt-2">
                The high-density career pipeline for senior engineers, architects, and technical leaders. Manage applications, tailored resumes, and multi-round loops with IBM Carbon engineering precision.
              </p>
            </div>

            {/* Action Buttons (Zero Radius) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/dashboard"
                className="px-6 py-3.5 bg-white hover:bg-[#e0e0e0] active:bg-[#c6c6c6] text-[#161616] text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 font-['IBM_Plex_Mono'] transition-colors focus-visible:outline-2 focus-visible:outline-[#0f62fe]"
              >
                <span>Launch Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/django-api"
                className="px-6 py-3.5 bg-[#262626] hover:bg-[#333333] active:bg-[#161616] text-white border border-[#525252] hover:border-[#8d8d8d] text-xs font-medium uppercase tracking-wider flex items-center space-x-2 font-['IBM_Plex_Mono'] transition-colors focus-visible:outline-2 focus-visible:outline-[#0f62fe]"
              >
                <Database className="w-4 h-4 text-[#8a3ffc]" />
                <span>Django REST API</span>
              </Link>

              <a
                href="#features"
                className="px-5 py-3.5 text-xs text-[#a8a8a8] hover:text-white font-['IBM_Plex_Mono'] uppercase tracking-wider transition-colors flex items-center space-x-1 focus-visible:outline-2 focus-visible:outline-[#0f62fe]"
              >
                <span>Architecture Tour</span>
                <span>↓</span>
              </a>
            </div>

            {/* Micro Indicators Ticker */}
            <div className="pt-6 border-t border-[#262626] grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] font-['IBM_Plex_Mono'] text-[#8d8d8d]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#24a148]" />
                <span>Zero-Radius Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-[#0f62fe]" />
                <span>Keyboard Nav (Q, /)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-[#8a3ffc]" />
                <span>TanStack Start SSR</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-3.5 h-3.5 text-[#b28600]" />
                <span>Django 6 Backend</span>
              </div>
            </div>
          </div>

          {/* Right Column: Render Squary Grid (The Modular Matrix) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <RenderSquaryGrid />
          </div>
        </div>
      </div>
    </section>
  );
};
