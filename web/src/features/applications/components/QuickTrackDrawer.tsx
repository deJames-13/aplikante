import React from 'react';
import { X } from 'lucide-react';
import { useApplications } from '../context/applications-context';
import { useResumes } from '../../resumes/context/resumes-context';
import { QuickTrackForm } from './QuickTrackForm';

export const QuickTrackDrawer: React.FC = () => {
  const {
    isQuickTrackOpen,
    closeQuickTrack,
    saveApplication,
    editingApplication,
  } = useApplications();
  const { resumes } = useResumes();

  if (!isQuickTrackOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#161616]/60 backdrop-blur-[1px] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-track-drawer-title"
    >
      <div className="w-full max-w-xl bg-white border-l border-[#8d8d8d] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header (Carbon 48px Header style) */}
        <div className="bg-[#161616] text-white px-5 py-3 border-b border-[#393939] flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#0f62fe]"></span>
              <h2 id="quick-track-drawer-title" className="text-sm font-semibold tracking-wide uppercase">
                {editingApplication ? 'Edit Application' : 'Quick Track Application'}
              </h2>
            </div>
            <p className="text-[11px] text-[#8d8d8d] mt-0.5">
              High-density entry panel directly synchronized with Django API
            </p>
          </div>

          <button
            type="button"
            onClick={closeQuickTrack}
            className="p-1 text-[#c6c6c6] hover:text-white hover:bg-[#262626] transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <QuickTrackForm
          editingApplication={editingApplication}
          resumes={resumes}
          onSave={saveApplication}
          onCancel={closeQuickTrack}
        />
      </div>
    </div>
  );
};
