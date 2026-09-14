import React, { useState, useEffect } from 'react';
import { 
  INITIAL_APPLICATIONS, 
  INITIAL_RESUMES, 
  INITIAL_REMINDERS, 
  INITIAL_CALENDAR_EVENTS 
} from './data/mockData';
import { 
  JobApplication, 
  ResumeDocument, 
  SmartReminder, 
  CalendarEvent, 
  ActiveTab, 
  ApplicationStatus 
} from './types';
import { CarbonHeader } from './components/CarbonHeader';
import { CarbonCharts } from './components/CarbonCharts';
import { JobDataGrid } from './components/JobDataGrid';
import { QuickTrackDrawer } from './components/QuickTrackDrawer';
import { ResumeManager } from './components/ResumeManager';
import { NotificationCenter } from './components/NotificationCenter';
import { CalendarView } from './components/CalendarView';
import { JobDetailModal } from './components/JobDetailModal';
import { DjangoApiInspector } from './components/DjangoApiInspector';
import { Check, AlertCircle, Info, X } from 'lucide-react';

interface ToastAlert {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

export default function App() {
  // Primary persistent state
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('aplikante_apps_v1');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [resumes, setResumes] = useState<ResumeDocument[]>(() => {
    const saved = localStorage.getItem('aplikante_resumes_v1');
    return saved ? JSON.parse(saved) : INITIAL_RESUMES;
  });

  const [reminders, setReminders] = useState<SmartReminder[]>(() => {
    const saved = localStorage.getItem('aplikante_reminders_v1');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('aplikante_events_v1');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR_EVENTS;
  });

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isQuickTrackOpen, setIsQuickTrackOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [selectedViewApplication, setSelectedViewApplication] = useState<JobApplication | null>(null);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastAlert[]>([]);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('aplikante_apps_v1', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('aplikante_resumes_v1', JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    localStorage.setItem('aplikante_reminders_v1', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('aplikante_events_v1', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  // Toast dispatch
  const showToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const newToast: ToastAlert = {
      id: `toast-${Date.now()}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard accessibility shortcuts ('/' to search, 'q' for quick track, 'Esc' to close drawers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      } else if ((e.key === 'q' || e.key === 'Q') && !isQuickTrackOpen && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        setEditingApplication(null);
        setIsQuickTrackOpen(true);
      } else if (e.key === 'Escape') {
        if (isQuickTrackOpen) setIsQuickTrackOpen(false);
        if (isNotificationCenterOpen) setIsNotificationCenterOpen(false);
        if (selectedViewApplication) setSelectedViewApplication(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuickTrackOpen, isNotificationCenterOpen, selectedViewApplication]);

  // Application Actions
  const handleSaveApplication = (data: Partial<JobApplication>) => {
    if (data.id) {
      // Update existing
      setApplications((prev) =>
        prev.map((app) => (app.id === data.id ? ({ ...app, ...data } as JobApplication) : app))
      );
      showToast('success', 'Application Updated', `Saved changes for ${data.company}`);
    } else {
      // Create new
      const newApp: JobApplication = {
        id: `app-${String(applications.length + 1).padStart(3, '0')}`,
        company: data.company || 'Unknown Company',
        role: data.role || 'Software Engineer',
        location: data.location || 'Remote',
        jobType: data.jobType || 'REMOTE',
        dateApplied: data.dateApplied || new Date().toISOString().slice(0, 10),
        status: data.status || 'APPLIED',
        nextStep: data.nextStep || 'Application acknowledged',
        nextStepDate: data.nextStepDate,
        salaryRange: data.salaryRange || '$160,000 - $185,000',
        priority: data.priority || 'MEDIUM',
        jobUrl: data.jobUrl || '',
        resumeId: data.resumeId || resumes[0]?.id || 'res-1',
        notes: data.notes || '',
        recruiterContact: data.recruiterContact,
        stages: [
          {
            name: 'Application Submitted',
            completedDate: data.dateApplied || new Date().toISOString().slice(0, 10),
          },
        ],
      };

      setApplications((prev) => [newApp, ...prev]);

      // Automatically create a follow-up reminder
      const followUpReminder: SmartReminder = {
        id: `rem-${Date.now()}`,
        applicationId: newApp.id,
        company: newApp.company,
        title: `Follow up with ${newApp.company}`,
        description: `Check status on ${newApp.role} submission if no recruiter email within 7 business days.`,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        priority: 'WARNING',
        isCompleted: false,
        type: 'FOLLOW_UP',
      };
      setReminders((prev) => [followUpReminder, ...prev]);

      showToast('success', 'Application Logged', `Added ${newApp.company} to active tracker & created follow-up reminder.`);
    }

    setEditingApplication(null);
  };

  const handleDeleteApplications = (ids: string[]) => {
    setApplications((prev) => prev.filter((a) => !ids.includes(a.id)));
    showToast('info', 'Applications Deleted', `Removed ${ids.length} application(s) from database.`);
  };

  const handleUpdateStatusBulk = (ids: string[], newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (ids.includes(app.id) ? { ...app, status: newStatus } : app))
    );
    showToast('success', 'Status Updated', `Updated ${ids.length} application(s) to ${newStatus}.`);
  };

  const handleSingleStatusUpdate = (id: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    if (selectedViewApplication && selectedViewApplication.id === id) {
      setSelectedViewApplication({ ...selectedViewApplication, status: newStatus });
    }
    showToast('success', 'Status Updated', `Updated status to ${newStatus}.`);
  };

  // Reminder Actions
  const handleMarkDoneReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r))
    );
    showToast('info', 'Reminder Status', 'Updated task completion state.');
  };

  const handleSnoozeReminder = (id: string, days: number) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const current = new Date(r.dueDate);
          current.setDate(current.getDate() + days);
          return {
            ...r,
            dueDate: current.toISOString().slice(0, 10),
            snoozedUntil: current.toISOString().slice(0, 10),
          };
        }
        return r;
      })
    );
    showToast('info', 'Task Snoozed', `Snoozed task for ${days} days.`);
  };

  const handleAddReminder = (newReminder: SmartReminder) => {
    setReminders((prev) => [newReminder, ...prev]);
    showToast('success', 'Reminder Added', `Scheduled task: "${newReminder.title}"`);
  };

  // Resume Actions
  const handleAddResume = (resume: ResumeDocument) => {
    setResumes((prev) => [resume, ...prev]);
    showToast('success', 'Resume Registered', `Added tailored version ${resume.version} (${resume.targetIndustry}).`);
  };

  const handleDeleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    showToast('info', 'Resume Deleted', 'Removed resume profile from repository.');
  };

  const handleUpdateResume = (updated: ResumeDocument) => {
    setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    showToast('success', 'Resume Updated', `Saved metadata for version ${updated.version}.`);
  };

  // Calendar Event Action
  const handleAddCalendarEvent = (event: CalendarEvent) => {
    setCalendarEvents((prev) => [event, ...prev]);
    showToast('success', 'Event Scheduled', `Booked ${event.type}: ${event.company} on ${event.date}`);
  };

  const unreadRemindersCount = reminders.filter((r) => !r.isCompleted).length;

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#161616] flex flex-col font-['IBM_Plex_Sans'] selection:bg-[#0f62fe] selection:text-white">
      {/* Global Carbon Header */}
      <CarbonHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unreadRemindersCount={unreadRemindersCount}
        onToggleNotificationCenter={() => setIsNotificationCenterOpen(!isNotificationCenterOpen)}
        isNotificationCenterOpen={isNotificationCenterOpen}
        onOpenQuickTrack={() => {
          setEditingApplication(null);
          setIsQuickTrackOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalApplicationsCount={applications.length}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6" id="main-content">
        {/* VIEW 1: Dashboard Job Tracking (Central Hub) */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top Visualizations Row: Funnel Chart, Velocity, Pipeline Health */}
            <section aria-label="Pipeline Analytics & Charts">
              <CarbonCharts
                applications={applications}
                onFilterByStatus={(st) => setStatusFilter(st)}
                activeStatusFilter={statusFilter}
              />
            </section>

            {/* Enterprise Data Grid (Central Hub) */}
            <section aria-label="Applications Data Grid">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-sm font-semibold uppercase tracking-wider text-[#161616]">
                    Active Job Applications Data Grid
                  </h1>
                  <p className="text-xs text-[#525252]">
                    Full lifecycle tracking, sorting, bulk actions, and stages
                  </p>
                </div>

                <div className="text-[11px] font-['IBM_Plex_Mono'] text-[#525252] hidden sm:block">
                  Press <kbd className="px-1.5 py-0.5 bg-white border border-[#8d8d8d] text-[#161616]">Q</kbd> to quick track • <kbd className="px-1.5 py-0.5 bg-white border border-[#8d8d8d] text-[#161616]">/</kbd> to search
                </div>
              </div>

              <JobDataGrid
                applications={applications}
                resumes={resumes}
                onOpenQuickTrack={() => {
                  setEditingApplication(null);
                  setIsQuickTrackOpen(true);
                }}
                onEditApplication={(app) => {
                  setEditingApplication(app);
                  setIsQuickTrackOpen(true);
                }}
                onViewApplication={(app) => setSelectedViewApplication(app)}
                onDeleteApplications={handleDeleteApplications}
                onUpdateStatusBulk={handleUpdateStatusBulk}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
              />
            </section>
          </div>
        )}

        {/* VIEW 2: Calendar */}
        {activeTab === 'calendar' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h1 className="text-sm font-semibold uppercase tracking-wider text-[#161616]">
                Interview Schedule & Application Deadlines
              </h1>
              <p className="text-xs text-[#525252]">
                Synchronized with application milestones, interview panels, and video conference links
              </p>
            </div>

            <CalendarView
              events={calendarEvents}
              applications={applications}
              resumes={resumes}
              onSelectApplication={(app) => setSelectedViewApplication(app)}
              onAddEvent={handleAddCalendarEvent}
            />
          </div>
        )}

        {/* VIEW 3: Resume Management */}
        {activeTab === 'resumes' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h1 className="text-sm font-semibold uppercase tracking-wider text-[#161616]">
                Tailored Resume Management
              </h1>
              <p className="text-xs text-[#525252]">
                Drag-and-drop version repository, target industry tagging, and ATS keyword scoring
              </p>
            </div>

            <ResumeManager
              resumes={resumes}
              applications={applications}
              onAddResume={handleAddResume}
              onDeleteResume={handleDeleteResume}
              onUpdateResume={handleUpdateResume}
            />
          </div>
        )}

        {/* VIEW 4: Smart Reminders (Dedicated Full View) */}
        {activeTab === 'reminders' && (
          <div className="space-y-4 animate-in fade-in duration-150 max-w-4xl mx-auto">
            <div>
              <h1 className="text-sm font-semibold uppercase tracking-wider text-[#161616]">
                Smart Actionable Reminders Center
              </h1>
              <p className="text-xs text-[#525252]">
                Follow-ups, take-home reviews, and recruiter communications
              </p>
            </div>

            <div className="bg-white border border-[#e0e0e0] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e0e0e0]">
                <span className="text-xs font-semibold uppercase text-[#525252]">
                  {unreadRemindersCount} Active Tasks Pending
                </span>
                <button
                  type="button"
                  onClick={() => setIsNotificationCenterOpen(true)}
                  className="text-xs font-medium text-[#0f62fe] hover:underline"
                >
                  Open Side Panel View →
                </button>
              </div>

              <div className="divide-y divide-[#e0e0e0]">
                {reminders.map((reminder) => {
                  const linkedApp = applications.find(
                    (a) => a.id === reminder.applicationId || a.company === reminder.company
                  );

                  return (
                    <div
                      key={reminder.id}
                      className={`py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                        reminder.isCompleted ? 'opacity-60 line-through' : ''
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-2 h-2 ${
                              reminder.priority === 'CRITICAL'
                                ? 'bg-[#da1e28]'
                                : reminder.priority === 'WARNING'
                                ? 'bg-[#b28600]'
                                : 'bg-[#0f62fe]'
                            }`}
                          ></span>
                          <span className="text-xs font-semibold text-[#161616]">
                            {reminder.title}
                          </span>
                          <span className="text-[10px] font-['IBM_Plex_Mono'] bg-[#f4f4f4] border border-[#e0e0e0] px-1 text-[#525252]">
                            {reminder.company}
                          </span>
                        </div>
                        <p className="text-xs text-[#525252] pl-4">{reminder.description}</p>
                        <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#8d8d8d] pl-4 block">
                          Due: {reminder.dueDate}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-center">
                        {linkedApp && (
                          <button
                            type="button"
                            onClick={() => setSelectedViewApplication(linkedApp)}
                            className="h-8 px-2.5 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#161616] text-xs font-medium border border-[#8d8d8d]"
                          >
                            View App
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSnoozeReminder(reminder.id, 2)}
                          className="h-8 px-2.5 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#525252] text-xs font-medium border border-[#8d8d8d]"
                        >
                          Snooze 2d
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMarkDoneReminder(reminder.id)}
                          className={`h-8 px-3 text-xs font-medium ${
                            reminder.isCompleted
                              ? 'bg-[#e0e0e0] text-[#161616]'
                              : 'bg-[#24a148] hover:bg-[#198038] text-white'
                          }`}
                        >
                          {reminder.isCompleted ? 'Undo' : 'Mark Done'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: Django API Inspector */}
        {activeTab === 'django-api' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <DjangoApiInspector
              applications={applications}
              resumes={resumes}
            />
          </div>
        )}
      </main>

      {/* Persistent Quick Track Side Drawer */}
      <QuickTrackDrawer
        isOpen={isQuickTrackOpen}
        onClose={() => {
          setIsQuickTrackOpen(false);
          setEditingApplication(null);
        }}
        onSaveApplication={handleSaveApplication}
        editingApplication={editingApplication}
        resumes={resumes}
      />

      {/* Smart Reminder Notification Center Panel */}
      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        reminders={reminders}
        applications={applications}
        onMarkDone={handleMarkDoneReminder}
        onSnooze={handleSnoozeReminder}
        onAddReminder={handleAddReminder}
        onViewApplication={(app) => {
          setSelectedViewApplication(app);
          setIsNotificationCenterOpen(false);
        }}
      />

      {/* Application Details Modal */}
      <JobDetailModal
        application={selectedViewApplication}
        onClose={() => setSelectedViewApplication(null)}
        onEdit={(app) => {
          setEditingApplication(app);
          setIsQuickTrackOpen(true);
        }}
        onDelete={(id) => {
          handleDeleteApplications([id]);
          setSelectedViewApplication(null);
        }}
        onUpdateStatus={handleSingleStatusUpdate}
        resumes={resumes}
      />

      {/* Carbon Toast Alerts Container */}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm pointer-events-none select-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3 shadow-lg border border-[#8d8d8d] flex items-start justify-between space-x-3 transition-all ${
              toast.type === 'success'
                ? 'bg-[#defbe6] border-l-4 border-[#24a148] text-[#0e6027]'
                : toast.type === 'error'
                ? 'bg-[#fff1f1] border-l-4 border-[#da1e28] text-[#a2191f]'
                : 'bg-[#edf5ff] border-l-4 border-[#0f62fe] text-[#0043ce]'
            }`}
          >
            <div className="flex items-start space-x-2 text-xs">
              {toast.type === 'success' ? (
                <Check className="w-4 h-4 text-[#24a148] flex-shrink-0 mt-0.5" />
              ) : toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-[#da1e28] flex-shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-[#0f62fe] flex-shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-semibold block">{toast.title}</span>
                <span className="text-[11px] text-[#393939] leading-tight block">{toast.message}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-[#525252] hover:text-[#161616] p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Carbon System Footer */}
      <footer className="w-full bg-[#161616] text-[#8d8d8d] text-xs py-3 px-4 border-t border-[#393939] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-white">APLIKANTE</span>
            <span>•</span>
            <span className="font-light">Carbon Design System Compliance (v11)</span>
            <span>•</span>
            <span className="font-['IBM_Plex_Mono'] text-[#a8a8a8]">Django REST API ready</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] font-['IBM_Plex_Mono']">
            <span>Accessibility: WCAG 2.1 AA Compliant</span>
            <span>Zero-Radius Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
