import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

interface ResumeDropZoneProps {
  onFileSelect: (file: File) => void;
}

export const ResumeDropZone: React.FC<ResumeDropZoneProps> = ({ onFileSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
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
            className="h-10 px-4 bg-[#0f62fe] hover:bg-[#0043ce] active:bg-[#002d9c] text-white text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer"
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
  );
};
