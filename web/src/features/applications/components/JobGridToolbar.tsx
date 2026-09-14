import type React from 'react';
import { useState } from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';
import type { ApplicationStatus, TableDensity } from '../types';

interface JobGridToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: string | null;
  onStatusFilterChange: (st: string | null) => void;
  priorityFilter: string;
  onPriorityFilterChange: (p: string) => void;
  density: TableDensity;
  onDensityChange: (d: TableDensity) => void;
  totalApplicationsCount: number;
  statusCounts: Record<string, number>;
  onExportCSV: () => void;
  onOpenQuickTrack: () => void;
}

const STATUS_LIST: ApplicationStatus[] = [
  'APPLIED',
  'SCREENING',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
];

export const JobGridToolbar: React.FC<JobGridToolbarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  density,
  onDensityChange,
  totalApplicationsCount,
  statusCounts,
  onExportCSV,
  onOpenQuickTrack,
}) => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  return (
    <div className="p-3 bg-[#f4f4f4] border-b border-[#e0e0e0] flex flex-wrap items-center justify-between gap-3">
      {/* Left: Search input & Status Filter */}
      <div className="flex items-center space-x-2 flex-1 min-w-[240px] max-w-md">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-[#525252] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Filter table rows..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-8 pl-8 pr-7 bg-white border border-[#8d8d8d] text-xs text-[#161616] placeholder-[#8d8d8d] focus:border-[#0f62fe] focus:outline-none"
            aria-label="Filter applications data grid"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-2 text-xs text-[#8d8d8d] hover:text-[#161616]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Filter Pill Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            className={`h-8 px-2.5 border text-xs font-medium flex items-center space-x-1.5 transition-colors ${
              statusFilter
                ? 'bg-[#edf5ff] border-[#0f62fe] text-[#0f62fe]'
                : 'bg-white border-[#8d8d8d] text-[#161616] hover:bg-[#e0e0e0]'
            }`}
            aria-haspopup="true"
            aria-expanded={isFilterDropdownOpen}
          >
            <Filter className="w-3 h-3" />
            <span>{statusFilter ? `Status: ${statusFilter}` : 'Status: All'}</span>
          </button>

          {isFilterDropdownOpen && (
            <div className="absolute left-0 mt-1 w-44 bg-white border border-[#8d8d8d] shadow-md z-30 py-1">
              <button
                type="button"
                onClick={() => {
                  onStatusFilterChange(null);
                  setIsFilterDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#f4f4f4] ${
                  !statusFilter ? 'font-semibold text-[#0f62fe] bg-[#edf5ff]' : 'text-[#161616]'
                }`}
              >
                All Statuses ({totalApplicationsCount})
              </button>
              {STATUS_LIST.map((st) => {
                const count = statusCounts[st] || 0;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      onStatusFilterChange(st);
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#f4f4f4] flex items-center justify-between ${
                      statusFilter === st ? 'font-semibold text-[#0f62fe] bg-[#edf5ff]' : 'text-[#161616]'
                    }`}
                  >
                    <span>{st}</span>
                    <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#525252]">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right: Priority, Density, Export, Add Application */}
      <div className="flex items-center space-x-2">
        {/* Priority Filter */}
        <div className="hidden sm:flex items-center space-x-1 text-xs text-[#525252]">
          <span className="text-[11px]">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="h-8 px-2 bg-white border border-[#8d8d8d] text-xs text-[#161616] focus:border-[#0f62fe] focus:outline-none"
          >
            <option value="ALL">All</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Med</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        {/* Density Selector */}
        <div className="flex border border-[#8d8d8d] bg-white h-8" title="Row density">
          <button
            type="button"
            onClick={() => onDensityChange('compact')}
            className={`px-2 text-xs font-['IBM_Plex_Mono'] border-r border-[#8d8d8d] ${
              density === 'compact' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
            }`}
            title="Compact density (32px rows)"
          >
            S
          </button>
          <button
            type="button"
            onClick={() => onDensityChange('normal')}
            className={`px-2 text-xs font-['IBM_Plex_Mono'] border-r border-[#8d8d8d] ${
              density === 'normal' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
            }`}
            title="Normal density (48px rows)"
          >
            M
          </button>
          <button
            type="button"
            onClick={() => onDensityChange('tall')}
            className={`px-2 text-xs font-['IBM_Plex_Mono'] ${
              density === 'tall' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
            }`}
            title="Tall density (64px rows)"
          >
            L
          </button>
        </div>

        {/* Export CSV */}
        <button
          type="button"
          onClick={onExportCSV}
          className="h-8 px-2.5 bg-white border border-[#8d8d8d] hover:bg-[#e0e0e0] text-[#161616] text-xs font-medium flex items-center space-x-1"
          title="Export all filtered rows to CSV"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Export</span>
        </button>

        {/* Add Application Primary Button */}
        <button
          type="button"
          onClick={onOpenQuickTrack}
          className="h-8 px-3 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white text-xs font-medium flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Application</span>
        </button>
      </div>
    </div>
  );
};
