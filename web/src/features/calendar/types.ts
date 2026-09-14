export type CalendarEventType = 'INTERVIEW' | 'DEADLINE' | 'FOLLOW_UP';

export interface CalendarEvent {
  id: string;
  title: string;
  applicationId: string;
  company: string;
  role: string;
  date: string;
  time: string;
  type: CalendarEventType;
  meetingUrl?: string;
  interviewers?: string[];
  locationNotes?: string;
}
