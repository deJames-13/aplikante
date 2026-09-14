import type React from 'react';
import { useState } from 'react';
import type { ResumeDocument } from '../types';
import { useResumes } from '../context/resumes-context';
import { useApplications } from '../../applications/context/applications-context';
import { ResumeDropZone } from './ResumeDropZone';
import { ResumeCard } from './ResumeCard';
import { ResumeUploadModal } from './ResumeUploadModal';
import { ResumeEditModal } from './ResumeEditModal';
import { ResumePreviewModal } from './ResumePreviewModal';

export const ResumeManager: React.FC = () => {
  const { resumes, addResume, deleteResume, updateResume } = useResumes();
  const { applications } = useApplications();

  const [previewResume, setPreviewResume] = useState<ResumeDocument | null>(null);
  const [editingResume, setEditingResume] = useState<ResumeDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileSelect = (file: File) => {
    setUploadedFileName(file.name);
    setIsUploadModalOpen(true);
  };

  const getLinkedApplications = (resumeId: string) => {
    return applications.filter((app) => app.resumeId === resumeId);
  };

  return (
    <div className="space-y-6">
      {/* File Uploader Dropzone */}
      <ResumeDropZone onFileSelect={handleFileSelect} />

      {/* Tailored Resumes List */}
      <div className="bg-white border border-[#e0e0e0]">
        <div className="px-4 py-3 bg-[#f4f4f4] border-b border-[#e0e0e0] flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#161616]">
            Active Tailored Versions ({resumes.length})
          </span>
          <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#525252]">
            Total Linked Applications: {applications.length}
          </span>
        </div>

        <div className="divide-y divide-[#e0e0e0]">
          {resumes.map((resume) => {
            const linkedApps = getLinkedApplications(resume.id);
            return (
              <ResumeCard
                key={resume.id}
                resume={resume}
                linkedApplicationsCount={linkedApps.length}
                onPreview={setPreviewResume}
                onEdit={setEditingResume}
                onDelete={deleteResume}
              />
            );
          })}
        </div>
      </div>

      {/* Upload Modal */}
      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        fileName={uploadedFileName}
        onClose={() => setIsUploadModalOpen(false)}
        onSave={addResume}
      />

      {/* Edit Metadata Modal */}
      <ResumeEditModal
        resume={editingResume}
        onClose={() => setEditingResume(null)}
        onSave={updateResume}
      />

      {/* Preview Modal */}
      <ResumePreviewModal
        resume={previewResume}
        linkedApplications={previewResume ? getLinkedApplications(previewResume.id) : []}
        onClose={() => setPreviewResume(null)}
      />
    </div>
  );
};
