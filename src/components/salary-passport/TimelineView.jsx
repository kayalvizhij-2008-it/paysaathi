import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/wageCalculator';

export default function TimelineView() {
  const { passportRecords, setSelectedJobRecord } = useApp();

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center pb-2 border-b border-white/[0.08]">
        <div>
          <h3 className="text-lg font-bold text-white">Verified Career & Earnings Timeline</h3>
          <p className="text-xs text-[#D7C3AE]">Click any record to inspect verified payslips, attendance, and employer references.</p>
        </div>
        <span className="text-xs font-semibold text-[#FFB955] bg-[#F5A623]/10 px-2.5 py-1 rounded-full border border-[#F5A623]/20">
          {passportRecords.length} Records Verified
        </span>
      </div>

      {/* Timeline Node Chain */}
      <div className="space-y-4">
        {passportRecords.map((job, index) => {
          const isLatest = index === 0;

          return (
            <div
              key={job.id}
              onClick={() => setSelectedJobRecord(job)}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                isLatest
                  ? 'bg-[#251E16] border-[#F5A623]/50 shadow-lg hover:border-[#F5A623]'
                  : 'bg-[#19120A] border-white/[0.08] hover:border-[#F5A623]/40 hover:bg-[#20180F]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left Role & Company */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isLatest
                      ? 'bg-[#F5A623] text-[#121212] font-bold shadow-[0_0_12px_rgba(245,166,35,0.5)]'
                      : 'bg-white/[0.05] text-[#D7C3AE] border border-white/[0.08]'
                  }`}>
                    <span className="material-symbols-outlined text-xl">
                      {isLatest ? 'work' : 'corporate_fare'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#FFB955] transition-colors">
                        {job.role}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.05] text-[#FFB955] border border-white/[0.08]">
                        {job.badge || job.year}
                      </span>
                    </div>

                    <p className="text-xs text-[#D7C3AE] mt-0.5">
                      {job.company} • <span className="text-[#A89886]">{job.location}</span>
                    </p>
                    <p className="text-[11px] text-[#A89886] mt-1 italic">
                      “{job.highlights}”
                    </p>
                  </div>
                </div>

                {/* Right Wage & Status */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A89886] block">Verified Pay</span>
                    <span className="text-lg font-black text-[#FFB955]">
                      {formatINR(job.monthlyPay)}
                      <span className="text-xs font-normal text-[#D7C3AE]">/mo</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#22C55E] font-semibold">
                    <span className="material-symbols-outlined text-sm material-symbols-fill">verified</span>
                    <span>{job.tenure}</span>
                  </div>
                </div>

              </div>

              {/* View Details Prompt on Hover */}
              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-[#D7C3AE]">
                <span>Verified Attendance: <strong className="text-white">{job.attendanceRate}</strong></span>
                <span className="text-[#FFB955] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  <span>Inspect Audit Records</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
