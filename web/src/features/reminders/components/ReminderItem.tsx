import type React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  Calendar 
} from 'lucide-react';
import type { SmartReminder } from '../types';
import type { JobApplication } from '../../applications/types';

interface ReminderItemProps {
  reminder: SmartReminder;
  linkedApp?: JobApplication;
  onMarkDone: (id: string) => void;
  onSnooze: (id: string, days: number) => void;
  onViewApplication?: (app: JobApplication) => void;
}

export const ReminderItem: React.FC<ReminderItemProps> = ({
  reminder,
  linkedApp,
  onMarkDone,
  onSnooze,
  onViewApplication,
}) => {
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

  const style = getPriorityStyle(reminder.priority);

  return (
    <div
      className={`border border-[#e0e0e0] ${style.border} ${
        reminder.isCompleted ? 'bg-[#f4f4f4] opacity-60' : 'bg-white'
      } p-3.5 space-y-2 transition-all`}
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
      <div className="pt-2 border-t border-[#f4f4f4] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center text-[11px] font-['IBM_Plex_Mono'] text-[#525252]">
          <Calendar className="w-3 h-3 mr-1 text-[#8d8d8d]" />
          <span>Due: {reminder.dueDate}</span>
        </div>

        <div className="flex items-center space-x-1.5">
          {linkedApp && onViewApplication && (
            <button
              type="button"
              onClick={() => onViewApplication(linkedApp)}
              className="px-2.5 py-1 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#161616] text-[11px] font-medium border border-[#8d8d8d] cursor-pointer"
              title="Open linked application"
            >
              View App
            </button>
          )}

          {!reminder.isCompleted && (
            <button
              type="button"
              onClick={() => onSnooze(reminder.id, 2)}
              className="px-2.5 py-1 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#525252] hover:text-[#161616] text-[11px] font-medium border border-[#8d8d8d] flex items-center cursor-pointer"
              title="Snooze 2 days"
            >
              <Clock className="w-3 h-3 mr-1" />
              Snooze
            </button>
          )}

          <button
            type="button"
            onClick={() => onMarkDone(reminder.id)}
            className={`px-3 py-1 text-[11px] font-medium flex items-center cursor-pointer ${
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
};
