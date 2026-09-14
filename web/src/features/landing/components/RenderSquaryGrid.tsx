import type React from 'react';
import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Calendar,
  Layers
} from 'lucide-react';

interface GridSquare {
  id: string;
  type?: 'status' | 'interview' | 'metric' | 'ats' | 'offer' | 'empty';
  label?: string;
  value?: string;
  subtext?: string;
  accent?: string;
  icon?: React.ReactNode;
}

export const RenderSquaryGrid: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const cells: GridSquare[] = [
    {
      id: 'c1',
      type: 'status',
      label: 'PIPELINE HEALTH',
      value: '94% Velocity',
      subtext: '4 Active Rounds',
      accent: '#24a148',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#24a148]" />,
    },
    {
      id: 'c2',
      type: 'ats',
      label: 'ATS COMPATIBILITY',
      value: '98% Match',
      subtext: 'Frontend Architect v3.1',
      accent: '#0f62fe',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#0f62fe]" />,
    },
    { id: 'c3', type: 'empty' },
    {
      id: 'c4',
      type: 'interview',
      label: 'NEXT UPCOMING LOOP',
      value: 'IBM Cloud System Design',
      subtext: 'Wednesday • 1:30 PM EST',
      accent: '#b28600',
      icon: <Calendar className="w-3.5 h-3.5 text-[#b28600]" />,
    },
    {
      id: 'c5',
      type: 'offer',
      label: 'WRITTEN OFFER EXTENDED',
      value: '$192,000 Base',
      subtext: 'Datadog • RSU vesting',
      accent: '#24a148',
      icon: <TrendingUp className="w-3.5 h-3.5 text-[#24a148]" />,
    },
    { id: 'c6', type: 'empty' },
    { id: 'c7', type: 'empty' },
    {
      id: 'c8',
      type: 'metric',
      label: '7-DAY FOLLOW-UP',
      value: '2 Alerts Due',
      subtext: 'Red Hat & Stripe',
      accent: '#da1e28',
      icon: <Clock className="w-3.5 h-3.5 text-[#da1e28]" />,
    },
    { id: 'c9', type: 'empty' },
    {
      id: 'c10',
      type: 'status',
      label: 'DJANGO REST SERVICE',
      value: 'API v1.4 Online',
      subtext: 'Schema synchronizing',
      accent: '#8a3ffc',
      icon: <Layers className="w-3.5 h-3.5 text-[#8a3ffc]" />,
    },
    { id: 'c11', type: 'empty' },
    { id: 'c12', type: 'empty' },
  ];

  return (
    <div className="relative w-full max-w-lg lg:max-w-none select-none">
      {/* Background subtle glow effect (Render style) */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#0f62fe]/10 blur-3xl pointer-events-none"></div>

      {/* Modular Squary Grid */}
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#262626] border border-[#393939] shadow-2xl"
        role="region"
        aria-label="Interactive Pipeline Telemetry Grid"
      >
        {cells.map((cell, idx) => {
          const isHovered = hoveredCell === cell.id;

          if (cell.type === 'empty') {
            return (
              <div
                key={cell.id}
                onMouseEnter={() => setHoveredCell(cell.id)}
                onMouseLeave={() => setHoveredCell(null)}
                className={`aspect-square p-3 bg-[#161616] flex flex-col justify-between transition-colors duration-150 ${
                  isHovered ? 'bg-[#222222]' : 'hover:bg-[#1c1c1c]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-['IBM_Plex_Mono'] text-[#525252]">
                  <span>[{Math.floor(idx / 3)}, {idx % 3}]</span>
                  <span className="w-1.5 h-1.5 bg-[#333333]"></span>
                </div>
                <div className="w-full flex justify-center items-center py-4">
                  <div className="w-6 h-6 border border-[#2a2a2a] border-dashed"></div>
                </div>
                <div className="text-[9px] font-['IBM_Plex_Mono'] text-[#393939] tracking-widest uppercase">
                  SLOT EMPTY
                </div>
              </div>
            );
          }

          return (
            <div
              key={cell.id}
              onMouseEnter={() => setHoveredCell(cell.id)}
              onMouseLeave={() => setHoveredCell(null)}
              className={`aspect-square p-3.5 bg-[#161616] flex flex-col justify-between transition-all duration-150 relative cursor-default ${
                isHovered
                  ? 'bg-[#222222] ring-1 ring-[#0f62fe]'
                  : 'hover:bg-[#1a1a1a]'
              }`}
            >
              {/* Top Row: Icon + Label */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  {cell.icon}
                  <span className="text-[9px] font-['IBM_Plex_Mono'] uppercase tracking-wider text-[#a8a8a8]">
                    {cell.label}
                  </span>
                </div>
                <span
                  className="w-1.5 h-1.5"
                  style={{ backgroundColor: cell.accent || '#0f62fe' }}
                ></span>
              </div>

              {/* Middle: Value */}
              <div className="my-auto py-1">
                <span className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug block font-['IBM_Plex_Sans']">
                  {cell.value}
                </span>
              </div>

              {/* Bottom: Subtext */}
              <div className="flex items-center justify-between pt-1 border-t border-[#262626] text-[10px] font-['IBM_Plex_Mono'] text-[#8d8d8d]">
                <span className="truncate">{cell.subtext}</span>
                <span className="text-[#525252] text-[9px]">ACTIVE</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative Grid Frame Footnote */}
      <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-['IBM_Plex_Mono'] text-[#6f6f6f]">
        <span>GRID: TELEMETRY 3x4 MATRIX</span>
        <span>CARBON v11 ZERO-RADIUS COMPLIANT</span>
      </div>
    </div>
  );
};
