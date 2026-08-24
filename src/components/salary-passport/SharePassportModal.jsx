import React from 'react';
import { useApp } from '../../context/AppContext';

export default function SharePassportModal() {
  const { isShareModalOpen, setIsShareModalOpen, workerProfile, showToast } = useApp();

  if (!isShareModalOpen) return null;

  const shareUrl = `https://paysaathi.app/passport/${workerProfile.workerId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    showToast('Encrypted Passport Link Copied to Clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A0F1D] border border-[#00F0FF]/30 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#F8FAFC] text-center">
        
        {/* Close Button */}
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* QR Code Container */}
        <div className="mx-auto w-48 h-48 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center mb-4 mt-2">
          {/* Stylized QR representation */}
          <div className="w-full h-full border-2 border-black p-2 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="w-8 h-8 border-4 border-black bg-black"></div>
              <div className="w-8 h-8 border-4 border-black bg-black"></div>
            </div>
            <div className="text-center font-mono text-[9px] font-bold text-black uppercase tracking-wider py-1">
              PAYSAATHI VERIFIED<br />
              <span className="text-[#0284C7]">{workerProfile.workerId}</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="w-8 h-8 border-4 border-black bg-black"></div>
              <span className="material-symbols-outlined text-black text-2xl">verified</span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-black text-[#F8FAFC] mb-1">
          {workerProfile.name}'s Salary Passport
        </h3>
        <p className="text-xs text-[#94A3B8] mb-4">
          Scan to verify 36 months of authenticated wage history & 98/100 Trust Score.
        </p>

        {/* Copyable Link */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#0F172A] border border-white/[0.1] text-xs font-mono text-[#94A3B8] mb-5">
          <span className="truncate flex-1 text-left px-2 text-[#F8FAFC]">{shareUrl}</span>
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-1.5 rounded-lg bg-[#00F0FF] text-[#070B14] font-black shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Copy
          </button>
        </div>

        <div className="text-[11px] text-emerald-400 flex items-center justify-center gap-1.5 font-semibold">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span>Worker-Consented Encrypted Profile</span>
        </div>

      </div>
    </div>
  );
}
