import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { setActivePage, t } = useApp();

  return (
    <footer className="w-full bg-[#050811] border-t border-white/[0.08] pt-16 pb-28 md:pb-14 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00F0FF] via-[#06B6D4] to-[#10B981] p-0.5 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                <div className="w-full h-full bg-[#070B14] rounded-[9px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#00F0FF] text-sm material-symbols-fill">shield</span>
                </div>
              </div>
              <span className="font-black text-lg text-[#F8FAFC]">
                Pay<span className="text-[#00F0FF]">Saathi</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm max-w-md text-[#94A3B8] leading-relaxed">
              Worker-focused salary intelligence platform. Turning expected wages, payslip auditing, and dispute resolution into transparent, actionable clarity in your language.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A] border border-[#00F0FF]/30 text-xs text-[#F8FAFC]">
              <span className="material-symbols-outlined text-sm text-[#00F0FF]">verified</span>
              <span>{t.rulesVerifyAiExplains}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F8FAFC]">Platform Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('salary-check')} className="hover:text-[#00F0FF] transition-colors cursor-pointer">
                  {t.menuCheck}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('payslip-verify')} className="hover:text-[#00F0FF] transition-colors cursor-pointer">
                  {t.menuVerify}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('salary-passport')} className="hover:text-[#00F0FF] transition-colors cursor-pointer">
                  {t.menuPassport}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-[#00F0FF] transition-colors cursor-pointer">
                  {t.menuDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('voice-assistant')} className="hover:text-[#00F0FF] transition-colors cursor-pointer">
                  Voice Assistant AI
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('worker-action')} className="hover:text-[#00F0FF] transition-colors cursor-pointer">
                  {t.menuAction}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Legal Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F8FAFC]">Statutory Frameworks</h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Minimum Wages Act, 1948</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Factories Act Sec 59 (2.0x Statutory OT)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Client-Side Verifiable Privacy</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Portable Career Credential Standard</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} PaySaathi. Salary Intelligence for Indian Workers.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Statutory Wage Benchmarks</span>
            <span className="hover:text-white cursor-pointer transition-colors">Dispute Resolution Desk</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
