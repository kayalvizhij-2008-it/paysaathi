import React, { useState, useEffect, useRef } from 'react';

/**
 * Linear Progress Bar with glowing fill
 */
export function LinearProgress({ value = 0, max = 100, showLabel = false, className = '' }) {
  const percent = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-[#9A9AA3]">Progress</span>
          <span className="text-[#E11D3C] font-mono">{percent}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-[#1C1C1F] rounded-full overflow-hidden border border-white/[0.06] p-0.5">
        <div
          className="h-full bg-gradient-to-r from-[#C81E3A] via-[#E11D3C] to-[#E11D3C] rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(225,29,60,0.6)]"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

/**
 * Circular Progress Ring (e.g. for speed, score, accuracy)
 */
export function CircularProgress({
  value = 0,
  max = 100,
  size = 72,
  strokeWidth = 6,
  label,
  sublabel,
  className = ''
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(Math.max(value / max, 0), 1);
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#crimsonGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-500 ease-out"
        />
        <defs>
          <linearGradient id="crimsonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C81E3A" />
            <stop offset="100%" stopColor="#E11D3C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {label && <span className="text-sm font-extrabold text-[#F5F5F7] font-mono">{label}</span>}
        {sublabel && <span className="text-[9px] text-[#9A9AA3] uppercase tracking-wider">{sublabel}</span>}
      </div>
    </div>
  );
}

/**
 * Linear Stepper Progress Bar
 */
export function StepperProgress({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Connecting Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#1C1C1F] -translate-y-1/2 -z-0"></div>

        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <div
              key={step.id || stepNum}
              className="relative z-10 flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(stepNum)}
                disabled={!onStepClick}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-[#0A0A0B] shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                    : isCurrent
                    ? 'bg-[#E11D3C] text-white shadow-[0_0_18px_rgba(225,29,60,0.6)] scale-110 border-2 border-[#F5F5F7]'
                    : 'bg-[#1C1C1F] text-[#9A9AA3] border border-white/[0.1]'
                } ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
              >
                {isCompleted ? (
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                ) : (
                  stepNum
                )}
              </button>

              <span
                className={`text-[11px] font-semibold mt-2 tracking-tight whitespace-nowrap ${
                  isCurrent ? 'text-[#E11D3C]' : isCompleted ? 'text-[#F5F5F7]' : 'text-[#9A9AA3]'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Animated Counter component for numbers (counts from 0 to target on viewport entry)
 */
export function AnimatedCounter({
  targetValue,
  prefix = '',
  suffix = '',
  duration = 1400,
  formatter = (v) => v.toLocaleString('en-IN'),
  className = ''
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const target = Number(targetValue);

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(target * easeProgress);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={`font-mono tabular-nums ${className}`}>
      {prefix}{formatter(count)}{suffix}
    </span>
  );
}
