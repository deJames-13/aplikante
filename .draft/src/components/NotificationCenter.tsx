import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  Plus, 
  ChevronRight, 
  Calendar, 
  Building,
  RotateCcw
} from 'lucide-react';
import { SmartReminder, JobApplication } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  reminders: SmartReminder[];
  applications: JobApplication[];
  onMarkDone: (id: string) => void;
  onSnooze: (id: string, days: number) => void;
  onAddReminder: (reminder: SmartReminder) => void;
  onViewApplication: (app: JobApplication) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  reminders,
  applications,
  onMarkDone,
  onSnooze,
  onAddReminder,
  onViewApplication,
}) => {
  const [filter, setFilter] = useState<'PENDING' | 'ALL' | 'COMPLETED'>('PENDING');
  const [isAddingReminder, setIsAddingReminder] = useState(false);

  // New Reminder Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCompany, setNewCompany] = useState(applications[0]?.company || '');
  const [newDueDate, setNewDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [newPriority, setNewPriority] = useState<'CRITICAL' | 'WARNING' | 'INFO'>('WARNING');
  const [newType, setNewType] = useState<'FOLLOW_UP' | 'INTERVIEW' | 'DEADLINE' | 'DOCUMENT'>('FOLLOW_UP');

  if (!isOpen) return null;

  const filteredReminders = reminders.filter((r) => {
    if (filter === 'PENDING') return !r.isCompleted;
    if (filter === 'COMPLETED') return r.isCompleted;
    return true;
  });

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const linkedApp = applications.find((a) => a.company === newCompany);

    const reminder: SmartReminder = {
      id: `rem-${Date.now()}`,
      applicationId: linkedApp?.id,
      company: newCompany,
      title: newTitle.trim(),
      description: newDescription.trim(),
      dueDate: newDueDate,
      priority: newPriority,
      isCompleted: false,
      type: newType,
    };

    onAddReminder(reminder);
    setNewTitle('');
    setNewDescription('');
    setIsAddingReminder(false);
  };

  const getPriorityStyle = (priority: 'CRITICAL' | 'WARNING' | 'INFO') => {
    switch (priority) {
      case 'CRITICAL':
        return {
          border: 'border-l-4 border-[#da1e28]',
          bg: 'bg-[#fff1f1]',
          text: 'text-[#a2191f]',
          icon: <AlertOctagon className="w-4 h-4 text-[#da1e28] flex-shrink-0" />,
        };
      case 'WARNING':
        return {
          border: 'border-l-4 border-[#b28600]',
          bg: 'bg-[#fef3d6]',
          text: 'text-[#7a4f00]',
          icon: <AlertTriangle className="w-4 h-4 text-[#b28600] flex-shrink-0" />,
        };
      case 'INFO':
      default:
        return {
          border: 'border-l-4 border-[#0f62fe]',
          bg: 'bg-[#edf5ff]',
          text: 'text-[#0043ce]',
          icon: <Info className="w-4 h-4 text-[#0f62fe] flex-shrink-0" />,
        };
    }
  };

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
            onClick={onClose}
            className="p-1 text-[#c6c6c6] hover:text-white hover:bg-[#262626]"
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
              className={`px-3 py-1 font-medium ${
                filter === 'PENDING' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
              }`}
            >
              Pending ({reminders.filter((r) => !r.isCompleted).length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 font-medium border-l border-r border-[#8d8d8d] ${
                filter === 'ALL' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('COMPLETED')}
              className={`px-3 py-1 font-medium ${
                filter === 'COMPLETED' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#f4f4f4]'
              }`}
            >
              Done ({reminders.filter((r) => r.isCompleted).length})
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingReminder(!isAddingReminder)}
            className="h-7 px-2.5 bg-[#161616] hover:bg-[#262626] text-white text-xs font-medium flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>

        {/* Add Reminder Form */}
        {isAddingReminder && (
          <form onSubmit={handleCreateReminder} className="p-3 bg-[#edf5ff] border-b border-[#0f62fe] space-y-2 text-xs">
            <div className="flex items-center justify-between font-semibold text-[#0043ce]">
              <span>Create Actionable Reminder</span>
              <button
                type="button"
                onClick={() => setIsAddingReminder(false)}
                className="text-xs text-[#525252] hover:text-[#161616]"
              >
                Cancel
              </button>
            </div>

            <input
              type="text"
              required
              placeholder="Action title (e.g. Follow up with IBM recruiter)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full h-8 px-2 bg-white border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-2">
              <select
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                className="h-8 px-2 bg-white border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:outline-none"
              >
                {applications.map((a) => (
                  <option key={a.id} value={a.company}>
                    {a.company}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="h-8 px-2 bg-white border border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="h-8 px-2 bg-white border border-[#8d8d8d] text-xs"
              >
                <option value="CRITICAL">Critical (Red)</option>
                <option value="WARNING">Warning (Amber)</option>
                <option value="INFO">Info (Blue)</option>
              </select>

              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="h-8 px-2 bg-white border border-[#8d8d8d] text-xs"
              >
                <option value="FOLLOW_UP">Follow Up</option>
                <option value="INTERVIEW">Interview</option>
                <option value="DEADLINE">Deadline</option>
                <option value="DOCUMENT">Document</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full h-8 bg-[#0f62fe] hover:bg-[#0043ce] text-white font-medium"
            >
              Add Reminder
            </button>
          </form>
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
              const style = getPriorityStyle(reminder.priority);
              const linkedApp = applications.find((a) => a.id === reminder.applicationId || a.company === reminder.company);

              return (
                <div
                  key={reminder.id}
                  className={`border border-[#e0e0e0] ${style.border} ${
                    reminder.isCompleted ? 'bg-[#f4f4f4] opacity-60' : 'bg-white'
                  } p-3 space-y-2 transition-all`}
                >
                  {/* Title & Priority Icon */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-2">
                      {style.icon}
                      <div>
                        <h4
                          className={`text-xs font-semibold text-[#161616] ${
                            reminder.isCompleted ? 'line-through text-[#8d8d8d]' : ''
                          }`}
                        >
                          {reminder.title}
                        </h4>
                        {reminder.company && (
                          <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#525252] block">
                            Company: {reminder.company}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] font-['IBM_Plex_Mono'] px-1.5 py-0.5 bg-[#f4f4f4] border border-[#e0e0e0] uppercase text-[#525252]">
                      {reminder.type}
                    </span>
                  </div>

                  {/* Description */}
                  {reminder.description && (
                    <p className="text-xs text-[#525252] pl-6 leading-relaxed">
                      {reminder.description}
                    </p>
                  )}

                  {/* Due date & Action buttons */}
                  <div className="pt-2 border-t border-[#f4f4f4] flex items-center justify-between text-xs">
                    <div className="flex items-center text-[11px] font-['IBM_Plex_Mono'] text-[#525252]">
                      <Calendar className="w-3 h-3 mr-1 text-[#8d8d8d]" />
                      <span>Due: {reminder.dueDate}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      {linkedApp && (
                        <button
                          type="button"
                          onClick={() => onViewApplication(linkedApp)}
                          className="px-2 py-0.5 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#161616] text-[11px] font-medium border border-[#8d8d8d]"
                          title="Open linked application"
                        >
                          View App
                        </button>
                      )}

                      {!reminder.isCompleted && (
                        <button
                          type="button"
                          onClick={() => onSnooze(reminder.id, 2)}
                          className="px-2 py-0.5 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#525252] hover:text-[#161616] text-[11px] font-medium border border-[#8d8d8d] flex items-center"
                          title="Snooze 2 days"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Snooze
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onMarkDone(reminder.id)}
                        className={`px-2.5 py-0.5 text-[11px] font-medium flex items-center ${
                          reminder.isCompleted
                            ? 'bg-[#e0e0e0] text-[#161616] hover:bg-[#d1d1d1]'
                            : 'bg-[#24a148] hover:bg-[#198038] text-white'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        <span>{reminder.isCompleted ? 'Undo' : 'Done'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
