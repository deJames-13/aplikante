import type React from 'react';
import { useMemo } from 'react';
import { useApplications } from '../../applications';
import { PipelineHealthCard } from './PipelineHealthCard';
import { PipelineFunnel, type FunnelStageData } from './PipelineFunnel';
import { VelocityChart, type WeeklyVelocityItem } from './VelocityChart';

export const CarbonCharts: React.FC = () => {
  const { applications, statusFilter, setStatusFilter } = useApplications();

  const total = applications.length;
  const screeningCount = applications.filter((a) => a.status === 'SCREENING').length;
  const interviewCount = applications.filter((a) => a.status === 'INTERVIEW').length;
  const offerCount = applications.filter((a) => a.status === 'OFFER').length;
  const rejectedCount = applications.filter((a) => a.status === 'REJECTED').length;

  const activeInPipeline = screeningCount + interviewCount;
  const offerRate = total > 0 ? ((offerCount / total) * 100).toFixed(1) : '0';

  // Funnel Data stages
  const funnelStages: FunnelStageData[] = useMemo(
    () => [
      {
        key: 'APPLIED',
        label: '1. Applied',
        count: total,
        color: '#0f62fe', // Carbon Blue 60
        subtext: `${total} submissions`,
        conversion: '100%',
      },
      {
        key: 'SCREENING',
        label: '2. Screening',
        count: screeningCount + interviewCount + offerCount,
        color: '#8a3ffc', // Carbon Purple 60
        subtext: `${screeningCount + interviewCount + offerCount} passed resume screening`,
        conversion:
          total > 0
            ? `${Math.round(((screeningCount + interviewCount + offerCount) / total) * 100)}%`
            : '0%',
      },
      {
        key: 'INTERVIEW',
        label: '3. Technical & Loop',
        count: interviewCount + offerCount,
        color: '#b28600', // Carbon Yellow/Amber
        subtext: `${interviewCount + offerCount} advanced to rounds`,
        conversion:
          total > 0
            ? `${Math.round(((interviewCount + offerCount) / total) * 100)}%`
            : '0%',
      },
      {
        key: 'OFFER',
        label: '4. Offer Received',
        count: offerCount,
        color: '#24a148', // Carbon Green 50
        subtext: `${offerCount} active written offers`,
        conversion: total > 0 ? `${Math.round((offerCount / total) * 100)}%` : '0%',
      },
    ],
    [total, screeningCount, interviewCount, offerCount]
  );

  const weeklyData: WeeklyVelocityItem[] = useMemo(
    () => [
      { week: 'W34 (Aug 17)', applied: 2, interviewed: 1 },
      { week: 'W35 (Aug 24)', applied: 1, interviewed: 1 },
      { week: 'W36 (Aug 31)', applied: 3, interviewed: 2 },
      { week: 'W37 (Sep 07)', applied: 4, interviewed: 3 },
    ],
    []
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#e0e0e0] border border-[#e0e0e0] mb-6">
      <PipelineHealthCard
        total={total}
        activeInPipeline={activeInPipeline}
        offerRate={offerRate}
        rejectedCount={rejectedCount}
      />
      <PipelineFunnel
        stages={funnelStages}
        total={total}
        activeStatusFilter={statusFilter}
        onFilterByStatus={setStatusFilter}
      />
      <VelocityChart data={weeklyData} />
    </div>
  );
};
