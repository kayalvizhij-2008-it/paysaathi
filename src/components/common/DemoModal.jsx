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
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#19120A] border border-[#F5A623]/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#EEE0D2]">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsDemoModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] text-[#D7C3AE] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#D97706] p-0.5 shadow-lg">
            <div className="w-full h-full bg-[#19120A] rounded-[14px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#F5A623] text-2xl material-symbols-fill">auto_awesome</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFB955]">Judge & Evaluator Tour</span>
            <h3 className="text-xl font-bold text-white">Interactive PaySaathi Demo</h3>
          </div>
        </div>

        {/* Step Progression */}
        <div className="space-y-4 mb-8">
          
          {/* Step 1 */}
          <div 
            onClick={() => setStep(1)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              step === 1 ? 'bg-[#251E16] border-[#F5A623]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step === 1 ? 'bg-[#F5A623] text-[#121212]' : 'bg-white/[0.1] text-[#D7C3AE]'
              }`}>
                1
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">Before Payment: Salary Check (Expected Pay)</h4>
                <p className="text-xs text-[#D7C3AE] mt-1">
                  Worker selects Sector (Construction/Security) and city. The system calculates statutory 2x Overtime & regional minimum wage benchmarks.
                </p>
                {step === 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleStartDemoFlow('check'); }}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-[#F5A623] text-[#121212] font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Launch Salary Check Flow</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => setStep(2)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              step === 2 ? 'bg-[#251E16] border-[#F5A623]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step === 2 ? 'bg-[#F5A623] text-[#121212]' : 'bg-white/[0.1] text-[#D7C3AE]'
              }`}>
                2
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">After Payment: 1-Click Payslip OCR Verification</h4>
                <p className="text-xs text-[#D7C3AE] mt-1">
                  Uploads October Payslip. The AI scans OCR data, flags -₹2,300 missing overtime & unapproved deductions, and provides voice explanation.
                </p>
                {step === 2 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleStartDemoFlow('verify'); }}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-[#F5A623] text-[#121212] font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>⚡ Run 1-Click Verification Scan</span>
                    <span className="material-symbols-outlined text-sm">document_scanner</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => setStep(3)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              step === 3 ? 'bg-[#251E16] border-[#F5A623]' : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step === 3 ? 'bg-[#F5A623] text-[#121212]' : 'bg-white/[0.1] text-[#D7C3AE]'
              }`}>
                3
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">Over Time: Portable Digital Salary Passport</h4>
                <p className="text-xs text-[#D7C3AE] mt-1">
                  Vikram carries his 3-year verified career history (98/100 Trust Score, +46% salary growth) to new employers without paper friction.
                </p>
                {step === 3 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleStartDemoFlow('passport'); }}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-[#F5A623] text-[#121212] font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Open Salary Passport</span>
                    <span className="material-symbols-outlined text-sm">badge</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <span className="text-xs text-[#D7C3AE]">Rules verify. AI explains. Humans decide.</span>
          <button
            onClick={() => handleStartDemoFlow('verify')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#FF8C00] text-[#121212] font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Start Full Demo Tour</span>
            <span className="material-symbols-outlined text-sm material-symbols-fill">bolt</span>
          </button>
        </div>

      </div>
    </div>
  );
}
