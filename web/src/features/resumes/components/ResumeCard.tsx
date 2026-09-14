import type React from 'react';
import { 
  FileText, 
  Download, 
  Trash2, 
  Edit, 
  Eye, 
  Sparkles 
} from 'lucide-react';
import type { ResumeDocument } from '../types';

interface ResumeCardProps {
  resume: ResumeDocument;
  linkedApplicationsCount: number;
  onPreview: (resume: ResumeDocument) => void;
  onEdit: (resume: ResumeDocument) => void;
  onDelete: (id: string) => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  linkedApplicationsCount,
  onPreview,
  onEdit,
  onDelete,
}) => {
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([`${resume.title}\nVersion: ${resume.version}\nSummary: ${resume.summary}`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = resume.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-4 hover:bg-[#edf5ff]/40 transition-colors flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 group">
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
              {linkedApplicationsCount} linked {linkedApplicationsCount === 1 ? 'application' : 'applications'}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-1 lg:pl-4 self-end lg:self-center border-t lg:border-t-0 pt-2 lg:pt-0 border-[#f4f4f4]">
        <button
          type="button"
          onClick={() => onPreview(resume)}
          className="h-8 px-2.5 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#161616] text-xs font-medium flex items-center space-x-1 transition-colors cursor-pointer"
          title="Preview Document Details"
          aria-label={`Preview ${resume.title}`}
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Preview</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="h-8 w-8 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#161616] flex items-center justify-center transition-colors cursor-pointer"
          title="Download PDF"
          aria-label={`Download ${resume.filename}`}
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onEdit(resume)}
          className="h-8 w-8 hover:bg-[#e0e0e0] text-[#525252] hover:text-[#0f62fe] flex items-center justify-center transition-colors cursor-pointer"
          title="Edit Metadata & Target Industry"
          aria-label={`Edit metadata for ${resume.title}`}
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={linkedApplicationsCount > 0}
          onClick={() => {
            if (window.confirm(`Delete resume ${resume.title}?`)) {
              onDelete(resume.id);
            }
          }}
          className="h-8 w-8 hover:bg-[#fff1f1] text-[#525252] hover:text-[#da1e28] flex items-center justify-center transition-colors disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
          title={
            linkedApplicationsCount > 0
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
};
