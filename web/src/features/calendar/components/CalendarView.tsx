import type React from 'react';
import { useState } from 'react';
import type { CalendarEvent } from '../types';
import { useCalendarEvents } from '../context/calendar-context';
import { useApplications } from '../../applications/context/applications-context';
import { useResumes } from '../../resumes/context/resumes-context';
import { CalendarHeaderBar } from './CalendarHeaderBar';
import { CalendarMonthGrid } from './CalendarMonthGrid';
import { CalendarEventModal } from './CalendarEventModal';
import { AddCalendarEventModal } from './AddCalendarEventModal';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const CalendarView: React.FC = () => {
  const { calendarEvents, addCalendarEvent } = useCalendarEvents();
  const { applications, viewApplication } = useApplications();
  const { resumes } = useResumes();

  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // September (0-indexed)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(8);
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header Bar */}
      <CalendarHeaderBar
        monthName={MONTH_NAMES[currentMonth]}
        year={currentYear}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onOpenNewEvent={() => setIsNewEventModalOpen(true)}
      />

      {/* Calendar Month Grid */}
      <CalendarMonthGrid
        currentYear={currentYear}
        currentMonth={currentMonth}
        events={calendarEvents}
        onSelectEvent={setSelectedEvent}
      />

      {/* Event Details Modal */}
      <CalendarEventModal
        event={selectedEvent}
        applications={applications}
        resumes={resumes}
        onClose={() => setSelectedEvent(null)}
        onSelectApplication={viewApplication}
      />

      {/* New Event Modal */}
      <AddCalendarEventModal
        isOpen={isNewEventModalOpen}
        applications={applications}
        onClose={() => setIsNewEventModalOpen(false)}
        onSave={addCalendarEvent}
      />
    </div>
  );
};
