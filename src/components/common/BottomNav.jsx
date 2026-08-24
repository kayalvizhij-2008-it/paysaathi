import React from 'react';
import { useApp } from '../../context/AppContext';

export default function BottomNav() {
  const { activePage, setActivePage, t } = useApp();

  const navItems = [
    { id: 'home', label: t.menuHome, icon: 'home' },
    { id: 'salary-check', label: t.menuCheck, icon: 'calculate' },
    { id: 'payslip-verify', label: t.menuVerify, icon: 'verified_user' },
    { id: 'salary-passport', label: t.menuPassport, icon: 'badge' },
    { id: 'voice-assistant', label: 'Voice AI', icon: 'graphic_eq' },
    { id: 'dashboard', label: t.menuDashboard, icon: 'analytics' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#070B14]/95 backdrop-blur-2xl border-t border-white/[0.08] px-2 py-1.5 lg:hidden shadow-[0_-10px_35px_rgba(0,0,0,0.9)]"
      aria-label="Primary mobile navigation"
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 cursor-pointer min-w-[48px] ${
                isActive
                  ? 'text-[#00F0FF] font-black scale-105'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] active:scale-95'
              }`}
            >
              {isActive && (
                <span className="absolute -translate-y-4 w-7 h-0.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.9)]"></span>
              )}
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'material-symbols-fill' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[9px] mt-0.5 tracking-tight font-semibold uppercase">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
