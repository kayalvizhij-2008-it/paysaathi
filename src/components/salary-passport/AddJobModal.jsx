import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function AddJobModal() {
  const { isAddJobOpen, setIsAddJobOpen, handleAddJobRecord } = useApp();

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: 'Bengaluru, KA',
    monthlyPay: '',
    period: '2026',
    tenure: '6 months',
    verifiedPayslips: '6',
    highlights: ''
  });

  if (!isAddJobOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role || !formData.company || !formData.monthlyPay) return;
    handleAddJobRecord(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A0F1D] border border-[#00F0FF]/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#F8FAFC]">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAddJobOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
            <span className="material-symbols-outlined text-2xl">add_business</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00F0FF] font-mono">Career Expansion</span>
            <h3 className="text-xl font-black text-[#F8FAFC]">Add Experience to Passport</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
              Role / Designation *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Mason, Security Lead, Fleet Driver"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full bg-[#0F172A] border border-white/[0.1] rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                Employer / Site Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Prestige Estates Site 4"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full bg-[#0F172A] border border-white/[0.1] rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                Monthly Salary (₹) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 24000"
                value={formData.monthlyPay}
                onChange={(e) => setFormData(prev => ({ ...prev, monthlyPay: e.target.value }))}
                className="w-full bg-[#0F172A] border border-white/[0.1] rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full bg-[#0F172A] border border-white/[0.1] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                Tenure Duration
              </label>
              <input
                type="text"
                value={formData.tenure}
                onChange={(e) => setFormData(prev => ({ ...prev, tenure: e.target.value }))}
                className="w-full bg-[#0F172A] border border-white/[0.1] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
              Role Highlights & Performance
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Managed shift safety protocols; completed site without incident."
              value={formData.highlights}
              onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
              className="w-full bg-[#0F172A] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF]"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={() => setIsAddJobOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00F0FF] text-[#070B14] font-black text-xs shadow hover:scale-105 transition-all cursor-pointer"
            >
              Verify & Add to Passport
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
