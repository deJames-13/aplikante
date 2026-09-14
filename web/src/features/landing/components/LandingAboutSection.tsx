import type React from 'react';
import { Terminal, Shield, Code, Server } from 'lucide-react';

export const LandingAboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full bg-[#121212] py-20 px-4 sm:px-6 border-b border-[#262626]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-['IBM_Plex_Mono'] text-[#0f62fe] uppercase tracking-wider">
            <span>[ SECTION 04 ]</span>
            <span>•</span>
            <span>ABOUT US & DESIGN PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-['IBM_Plex_Sans']">
            Built by engineers <span className="font-semibold text-white">for engineers.</span>
          </h2>
          <p className="text-sm text-[#a8a8a8] font-light leading-relaxed font-['IBM_Plex_Sans']">
            Aplikante was created out of frustration with spreadsheets and bloated, rounded-corner consumer job boards that waste screen real estate and obscure critical follow-up deadlines.
          </p>
        </div>

        {/* 4 Pillars Grid (Carbon Zero-Radius Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#262626] border border-[#262626]">
          {/* Pillar 1 */}
          <div className="p-6 bg-[#161616] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <Terminal className="w-5 h-5 text-[#0f62fe]" />
              <h3 className="text-sm font-semibold text-white font-['IBM_Plex_Sans']">
                Anti-Slop Quality Gate
              </h3>
              <p className="text-xs text-[#a8a8a8] font-light leading-relaxed">
                Zero purple/cyan AI glow spam. Zero ungrounded glassmorphism. Every view adheres strictly to IBM Carbon v11 tokens and tactile engineering minimalism.
              </p>
            </div>
            <div className="pt-4 border-t border-[#262626] text-[10px] font-['IBM_Plex_Mono'] text-[#6f6f6f]">
              RULE: 0px BORDER-RADIUS
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-[#161616] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <Shield className="w-5 h-5 text-[#24a148]" />
              <h3 className="text-sm font-semibold text-white font-['IBM_Plex_Sans']">
                Accessibility Baseline
              </h3>
              <p className="text-xs text-[#a8a8a8] font-light leading-relaxed">
                WCAG 2.1 AA compliant text contrast (&ge; 4.5:1), visible 2px focus indicators, semantic landmarks, and full keyboard traversability without touching a mouse.
              </p>
            </div>
            <div className="pt-4 border-t border-[#262626] text-[10px] font-['IBM_Plex_Mono'] text-[#6f6f6f]">
              STANDARD: WCAG 2.1 AA
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-[#161616] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <Code className="w-5 h-5 text-[#8a3ffc]" />
              <h3 className="text-sm font-semibold text-white font-['IBM_Plex_Sans']">
                Vertical Slice Architecture
              </h3>
              <p className="text-xs text-[#a8a8a8] font-light leading-relaxed">
                Adhering to Deep Module principles: small public seams (<code className="text-[#c6c6c6]">index.ts</code>) hide extensive domain storage, state, and serialization complexity.
              </p>
            </div>
            <div className="pt-4 border-t border-[#262626] text-[10px] font-['IBM_Plex_Mono'] text-[#6f6f6f]">
              PATTERN: VSA DEEP MODULES
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-[#161616] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <Server className="w-5 h-5 text-[#b28600]" />
              <h3 className="text-sm font-semibold text-white font-['IBM_Plex_Sans']">
                Django REST Integration
              </h3>
              <p className="text-xs text-[#a8a8a8] font-light leading-relaxed">
                Paired with a high-throughput Django 6 REST backend supporting relational SQLite & PostgreSQL persistence, Celery scheduled alerts, and JSON schema verification.
              </p>
            </div>
            <div className="pt-4 border-t border-[#262626] text-[10px] font-['IBM_Plex_Mono'] text-[#6f6f6f]">
              BACKEND: DJANGO 6.1 + DRF
            </div>
          </div>
        </div>

        {/* Big Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-light text-white font-['IBM_Plex_Mono']">0px</span>
            <p className="text-xs text-[#8d8d8d] font-['IBM_Plex_Sans']">Pure Zero-Radius Elements</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-light text-white font-['IBM_Plex_Mono']">60fps</span>
            <p className="text-xs text-[#8d8d8d] font-['IBM_Plex_Sans']">Data Grid Scroll Rendering</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-light text-white font-['IBM_Plex_Mono']">7-Day</span>
            <p className="text-xs text-[#8d8d8d] font-['IBM_Plex_Sans']">Automated Follow-Up Cadence</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-light text-white font-['IBM_Plex_Mono']">100%</span>
            <p className="text-xs text-[#8d8d8d] font-['IBM_Plex_Sans']">Open Source MIT License</p>
          </div>
        </div>
      </div>
    </section>
  );
};
