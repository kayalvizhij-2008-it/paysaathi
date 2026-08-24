import React from 'react';
import SectionHeader from '../ui/SectionHeader';
import { TESTIMONIALS } from '../../utils/sampleData';

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0A0A0B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Worker Impact Stories"
          title="Defending Wages &"
          highlightText="Career Growth"
          description="Real outcomes from workers across construction, facility security, and manufacturing who verified their statutory rights with PaySaathi."
        />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-7 border border-white/[0.08] hover:border-[#E11D3C]/30 flex flex-col justify-between shadow-xl transition-all"
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

                <p className="text-xs sm:text-sm text-[#F5F5F7] leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C1C1F] border border-[#E11D3C]/40 flex items-center justify-center text-[#E11D3C] font-black text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#F5F5F7]">{item.name}</h4>
                  <p className="text-[11px] text-[#9A9AA3]">{item.role} • {item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
