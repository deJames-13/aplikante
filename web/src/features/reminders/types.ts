export type ReminderPriority = 'CRITICAL' | 'WARNING' | 'INFO';

export type ReminderType = 'FOLLOW_UP' | 'INTERVIEW' | 'DEADLINE' | 'DOCUMENT';

export interface SmartReminder {
  id: string;
  applicationId?: string;
  company?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: ReminderPriority;
  isCompleted: boolean;
  type: ReminderType;
  snoozedUntil?: string;
}
