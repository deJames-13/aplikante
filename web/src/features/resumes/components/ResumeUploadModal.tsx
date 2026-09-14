import type React from 'react';
import { useState } from 'react';
import type { ResumeDocument } from '../types';

interface ResumeUploadModalProps {
  isOpen: boolean;
  fileName: string;
  onClose: () => void;
  onSave: (doc: ResumeDocument) => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  fileName,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(() =>
    fileName ? fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ') : ''
  );
  const [version, setVersion] = useState('v1.0');
  const [targetIndustry, setTargetIndustry] = useState('Tech / Cloud');
  const [summary, setSummary] = useState(
    'Tailored resume profile targeting Tech / Cloud applications.'
  );

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;

    const newDoc: ResumeDocument = {
      id: `res-${Date.now()}`,
      title: title.trim(),
      filename: fileName || `${title.replace(/\s+/g, '_')}.pdf`,
      version: version.trim() || 'v1.0',
      targetIndustry,
      fileSize: '145 KB',
      uploadDate: new Date().toISOString().slice(0, 10),
      matchScore: Math.floor(Math.random() * 15) + 85,
      linkedApplicationsCount: 0,
      summary: summary.trim() || 'Uploaded tailored enterprise resume variant.',
    };

    onSave(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-[#8d8d8d] shadow-2xl">
        <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Index New Resume Metadata
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
              Resume Title / Role Profile
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Version Code
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v1.0"
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Target Industry / Vertical
              </label>
              <select
                value={targetIndustry}
                onChange={(e) => setTargetIndustry(e.target.value)}
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
              Summary & Key Tailored Qualifications
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2 bg-[#f4f4f4] border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <div className="p-4 bg-[#f4f4f4] border-t border-[#e0e0e0] flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 bg-[#e0e0e0] hover:bg-[#d1d1d1] text-xs font-medium text-[#161616] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="h-9 px-5 bg-[#0f62fe] hover:bg-[#0043ce] text-xs font-medium text-white cursor-pointer"
          >
            Save & Register Version
          </button>
        </div>
      </div>
    </div>
  );
};
