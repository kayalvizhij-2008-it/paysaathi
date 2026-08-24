import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function HeroSection() {
  const { setActivePage, setIsDemoModalOpen, startPayslipAnalysis, t } = useApp();
  const [counterExpected, setCounterExpected] = useState(0);
  const [counterActual, setCounterActual] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;
    const targetExpected = 18500;
    const targetActual = 16200;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      // Cubic ease out
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

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      
      {/* Soft Breathing Radial Red Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#C81E3A]/20 via-[#7A0F22]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-breathe"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#E11D3C]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1F] border border-[#E11D3C]/30 text-[#F5F5F7] text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E11D3C] animate-ping"></span>
              <span className="text-[#E11D3C] uppercase tracking-wider">Fintech Verification Engine</span>
              <span className="text-white/[0.3]">•</span>
              <span className="text-[#9A9AA3]">Factories Act 2.0x OT Audit</span>
            </div>

            {/* Main Headline (Value prop in <= 8 words) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F5F7] leading-[1.1]">
              Know What You Earn.<br />
              <span className="bg-gradient-to-r from-[#E11D3C] via-[#C81E3A] to-[#F5F5F7] bg-clip-text text-transparent text-glow">
                Verify What You Deserve.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#9A9AA3] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Autonomous salary slip auditing, statutory overtime calculation, and digital career passporting for modern Indian wage earners.
            </p>

            {/* Action CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setActivePage('salary-check')}
                rightIcon={<span className="material-symbols-outlined text-lg">arrow_forward</span>}
                className="w-full sm:w-auto"
              >
                {t.checkSalaryBtn}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setActivePage('payslip-verify');
                }}
                leftIcon={<span className="material-symbols-outlined text-lg text-[#E11D3C]">verified_user</span>}
                className="w-full sm:w-auto"
              >
                {t.verifyPayslipBtn}
              </Button>

              <button
                onClick={() => {
                  setActivePage('payslip-verify');
                  startPayslipAnalysis(null, true);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-[#9A9AA3] hover:text-[#F5F5F7] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-base text-[#E11D3C] material-symbols-fill">auto_awesome</span>
                <span>Try Sample Slip</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#9A9AA3]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-emerald-400">verified</span>
                <span>Statutory 2.0x OT Audited</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-emerald-400">lock</span>
                <span>Client-Side Data Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-emerald-400">translate</span>
                <span>English, Hindi & Tamil</span>
              </div>
            </div>

          </div>

          {/* Right Signature Visual: Floating Document Card + SVG Data Lines + Live Metric Cards */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md relative group">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C81E3A]/30 via-[#7A0F22]/20 to-transparent rounded-[32px] blur-2xl group-hover:blur-3xl transition-all -z-10"></div>

              {/* Main Card Canvas with Laser Scan Line */}
              <div className="glass-card rounded-[32px] p-6 sm:p-7 border border-[#E11D3C]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(200,30,58,0.2)] relative overflow-hidden backdrop-blur-3xl">
                
                {/* Laser Scanning Animation Beam */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E11D3C] to-transparent animate-scan-beam pointer-events-none z-20"></div>

                {/* Header of Visual */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#1C1C1F] border border-[#E11D3C]/40 flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-[#E11D3C] text-2xl material-symbols-fill">shield_person</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm text-[#F5F5F7]">Security Supervisor</h3>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      </div>
                      <p className="text-xs text-[#9A9AA3] font-mono">Vikram Singh • PS-8492-X</p>
                    </div>
                  </div>

                  <Badge status="discrepancy" size="sm" icon={<span className="material-symbols-outlined text-[13px] material-symbols-fill">warning</span>}>
                    Review Flag
                  </Badge>
                </div>

                {/* SVG Animated Connector Data Lines */}
                <svg className="w-full h-8 mb-2 -mt-2 overflow-visible pointer-events-none" viewBox="0 0 360 30">
                  <path
                    d="M 20 15 H 340"
                    fill="none"
                    stroke="rgba(225, 29, 60, 0.4)"
                    strokeWidth="1.5"
                    className="animate-dash-flow"
                  />
                  <circle cx="20" cy="15" r="3" fill="#E11D3C" />
                  <circle cx="180" cy="15" r="4" fill="#C81E3A" />
                  <circle cx="340" cy="15" r="3" fill="#E11D3C" />
                </svg>

                {/* Expected vs Actual Payout Comparison Grid */}
                <div className="space-y-3 mb-6 relative z-10">
                  
                  {/* Expected Salary Card */}
                  <div className="bg-[#121214] rounded-2xl p-4 border border-white/[0.08]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A9AA3]">
                        Expected Standard Pay
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        22d + 24h OT @ 2.0x
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-[#F5F5F7] font-mono">
                        ₹{counterExpected.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#9A9AA3]">/mo</span>
                    </div>
                  </div>

                  {/* Actual Payout Card with Discrepancy Flag */}
                  <div className="bg-[#121214] rounded-2xl p-4 border border-[#E11D3C]/30 relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#C81E3A]/15 to-transparent pointer-events-none"></div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A9AA3]">
                        Actual Received (October)
                      </span>
                      <span className="text-[10px] text-[#E11D3C] font-extrabold bg-[#C81E3A]/20 px-2 py-0.5 rounded-full border border-[#E11D3C]/30">
                        -₹2,300 Shortfall
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-[#E11D3C] font-mono">
                        ₹{counterActual.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#9A9AA3]">/mo</span>
                    </div>
                  </div>

                </div>

                {/* Career Passport Timeline Preview */}
                <div className="pt-4 border-t border-white/[0.08] relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#E11D3C]">
                      Verified Career Records
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold">
                      98/100 Trust Score
                    </span>
                  </div>

                  {/* 3 Career Mini Nodes */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-[#1C1C1F]/80 border border-white/[0.06]">
                      <div className="text-[10px] text-[#9A9AA3]">2024 (13m)</div>
                      <div className="font-extrabold text-[#F5F5F7] text-xs mt-0.5 font-mono">₹15,000</div>
                      <div className="text-[9px] text-[#9A9AA3] truncate">Guard</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#1C1C1F]/80 border border-white/[0.06]">
                      <div className="text-[10px] text-[#9A9AA3]">2025 (11m)</div>
                      <div className="font-extrabold text-[#F5F5F7] text-xs mt-0.5 font-mono">₹18,000</div>
                      <div className="text-[9px] text-[#9A9AA3] truncate">Sr. Guard</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#2A1017] border border-[#E11D3C]/40">
                      <div className="text-[10px] text-[#E11D3C] font-bold">2026 (Active)</div>
                      <div className="font-extrabold text-[#E11D3C] text-xs mt-0.5 font-mono">₹22,000</div>
                      <div className="text-[9px] text-[#F5F5F7] truncate font-medium">Supervisor</div>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#9A9AA3]">
                    <span className="material-symbols-outlined text-sm text-[#E11D3C]">verified</span>
                    <span>Audited by PaySaathi Rules Engine</span>
                  </div>
                  <button
                    onClick={() => setActivePage('salary-passport')}
                    className="text-xs text-[#E11D3C] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View Passport</span>
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
