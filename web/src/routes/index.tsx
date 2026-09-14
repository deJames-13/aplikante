import { createFileRoute } from '@tanstack/react-router';
import { LandingView } from '../features/landing';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="w-full flex-1 flex flex-col animate-in fade-in duration-150">
      <LandingView />
    </div>
  );
}
