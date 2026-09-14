import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ResumeDocument } from '../types';
import { resumesStorage } from '../storage/resumes-storage';
import { useToasts } from '../../../shared/context/toast-context';

interface ResumesContextValue {
  resumes: ResumeDocument[];
  addResume: (resume: ResumeDocument) => void;
  deleteResume: (id: string) => void;
  updateResume: (resume: ResumeDocument) => void;
}

const ResumesContext = createContext<ResumesContextValue | null>(null);

export function ResumesProvider({ children }: { children: React.ReactNode }) {
  const [resumes, setResumes] = useState<ResumeDocument[]>(() => resumesStorage.load());
  const { showToast } = useToasts();

  useEffect(() => {
    resumesStorage.save(resumes);
  }, [resumes]);

  const addResume = useCallback(
    (resume: ResumeDocument) => {
      setResumes((prev) => [resume, ...prev]);
      showToast('success', 'Resume Registered', `Added tailored version ${resume.version} (${resume.targetIndustry}).`);
    },
    [showToast]
  );

  const deleteResume = useCallback(
    (id: string) => {
      setResumes((prev) => prev.filter((r) => r.id !== id));
      showToast('info', 'Resume Deleted', 'Removed resume profile from repository.');
    },
    [showToast]
  );

  const updateResume = useCallback(
    (updated: ResumeDocument) => {
      setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      showToast('success', 'Resume Updated', `Saved metadata for version ${updated.version}.`);
    },
    [showToast]
  );

  const value = useMemo(
    () => ({
      resumes,
      addResume,
      deleteResume,
      updateResume,
    }),
    [resumes, addResume, deleteResume, updateResume]
  );

  return <ResumesContext.Provider value={value}>{children}</ResumesContext.Provider>;
}

export function useResumes(): ResumesContextValue {
  const context = useContext(ResumesContext);
  if (!context) {
    throw new Error('useResumes must be used within a ResumesProvider');
  }
  return context;
}
