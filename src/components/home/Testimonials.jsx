import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import { TESTIMONIALS } from '../../utils/sampleData';

export default function Testimonials() {
  const impactMetrics = [
    { label: 'Payslip Audits Simulated', value: '50,000+', icon: 'document_scanner', subtext: 'OCR line extractions' },
    { label: 'Discrepancies Flagged', value: '₹4.2 Cr', icon: 'savings', subtext: 'Statutory 2.0x OT shortfalls' },
    { label: 'Local Languages', value: '3 Ready', icon: 'translate', subtext: 'EN, தமிழ், हिन्दी Voice AI' },
    { label: 'Privacy Standard', value: '100%', icon: 'lock', subtext: 'Client-side verification' },
  ];

  return (
    <section className="py-24 bg-[#070B14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Illustrative Impact Numbers Banner */}
        <div className="glass-card rounded-[32px] p-8 sm:p-10 border border-[#00F0FF]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.1)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 mb-8 border-b border-white/[0.08] gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00F0FF] font-mono">
                Illustrative Platform Impact
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#F8FAFC]">
                Empowering India's Blue-Collar Workforce
              </h3>
            </div>
            <span className="text-[11px] text-[#94A3B8] font-mono">Simulated Ecosystem Metrics</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((stat, idx) => (
              <div key={idx} className="space-y-1.5 p-4 rounded-2xl bg-[#0A0F1D] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#00F0FF] mb-1">
                  <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                  <span className="text-[11px] font-bold text-[#94A3B8]">{stat.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#F8FAFC] font-mono">{stat.value}</div>
                <div className="text-[10px] text-emerald-400 font-medium">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <SectionHeader
          eyebrow="Worker Impact Stories"
          eyebrowIcon="record_voice_over"
          title="Defending Wages &"
          highlightText="Career Growth"
          description="Real outcomes from workers across construction, facility security, and manufacturing who verified their statutory rights with PaySaathi."
        />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-7 border border-white/[0.08] hover:border-[#00F0FF]/40 flex flex-col justify-between shadow-xl transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 flex gap-0.5">
                    {'★'.repeat(5)}
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {item.recoveredAmount}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] font-black text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#F8FAFC]">{item.name}</h4>
                  <p className="text-[11px] text-[#94A3B8]">{item.role} • {item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
