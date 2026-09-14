import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { SmartReminder } from '../types';
import { remindersStorage } from '../storage/reminders-storage';
import { useToasts } from '../../../shared/context/toast-context';

interface RemindersContextValue {
  reminders: SmartReminder[];
  unreadRemindersCount: number;
  isNotificationCenterOpen: boolean;
  openNotificationCenter: () => void;
  closeNotificationCenter: () => void;
  toggleNotificationCenter: () => void;
  markDoneReminder: (id: string) => void;
  snoozeReminder: (id: string, days: number) => void;
  addReminder: (reminder: SmartReminder) => void;
}

const RemindersContext = createContext<RemindersContextValue | null>(null);

export function RemindersProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<SmartReminder[]>(() => remindersStorage.load());
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const { showToast } = useToasts();

  useEffect(() => {
    remindersStorage.save(reminders);
  }, [reminders]);

  const openNotificationCenter = useCallback(() => setIsNotificationCenterOpen(true), []);
  const closeNotificationCenter = useCallback(() => setIsNotificationCenterOpen(false), []);
  const toggleNotificationCenter = useCallback(() => setIsNotificationCenterOpen((prev) => !prev), []);

  const markDoneReminder = useCallback(
    (id: string) => {
      setReminders((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r))
      );
      showToast('info', 'Reminder Status', 'Updated task completion state.');
    },
    [showToast]
  );

  const snoozeReminder = useCallback(
    (id: string, days: number) => {
      setReminders((prev) =>
        prev.map((r) => {
          if (r.id === id) {
            const current = new Date(r.dueDate);
            current.setDate(current.getDate() + days);
            const newDue = current.toISOString().slice(0, 10);
            return {
              ...r,
              dueDate: newDue,
              snoozedUntil: newDue,
            };
          }
          return r;
        })
      );
      showToast('info', 'Task Snoozed', `Snoozed task for ${days} days.`);
    },
    [showToast]
  );

  const addReminder = useCallback(
    (newReminder: SmartReminder) => {
      setReminders((prev) => [newReminder, ...prev]);
      showToast('success', 'Reminder Added', `Scheduled task: "${newReminder.title}"`);
    },
    [showToast]
  );

  const unreadRemindersCount = useMemo(
    () => reminders.filter((r) => !r.isCompleted).length,
    [reminders]
  );

  const value = useMemo(
    () => ({
      reminders,
      unreadRemindersCount,
      isNotificationCenterOpen,
      openNotificationCenter,
      closeNotificationCenter,
      toggleNotificationCenter,
      markDoneReminder,
      snoozeReminder,
      addReminder,
    }),
    [
      reminders,
      unreadRemindersCount,
      isNotificationCenterOpen,
      openNotificationCenter,
      closeNotificationCenter,
      toggleNotificationCenter,
      markDoneReminder,
      snoozeReminder,
      addReminder,
    ]
  );

  return <RemindersContext.Provider value={value}>{children}</RemindersContext.Provider>;
}

export function useReminders(): RemindersContextValue {
  const context = useContext(RemindersContext);
  if (!context) {
    throw new Error('useReminders must be used within a RemindersProvider');
  }
  return context;
}
