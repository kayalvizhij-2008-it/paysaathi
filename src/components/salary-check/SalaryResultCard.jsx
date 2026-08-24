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
    <div className="glass-card rounded-[32px] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(200,30,58,0.15)] border border-[#E11D3C]/30 relative overflow-hidden animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <Badge
            status="accent"
            size="md"
            icon={<span className="material-symbols-outlined text-sm">verified</span>}
            className="mb-2.5"
          >
            Statutory Wage Intelligence Benchmark
          </Badge>

          <h3 className="text-xl sm:text-2xl font-black text-[#F5F5F7]">
            {result.roleName}
          </h3>
          <p className="text-xs text-[#9A9AA3] mt-0.5">
            {result.cityName}, {result.state} • Skill Category: <span className="font-bold text-[#F5F5F7]">{result.skillLevel}</span>
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
          <span className="text-xs font-bold uppercase tracking-widest text-[#9A9AA3]">
            Total Statutory Expected Pay
          </span>
          <div className="text-4xl sm:text-5xl font-black text-[#F5F5F7] tracking-tight mt-1 flex items-baseline justify-center sm:justify-start gap-2 font-mono">
            <span>{result.formattedGross}</span>
            <span className="text-base font-normal text-[#9A9AA3]">/ month</span>
          </div>
          <p className="text-xs text-emerald-400 font-bold mt-1.5 flex items-center justify-center sm:justify-start gap-1.5">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>Audited — Minimum Wages Act & Factories Act Sec 59</span>
          </p>
        </div>

        <div className="bg-[#121214] border border-white/[0.1] p-5 rounded-2xl text-center min-w-[170px] shadow-xl">
          <span className="text-[10px] uppercase font-bold text-[#9A9AA3] tracking-wider block">Standard Daily Rate</span>
          <div className="text-2xl font-black text-[#F5F5F7] mt-0.5 font-mono">{formatINR(result.adjustedDailyRate)}</div>
          <span className="text-[10px] text-[#9A9AA3] block mt-0.5 font-mono">~{formatINR(result.hourlyRate)} / hr</span>
        </div>
      </div>

      {/* Breakdown Progress Bars */}
      <div className="space-y-4 mb-8 bg-[#121214]/80 p-5 rounded-2xl border border-white/[0.06]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A9AA3]">
          Transparent Compensation Breakdown
        </h4>

        {/* Multi-segmented bar */}
        <div className="h-3 w-full bg-[#1C1C1F] rounded-full overflow-hidden flex border border-white/[0.04]">
          <div style={{ width: `${basePercent}%` }} className="bg-[#F5F5F7]/60" title={`Base: ${basePercent}%`}></div>
          <div style={{ width: `${otPercent}%` }} className="bg-[#E11D3C]" title={`Overtime (2.0x): ${otPercent}%`}></div>
          {otherPercent > 0 && (
            <div style={{ width: `${otherPercent}%` }} className="bg-[#C81E3A]/60" title={`Allowances: ${otherPercent}%`}></div>
          )}
        </div>

        {/* Line items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
          
          <div className="flex justify-between items-center p-3 rounded-xl bg-[#1C1C1F] border border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5F5F7]/60 shrink-0"></span>
              <div>
                <span className="font-bold text-[#F5F5F7]">Base Wage</span>
                <p className="text-[10px] text-[#9A9AA3] font-mono">{result.daysWorked}d × {formatINR(result.adjustedDailyRate)}</p>
              </div>
            </div>
            <span className="font-black text-[#F5F5F7] font-mono">{result.formattedBase}</span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-xl bg-[#2A1017] border border-[#E11D3C]/30">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D3C] shrink-0"></span>
              <div>
                <span className="font-bold text-[#F5F5F7]">Overtime (2.0x)</span>
                <p className="text-[10px] text-[#9A9AA3] font-mono">{result.overtimeHours} hrs @ {formatINR(result.statutoryOtRate)}/hr</p>
              </div>
            </div>
            <span className="font-black text-[#E11D3C] font-mono">{result.formattedOT}</span>
          </div>

          {result.nightShiftAllowance > 0 && (
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#1C1C1F] border border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C81E3A]/60 shrink-0"></span>
                <div>
                  <span className="font-bold text-[#F5F5F7]">Night Shift Allowance</span>
                  <p className="text-[10px] text-[#9A9AA3]">{result.nightShifts} shifts (+15%)</p>
                </div>
              </div>
              <span className="font-black text-[#F5F5F7] font-mono">{formatINR(result.nightShiftAllowance)}</span>
            </div>
          )}

          {result.extendedDailyPay > 0 && (
            <div className="flex justify-between items-center p-3 rounded-xl bg-[#1C1C1F] border border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
                <div>
                  <span className="font-bold text-[#F5F5F7]">Extended Shift Pay</span>
                  <p className="text-[10px] text-[#9A9AA3]">{result.dailyHours - 8} extra hrs/day</p>
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
          leftIcon={<span className="material-symbols-outlined text-lg text-[#E11D3C]">badge</span>}
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
