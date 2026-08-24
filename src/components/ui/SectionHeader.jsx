import React from 'react';
import Badge from './Badge';

/**
 * Reusable Section Header with eyebrow badge, display heading, and supporting copy
 */
export default function SectionHeader({
  eyebrow,
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
        <Badge status="accent" size="lg" className="shadow-sm">
          {eyebrow}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F5F7] tracking-tight leading-[1.15]">
        {title}{' '}
        {highlightText && (
          <span className="bg-gradient-to-r from-[#E11D3C] via-[#C81E3A] to-[#F5F5F7] bg-clip-text text-transparent text-glow">
            {highlightText}
          </span>
        )}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-[#9A9AA3] leading-relaxed max-w-2xl font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
