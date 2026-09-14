import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarHeaderBarProps {
  monthName: string;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onOpenNewEvent: () => void;
}

export const CalendarHeaderBar: React.FC<CalendarHeaderBarProps> = ({
  monthName,
  year,
  onPrevMonth,
  onNextMonth,
  onToday,
  onOpenNewEvent,
}) => {
  return (
    <div className="bg-white border border-[#e0e0e0] p-4 flex flex-wrap items-center justify-between gap-4">
      {/* Month Navigator */}
      <div className="flex items-center space-x-3">
        <h2 className="text-base font-semibold font-['IBM_Plex_Sans'] text-[#161616] tracking-tight">
          {monthName} {year}
        </h2>

        <div className="flex border border-[#8d8d8d] bg-white">
          <button
            type="button"
            onClick={onPrevMonth}
            className="p-1 hover:bg-[#f4f4f4] border-r border-[#8d8d8d] cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4 text-[#161616]" />
          </button>
          <button
            type="button"
            onClick={onToday}
            className="px-2.5 py-0.5 text-xs font-['IBM_Plex_Mono'] font-medium hover:bg-[#f4f4f4] border-r border-[#8d8d8d] cursor-pointer"
          >
            Today
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="p-1 hover:bg-[#f4f4f4] cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4 text-[#161616]" />
          </button>
        </div>
      </div>

      {/* Legend & Event Add */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-3 text-xs font-['IBM_Plex_Mono']">
          <span className="flex items-center text-[#0043ce]">
            <span className="w-2.5 h-2.5 bg-[#0f62fe] mr-1.5"></span>
            Interview
          </span>
          <span className="flex items-center text-[#a2191f]">
            <span className="w-2.5 h-2.5 bg-[#da1e28] mr-1.5"></span>
            Deadline
          </span>
          <span className="flex items-center text-[#7a4f00]">
            <span className="w-2.5 h-2.5 bg-[#b28600] mr-1.5"></span>
            Follow-Up
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onOpenNewEvent}
            className="h-8 px-3 bg-[#0f62fe] hover:bg-[#0043ce] text-white text-xs font-medium flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>
    </div>
  );
};
