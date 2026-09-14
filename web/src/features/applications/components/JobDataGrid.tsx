import type React from 'react';
import { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  CheckSquare, 
  Square,
} from 'lucide-react';
import type { TableDensity } from '../types';
import type { ResumeDocument } from '../../resumes/types';
import { useApplications } from '../context/applications-context';
import { useResumes } from '../../resumes/context/resumes-context';
import { JobGridBulkActions } from './JobGridBulkActions';
import { JobGridToolbar } from './JobGridToolbar';
import { JobGridRow } from './JobGridRow';
import { JobGridPagination } from './JobGridPagination';

type SortField = 'company' | 'role' | 'dateApplied' | 'status' | 'salaryRange' | 'priority';

export const JobDataGrid: React.FC = () => {
  const {
    applications,
    openQuickTrack,
    viewApplication,
    deleteApplications,
    updateStatusBulk,
    statusFilter,
    setStatusFilter,
  } = useApplications();
  const { resumes } = useResumes();

  // Local table management state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [density, setDensity] = useState<TableDensity>('normal');
  const [sortField, setSortField] = useState<SortField>('dateApplied');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Resume lookup map
  const resumeMap = useMemo(() => {
    const map = new Map<string, ResumeDocument>();
    resumes.forEach((r) => map.set(r.id, r));
    return map;
  }, [resumes]);

  // Status counts
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    applications.forEach((app) => {
      counts[app.status] = (counts[app.status] || 0) + 1;
    });
    return counts;
  }, [applications]);

  // Filtering
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        app.company.toLowerCase().includes(query) ||
        app.role.toLowerCase().includes(query) ||
        app.nextStep.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query);

      const matchesStatus = !statusFilter || statusFilter === 'ALL' || app.status === statusFilter;
      const matchesPriority = priorityFilter === 'ALL' || app.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [applications, searchQuery, statusFilter, priorityFilter]);

  // Sorting
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

  // Selection
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

  // CSV Export
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

  return (
    <div className="bg-white border border-[#e0e0e0] relative select-none">
      {/* Carbon Data Table Toolbar / Bulk Actions */}
      {selectedIds.length > 0 ? (
        <JobGridBulkActions
          selectedIds={selectedIds}
          onClearSelection={() => setSelectedIds([])}
          onUpdateStatusBulk={updateStatusBulk}
          onDeleteApplications={deleteApplications}
          onExportCSV={handleExportCSV}
        />
      ) : (
        <JobGridToolbar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          statusFilter={statusFilter}
          onStatusFilterChange={(st) => {
            setStatusFilter(st);
            setCurrentPage(1);
          }}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={(p) => {
            setPriorityFilter(p);
            setCurrentPage(1);
          }}
          density={density}
          onDensityChange={setDensity}
          totalApplicationsCount={applications.length}
          statusCounts={statusCounts}
          onExportCSV={handleExportCSV}
          onOpenQuickTrack={() => openQuickTrack()}
        />
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

              {/* Role & Workplace */}
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
                      setStatusFilter(null);
                      setPriorityFilter('ALL');
                    }}
                    className="mt-3 text-xs text-[#0f62fe] underline font-medium cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </td>
              </tr>
            ) : (
              paginatedApplications.map((app) => (
                <JobGridRow
                  key={app.id}
                  application={app}
                  isSelected={selectedIds.includes(app.id)}
                  density={density}
                  linkedResume={resumeMap.get(app.resumeId)}
                  onToggleSelect={handleToggleSelectRow}
                  onView={(application) => viewApplication(application)}
                  onEdit={(application) => openQuickTrack(application)}
                  onDelete={(id) => deleteApplications([id])}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Carbon Pagination Footer */}
      <JobGridPagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalFilteredCount={filteredApplications.length}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(rows) => {
          setRowsPerPage(rows);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};
