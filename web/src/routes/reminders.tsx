import { createFileRoute } from '@tanstack/react-router';
import { RemindersView } from '../features/reminders';

export const Route = createFileRoute('/reminders')({
  component: RemindersPage,
});

function RemindersPage() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-150">
      <RemindersView />
    </div>
  );
}
