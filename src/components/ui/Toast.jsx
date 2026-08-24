import React from 'react';

/**
 * Toast Notification banner
 * Types: success, error, warning, info
 */
export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const typeConfig = {
    success: {
      bg: 'bg-[#121214]',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      icon: 'check_circle',
      shadow: 'shadow-[0_10px_30px_rgba(16,185,129,0.25)]'
    },
    error: {
      bg: 'bg-[#2A1017]',
      border: 'border-[#E11D3C]/60',
      text: 'text-[#E11D3C]',
      icon: 'error',
      shadow: 'shadow-[0_10px_30px_rgba(225,29,60,0.35)]'
    },
    warning: {
      bg: 'bg-[#1C1C1F]',
      border: 'border-[#C81E3A]/40',
      text: 'text-[#F5F5F7]',
      icon: 'warning',
      shadow: 'shadow-[0_10px_30px_rgba(200,30,58,0.25)]'
    },
    info: {
      bg: 'bg-[#121214]',
      border: 'border-white/[0.15]',
      text: 'text-[#F5F5F7]',
      icon: 'info',
      shadow: 'shadow-xl'
    }
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md">
      <div
        className={`px-4 py-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 ${config.bg} ${config.border} ${config.text} ${config.shadow} backdrop-blur-xl`}
      >
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-lg material-symbols-fill shrink-0">
            {config.icon}
          </span>
          <span className="text-[#F5F5F7] font-medium leading-tight">{message}</span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#9A9AA3] hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>
    </div>
  );
}
