import { createStorageAdapter, type StorageAdapter } from '../../../shared/lib/storage';
import type { ResumeDocument } from '../types';
import { INITIAL_RESUMES } from '../data/mock-resumes';

const RESUMES_STORAGE_KEY = 'aplikante_resumes_v1';

export const resumesStorage: StorageAdapter<ResumeDocument[]> = createStorageAdapter<ResumeDocument[]>(
  RESUMES_STORAGE_KEY,
  INITIAL_RESUMES
);
