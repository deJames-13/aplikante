import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { JobApplication, ApplicationStatus } from '../types';
import { applicationsStorage } from '../storage/applications-storage';
import { useToasts } from '../../../shared/context/toast-context';
import { useReminders } from '../../reminders/context/reminders-context';
import { useResumes } from '../../resumes/context/resumes-context';

interface ApplicationsContextValue {
  applications: JobApplication[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  isQuickTrackOpen: boolean;
  editingApplication: JobApplication | null;
  openQuickTrack: (app?: JobApplication | null) => void;
  closeQuickTrack: () => void;
  selectedViewApplication: JobApplication | null;
  viewApplication: (app: JobApplication | null) => void;
  saveApplication: (data: Partial<JobApplication>) => void;
  deleteApplications: (ids: string[]) => void;
  updateStatusBulk: (ids: string[], status: ApplicationStatus) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null);

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<JobApplication[]>(() =>
    applicationsStorage.load()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isQuickTrackOpen, setIsQuickTrackOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [selectedViewApplication, setSelectedViewApplication] = useState<JobApplication | null>(null);

  const { showToast } = useToasts();
  const { addReminder } = useReminders();
  const { resumes } = useResumes();

  useEffect(() => {
    applicationsStorage.save(applications);
  }, [applications]);

  // Keyboard accessibility shortcuts ('/' to search, 'q' for quick track, 'Esc' to close drawers/modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[type="text"][placeholder*="Search"]'
        );
        if (searchInput) searchInput.focus();
      } else if ((e.key === 'q' || e.key === 'Q') && !isQuickTrackOpen && !isInput) {
        e.preventDefault();
        setEditingApplication(null);
        setIsQuickTrackOpen(true);
      } else if (e.key === 'Escape') {
        if (isQuickTrackOpen) setIsQuickTrackOpen(false);
        if (selectedViewApplication) setSelectedViewApplication(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuickTrackOpen, selectedViewApplication]);

  const openQuickTrack = useCallback((app: JobApplication | null = null) => {
    setEditingApplication(app);
    setIsQuickTrackOpen(true);
  }, []);

  const closeQuickTrack = useCallback(() => {
    setIsQuickTrackOpen(false);
    setEditingApplication(null);
  }, []);

  const viewApplication = useCallback((app: JobApplication | null) => {
    setSelectedViewApplication(app);
  }, []);

  const saveApplication = useCallback(
    (data: Partial<JobApplication>) => {
      if (data.id) {
        setApplications((prev) =>
          prev.map((app) => (app.id === data.id ? ({ ...app, ...data } as JobApplication) : app))
        );
        if (selectedViewApplication && selectedViewApplication.id === data.id) {
          setSelectedViewApplication((prev) => (prev ? ({ ...prev, ...data } as JobApplication) : null));
        }
        showToast('success', 'Application Updated', `Saved changes for ${data.company || 'application'}`);
      } else {
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
          stages:
            data.stages && data.stages.length > 0
              ? data.stages
              : [
                  {
                    name: 'Application Submitted',
                    completedDate: data.dateApplied || new Date().toISOString().slice(0, 10),
                  },
                ],
        };

        setApplications((prev) => [newApp, ...prev]);

        // Automatically create a follow-up reminder
        addReminder({
          id: `rem-${Date.now()}`,
          applicationId: newApp.id,
          company: newApp.company,
          title: `Follow up with ${newApp.company}`,
          description: `Check status on ${newApp.role} submission if no recruiter email within 7 business days.`,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          priority: 'WARNING',
          isCompleted: false,
          type: 'FOLLOW_UP',
        });

        showToast(
          'success',
          'Application Logged',
          `Added ${newApp.company} to active tracker & created follow-up reminder.`
        );
      }

      setIsQuickTrackOpen(false);
      setEditingApplication(null);
    },
    [applications.length, resumes, selectedViewApplication, showToast, addReminder]
  );

  const deleteApplications = useCallback(
    (ids: string[]) => {
      setApplications((prev) => prev.filter((a) => !ids.includes(a.id)));
      if (selectedViewApplication && ids.includes(selectedViewApplication.id)) {
        setSelectedViewApplication(null);
      }
      showToast('info', 'Applications Deleted', `Removed ${ids.length} application(s) from database.`);
    },
    [selectedViewApplication, showToast]
  );

  const updateStatusBulk = useCallback(
    (ids: string[], newStatus: ApplicationStatus) => {
      setApplications((prev) =>
        prev.map((app) => (ids.includes(app.id) ? { ...app, status: newStatus } : app))
      );
      showToast('success', 'Status Updated', `Updated ${ids.length} application(s) to ${newStatus}.`);
    },
    [showToast]
  );

  const updateApplicationStatus = useCallback(
    (id: string, newStatus: ApplicationStatus) => {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedViewApplication && selectedViewApplication.id === id) {
        setSelectedViewApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      showToast('success', 'Status Updated', `Updated status to ${newStatus}.`);
    },
    [selectedViewApplication, showToast]
  );

  const value = useMemo(
    () => ({
      applications,
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter,
      isQuickTrackOpen,
      editingApplication,
      openQuickTrack,
      closeQuickTrack,
      selectedViewApplication,
      viewApplication,
      saveApplication,
      deleteApplications,
      updateStatusBulk,
      updateApplicationStatus,
    }),
    [
      applications,
      searchQuery,
      statusFilter,
      isQuickTrackOpen,
      editingApplication,
      openQuickTrack,
      closeQuickTrack,
      selectedViewApplication,
      viewApplication,
      saveApplication,
      deleteApplications,
      updateStatusBulk,
      updateApplicationStatus,
    ]
  );

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications(): ApplicationsContextValue {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationsProvider');
  }
  return context;
}
