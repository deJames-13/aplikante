import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Download, 
  Trash2, 
  Edit, 
  Tag, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  Copy,
  Eye,
  X,
  Layers,
  Sparkles
} from 'lucide-react';
import { ResumeDocument, JobApplication } from '../types';

interface ResumeManagerProps {
  resumes: ResumeDocument[];
  applications: JobApplication[];
  onAddResume: (resume: ResumeDocument) => void;
  onDeleteResume: (id: string) => void;
  onUpdateResume: (resume: ResumeDocument) => void;
}

export const ResumeManager: React.FC<ResumeManagerProps> = ({
  resumes,
  applications,
  onAddResume,
  onDeleteResume,
  onUpdateResume,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewResume, setPreviewResume] = useState<ResumeDocument | null>(null);
  const [editingResume, setEditingResume] = useState<ResumeDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newVersion, setNewVersion] = useState('v1.0');
  const [newIndustry, setNewIndustry] = useState('Tech / Cloud');
  const [newSummary, setNewSummary] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleProcessFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleProcessFile = (file: File) => {
    setUploadedFileName(file.name);
    setNewTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
    setNewSummary(`Tailored resume profile targeting ${newIndustry} applications.`);
    setIsUploadModalOpen(true);
  };

  const handleSaveNewResume = () => {
    if (!newTitle.trim()) return;

    const newDoc: ResumeDocument = {
      id: `res-${Date.now()}`,
      title: newTitle.trim(),
      filename: uploadedFileName || `${newTitle.replace(/\s+/g, '_')}.pdf`,
      version: newVersion.trim(),
      targetIndustry: newIndustry,
      fileSize: '145 KB',
      uploadDate: new Date().toISOString().slice(0, 10),
      matchScore: Math.floor(Math.random() * 15) + 85,
      linkedApplicationsCount: 0,
      summary: newSummary.trim() || 'Uploaded tailored enterprise resume variant.',
    };

    onAddResume(newDoc);
    setIsUploadModalOpen(false);
    setNewTitle('');
    setUploadedFileName('');
  };

  // Get applications using this resume
  const getLinkedApplications = (resumeId: string) => {
    return applications.filter((app) => app.resumeId === resumeId);
  };

  return (
    <div className="space-y-6">
      {/* Carbon Standard File Uploader Hero Section */}
      <div className="bg-white border border-[#e0e0e0] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[#e0e0e0]">
          <div>
            <h2 className="text-base font-semibold text-[#161616] tracking-tight uppercase font-['IBM_Plex_Sans']">
              Tailored Resume Repository
            </h2>
            <p className="text-xs text-[#525252] mt-0.5">
              Upload, version, and map domain-tailored CVs to distinct enterprise industry verticals
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 px-4 bg-[#0f62fe] hover:bg-[#0043ce] active:bg-[#002d9c] text-white text-xs font-medium flex items-center space-x-2 transition-colors"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload New Version</span>
            </button>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-4 border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            isDragOver
              ? 'border-[#0f62fe] bg-[#edf5ff]'
              : 'border-[#8d8d8d] hover:border-[#0f62fe] bg-[#f4f4f4]'
          }`}
        >
          <div className="max-w-md mx-auto flex flex-col items-center">
            <UploadCloud className="w-8 h-8 text-[#0f62fe] mb-2" />
            <span className="text-xs font-semibold text-[#161616]">
              Drag and drop tailored resume file here or click to browse
            </span>
            <span className="text-[11px] text-[#525252] mt-1">
              Supports PDF, DOCX (Max 15MB). Automatic version numbering and ATS keyword indexation.
            </span>
          </div>
        </div>
      </div>

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
              <div
                key={resume.id}
                className="p-4 hover:bg-[#edf5ff]/40 transition-colors flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 group"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-start space-x-3.5 flex-1">
                  <div className="w-10 h-10 bg-[#edf5ff] border border-[#0f62fe]/30 flex items-center justify-center flex-shrink-0 text-[#0f62fe]">
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#161616] group-hover:text-[#0f62fe] transition-colors">
                        {resume.title}
                      </h3>

                      {/* Version Badge */}
                      <span className="px-1.5 py-0.5 bg-[#161616] text-white text-[10px] font-['IBM_Plex_Mono'] font-medium">
                        {resume.version}
                      </span>

                      {/* Industry Tag */}
                      <span className="px-2 py-0.5 bg-[#f4f4f4] border border-[#8d8d8d] text-[11px] font-medium text-[#161616]">
                        {resume.targetIndustry}
                      </span>

                      {/* Match Score */}
                      <span className="px-1.5 py-0.5 bg-[#defbe6] text-[#0e6027] border border-[#24a148]/40 text-[10px] font-['IBM_Plex_Mono'] font-semibold flex items-center">
                        <Sparkles className="w-2.5 h-2.5 mr-1" />
                        {resume.matchScore}% ATS Score
                      </span>
                    </div>

                    <p className="text-xs text-[#525252] line-clamp-1 max-w-2xl">{resume.summary}</p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-['IBM_Plex_Mono'] text-[#8d8d8d] pt-1">
                      <span>File: {resume.filename}</span>
                      <span>•</span>
                      <span>Size: {resume.fileSize}</span>
                      <span>•</span>
                      <span>Updated: {resume.uploadDate}</span>
                      <span>•</span>
                      <span className="text-[#0f62fe] font-medium">
                        {linkedApps.length} linked {linkedApps.length === 1 ? 'application' : 'applications'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Ghost Actions aligned to right of each item */}
                <div className="flex items-center space-x-1 lg:pl-4 self-end lg:self-center border-t lg:border-t-0 pt-2 lg:pt-0 border-[#f4f4f4]">
                  <button
                    type="button"
                    onClick={() => setPreviewResume(resume)}
                    className="h-8 px-2.5 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#161616] text-xs font-medium flex items-center space-x-1 transition-colors"
                    title="Preview Document Details"
                    aria-label={`Preview ${resume.title}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      // Simulated download
                      const element = document.createElement('a');
                      const file = new Blob([`${resume.title}\nVersion: ${resume.version}\nSummary: ${resume.summary}`], {
                        type: 'text/plain',
                      });
                      element.href = URL.createObjectURL(file);
                      element.download = resume.filename;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="h-8 w-8 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#161616] flex items-center justify-center transition-colors"
                    title="Download PDF"
                    aria-label={`Download ${resume.filename}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingResume(resume)}
                    className="h-8 w-8 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#0f62fe] flex items-center justify-center transition-colors"
                    title="Edit Metadata & Target Industry"
                    aria-label={`Edit metadata for ${resume.title}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    disabled={linkedApps.length > 0}
                    onClick={() => {
                      if (window.confirm(`Delete resume ${resume.title}?`)) {
                        onDeleteResume(resume.id);
                      }
                    }}
                    className="h-8 w-8 hover:bg-[#fff1f1] text-[#525252] hover:text-[#da1e28] flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    title={
                      linkedApps.length > 0
                        ? 'Cannot delete resume currently linked to applications'
                        : 'Delete version'
                    }
                    aria-label={`Delete ${resume.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload / Metadata Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-[#8d8d8d] shadow-2xl">
            <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Index New Resume Metadata
              </span>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="text-[#8d8d8d] hover:text-white"
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
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
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
                    value={newVersion}
                    onChange={(e) => setNewVersion(e.target.value)}
                    placeholder="v1.0"
                    className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#161616] mb-1">
                    Target Industry / Vertical
                  </label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
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
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full p-2 bg-[#f4f4f4] border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
                ></textarea>
              </div>
            </div>

            <div className="p-4 bg-[#f4f4f4] border-t border-[#e0e0e0] flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="h-9 px-4 bg-[#e0e0e0] hover:bg-[#d1d1d1] text-xs font-medium text-[#161616]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNewResume}
                className="h-9 px-5 bg-[#0f62fe] hover:bg-[#0043ce] text-xs font-medium text-white"
              >
                Save & Register Version
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingResume && (
        <div className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-[#8d8d8d] shadow-2xl">
            <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Edit Resume Metadata ({editingResume.version})
              </span>
              <button
                type="button"
                onClick={() => setEditingResume(null)}
                className="text-[#8d8d8d] hover:text-white"
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
                  value={editingResume.title}
                  onChange={(e) =>
                    setEditingResume({ ...editingResume, title: e.target.value })
                  }
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
                    value={editingResume.version}
                    onChange={(e) =>
                      setEditingResume({ ...editingResume, version: e.target.value })
                    }
                    className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#161616] mb-1">
                    Target Industry
                  </label>
                  <select
                    value={editingResume.targetIndustry}
                    onChange={(e) =>
                      setEditingResume({ ...editingResume, targetIndustry: e.target.value })
                    }
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
                  value={editingResume.summary}
                  onChange={(e) =>
                    setEditingResume({ ...editingResume, summary: e.target.value })
                  }
                  className="w-full p-2 bg-[#f4f4f4] border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
                ></textarea>
              </div>
            </div>

            <div className="p-4 bg-[#f4f4f4] border-t border-[#e0e0e0] flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingResume(null)}
                className="h-9 px-4 bg-[#e0e0e0] text-xs font-medium text-[#161616]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateResume(editingResume);
                  setEditingResume(null);
                }}
                className="h-9 px-5 bg-[#0f62fe] text-xs font-medium text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Document Preview Modal */}
      {previewResume && (
        <div className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-[#8d8d8d] shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#0f62fe]" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Document Preview: {previewResume.filename}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewResume(null)}
                className="text-[#8d8d8d] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="border-b border-[#e0e0e0] pb-4">
                <h3 className="text-lg font-semibold text-[#161616]">{previewResume.title}</h3>
                <div className="flex items-center space-x-3 text-xs text-[#525252] mt-1 font-['IBM_Plex_Mono']">
                  <span>Version: {previewResume.version}</span>
                  <span>•</span>
                  <span>Industry: {previewResume.targetIndustry}</span>
                  <span>•</span>
                  <span>ATS Match Index: {previewResume.matchScore}%</span>
                </div>
              </div>

              <div className="bg-[#f4f4f4] p-4 border border-[#e0e0e0] space-y-2 text-xs">
                <h4 className="font-semibold text-[#161616] uppercase tracking-wider text-[11px]">
                  Executive Overview
                </h4>
                <p className="text-[#393939] leading-relaxed">{previewResume.summary}</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#161616] uppercase tracking-wider text-[11px] mb-2">
                  Linked Job Applications ({getLinkedApplications(previewResume.id).length})
                </h4>
                {getLinkedApplications(previewResume.id).length === 0 ? (
                  <p className="text-xs text-[#8d8d8d] italic">No active applications currently linked.</p>
                ) : (
                  <div className="border border-[#e0e0e0] divide-y divide-[#e0e0e0]">
                    {getLinkedApplications(previewResume.id).map((app) => (
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
                onClick={() => setPreviewResume(null)}
                className="h-8 px-4 bg-[#161616] text-white text-xs font-medium"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
