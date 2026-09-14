import type { SmartReminder } from '../types';

export const INITIAL_REMINDERS: SmartReminder[] = [
  {
    id: 'rem-1',
    applicationId: 'app-001',
    company: 'IBM Enterprise Cloud',
    title: 'Follow up with IBM Recruiter Sarah Chen',
    description:
      'Send confirmation note for System Design Interview with Principal Architect scheduled for Wednesday.',
    dueDate: '2026-09-15',
    priority: 'CRITICAL',
    isCompleted: false,
    type: 'FOLLOW_UP',
  },
  {
    id: 'rem-2',
    applicationId: 'app-002',
    company: 'Stripe',
    title: 'Technical interview tomorrow: Take-home review',
    description:
      'Review webhook deduplication diagrams and Celery queue error-handling architecture before the call at 2:00 PM EST.',
    dueDate: '2026-09-16',
    priority: 'CRITICAL',
    isCompleted: false,
    type: 'INTERVIEW',
  },
  {
    id: 'rem-3',
    applicationId: 'app-003',
    company: 'Datadog',
    title: 'Datadog written offer deadline',
    description:
      'Finalize negotiation on signing bonus and equity acceleration clause before expiry on Sept 20.',
    dueDate: '2026-09-18',
    priority: 'WARNING',
    isCompleted: false,
    type: 'DEADLINE',
  },
  {
    id: 'rem-4',
    applicationId: 'app-004',
    company: 'Red Hat',
    title: 'Red Hat technical phone screen prep',
    description:
      'Brush up on Ansible automation architecture and Python Django ORM optimization strategies.',
    dueDate: '2026-09-15',
    priority: 'INFO',
    isCompleted: false,
    type: 'INTERVIEW',
  },
  {
    id: 'rem-5',
    applicationId: 'app-007',
    company: 'Bloomberg LP',
    title: 'Prepare virtual DOM & Canvas scrolling benchmarks',
    description:
      'Prepare code repo demonstration showing 60fps high-density tabular scrolling for Bloomberg loop.',
    dueDate: '2026-09-20',
    priority: 'WARNING',
    isCompleted: false,
    type: 'DOCUMENT',
  },
];
