import type React from 'react';
import { useState } from 'react';
import { ArrowDown, Download, Trash2 } from 'lucide-react';
import type { ApplicationStatus } from '../types';
import { CarbonStatusTag } from './CarbonTag';

interface JobGridBulkActionsProps {
  selectedIds: string[];
  onClearSelection: () => void;
  onUpdateStatusBulk: (ids: string[], status: ApplicationStatus) => void;
  onDeleteApplications: (ids: string[]) => void;
  onExportCSV: () => void;
}

const STATUS_LIST: ApplicationStatus[] = [
  'APPLIED',
  'SCREENING',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
];

export const JobGridBulkActions: React.FC<JobGridBulkActionsProps> = ({
  selectedIds,
  onClearSelection,
  onUpdateStatusBulk,
  onDeleteApplications,
  onExportCSV,
}) => {
  const [isBulkStatusOpen, setIsBulkStatusOpen] = useState(false);

  return (
    <div className="bg-[#0f62fe] text-white px-4 h-12 flex items-center justify-between transition-all">
      <div className="flex items-center space-x-3">
        <span className="font-['IBM_Plex_Mono'] font-medium text-xs">
          {selectedIds.length} {selectedIds.length === 1 ? 'item' : 'items'} selected
        </span>
        <button
          type="button"
          onClick={onClearSelection}
          className="text-xs text-white/80 hover:text-white underline pl-2"
        >
          Cancel
        </button>
      </div>

      <div className="flex items-center space-x-1">
        {/* Change Status Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsBulkStatusOpen(!isBulkStatusOpen)}
            className="h-10 px-3 bg-[#0043ce] hover:bg-[#002d9c] text-white text-xs font-medium flex items-center space-x-1.5"
          >
            <span>Change Status</span>
            <ArrowDown className="w-3 h-3" />
          </button>

          {isBulkStatusOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-[#161616] text-white border border-[#393939] shadow-lg z-30 py-1">
              {STATUS_LIST.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    onUpdateStatusBulk(selectedIds, st);
                    setIsBulkStatusOpen(false);
                    onClearSelection();
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-[#262626] flex items-center space-x-2"
                >
                  <CarbonStatusTag status={st} size="sm" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Selected */}
        <button
          type="button"
          onClick={onExportCSV}
          className="h-10 px-3 bg-[#0043ce] hover:bg-[#002d9c] text-white text-xs font-medium flex items-center space-x-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Delete Selected */}
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Delete ${selectedIds.length} application(s)?`)) {
              onDeleteApplications(selectedIds);
              onClearSelection();
            }
          }}
          className="h-10 px-3 bg-[#da1e28] hover:bg-[#ba1b23] text-white text-xs font-medium flex items-center space-x-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
