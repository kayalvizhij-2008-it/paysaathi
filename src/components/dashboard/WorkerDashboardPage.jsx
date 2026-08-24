import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/wageCalculator';
import TrendChart from './TrendChart';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function WorkerDashboardPage() {
  const { setActivePage, workerProfile, startPayslipAnalysis, t } = useApp();

  const recentPayslips = [
    {
      id: 'slip-oct',
      month: 'October 2024',
      employer: 'Apex Facility Services Pvt. Ltd.',
      site: 'Sterling Heights Tower B',
      expected: 18500,
      actual: 16200,
      status: 'DISCREPANCY',
      statusText: 'Potential Discrepancy (-₹2,300)'
    },
    {
      id: 'slip-sep',
      month: 'September 2024',
      employer: 'Apex Facility Services Pvt. Ltd.',
      site: 'Sterling Heights Tower B',
      expected: 18500,
      actual: 18500,
      status: 'VERIFIED',
      statusText: 'Verified Consistent'
    },
    {
      id: 'slip-aug',
      month: 'August 2024',
      employer: 'Apex Facility Services Pvt. Ltd.',
      site: 'Sterling Heights Tower B',
      expected: 18500,
      actual: 18500,
      status: 'VERIFIED',
      statusText: 'Verified Consistent'
    }
  ];

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#070B14] relative overflow-hidden">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#10B981]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-breathe"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Dashboard Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#00F0FF] p-0.5 bg-[#0F172A]">
              <img src={workerProfile.avatarUrl} alt={workerProfile.name} className="w-full h-full object-cover rounded-[12px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">Welcome back, {workerProfile.name}</h1>
                <span className="material-symbols-outlined text-emerald-400 text-base material-symbols-fill">verified</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5 font-mono">
                {workerProfile.role} • {workerProfile.currentEmployer} • ID: <span className="font-bold text-[#F8FAFC]">{workerProfile.workerId}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActivePage('salary-check')}
              leftIcon={<span className="material-symbols-outlined text-sm text-[#00F0FF]">calculate</span>}
            >
              Check Rate
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => { setActivePage('payslip-verify'); startPayslipAnalysis(null, true); }}
              leftIcon={<span className="material-symbols-outlined text-sm">verified_user</span>}
            >
              Verify New Slip
            </Button>
          </div>
        </div>

        {/* 4 Top KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-card rounded-3xl p-5 border border-white/[0.08] shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center text-[#94A3B8] text-xs font-bold uppercase tracking-wider font-mono">
              <span>Expected Entitlement</span>
              <span className="material-symbols-outlined text-[#F8FAFC] text-lg">calculate</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-black text-[#F8FAFC] font-mono">₹18,500</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">22 Days + 24h OT Scheduled</span>
          </div>

          <div className="glass-card rounded-3xl p-5 border border-white/[0.08] shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center text-[#94A3B8] text-xs font-bold uppercase tracking-wider font-mono">
              <span>Actual Received</span>
              <span className="material-symbols-outlined text-[#F8FAFC] text-lg">account_balance</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-black text-[#F8FAFC] font-mono">₹16,200</span>
            </div>
            <span className="text-[11px] text-[#94A3B8] font-mono">Deposited to {workerProfile.bankAccountMasked}</span>
          </div>

          <div className="glass-card rounded-3xl p-5 border border-white/[0.08] shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center text-[#94A3B8] text-xs font-bold uppercase tracking-wider font-mono">
              <span>Logged Overtime</span>
              <span className="material-symbols-outlined text-[#00F0FF] text-lg">timer</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-black text-[#00F0FF] font-mono">24 <span className="text-sm font-normal text-[#94A3B8]">hrs</span></span>
            </div>
            <span className="text-[11px] text-[#00F0FF] font-bold">Statutory 2.0x Double Rate</span>
          </div>

          <div className="glass-card rounded-3xl p-5 border border-[#F43F5E]/40 bg-gradient-to-br from-[#1A1015] to-[#0A0F1D] shadow-[0_0_25px_rgba(244,63,94,0.15)] flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center text-[#F43F5E] text-xs font-black uppercase tracking-wider font-mono">
              <span>Audit Verdict</span>
              <span className="material-symbols-outlined text-[#F43F5E] text-lg material-symbols-fill">warning</span>
            </div>
            <div className="my-3">
              <span className="text-2xl font-black text-[#F43F5E]">Difference Flagged</span>
            </div>
            <button
              onClick={() => setActivePage('worker-action')}
              className="text-[11px] font-bold text-[#F8FAFC] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>1 Discrepancy (-₹2,300) • Resolve</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>

        {/* 6-Month Trend Visualizer */}
        <TrendChart />

        {/* Action Center & Recent Slips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Payslips (Spans 8 cols) */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-7 border border-white/[0.08] shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3.5 border-b border-white/[0.08]">
              <h3 className="text-sm sm:text-base font-black text-[#F8FAFC]">Recent Audited Documents</h3>
              <button
                onClick={() => setActivePage('payslip-verify')}
                className="text-xs text-[#00F0FF] hover:underline font-bold cursor-pointer flex items-center gap-1"
              >
                <span>Upload New Slip</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="space-y-3">
              {recentPayslips.map((slip) => {
                const isDiscrepancy = slip.status === 'DISCREPANCY';
                return (
                  <div
                    key={slip.id}
                    className="p-4 rounded-2xl bg-[#0A0F1D] border border-white/[0.06] hover:border-[#00F0FF]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-xs font-bold text-[#F8FAFC]">{slip.month}</h4>
                        <Badge
                          status={isDiscrepancy ? 'discrepancy' : 'verified'}
                          size="sm"
                        >
                          {isDiscrepancy ? 'Discrepancy Detected' : 'Verified Consistent'}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-[#94A3B8] mt-1">{slip.employer} • {slip.site}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-[#F8FAFC]">{formatINR(slip.actual)}</span>
                        <span className="text-[10px] text-[#94A3B8] block font-mono">Exp: {formatINR(slip.expected)}</span>
                      </div>

                      <Button
                        variant={isDiscrepancy ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => {
                          setActivePage(isDiscrepancy ? 'worker-action' : 'salary-passport');
                        }}
                      >
                        {isDiscrepancy ? 'Resolve' : 'View'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Worker Action Center (Spans 4 cols) */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-6 sm:p-7 border border-white/[0.08] shadow-2xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#F8FAFC] pb-3.5 border-b border-white/[0.08]">
                Discrepancy Action Desk
              </h3>

              <div className="py-3 space-y-3">
                <div className="p-4 rounded-2xl bg-[#1A1015] border border-[#F43F5E]/30 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-[#F43F5E] font-black">
                    <span className="material-symbols-outlined text-base">report</span>
                    <span>October OT Multiplier Shortfall</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    ₹2,300 variance identified due to flat 1.0x OT rate and non-stipulated deduction.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActivePage('worker-action')}
                    className="w-full mt-1"
                  >
                    Generate Resolution Notice
                  </Button>
                </div>

                <div className="p-4 rounded-2xl bg-[#0A0F1D] border border-white/[0.06] text-xs space-y-2">
                  <span className="font-black text-[#F8FAFC] block">Portable Salary Passport</span>
                  <p className="text-[11px] text-[#94A3B8]">
                    Share your verified 98/100 trust rating with prospective contractors.
                  </p>
                  <button
                    onClick={() => setActivePage('salary-passport')}
                    className="text-[#00F0FF] hover:underline font-bold text-xs flex items-center gap-1 pt-0.5 cursor-pointer"
                  >
                    <span>Open Passport Card</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-[11px] text-[#94A3B8]">
              {t.rulesVerifyAiExplains}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
