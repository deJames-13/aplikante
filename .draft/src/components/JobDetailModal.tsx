import React from 'react';
import { 
  X, 
  Building, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  ExternalLink, 
  FileText, 
  User, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Trash2,
  Check
} from 'lucide-react';
import { JobApplication, ApplicationStatus, ResumeDocument } from '../types';
import { CarbonStatusTag, CarbonPriorityTag } from './CarbonTag';

interface JobDetailModalProps {
  application: JobApplication | null;
  onClose: () => void;
  onEdit: (app: JobApplication) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  resumes: ResumeDocument[];
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  application,
  onClose,
  onEdit,
  onDelete,
  onUpdateStatus,
  resumes,
}) => {
  if (!application) return null;

  const linkedResume = resumes.find((r) => r.id === application.resumeId);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-app-title"
    >
      <div className="w-full max-w-3xl bg-white border border-[#8d8d8d] shadow-2xl my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#161616] text-white px-6 py-4 flex items-center justify-between border-b border-[#393939]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#0f62fe] text-white font-bold flex items-center justify-center text-sm font-['IBM_Plex_Mono']">
              {application.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 id="modal-app-title" className="text-base font-semibold leading-tight">
                {application.company}
              </h2>
              <span className="text-xs text-[#8d8d8d] font-light">
                Application ID: <span className="font-['IBM_Plex_Mono'] text-white">{application.id}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                onEdit(application);
                onClose();
              }}
              className="px-2.5 py-1 bg-[#262626] hover:bg-[#393939] text-xs text-[#e0e0e0] flex items-center space-x-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#c6c6c6] hover:text-white"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#161616]">
          {/* Main Key Info Banner */}
          <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[#161616] mb-1">{application.role}</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#525252]">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#8d8d8d]" />
                  {application.location} ({application.jobType})
                </span>
                <span>•</span>
                <span className="flex items-center font-['IBM_Plex_Mono'] text-[#161616] font-medium">
                  <DollarSign className="w-3.5 h-3.5 mr-0.5 text-[#24a148]" />
                  {application.salaryRange}
                </span>
                <span>•</span>
                <span className="flex items-center font-['IBM_Plex_Mono']">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-[#8d8d8d]" />
                  Applied: {application.dateApplied}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CarbonStatusTag status={application.status} size="md" />
              <CarbonPriorityTag priority={application.priority} />
            </div>
          </div>

          {/* Pipeline Progress Stages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#525252] mb-2">
              Interview Progression Stages
            </h4>
            <div className="border border-[#e0e0e0] divide-y divide-[#e0e0e0] bg-white">
              {application.stages && application.stages.length > 0 ? (
                application.stages.map((st, i) => (
                  <div key={i} className="p-3 flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-5 h-5 mt-0.5 flex items-center justify-center text-[10px] font-['IBM_Plex_Mono'] font-semibold ${
                          st.completedDate
                            ? 'bg-[#24a148] text-white'
                            : 'bg-[#f4f4f4] border border-[#8d8d8d] text-[#525252]'
                        }`}
                      >
                        {st.completedDate ? <Check className="w-3 h-3" /> : i + 1}
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-[#161616] block">{st.name}</span>
                        {st.notes && <p className="text-xs text-[#525252] mt-0.5">{st.notes}</p>}
                      </div>
                    </div>
                    {st.completedDate ? (
                      <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#24a148]">
                        Completed {st.completedDate}
                      </span>
                    ) : (
                      <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#b28600]">In Progress</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-3 text-xs text-[#8d8d8d]">No detailed stages recorded.</div>
              )}
            </div>
          </div>

          {/* Next Immediate Step */}
          <div className="border-l-4 border-[#0f62fe] bg-[#edf5ff] p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0043ce] block mb-1">
              Immediate Next Action
            </span>
            <p className="text-sm font-medium text-[#161616]">{application.nextStep}</p>
            {application.nextStepDate && (
              <span className="text-xs font-['IBM_Plex_Mono'] text-[#0f62fe] mt-1 block">
                Target Deadline: {application.nextStepDate}
              </span>
            )}
          </div>

          {/* Grid: Recruiter Contact & Attached Tailored Resume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recruiter Card */}
            <div className="border border-[#e0e0e0] p-4 bg-[#fafafa]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#525252] block mb-2">
                Recruiter / Hiring Contact
              </span>
              {application.recruiterContact ? (
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2 text-[#161616] font-medium">
                    <User className="w-3.5 h-3.5 text-[#0f62fe]" />
                    <span>{application.recruiterContact.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#525252]">
                    <Mail className="w-3.5 h-3.5 text-[#8d8d8d]" />
                    <a
                      href={`mailto:${application.recruiterContact.email}`}
                      className="text-[#0f62fe] hover:underline"
                    >
                      {application.recruiterContact.email}
                    </a>
                  </div>
                  {application.recruiterContact.linkedin && (
                    <div className="text-[11px] text-[#525252] pt-1">
                      <a
                        href={`https://${application.recruiterContact.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0f62fe] hover:underline flex items-center"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-[#8d8d8d] italic">No direct recruiter contact attached.</p>
              )}
            </div>

            {/* Attached Tailored Resume */}
            <div className="border border-[#e0e0e0] p-4 bg-[#fafafa]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#525252] block mb-2">
                Tailored Resume Attached
              </span>
              {linkedResume ? (
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2 font-medium text-[#161616]">
                    <FileText className="w-3.5 h-3.5 text-[#0f62fe]" />
                    <span>{linkedResume.title}</span>
                  </div>
                  <div className="text-[11px] font-['IBM_Plex_Mono'] text-[#525252]">
                    Version: <span className="text-[#161616]">{linkedResume.version}</span> • Vertical:{' '}
                    <span className="text-[#161616]">{linkedResume.targetIndustry}</span>
                  </div>
                  <p className="text-[11px] text-[#525252] line-clamp-2 mt-1">{linkedResume.summary}</p>
                </div>
              ) : (
                <p className="text-xs text-[#8d8d8d] italic">Default resume used.</p>
              )}
            </div>
          </div>

          {/* Notes & Context */}
          {application.notes && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#525252] block mb-1">
                Interview Prep & Culture Notes
              </span>
              <div className="bg-[#f4f4f4] p-3 border border-[#e0e0e0] text-xs leading-relaxed text-[#393939] whitespace-pre-line font-['IBM_Plex_Sans']">
                {application.notes}
              </div>
            </div>
          )}

          {/* External Posting URL */}
          {application.jobUrl && (
            <div className="pt-2 border-t border-[#e0e0e0] flex items-center justify-between text-xs">
              <span className="text-[#525252]">External Job Listing:</span>
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#0f62fe] hover:underline flex items-center font-['IBM_Plex_Mono']"
              >
                <span>{application.jobUrl}</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f4f4f4] border-t border-[#e0e0e0] flex flex-wrap items-center justify-between gap-2">
          {/* Quick status change */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#525252]">Update Status:</span>
            <select
              value={application.status}
              onChange={(e) => onUpdateStatus(application.id, e.target.value as ApplicationStatus)}
              className="h-8 px-2 bg-white border border-[#8d8d8d] text-xs font-semibold focus:border-[#0f62fe] focus:outline-none"
            >
              <option value="APPLIED">APPLIED</option>
              <option value="SCREENING">SCREENING</option>
              <option value="INTERVIEW">INTERVIEW</option>
              <option value="OFFER">OFFER</option>
              <option value="REJECTED">REJECTED</option>
              <option value="WITHDRAWN">WITHDRAWN</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Delete application for ${application.company}?`)) {
                  onDelete(application.id);
                  onClose();
                }
              }}
              className="h-8 px-3 text-[#da1e28] hover:bg-[#fff1f1] text-xs font-medium border border-[#da1e28]/30"
            >
              Delete Application
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-5 bg-[#161616] hover:bg-[#262626] text-white text-xs font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
