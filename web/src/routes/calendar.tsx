import { createFileRoute } from '@tanstack/react-router';
import { CalendarView } from '../features/calendar';

export const Route = createFileRoute('/calendar')({
  component: CalendarPage,
});

function CalendarPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      <div>
        <h1 className="text-sm font-semibold uppercase tracking-wider text-[#161616]">
          Interview Schedule & Application Deadlines
        </h1>
        <p className="text-xs text-[#525252]">
          Synchronized with application milestones, interview panels, and video conference links
        </p>
      </div>

      <CalendarView />
    </div>
  );
}
