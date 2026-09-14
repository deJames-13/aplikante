import { createStorageAdapter, type StorageAdapter } from '../../../shared/lib/storage';
import type { CalendarEvent } from '../types';
import { INITIAL_CALENDAR_EVENTS } from '../data/mock-calendar-events';

const CALENDAR_STORAGE_KEY = 'aplikante_events_v1';

export const calendarStorage: StorageAdapter<CalendarEvent[]> = createStorageAdapter<CalendarEvent[]>(
  CALENDAR_STORAGE_KEY,
  INITIAL_CALENDAR_EVENTS
);
