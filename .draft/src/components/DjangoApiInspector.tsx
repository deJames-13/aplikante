import React, { useState } from 'react';
import { Database, CheckCircle2, Code2, Copy, Check, RefreshCw, Terminal, ExternalLink } from 'lucide-react';
import { JobApplication, ResumeDocument } from '../types';

interface DjangoApiInspectorProps {
  applications: JobApplication[];
  resumes: ResumeDocument[];
}

export const DjangoApiInspector: React.FC<DjangoApiInspectorProps> = ({
  applications,
  resumes,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'endpoints' | 'models' | 'payload'>('endpoints');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');

  const djangoModelCode = `# aplikante/models.py
from django.db import models
from django.contrib.auth.models import User

class ApplicationStatus(models.TextChoices):
    APPLIED = 'APPLIED', 'Applied'
    SCREENING = 'SCREENING', 'Screening'
    INTERVIEW = 'INTERVIEW', 'Interview'
    OFFER = 'OFFER', 'Offer'
    REJECTED = 'REJECTED', 'Rejected'
    WITHDRAWN = 'WITHDRAWN', 'Withdrawn'

class JobApplication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    company = models.CharField(max_length=255, db_index=True)
    role = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    job_type = models.CharField(max_length=20, default='REMOTE')
    date_applied = models.DateField()
    status = models.CharField(max_length=20, choices=ApplicationStatus.choices, default=ApplicationStatus.APPLIED)
    next_step = models.TextField(blank=True)
    next_step_date = models.DateField(null=True, blank=True)
    salary_range = models.CharField(max_length=100, blank=True)
    priority = models.CharField(max_length=10, default='MEDIUM')
    job_url = models.URLField(max_length=500, blank=True)
    resume = models.ForeignKey('ResumeDocument', on_delete=models.SET_NULL, null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_applied', '-created_at']`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#e0e0e0] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[#e0e0e0]">
          <div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-[#0f62fe]" />
              <h2 className="text-base font-semibold text-[#161616] uppercase tracking-tight font-['IBM_Plex_Sans']">
                Django REST Framework Integration
              </h2>
            </div>
            <p className="text-xs text-[#525252] mt-1">
              Architecture and serialized contract connecting this React frontend to the Django backend
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[11px] text-[#525252] block">Django ORM Status:</span>
              <span className="text-xs font-semibold text-[#24a148] flex items-center justify-end font-['IBM_Plex_Mono']">
                <span className="w-2 h-2 bg-[#24a148] mr-1.5 inline-block"></span>
                ACTIVE (Synced: {lastSyncTime})
              </span>
            </div>
            <button
              type="button"
              onClick={handleSimulateSync}
              disabled={isSyncing}
              className="h-9 px-3 bg-[#161616] hover:bg-[#262626] text-white text-xs font-medium flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Pinging...' : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="mt-4 flex border border-[#8d8d8d] bg-[#f4f4f4] w-fit text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('endpoints')}
            className={`px-4 py-1.5 font-medium ${
              activeTab === 'endpoints' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#e0e0e0]'
            }`}
          >
            REST Endpoints
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('models')}
            className={`px-4 py-1.5 font-medium border-l border-r border-[#8d8d8d] ${
              activeTab === 'models' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#e0e0e0]'
            }`}
          >
            Django ORM Schema
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('payload')}
            className={`px-4 py-1.5 font-medium ${
              activeTab === 'payload' ? 'bg-[#0f62fe] text-white' : 'text-[#525252] hover:bg-[#e0e0e0]'
            }`}
          >
            Live JSON Stream ({applications.length} items)
          </button>
        </div>
      </div>

      {/* Tab 1: REST Endpoints */}
      {activeTab === 'endpoints' && (
        <div className="bg-white border border-[#e0e0e0]">
          <div className="p-4 bg-[#f4f4f4] border-b border-[#e0e0e0] flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#161616]">
              Configured API Endpoints (Django REST Framework v3.15)
            </span>
            <span className="text-[11px] font-['IBM_Plex_Mono'] text-[#525252]">Token / Session Auth</span>
          </div>

          <div className="divide-y divide-[#e0e0e0] font-['IBM_Plex_Mono'] text-xs">
            <div className="p-3 flex items-start justify-between hover:bg-[#fafafa]">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-1.5 py-0.5 bg-[#defbe6] text-[#0e6027] font-bold text-[10px]">
                    GET
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#edf5ff] text-[#0043ce] font-bold text-[10px]">
                    POST
                  </span>
                  <span className="text-[#161616] font-semibold">/api/v1/applications/</span>
                </div>
                <p className="text-[11px] font-['IBM_Plex_Sans'] text-[#525252]">
                  List all job applications with filtering (`?status=INTERVIEW&priority=HIGH&search=IBM`) and pagination.
                </p>
              </div>
              <span className="text-[11px] text-[#24a148]">200 OK</span>
            </div>

            <div className="p-3 flex items-start justify-between hover:bg-[#fafafa]">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-1.5 py-0.5 bg-[#defbe6] text-[#0e6027] font-bold text-[10px]">
                    GET
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#fef3d6] text-[#7a4f00] font-bold text-[10px]">
                    PUT
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#fff1f1] text-[#a2191f] font-bold text-[10px]">
                    DELETE
                  </span>
                  <span className="text-[#161616] font-semibold">/api/v1/applications/&lt;id&gt;/</span>
                </div>
                <p className="text-[11px] font-['IBM_Plex_Sans'] text-[#525252]">
                  Retrieve, update status, stage progression, or remove application instance.
                </p>
              </div>
              <span className="text-[11px] text-[#24a148]">200 OK</span>
            </div>

            <div className="p-3 flex items-start justify-between hover:bg-[#fafafa]">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-1.5 py-0.5 bg-[#edf5ff] text-[#0043ce] font-bold text-[10px]">
                    POST
                  </span>
                  <span className="text-[#161616] font-semibold">/api/v1/applications/bulk_action/</span>
                </div>
                <p className="text-[11px] font-['IBM_Plex_Sans'] text-[#525252]">
                  Handles multi-row batch actions (bulk delete, bulk status change to OFFER/REJECTED).
                </p>
              </div>
              <span className="text-[11px] text-[#24a148]">200 OK</span>
            </div>

            <div className="p-3 flex items-start justify-between hover:bg-[#fafafa]">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-1.5 py-0.5 bg-[#defbe6] text-[#0e6027] font-bold text-[10px]">
                    GET
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#edf5ff] text-[#0043ce] font-bold text-[10px]">
                    POST
                  </span>
                  <span className="text-[#161616] font-semibold">/api/v1/resumes/</span>
                </div>
                <p className="text-[11px] font-['IBM_Plex_Sans'] text-[#525252]">
                  Multipart file upload endpoint managing tailored resumes and version hashes.
                </p>
              </div>
              <span className="text-[11px] text-[#24a148]">200 OK</span>
            </div>

            <div className="p-3 flex items-start justify-between hover:bg-[#fafafa]">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-1.5 py-0.5 bg-[#defbe6] text-[#0e6027] font-bold text-[10px]">
                    GET
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#edf5ff] text-[#0043ce] font-bold text-[10px]">
                    POST
                  </span>
                  <span className="text-[#161616] font-semibold">/api/v1/reminders/</span>
                </div>
                <p className="text-[11px] font-['IBM_Plex_Sans'] text-[#525252]">
                  Smart reminders and notifications feed with overdue filters and snooze mutations.
                </p>
              </div>
              <span className="text-[11px] text-[#24a148]">200 OK</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Django ORM Schema */}
      {activeTab === 'models' && (
        <div className="bg-[#161616] text-[#f4f4f4] border border-[#393939] p-4 relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#393939]">
            <span className="text-xs font-['IBM_Plex_Mono'] text-[#a8a8a8]">
              backend/aplikante_core/models.py
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(djangoModelCode)}
              className="px-2 py-1 bg-[#262626] hover:bg-[#393939] text-xs font-['IBM_Plex_Mono'] flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#24a148]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-xs font-['IBM_Plex_Mono'] text-[#42be65] overflow-x-auto leading-relaxed">
            {djangoModelCode}
          </pre>
        </div>
      )}

      {/* Tab 3: Live JSON Payload */}
      {activeTab === 'payload' && (
        <div className="bg-[#161616] text-[#f4f4f4] border border-[#393939] p-4">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#393939]">
            <span className="text-xs font-['IBM_Plex_Mono'] text-[#a8a8a8]">
              Serialized REST Response: Array[{applications.length}]
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(JSON.stringify(applications, null, 2))}
              className="px-2 py-1 bg-[#262626] hover:bg-[#393939] text-xs font-['IBM_Plex_Mono'] flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#24a148]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          <pre className="text-xs font-['IBM_Plex_Mono'] text-[#78a9ff] max-h-96 overflow-y-auto overflow-x-auto leading-relaxed">
            {JSON.stringify(applications.slice(0, 3), null, 2)}
          </pre>
          <div className="pt-2 mt-2 border-t border-[#393939] text-[11px] text-[#8d8d8d]">
            Showing first 3 records. Ready for DRF Serializer parsing.
          </div>
        </div>
      )}
    </div>
  );
};
