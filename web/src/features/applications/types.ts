export type ApplicationStatus =
  | 'APPLIED'
  | 'SCREENING'
  | 'INTERVIEW'
  | 'OFFER'
  | 'REJECTED'
  | 'WITHDRAWN';

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type JobType = 'REMOTE' | 'HYBRID' | 'ONSITE';

export interface TimelineStage {
  name: string;
  completedDate?: string;
  notes?: string;
}

export interface RecruiterContact {
  name: string;
  email: string;
  linkedin?: string;
}

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
  recruiterContact?: RecruiterContact;
  stages: TimelineStage[];
}

export type TableDensity = 'compact' | 'normal' | 'tall';
