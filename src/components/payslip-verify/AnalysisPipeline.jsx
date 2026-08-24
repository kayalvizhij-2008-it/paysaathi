import React from 'react';
import { useApp } from '../../context/AppContext';
import { LinearProgress } from '../ui/Progress';
import { SAMPLE_PAYSLIP_SCENARIO } from '../../utils/sampleData';

export default function AnalysisPipeline() {
  const {
    uploadState,
    uploadProgress,
    analysisStage,
    uploadedFile,
    extractedFieldsVisible
  } = useApp();

  const stages = [
    {
      id: 1,
      title: 'Validating & Reading Document',
      detail: uploadedFile ? `${uploadedFile.name} (${uploadedFile.size})` : 'Oct_2024_Payslip.pdf (2.4 MB)',
      icon: 'description'
    },
    {
      id: 2,
      title: 'Extracting Wage Data via OCR',
      detail: 'Parses earnings, attendance days, and overtime hours',
      icon: 'qr_code_scanner'
    },
    {
      id: 3,
      title: 'Auditing Overtime Multipliers',
      detail: 'Evaluating logged OT against Factories Act Sec 59 2.0x standard',
      icon: 'timer'
    },
    {
      id: 4,
      title: 'Auditing Deduction Schedules',
      detail: 'Cross-referencing line items with Labour Welfare schedules',
      icon: 'rule'
    },
    {
      id: 5,
      title: 'Generating Audit Verdict & Insights',
      detail: 'Rules verify. AI explains. Comprehensive breakdown generated.',
      icon: 'verified'
    }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#E11D3C]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(200,30,58,0.2)] space-y-6 relative overflow-hidden backdrop-blur-2xl">
      
      {/* Laser Scanning Animation Beam */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E11D3C] to-transparent animate-scan-beam pointer-events-none z-20"></div>

      {/* Pipeline Header */}
      <div className="flex justify-between items-center pb-4 border-b border-white/[0.08] relative z-10">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E11D3C]">
            OCR Auditing Pipeline Active
          </span>
          <h3 className="text-sm sm:text-base font-black text-[#F5F5F7]">
            Salary Document Analysis
          </h3>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1C1F] text-[#E11D3C] text-xs font-bold border border-[#E11D3C]/30">
          <span className="w-2 h-2 rounded-full bg-[#E11D3C] animate-ping"></span>
          <span>Stage {analysisStage || 1} of 5</span>
        </div>
      </div>

      {/* Real-time Progress Bar */}
      <div className="space-y-1.5 relative z-10">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#9A9AA3] font-medium">Pipeline Execution</span>
          <span className="text-[#E11D3C] font-mono font-bold">
            {uploadState === 'uploading' ? `${uploadProgress}%` : `${(analysisStage / 5) * 100}%`}
          </span>
        </div>
        <LinearProgress
          value={uploadState === 'uploading' ? uploadProgress : (analysisStage / 5) * 100}
          max={100}
        />
      </div>

      {/* Sequential Stages List */}
      <div className="space-y-3.5 relative z-10">
        {stages.map((stage) => {
          const isComplete = analysisStage > stage.id;
          const isCurrent = analysisStage === stage.id;
          const isPending = analysisStage < stage.id;

          return (
            <div key={stage.id} className="flex items-start gap-3.5">
              
              {/* Status Indicator Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isComplete
                    ? 'bg-emerald-500 text-[#0A0A0B] shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                    : isCurrent
                    ? 'bg-[#E11D3C] text-white animate-bounce shadow-[0_0_15px_rgba(225,29,60,0.6)]'
                    : 'bg-[#1C1C1F] text-[#9A9AA3] border border-white/[0.08]'
                }`}
              >
                <span className="material-symbols-outlined text-base font-bold">
                  {isComplete ? 'check' : isCurrent ? 'hourglass_top' : stage.icon}
                </span>
              </div>

              {/* Stage Text */}
              <div className="flex-1 pt-0.5">
                <div className="flex justify-between items-center">
                  <h4
                    className={`text-xs font-bold ${
                      isComplete
                        ? 'text-[#F5F5F7]'
                        : isCurrent
                        ? 'text-[#E11D3C]'
                        : 'text-[#9A9AA3]'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] text-[#E11D3C] font-mono font-semibold animate-pulse">
                      Analyzing...
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isComplete
                      ? 'text-[#9A9AA3]'
                      : isCurrent
                      ? 'text-[#F5F5F7]'
                      : 'text-[#9A9AA3]/60'
                  }`}
                >
                  {stage.detail}
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Progressive Extracted Fields Preview */}
      {extractedFieldsVisible > 0 && (
        <div className="pt-4 border-t border-white/[0.08] relative z-10 animate-in fade-in duration-300">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#9A9AA3] mb-2.5 flex justify-between">
            <span>OCR Extracted Stream</span>
            <span className="text-emerald-400 font-mono">{extractedFieldsVisible} fields parsed</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SAMPLE_PAYSLIP_SCENARIO.extractedFields
              .slice(0, extractedFieldsVisible)
              .map((field, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-[#121214] border border-white/[0.08] animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  <div className="text-[9px] text-[#9A9AA3] truncate">{field.label}</div>
                  <div className="text-xs font-mono font-bold text-[#F5F5F7] truncate mt-0.5">
                    {field.value}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
}
