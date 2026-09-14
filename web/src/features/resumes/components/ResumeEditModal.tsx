import type React from 'react';
import { useState } from 'react';
import type { ResumeDocument } from '../types';

interface ResumeEditModalProps {
  resume: ResumeDocument | null;
  onClose: () => void;
  onSave: (doc: ResumeDocument) => void;
}

export const ResumeEditModal: React.FC<ResumeEditModalProps> = ({
  resume,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ResumeDocument | null>(resume);

  if (!resume || !formData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-[#8d8d8d] shadow-2xl">
        <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Edit Resume Metadata ({formData.version})
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8d8d8d] hover:text-white cursor-pointer"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Version
              </label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Target Industry
              </label>
              <select
                value={formData.targetIndustry}
                onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              >
                <option value="Tech / Cloud">Tech / Cloud</option>
                <option value="Enterprise SaaS">Enterprise SaaS</option>
                <option value="FinTech / Infrastructure">FinTech / Infrastructure</option>
                <option value="Management">Management</option>
                <option value="AI / Machine Learning">AI / Machine Learning</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Summary
            </label>
            <textarea
              rows={3}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full p-2 bg-[#f4f4f4] border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <div className="p-4 bg-[#f4f4f4] border-t border-[#e0e0e0] flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 bg-[#e0e0e0] text-xs font-medium text-[#161616] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="h-9 px-5 bg-[#0f62fe] text-xs font-medium text-white cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
