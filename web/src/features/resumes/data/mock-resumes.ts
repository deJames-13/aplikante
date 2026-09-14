import type { ResumeDocument } from '../types';

export const INITIAL_RESUMES: ResumeDocument[] = [
  {
    id: 'res-1',
    title: 'Senior Full Stack Engineer (React/Django)',
    filename: 'Alex_Vance_Fullstack_v2.4.pdf',
    version: 'v2.4',
    targetIndustry: 'Tech / Cloud',
    fileSize: '142 KB',
    uploadDate: '2026-09-02',
    matchScore: 94,
    linkedApplicationsCount: 6,
    summary:
      'Specialized in distributed React web clients, Django REST services, PostgreSQL scaling, and IBM Carbon/design systems compliance.',
  },
  {
    id: 'res-2',
    title: 'Lead Frontend Architect & Design Systems',
    filename: 'Alex_Vance_Frontend_v3.1.pdf',
    version: 'v3.1',
    targetIndustry: 'Enterprise SaaS',
    fileSize: '168 KB',
    uploadDate: '2026-08-28',
    matchScore: 98,
    linkedApplicationsCount: 4,
    summary:
      'Focused on micro-frontends, accessible WCAG AAA component design, TypeScript architecture, and high-performance data tables.',
  },
  {
    id: 'res-3',
    title: 'Systems & Backend Python Specialist',
    filename: 'Alex_Vance_Python_v1.9.pdf',
    version: 'v1.9',
    targetIndustry: 'FinTech / Infrastructure',
    fileSize: '135 KB',
    uploadDate: '2026-08-15',
    matchScore: 89,
    linkedApplicationsCount: 3,
    summary:
      'Expertise in high-throughput Django Async, Celery job pipelines, Redis caching, and real-time WebSocket infrastructure.',
  },
  {
    id: 'res-4',
    title: 'Engineering Manager & Tech Lead',
    filename: 'Alex_Vance_EM_v1.0.pdf',
    version: 'v1.0',
    targetIndustry: 'Management',
    fileSize: '154 KB',
    uploadDate: '2026-07-20',
    matchScore: 82,
    linkedApplicationsCount: 2,
    summary:
      'Highlighting agile squad leadership, career mentoring, cross-functional roadmaps, and stakeholder alignment.',
  },
];
