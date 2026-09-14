import { createStorageAdapter, type StorageAdapter } from '../../../shared/lib/storage';
import type { SmartReminder } from '../types';
import { INITIAL_REMINDERS } from '../data/mock-reminders';

const REMINDERS_STORAGE_KEY = 'aplikante_reminders_v1';

export const remindersStorage: StorageAdapter<SmartReminder[]> = createStorageAdapter<SmartReminder[]>(
  REMINDERS_STORAGE_KEY,
  INITIAL_REMINDERS
);
