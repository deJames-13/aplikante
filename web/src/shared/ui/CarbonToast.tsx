import type React from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';
import { useToasts } from '../context/toast-context';

export const CarbonToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToasts();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm pointer-events-none select-none"
      aria-live="polite"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3 shadow-lg border border-[#8d8d8d] flex items-start justify-between space-x-3 transition-all ${
            toast.type === 'success'
              ? 'bg-[#defbe6] border-l-4 border-[#24a148] text-[#0e6027]'
              : toast.type === 'error'
              ? 'bg-[#fff1f1] border-l-4 border-[#da1e28] text-[#a2191f]'
              : 'bg-[#edf5ff] border-l-4 border-[#0f62fe] text-[#0043ce]'
          }`}
          role="status"
        >
          <div className="flex items-start space-x-2 text-xs">
            {toast.type === 'success' ? (
              <Check className="w-4 h-4 text-[#24a148] flex-shrink-0 mt-0.5" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-[#da1e28] flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-[#0f62fe] flex-shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-semibold block">{toast.title}</span>
              <span className="text-[11px] text-[#393939] leading-tight block">{toast.message}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-[#525252] hover:text-[#161616] p-0.5 focus-visible:outline-2 focus-visible:outline-[#0f62fe]"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
