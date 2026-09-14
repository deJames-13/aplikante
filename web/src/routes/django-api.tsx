import { createFileRoute } from '@tanstack/react-router';
import { DjangoApiInspector } from '../features/django-api';

export const Route = createFileRoute('/django-api')({
  component: DjangoApiPage,
});

function DjangoApiPage() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-4 animate-in fade-in duration-150">
      <DjangoApiInspector />
    </div>
  );
}
