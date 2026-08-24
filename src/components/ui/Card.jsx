import React from 'react';

/**
 * Reusable Card component for PaySaathi Design System
 * Variants: default, glass, metric, feature, highlight
 */
export default function Card({
  children,
  variant = 'default',
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-3xl transition-all duration-300 relative overflow-hidden';

  const variantStyles = {
    default: 'bg-[#121214] border border-white/[0.08] shadow-xl',
    glass: 'glass-card border border-white/[0.08] shadow-2xl',
    metric: 'bg-gradient-to-b from-[#1C1C1F] to-[#121214] border border-white/[0.08] p-5 shadow-lg',
    feature: 'bg-[#1C1C1F]/60 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl',
    highlight: 'bg-gradient-to-br from-[#2A1017] via-[#1C1C1F] to-[#121214] border border-[#E11D3C]/30 shadow-[0_0_30px_rgba(200,30,58,0.2)]',
    interactive: 'bg-[#121214] border border-white/[0.08] hover:border-[#E11D3C]/40 hover:shadow-[0_0_25px_rgba(225,29,60,0.2)] hover:-translate-y-1 cursor-pointer'
  };

  const hoverStyle = hoverEffect ? 'glass-card-hover' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
