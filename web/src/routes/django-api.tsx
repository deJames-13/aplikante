import { createFileRoute } from '@tanstack/react-router';
import { DjangoApiInspector } from '../features/django-api';

export const Route = createFileRoute('/django-api')({
  component: DjangoApiPage,
});

function DjangoApiPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      <DjangoApiInspector />
    </div>
  );
}
