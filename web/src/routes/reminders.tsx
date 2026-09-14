import { createFileRoute } from '@tanstack/react-router';
import { RemindersView } from '../features/reminders';

export const Route = createFileRoute('/reminders')({
  component: RemindersPage,
});

function RemindersPage() {
  return (
    <div className="animate-in fade-in duration-150">
      <RemindersView />
    </div>
  );
}
