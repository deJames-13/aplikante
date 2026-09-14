import type React from 'react';
import { Check } from 'lucide-react';
import type { TimelineStage } from '../types';

interface JobTimelineProps {
  stages?: TimelineStage[];
}

export const JobTimeline: React.FC<JobTimelineProps> = ({ stages }) => {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#525252] mb-2">
        Interview Progression Stages
      </h4>
      <div className="border border-[#e0e0e0] divide-y divide-[#e0e0e0] bg-white">
        {stages && stages.length > 0 ? (
          stages.map((st, i) => (
            <div key={i} className="p-3 flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-5 h-5 mt-0.5 flex items-center justify-center text-[10px] font-['IBM_Plex_Mono'] font-semibold ${
                    st.completedDate
                      ? 'bg-[#24a148] text-white'
                      : 'bg-[#f4f4f4] border border-[#8d8d8d] text-[#525252]'
                  }`}
                >
                  {st.completedDate ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <div>
                  <span className="font-semibold text-xs text-[#161616] block">{st.name}</span>
                  {st.notes && <p className="text-xs text-[#525252] mt-0.5">{st.notes}</p>}
                </div>
              </div>
              {st.completedDate ? (
                <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#24a148]">
                  Completed {st.completedDate}
                </span>
              ) : (
                <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#b28600]">In Progress</span>
              )}
            </div>
          ))
        ) : (
          <div className="p-3 text-xs text-[#8d8d8d]">No detailed stages recorded.</div>
        )}
      </div>
    </div>
  );
};
