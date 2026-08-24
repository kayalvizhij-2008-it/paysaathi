import React from 'react';

/**
 * Reusable Badge & Status Pill component
 * Status: verified, pending, discrepancy, review, neutral, cyan, gold, teal
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
    sm: 'text-[10px] px-2 py-0.5 rounded-md gap-1 font-mono',
    md: 'text-xs px-2.5 py-1 rounded-full gap-1.5',
    lg: 'text-xs px-3.5 py-1.5 rounded-full gap-2'
  };

  const statusStyles = {
    verified: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    teal: 'bg-teal-500/15 text-teal-300 border border-teal-500/30',
    pending: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    discrepancy: 'bg-[#F43F5E]/15 text-[#F43F5E] border border-[#F43F5E]/40',
    review: 'bg-red-500/15 text-red-400 border border-red-500/30',
    cyan: 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40',
    gold: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
    accent: 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30',
    neutral: 'bg-white/[0.05] text-[#94A3B8] border border-white/[0.08]',
    pill: 'bg-[#0F172A] text-[#F8FAFC] border border-white/[0.1]'
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
