import React from 'react';
import Badge from './Badge';

/**
 * Reusable Section Header with eyebrow badge, display heading, and supporting copy
 */
export default function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  highlightText,
  description,
  align = 'center',
  className = ''
}) {
  const alignClass = {
    center: 'text-center items-center mx-auto',
    left: 'text-left items-start',
    right: 'text-right items-end'
  }[align] || 'text-center items-center mx-auto';

  return (
    <div className={`max-w-3xl flex flex-col space-y-3.5 ${alignClass} ${className}`}>
      {eyebrow && (
        <Badge
          status="cyan"
          size="lg"
          className="shadow-sm font-mono tracking-wider"
          icon={eyebrowIcon ? <span className="material-symbols-outlined text-sm">{eyebrowIcon}</span> : undefined}
        >
          {eyebrow}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC] tracking-tight leading-[1.15]">
        {title}{' '}
        {highlightText && (
          <span className="bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent text-cyan-glow">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
