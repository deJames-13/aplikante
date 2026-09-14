import { createFileRoute } from '@tanstack/react-router';
import { ResumeManager } from '../features/resumes';

export const Route = createFileRoute('/resumes')({
  component: ResumesPage,
});

function ResumesPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      <div>
        <h1 className="text-sm font-semibold uppercase tracking-wider text-[#161616]">
          Tailored Resume Management
        </h1>
        <p className="text-xs text-[#525252]">
          Drag-and-drop version repository, target industry tagging, and ATS keyword scoring
        </p>
      </div>

      <ResumeManager />
    </div>
  );
}
