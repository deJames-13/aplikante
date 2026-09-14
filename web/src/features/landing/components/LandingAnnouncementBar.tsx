import type React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export const LandingAnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-[#0c0c0c] border-b border-[#262626] text-[#c6c6c6] text-xs py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2 truncate">
          <span className="inline-flex items-center px-1.5 py-0.2 bg-[#0f62fe] text-white text-[10px] font-medium font-['IBM_Plex_Mono'] uppercase tracking-wider">
            RELEASE 1.4
          </span>
          <span className="hidden sm:inline font-['IBM_Plex_Sans'] text-white">
            Migrating from spreadsheets or generic job boards?
          </span>
          <span className="text-[#8d8d8d] hidden md:inline">
            Aplikante tracks multi-stage loops, tailored resumes, and Django APIs with zero UI slop.
          </span>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-white hover:text-[#0f62fe] shrink-0 font-['IBM_Plex_Mono'] focus-visible:outline-2 focus-visible:outline-[#0f62fe]"
          aria-label="Launch Aplikante Dashboard"
        >
          <span>Open Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
