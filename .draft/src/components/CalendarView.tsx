import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  User, 
  FileText, 
  ExternalLink, 
  Plus, 
  AlertCircle,
  Building,
  Check
} from 'lucide-react';
import { CalendarEvent, JobApplication, ResumeDocument } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  applications: JobApplication[];
  resumes: ResumeDocument[];
  onSelectApplication: (app: JobApplication) => void;
  onAddEvent: (event: CalendarEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  applications,
  resumes,
  onSelectApplication,
  onAddEvent,
}) => {
  // Calendar month state (defaults to September 2026 based on mock data timeline)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 0-indexed, 8 = September
  const [viewMode, setViewMode] = useState<'MONTH' | 'WEEK'>('MONTH');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  // New Event Form
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState(applications[0]?.company || '');
  const [newDate, setNewDate] = useState('2026-09-21');
  const [newTime, setNewTime] = useState('10:00 AM - 11:00 AM');
  const [newType, setNewType] = useState<'INTERVIEW' | 'DEADLINE' | 'FOLLOW_UP'>('INTERVIEW');
  const [newMeetingUrl, setNewMeetingUrl] = useState('https://meet.google.com/new-interview');
  const [newNotes, setNewNotes] = useState('');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Days in month calculation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startingOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(8); // September
  };

  // Helper to get events for a day string (YYYY-MM-DD)
  const getEventsForDate = (dateStr: string) => {
    return events.filter((e) => e.date === dateStr);
  };

  const getEventBadgeStyle = (type: 'INTERVIEW' | 'DEADLINE' | 'FOLLOW_UP') => {
    switch (type) {
      case 'INTERVIEW':
        return 'bg-[#edf5ff] text-[#0043ce] border-l-2 border-[#0f62fe] hover:bg-[#d0e2ff]';
      case 'DEADLINE':
        return 'bg-[#fff1f1] text-[#a2191f] border-l-2 border-[#da1e28] hover:bg-[#ffd7d9]';
      case 'FOLLOW_UP':
        return 'bg-[#fef3d6] text-[#7a4f00] border-l-2 border-[#b28600] hover:bg-[#fddc9b]';
    }
  };

  const handleSaveNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const linkedApp = applications.find((a) => a.company === newCompany);

    const event: CalendarEvent = {
      id: `cal-${Date.now()}`,
      title: newTitle.trim(),
      applicationId: linkedApp?.id || 'app-001',
      company: newCompany,
      role: linkedApp?.role || 'Engineer',
      date: newDate,
      time: newTime,
      type: newType,
      meetingUrl: newMeetingUrl || undefined,
      locationNotes: newNotes || undefined,
    };

    onAddEvent(event);
    setIsNewEventModalOpen(false);
    setNewTitle('');
    setNewNotes('');
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header Bar */}
      <div className="bg-white border border-[#e0e0e0] p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Month Navigator */}
        <div className="flex items-center space-x-3">
          <h2 className="text-base font-semibold font-['IBM_Plex_Sans'] text-[#161616] tracking-tight">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <div className="flex border border-[#8d8d8d] bg-white">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-[#f4f4f4] border-r border-[#8d8d8d]"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4 text-[#161616]" />
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="px-2.5 py-0.5 text-xs font-['IBM_Plex_Mono'] font-medium hover:bg-[#f4f4f4] border-r border-[#8d8d8d]"
            >
              Today
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-[#f4f4f4]"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4 text-[#161616]" />
            </button>
          </div>
        </div>

        {/* Legend & Event Add */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-3 text-xs font-['IBM_Plex_Mono']">
            <span className="flex items-center text-[#0043ce]">
              <span className="w-2.5 h-2.5 bg-[#0f62fe] mr-1.5"></span>
              Interview
            </span>
            <span className="flex items-center text-[#a2191f]">
              <span className="w-2.5 h-2.5 bg-[#da1e28] mr-1.5"></span>
              Deadline
            </span>
            <span className="flex items-center text-[#7a4f00]">
              <span className="w-2.5 h-2.5 bg-[#b28600] mr-1.5"></span>
              Follow-Up
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsNewEventModalOpen(true)}
              className="h-8 px-3 bg-[#0f62fe] hover:bg-[#0043ce] text-white text-xs font-medium flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid (Monthly View) */}
      <div className="bg-white border border-[#e0e0e0]">
        {/* Weekday Header */}
        <div className="grid grid-cols-7 border-b border-[#8d8d8d] bg-[#f4f4f4] text-[11px] font-semibold text-[#161616] text-center">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-2 border-r last:border-r-0 border-[#e0e0e0] font-['IBM_Plex_Mono']">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days Matrix */}
        <div className="grid grid-cols-7 auto-rows-[110px] sm:auto-rows-[125px] divide-x divide-y divide-[#e0e0e0]">
          {/* Previous Month trailing days */}
          {Array.from({ length: startingOffset }).map((_, idx) => {
            const dayNum = daysInPrevMonth - startingOffset + idx + 1;
            return (
              <div key={`prev-${dayNum}`} className="p-1.5 bg-[#fafafa] text-[#8d8d8d] select-none">
                <span className="text-[11px] font-['IBM_Plex_Mono']">{dayNum}</span>
              </div>
            );
          })}

          {/* Current Month days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
              dayNum
            ).padStart(2, '0')}`;
            const dayEvents = getEventsForDate(dateStr);
            const isToday = dateStr === '2026-09-14';

            return (
              <div
                key={`day-${dayNum}`}
                className={`p-1.5 flex flex-col justify-between transition-colors overflow-hidden ${
                  isToday ? 'bg-[#edf5ff]/40 ring-1 ring-[#0f62fe] inset-0 z-10' : 'bg-white hover:bg-[#fafafa]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[11px] font-['IBM_Plex_Mono'] font-medium px-1 ${
                      isToday ? 'bg-[#0f62fe] text-white font-bold' : 'text-[#161616]'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[9px] font-['IBM_Plex_Mono'] text-[#525252]">
                      {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
                    </span>
                  )}
                </div>

                {/* Day Event Chips */}
                <div className="space-y-1 overflow-y-auto flex-1 max-h-[85px] pr-0.5">
                  {dayEvents.map((evt) => (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => setSelectedEvent(evt)}
                      className={`w-full text-left p-1 text-[10px] font-medium leading-tight block truncate transition-colors ${getEventBadgeStyle(
                        evt.type
                      )}`}
                      title={`${evt.time}: ${evt.company} - ${evt.title}`}
                    >
                      <span className="font-semibold">{evt.company}:</span> {evt.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Event Details Modal (Carbon Standard Modal) */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-white border border-[#8d8d8d] shadow-2xl">
            {/* Modal Header */}
            <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-[#0f62fe]" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Event Brief: {selectedEvent.type}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-[#8d8d8d] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              <div>
                <h3 className="text-base font-semibold text-[#161616]">
                  {selectedEvent.title}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-[#525252] mt-1 font-['IBM_Plex_Mono']">
                  <span className="flex items-center">
                    <Building className="w-3.5 h-3.5 mr-1 text-[#0f62fe]" />
                    {selectedEvent.company}
                  </span>
                  <span>•</span>
                  <span>{selectedEvent.role}</span>
                </div>
              </div>

              {/* Time and Date */}
              <div className="bg-[#f4f4f4] p-3 border border-[#e0e0e0] flex items-center justify-between">
                <div className="flex items-center space-x-2 font-['IBM_Plex_Mono'] text-xs text-[#161616]">
                  <Clock className="w-4 h-4 text-[#0f62fe]" />
                  <span>
                    {selectedEvent.date} @ {selectedEvent.time}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-white border border-[#8d8d8d] text-[10px] font-['IBM_Plex_Mono'] uppercase">
                  {selectedEvent.type}
                </span>
              </div>

              {/* Video Conference Link */}
              {selectedEvent.meetingUrl && (
                <div>
                  <span className="text-[11px] font-semibold text-[#525252] uppercase block mb-1">
                    Virtual Conference
                  </span>
                  <a
                    href={selectedEvent.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#edf5ff] text-[#0043ce] border border-[#0f62fe] font-medium hover:bg-[#d0e2ff] transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Meeting: {selectedEvent.meetingUrl}</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              )}

              {/* Interviewers */}
              {selectedEvent.interviewers && selectedEvent.interviewers.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-[#525252] uppercase block mb-1">
                    Interview Panel
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEvent.interviewers.map((person, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#f4f4f4] border border-[#e0e0e0] text-[#161616] flex items-center"
                      >
                        <User className="w-3 h-3 mr-1 text-[#525252]" />
                        {person}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Location notes */}
              {selectedEvent.locationNotes && (
                <div>
                  <span className="text-[11px] font-semibold text-[#525252] uppercase block mb-1">
                    Preparation & Topics
                  </span>
                  <p className="text-[#393939] leading-relaxed bg-[#f4f4f4] p-2.5 border border-[#e0e0e0]">
                    {selectedEvent.locationNotes}
                  </p>
                </div>
              )}

              {/* Quick links to associated job application & tailored resume */}
              {(() => {
                const linkedApp = applications.find(
                  (a) => a.id === selectedEvent.applicationId || a.company === selectedEvent.company
                );
                const linkedResume = linkedApp ? resumes.find((r) => r.id === linkedApp.resumeId) : null;

                return (
                  <div className="pt-2 border-t border-[#e0e0e0] flex items-center justify-between">
                    <div>
                      {linkedResume && (
                        <span className="text-[11px] text-[#0f62fe] flex items-center font-['IBM_Plex_Mono']">
                          <FileText className="w-3 h-3 mr-1" />
                          Resume: {linkedResume.version} ({linkedResume.targetIndustry})
                        </span>
                      )}
                    </div>

                    {linkedApp && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectApplication(linkedApp);
                          setSelectedEvent(null);
                        }}
                        className="px-3 py-1.5 bg-[#0f62fe] hover:bg-[#0043ce] text-white text-xs font-medium transition-colors"
                      >
                        Open Full Application Details
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#f4f4f4] border-t border-[#e0e0e0] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="h-8 px-4 bg-[#e0e0e0] hover:bg-[#d1d1d1] text-xs font-medium text-[#161616]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Event Creation Modal */}
      {isNewEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#161616]/60 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#8d8d8d] shadow-2xl">
            <div className="bg-[#161616] text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Schedule New Calendar Event
              </span>
              <button
                type="button"
                onClick={() => setIsNewEventModalOpen(false)}
                className="text-[#8d8d8d] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewEvent} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. System Design Interview Loop"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#161616] mb-1">
                    Company
                  </label>
                  <select
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:outline-none"
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
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:outline-none"
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
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#161616] mb-1">
                    Time Window
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="02:00 PM - 03:00 PM"
                    className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs font-['IBM_Plex_Mono'] focus:border-[#0f62fe] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">
                  Video Link (Zoom, Meet, Webex)
                </label>
                <input
                  type="url"
                  value={newMeetingUrl}
                  onChange={(e) => setNewMeetingUrl(e.target.value)}
                  className="w-full h-8 px-2 bg-[#f4f4f4] border-b border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#161616] mb-1">
                  Preparation Notes & Interviewers
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2 bg-[#f4f4f4] border border-[#8d8d8d] text-xs focus:border-[#0f62fe] focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-[#e0e0e0] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewEventModalOpen(false)}
                  className="h-8 px-4 bg-[#e0e0e0] text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-8 px-4 bg-[#0f62fe] hover:bg-[#0043ce] text-white text-xs font-medium"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
