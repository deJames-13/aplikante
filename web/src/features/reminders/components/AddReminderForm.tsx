import type React from 'react';
import { useState } from 'react';
import type { SmartReminder } from '../types';
import type { JobApplication } from '../../applications/types';

interface AddReminderFormProps {
  applications: JobApplication[];
  onCancel: () => void;
  onSave: (reminder: SmartReminder) => void;
}

export const AddReminderForm: React.FC<AddReminderFormProps> = ({
  applications,
  onCancel,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState(applications[0]?.company || 'IBM');
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [priority, setPriority] = useState<'CRITICAL' | 'WARNING' | 'INFO'>('WARNING');
  const [type, setType] = useState<'FOLLOW_UP' | 'INTERVIEW' | 'DEADLINE' | 'DOCUMENT'>('FOLLOW_UP');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const linkedApp = applications.find((a) => a.company === company);

    const reminder: SmartReminder = {
      id: `rem-${Date.now()}`,
      applicationId: linkedApp?.id,
      company,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      isCompleted: false,
      type,
    };

    onSave(reminder);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-[#edf5ff] border-b border-[#0f62fe] space-y-2 text-xs">
      <div className="flex items-center justify-between font-semibold text-[#0043ce]">
        <span>Create Actionable Reminder</span>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-[#525252] hover:text-[#161616] cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <input
        type="text"
        required
        placeholder="Action title (e.g. Follow up with IBM recruiter)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full h-8 px-2 bg-white border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:outline-none"
      />

      <div className="grid grid-cols-2 gap-2">
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
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
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="h-8 px-2 bg-white border border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'CRITICAL' | 'WARNING' | 'INFO')}
          className="h-8 px-2 bg-white border border-[#8d8d8d] text-xs"
        >
          <option value="CRITICAL">Critical (Red)</option>
          <option value="WARNING">Warning (Amber)</option>
          <option value="INFO">Info (Blue)</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'FOLLOW_UP' | 'INTERVIEW' | 'DEADLINE' | 'DOCUMENT')}
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
        className="w-full h-8 bg-[#0f62fe] hover:bg-[#0043ce] text-white font-medium cursor-pointer"
      >
        Add Reminder
      </button>
    </form>
  );
};
