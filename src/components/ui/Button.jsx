import React from 'react';

/**
 * Reusable Button component for PaySaathi Design System
 * Variants: primary, secondary, ghost, danger, outline
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
  const baseStyles = 'relative inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-1.5 h-8',
    md: 'text-xs sm:text-sm px-5 py-2.5 rounded-xl gap-2 h-10',
    lg: 'text-sm sm:text-base px-7 py-3.5 rounded-2xl gap-2.5 h-12',
    icon: 'p-2 rounded-xl h-9 w-9 justify-center'
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#C81E3A] via-[#E11D3C] to-[#7A0F22] text-[#F5F5F7] shadow-[0_0_20px_rgba(225,29,60,0.35)] hover:shadow-[0_0_30px_rgba(225,29,60,0.6)] hover:scale-[1.02] border border-[#E11D3C]/40',
    secondary: 'bg-[#1C1C1F]/80 hover:bg-[#2A1017] text-[#F5F5F7] border border-white/[0.1] hover:border-[#E11D3C]/40 shadow-sm hover:shadow-[0_0_16px_rgba(200,30,58,0.2)]',
    ghost: 'bg-transparent text-[#9A9AA3] hover:text-[#F5F5F7] hover:bg-white/[0.04]',
    outline: 'bg-transparent text-[#F5F5F7] border border-white/[0.15] hover:border-[#E11D3C] hover:text-white hover:bg-[#E11D3C]/10',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    accent: 'bg-gradient-to-r from-[#E11D3C] to-[#C81E3A] text-white shadow-lg hover:shadow-[0_0_25px_rgba(225,29,60,0.5)]'
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
