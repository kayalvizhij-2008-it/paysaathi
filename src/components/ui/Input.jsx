import React from 'react';

/**
 * Reusable Input component
 * Handles text, number, select, and textarea with focus states and error handling
 */
export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  type = 'text',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#9A9AA3]"
        >
          {label}
        </label>
      )}

      <div className="relative rounded-xl shadow-sm">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9A9AA3]">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          className={`w-full rounded-xl bg-[#121214] border text-[#F5F5F7] placeholder-[#9A9AA3]/50 text-sm px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E11D3C] focus:border-transparent ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${
            error
              ? 'border-[#E11D3C] focus:ring-[#E11D3C]'
              : 'border-white/[0.1] hover:border-white/[0.2]'
          } ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#9A9AA3]">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-[#E11D3C] flex items-center gap-1 font-medium mt-1">
          <span className="material-symbols-outlined text-sm">error</span>
          <span>{error}</span>
        </p>
      )}

      {helperText && !error && (
        <p className="text-xs text-[#9A9AA3] mt-1">{helperText}</p>
      )}
    </div>
  );
}
