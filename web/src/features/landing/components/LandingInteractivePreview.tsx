import type React from 'react';
import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { Search, ArrowRight, ExternalLink } from 'lucide-react';
import { CarbonStatusTag } from '../../applications';
import type { ApplicationStatus } from '../../applications';

interface PreviewAppItem {
  id: string;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  nextStep: string;
  salary: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

const PREVIEW_APPLICATIONS: PreviewAppItem[] = [
  {
    id: 'p1',
    company: 'Datadog',
    role: 'Senior UI Platform Engineer',
    location: 'New York, NY (Hybrid)',
    status: 'OFFER',
    nextStep: 'Written offer letter under review',
    salary: '$185k - $205k',
    priority: 'HIGH',
  },
  {
    id: 'p2',
    company: 'IBM Enterprise Cloud',
    role: 'Staff Frontend Engineer (Carbon UI)',
    location: 'Austin, TX (Hybrid)',
    status: 'INTERVIEW',
    nextStep: 'System Design Interview with Architect',
    salary: '$175k - $195k',
    priority: 'HIGH',
  },
  {
    id: 'p3',
    company: 'Stripe',
    role: 'Full Stack Infrastructure Engineer',
    location: 'San Francisco, CA (Remote)',
    status: 'INTERVIEW',
    nextStep: 'Take-home webhook review & debrief',
    salary: '$190k - $215k',
    priority: 'HIGH',
  },
  {
    id: 'p4',
    company: 'Red Hat',
    role: 'Principal Software Engineer (Django)',
    location: 'Raleigh, NC (Remote)',
    status: 'SCREENING',
    nextStep: 'Technical phone screen with Lead',
    salary: '$165k - $185k',
    priority: 'MEDIUM',
  },
  {
    id: 'p5',
    company: 'Bloomberg LP',
    role: 'Senior Software Engineer (Terminal UI)',
    location: 'New York, NY (Hybrid)',
    status: 'INTERVIEW',
    nextStep: 'Virtual Onsite Loop: C++/Canvas bridge',
    salary: '$180k - $210k',
    priority: 'HIGH',
  },
  {
    id: 'p6',
    company: 'GitLab',
    role: 'Senior Frontend Engineer - Compliance',
    location: 'Remote (Global)',
    status: 'APPLIED',
    nextStep: 'Awaiting review of async questionnaire',
    salary: '$160k - $180k',
    priority: 'MEDIUM',
  },
];

export const LandingInteractivePreview: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    return PREVIEW_APPLICATIONS.filter((app) => {
      const matchesFilter = filter === 'ALL' || app.status === filter;
      const matchesQuery =
        !query ||
        app.company.toLowerCase().includes(query.toLowerCase()) ||
        app.role.toLowerCase().includes(query.toLowerCase()) ||
        app.location.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section className="w-full bg-[#161616] py-20 px-4 sm:px-6 border-b border-[#262626]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-['IBM_Plex_Mono'] text-[#0f62fe] uppercase tracking-wider">
              [ SECTION 03 ] • LIVE INTERACTIVE PREVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight font-['IBM_Plex_Sans']">
              Test drive the <span className="font-semibold text-white">command center.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#a8a8a8] font-light max-w-xl">
              Filter by status or type search terms below to experience the zero-radius data grid in real time.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white text-xs font-medium uppercase tracking-wider font-['IBM_Plex_Mono'] transition-colors focus-visible:outline-2 focus-visible:outline-[#0f62fe] self-start md:self-auto"
          >
            <span>Launch Full Data Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Live Mock Interactive Terminal Window */}
        <div className="bg-[#0c0c0c] border border-[#393939] shadow-2xl">
          {/* Mock Window Titlebar (Carbon Style) */}
          <div className="bg-[#1f1f1f] px-4 py-2.5 border-b border-[#333333] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#24a148]"></span>
              <span className="font-semibold text-white font-['IBM_Plex_Sans']">APLIKANTE DATA GRID</span>
              <span className="text-[#6f6f6f]">•</span>
              <span className="font-['IBM_Plex_Mono'] text-[#a8a8a8] text-[11px]">
                {filteredItems.length} records matching criteria
              </span>
            </div>

            {/* Quick Status Filter Tabs */}
            <div className="flex space-x-1 border border-[#393939] bg-[#161616] p-0.5 text-[11px] font-['IBM_Plex_Mono']">
              {['ALL', 'OFFER', 'INTERVIEW', 'SCREENING', 'APPLIED'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilter(st)}
                  className={`px-2 py-0.5 transition-colors cursor-pointer ${
                    filter === st
                      ? 'bg-[#0f62fe] text-white font-medium'
                      : 'text-[#8d8d8d] hover:text-white hover:bg-[#262626]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="p-3 bg-[#161616] border-b border-[#262626]">
            <div className="relative flex items-center max-w-md">
              <Search className="absolute left-3 w-3.5 h-3.5 text-[#6f6f6f]" />
              <input
                type="text"
                placeholder="Filter preview by company, role, or location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-8 pl-9 pr-3 bg-[#222222] border border-[#393939] text-xs text-white placeholder-[#6f6f6f] focus:border-[#0f62fe] focus:outline-none font-['IBM_Plex_Sans']"
                aria-label="Filter interactive preview"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 text-xs text-[#8d8d8d] hover:text-white px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-['IBM_Plex_Sans']">
              <thead>
                <tr className="bg-[#1f1f1f] text-[#a8a8a8] border-b border-[#333333] text-[11px] font-['IBM_Plex_Mono'] uppercase tracking-wider">
                  <th className="py-2.5 px-4 font-normal">Company & Role</th>
                  <th className="py-2.5 px-4 font-normal">Status</th>
                  <th className="py-2.5 px-4 font-normal hidden sm:table-cell">Next Milestone</th>
                  <th className="py-2.5 px-4 font-normal hidden md:table-cell">Compensation</th>
                  <th className="py-2.5 px-4 font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222]">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#6f6f6f] font-['IBM_Plex_Mono']">
                      No applications match &quot;{query}&quot; in stage &quot;{filter}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#1f1f1f] transition-colors group"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-white group-hover:text-[#0f62fe] transition-colors">
                          {item.company}
                        </div>
                        <div className="text-[11px] text-[#8d8d8d]">{item.role}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <CarbonStatusTag status={item.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-xs text-[#c6c6c6] hidden sm:table-cell">
                        {item.nextStep}
                      </td>
                      <td className="py-3 px-4 text-[11px] font-['IBM_Plex_Mono'] text-[#a8a8a8] hidden md:table-cell whitespace-nowrap">
                        {item.salary}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          to="/dashboard"
                          className="inline-flex items-center space-x-1 text-[11px] text-[#0f62fe] hover:underline font-['IBM_Plex_Mono']"
                        >
                          <span>Manage</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Banner */}
          <div className="p-3 bg-[#1a1a1a] border-t border-[#262626] flex items-center justify-between text-[11px] font-['IBM_Plex_Mono'] text-[#8d8d8d]">
            <span>PRESS &apos;Q&apos; TO QUICK-TRACK ANYWHERE</span>
            <Link
              to="/dashboard"
              className="text-white hover:text-[#0f62fe] font-medium flex items-center space-x-1"
            >
              <span>Access Full 10+ Pipeline Dashboard →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
