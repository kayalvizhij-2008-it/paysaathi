import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { setActivePage, t } = useApp();

  return (
    <footer className="w-full bg-[#0A0A0B] border-t border-white/[0.08] pt-16 pb-28 md:pb-14 text-[#9A9AA3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C81E3A] via-[#E11D3C] to-[#7A0F22] p-0.5 shadow-[0_0_12px_rgba(225,29,60,0.4)]">
                <div className="w-full h-full bg-[#0A0A0B] rounded-[9px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#E11D3C] text-sm material-symbols-fill">shield</span>
                </div>
              </div>
              <span className="font-black text-lg text-[#F5F5F7]">
                Pay<span className="text-[#E11D3C]">Saathi</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm max-w-md text-[#9A9AA3] leading-relaxed">
              Autonomous salary slip auditing, statutory 2.0x overtime verification, and portable career passports for modern Indian wage earners.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1C1F] border border-[#E11D3C]/30 text-xs text-[#F5F5F7]">
              <span className="material-symbols-outlined text-sm text-[#E11D3C]">verified</span>
              <span>{t.rulesVerifyAiExplains}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5F5F7]">Platform Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('salary-check')} className="hover:text-[#E11D3C] transition-colors cursor-pointer">
                  {t.menuCheck}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('payslip-verify')} className="hover:text-[#E11D3C] transition-colors cursor-pointer">
                  {t.menuVerify}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('salary-passport')} className="hover:text-[#E11D3C] transition-colors cursor-pointer">
                  {t.menuPassport}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-[#E11D3C] transition-colors cursor-pointer">
                  {t.menuDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('worker-action')} className="hover:text-[#E11D3C] transition-colors cursor-pointer">
                  {t.menuAction}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Legal Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5F5F7]">Statutory Compliance</h4>
            <ul className="space-y-2 text-xs text-[#9A9AA3]">
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Minimum Wages Act, 1948</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Factories Act Sec 59 (2.0x OT Multiplier)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Client-Side Data Privacy</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                <span>Portable Salary Passport</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#9A9AA3]">
          <p>© {new Date().getFullYear()} PaySaathi Fintech. Built for India's Skilled Workforce.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Zonal Wage Benchmarks</span>
            <span className="hover:text-white cursor-pointer transition-colors">Dispute Resolution Desk</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
