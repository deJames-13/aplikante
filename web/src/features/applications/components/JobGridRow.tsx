import type React from 'react';
import { 
  Square, 
  CheckSquare, 
  ExternalLink, 
  Calendar, 
  FileText, 
  Eye, 
  Edit3, 
  Trash2 
} from 'lucide-react';
import type { JobApplication, TableDensity } from '../types';
import type { ResumeDocument } from '../../resumes/types';
import { CarbonStatusTag, CarbonPriorityTag } from './CarbonTag';

interface JobGridRowProps {
  application: JobApplication;
  isSelected: boolean;
  density: TableDensity;
  linkedResume?: ResumeDocument;
  onToggleSelect: (id: string) => void;
  onView: (app: JobApplication) => void;
  onEdit: (app: JobApplication) => void;
  onDelete: (id: string) => void;
}

export const JobGridRow: React.FC<JobGridRowProps> = ({
  application,
  isSelected,
  density,
  linkedResume,
  onToggleSelect,
  onView,
  onEdit,
  onDelete,
}) => {
  const rowHeightClass = {
    compact: 'py-1.5 text-xs',
    normal: 'py-3 text-xs',
    tall: 'py-4 text-sm',
  }[density];

  return (
    <tr
      className={`transition-colors group hover:bg-[#edf5ff]/60 ${
        isSelected ? 'bg-[#edf5ff]' : 'bg-white'
      }`}
    >
      {/* Row checkbox */}
      <td className={`px-3 ${rowHeightClass} text-center`}>
        <button
          type="button"
          onClick={() => onToggleSelect(application.id)}
          className="flex items-center justify-center text-[#161616] hover:text-[#0f62fe]"
          aria-label={`Select row for ${application.company}`}
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
            onClick={() => onView(application)}
          >
            {application.company}
          </span>
          {application.jobUrl && (
            <a
              href={application.jobUrl}
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
          {application.salaryRange}
        </span>
      </td>

      {/* Role & Workplace */}
      <td className={`px-3 ${rowHeightClass}`}>
        <div className="text-[#161616] font-medium">{application.role}</div>
        <div className="text-[11px] text-[#525252] flex items-center space-x-2 mt-0.5">
          <span>{application.location}</span>
          <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase px-1 bg-[#f4f4f4] border border-[#e0e0e0]">
            {application.jobType}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className={`px-3 ${rowHeightClass}`}>
        <CarbonStatusTag status={application.status} size={density === 'compact' ? 'sm' : 'md'} />
      </td>

      {/* Date Applied */}
      <td className={`px-3 ${rowHeightClass} font-['IBM_Plex_Mono'] text-xs text-[#525252]`}>
        {application.dateApplied}
      </td>

      {/* Next Steps */}
      <td className={`px-3 ${rowHeightClass}`}>
        <div className="text-xs text-[#161616] flex items-center space-x-1.5">
          <span className="line-clamp-1">{application.nextStep}</span>
        </div>
        {application.nextStepDate && (
          <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#0f62fe] flex items-center mt-0.5">
            <Calendar className="w-3 h-3 mr-1" />
            Target: {application.nextStepDate}
          </span>
        )}
      </td>

      {/* Priority */}
      <td className={`px-3 ${rowHeightClass}`}>
        <CarbonPriorityTag priority={application.priority} />
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
            onClick={() => onView(application)}
            className="p-1 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#161616]"
            title="View Details"
            aria-label={`View details for ${application.company}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(application)}
            className="p-1 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#0f62fe]"
            title="Quick Edit"
            aria-label={`Edit ${application.company}`}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Delete application for ${application.company}?`)) {
                onDelete(application.id);
              }
            }}
            className="p-1 hover:bg-[#fff1f1] text-[#525252] hover:text-[#da1e28]"
            title="Delete"
            aria-label={`Delete ${application.company}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};
