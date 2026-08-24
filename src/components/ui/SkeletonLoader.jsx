import React from 'react';

/**
 * Reusable Skeleton loader for async content
 */
export default function SkeletonLoader({
  className = '',
  variant = 'rectangular', // 'text' | 'circular' | 'rectangular'
  width,
  height,
  count = 1
}) {
  const baseStyle = 'animate-shimmer bg-[#1C1C1F] rounded-xl border border-white/[0.04]';

  const variantStyles = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'w-full h-24 rounded-2xl'
  };

  const style = {
    width: width || undefined,
    height: height || undefined
  };

  if (count > 1) {
    return (
      <div className="space-y-2.5 w-full">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            style={style}
            className={`${baseStyle} ${variantStyles[variant] || variantStyles.rectangular} ${className}`}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={style}
      className={`${baseStyle} ${variantStyles[variant] || variantStyles.rectangular} ${className}`}
    ></div>
  );
}
