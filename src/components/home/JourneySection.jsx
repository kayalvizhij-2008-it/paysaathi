import React from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

export default function JourneySection() {
  const { setActivePage } = useApp();

  const steps = [
    {
      number: '01',
      stage: 'UPLOAD',
      title: 'Upload Document / Slip',
      description: 'Upload physical contractor slip, photo, or PDF document through client-side encrypted intake.',
      icon: 'cloud_upload',
      actionPage: 'payslip-verify',
      btnLabel: 'Upload Document',
      badge: 'Step 1'
    },
    {
      number: '02',
      stage: 'VALIDATE',
      title: 'Automated OCR Audit',
      description: 'Instant line-item extraction with statutory verification against Factories Act Sec 59 rules.',
      icon: 'document_scanner',
      actionPage: 'payslip-verify',
      btnLabel: 'Verify Pipeline',
      badge: 'Step 2'
    },
    {
      number: '03',
      stage: 'PASSPORT',
      title: 'Digital Career Passport',
      description: 'Convert verified payment records into a portable 98/100 trust rating for higher future packages.',
      icon: 'badge',
      actionPage: 'salary-passport',
      btnLabel: 'View Passport',
      badge: 'Step 3'
    },
    {
      number: '04',
      stage: 'RESOLVE',
      title: 'Dispute Resolution Drafts',
      description: 'Generate courteous, legally cited inquiry drafts for WhatsApp and HR in English, Hindi & Tamil.',
      icon: 'gavel',
      actionPage: 'worker-action',
      btnLabel: 'Draft Notice',
      badge: 'Step 4'
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0B] border-y border-white/[0.06] relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#C81E3A]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="The PaySaathi Verification Loop"
          title="From Black-Box Payroll to"
          highlightText="Auditable Truth"
          description="Every salary document undergoes a transparent, multi-stage compliance verification process — putting actionable intelligence into the hands of earners."
        />

        {/* 4-Step Pipeline Grid with Step Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="glass-card rounded-3xl p-7 border border-white/[0.08] hover:border-[#E11D3C]/40 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(225,29,60,0.2)]"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-black text-white/[0.15] group-hover:text-[#E11D3C] transition-colors font-mono">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1C1C1F] text-[#E11D3C] border border-[#E11D3C]/30">
                    {step.badge}
                  </span>
                </div>

                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-[#1C1C1F] border border-white/[0.1] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#E11D3C]/40 transition-all">
                  <span className="material-symbols-outlined text-[#E11D3C] text-2xl">
                    {step.icon}
                  </span>
                </div>

                {/* Content */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A9AA3] block mb-1">
                  {step.stage}
                </span>
                <h3 className="text-lg font-black text-[#F5F5F7] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-[#9A9AA3] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Action Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActivePage(step.actionPage)}
                rightIcon={<span className="material-symbols-outlined text-sm">arrow_forward</span>}
                className="w-full justify-between"
              >
                {step.btnLabel}
              </Button>

            </div>
          ))}

        </div>

        {/* Center Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1C1C1F] via-[#2A1017] to-[#1C1C1F] border border-[#E11D3C]/30 text-center max-w-3xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(200,30,58,0.2)]">
          <p className="text-base sm:text-lg font-extrabold text-[#F5F5F7] tracking-tight">
            “Your job changes. Your verified salary credibility doesn’t.”
          </p>
          <p className="text-xs text-[#9A9AA3] mt-1.5 font-medium">
            PaySaathi transforms fragmented slips into an immutable, portable career proof across India.
          </p>
        </div>

      </div>
    </section>
  );
}
