import React from 'react';

/**
 * Reusable Badge & Status Pill component
 * Status: verified, pending, discrepancy, review, neutral, accent
 */
export default function Badge({
  children,
  status = 'neutral',
  size = 'md',
  icon,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-bold tracking-wider uppercase transition-colors';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs px-2.5 py-1 rounded-full gap-1.5',
    lg: 'text-xs px-3.5 py-1.5 rounded-full gap-2'
  };

  const statusStyles = {
    verified: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    pending: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    discrepancy: 'bg-[#C81E3A]/20 text-[#E11D3C] border border-[#E11D3C]/40',
    review: 'bg-red-500/15 text-red-400 border border-red-500/30',
    accent: 'bg-[#C81E3A]/15 text-[#E11D3C] border border-[#C81E3A]/30',
    neutral: 'bg-white/[0.05] text-[#9A9AA3] border border-white/[0.08]',
    pill: 'bg-[#1C1C1F] text-[#F5F5F7] border border-white/[0.1]'
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${statusStyles[status] || statusStyles.neutral} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
