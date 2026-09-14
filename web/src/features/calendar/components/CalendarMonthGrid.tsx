import type React from 'react';
import type { CalendarEvent } from '../types';

interface CalendarMonthGridProps {
  currentYear: number;
  currentMonth: number;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const CalendarMonthGrid: React.FC<CalendarMonthGridProps> = ({
  currentYear,
  currentMonth,
  events,
  onSelectEvent,
}) => {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startingOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const getEventsForDate = (dateStr: string) => {
    return events.filter((e) => e.date === dateStr);
  };

  const getEventBadgeStyle = (type: 'INTERVIEW' | 'DEADLINE' | 'FOLLOW_UP') => {
    switch (type) {
      case 'INTERVIEW':
        return 'bg-[#edf5ff] text-[#0043ce] border-l-2 border-[#0f62fe] hover:bg-[#d0e2ff]';
      case 'DEADLINE':
        return 'bg-[#fff1f1] text-[#a2191f] border-l-2 border-[#da1e28] hover:bg-[#ffd7d9]';
      case 'FOLLOW_UP':
        return 'bg-[#fef3d6] text-[#7a4f00] border-l-2 border-[#b28600] hover:bg-[#fddc9b]';
    }
  };

  return (
    <div className="bg-white border border-[#e0e0e0]">
      {/* Weekday Header */}
      <div className="grid grid-cols-7 border-b border-[#8d8d8d] bg-[#f4f4f4] text-[11px] font-semibold text-[#161616] text-center">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="py-2 border-r last:border-r-0 border-[#e0e0e0] font-['IBM_Plex_Mono']">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Matrix */}
      <div className="grid grid-cols-7 auto-rows-[110px] sm:auto-rows-[125px] divide-x divide-y divide-[#e0e0e0]">
        {/* Previous Month trailing days */}
        {Array.from({ length: startingOffset }).map((_, idx) => {
          const dayNum = daysInPrevMonth - startingOffset + idx + 1;
          return (
            <div key={`prev-${dayNum}`} className="p-1.5 bg-[#fafafa] text-[#8d8d8d] select-none">
              <span className="text-[11px] font-['IBM_Plex_Mono']">{dayNum}</span>
            </div>
          );
        })}

        {/* Current Month days */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
            dayNum
          ).padStart(2, '0')}`;
          const dayEvents = getEventsForDate(dateStr);
          const isToday = dateStr === '2026-09-14';

          return (
            <div
              key={`day-${dayNum}`}
              className={`p-1.5 flex flex-col justify-between transition-colors overflow-hidden ${
                isToday ? 'bg-[#edf5ff]/40 ring-1 ring-[#0f62fe] inset-0 z-10' : 'bg-white hover:bg-[#fafafa]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[11px] font-['IBM_Plex_Mono'] font-medium px-1 ${
                    isToday ? 'bg-[#0f62fe] text-white font-bold' : 'text-[#161616]'
                  }`}
                >
                  {dayNum}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-[9px] font-['IBM_Plex_Mono'] text-[#525252]">
                    {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                  </span>
                )}
              </div>

              {/* Day Event Chips */}
              <div className="space-y-1 overflow-y-auto flex-1 max-h-[85px] pr-0.5">
                {dayEvents.map((evt) => (
                  <button
                    key={evt.id}
                    type="button"
                    onClick={() => onSelectEvent(evt)}
                    className={`w-full text-left p-1 text-[10px] font-medium leading-tight block truncate transition-colors cursor-pointer ${getEventBadgeStyle(
                      evt.type
                    )}`}
                    title={`${evt.time}: ${evt.company} - ${evt.title}`}
                  >
                    <span className="font-semibold">{evt.company}:</span> {evt.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
