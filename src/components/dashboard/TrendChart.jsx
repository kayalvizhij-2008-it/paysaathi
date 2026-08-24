import React, { useState } from 'react';
import { MONTHLY_SALARY_TREND } from '../../utils/sampleData';
import { formatINR } from '../../utils/wageCalculator';

export default function TrendChart() {
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const maxVal = 22000;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/[0.08]">
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#F5F5F7]">
            6-Month Wage Trajectory & Discrepancy Map
          </h3>
          <p className="text-xs text-[#9A9AA3]">
            Deterministic comparison of statutory entitlements vs actual bank receipts.
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5F5F7]"></span>
            <span className="text-[#9A9AA3]">Expected Benchmark</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E11D3C]"></span>
            <span className="text-[#9A9AA3]">Discrepancy / Shortfall</span>
          </div>
        </div>
      </div>

      {/* Bar Comparison Chart Visualizer */}
      <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2">
        {MONTHLY_SALARY_TREND.map((item) => {
          const expectedHeight = Math.round((item.expected / maxVal) * 100);
          const actualHeight = Math.round((item.actual / maxVal) * 100);
          const hasDiscrepancy = item.status === 'DISCREPANCY';

          return (
            <div
              key={item.month}
              onMouseEnter={() => setHoveredMonth(item)}
              onMouseLeave={() => setHoveredMonth(null)}
              className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
            >
              {/* Bars container */}
              <div className="w-full flex items-end justify-center gap-1.5 h-38 relative">
                
                {/* Expected Bar */}
                <div
                  style={{ height: `${expectedHeight}%` }}
                  className="w-3 sm:w-5 bg-white/[0.25] group-hover:bg-white/[0.5] rounded-t-md transition-all"
                  title={`Expected: ${formatINR(item.expected)}`}
                ></div>

                {/* Actual Bar */}
                <div
                  style={{ height: `${actualHeight}%` }}
                  className={`w-3 sm:w-5 rounded-t-md transition-all ${
                    hasDiscrepancy
                      ? 'bg-gradient-to-t from-[#7A0F22] via-[#C81E3A] to-[#E11D3C] shadow-[0_0_12px_rgba(225,29,60,0.5)] group-hover:scale-105'
                      : 'bg-emerald-400 opacity-80 group-hover:opacity-100'
                  }`}
                  title={`Actual: ${formatINR(item.actual)}`}
                ></div>

                {/* Floating Warning Flag if discrepancy */}
                {hasDiscrepancy && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#E11D3C] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(225,29,60,0.6)] animate-bounce font-mono">
                    -₹2.3k
                  </div>
                )}

              </div>

              {/* Month label */}
              <span className="text-[10px] sm:text-xs text-[#9A9AA3] group-hover:text-[#F5F5F7] font-medium truncate max-w-[60px] text-center font-mono">
                {item.month.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hover Info Tooltip Banner */}
      <div className="p-3.5 rounded-2xl bg-[#121214] border border-white/[0.06] text-xs flex justify-between items-center">
        {hoveredMonth ? (
          <>
            <span className="text-[#F5F5F7] font-bold">{hoveredMonth.month}:</span>
            <div className="flex gap-4 font-mono">
              <span className="text-[#9A9AA3]">Expected: {formatINR(hoveredMonth.expected)}</span>
              <span className={hoveredMonth.status === 'DISCREPANCY' ? 'text-[#E11D3C] font-extrabold' : 'text-emerald-400 font-bold'}>
                Actual: {formatINR(hoveredMonth.actual)}
              </span>
            </div>
          </>
        ) : (
          <span className="text-[#9A9AA3] italic">
            Hover over any month to inspect detailed payout vs statutory expected variance.
          </span>
        )}
      </div>

    </div>
  );
}
