import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/wageCalculator';
import AudioPlayer from '../common/AudioPlayer';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function VerificationResult({ result, onReUpload, onInspectSource }) {
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
    <div className="glass-card rounded-[36px] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(0,240,255,0.15)] border border-[#00F0FF]/30 relative overflow-hidden animate-in fade-in zoom-in-95 duration-400">
      
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
            Discrepancy Detected
          </Badge>

          <h3 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
            {result.monthYear} Payslip Statutory Audit
          </h3>

          <p className="text-xs text-[#94A3B8] mt-1">
            Employer: <span className="font-bold text-[#F8FAFC]">{result.employerName}</span> • Site: {result.clientSite}
          </p>

          <div className="flex items-center gap-3 text-[11px] text-[#94A3B8] mt-1.5 font-mono">
            <span>Disbursement Date: {result.disbursementDate || '07 Nov 2024'}</span>
            <span>•</span>
            <span>Worker: {workerProfile.name} ({workerProfile.workerId})</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {onInspectSource && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onInspectSource}
              leftIcon={<span className="material-symbols-outlined text-base">visibility</span>}
            >
              Inspect Slip
            </Button>
          )}

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
            Print Audit
          </Button>
        </div>
      </div>

      {/* 3-Column High-Level KPI Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        
        {/* Expected Pay */}
        <div className="p-5 rounded-3xl bg-[#0A0F1D] border border-white/[0.08]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
            {t.expectedPay}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#F8FAFC] font-mono">
            {formatINR(result.expectedGross)}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
            Statutory Scheduled Benchmark
          </span>
        </div>

        {/* Actual Deposited Pay */}
        <div className="p-5 rounded-3xl bg-[#0A0F1D] border border-white/[0.08]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
            {t.actualPay} (Slip)
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#F8FAFC] font-mono">
            {formatINR(result.actualReceived)}
          </div>
          <span className="text-[10px] text-[#94A3B8] mt-1 block">
            Net Credited to Account
          </span>
        </div>

        {/* Potential Shortfall Difference */}
        <div className="p-5 rounded-3xl bg-[#1A1015] border border-[#F43F5E]/50 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F43F5E] block mb-1">
            Difference Flagged
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#F43F5E] font-mono">
            -{formatINR(result.discrepancyAmount)}
          </div>
          <span className="text-[10px] text-[#F43F5E] font-bold mt-1 block">
            Requires Formal Employer Clarification
          </span>
        </div>

      </div>

      {/* Factual Non-Accusatory Legal Notice Box */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/30 text-xs text-[#94A3B8] flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-[#00F0FF] text-xl shrink-0">info</span>
        <p className="leading-relaxed">
          <strong className="text-[#F8FAFC]">Notice:</strong> PaySaathi detected a difference between the expected and received amount based on the available information and statutory rates under Factories Act Section 59.
        </p>
      </div>

      {/* Itemized Line-by-Line Statutory Audit Table */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-between items-center pb-2 border-b border-white/[0.08]">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#F8FAFC]">
            Itemized Statutory Line Audit
          </h4>
          <span className="text-[11px] text-[#00F0FF] font-mono">
            Factories Act Sec 59 Compliance
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
                    ? 'bg-[#0A0F1D] border-white/[0.08]'
                    : 'bg-[#1A1015]/80 border-[#F43F5E]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`material-symbols-outlined text-xl mt-0.5 ${
                        isMatch ? 'text-emerald-400' : 'text-[#F43F5E]'
                      }`}
                    >
                      {isMatch ? 'check_circle' : 'error'}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-[#F8FAFC]">{item.label}</h5>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-relaxed">{item.note}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {item.difference !== 0 && (
                      <span className="text-xs text-[#94A3B8] line-through font-mono">
                        {formatINR(item.expectedAmount)}
                      </span>
                    )}
                    <span
                      className={`text-xs font-bold font-mono px-3 py-1 rounded-xl ${
                        isMatch
                          ? 'bg-[#0F172A] text-[#F8FAFC]'
                          : 'bg-[#F43F5E] text-[#070B14] font-black shadow-sm'
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
      <div className="bg-[#0A0F1D] text-[#F8FAFC] rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/[0.1] mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF]">
              <span className="material-symbols-outlined text-lg">psychology</span>
            </div>
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
              AI Plain-Language Explanation
            </h4>
          </div>

          {/* Voice Audio Player */}
          <AudioPlayer text={result.explanationText} label={t.listenExplanation} />
        </div>

        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          {result.explanationText}
        </p>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-[#94A3B8]">
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
          leftIcon={<span className="material-symbols-outlined text-lg text-[#00F0FF]">badge</span>}
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
