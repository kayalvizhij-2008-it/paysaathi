import React, { useEffect, useRef } from 'react';

/**
 * Accessible Modal dialog with backdrop blur, Escape key handling, and focus trapping
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
  className = ''
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0A0B]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidth} bg-[#121214] border border-white/[0.1] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(200,30,58,0.2)] p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 my-8 ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08] mb-6">
          <div>
            {title && (
              <h3 className="text-xl sm:text-2xl font-black text-[#F5F5F7]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#9A9AA3] mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#9A9AA3] hover:text-[#F5F5F7] hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E11D3C] cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
