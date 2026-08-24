import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';

export default function Navbar() {
  const {
    activePage,
    setActivePage,
    language,
    setLanguage,
    t,
    setIsDemoModalOpen,
    workerProfile
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Track scroll position for sticky glassmorphic background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile menu & profile dropdown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'home', label: t.menuHome, icon: 'home' },
    { id: 'salary-check', label: t.menuCheck, icon: 'calculate' },
    { id: 'payslip-verify', label: t.menuVerify, icon: 'verified_user' },
    { id: 'salary-passport', label: t.menuPassport, icon: 'badge' },
    { id: 'dashboard', label: t.menuDashboard, icon: 'analytics' },
    { id: 'voice-assistant', label: 'Voice AI', icon: 'graphic_eq' },
    { id: 'worker-action', label: t.menuAction, icon: 'gavel' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070B14]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-2.5'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Clean Wordmark (No AI MVP badge) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <div
            onClick={() => { setActivePage('home'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00F0FF] via-[#06B6D4] to-[#10B981] p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#070B14] rounded-[14px] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#00F0FF] text-xl material-symbols-fill">
                  shield
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-[#F8FAFC] group-hover:text-white transition-colors">
                  Pay<span className="text-[#00F0FF]">Saathi</span>
                </span>
              </div>
              <p className="text-[10px] text-[#94A3B8] tracking-wide hidden sm:block font-medium">
                Worker Salary Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Pill Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0A0F1D]/80 px-2.5 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-xl shadow-inner">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#06B6D4] text-[#070B14] font-black shadow-[0_0_18px_rgba(0,240,255,0.45)] scale-[1.02]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.06]'
                }`}
              >
                <span className={`material-symbols-outlined text-[15px] ${isActive ? 'material-symbols-fill' : ''}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls Bar */}
        <div className="flex items-center gap-2.5">
          
          {/* Multilingual Selector */}
          <div className="flex items-center bg-[#0A0F1D] border border-white/[0.08] rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#00F0FF] text-[#070B14] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#00F0FF] text-[#070B14] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                language === 'ta'
                  ? 'bg-[#00F0FF] text-[#070B14] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Quick Demo CTA */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsDemoModalOpen(true)}
            className="hidden sm:inline-flex"
            leftIcon={<span className="material-symbols-outlined text-sm material-symbols-fill">play_arrow</span>}
          >
            {t.tryDemoBtn}
          </Button>

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center p-0.5 rounded-full hover:ring-2 hover:ring-[#00F0FF]/60 transition-all cursor-pointer focus:outline-none"
              aria-label="User Profile Menu"
              aria-expanded={isProfileOpen}
            >
              <div className="w-9 h-9 rounded-full bg-[#0F172A] border border-[#00F0FF]/40 p-0.5 overflow-hidden">
                <img
                  src={workerProfile.avatarUrl}
                  alt={workerProfile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </button>

            {/* Profile Dropdown Popup */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-[#0A0F1D] border border-white/[0.12] rounded-3xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.15)] z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl">
                <div className="flex items-center gap-3 pb-3.5 border-b border-white/[0.08]">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#00F0FF] shrink-0">
                    <img src={workerProfile.avatarUrl} alt={workerProfile.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#F8FAFC] leading-tight">{workerProfile.name}</h4>
                    <p className="text-xs text-[#00F0FF] font-semibold">{workerProfile.role}</p>
                    <p className="text-[10px] text-[#94A3B8] font-mono mt-0.5">ID: {workerProfile.workerId}</p>
                  </div>
                </div>

                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#94A3B8]">
                    <span>Trust Rating:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm material-symbols-fill">verified</span>
                      {workerProfile.trustScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#94A3B8]">
                    <span>Verified Tenure:</span>
                    <span className="font-bold text-[#F8FAFC]">{workerProfile.totalTenureMonths} Months</span>
                  </div>
                  <div className="flex justify-between items-center text-[#94A3B8]">
                    <span>Current Deployment:</span>
                    <span className="font-medium text-white truncate max-w-[130px]">{workerProfile.currentEmployer}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] space-y-1.5">
                  <button
                    onClick={() => { setActivePage('salary-passport'); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#F8FAFC] hover:bg-white/[0.06] hover:text-[#00F0FF] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>View Digital Passport</span>
                    <span className="material-symbols-outlined text-sm">badge</span>
                  </button>
                  <button
                    onClick={() => { setActivePage('dashboard'); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#F8FAFC] hover:bg-white/[0.06] hover:text-[#00F0FF] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Salary Analytics</span>
                    <span className="material-symbols-outlined text-sm">analytics</span>
                  </button>
                  <button
                    onClick={() => { setActivePage('voice-assistant'); setIsProfileOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#F8FAFC] hover:bg-white/[0.06] hover:text-[#00F0FF] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Voice Assistant</span>
                    <span className="material-symbols-outlined text-sm">graphic_eq</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Slide-in Drawer */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-[#070B14] border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-2.5 animate-in slide-in-from-top duration-200"
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#06B6D4] text-[#070B14] font-black shadow-md'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className={`material-symbols-outlined text-lg ${isActive ? 'material-symbols-fill' : ''}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => { setIsDemoModalOpen(true); setIsMobileMenuOpen(false); }}
              leftIcon={<span className="material-symbols-outlined text-lg material-symbols-fill">play_arrow</span>}
            >
              {t.tryDemoBtn}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
