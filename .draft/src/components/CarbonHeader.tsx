import React from 'react';
import { 
  Bell, 
  Search, 
  Plus, 
  Layers, 
  Calendar as CalendarIcon, 
  FileText, 
  Database,
  SlidersHorizontal,
  CheckCircle2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ActiveTab } from '../types';

interface CarbonHeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  unreadRemindersCount: number;
  onToggleNotificationCenter: () => void;
  isNotificationCenterOpen: boolean;
  onOpenQuickTrack: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalApplicationsCount: number;
}

export const CarbonHeader: React.FC<CarbonHeaderProps> = ({
  activeTab,
  onSelectTab,
  unreadRemindersCount,
  onToggleNotificationCenter,
  isNotificationCenterOpen,
  onOpenQuickTrack,
  searchQuery,
  onSearchChange,
  totalApplicationsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#161616] text-[#f4f4f4] border-b border-[#393939] select-none">
      {/* Primary Global Bar (48px standard Carbon height) */}
      <div className="flex items-center justify-between h-12 px-4">
        {/* Left: Brand + App Name */}
        <div className="flex items-center space-x-3">
          <button 
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center space-x-2 focus-visible:outline-2 focus-visible:outline-[#0f62fe] py-1 px-1.5"
            aria-label="Aplikante Home"
          >
            <div className="w-5 h-5 bg-[#0f62fe] flex items-center justify-center text-white font-bold text-xs tracking-tighter">
              A
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-semibold text-white tracking-tight text-sm font-['IBM_Plex_Sans']">
                APLIKANTE
              </span>
              <span className="text-[#8d8d8d] text-xs font-light tracking-normal hidden sm:inline">
                Job Application Tracker
              </span>
            </div>
          </button>

          {/* Backend Django Status Indicator */}
          <div className="hidden md:flex items-center space-x-1.5 pl-3 border-l border-[#393939] text-[11px] text-[#c6c6c6]">
            <span className="inline-block w-2 h-2 bg-[#24a148]" title="Django REST Service Online"></span>
            <span className="font-['IBM_Plex_Mono'] text-[#a8a8a8]">Django REST API v1.4</span>
            <span className="text-[#6f6f6f]">•</span>
            <span className="text-[#8d8d8d]">{totalApplicationsCount} records</span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden lg:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-[#8d8d8d] pointer-events-none" />
            <input
              type="text"
              placeholder="Search companies, roles, technologies... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-8 pl-9 pr-8 bg-[#262626] border-b border-[#525252] text-xs text-white placeholder-[#8d8d8d] focus:border-[#0f62fe] focus:bg-[#393939] focus:outline-none transition-colors"
              aria-label="Search job applications"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2 text-xs text-[#8d8d8d] hover:text-white px-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Quick Action & Utilities */}
        <div className="flex items-center h-full">
          {/* Quick Track Button */}
          <button
            type="button"
            onClick={onOpenQuickTrack}
            className="h-12 px-4 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white text-xs font-medium flex items-center space-x-1.5 transition-colors border-r border-[#0043ce]"
            aria-label="Open Quick Track Drawer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Track</span>
          </button>

          {/* Smart Reminders Notification Bell */}
          <button
            type="button"
            onClick={onToggleNotificationCenter}
            className={`h-12 w-12 flex items-center justify-center relative hover:bg-[#262626] transition-colors border-r border-[#393939] ${
              isNotificationCenterOpen ? 'bg-[#262626]' : ''
            }`}
            aria-label={`Reminders and alerts, ${unreadRemindersCount} pending`}
          >
            <Bell className="w-4 h-4 text-[#e0e0e0]" />
            {unreadRemindersCount > 0 && (
              <span className="absolute top-2.5 right-2.5 min-w-[16px] h-4 px-1 bg-[#da1e28] text-white text-[10px] font-bold flex items-center justify-center font-['IBM_Plex_Mono']">
                {unreadRemindersCount}
              </span>
            )}
          </button>

          {/* Django API Inspector Button */}
          <button
            type="button"
            onClick={() => onSelectTab('django-api')}
            className={`h-12 px-3 hidden sm:flex items-center space-x-1.5 hover:bg-[#262626] text-xs transition-colors border-r border-[#393939] ${
              activeTab === 'django-api' ? 'bg-[#262626] text-[#0f62fe]' : 'text-[#c6c6c6]'
            }`}
            title="Inspect Django REST API Endpoints and Schema"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="font-['IBM_Plex_Mono'] text-[11px]">API Docs</span>
          </button>

          {/* User Profile */}
          <div className="h-12 px-3 flex items-center space-x-2 text-xs text-[#c6c6c6]">
            <div className="w-7 h-7 bg-[#393939] text-white text-xs font-semibold flex items-center justify-center border border-[#525252]">
              AV
            </div>
            <span className="hidden xl:inline text-xs font-light">Alex Vance</span>
          </div>
        </div>
      </div>

      {/* Secondary Carbon Tab Bar (Dense Sub-navigation) */}
      <div className="flex items-center px-4 bg-[#262626] border-t border-[#393939] overflow-x-auto">
        <nav className="flex space-x-1" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className={`h-10 px-4 flex items-center space-x-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-[#0f62fe] text-white bg-[#393939]'
                : 'border-transparent text-[#c6c6c6] hover:text-white hover:bg-[#333333]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Job Data Grid & Funnel</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('calendar')}
            className={`h-10 px-4 flex items-center space-x-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'border-[#0f62fe] text-white bg-[#393939]'
                : 'border-transparent text-[#c6c6c6] hover:text-white hover:bg-[#333333]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Interview & Deadlines Calendar</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('resumes')}
            className={`h-10 px-4 flex items-center space-x-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'resumes'
                ? 'border-[#0f62fe] text-white bg-[#393939]'
                : 'border-transparent text-[#c6c6c6] hover:text-white hover:bg-[#333333]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tailored Resumes (4)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('reminders')}
            className={`h-10 px-4 flex items-center space-x-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'reminders'
                ? 'border-[#0f62fe] text-white bg-[#393939]'
                : 'border-transparent text-[#c6c6c6] hover:text-white hover:bg-[#333333]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Smart Reminders</span>
            {unreadRemindersCount > 0 && (
              <span className="ml-1.5 px-1 py-0.2 bg-[#393939] border border-[#525252] text-[10px] font-['IBM_Plex_Mono'] text-white">
                {unreadRemindersCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
