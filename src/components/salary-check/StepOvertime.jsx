import React from 'react';

export default function StepOvertime({ salaryInput, setSalaryInput }) {
  return (
    <div className="space-y-6">
      
      {/* Overtime Hours */}
      <div className="bg-[#19120A] rounded-2xl p-5 border border-white/[0.08] space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F5A623]">timer</span>
              <h4 className="text-sm font-bold text-white">Total Logged Overtime Hours</h4>
            </div>
            <p className="text-xs text-[#D7C3AE] mt-0.5">
              Statutory 2.0x hourly multiplier per Factories Act Section 59
            </p>
          </div>
          <span className="text-2xl font-black text-[#F5A623] px-3 py-1 bg-[#251E16] rounded-xl border border-[#F5A623]/30">
            {salaryInput.overtimeHours} <span className="text-xs font-normal text-[#D7C3AE]">hrs</span>
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="60"
          value={salaryInput.overtimeHours}
          onChange={(e) => setSalaryInput(prev => ({ ...prev, overtimeHours: Number(e.target.value) }))}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-[#A89886]">
          <span>0 hrs (No OT)</span>
          <span>12 hrs</span>
          <span>24 hrs</span>
          <span>48+ hrs</span>
        </div>
      </div>

      {/* Night Shifts */}
      <div className="bg-[#19120A] rounded-2xl p-5 border border-white/[0.08] space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#818CF8]">bedtime</span>
              <h4 className="text-sm font-bold text-white">Night Shifts Completed</h4>
            </div>
            <p className="text-xs text-[#D7C3AE] mt-0.5">
              Work between 10:00 PM and 6:00 AM earns +15% nocturnal allowance
            </p>
          </div>
          <span className="text-2xl font-black text-[#818CF8] px-3 py-1 bg-[#251E16] rounded-xl border border-[#818CF8]/30">
            {salaryInput.nightShifts} <span className="text-xs font-normal text-[#D7C3AE]">shifts</span>
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="20"
          value={salaryInput.nightShifts}
          onChange={(e) => setSalaryInput(prev => ({ ...prev, nightShifts: Number(e.target.value) }))}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-[#A89886]">
          <span>0 (Day shifts only)</span>
          <span>5 shifts</span>
          <span>10 shifts</span>
          <span>20 shifts</span>
        </div>
      </div>

      {/* Statutory Info Banner */}
      <div className="p-4 rounded-xl bg-[#251E16] border border-[#F5A623]/20 flex items-start gap-3">
        <span className="material-symbols-outlined text-[#F5A623] text-xl shrink-0 mt-0.5">gavel</span>
        <div className="text-xs text-[#D7C3AE] leading-relaxed">
          <span className="font-bold text-white block mb-0.5">Indian Labour Law Protection:</span>
          Overtime pay cannot be paid at flat regular hourly rates. Employers are legally obligated to compute overtime at minimum <strong>twice (2x) the standard hourly wage</strong>.
        </div>
      </div>

    </div>
  );
}
