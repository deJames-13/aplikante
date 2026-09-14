import { createFileRoute } from '@tanstack/react-router';
import { CarbonCharts } from '../features/analytics';
import { JobDataGrid } from '../features/applications';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Visualizations Row: Funnel Chart, Velocity, Pipeline Health */}
      <section aria-label="Pipeline Analytics & Charts">
        <CarbonCharts />
      </section>

      {/* Enterprise Data Grid (Central Hub) */}
      <section aria-label="Applications Data Grid">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-sm font-semibold uppercase tracking-wider text-[#161616]">
              Active Job Applications Data Grid
            </h1>
            <p className="text-xs text-[#525252]">
              Full lifecycle tracking, sorting, bulk actions, and stages
            </p>
          </div>

          <div className="text-[11px] font-['IBM_Plex_Mono'] text-[#525252] hidden sm:block">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-[#8d8d8d] text-[#161616]">Q</kbd> to quick track • <kbd className="px-1.5 py-0.5 bg-white border border-[#8d8d8d] text-[#161616]">/</kbd> to search
          </div>
        </div>

        <JobDataGrid />
      </section>
    </div>
  );
}
