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
