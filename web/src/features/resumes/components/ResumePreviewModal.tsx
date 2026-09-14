import type React from 'react';
import { FileText } from 'lucide-react';
import type { ResumeDocument } from '../types';
import type { JobApplication } from '../../applications/types';

interface ResumePreviewModalProps {
  resume: ResumeDocument | null;
  linkedApplications: JobApplication[];
  onClose: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  resume,
  linkedApplications,
  onClose,
}) => {
  if (!resume) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-[#8d8d8d] shadow-2xl flex flex-col max-h-[90vh]">
        <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#0f62fe]" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Document Preview: {resume.filename}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8d8d8d] hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="border-b border-[#e0e0e0] pb-4">
            <h3 className="text-lg font-semibold text-[#161616]">{resume.title}</h3>
            <div className="flex items-center space-x-3 text-xs text-[#525252] mt-1 font-['IBM_Plex_Mono']">
              <span>Version: {resume.version}</span>
              <span>•</span>
              <span>Industry: {resume.targetIndustry}</span>
              <span>•</span>
              <span>ATS Match Index: {resume.matchScore}%</span>
            </div>
          </div>

          <div className="bg-[#f4f4f4] p-4 border border-[#e0e0e0] space-y-2 text-xs">
            <h4 className="font-semibold text-[#161616] uppercase tracking-wider text-[11px]">
              Executive Overview
            </h4>
            <p className="text-[#393939] leading-relaxed">{resume.summary}</p>
          </div>

          <div>
            <h4 className="font-semibold text-[#161616] uppercase tracking-wider text-[11px] mb-2">
              Linked Job Applications ({linkedApplications.length})
            </h4>
            {linkedApplications.length === 0 ? (
              <p className="text-xs text-[#8d8d8d] italic">No active applications currently linked.</p>
            ) : (
              <div className="border border-[#e0e0e0] divide-y divide-[#e0e0e0]">
                {linkedApplications.map((app) => (
                  <div key={app.id} className="p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-[#161616] mr-2">{app.company}</span>
                      <span className="text-[#525252]">{app.role}</span>
                    </div>
                    <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#0f62fe]">
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-[#f4f4f4] border-t border-[#e0e0e0] flex justify-between items-center">
          <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#525252]">
            SHA256: 8f4b2...verified
          </span>
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-4 bg-[#161616] text-white text-xs font-medium cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
