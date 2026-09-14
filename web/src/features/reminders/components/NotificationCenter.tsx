import React, { useState } from 'react';
import { X, CheckCircle2, Plus } from 'lucide-react';
import { useReminders } from '../context/reminders-context';
import { useApplications } from '../../applications/context/applications-context';
import { ReminderItem } from './ReminderItem';
import { AddReminderForm } from './AddReminderForm';

export const NotificationCenter: React.FC = () => {
  const {
    reminders,
    isNotificationCenterOpen,
    closeNotificationCenter,
    markDoneReminder,
    snoozeReminder,
    addReminder,
  } = useReminders();
  const { applications, viewApplication } = useApplications();

  const [filter, setFilter] = useState<'PENDING' | 'ALL' | 'COMPLETED'>('PENDING');
  const [isAddingReminder, setIsAddingReminder] = useState(false);

  if (!isNotificationCenterOpen) return null;

  const filteredReminders = reminders.filter((r) => {
    if (filter === 'PENDING') return !r.isCompleted;
    if (filter === 'COMPLETED') return r.isCompleted;
    return true;
  });

  const pendingCount = reminders.filter((r) => !r.isCompleted).length;
  const completedCount = reminders.filter((r) => r.isCompleted).length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#161616]/60 backdrop-blur-[1px] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="smart-reminder-title"
    >
      <div className="w-full max-w-md bg-white border-l border-[#8d8d8d] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-[#161616] text-white px-4 py-3 border-b border-[#393939] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#da1e28]"></span>
            <h2 id="smart-reminder-title" className="text-sm font-semibold tracking-wide uppercase">
              Smart Reminders & Alerts
            </h2>
          </div>
          <button
            type="button"
            onClick={closeNotificationCenter}
            className="p-1 text-[#c6c6c6] hover:text-white hover:bg-[#262626] cursor-pointer"
            aria-label="Close Reminders Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Filter Bar */}
        <div className="p-3 bg-[#f4f4f4] border-b border-[#e0e0e0] flex items-center justify-between">
          {/* Tabs */}
          <div className="flex border border-[#8d8d8d] bg-white text-xs">
            <button
              type="button"
              onClick={() => setFilter('PENDING')}
              className={`px-3 py-1 font-medium cursor-pointer ${
                filter === 'PENDING' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 font-medium border-l border-r border-[#8d8d8d] cursor-pointer ${
                filter === 'ALL' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('COMPLETED')}
              className={`px-3 py-1 font-medium cursor-pointer ${
                filter === 'COMPLETED' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
              }`}
            >
              Done ({completedCount})
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingReminder(!isAddingReminder)}
            className="h-7 px-2.5 bg-[#161616] hover:bg-[#262626] text-white text-xs font-medium flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>

        {/* Add Reminder Form */}
        {isAddingReminder && (
          <AddReminderForm
            applications={applications}
            onCancel={() => setIsAddingReminder(false)}
            onSave={(reminder) => {
              addReminder(reminder);
              setIsAddingReminder(false);
            }}
          />
        )}

        {/* Reminders List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredReminders.length === 0 ? (
            <div className="text-center py-12 text-[#8d8d8d]">
              <CheckCircle2 className="w-8 h-8 mx-auto text-[#24a148] mb-2" />
              <p className="text-xs font-medium text-[#161616]">All Caught Up</p>
              <p className="text-[11px] mt-0.5">No pending reminders or follow-ups in this view.</p>
            </div>
          ) : (
            filteredReminders.map((reminder) => {
              const linkedApp = applications.find(
                (a) => a.id === reminder.applicationId || a.company === reminder.company
              );

              return (
                <ReminderItem
                  key={reminder.id}
                  reminder={reminder}
                  linkedApp={linkedApp}
                  onMarkDone={markDoneReminder}
                  onSnooze={snoozeReminder}
                  onViewApplication={(app) => {
                    viewApplication(app);
                    closeNotificationCenter();
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
