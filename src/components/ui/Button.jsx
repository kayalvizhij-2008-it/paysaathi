import React from 'react';

/**
 * Reusable Button component for PaySaathi Design System
 * Variants: primary, secondary, ghost, teal, gold, outline, danger
 * Sizes: sm, md, lg, icon
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  leftIcon,
  rightIcon,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'relative inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B14] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.97]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-1.5 h-8.5',
    md: 'text-xs sm:text-sm px-5 py-2.5 rounded-xl gap-2 h-10.5',
    lg: 'text-sm sm:text-base px-7 py-3.5 rounded-2xl gap-2.5 h-12.5',
    icon: 'p-2 rounded-xl h-9.5 w-9.5 justify-center'
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#00F0FF] via-[#06B6D4] to-[#0284C7] text-[#070B14] font-black shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.65)] hover:scale-[1.02] border border-[#00F0FF]/60',
    secondary: 'bg-[#0F172A]/90 hover:bg-[#1E293B] text-[#F8FAFC] border border-white/[0.12] hover:border-[#00F0FF]/50 shadow-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]',
    teal: 'bg-gradient-to-r from-[#10B981] to-[#0D9488] text-[#070B14] font-black shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:scale-[1.02] border border-[#10B981]/50',
    gold: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#070B14] font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-[1.02] border border-[#F59E0B]/50',
    ghost: 'bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.06]',
    outline: 'bg-transparent text-[#00F0FF] border border-[#00F0FF]/40 hover:bg-[#00F0FF]/10 hover:border-[#00F0FF]',
    danger: 'bg-gradient-to-r from-[#F43F5E] to-[#E11D48] text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)]',
    accent: 'bg-gradient-to-r from-[#00F0FF] to-[#10B981] text-[#070B14] font-black shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
