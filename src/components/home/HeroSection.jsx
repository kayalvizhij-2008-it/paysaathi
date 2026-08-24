import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function HeroSection() {
  const { setActivePage, setIsDemoModalOpen, startPayslipAnalysis, t } = useApp();
  const [counterExpected, setCounterExpected] = useState(0);
  const [counterActual, setCounterActual] = useState(0);
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);

  // Animated counter progression
  useEffect(() => {
    const duration = 1400;
    const steps = 36;
    const intervalTime = duration / steps;
    const targetExpected = 18500;
    const targetActual = 16200;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCounterExpected(Math.floor(targetExpected * easeProgress));
      setCounterActual(Math.floor(targetActual * easeProgress));

      if (stepCount >= steps) {
        clearInterval(timer);
        setCounterExpected(targetExpected);
        setCounterActual(targetActual);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Sequential verification checklist cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCheckIndex((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const verificationChecks = [
    {
      id: 1,
      label: 'Base Rate & Attendance',
      status: 'MATCH',
      detail: '22 Days Standard @ ₹600/day = ₹13,200',
      icon: 'check_circle',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30 bg-emerald-500/10'
    },
    {
      id: 2,
      label: 'Night Shift Differential',
      status: 'MATCH',
      detail: '4 Shifts @ 15% Premium = ₹2,420',
      icon: 'check_circle',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30 bg-emerald-500/10'
    },
    {
      id: 3,
      label: 'Statutory 2.0x Overtime Audit',
      status: 'SHORTFALL',
      detail: 'Paid 10h @ flat 1x rate (₹1,200) vs 24h @ 2.0x (₹2,880)',
      icon: 'warning',
      color: 'text-[#F43F5E]',
      border: 'border-[#F43F5E]/40 bg-[#F43F5E]/15'
    },
    {
      id: 4,
      label: 'Deductions Legality Check',
      status: 'FLAGGED',
      detail: 'Unexplained ₹620 "Misc Adj." without contract reference',
      icon: 'report_problem',
      color: 'text-amber-400',
      border: 'border-amber-500/40 bg-amber-500/15'
    }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      
      {/* Ambient Deep Cyan and Emerald Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#10B981]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-breathe"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#10B981]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Live Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0F1D] border border-[#00F0FF]/30 text-[#F8FAFC] text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
              <span className="text-[#00F0FF] uppercase tracking-wider font-mono">Salary Intelligence Engine</span>
              <span className="text-white/[0.3]">•</span>
              <span className="text-[#94A3B8]">Factories Act Sec 59 2.0x OT Standard</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F8FAFC] leading-[1.1]">
              Know What You Earn.<br />
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent text-cyan-glow">
                Verify What You Get.
              </span>
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              PaySaathi turns expected wages, received payments, and discrepancies into something workers can understand simply, clearly, and in their own language.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setActivePage('payslip-verify')}
                rightIcon={<span className="material-symbols-outlined text-lg">verified_user</span>}
                className="w-full sm:w-auto"
              >
                Verify My Pay
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => setActivePage('salary-check')}
                leftIcon={<span className="material-symbols-outlined text-lg text-[#00F0FF]">calculate</span>}
                className="w-full sm:w-auto"
              >
                Check Expected Pay
              </Button>

              <button
                onClick={() => {
                  setActivePage('payslip-verify');
                  startPayslipAnalysis(null, true);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] border border-[#00F0FF]/40 text-[#00F0FF] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              >
                <span className="material-symbols-outlined text-base text-[#00F0FF] material-symbols-fill">auto_awesome</span>
                <span>Try Sample Slip</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-emerald-400">verified</span>
                <span>Deterministic 2.0x OT Audits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#00F0FF]">lock</span>
                <span>Client-Side Verifiable Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#00F0FF]">translate</span>
                <span>English, தமிழ் & हिन्दी</span>
              </div>
            </div>

          </div>

          {/* Right Signature Visual: Live Interactive 3D Floating Digital Payslip Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md relative group">
              
              {/* Outer Cyan Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-br from-[#00F0FF]/30 via-[#10B981]/20 to-transparent rounded-[36px] blur-2xl group-hover:blur-3xl transition-all -z-10"></div>

              {/* Main Card Canvas with Scanning Laser Beam */}
              <div className="glass-card rounded-[36px] p-6 sm:p-7 border border-[#00F0FF]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.2)] relative overflow-hidden backdrop-blur-3xl">
                
                {/* Laser Scanning Animation Beam */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-scan-beam pointer-events-none z-20 shadow-[0_0_15px_rgba(0,240,255,1)]"></div>

                {/* Header of Visual */}
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/40 flex items-center justify-center shadow-inner text-[#00F0FF]">
                      <span className="material-symbols-outlined text-2xl material-symbols-fill">shield_person</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm text-[#F8FAFC]">Security Supervisor</h3>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      </div>
                      <p className="text-xs text-[#94A3B8] font-mono">Vikram Singh • PS-8492-X</p>
                    </div>
                  </div>

                  <Badge status="discrepancy" size="sm" icon={<span className="material-symbols-outlined text-[13px] material-symbols-fill">warning</span>}>
                    Shortfall Flagged
                  </Badge>
                </div>

                {/* SVG Animated Connector Data Lines */}
                <svg className="w-full h-7 mb-2 -mt-1 overflow-visible pointer-events-none" viewBox="0 0 360 28">
                  <path
                    d="M 20 14 H 340"
                    fill="none"
                    stroke="rgba(0, 240, 255, 0.4)"
                    strokeWidth="1.5"
                    className="animate-dash-flow"
                  />
                  <circle cx="20" cy="14" r="3" fill="#00F0FF" />
                  <circle cx="180" cy="14" r="4" fill="#10B981" />
                  <circle cx="340" cy="14" r="3" fill="#00F0FF" />
                </svg>

                {/* Expected vs Actual Payout Comparison Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
                  
                  {/* Expected Salary Card */}
                  <div className="bg-[#0A0F1D] rounded-2xl p-4 border border-white/[0.08]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
                      Expected Standard Pay
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-black text-[#F8FAFC] font-mono">
                        ₹{counterExpected.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold block mt-1">
                      22d + 24h OT @ 2.0x
                    </span>
                  </div>

                  {/* Actual Payout Card with Discrepancy Flag */}
                  <div className="bg-[#0A0F1D] rounded-2xl p-4 border border-[#F43F5E]/40 relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F43F5E]/15 to-transparent pointer-events-none"></div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
                      Actual Received
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-black text-[#F43F5E] font-mono">
                        ₹{counterActual.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#F43F5E] font-black block mt-1">
                      -₹2,300 Shortfall
                    </span>
                  </div>

                </div>

                {/* Live Sequential Verification Checklist */}
                <div className="pt-4 border-t border-white/[0.08] relative z-10 space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00F0FF]">
                      Live Statutory Audit Stream
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      4/4 Rules Evaluated
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {verificationChecks.map((item, idx) => {
                      const isActive = activeCheckIndex === idx;
                      return (
                        <div
                          key={item.id}
                          className={`p-2.5 rounded-xl border text-xs transition-all duration-300 flex items-center justify-between gap-2 ${
                            isActive
                              ? `${item.border} scale-[1.02] shadow-md`
                              : 'border-white/[0.05] bg-[#0A0F1D]/60 text-[#94A3B8]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={`material-symbols-outlined text-base ${item.color} ${isActive ? 'animate-bounce' : ''}`}>
                              {item.icon}
                            </span>
                            <span className="font-bold text-[#F8FAFC] truncate text-[11px]">{item.label}</span>
                          </div>
                          <span className="text-[10px] font-mono shrink-0 font-semibold text-[#94A3B8]">
                            {item.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                    <span className="material-symbols-outlined text-sm text-[#00F0FF]">verified</span>
                    <span>Audited by PaySaathi Rules Engine</span>
                  </div>
                  <button
                    onClick={() => setActivePage('payslip-verify')}
                    className="text-xs text-[#00F0FF] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Run Full Scan</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

