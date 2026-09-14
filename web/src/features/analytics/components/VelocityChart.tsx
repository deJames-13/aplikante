import React from 'react';

export interface WeeklyVelocityItem {
  week: string;
  applied: number;
  interviewed: number;
}

interface VelocityChartProps {
  data: WeeklyVelocityItem[];
}

export const VelocityChart: React.FC<VelocityChartProps> = ({ data }) => {
  const maxWeekly = Math.max(...data.map((d) => d.applied + d.interviewed), 6);

  return (
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

          {data.map((d) => {
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
  );
};
