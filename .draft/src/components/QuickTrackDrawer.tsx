import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Sparkles, 
  Link as LinkIcon, 
  Building, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  MapPin, 
  FileText,
  AlertCircle,
  Check
} from 'lucide-react';
import { 
  JobApplication, 
  ApplicationStatus, 
  PriorityLevel, 
  JobType, 
  ResumeDocument 
} from '../types';

interface QuickTrackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveApplication: (app: Partial<JobApplication>) => void;
  editingApplication?: JobApplication | null;
  resumes: ResumeDocument[];
}

export const QuickTrackDrawer: React.FC<QuickTrackDrawerProps> = ({
  isOpen,
  onClose,
  onSaveApplication,
  editingApplication,
  resumes,
}) => {
  // Form State
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [location, setLocation] = useState('Remote (US)');
  const [jobType, setJobType] = useState<JobType>('REMOTE');
  const [salaryRange, setSalaryRange] = useState('$160,000 - $185,000');
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<ApplicationStatus>('APPLIED');
  const [priority, setPriority] = useState<PriorityLevel>('HIGH');
  const [nextStep, setNextStep] = useState('Awaiting initial recruiter screening');
  const [nextStepDate, setNextStepDate] = useState('');
  const [resumeId, setResumeId] = useState('res-1');
  const [notes, setNotes] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');

  const [errors, setErrors] = useState<{ company?: string; role?: string }>({});
  const [isParsingUrl, setIsParsingUrl] = useState(false);
  const [parseSuccessMsg, setParseSuccessMsg] = useState('');

  // Hydrate form when editing
  useEffect(() => {
    if (editingApplication) {
      setCompany(editingApplication.company);
      setRole(editingApplication.role);
      setJobUrl(editingApplication.jobUrl || '');
      setLocation(editingApplication.location || '');
      setJobType(editingApplication.jobType || 'REMOTE');
      setSalaryRange(editingApplication.salaryRange || '');
      setDateApplied(editingApplication.dateApplied || new Date().toISOString().slice(0, 10));
      setStatus(editingApplication.status || 'APPLIED');
      setPriority(editingApplication.priority || 'MEDIUM');
      setNextStep(editingApplication.nextStep || '');
      setNextStepDate(editingApplication.nextStepDate || '');
      setResumeId(editingApplication.resumeId || 'res-1');
      setNotes(editingApplication.notes || '');
      setRecruiterName(editingApplication.recruiterContact?.name || '');
      setRecruiterEmail(editingApplication.recruiterContact?.email || '');
    } else {
      // Reset defaults
      setCompany('');
      setRole('');
      setJobUrl('');
      setLocation('San Francisco, CA (Remote)');
      setJobType('REMOTE');
      setSalaryRange('$170,000 - $195,000');
      setDateApplied(new Date().toISOString().slice(0, 10));
      setStatus('APPLIED');
      setPriority('HIGH');
      setNextStep('Awaiting initial application acknowledgement');
      setNextStepDate('');
      setResumeId(resumes[0]?.id || 'res-1');
      setNotes('');
      setRecruiterName('');
      setRecruiterEmail('');
    }
    setErrors({});
    setParseSuccessMsg('');
  }, [editingApplication, isOpen, resumes]);

  if (!isOpen) return null;

  // Auto-fill simulator from Job URL
  const handleAutoFillFromUrl = () => {
    if (!jobUrl) {
      setErrors((prev) => ({ ...prev, company: 'Paste a Job Posting URL first' }));
      return;
    }
    setIsParsingUrl(true);
    setParseSuccessMsg('');

    setTimeout(() => {
      setIsParsingUrl(false);
      // Simulated parsing logic based on URL or mock defaults
      let parsedCompany = 'Figma';
      let parsedRole = 'Senior Frontend Engineer - Canvas & Core UI';
      let parsedLoc = 'San Francisco, CA (Hybrid)';
      let parsedSalary = '$180,000 - $210,000';

      if (jobUrl.toLowerCase().includes('google')) {
        parsedCompany = 'Google';
        parsedRole = 'Software Engineer III, Web & Design Systems';
        parsedLoc = 'Mountain View, CA (Hybrid)';
        parsedSalary = '$190,000 - $230,000';
      } else if (jobUrl.toLowerCase().includes('github')) {
        parsedCompany = 'GitHub';
        parsedRole = 'Senior React / TypeScript Architect';
        parsedLoc = 'Remote (US)';
        parsedSalary = '$175,000 - $205,000';
      } else if (jobUrl.toLowerCase().includes('netflix')) {
        parsedCompany = 'Netflix';
        parsedRole = 'UI Platform Engineer (Studio Workflows)';
        parsedLoc = 'Los Gatos, CA (Onsite)';
        parsedSalary = '$220,000 - $280,000';
      }

      setCompany(parsedCompany);
      setRole(parsedRole);
      setLocation(parsedLoc);
      setSalaryRange(parsedSalary);
      setNotes('Parsed automatically from enterprise job spec. High overlap with React/TypeScript/Design System portfolio.');
      setParseSuccessMsg(`Extracted ${parsedCompany} • ${parsedRole}`);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { company?: string; role?: string } = {};

    if (!company.trim()) newErrors.company = 'Company name is required';
    if (!role.trim()) newErrors.role = 'Role title is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveApplication({
      id: editingApplication?.id,
      company: company.trim(),
      role: role.trim(),
      jobUrl: jobUrl.trim(),
      location: location.trim(),
      jobType,
      salaryRange: salaryRange.trim(),
      dateApplied,
      status,
      priority,
      nextStep: nextStep.trim(),
      nextStepDate: nextStepDate || undefined,
      resumeId,
      notes: notes.trim(),
      recruiterContact: recruiterName
        ? {
            name: recruiterName.trim(),
            email: recruiterEmail.trim(),
          }
        : undefined,
    });

    onClose();
  };

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
            onClick={onClose}
            className="p-1 text-[#c6c6c6] hover:text-white hover:bg-[#262626] transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 bg-white text-[#161616]">
          {/* Quick Auto-fill from Job URL */}
          <div className="bg-[#f4f4f4] border border-[#e0e0e0] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#161616] flex items-center">
                <LinkIcon className="w-3.5 h-3.5 mr-1 text-[#0f62fe]" />
                Job Posting URL
              </label>
              <span className="text-[11px] text-[#525252]">Fast Parser</span>
            </div>
            <div className="flex space-x-1">
              <input
                type="url"
                placeholder="https://company.com/careers/posting/123..."
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                className="flex-1 h-8 px-2 bg-white border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAutoFillFromUrl}
                disabled={isParsingUrl}
                className="h-8 px-3 bg-[#e0e0e0] hover:bg-[#d1d1d1] text-xs font-medium text-[#161616] flex items-center space-x-1 border border-[#8d8d8d] transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0f62fe]" />
                <span>{isParsingUrl ? 'Parsing...' : 'Auto-Fill'}</span>
              </button>
            </div>
            {parseSuccessMsg && (
              <p className="text-[11px] text-[#24a148] flex items-center font-['IBM_Plex_Mono']">
                <Check className="w-3 h-3 mr-1" />
                {parseSuccessMsg}
              </p>
            )}
          </div>

          {/* Company & Role (Required) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Company Name <span className="text-[#da1e28]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. IBM, Stripe, Datadog"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
                }}
                className={`w-full h-8 px-2 bg-[#f4f4f4] border-b-2 text-xs text-[#161616] focus:bg-white focus:outline-none transition-colors ${
                  errors.company ? 'border-[#da1e28]' : 'border-[#161616] focus:border-[#0f62fe]'
                }`}
              />
              {errors.company && (
                <span className="text-[11px] text-[#da1e28] mt-0.5 block flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.company}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Role Title <span className="text-[#da1e28]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Frontend Engineer"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }));
                }}
                className={`w-full h-8 px-2 bg-[#f4f4f4] border-b-2 text-xs text-[#161616] focus:bg-white focus:outline-none transition-colors ${
                  errors.role ? 'border-[#da1e28]' : 'border-[#161616] focus:border-[#0f62fe]'
                }`}
              />
              {errors.role && (
                <span className="text-[11px] text-[#da1e28] mt-0.5 block flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.role}
                </span>
              )}
            </div>
          </div>

          {/* Location & Workplace Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Austin, TX or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Workplace Mode
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs text-[#161616] focus:border-[#0f62fe] focus:outline-none"
              >
                <option value="REMOTE">REMOTE</option>
                <option value="HYBRID">HYBRID</option>
                <option value="ONSITE">ONSITE</option>
              </select>
            </div>
          </div>

          {/* Salary & Date Applied */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Salary Target / Range
              </label>
              <input
                type="text"
                placeholder="e.g. $170,000 - $190,000"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Date Applied
              </label>
              <input
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Pipeline Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs text-[#161616] focus:border-[#0f62fe] focus:outline-none"
              >
                <option value="APPLIED">APPLIED</option>
                <option value="SCREENING">SCREENING</option>
                <option value="INTERVIEW">INTERVIEW</option>
                <option value="OFFER">OFFER</option>
                <option value="REJECTED">REJECTED</option>
                <option value="WITHDRAWN">WITHDRAWN</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Priority Tier
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs text-[#161616] focus:border-[#0f62fe] focus:outline-none"
              >
                <option value="HIGH">HIGH (Tier 1 Target)</option>
                <option value="MEDIUM">MEDIUM (Standard)</option>
                <option value="LOW">LOW (Backlog / Safety)</option>
              </select>
            </div>
          </div>

          {/* Next Steps & Target Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Immediate Next Step
              </label>
              <input
                type="text"
                placeholder="e.g. System Design Round with Architect"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={nextStepDate}
                onChange={(e) => setNextStepDate(e.target.value)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Tailored Resume Link */}
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Attach Tailored Resume
            </label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs text-[#161616] focus:border-[#0f62fe] focus:outline-none"
            >
              {resumes.map((res) => (
                <option key={res.id} value={res.id}>
                  {res.title} ({res.version} • {res.targetIndustry})
                </option>
              ))}
            </select>
            <span className="text-[11px] text-[#525252] mt-0.5 block">
              Associates this application with tailored keywords and version history.
            </span>
          </div>

          {/* Recruiter Contact Info */}
          <div className="border-t border-[#e0e0e0] pt-3">
            <span className="text-xs font-semibold uppercase text-[#525252] block mb-2">
              Recruiter / Point of Contact (Optional)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Recruiter Name (e.g. Sarah Chen)"
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="recruiter@company.com"
                  value={recruiterEmail}
                  onChange={(e) => setRecruiterEmail(e.target.value)}
                  className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notes & Preparation Context */}
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Interview Notes & Company Context
            </label>
            <textarea
              rows={3}
              placeholder="Record tech stack highlights, interview panel notes, culture details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 bg-[#f4f4f4] border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none resize-none"
            ></textarea>
          </div>
        </form>

        {/* Drawer Action Footer */}
        <div className="p-4 bg-[#f4f4f4] border-t border-[#e0e0e0] flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 bg-[#e0e0e0] hover:bg-[#d1d1d1] text-xs font-medium text-[#161616] border border-[#8d8d8d] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-10 px-6 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-xs font-medium text-white flex items-center space-x-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Application</span>
          </button>
        </div>
      </div>
    </div>
  );
};
