import React from 'react';
import { useApp } from '../../context/AppContext';
import AnalysisPipeline from './AnalysisPipeline';
import VerificationResult from './VerificationResult';
import Dropzone from '../ui/Dropzone';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import SectionHeader from '../ui/SectionHeader';

export default function PayslipVerifyPage() {
  const {
    uploadState,
    verificationResult,
    startPayslipAnalysis,
    resetVerification,
    t
  } = useApp();

  const handleFileAccepted = (file) => {
    startPayslipAnalysis(file, false);
  };

  const isPipelineActive = uploadState !== 'idle' && uploadState !== 'verified';

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeader
          eyebrow="Statutory OCR Auditing Engine"
          title="Verify Your Received"
          highlightText="Salary Document"
          description="Upload your physical salary slip, PDF document, or camera photo. Our OCR pipeline detects statutory overtime shortfalls, unapproved deductions, and legal compliance under Factories Act Section 59."
        />

        {/* Dynamic State Rendering */}
        {verificationResult ? (
          <div className="max-w-4xl mx-auto">
            <VerificationResult result={verificationResult} onReUpload={resetVerification} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Upload Area & Sample Demo CTA */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Custom Accessible Dropzone */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl">
                <Dropzone
                  onFileAccepted={handleFileAccepted}
                  disabled={isPipelineActive}
                  maxSizeMB={10}
                />
              </div>

              {/* Sample Payslip Fast-Demo Card for Judges & Evaluators */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1C1C1F] via-[#2A1017] to-[#1C1C1F] border border-[#E11D3C]/40 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(200,30,58,0.2)]">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-2 h-2 rounded-full bg-[#E11D3C] animate-ping"></span>
                    <h4 className="text-xs font-black text-[#F5F5F7] uppercase tracking-wider">
                      Instant Evaluator / Judge Demo
                    </h4>
                  </div>
                  <p className="text-xs text-[#9A9AA3]">
                    Feed verified Security Supervisor October 2024 salary slip through pipeline
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => startPayslipAnalysis(null, true)}
                  disabled={isPipelineActive}
                  leftIcon={<span className="material-symbols-outlined text-base material-symbols-fill">auto_awesome</span>}
                  className="w-full sm:w-auto shrink-0"
                >
                  {t.useSampleSlip}
                </Button>
              </div>

            </div>

            {/* Right Column: Live Pipeline Tracker or Detailed Audit Explanation */}
            <div className="lg:col-span-6">
              {isPipelineActive ? (
                <AnalysisPipeline />
              ) : (
                <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6 shadow-2xl">
                  
                  <div className="flex items-center gap-3.5 pb-4 border-b border-white/[0.08]">
                    <div className="w-11 h-11 rounded-2xl bg-[#1C1C1F] border border-[#E11D3C]/30 flex items-center justify-center text-[#E11D3C]">
                      <span className="material-symbols-outlined text-xl">rule</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#F5F5F7]">How PaySaathi Verifies Your Slip</h3>
                      <p className="text-xs text-[#9A9AA3]">Non-destructive AI OCR statutory audit</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs text-[#9A9AA3]">
                    <div className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-xl bg-[#1C1C1F] border border-[#E11D3C]/40 text-[#E11D3C] font-black flex items-center justify-center shrink-0 font-mono text-xs">
                        1
                      </span>
                      <p className="leading-relaxed">
                        <strong className="text-[#F5F5F7] block mb-0.5 font-bold">OCR Text & Table Parsing:</strong>
                        Extracts basic wages, attendance days, overtime hours, night shift allowances, and deduction items.
                      </p>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-xl bg-[#1C1C1F] border border-[#E11D3C]/40 text-[#E11D3C] font-black flex items-center justify-center shrink-0 font-mono text-xs">
                        2
                      </span>
                      <p className="leading-relaxed">
                        <strong className="text-[#F5F5F7] block mb-0.5 font-bold">Statutory 2.0x Overtime Audit:</strong>
                        Audits whether overtime hours are credited at 2.0x the ordinary hourly rate under Factories Act Section 59.
                      </p>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <span className="w-7 h-7 rounded-xl bg-[#1C1C1F] border border-[#E11D3C]/40 text-[#E11D3C] font-black flex items-center justify-center shrink-0 font-mono text-xs">
                        3
                      </span>
                      <p className="leading-relaxed">
                        <strong className="text-[#F5F5F7] block mb-0.5 font-bold">Deduction Legality Check:</strong>
                        Flags non-statutory "Misc Adjustments", administrative penalties, or unitemized cuts.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#121214] border border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[#9A9AA3]">Need instant testing?</span>
                    <button
                      onClick={() => startPayslipAnalysis(null, true)}
                      className="text-[#E11D3C] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Run Sample Slip Scan</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
