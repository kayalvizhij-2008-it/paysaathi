import React from 'react';
import { WORKER_SECTORS, CITY_TIERS } from '../../utils/wageCalculator';

export default function StepWorkType({ salaryInput, setSalaryInput }) {
  const currentSector = WORKER_SECTORS.find(s => s.id === salaryInput.sectorId) || WORKER_SECTORS[0];

  const handleSectorChange = (sectorId) => {
    const sector = WORKER_SECTORS.find(s => s.id === sectorId);
    setSalaryInput(prev => ({
      ...prev,
      sectorId,
      roleId: sector?.roles[0]?.id || 'mason'
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Sector Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
          1. Select Trade / Worker Sector
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {WORKER_SECTORS.map((sector) => {
            const isSelected = salaryInput.sectorId === sector.id;
            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => handleSectorChange(sector.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#00F0FF] to-[#06B6D4] text-[#070B14] border-[#00F0FF] font-black shadow-[0_0_20px_rgba(0,240,255,0.45)] scale-[1.02]'
                    : 'bg-[#0A0F1D] text-[#F8FAFC] border-white/[0.08] hover:bg-[#0F172A] hover:border-[#00F0FF]/40'
                }`}
              >
                <span className="material-symbols-outlined text-2xl mb-2">{sector.icon}</span>
                <span className="text-xs font-semibold">{sector.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Specific Role */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
          2. Specific Designation / Skill Role
        </label>
        <div className="relative">
          <select
            value={salaryInput.roleId}
            onChange={(e) => setSalaryInput(prev => ({ ...prev, roleId: e.target.value }))}
            className="w-full bg-[#0A0F1D] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF] appearance-none cursor-pointer hover:border-white/[0.2] transition-colors"
          >
            {currentSector.roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} ({role.skillLevel} — Base: ₹{role.baseDailyRate}/day)
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8]">
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </div>
        </div>
      </div>

      {/* 3. Location / City Tier */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
          3. Work Location / Zonal Tier
        </label>
        <div className="relative">
          <select
            value={salaryInput.cityId}
            onChange={(e) => setSalaryInput(prev => ({ ...prev, cityId: e.target.value }))}
            className="w-full bg-[#0A0F1D] border border-white/[0.1] rounded-2xl px-4 py-3.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF] appearance-none cursor-pointer hover:border-white/[0.2] transition-colors"
          >
            {CITY_TIERS.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name} — {city.state}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00F0FF]">
            <span className="material-symbols-outlined text-lg">location_on</span>
          </div>
        </div>
      </div>

    </div>
  );
}
