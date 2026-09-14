import React from 'react';
import { TrendingUp } from 'lucide-react';

interface PipelineHealthCardProps {
  total: number;
  activeInPipeline: number;
  offerRate: string;
  rejectedCount: number;
}

export const PipelineHealthCard: React.FC<PipelineHealthCardProps> = ({
  total,
  activeInPipeline,
  offerRate,
  rejectedCount,
}) => {
  return (
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
  );
};
