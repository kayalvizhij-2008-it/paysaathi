import React from 'react';
import SectionHeader from '../ui/SectionHeader';

export default function TrustSection() {
  const trustPoints = [
    {
      icon: 'lock',
      title: 'Client-Side Data Privacy',
      description: 'Document bytes are parsed and verified directly within your secure browser session. Raw personal files are never retained on central databases without your consent.'
    },
    {
      icon: 'gavel',
      title: 'Transparent Statutory Math',
      description: 'Every calculation is deterministically bound to codified Indian labour laws, state minimum wage notifications, and Factories Act Section 59 standards.'
    },
    {
      icon: 'badge',
      title: 'Worker-Controlled Credentials',
      description: 'Your Salary Passport records belong exclusively to you. You decide when, how, and with whom your verified career history is shared.'
    }
  ];

  return (
    <section className="py-24 bg-[#070B14] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Security & Data Integrity"
          eyebrowIcon="verified_user"
          title="Your Salary. Your Data."
          highlightText="Your Understanding."
          description="Built around verifiable statutory rules and worker ownership. We maintain strict privacy and transparent audit methodologies without unsupported claims."
        />

        {/* 3-Column Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustPoints.map((point, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 border border-white/[0.08] hover:border-[#00F0FF]/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/30 flex items-center justify-center mb-6 text-[#00F0FF]">
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">
                    {point.icon}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#F8FAFC] mb-2.5">
                  {point.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {point.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Active Safety Architecture</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
