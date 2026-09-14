import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Download, 
  Trash2, 
  Plus, 
  ExternalLink, 
  FileText, 
  MoreVertical, 
  Calendar,
  CheckSquare,
  Square,
  Building,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3
} from 'lucide-react';
import { 
  JobApplication, 
  ApplicationStatus, 
  PriorityLevel, 
  TableDensity,
  ResumeDocument 
} from '../types';
import { CarbonStatusTag, CarbonPriorityTag } from './CarbonTag';

interface JobDataGridProps {
  applications: JobApplication[];
  resumes: ResumeDocument[];
  onOpenQuickTrack: () => void;
  onEditApplication: (app: JobApplication) => void;
  onViewApplication: (app: JobApplication) => void;
  onDeleteApplications: (ids: string[]) => void;
  onUpdateStatusBulk: (ids: string[], newStatus: ApplicationStatus) => void;
  statusFilter: string | null;
  onStatusFilterChange: (status: string | null) => void;
}

type SortField = 'company' | 'role' | 'dateApplied' | 'status' | 'salaryRange' | 'priority';

export const JobDataGrid: React.FC<JobDataGridProps> = ({
  applications,
  resumes,
  onOpenQuickTrack,
  onEditApplication,
  onViewApplication,
  onDeleteApplications,
  onUpdateStatusBulk,
  statusFilter,
  onStatusFilterChange,
}) => {
  // Local state for table management
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [density, setDensity] = useState<TableDensity>('normal');
  const [sortField, setSortField] = useState<SortField>('dateApplied');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isBulkStatusOpen, setIsBulkStatusOpen] = useState(false);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  // Filter logic
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Search matching company, role, next step, location
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        app.company.toLowerCase().includes(query) ||
        app.role.toLowerCase().includes(query) ||
        app.nextStep.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query);

      // Status filter
      const matchesStatus = !statusFilter || statusFilter === 'ALL' || app.status === statusFilter;

      // Priority filter
      const matchesPriority = priorityFilter === 'ALL' || app.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [applications, searchQuery, statusFilter, priorityFilter]);

  // Sorting logic
  const sortedApplications = useMemo(() => {
    return [...filteredApplications].sort((a, b) => {
      let valA: string | number = a[sortField];
      let valB: string | number = b[sortField];

      if (sortField === 'priority') {
        const priorityWeight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        valA = priorityWeight[a.priority] || 0;
        valB = priorityWeight[b.priority] || 0;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredApplications, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedApplications.length / rowsPerPage) || 1;
  const paginatedApplications = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedApplications.slice(start, start + rowsPerPage);
  }, [sortedApplications, currentPage, rowsPerPage]);

  // Selection handlers
  const allCurrentSelected =
    paginatedApplications.length > 0 &&
    paginatedApplications.every((app) => selectedIds.includes(app.id));

  const handleSelectAll = () => {
    if (allCurrentSelected) {
      const pageIds = paginatedApplications.map((app) => app.id);
      setSelectedIds(selectedIds.filter((id) => !pageIds.includes(id)));
    } else {
      const newSelected = [...selectedIds];
      paginatedApplications.forEach((app) => {
        if (!newSelected.includes(app.id)) newSelected.push(app.id);
      });
      setSelectedIds(newSelected);
    }
  };

  const handleToggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Export CSV functionality
  const handleExportCSV = () => {
    const headers = ['ID', 'Company', 'Role', 'Status', 'Date Applied', 'Location', 'Salary Range', 'Next Step', 'Job URL'];
    const rows = (selectedIds.length > 0
      ? applications.filter((app) => selectedIds.includes(app.id))
      : applications
    ).map((app) => [
      app.id,
      `"${app.company.replace(/"/g, '""')}"`,
      `"${app.role.replace(/"/g, '""')}"`,
      app.status,
      app.dateApplied,
      `"${app.location.replace(/"/g, '""')}"`,
      `"${app.salaryRange.replace(/"/g, '""')}"`,
      `"${app.nextStep.replace(/"/g, '""')}"`,
      app.jobUrl,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aplikante_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Density row padding classes (Standard IBM Carbon Table Row heights: 32px / 48px / 64px)
  const rowHeightClass = {
    compact: 'py-1.5 text-xs',
    normal: 'py-3 text-xs',
    tall: 'py-4 text-sm',
  }[density];

  const resumeMap = useMemo(() => {
    const map = new Map<string, ResumeDocument>();
    resumes.forEach((r) => map.set(r.id, r));
    return map;
  }, [resumes]);

  return (
    <div className="bg-white border border-[#e0e0e0] relative select-none">
      {/* Carbon Data Table Toolbar */}
      {selectedIds.length > 0 ? (
        /* Batch Action Toolbar (Replaces normal toolbar when rows are selected) */
        <div className="bg-[#0f62fe] text-white px-4 h-12 flex items-center justify-between transition-all">
          <div className="flex items-center space-x-3">
            <span className="font-['IBM_Plex_Mono'] font-medium text-xs">
              {selectedIds.length} {selectedIds.length === 1 ? 'item' : 'items'} selected
            </span>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
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
                  {(['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'] as ApplicationStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          onUpdateStatusBulk(selectedIds, st);
                          setIsBulkStatusOpen(false);
                          setSelectedIds([]);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-[#262626] flex items-center space-x-2"
                      >
                        <CarbonStatusTag status={st} size="sm" />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Export Selected */}
            <button
              type="button"
              onClick={handleExportCSV}
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
                  setSelectedIds([]);
                }
              }}
              className="h-10 px-3 bg-[#da1e28] hover:bg-[#ba1b23] text-white text-xs font-medium flex items-center space-x-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ) : (
        /* Normal Carbon Table Toolbar */
        <div className="p-3 bg-[#f4f4f4] border-b border-[#e0e0e0] flex flex-wrap items-center justify-between gap-3">
          {/* Left: Search input */}
          <div className="flex items-center space-x-2 flex-1 min-w-[240px] max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-[#525252] absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter table rows..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-8 pl-8 pr-7 bg-white border border-[#8d8d8d] text-xs text-[#161616] placeholder-[#8d8d8d] focus:border-[#0f62fe] focus:outline-none"
                aria-label="Filter applications data grid"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
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
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#f4f4f4] ${
                      !statusFilter ? 'font-semibold text-[#0f62fe] bg-[#edf5ff]' : 'text-[#161616]'
                    }`}
                  >
                    All Statuses ({applications.length})
                  </button>
                  {(['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'] as ApplicationStatus[]).map(
                    (st) => {
                      const count = applications.filter((a) => a.status === st).length;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            onStatusFilterChange(st);
                            setIsFilterDropdownOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#f4f4f4] flex items-center justify-between ${
                            statusFilter === st ? 'font-semibold text-[#0f62fe] bg-[#edf5ff]' : 'text-[#161616]'
                          }`}
                        >
                          <span>{st}</span>
                          <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#525252]">{count}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions, Density, Export, Add Application */}
          <div className="flex items-center space-x-2">
            {/* Priority Filter */}
            <div className="hidden sm:flex items-center space-x-1 text-xs text-[#525252]">
              <span className="text-[11px]">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setCurrentPage(1);
                }}
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
                onClick={() => setDensity('compact')}
                className={`px-2 text-xs font-['IBM_Plex_Mono'] border-r border-[#8d8d8d] ${
                  density === 'compact' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
                }`}
                title="Compact density (32px rows)"
              >
                S
              </button>
              <button
                type="button"
                onClick={() => setDensity('normal')}
                className={`px-2 text-xs font-['IBM_Plex_Mono'] border-r border-[#8d8d8d] ${
                  density === 'normal' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
                }`}
                title="Normal density (48px rows)"
              >
                M
              </button>
              <button
                type="button"
                onClick={() => setDensity('tall')}
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
              onClick={handleExportCSV}
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
      )}

      {/* Main Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" role="grid" aria-label="Job Applications Table">
          <thead>
            <tr className="bg-[#f4f4f4] border-b border-[#8d8d8d] text-[11px] font-semibold text-[#161616] tracking-wider uppercase">
              {/* Checkbox column */}
              <th className="w-10 px-3 py-2 text-center">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="flex items-center justify-center text-[#161616] hover:text-[#0f62fe]"
                  aria-label="Select all rows"
                >
                  {allCurrentSelected ? (
                    <CheckSquare className="w-4 h-4 text-[#0f62fe]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#8d8d8d]" />
                  )}
                </button>
              </th>

              {/* Company */}
              <th className="px-3 py-2 cursor-pointer hover:bg-[#e0e0e0]" onClick={() => handleSort('company')}>
                <div className="flex items-center space-x-1">
                  <span>Company</span>
                  {sortField === 'company' ? (
                    sortOrder === 'asc' ? <ArrowUp className="w-3 h-3 text-[#0f62fe]" /> : <ArrowDown className="w-3 h-3 text-[#0f62fe]" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-[#8d8d8d]" />
                  )}
                </div>
              </th>

              {/* Role & Location */}
              <th className="px-3 py-2 cursor-pointer hover:bg-[#e0e0e0]" onClick={() => handleSort('role')}>
                <div className="flex items-center space-x-1">
                  <span>Role & Workplace</span>
                  {sortField === 'role' ? (
                    sortOrder === 'asc' ? <ArrowUp className="w-3 h-3 text-[#0f62fe]" /> : <ArrowDown className="w-3 h-3 text-[#0f62fe]" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-[#8d8d8d]" />
                  )}
                </div>
              </th>

              {/* Status */}
              <th className="px-3 py-2 cursor-pointer hover:bg-[#e0e0e0]" onClick={() => handleSort('status')}>
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {sortField === 'status' ? (
                    sortOrder === 'asc' ? <ArrowUp className="w-3 h-3 text-[#0f62fe]" /> : <ArrowDown className="w-3 h-3 text-[#0f62fe]" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-[#8d8d8d]" />
                  )}
                </div>
              </th>

              {/* Date Applied */}
              <th className="px-3 py-2 cursor-pointer hover:bg-[#e0e0e0]" onClick={() => handleSort('dateApplied')}>
                <div className="flex items-center space-x-1">
                  <span>Applied</span>
                  {sortField === 'dateApplied' ? (
                    sortOrder === 'asc' ? <ArrowUp className="w-3 h-3 text-[#0f62fe]" /> : <ArrowDown className="w-3 h-3 text-[#0f62fe]" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-[#8d8d8d]" />
                  )}
                </div>
              </th>

              {/* Next Steps */}
              <th className="px-3 py-2 min-w-[200px]">Next Steps</th>

              {/* Priority */}
              <th className="px-3 py-2 cursor-pointer hover:bg-[#e0e0e0]" onClick={() => handleSort('priority')}>
                <div className="flex items-center space-x-1">
                  <span>Priority</span>
                  {sortField === 'priority' ? (
                    sortOrder === 'asc' ? <ArrowUp className="w-3 h-3 text-[#0f62fe]" /> : <ArrowDown className="w-3 h-3 text-[#0f62fe]" />
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-[#8d8d8d]" />
                  )}
                </div>
              </th>

              {/* Tailored Resume */}
              <th className="px-3 py-2 hidden lg:table-cell">Resume</th>

              {/* Actions */}
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e0e0e0]">
            {paginatedApplications.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-[#525252]">
                  <p className="text-sm font-medium">No job applications match your filters</p>
                  <p className="text-xs text-[#8d8d8d] mt-1">Try clearing your search query or reset the status filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      onStatusFilterChange(null);
                      setPriorityFilter('ALL');
                    }}
                    className="mt-3 text-xs text-[#0f62fe] underline font-medium"
                  >
                    Reset all filters
                  </button>
                </td>
              </tr>
            ) : (
              paginatedApplications.map((app) => {
                const isSelected = selectedIds.includes(app.id);
                const linkedResume = resumeMap.get(app.resumeId);

                return (
                  <tr
                    key={app.id}
                    className={`transition-colors group hover:bg-[#edf5ff]/60 ${
                      isSelected ? 'bg-[#edf5ff]' : 'bg-white'
                    }`}
                  >
                    {/* Row checkbox */}
                    <td className={`px-3 ${rowHeightClass} text-center`}>
                      <button
                        type="button"
                        onClick={() => handleToggleSelectRow(app.id)}
                        className="flex items-center justify-center text-[#161616] hover:text-[#0f62fe]"
                        aria-label={`Select row for ${app.company}`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#0f62fe]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#8d8d8d] group-hover:text-[#161616]" />
                        )}
                      </button>
                    </td>

                    {/* Company */}
                    <td className={`px-3 ${rowHeightClass} font-semibold text-[#161616]`}>
                      <div className="flex items-center space-x-2">
                        <span
                          className="hover:text-[#0f62fe] cursor-pointer hover:underline"
                          onClick={() => onViewApplication(app)}
                        >
                          {app.company}
                        </span>
                        {app.jobUrl && (
                          <a
                            href={app.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8d8d8d] hover:text-[#0f62fe] opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Open external job posting"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <span className="text-[11px] font-normal text-[#525252] block font-['IBM_Plex_Mono']">
                        {app.salaryRange}
                      </span>
                    </td>

                    {/* Role & Workplace */}
                    <td className={`px-3 ${rowHeightClass}`}>
                      <div className="text-[#161616] font-medium">{app.role}</div>
                      <div className="text-[11px] text-[#525252] flex items-center space-x-2 mt-0.5">
                        <span>{app.location}</span>
                        <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase px-1 bg-[#f4f4f4] border border-[#e0e0e0]">
                          {app.jobType}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className={`px-3 ${rowHeightClass}`}>
                      <CarbonStatusTag status={app.status} size={density === 'compact' ? 'sm' : 'md'} />
                    </td>

                    {/* Date Applied */}
                    <td className={`px-3 ${rowHeightClass} font-['IBM_Plex_Mono'] text-xs text-[#525252]`}>
                      {app.dateApplied}
                    </td>

                    {/* Next Steps */}
                    <td className={`px-3 ${rowHeightClass}`}>
                      <div className="text-xs text-[#161616] flex items-center space-x-1.5">
                        <span className="line-clamp-1">{app.nextStep}</span>
                      </div>
                      {app.nextStepDate && (
                        <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#0f62fe] flex items-center mt-0.5">
                          <Calendar className="w-3 h-3 mr-1" />
                          Target: {app.nextStepDate}
                        </span>
                      )}
                    </td>

                    {/* Priority */}
                    <td className={`px-3 ${rowHeightClass}`}>
                      <CarbonPriorityTag priority={app.priority} />
                    </td>

                    {/* Tailored Resume */}
                    <td className={`px-3 ${rowHeightClass} hidden lg:table-cell`}>
                      {linkedResume ? (
                        <div
                          className="flex items-center space-x-1 text-xs text-[#0f62fe] hover:underline cursor-pointer"
                          title={`Tailored for ${linkedResume.targetIndustry} (${linkedResume.version})`}
                        >
                          <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate max-w-[120px]">{linkedResume.version}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#8d8d8d] italic">Default CV</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className={`px-3 ${rowHeightClass} text-right`}>
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          type="button"
                          onClick={() => onViewApplication(app)}
                          className="p-1 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#161616]"
                          title="View Details"
                          aria-label={`View details for ${app.company}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditApplication(app)}
                          className="p-1 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#0f62fe]"
                          title="Quick Edit"
                          aria-label={`Edit ${app.company}`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete application for ${app.company}?`)) {
                              onDeleteApplications([app.id]);
                            }
                          }}
                          className="p-1 hover:bg-[#fff1f1] text-[#525252] hover:text-[#da1e28]"
                          title="Delete"
                          aria-label={`Delete ${app.company}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Carbon Pagination Footer */}
      <div className="p-3 bg-[#f4f4f4] border-t border-[#e0e0e0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#525252]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>Items per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-7 px-1.5 bg-white border border-[#8d8d8d] text-xs text-[#161616] focus:border-[#0f62fe] focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <span className="font-['IBM_Plex_Mono']">
            {filteredApplications.length === 0
              ? '0 - 0 of 0 items'
              : `${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(
                  currentPage * rowsPerPage,
                  filteredApplications.length
                )} of ${filteredApplications.length} items`}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-['IBM_Plex_Mono']">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex border border-[#8d8d8d] bg-white">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 hover:bg-[#e0e0e0] disabled:opacity-40 disabled:hover:bg-white border-r border-[#8d8d8d]"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1.5 hover:bg-[#e0e0e0] disabled:opacity-40 disabled:hover:bg-white"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
