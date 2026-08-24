import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/wageCalculator';

export default function TimelineView() {
  const { passportRecords, setSelectedJobRecord } = useApp();

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center pb-2 border-b border-white/[0.08]">
        <div>
          <h3 className="text-lg font-black text-[#F8FAFC]">Verified Career & Earnings Timeline</h3>
          <p className="text-xs text-[#94A3B8]">Click any record to inspect verified payslips, biometric attendance, and contractor references.</p>
        </div>
        <span className="text-xs font-bold text-[#00F0FF] bg-[#0F172A] px-3 py-1 rounded-full border border-[#00F0FF]/30 font-mono">
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
              className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 cursor-pointer relative overflow-hidden group shadow-lg ${
                isLatest
                  ? 'bg-[#0F172A] border-[#00F0FF]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.15)] hover:border-[#00F0FF]'
                  : 'bg-[#0A0F1D] border-white/[0.08] hover:border-[#00F0FF]/40 hover:bg-[#0F172A]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left Role & Company */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isLatest
                      ? 'bg-[#00F0FF] text-[#070B14] font-black shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                      : 'bg-[#0F172A] text-[#94A3B8] border border-white/[0.08]'
                  }`}>
                    <span className="material-symbols-outlined text-2xl">
                      {isLatest ? 'work' : 'corporate_fare'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                        {job.role}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0F172A] text-[#00F0FF] border border-[#00F0FF]/30 font-mono">
                        {job.badge || job.year}
                      </span>
                    </div>

                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {job.company} • <span className="text-[#64748B]">{job.location}</span>
                    </p>
                    <p className="text-[11px] text-[#94A3B8] mt-1 italic">
                      “{job.highlights}”
                    </p>
                  </div>
                </div>

                {/* Right Wage & Status */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">Verified Pay</span>
                    <span className="text-lg font-black text-[#F8FAFC] font-mono">
                      {formatINR(job.monthlyPay)}
                      <span className="text-xs font-normal text-[#94A3B8]">/mo</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                    <span className="material-symbols-outlined text-sm material-symbols-fill">verified</span>
                    <span>{job.tenure}</span>
                  </div>
                </div>

              </div>

              {/* View Details Prompt on Hover */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span>Verified Attendance: <strong className="text-[#F8FAFC]">{job.attendanceRate}</strong></span>
                <span className="text-[#00F0FF] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
