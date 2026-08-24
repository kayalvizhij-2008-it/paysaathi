import React from 'react';
import { useApp } from '../../context/AppContext';

export default function BottomNav() {
  const { activePage, setActivePage, t } = useApp();

  const navItems = [
    { id: 'home', label: t.menuHome, icon: 'home' },
    { id: 'salary-check', label: t.menuCheck, icon: 'payments' },
    { id: 'payslip-verify', label: t.menuVerify, icon: 'verified_user' },
    { id: 'salary-passport', label: t.menuPassport, icon: 'badge' },
    { id: 'dashboard', label: t.menuDashboard, icon: 'dashboard' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D0D0F]/95 backdrop-blur-2xl border-t border-white/[0.07] px-2 py-1.5 md:hidden shadow-[0_-8px_32px_rgba(0,0,0,0.8)]"
      aria-label="Primary mobile navigation"
    >
      {/* Active indicator track */}
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all duration-200 cursor-pointer min-w-[52px] ${
                isActive
                  ? 'text-[#E11D3C] font-semibold scale-105'
                  : 'text-[#9A9AA3] hover:text-[#F5F5F7] active:scale-95'
              }`}
            >
              {/* Active pill indicator */}
              {isActive && (
                <span className="absolute -translate-y-4 w-8 h-0.5 rounded-full bg-[#E11D3C] shadow-[0_0_6px_rgba(225,29,60,0.7)]"></span>
              )}
              <span className={`material-symbols-outlined text-[22px] ${isActive ? 'material-symbols-fill' : ''}`}>
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
