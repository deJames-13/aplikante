import { createStorageAdapter, type StorageAdapter } from '../../../shared/lib/storage';
import type { JobApplication } from '../types';
import { INITIAL_APPLICATIONS } from '../data/mock-applications';

const APPLICATIONS_STORAGE_KEY = 'aplikante_apps_v1';

export const applicationsStorage: StorageAdapter<JobApplication[]> = createStorageAdapter<JobApplication[]>(
  APPLICATIONS_STORAGE_KEY,
  INITIAL_APPLICATIONS
);
