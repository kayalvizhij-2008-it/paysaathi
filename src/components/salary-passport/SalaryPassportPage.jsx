import React from 'react';
import { useApp } from '../../context/AppContext';
import PassportCard from './PassportCard';
import TimelineView from './TimelineView';
import JobDetailModal from './JobDetailModal';
import AddJobModal from './AddJobModal';
import SharePassportModal from './SharePassportModal';
import SectionHeader from '../ui/SectionHeader';

export default function SalaryPassportPage() {
  const { t } = useApp();

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#070B14] relative overflow-hidden">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#10B981]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-breathe"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <SectionHeader
          eyebrow="Digital Worker Financial Identity"
          eyebrowIcon="badge"
          title="Your job changes."
          highlightText="Your salary profile doesn't."
          description="A unified, tamper-proof record of your career progression and audited earnings. Build verified credibility and negotiate higher pay across Indian employers."
        />

        {/* 1. Main Signature Passport Card */}
        <PassportCard />

        {/* 2. Interactive Career Timeline */}
        <TimelineView />

        {/* Modals */}
        <JobDetailModal />
        <AddJobModal />
        <SharePassportModal />

      </div>
    </div>
  );
}
