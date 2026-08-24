import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/wageCalculator';
import AudioPlayer from '../common/AudioPlayer';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function VerificationResult({ result, onReUpload }) {
  const {
    setActivePage,
    handleSaveCalculationToPassport,
    showToast,
    workerProfile,
    t
  } = useApp();

  const handleExportPDF = () => {
    window.print();
    showToast('Printing / Exporting Verification Audit Certificate...');
  };

  return (
    <div className="glass-card rounded-[32px] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(200,30,58,0.2)] border border-[#E11D3C]/30 relative overflow-hidden animate-in fade-in zoom-in-95 duration-400">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          {/* Status Badge */}
          <Badge
            status="discrepancy"
            size="lg"
            icon={<span className="material-symbols-outlined text-base material-symbols-fill">warning</span>}
            className="mb-2.5"
          >
            {t.potentialDiscrepancy}
          </Badge>

          <h3 className="text-2xl sm:text-3xl font-black text-[#F5F5F7]">
            {result.monthYear} Payslip Statutory Audit
          </h3>

          <p className="text-xs text-[#9A9AA3] mt-1">
            Employer: <span className="font-bold text-[#F5F5F7]">{result.employerName}</span> • Site: {result.clientSite}
          </p>

          <div className="flex items-center gap-3 text-[11px] text-[#9A9AA3] mt-1.5 font-mono">
            <span>Disbursement Date: {result.disbursementDate || '07 Nov 2024'}</span>
            <span>•</span>
            <span>Bank: {workerProfile.bankAccountMasked}</span>
          </div>
        </div>

        <div className="flex gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={onReUpload}
            leftIcon={<span className="material-symbols-outlined text-base">upload_file</span>}
          >
            New Scan
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportPDF}
            leftIcon={<span className="material-symbols-outlined text-base">print</span>}
          >
            Print
          </Button>
        </div>
      </div>

      {/* 3-Column High-Level KPI Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        
        {/* Expected Pay */}
        <div className="p-5 rounded-2xl bg-[#121214] border border-white/[0.08]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A9AA3] block mb-1">
            {t.expectedPay}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#F5F5F7] font-mono">
            {formatINR(result.expectedGross)}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
            Statutory Scheduled Benchmark
          </span>
        </div>

        {/* Actual Deposited Pay */}
        <div className="p-5 rounded-2xl bg-[#121214] border border-white/[0.08]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A9AA3] block mb-1">
            {t.actualPay} (Slip)
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#F5F5F7] font-mono">
            {formatINR(result.actualReceived)}
          </div>
          <span className="text-[10px] text-[#9A9AA3] mt-1 block">
            Net Deposited to Bank
          </span>
        </div>

        {/* Potential Shortfall Difference */}
        <div className="p-5 rounded-2xl bg-[#2A1017] border border-[#E11D3C]/50 shadow-[0_0_20px_rgba(225,29,60,0.2)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E11D3C] block mb-1">
            Potential Shortfall
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#E11D3C] font-mono">
            -{formatINR(result.discrepancyAmount)}
          </div>
          <span className="text-[10px] text-red-400 font-bold mt-1 block">
            Requires Formal Review
          </span>
        </div>

      </div>

      {/* Itemized Line-by-Line Statutory Audit Table */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-between items-center pb-2 border-b border-white/[0.08]">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5F5F7]">
            Itemized Statutory Line Audit
          </h4>
          <span className="text-[11px] text-[#9A9AA3] font-mono">
            Factories Act Sec 59 Standard
          </span>
        </div>

        <div className="space-y-2.5">
          {result.lineItems.map((item) => {
            const isMatch = item.status === 'MATCH';
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isMatch
                    ? 'bg-[#121214] border-white/[0.08]'
                    : 'bg-[#2A1017]/70 border-[#E11D3C]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`material-symbols-outlined text-xl mt-0.5 ${
                        isMatch ? 'text-emerald-400' : 'text-[#E11D3C]'
                      }`}
                    >
                      {isMatch ? 'check_circle' : 'error'}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-[#F5F5F7]">{item.label}</h5>
                      <p className="text-[11px] text-[#9A9AA3] mt-0.5 leading-relaxed">{item.note}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {item.difference !== 0 && (
                      <span className="text-xs text-[#9A9AA3] line-through font-mono">
                        {formatINR(item.expectedAmount)}
                      </span>
                    )}
                    <span
                      className={`text-xs font-bold font-mono px-2.5 py-1 rounded-xl ${
                        isMatch
                          ? 'bg-[#1C1C1F] text-[#F5F5F7]'
                          : 'bg-[#C81E3A] text-white font-extrabold shadow-sm'
                      }`}
                    >
                      {item.actualAmount < 0
                        ? `-${formatINR(Math.abs(item.actualAmount))}`
                        : formatINR(item.actualAmount)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Plain-Language Explanation & Speech Player Box */}
      <div className="bg-[#121214] text-[#F5F5F7] rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/[0.1] mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E11D3C]/20 flex items-center justify-center text-[#E11D3C]">
              <span className="material-symbols-outlined text-lg">psychology</span>
            </div>
            <h4 className="text-xs font-bold text-[#F5F5F7] uppercase tracking-wider">
              AI Plain-Language Explanation
            </h4>
          </div>

          {/* Voice Audio Player */}
          <AudioPlayer text={result.explanationText} label={t.listenExplanation} />
        </div>

        <p className="text-xs sm:text-sm text-[#9A9AA3] leading-relaxed">
          {result.explanationText}
        </p>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-[#9A9AA3]">
          <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
          <span>{t.rulesVerifyAiExplains}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleSaveCalculationToPassport}
          leftIcon={<span className="material-symbols-outlined text-lg text-[#E11D3C]">badge</span>}
          className="flex-1"
        >
          Save Verified Audit to Passport
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={() => setActivePage('worker-action')}
          leftIcon={<span className="material-symbols-outlined text-lg">mail</span>}
          className="flex-1"
        >
          Draft Polite WhatsApp / HR Inquiry
        </Button>
      </div>

    </div>
  );
}
