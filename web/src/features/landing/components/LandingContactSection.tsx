import type React from 'react';
import { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Mail, HelpCircle } from 'lucide-react';
import { useToasts } from '../../../shared/context/toast-context';

export const LandingContactSection: React.FC = () => {
  const { showToast } = useToasts();

  // 5-State form management: initial, loading, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'FEEDBACK',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid work or personal email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter a brief message or feedback description.');
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast(
        'success',
        'Message Dispatched',
        `Thank you ${formData.name}! Your inquiry regarding ${formData.topic} has been logged.`
      );
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', topic: 'FEEDBACK', message: '' });
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <section id="contact" className="w-full bg-[#161616] py-20 px-4 sm:px-6 border-b border-[#262626]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-['IBM_Plex_Mono'] text-[#0f62fe] uppercase tracking-wider">
            <span>[ SECTION 05 ]</span>
            <span>•</span>
            <span>COMMUNICATION & COMMUNITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-['IBM_Plex_Sans']">
            Get in touch with the <span className="font-semibold text-white">team.</span>
          </h2>
          <p className="text-sm text-[#a8a8a8] font-light leading-relaxed">
            Have questions about self-hosting, Django REST endpoints, or want to suggest an ATS feature? Submit your dispatch below or connect via GitHub.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form (Zero-Radius Carbon v11) */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#262626] p-6 sm:p-8 shadow-2xl">
            {isSubmitted ? (
              <div 
                className="py-12 text-center space-y-4"
                role="status"
                aria-live="polite"
              >
                <div className="w-12 h-12 bg-[#defbe6] text-[#24a148] flex items-center justify-center mx-auto border border-[#24a148]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white font-['IBM_Plex_Sans']">
                    Dispatch Received
                  </h3>
                  <p className="text-xs text-[#a8a8a8] font-light max-w-sm mx-auto">
                    Your inquiry has been queued for review. You can also track updates on our GitHub repository.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-[#262626] hover:bg-[#333333] text-white text-xs font-['IBM_Plex_Mono'] uppercase tracking-wider border border-[#525252] transition-colors focus-visible:outline-2 focus-visible:outline-[#0f62fe]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Error Banner */}
                {errorMessage && (
                  <div
                    className="p-3 bg-[#fff1f1] border-l-4 border-[#da1e28] text-[#a2191f] text-xs font-medium"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Name Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#c6c6c6] font-['IBM_Plex_Sans']"
                  >
                    Full Name <span className="text-[#da1e28]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-3 bg-[#1c1c1c] border-b-2 border-[#525252] text-xs text-white placeholder-[#6f6f6f] focus:border-[#0f62fe] focus:bg-[#262626] focus:outline-none transition-colors font-['IBM_Plex_Sans']"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[#c6c6c6] font-['IBM_Plex_Sans']"
                  >
                    Work / Contact Email <span className="text-[#da1e28]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. alex.vance@engineering.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3 bg-[#1c1c1c] border-b-2 border-[#525252] text-xs text-white placeholder-[#6f6f6f] focus:border-[#0f62fe] focus:bg-[#262626] focus:outline-none transition-colors font-['IBM_Plex_Sans']"
                  />
                </div>

                {/* Topic Select */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-medium text-[#c6c6c6] font-['IBM_Plex_Sans']"
                  >
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full h-10 px-3 bg-[#1c1c1c] border-b-2 border-[#525252] text-xs text-white focus:border-[#0f62fe] focus:bg-[#262626] focus:outline-none transition-colors font-['IBM_Plex_Mono']"
                  >
                    <option value="FEEDBACK">Product Feedback / Feature Request</option>
                    <option value="ENTERPRISE">Self-Hosting & Enterprise Setup</option>
                    <option value="API">Django REST API Integration</option>
                    <option value="SECURITY">Security & Vulnerability Report</option>
                    <option value="OTHER">General Developer Inquiry</option>
                  </select>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#c6c6c6] font-['IBM_Plex_Sans']"
                  >
                    Message / Inquiries <span className="text-[#da1e28]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Share your feedback, bug details, or deployment requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-[#1c1c1c] border-b-2 border-[#525252] text-xs text-white placeholder-[#6f6f6f] focus:border-[#0f62fe] focus:bg-[#262626] focus:outline-none transition-colors font-['IBM_Plex_Sans'] resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] disabled:bg-[#393939] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 font-['IBM_Plex_Mono'] transition-colors focus-visible:outline-2 focus-visible:outline-white"
                >
                  {isSubmitting ? (
                    <span>Dispatching Transmission...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Dispatch</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Channels & Open Source Context */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channels Box */}
            <div className="bg-[#121212] border border-[#262626] p-6 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a8a8a8] font-['IBM_Plex_Mono']">
                Direct Channels
              </h3>
              
              <div className="space-y-3">
                <a
                  href="https://github.com/deJames-13/aplikante"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-[#1c1c1c] hover:bg-[#262626] border border-[#333333] transition-colors group"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:text-[#0f62fe] fill-current shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <div>
                    <div className="text-xs font-medium text-white group-hover:text-[#0f62fe]">
                      GitHub Repository
                    </div>
                    <div className="text-[11px] text-[#8d8d8d]">
                      Open issues, view source code, and submit PRs
                    </div>
                  </div>
                </a>

                <div className="flex items-center space-x-3 p-3 bg-[#1c1c1c] border border-[#333333]">
                  <Mail className="w-5 h-5 text-[#8a3ffc]" />
                  <div>
                    <div className="text-xs font-medium text-white">
                      Author & Maintainer
                    </div>
                    <div className="text-[11px] text-[#8d8d8d]">
                      Derick Espinosa • MIT License
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-[#1c1c1c] border border-[#333333]">
                  <HelpCircle className="w-5 h-5 text-[#24a148]" />
                  <div>
                    <div className="text-xs font-medium text-white">
                      Zero-Telemetry Local Storage
                    </div>
                    <div className="text-[11px] text-[#8d8d8d]">
                      All mock data persists strictly in your browser
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Standards Notice */}
            <div className="p-4 bg-[#1a1a1a] border border-[#333333] space-y-2 text-xs font-['IBM_Plex_Mono']">
              <div className="flex items-center space-x-2 text-[#e0e0e0]">
                <MessageSquare className="w-4 h-4 text-[#0f62fe]" />
                <span className="font-semibold">ENGINEERING DISPATCH PROTOCOL</span>
              </div>
              <p className="text-[11px] text-[#8d8d8d] leading-relaxed">
                Aplikante adheres to WCAG 2.1 AA accessibility guidelines. All interactive form controls guarantee visible 2px focus outlines and state feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
