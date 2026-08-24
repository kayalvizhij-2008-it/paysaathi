import React from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

export default function JourneySection() {
  const { setActivePage } = useApp();

  const steps = [
    {
      number: '01',
      stage: 'BENCHMARK',
      title: 'Understand Expected Pay',
      description: 'Know your statutory entitlement based on trade, city tier, standard hours, and mandatory 2.0x overtime rates before you start work.',
      icon: 'calculate',
      actionPage: 'salary-check',
      btnLabel: 'Calculate Pay',
      badge: 'Step 1'
    },
    {
      number: '02',
      stage: 'UPLOAD & OCR',
      title: 'Upload Payslip Document',
      description: 'Drag & drop physical slips, PDFs, or camera photos through client-side encrypted intake with instant laser scanning.',
      icon: 'document_scanner',
      actionPage: 'payslip-verify',
      btnLabel: 'Verify Slip',
      badge: 'Step 2'
    },
    {
      number: '03',
      stage: 'AUDIT & VERIFY',
      title: 'AI Verifies Payment',
      description: 'Statutory rules verify line-by-line shift earnings, 2.0x overtime compliance, and unapproved arbitrary wage deductions.',
      icon: 'verified_user',
      actionPage: 'payslip-verify',
      btnLabel: 'View Audit',
      badge: 'Step 3'
    },
    {
      number: '04',
      stage: 'RESOLVE & PASSPORT',
      title: 'Worker Understands Result',
      description: 'Get plain-language voice explanations in local languages, generate dispute drafts, and build your digital Salary Passport.',
      icon: 'badge',
      actionPage: 'salary-passport',
      btnLabel: 'View Passport',
      badge: 'Step 4'
    }
  ];

  return (
    <section className="py-24 bg-[#070B14] border-y border-white/[0.06] relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-gradient-to-r from-[#00F0FF]/10 via-[#10B981]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-breathe"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="The PaySaathi Verification Loop"
          eyebrowIcon="sync_alt"
          title="From Black-Box Payroll to"
          highlightText="Auditable Truth"
          description="Every salary document undergoes a transparent, multi-stage compliance verification process — putting actionable intelligence into the hands of earners."
        />

        {/* 4-Step Pipeline Grid with Flowing Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="glass-card rounded-3xl p-7 border border-white/[0.08] hover:border-[#00F0FF]/50 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(0,240,255,0.2)] relative"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-black text-white/[0.15] group-hover:text-[#00F0FF] transition-colors font-mono">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0F172A] text-[#00F0FF] border border-[#00F0FF]/30 font-mono">
                    {step.badge}
                  </span>
                </div>

                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-white/[0.1] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#00F0FF]/60 transition-all text-[#00F0FF]">
                  <span className="material-symbols-outlined text-2xl">
                    {step.icon}
                  </span>
                </div>

                {/* Content */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] block mb-1 font-mono">
                  {step.stage}
                </span>
                <h3 className="text-lg font-black text-[#F8FAFC] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Action Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActivePage(step.actionPage)}
                rightIcon={<span className="material-symbols-outlined text-sm">arrow_forward</span>}
                className="w-full justify-between group-hover:border-[#00F0FF]/40"
              >
                {step.btnLabel}
              </Button>

            </div>
          ))}

        </div>

        {/* Center Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A0F1D] border border-[#00F0FF]/30 text-center max-w-3xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.15)]">
          <p className="text-base sm:text-lg font-extrabold text-[#F8FAFC] tracking-tight">
            “Your job changes. Your verified salary credibility doesn’t.”
          </p>
          <p className="text-xs text-[#94A3B8] mt-1.5 font-medium">
            PaySaathi transforms fragmented slips into an immutable, portable career proof across India.
          </p>
        </div>

      </div>
    </section>
  );
}
