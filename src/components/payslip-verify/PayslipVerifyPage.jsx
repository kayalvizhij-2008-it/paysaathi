import React, { useState } from 'react';
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

  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const handleFileAccepted = (file) => {
    startPayslipAnalysis(file, false);
  };

  const isPipelineActive = uploadState !== 'idle' && uploadState !== 'verified';

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#070B14] relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#10B981]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-breathe"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeader
          eyebrow="Statutory OCR Auditing Pipeline"
          eyebrowIcon="verified_user"
          title="Verify Your Received"
          highlightText="Salary Document"
          description="Upload your physical contractor salary slip, PDF document, or camera photo. Our OCR pipeline extracts line-by-line shift figures, evaluates 2.0x overtime compliance, and flags unapproved deductions."
        />

        {/* Dynamic State Rendering */}
        {verificationResult ? (
          <div className="max-w-4xl mx-auto">
            <VerificationResult
              result={verificationResult}
              onReUpload={resetVerification}
              onInspectSource={() => setIsSampleModalOpen(true)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Upload Area & Sample Demo Card */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Custom Accessible Dropzone */}
              <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-[#00F0FF]/30 shadow-2xl">
                <Dropzone
                  onFileAccepted={handleFileAccepted}
                  disabled={isPipelineActive}
                  maxSizeMB={10}
                />
              </div>

              {/* Sample Payslip Fast-Demo Card for Judges & Evaluators */}
              <div className="p-6 rounded-[28px] bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A0F1D] border border-[#00F0FF]/40 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(0,240,255,0.15)]">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
                    <h4 className="text-xs font-black text-[#F8FAFC] uppercase tracking-wider font-mono">
                      Evaluator / Judge Live Demo
                    </h4>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    Load verified Security Supervisor October 2024 salary slip with OCR extraction
                  </p>
                  <span className="text-[10px] text-amber-400 font-mono block">
                    Sample / Demo Document — Not a Real Payslip
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsSampleModalOpen(true)}
                    leftIcon={<span className="material-symbols-outlined text-sm">visibility</span>}
                  >
                    Inspect
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => startPayslipAnalysis(null, true)}
                    disabled={isPipelineActive}
                    leftIcon={<span className="material-symbols-outlined text-base material-symbols-fill">auto_awesome</span>}
                    className="shrink-0"
                  >
                    {t.useSampleSlip}
                  </Button>
                </div>
              </div>

            </div>

            {/* Right Column: Live Pipeline Tracker or Detailed Audit Explanation */}
            <div className="lg:col-span-6">
              {isPipelineActive ? (
                <AnalysisPipeline />
              ) : (
                <div className="glass-card rounded-[32px] p-6 sm:p-8 border border-white/[0.08] space-y-6 shadow-2xl">
                  
                  <div className="flex items-center gap-3.5 pb-4 border-b border-white/[0.08]">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
                      <span className="material-symbols-outlined text-2xl">rule</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#F8FAFC]">How PaySaathi Verifies Your Slip</h3>
                      <p className="text-xs text-[#94A3B8]">Non-destructive AI OCR statutory audit</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs text-[#94A3B8]">
                    <div className="flex items-start gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-[#0F172A] border border-[#00F0FF]/40 text-[#00F0FF] font-black flex items-center justify-center shrink-0 font-mono text-xs">
                        1
                      </span>
                      <p className="leading-relaxed">
                        <strong className="text-[#F8FAFC] block mb-0.5 font-bold">OCR Text & Table Parsing:</strong>
                        Extracts basic wage, attendance days, overtime hours, night shift allowances, and deductions.
                      </p>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-[#0F172A] border border-[#00F0FF]/40 text-[#00F0FF] font-black flex items-center justify-center shrink-0 font-mono text-xs">
                        2
                      </span>
                      <p className="leading-relaxed">
                        <strong className="text-[#F8FAFC] block mb-0.5 font-bold">Statutory 2.0x Overtime Audit:</strong>
                        Audits whether overtime hours are credited at 2.0x the ordinary hourly rate under Factories Act Section 59.
                      </p>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <span className="w-8 h-8 rounded-xl bg-[#0F172A] border border-[#00F0FF]/40 text-[#00F0FF] font-black flex items-center justify-center shrink-0 font-mono text-xs">
                        3
                      </span>
                      <p className="leading-relaxed">
                        <strong className="text-[#F8FAFC] block mb-0.5 font-bold">Deduction Legality Check:</strong>
                        Flags non-statutory "Misc Adjustments", administrative penalties, or unitemized cuts.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A0F1D] border border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Need an instant test?</span>
                    <button
                      onClick={() => startPayslipAnalysis(null, true)}
                      className="text-[#00F0FF] hover:underline font-bold flex items-center gap-1 cursor-pointer"
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

      {/* Sample Payslip Inspection Modal for Judges */}
      {isSampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0A0F1D] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#00F0FF]/40 shadow-2xl space-y-5 text-left relative overflow-hidden">
            
            <div className="flex justify-between items-start pb-3 border-b border-white/[0.08]">
              <div>
                <Badge status="cyan" size="sm" className="mb-1">
                  Demo Source Document
                </Badge>
                <h3 className="text-lg font-black text-[#F8FAFC]">
                  October 2024 Salary Slip — Apex Facility Services Pvt. Ltd.
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  Sample / Demo Document — Not a Real Payslip
                </p>
              </div>

              <button
                onClick={() => setIsSampleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-[#94A3B8] hover:text-white flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Document Content View */}
            <div className="bg-[#070B14] p-5 rounded-2xl border border-white/[0.08] font-mono text-xs text-[#94A3B8] space-y-3">
              <div className="flex justify-between text-[#F8FAFC] font-bold border-b border-white/[0.08] pb-2">
                <span>EMPLOYEE: Vikram Singh (PS-8492-X)</span>
                <span>ROLE: Security Supervisor</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                <div>
                  <div className="text-[#F8FAFC] font-bold mb-1 uppercase tracking-wider text-[10px]">Earnings Line Items</div>
                  <div>• Basic Wages (22 Days): <span className="text-[#F8FAFC]">₹13,200</span></div>
                  <div>• Night Shift Allowance: <span className="text-[#F8FAFC]">₹2,420</span></div>
                  <div className="text-amber-400">• Overtime (10h @ flat 1x): <span className="font-bold">₹1,200</span></div>
                  <div className="text-[10px] text-gray-500">(Logged: 24h actual OT)</div>
                </div>

                <div>
                  <div className="text-[#F8FAFC] font-bold mb-1 uppercase tracking-wider text-[10px]">Deductions</div>
                  <div>• Employee PF (12%): <span className="text-[#F8FAFC]">₹600</span></div>
                  <div className="text-[#F43F5E]">• Misc Adj. / Uniform: <span className="font-bold">₹620</span></div>
                  <div className="text-[10px] text-gray-500">(Unapproved deduction)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.08] flex justify-between font-bold text-sm text-[#F8FAFC]">
                <span>NET PAY RECEIVED:</span>
                <span className="text-[#F43F5E]">₹16,200</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-[#94A3B8]">
                Factories Act Sec 59 audit will flag OT & deduction discrepancies.
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsSampleModalOpen(false);
                  startPayslipAnalysis(null, true);
                }}
                leftIcon={<span className="material-symbols-outlined text-sm">play_arrow</span>}
              >
                Run Scan On This Document
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
