import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { CircularProgress } from '../ui/Progress';

export default function BentoFeatures() {
  const { setActivePage } = useApp();

  // Animation state for progressive OCR field reveal demo
  const [activeHighlightField, setActiveHighlightField] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlightField((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const mockOcrFields = [
    { label: 'Basic Wage (22 Days)', val: '₹13,200', status: 'MATCH', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' },
    { label: 'Overtime Logged (24h)', val: '₹1,200 (Paid 1x)', status: 'AUDIT', color: 'border-[#F43F5E] bg-[#F43F5E]/15 text-[#F43F5E]' },
    { label: 'Statutory 2.0x OT Due', val: '₹2,880', status: 'DELTA', color: 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#F8FAFC]' },
    { label: 'Misc Adj. Deduction', val: '-₹620', status: 'FLAG', color: 'border-amber-500/60 bg-amber-500/15 text-amber-300' }
  ];

  return (
    <section className="py-24 bg-[#070B14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Fintech Architecture"
          eyebrowIcon="schema"
          title="Engineered for"
          highlightText="High-Trust Verification"
          description="A precision-built suite of verification modules designed to inspect, audit, store, and defend your statutory wage entitlements."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Data Extraction Live Demo (Spans 7 cols) */}
          <div className="md:col-span-7 glass-card rounded-3xl p-7 sm:p-8 border border-white/[0.08] hover:border-[#00F0FF]/40 transition-all flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">document_scanner</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0F172A] text-[#00F0FF] border border-[#00F0FF]/30 font-bold">
                  Live OCR Parser
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#F8FAFC]">
                Automated Table & Line Extraction
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-lg">
                Parses payslips, PDFs, and camera snapshots to extract line-by-line shift figures, detect missing 2.0x overtime, and flag arbitrary deductions.
              </p>

              {/* Mock Document with Sequential Field Highlighting */}
              <div className="pt-3">
                <div className="bg-[#0A0F1D] rounded-2xl p-4 border border-white/[0.06] space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-[#94A3B8] pb-2 border-b border-white/[0.06] font-mono">
                    <span>DOCUMENT STREAM PARSER</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      99.4% OCR Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {mockOcrFields.map((field, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                          activeHighlightField === idx
                            ? `${field.color} scale-[1.02] shadow-[0_0_15px_rgba(0,240,255,0.25)]`
                            : 'border-white/[0.06] bg-[#0F172A]/50 text-[#94A3B8]'
                        }`}
                      >
                        <div className="text-[10px] font-medium opacity-80">{field.label}</div>
                        <div className="font-mono font-extrabold text-xs mt-0.5">{field.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActivePage('payslip-verify')}
                rightIcon={<span className="material-symbols-outlined text-sm">arrow_forward</span>}
              >
                Scan Payslip Document
              </Button>
            </div>
          </div>

          {/* Bento Card 2: Verification Speed (Spans 5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] rounded-3xl p-7 sm:p-8 border border-[#00F0FF]/30 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0A0F1D] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">speed</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-mono">
                  &lt; 2.5s Latency
                </span>
              </div>

              <h3 className="text-xl font-black text-[#F8FAFC]">
                Instant Statutory Verification
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Deterministic statutory evaluation against regional minimum wage schedules and Factories Act Section 59 standards.
              </p>

              {/* Animated Speed Progress Ring Visual */}
              <div className="pt-4 flex items-center justify-center">
                <div className="p-4 rounded-2xl bg-[#070B14]/80 border border-white/[0.08] flex items-center gap-4">
                  <CircularProgress value={100} max={100} size={72} strokeWidth={6} label="100%" sublabel="Audited" />
                  <div className="space-y-1 text-xs">
                    <div className="font-extrabold text-[#F8FAFC]">Zero False Compliances</div>
                    <p className="text-[11px] text-[#94A3B8]">Statutory rules verify before AI explains.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActivePage('salary-check')}
                className="text-xs font-bold text-[#00F0FF] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>Calculate Your Expected Pay</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Bento Card 3: The Portable Salary Passport (Spans 12 cols) */}
          <div className="md:col-span-12 glass-card rounded-3xl p-8 sm:p-10 border border-white/[0.08] hover:border-[#00F0FF]/30 transition-all relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-black uppercase tracking-wider font-mono">
                  <span className="material-symbols-outlined text-sm">badge</span>
                  <span>Signature Feature</span>
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] tracking-tight">
                  The Portable Salary Passport
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Consolidate every job, site, and verified salary record into a single tamper-proof digital profile. When switching employers or negotiating contracts, present an audited 98/100 trust rating to win higher wage packages on day one.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setActivePage('salary-passport')}
                    rightIcon={<span className="material-symbols-outlined text-sm">badge</span>}
                  >
                    Explore Salary Passport
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setActivePage('dashboard')}
                    rightIcon={<span className="material-symbols-outlined text-sm">analytics</span>}
                  >
                    Salary Analytics
                  </Button>
                </div>
              </div>

              {/* Passport Card Mini Mock */}
              <div className="lg:col-span-5 bg-[#0A0F1D] rounded-3xl p-6 border border-white/[0.1] shadow-2xl space-y-3.5">
                <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00F0FF] text-lg">shield</span>
                    <span className="text-xs font-black text-white">DIGITAL SALARY PASSPORT</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    VERIFIED
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#94A3B8]">Worker ID:</span>
                  <span className="font-mono text-[#F8FAFC] font-bold">PS-8492-X</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#94A3B8]">Verified Experience:</span>
                  <span className="text-[#F8FAFC] font-bold">36 Months (3 Roles)</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#94A3B8]">Average Salary Growth:</span>
                  <span className="text-emerald-400 font-bold font-mono">+46% Verified</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1 border-t border-white/[0.04]">
                  <span className="text-[#94A3B8]">Trust Rating:</span>
                  <span className="text-emerald-400 font-bold">98/100 Top 5%</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
