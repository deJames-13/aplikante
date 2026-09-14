import type React from 'react';
import { ToastProvider } from '../context/toast-context';
import { ResumesProvider } from '../../features/resumes';
import { RemindersProvider } from '../../features/reminders';
import { ApplicationsProvider } from '../../features/applications';
import { CalendarProvider } from '../../features/calendar';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ResumesProvider>
        <RemindersProvider>
          <ApplicationsProvider>
            <CalendarProvider>{children}</CalendarProvider>
          </ApplicationsProvider>
        </RemindersProvider>
      </ResumesProvider>
    </ToastProvider>
  );
}
