import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/wageCalculator';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function SalaryResultCard({ result, onReset }) {
  const { setActivePage, handleSaveCalculationToPassport, showToast, t } = useApp();

  const basePercent = Math.round((result.baseSalary / result.grossExpected) * 100) || 75;
  const otPercent = Math.round((result.overtimePay / result.grossExpected) * 100) || 20;
  const otherPercent = Math.max(0, 100 - basePercent - otPercent);

  const handleCopy = () => {
    const text = `PaySaathi Wage Benchmark:\nRole: ${result.roleName} (${result.skillLevel})\nLocation: ${result.cityName}\nDays: ${result.daysWorked} | OT: ${result.overtimeHours} hrs (2.0x)\nExpected Gross: ${result.formattedGross}\n(Base: ${result.formattedBase} + OT: ${result.formattedOT})`;
    navigator.clipboard.writeText(text);
    showToast('Salary Calculation Copied to Clipboard!');
  };

  return (
    <div className="glass-card rounded-[36px] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.15)] border border-[#00F0FF]/30 relative overflow-hidden animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <Badge
            status="cyan"
            size="md"
            icon={<span className="material-symbols-outlined text-sm">verified</span>}
            className="mb-2.5"
          >
            Statutory Wage Intelligence Benchmark
          </Badge>

          <h3 className="text-xl sm:text-2xl font-black text-[#F8FAFC]">
            {result.roleName}
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            {result.cityName}, {result.state} • Skill Category: <span className="font-bold text-[#F8FAFC]">{result.skillLevel}</span>
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onReset}
          leftIcon={<span className="material-symbols-outlined text-base">refresh</span>}
        >
          Recalculate
        </Button>
      </div>

      {/* Main Expected Pay Highlight */}
      <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
            Total Statutory Expected Pay
          </span>
          <div className="text-4xl sm:text-5xl font-black text-[#F8FAFC] tracking-tight mt-1 flex items-baseline justify-center sm:justify-start gap-2 font-mono">
            <span>{result.formattedGross}</span>
            <span className="text-base font-normal text-[#94A3B8]">/ month</span>
          </div>
          <p className="text-xs text-emerald-400 font-bold mt-1.5 flex items-center justify-center sm:justify-start gap-1.5">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>Audited — Minimum Wages Act & Factories Act Sec 59</span>
          </p>
        </div>

        <div className="bg-[#0A0F1D] border border-white/[0.1] p-5 rounded-2xl text-center min-w-[170px] shadow-xl">
          <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider block font-mono">Standard Daily Rate</span>
          <div className="text-2xl font-black text-[#F8FAFC] mt-0.5 font-mono">{formatINR(result.adjustedDailyRate)}</div>
          <span className="text-[10px] text-[#00F0FF] block mt-0.5 font-mono font-bold">~{formatINR(result.hourlyRate)} / hr</span>
        </div>
      </div>

      {/* Breakdown Progress Bars */}
      <div className="space-y-4 mb-8 bg-[#0A0F1D] p-5 rounded-2xl border border-white/[0.06]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">
          Transparent Compensation Breakdown
        </h4>

        {/* Multi-segmented bar */}
        <div className="h-3 w-full bg-[#0F172A] rounded-full overflow-hidden flex border border-white/[0.06]">
          <div style={{ width: `${basePercent}%` }} className="bg-[#F8FAFC]/70" title={`Base: ${basePercent}%`}></div>
          <div style={{ width: `${otPercent}%` }} className="bg-[#00F0FF]" title={`Overtime (2.0x): ${otPercent}%`}></div>
          {otherPercent > 0 && (
            <div style={{ width: `${otherPercent}%` }} className="bg-[#10B981]" title={`Allowances: ${otherPercent}%`}></div>
          )}
        </div>

        {/* Line items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
          
          <div className="flex justify-between items-center p-3 rounded-xl bg-[#0F172A] border border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F8FAFC]/70 shrink-0"></span>
              <div>
                <span className="font-bold text-[#F8FAFC]">Base Wage</span>
                <p className="text-[10px] text-[#94A3B8] font-mono">{result.daysWorked}d × {formatINR(result.adjustedDailyRate)}</p>
              </div>
            </div>
            <span className="font-black text-[#F8FAFC] font-mono">{result.formattedBase}</span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-xl bg-[#0F172A] border border-[#00F0FF]/30">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shrink-0"></span>
              <div>
                <span className="font-bold text-[#F8FAFC]">Overtime (2.0x)</span>
                <p className="text-[10px] text-[#94A3B8] font-mono">{result.overtimeHours} hrs @ {formatINR(result.statutoryOtRate)}/hr</p>
              </div>
            </div>
            <span className="font-black text-[#00F0FF] font-mono">{result.formattedOT}</span>
          </div>

          {result.nightShiftAllowance > 0 && (
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#0F172A] border border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0"></span>
                <div>
                  <span className="font-bold text-[#F8FAFC]">Night Shift Allowance</span>
                  <p className="text-[10px] text-[#94A3B8]">{result.nightShifts} shifts (+15%)</p>
                </div>
              </div>
              <span className="font-black text-[#F8FAFC] font-mono">{formatINR(result.nightShiftAllowance)}</span>
            </div>
          )}

          {result.extendedDailyPay > 0 && (
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#0F172A] border border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                <div>
                  <span className="font-bold text-[#F8FAFC]">Extended Shift Pay</span>
                  <p className="text-[10px] text-[#94A3B8]">{result.dailyHours - 8} extra hrs/day</p>
                </div>
              </div>
              <span className="font-black text-emerald-400 font-mono">{formatINR(result.extendedDailyPay)}</span>
            </div>
          )}

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleSaveCalculationToPassport}
          leftIcon={<span className="material-symbols-outlined text-lg text-[#00F0FF]">badge</span>}
          className="flex-1"
        >
          {t.saveToPassport}
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={() => setActivePage('payslip-verify')}
          leftIcon={<span className="material-symbols-outlined text-lg">verified_user</span>}
          className="flex-1"
        >
          Verify My Received Payslip
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={handleCopy}
          leftIcon={<span className="material-symbols-outlined text-base">content_copy</span>}
          className="border border-white/[0.1]"
        >
          Copy
        </Button>
      </div>

    </div>
  );
}
