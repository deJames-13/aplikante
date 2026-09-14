import React from 'react';
import { useReminders } from '../context/reminders-context';
import { useApplications } from '../../applications/context/applications-context';
import { ReminderItem } from './ReminderItem';

export const RemindersView: React.FC = () => {
  const {
    reminders,
    unreadRemindersCount,
    markDoneReminder,
    snoozeReminder,
    openNotificationCenter,
  } = useReminders();
  const { applications, viewApplication } = useApplications();

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
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
            onClick={openNotificationCenter}
            className="text-xs font-medium text-[#0f62fe] hover:underline cursor-pointer"
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
              <div key={reminder.id} className="py-2">
                <ReminderItem
                  reminder={reminder}
                  linkedApp={linkedApp}
                  onMarkDone={markDoneReminder}
                  onSnooze={snoozeReminder}
                  onViewApplication={viewApplication}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
