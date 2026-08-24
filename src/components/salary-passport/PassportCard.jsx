import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function PassportCard() {
  const { workerProfile, setIsShareModalOpen, setIsAddJobOpen, t } = useApp();

  return (
    <div className="glass-card rounded-[36px] p-6 sm:p-8 border border-[#00F0FF]/30 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      
      {/* Background Ambient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00F0FF]/15 via-[#10B981]/05 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-[#070B14]/80 to-transparent rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#00F0FF]/50 p-0.5 shadow-lg bg-[#0F172A]">
              <img
                src={workerProfile.avatarUrl}
                alt={workerProfile.name}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-[#F8FAFC]">{workerProfile.name}</h3>
                <span className="material-symbols-outlined text-emerald-400 text-lg material-symbols-fill" title="Identity & KYC Verified">
                  verified
                </span>
              </div>
              <p className="text-xs font-bold text-[#00F0FF]">{workerProfile.role}</p>
              <p className="text-[11px] text-[#94A3B8] font-mono">ID: {workerProfile.workerId} • {workerProfile.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsShareModalOpen(true)}
              leftIcon={<span className="material-symbols-outlined text-sm">qr_code_2</span>}
            >
              Share Passport
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddJobOpen(true)}
              leftIcon={<span className="material-symbols-outlined text-sm">add</span>}
            >
              Add Job
            </Button>
          </div>
        </div>

        {/* 3 Metric Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Trust Score */}
          <div className="bg-[#0A0F1D] rounded-2xl p-5 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-500/50 transition-colors shadow-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] font-mono">
                Verification Score
              </span>
              <span className="material-symbols-outlined text-emerald-400 text-base material-symbols-fill">verified</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-black text-emerald-400 font-mono">{workerProfile.trustScore}</span>
              <span className="text-xs text-[#94A3B8]">/ 100</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">{workerProfile.trustRating}</span>
          </div>

          {/* Tenure */}
          <div className="bg-[#0A0F1D] rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between hover:border-[#00F0FF]/30 transition-colors shadow-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] font-mono">
                Verified Career Tenure
              </span>
              <span className="material-symbols-outlined text-[#00F0FF] text-base">history</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-black text-[#F8FAFC] font-mono">{workerProfile.totalTenureMonths}</span>
              <span className="text-xs text-[#94A3B8]">Months</span>
            </div>
            <span className="text-[11px] text-[#94A3B8] font-semibold">{workerProfile.verificationCount} Audited Slips</span>
          </div>

          {/* Career Growth */}
          <div className="bg-[#0A0F1D] rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between hover:border-[#00F0FF]/30 transition-colors shadow-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] font-mono">
                Cumulative Wage Growth
              </span>
              <span className="material-symbols-outlined text-emerald-400 text-base">trending_up</span>
            </div>
            <div className="flex items-baseline gap-1 my-2">
              <span className="text-3xl font-black text-emerald-400 font-mono">+{workerProfile.careerGrowthPercentage}%</span>
            </div>
            <span className="text-[11px] text-[#94A3B8] font-mono">₹15,000 → ₹22,000/mo</span>
          </div>

        </div>

        {/* Active Employment Status Bar */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00F0FF] text-base">apartment</span>
            <span className="text-[#94A3B8]">Active Deployment:</span>
            <span className="font-bold text-[#F8FAFC]">{workerProfile.currentEmployer}</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/30">
            ● Active Contract Verified
          </span>
        </div>

      </div>

    </div>
  );
}
