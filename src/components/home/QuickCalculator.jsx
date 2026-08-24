import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WORKER_SECTORS, calculateExpectedPay, formatINR } from '../../utils/wageCalculator';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function QuickCalculator() {
  const { setActivePage, handleCalculateSalary } = useApp();
  const [selectedSector, setSelectedSector] = useState('construction');
  const [days, setDays] = useState(24);
  const [overtimeHours, setOvertimeHours] = useState(12);

  const previewResult = calculateExpectedPay({
    sectorId: selectedSector,
    roleId: selectedSector === 'construction' ? 'mason' : selectedSector === 'security' ? 'guard' : 'assembler',
    cityId: 'bengaluru',
    daysWorked: days,
    dailyHours: 8,
    overtimeHours: overtimeHours,
    nightShifts: 0
  });

  const handleOpenFullCheck = () => {
    handleCalculateSalary({
      sectorId: selectedSector,
      daysWorked: days,
      overtimeHours: overtimeHours
    });
    setActivePage('salary-check');
  };

  return (
    <section className="py-20 relative bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card rounded-[36px] p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden border border-[#00F0FF]/30">
          
          {/* Top Cyan Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_12px_rgba(0,240,255,0.9)]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <Badge status="cyan" size="md" icon={<span className="material-symbols-outlined text-sm">calculate</span>}>
                Instant Wage Estimator
              </Badge>

              <h2 className="text-3xl sm:text-4xl font-black text-[#F8FAFC] leading-tight">
                Live Statutory Rate Benchmark
              </h2>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Adjust days worked and overtime hours to see how Indian statutory rates (2.0x overtime multiplier under Factories Act Sec 59) impact your legal take-home pay.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-emerald-400">verified</span>
                  <span>Karnataka & Pan-India scheduled state minimum wage rates</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-emerald-400">verified</span>
                  <span>Factories Act Section 59 double-rate statutory overtime auditing</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Controls */}
            <div className="lg:col-span-7 bg-[#0A0F1D] text-[#F8FAFC] rounded-3xl p-6 sm:p-8 shadow-xl border border-white/[0.08] space-y-6">
              
              {/* Sector selector pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                  Select Sector / Trade
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {WORKER_SECTORS.map((sector) => (
                    <button
                      key={sector.id}
                      onClick={() => setSelectedSector(sector.id)}
                      className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                        selectedSector === sector.id
                          ? 'bg-gradient-to-r from-[#00F0FF] to-[#06B6D4] text-[#070B14] font-black shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-[#00F0FF]'
                          : 'bg-[#0F172A] text-[#94A3B8] hover:bg-[#1E293B] hover:text-white border border-white/[0.08]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">{sector.icon}</span>
                      <span className="truncate">{sector.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Days Slider */}
                <div className="space-y-2.5 bg-[#0F172A]/70 p-4 rounded-2xl border border-white/[0.06]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#94A3B8] font-semibold">Days Worked</span>
                    <span className="font-extrabold text-[#F8FAFC] text-sm font-mono">{days} Days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="31"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full"
                    aria-label="Days worked"
                  />
                  <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono">
                    <span>1 day</span>
                    <span>31 days</span>
                  </div>
                </div>

                {/* Overtime Slider */}
                <div className="space-y-2.5 bg-[#0F172A]/70 p-4 rounded-2xl border border-white/[0.06]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#94A3B8] font-semibold">Overtime Hours</span>
                    <span className="font-extrabold text-[#00F0FF] text-sm font-mono">{overtimeHours} hrs (2.0x)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={overtimeHours}
                    onChange={(e) => setOvertimeHours(Number(e.target.value))}
                    className="w-full"
                    aria-label="Overtime hours"
                  />
                  <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono">
                    <span>0 hrs</span>
                    <span>60 hrs</span>
                  </div>
                </div>

              </div>

              {/* Result Summary Bar */}
              <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">
                    Statutory Expected Minimum
                  </span>
                  <div className="text-3xl font-black text-[#F8FAFC] font-mono">
                    {formatINR(previewResult.grossExpected)}
                    <span className="text-xs font-normal text-[#94A3B8] ml-1">/ month</span>
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-0.5">
                    Base: <span className="font-mono text-[#F8FAFC]">{formatINR(previewResult.baseSalary)}</span> + 2.0x OT: <span className="font-mono text-[#00F0FF] font-bold">{formatINR(previewResult.overtimePay)}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={handleOpenFullCheck}
                  rightIcon={<span className="material-symbols-outlined text-sm">arrow_forward</span>}
                  className="w-full sm:w-auto"
                >
                  Open Full 3-Step Check
                </Button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
