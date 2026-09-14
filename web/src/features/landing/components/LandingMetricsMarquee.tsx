import type React from 'react';

const ECOSYSTEMS = [
  'IBM Cloud',
  'Stripe',
  'Datadog',
  'Red Hat',
  'Bloomberg LP',
  'Palantir',
  'GitLab',
  'Anthropic',
  'Vercel',
  'Atlassian',
];

export const LandingMetricsMarquee: React.FC = () => {
  return (
    <div className="w-full bg-[#161616] border-b border-[#262626] py-6 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between text-[11px] font-['IBM_Plex_Mono'] uppercase tracking-wider text-[#6f6f6f]">
          <span>TARGET RECRUITMENT ECOSYSTEMS</span>
          <span>ENTERPRISE BENCHMARKING</span>
        </div>

        {/* Company Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {ECOSYSTEMS.map((company) => (
            <div
              key={company}
              className="px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#282828] border border-[#333333] text-xs font-['IBM_Plex_Sans'] text-[#c6c6c6] transition-colors cursor-default"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
