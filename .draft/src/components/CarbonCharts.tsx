import React, { useState } from 'react';
import { TrendingUp, Award, Clock, ArrowRight } from 'lucide-react';
import { JobApplication } from '../types';

interface CarbonChartsProps {
  applications: JobApplication[];
  onFilterByStatus?: (status: string | null) => void;
  activeStatusFilter?: string | null;
}

export const CarbonCharts: React.FC<CarbonChartsProps> = ({
  applications,
  onFilterByStatus,
  activeStatusFilter,
}) => {
  const [hoveredFunnel, setHoveredFunnel] = useState<string | null>(null);

  // Compute metrics
  const total = applications.length;
  const appliedCount = applications.filter((a) => a.status === 'APPLIED').length;
  const screeningCount = applications.filter((a) => a.status === 'SCREENING').length;
  const interviewCount = applications.filter((a) => a.status === 'INTERVIEW').length;
  const offerCount = applications.filter((a) => a.status === 'OFFER').length;
  const rejectedCount = applications.filter((a) => a.status === 'REJECTED').length;
  const withdrawnCount = applications.filter((a) => a.status === 'WITHDRAWN').length;

  const activeInPipeline = screeningCount + interviewCount;
  const offerRate = total > 0 ? ((offerCount / total) * 100).toFixed(1) : '0';

  // Funnel Data stages
  const funnelStages = [
    {
      key: 'APPLIED',
      label: '1. Applied',
      count: total,
      color: '#0f62fe', // Carbon Blue 60
      subtext: `${total} submissions`,
      conversion: '100%',
    },
    {
      key: 'SCREENING',
      label: '2. Screening',
      count: screeningCount + interviewCount + offerCount,
      color: '#8a3ffc', // Carbon Purple 60
      subtext: `${screeningCount + interviewCount + offerCount} passed resume screening`,
      conversion: total > 0 ? `${Math.round(((screeningCount + interviewCount + offerCount) / total) * 100)}%` : '0%',
    },
    {
      key: 'INTERVIEW',
      label: '3. Technical & Loop',
      count: interviewCount + offerCount,
      color: '#b28600', // Carbon Yellow/Amber
      subtext: `${interviewCount + offerCount} advanced to rounds`,
      conversion: total > 0 ? `${Math.round(((interviewCount + offerCount) / total) * 100)}%` : '0%',
    },
    {
      key: 'OFFER',
      label: '4. Offer Received',
      count: offerCount,
      color: '#24a148', // Carbon Green 50
      subtext: `${offerCount} active written offers`,
      conversion: total > 0 ? `${Math.round((offerCount / total) * 100)}%` : '0%',
    },
  ];

  // Weekly velocity data (simulated based on applications dates)
  const weeklyData = [
    { week: 'W34 (Aug 17)', applied: 2, interviewed: 1 },
    { week: 'W35 (Aug 24)', applied: 1, interviewed: 1 },
    { week: 'W36 (Aug 31)', applied: 3, interviewed: 2 },
    { week: 'W37 (Sep 07)', applied: 4, interviewed: 3 },
  ];

  const maxWeekly = Math.max(...weeklyData.map((d) => d.applied + d.interviewed), 6);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#e0e0e0] border border-[#e0e0e0] mb-6">
      {/* Tile 1: Top KPI Summary */}
      <div className="lg:col-span-3 bg-white p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#525252]">
              PIPELINE HEALTH
            </span>
            <span className="text-[11px] font-['IBM_Plex_Mono'] bg-[#f4f4f4] px-1.5 py-0.5 text-[#161616] border border-[#e0e0e0]">
              Q3-2026
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="border-l-2 border-[#0f62fe] pl-2.5">
              <span className="text-[11px] text-[#525252] block">Total Logged</span>
              <span className="text-2xl font-semibold font-['IBM_Plex_Mono'] text-[#161616]">
                {total}
              </span>
            </div>
            <div className="border-l-2 border-[#b28600] pl-2.5">
              <span className="text-[11px] text-[#525252] block">In Active Loop</span>
              <span className="text-2xl font-semibold font-['IBM_Plex_Mono'] text-[#b28600]">
                {activeInPipeline}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#f4f4f4]">
            <div className="border-l-2 border-[#24a148] pl-2.5">
              <span className="text-[11px] text-[#525252] block">Offer Conversion</span>
              <span className="text-xl font-semibold font-['IBM_Plex_Mono'] text-[#24a148]">
                {offerRate}%
              </span>
            </div>
            <div className="border-l-2 border-[#8d8d8d] pl-2.5">
              <span className="text-[11px] text-[#525252] block">Avg Response</span>
              <span className="text-xl font-semibold font-['IBM_Plex_Mono'] text-[#161616]">
                4.2 <span className="text-xs font-normal text-[#525252]">days</span>
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-[#e0e0e0] flex items-center justify-between text-[11px] text-[#525252]">
          <span className="flex items-center">
            <TrendingUp className="w-3 h-3 text-[#24a148] mr-1" />
            +24% velocity vs Q2
          </span>
          <span className="font-['IBM_Plex_Mono'] text-[#8d8d8d]">{rejectedCount} rejected</span>
        </div>
      </div>

      {/* Tile 2: Carbon Funnel Chart (Applied -> Screening -> Interview -> Offer) */}
      <div className="lg:col-span-5 bg-white p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#161616]">
                APPLICATION FUNNEL
              </h3>
              <p className="text-[11px] text-[#525252]">
                Stage progression & step-through conversion rates
              </p>
            </div>
            {activeStatusFilter && (
              <button
                type="button"
                onClick={() => onFilterByStatus && onFilterByStatus(null)}
                className="text-[11px] text-[#0f62fe] hover:underline font-['IBM_Plex_Mono']"
              >
                Reset filter ({activeStatusFilter})
              </button>
            )}
          </div>

          <div className="space-y-2 mt-3">
            {funnelStages.map((stage, idx) => {
              const pctWidth = total > 0 ? Math.max((stage.count / total) * 100, 14) : 0;
              const isSelected = activeStatusFilter === stage.key;

              return (
                <div
                  key={stage.key}
                  onMouseEnter={() => setHoveredFunnel(stage.key)}
                  onMouseLeave={() => setHoveredFunnel(null)}
                  onClick={() => onFilterByStatus && onFilterByStatus(isSelected ? null : stage.key)}
                  className={`group cursor-pointer transition-all p-1 -mx-1 ${
                    isSelected ? 'bg-[#edf5ff] ring-1 ring-[#0f62fe]' : 'hover:bg-[#f4f4f4]'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Filter by ${stage.label}, ${stage.count} applications`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-[#161616] flex items-center">
                      <span
                        className="w-2.5 h-2.5 mr-2 inline-block"
                        style={{ backgroundColor: stage.color }}
                      ></span>
                      {stage.label}
                    </span>
                    <div className="flex items-center space-x-2 font-['IBM_Plex_Mono'] text-xs">
                      <span className="font-semibold text-[#161616]">{stage.count}</span>
                      <span className="text-[#8d8d8d] text-[11px]">({stage.conversion})</span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-3.5 bg-[#f4f4f4] relative overflow-hidden border border-[#e0e0e0]">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${pctWidth}%`,
                        backgroundColor: stage.color,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-[11px] text-[#6f6f6f] pt-2 border-t border-[#f4f4f4] flex items-center justify-between">
          <span>Click any stage bar to filter the data table below</span>
          <span className="font-['IBM_Plex_Mono'] text-[#0f62fe]">Carbon Data Chart</span>
        </div>
      </div>

      {/* Tile 3: Applications Velocity by Week */}
      <div className="lg:col-span-4 bg-white p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#161616]">
                APPLICATION VELOCITY
              </h3>
              <p className="text-[11px] text-[#525252]">Submissions & active rounds per week</p>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-['IBM_Plex_Mono']">
              <span className="flex items-center text-[#525252]">
                <span className="w-2 h-2 bg-[#0f62fe] mr-1"></span> Apps
              </span>
              <span className="flex items-center text-[#525252]">
                <span className="w-2 h-2 bg-[#b28600] mr-1"></span> Rounds
              </span>
            </div>
          </div>

          {/* Bar Chart Area */}
          <div className="h-32 pt-4 flex items-end justify-between border-b border-[#8d8d8d] px-2 relative">
            {/* Target line (5 / week) */}
            <div
              className="absolute left-0 right-0 border-b border-dashed border-[#da1e28]/60 flex items-center justify-end pr-1 pointer-events-none"
              style={{ bottom: `${(5 / maxWeekly) * 100}%` }}
            >
              <span className="text-[9px] font-['IBM_Plex_Mono'] text-[#da1e28] bg-white px-1">
                Target: 5
              </span>
            </div>

            {weeklyData.map((d, i) => {
              const appliedHeight = (d.applied / maxWeekly) * 100;
              const interviewHeight = (d.interviewed / maxWeekly) * 100;

              return (
                <div key={d.week} className="flex flex-col items-center flex-1 max-w-[56px] group">
                  <div className="w-full flex justify-center items-end space-x-1 h-24">
                    {/* Applied bar */}
                    <div
                      className="w-4 bg-[#0f62fe] group-hover:bg-[#0043ce] transition-colors relative"
                      style={{ height: `${appliedHeight}%` }}
                      title={`${d.week}: ${d.applied} applied`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-['IBM_Plex_Mono'] bg-[#161616] text-white px-1 z-10 whitespace-nowrap">
                        {d.applied}
                      </span>
                    </div>

                    {/* Interview bar */}
                    <div
                      className="w-4 bg-[#b28600] group-hover:bg-[#8a6100] transition-colors relative"
                      style={{ height: `${interviewHeight}%` }}
                      title={`${d.week}: ${d.interviewed} interviews`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-['IBM_Plex_Mono'] bg-[#161616] text-white px-1 z-10 whitespace-nowrap">
                        {d.interviewed}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-['IBM_Plex_Mono'] text-[#525252] mt-1.5 whitespace-nowrap">
                    {d.week.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 text-[11px] text-[#525252] flex items-center justify-between">
          <span>Pace: 3.5 submissions/wk</span>
          <span className="text-[#24a148] font-medium font-['IBM_Plex_Mono']">On track</span>
        </div>
      </div>
    </div>
  );
};
