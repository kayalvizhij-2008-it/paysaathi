import React from 'react';

export default function StepHours({ salaryInput, setSalaryInput }) {
  return (
    <div className="space-y-8">
      
      {/* Days Worked Slider */}
      <div className="bg-[#19120A] rounded-2xl p-5 border border-white/[0.08] space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm font-bold text-white">Days Worked This Month</h4>
            <p className="text-xs text-[#D7C3AE]">Standard work month is 24 to 26 days</p>
          </div>
          <span className="text-2xl font-black text-[#FFB955] px-3 py-1 bg-[#251E16] rounded-xl border border-[#F5A623]/30">
            {salaryInput.daysWorked} <span className="text-xs font-normal text-[#D7C3AE]">days</span>
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="31"
          value={salaryInput.daysWorked}
          onChange={(e) => setSalaryInput(prev => ({ ...prev, daysWorked: Number(e.target.value) }))}
          className="w-full mt-2"
        />

        <div className="flex justify-between text-xs text-[#A89886]">
          <span>1 Day</span>
          <span>15 Days</span>
          <span>26 Days (Full Month)</span>
          <span>31 Days</span>
        </div>
      </div>

      {/* Daily Shift Hours Slider */}
      <div className="bg-[#19120A] rounded-2xl p-5 border border-white/[0.08] space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm font-bold text-white">Daily Shift Duration</h4>
            <p className="text-xs text-[#D7C3AE]">Indian Factories Act standard is 8 hours/day (48 hrs/week)</p>
          </div>
          <span className="text-xl font-black text-white px-3 py-1 bg-[#251E16] rounded-xl border border-white/[0.1]">
            {salaryInput.dailyHours} <span className="text-xs font-normal text-[#D7C3AE]">hrs/day</span>
          </span>
        </div>

        <input
          type="range"
          min="6"
          max="14"
          value={salaryInput.dailyHours}
          onChange={(e) => setSalaryInput(prev => ({ ...prev, dailyHours: Number(e.target.value) }))}
          className="w-full mt-2"
        />

        <div className="flex justify-between text-xs text-[#A89886]">
          <span>6 hrs</span>
          <span className="text-[#22C55E] font-semibold">8 hrs (Statutory standard)</span>
          <span>12 hrs (Extended shift)</span>
          <span>14 hrs</span>
        </div>

        {salaryInput.dailyHours > 8 && (
          <div className="p-3 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/25 flex items-center gap-2 text-xs text-[#FFB955]">
            <span className="material-symbols-outlined text-base">info</span>
            <span>Hours over 8/day qualify for mandatory statutory double-rate (2.0x) overtime.</span>
          </div>
        )}
      </div>

    </div>
  );
}
