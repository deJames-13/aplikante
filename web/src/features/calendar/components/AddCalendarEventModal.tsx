import type React from 'react';
import { useState } from 'react';
import type { CalendarEvent } from '../types';
import type { JobApplication } from '../../applications/types';

interface AddCalendarEventModalProps {
  isOpen: boolean;
  applications: JobApplication[];
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
}

export const AddCalendarEventModal: React.FC<AddCalendarEventModalProps> = ({
  isOpen,
  applications,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(applications[0]?.company || 'IBM');
  const [date, setDate] = useState('2026-09-21');
  const [time, setTime] = useState('10:00 AM - 11:00 AM');
  const [type, setType] = useState<'INTERVIEW' | 'DEADLINE' | 'FOLLOW_UP'>('INTERVIEW');
  const [meetingUrl, setMeetingUrl] = useState('https://meet.google.com/new-interview');
  const [notes, setNewNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const linkedApp = applications.find((a) => a.company === company);

    const event: CalendarEvent = {
      id: `cal-${Date.now()}`,
      title: title.trim(),
      applicationId: linkedApp?.id || 'app-001',
      company,
      role: linkedApp?.role || 'Engineer',
      date,
      time,
      type,
      meetingUrl: meetingUrl || undefined,
      locationNotes: notes || undefined,
    };

    onSave(event);
    onClose();
    setTitle('');
    setNewNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#8d8d8d] shadow-2xl">
        <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Schedule New Calendar Event
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8d8d8d] hover:text-white cursor-pointer"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. System Design Interview Loop"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Company
              </label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              >
                {applications.map((app) => (
                  <option key={app.id} value={app.company}>
                    {app.company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Event Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'INTERVIEW' | 'DEADLINE' | 'FOLLOW_UP')}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              >
                <option value="INTERVIEW">Interview</option>
                <option value="DEADLINE">Deadline</option>
                <option value="FOLLOW_UP">Follow-Up</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#161616] mb-1">
                Time Window
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="02:00 PM - 03:00 PM"
                className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Video Link (Zoom, Meet, Webex)
            </label>
            <input
              type="url"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#161616] mb-1">
              Preparation Notes & Interviewers
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="w-full p-2 bg-[#f4f4f4] border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-[#e0e0e0] flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-4 bg-[#e0e0e0] text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8 px-4 bg-[#0f62fe] hover:bg-[#0043ce] text-white text-xs font-medium cursor-pointer"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
