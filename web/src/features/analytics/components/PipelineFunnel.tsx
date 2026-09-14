import React from 'react';

export interface FunnelStageData {
  key: string;
  label: string;
  count: number;
  color: string;
  subtext: string;
  conversion: string;
}

interface PipelineFunnelProps {
  stages: FunnelStageData[];
  total: number;
  activeStatusFilter: string | null;
  onFilterByStatus: (status: string | null) => void;
}

export const PipelineFunnel: React.FC<PipelineFunnelProps> = ({
  stages,
  total,
  activeStatusFilter,
  onFilterByStatus,
}) => {
  return (
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
              onClick={() => onFilterByStatus(null)}
              className="text-[11px] text-[#0f62fe] hover:underline font-['IBM_Plex_Mono'] cursor-pointer"
            >
              Reset filter ({activeStatusFilter})
            </button>
          )}
        </div>

        <div className="space-y-2 mt-3">
          {stages.map((stage) => {
            const pctWidth = total > 0 ? Math.max((stage.count / total) * 100, 14) : 0;
            const isSelected = activeStatusFilter === stage.key;

            return (
              <div
                key={stage.key}
                onClick={() => onFilterByStatus(isSelected ? null : stage.key)}
                className={`group cursor-pointer transition-all p-1 -mx-1 ${
                  isSelected ? 'bg-[#edf5ff] ring-1 ring-[#0f62fe]' : 'hover:bg-[#f4f4f4]'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onFilterByStatus(isSelected ? null : stage.key);
                  }
                }}
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
  );
};
