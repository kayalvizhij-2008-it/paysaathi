import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function DemoModal() {
  const { isDemoModalOpen, setIsDemoModalOpen, setActivePage, startPayslipAnalysis } = useApp();
  const [step, setStep] = useState(1);

  if (!isDemoModalOpen) return null;

  const handleStartDemoFlow = (target) => {
    setIsDemoModalOpen(false);
    if (target === 'check') {
      setActivePage('salary-check');
    } else if (target === 'verify') {
      setActivePage('payslip-verify');
      setTimeout(() => {
        startPayslipAnalysis(null, true);
      }, 300);
    } else if (target === 'passport') {
      setActivePage('salary-passport');
    } else if (target === 'action') {
      setActivePage('worker-action');
    } else if (target === 'voice') {
      setActivePage('voice-assistant');
    }
  };

  const STEPS = [
    {
      num: 1,
      title: 'Before Payment: Salary Check (Expected Pay)',
      desc: 'Worker selects Sector (Construction/Security) and city. The system calculates statutory 2x Overtime & regional minimum wage benchmarks.',
      target: 'check',
      cta: 'Launch Salary Check Flow',
      icon: 'calculate',
    },
    {
      num: 2,
      title: 'After Payment: 1-Click Payslip OCR Verification',
      desc: 'Uploads October Payslip. The AI scans OCR data, flags -₹2,300 missing overtime & unapproved deductions, and provides voice explanation.',
      target: 'verify',
      cta: '⚡ Run 1-Click Verification Scan',
      icon: 'document_scanner',
    },
    {
      num: 3,
      title: 'Over Time: Portable Digital Salary Passport',
      desc: "Vikram carries his 3-year verified career history (98/100 Trust Score, +46% salary growth) to new employers without paper friction.",
      target: 'passport',
      cta: 'Open Salary Passport',
      icon: 'badge',
    },
    {
      num: 4,
      title: 'Resolution: Worker Action Desk',
      desc: 'Generate courteous trilingual dispute drafts (Polite / Formal HR / Statutory) with 1-click WhatsApp share and print.',
      target: 'action',
      cta: 'Open Action Desk',
      icon: 'gavel',
    },
    {
      num: 5,
      title: 'Voice AI: Ask PaySaathi in Your Language',
      desc: 'Interact with the Voice Orb — ask about your salary in English, हिन्दी, or தமிழ். Web Speech API powers real-time synthesis.',
      target: 'voice',
      cta: 'Launch Voice Assistant',
      icon: 'mic',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A0F1D] border border-[#F59E0B]/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#F8FAFC]">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsDemoModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] p-0.5 shadow-lg">
            <div className="w-full h-full bg-[#0A0F1D] rounded-[14px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#F59E0B] text-2xl material-symbols-fill">auto_awesome</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F59E0B] font-mono">Judge & Evaluator Tour</span>
            <h3 className="text-xl font-black text-[#F8FAFC]">Interactive PaySaathi Demo</h3>
          </div>
        </div>

        {/* Step Progression */}
        <div className="space-y-3 mb-6 max-h-[55vh] overflow-y-auto pr-1">
          {STEPS.map(({ num, title, desc, target, cta, icon }) => (
            <div 
              key={num}
              onClick={() => setStep(num)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                step === num ? 'bg-[#0F172A] border-[#F59E0B]/70 shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  step === num ? 'bg-[#F59E0B] text-[#070B14]' : 'bg-white/[0.1] text-[#94A3B8]'
                }`}>
                  {num}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[#F8FAFC]">{title}</h4>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{desc}</p>
                  {step === num && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleStartDemoFlow(target); }}
                      className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#F59E0B] text-[#070B14] font-black text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.4)] hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>{cta}</span>
                      <span className="material-symbols-outlined text-sm">{icon}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <span className="text-xs text-[#94A3B8] font-mono">Rules verify. AI explains. Humans decide.</span>
          <button
            onClick={() => handleStartDemoFlow('verify')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#070B14] font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Start Full Demo Tour</span>
            <span className="material-symbols-outlined text-sm material-symbols-fill">bolt</span>
          </button>
        </div>

      </div>
    </div>
  );
}
