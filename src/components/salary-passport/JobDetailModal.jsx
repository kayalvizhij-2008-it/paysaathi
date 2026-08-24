import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/wageCalculator';

export default function JobDetailModal() {
  const { selectedJobRecord, setSelectedJobRecord } = useApp();

  if (!selectedJobRecord) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A0F1D] border border-[#00F0FF]/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#F8FAFC]">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedJobRecord(null)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
            <span className="material-symbols-outlined text-2xl">badge</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00F0FF] font-mono">Verified Work Experience</span>
            <h3 className="text-xl font-black text-[#F8FAFC]">{selectedJobRecord.role}</h3>
            <p className="text-xs text-[#94A3B8]">{selectedJobRecord.company} • {selectedJobRecord.location}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-4 mb-6">
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/[0.06]">
              <span className="text-[#94A3B8] block text-[10px] uppercase font-bold font-mono">Verified Monthly Wage</span>
              <span className="text-base font-black text-[#00F0FF] font-mono">{formatINR(selectedJobRecord.monthlyPay)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/[0.06]">
              <span className="text-[#94A3B8] block text-[10px] uppercase font-bold font-mono">Verified Attendance</span>
              <span className="text-base font-black text-emerald-400 font-mono">{selectedJobRecord.attendanceRate}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/[0.06]">
              <span className="text-[#94A3B8] block text-[10px] uppercase font-bold font-mono">Audited Payslips</span>
              <span className="text-base font-black text-[#F8FAFC] font-mono">{selectedJobRecord.verifiedPayslips} Monthly Slips</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/[0.06]">
              <span className="text-[#94A3B8] block text-[10px] uppercase font-bold font-mono">Tenure Duration</span>
              <span className="text-base font-black text-[#F8FAFC] font-mono">{selectedJobRecord.tenure}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.06] text-xs">
            <span className="text-[#94A3B8] block text-[10px] uppercase font-bold font-mono mb-1">Site Responsibilities & Performance Record</span>
            <p className="text-[#F8FAFC] leading-relaxed italic">
              “{selectedJobRecord.highlights}”
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-400 font-semibold">
            <span className="material-symbols-outlined text-base material-symbols-fill">verified_user</span>
            <span>Cryptographically sealed & verifiable via PaySaathi QR verification</span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
          <button
            onClick={() => setSelectedJobRecord(null)}
            className="px-5 py-2.5 rounded-xl bg-[#00F0FF] text-[#070B14] font-black text-xs shadow hover:scale-105 transition-transform cursor-pointer"
          >
            Close Record
          </button>
        </div>

      </div>
    </div>
  );
}
