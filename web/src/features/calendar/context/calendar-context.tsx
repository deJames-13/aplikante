import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { CalendarEvent } from '../types';
import { calendarStorage } from '../storage/calendar-storage';
import { useToasts } from '../../../shared/context/toast-context';

interface CalendarContextValue {
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: CalendarEvent) => void;
}

const CalendarContext = createContext<CalendarContextValue | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() =>
    calendarStorage.load()
  );
  const { showToast } = useToasts();

  useEffect(() => {
    calendarStorage.save(calendarEvents);
  }, [calendarEvents]);

  const addCalendarEvent = useCallback(
    (event: CalendarEvent) => {
      setCalendarEvents((prev) => [event, ...prev]);
      showToast('success', 'Event Scheduled', `Booked ${event.type}: ${event.company} on ${event.date}`);
    },
    [showToast]
  );

  const value = useMemo(
    () => ({
      calendarEvents,
      addCalendarEvent,
    }),
    [calendarEvents, addCalendarEvent]
  );

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendarEvents(): CalendarContextValue {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarEvents must be used within a CalendarProvider');
  }
  return context;
}
