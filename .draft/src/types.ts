export type ApplicationStatus =
  | 'APPLIED'
  | 'SCREENING'
  | 'INTERVIEW'
  | 'OFFER'
  | 'REJECTED'
  | 'WITHDRAWN';

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type JobType = 'REMOTE' | 'HYBRID' | 'ONSITE';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  jobType: JobType;
  dateApplied: string;
  status: ApplicationStatus;
  nextStep: string;
  nextStepDate?: string;
  salaryRange: string;
  priority: PriorityLevel;
  jobUrl: string;
  resumeId: string;
  notes: string;
  recruiterContact?: {
    name: string;
    email: string;
    linkedin?: string;
  };
  stages: {
    name: string;
    completedDate?: string;
    notes?: string;
  }[];
}

export interface ResumeDocument {
  id: string;
  title: string;
  filename: string;
  version: string;
  targetIndustry: string;
  fileSize: string;
  uploadDate: string;
  matchScore: number;
  linkedApplicationsCount: number;
  summary: string;
}

export interface SmartReminder {
  id: string;
  applicationId?: string;
  company?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'CRITICAL' | 'WARNING' | 'INFO';
  isCompleted: boolean;
  type: 'FOLLOW_UP' | 'INTERVIEW' | 'DEADLINE' | 'DOCUMENT';
  snoozedUntil?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  applicationId: string;
  company: string;
  role: string;
  date: string;
  time: string;
  type: 'INTERVIEW' | 'DEADLINE' | 'FOLLOW_UP';
  meetingUrl?: string;
  interviewers?: string[];
  locationNotes?: string;
}

export type TableDensity = 'compact' | 'normal' | 'tall';
export type ActiveTab = 'dashboard' | 'calendar' | 'resumes' | 'reminders' | 'django-api';
