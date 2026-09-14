import React from 'react';
import { ApplicationStatus, PriorityLevel } from '../types';

interface CarbonStatusTagProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md';
}

export const CarbonStatusTag: React.FC<CarbonStatusTagProps> = ({ status, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  switch (status) {
    case 'OFFER':
      return (
        <span
          className={`inline-flex items-center font-medium font-['IBM_Plex_Mono'] bg-[#defbe6] text-[#0e6027] border-l-2 border-[#24a148] tracking-wider ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 bg-[#24a148] mr-1.5 inline-block"></span>
          OFFER RECEIVED
        </span>
      );
    case 'INTERVIEW':
      return (
        <span
          className={`inline-flex items-center font-medium font-['IBM_Plex_Mono'] bg-[#fef3d6] text-[#7a4f00] border-l-2 border-[#b28600] tracking-wider ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 bg-[#b28600] mr-1.5 inline-block"></span>
          INTERVIEWING
        </span>
      );
    case 'SCREENING':
      return (
        <span
          className={`inline-flex items-center font-medium font-['IBM_Plex_Mono'] bg-[#f6f2ff] text-[#6929c4] border-l-2 border-[#8a3ffc] tracking-wider ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 bg-[#8a3ffc] mr-1.5 inline-block"></span>
          SCREENING
        </span>
      );
    case 'APPLIED':
      return (
        <span
          className={`inline-flex items-center font-medium font-['IBM_Plex_Mono'] bg-[#edf5ff] text-[#0043ce] border-l-2 border-[#0f62fe] tracking-wider ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 bg-[#0f62fe] mr-1.5 inline-block"></span>
          APPLIED
        </span>
      );
    case 'REJECTED':
      return (
        <span
          className={`inline-flex items-center font-medium font-['IBM_Plex_Mono'] bg-[#fff1f1] text-[#a2191f] border-l-2 border-[#da1e28] tracking-wider ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 bg-[#da1e28] mr-1.5 inline-block"></span>
          REJECTED
        </span>
      );
    case 'WITHDRAWN':
      return (
        <span
          className={`inline-flex items-center font-medium font-['IBM_Plex_Mono'] bg-[#f4f4f4] text-[#525252] border-l-2 border-[#8d8d8d] tracking-wider ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 bg-[#8d8d8d] mr-1.5 inline-block"></span>
          WITHDRAWN
        </span>
      );
    default:
      return null;
  }
};

interface CarbonPriorityTagProps {
  priority: PriorityLevel;
}

export const CarbonPriorityTag: React.FC<CarbonPriorityTagProps> = ({ priority }) => {
  switch (priority) {
    case 'HIGH':
      return (
        <span className="inline-flex items-center text-[11px] font-['IBM_Plex_Mono'] text-[#da1e28] font-medium">
          <span className="w-2 h-2 bg-[#da1e28] mr-1.5"></span>
          HIGH
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="inline-flex items-center text-[11px] font-['IBM_Plex_Mono'] text-[#8a6100] font-medium">
          <span className="w-2 h-2 bg-[#b28600] mr-1.5"></span>
          MED
        </span>
      );
    case 'LOW':
      return (
        <span className="inline-flex items-center text-[11px] font-['IBM_Plex_Mono'] text-[#525252] font-medium">
          <span className="w-2 h-2 bg-[#8d8d8d] mr-1.5"></span>
          LOW
        </span>
      );
    default:
      return null;
  }
};
