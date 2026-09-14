import type React from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  User, 
  FileText, 
  ExternalLink, 
  Building 
} from 'lucide-react';
import type { CalendarEvent } from '../types';
import type { JobApplication } from '../../applications/types';
import type { ResumeDocument } from '../../resumes/types';

interface CalendarEventModalProps {
  event: CalendarEvent | null;
  applications: JobApplication[];
  resumes: ResumeDocument[];
  onClose: () => void;
  onSelectApplication: (app: JobApplication) => void;
}

export const CalendarEventModal: React.FC<CalendarEventModalProps> = ({
  event,
  applications,
  resumes,
  onClose,
  onSelectApplication,
}) => {
  if (!event) return null;

  const linkedApp = applications.find(
    (a) => a.id === event.applicationId || a.company === event.company
  );
  const linkedResume = linkedApp ? resumes.find((r) => r.id === linkedApp.resumeId) : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg bg-white border border-[#8d8d8d] shadow-2xl">
        {/* Modal Header */}
        <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-[#0f62fe]" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Event Brief: {event.type}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8d8d8d] hover:text-white cursor-pointer"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          <div>
            <h3 className="text-base font-semibold text-[#161616]">{event.title}</h3>
            <div className="flex items-center space-x-3 text-xs text-[#525252] mt-1 font-['IBM_Plex_Mono']">
              <span className="flex items-center">
                <Building className="w-3.5 h-3.5 mr-1 text-[#0f62fe]" />
                {event.company}
              </span>
              <span>•</span>
              <span>{event.role}</span>
            </div>
          </div>

          {/* Time and Date */}
          <div className="bg-[#f4f4f4] p-3 border border-[#e0e0e0] flex items-center justify-between">
            <div className="flex items-center space-x-2 font-['IBM_Plex_Mono'] text-xs text-[#161616]">
              <Clock className="w-4 h-4 text-[#0f62fe]" />
              <span>
                {event.date} @ {event.time}
              </span>
            </div>
            <span className="px-2 py-0.5 bg-white border border-[#8d8d8d] text-[10px] font-['IBM_Plex_Mono'] uppercase">
              {event.type}
            </span>
          </div>

          {/* Video Conference Link */}
          {event.meetingUrl && (
            <div>
              <span className="text-[11px] font-semibold text-[#525252] uppercase block mb-1">
                Virtual Conference
              </span>
              <a
                href={event.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#edf5ff] text-[#0043ce] border border-[#0f62fe] font-medium hover:bg-[#d0e2ff] transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Meeting: {event.meetingUrl}</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          )}

          {/* Interviewers */}
          {event.interviewers && event.interviewers.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-[#525252] uppercase block mb-1">
                Interview Panel
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.interviewers.map((person, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#f4f4f4] border border-[#e0e0e0] text-[#161616] flex items-center"
                  >
                    <User className="w-3 h-3 mr-1 text-[#525252]" />
                    {person}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Location notes */}
          {event.locationNotes && (
            <div>
              <span className="text-[11px] font-semibold text-[#525252] uppercase block mb-1">
                Preparation & Topics
              </span>
              <p className="text-[#393939] leading-relaxed bg-[#f4f4f4] p-2.5 border border-[#e0e0e0]">
                {event.locationNotes}
              </p>
            </div>
          )}

          {/* Associated job application & resume */}
          <div className="pt-2 border-t border-[#e0e0e0] flex items-center justify-between">
            <div>
              {linkedResume && (
                <span className="text-[11px] text-[#0f62fe] flex items-center font-['IBM_Plex_Mono']">
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  Resume: {linkedResume.version} ({linkedResume.targetIndustry})
                </span>
              )}
            </div>

            {linkedApp && (
              <button
                type="button"
                onClick={() => {
                  onSelectApplication(linkedApp);
                  onClose();
                }}
                className="px-3 py-1.5 bg-[#0f62fe] hover:bg-[#0043ce] text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Open Full Application Details
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f4f4f4] border-t border-[#e0e0e0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-4 bg-[#e0e0e0] hover:bg-[#d1d1d1] text-xs font-medium text-[#161616] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
