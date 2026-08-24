import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import BottomNav from './components/common/BottomNav';
import Footer from './components/common/Footer';
import DemoModal from './components/common/DemoModal';

// Pages
import HeroSection from './components/home/HeroSection';
import JourneySection from './components/home/JourneySection';
import QuickCalculator from './components/home/QuickCalculator';
import BentoFeatures from './components/home/BentoFeatures';
import TrustSection from './components/home/TrustSection';
import Testimonials from './components/home/Testimonials';

import SalaryCheckPage from './components/salary-check/SalaryCheckPage';
import PayslipVerifyPage from './components/payslip-verify/PayslipVerifyPage';
import SalaryPassportPage from './components/salary-passport/SalaryPassportPage';
import WorkerDashboardPage from './components/dashboard/WorkerDashboardPage';
import WorkerActionPage from './components/worker-action/WorkerActionPage';

// Page title map
const PAGE_TITLES = {
  home: 'PaySaathi — India\'s Worker Wage Intelligence Platform',
  'salary-check': 'Wage Benchmark Calculator — PaySaathi',
  'payslip-verify': 'Payslip Verification — PaySaathi',
  'salary-passport': 'Salary Passport — PaySaathi',
  dashboard: 'Worker Dashboard — PaySaathi',
  'worker-action': 'Dispute Resolution Drafts — PaySaathi',
};

function AppContent() {
  const { activePage, toastMessage } = useApp();

  // Dynamic document title per page
  useEffect(() => {
    document.title = PAGE_TITLES[activePage] || PAGE_TITLES.home;
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F7] flex flex-col relative selection:bg-[#E11D3C]/40 selection:text-white">
      
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true"></div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="fixed top-20 right-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 ${
            toastMessage.type === 'warning'
              ? 'bg-[#1A1209] text-amber-400 border-amber-500/40'
              : 'bg-[#0A150E] text-emerald-400 border-emerald-500/40'
          }`}>
            <span className="material-symbols-outlined text-base material-symbols-fill">
              {toastMessage.type === 'warning' ? 'warning' : 'check_circle'}
            </span>
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Navigation Top Header */}
      <Navbar />

      {/* Main Content Router */}
      <main id="main-content" className="flex-grow" tabIndex="-1">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <JourneySection />
            <QuickCalculator />
            <BentoFeatures />
            <TrustSection />
            <Testimonials />
          </>
        )}

        {activePage === 'salary-check' && <SalaryCheckPage />}
        {activePage === 'payslip-verify' && <PayslipVerifyPage />}
        {activePage === 'salary-passport' && <SalaryPassportPage />}
        {activePage === 'dashboard' && <WorkerDashboardPage />}
        {activePage === 'worker-action' && <WorkerActionPage />}
      </main>

      {/* Interactive Demo Tour Modal */}
      <DemoModal />

      {/* Global Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

    </div>
  );
}

export default AppContent;
