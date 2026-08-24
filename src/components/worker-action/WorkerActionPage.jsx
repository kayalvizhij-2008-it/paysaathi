import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AudioPlayer from '../common/AudioPlayer';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';

export default function WorkerActionPage() {
  const { workerProfile, showToast, t } = useApp();
  const [tone, setTone] = useState('polite'); // 'polite' | 'formal' | 'statutory'
  const [actionLang, setActionLang] = useState('en'); // 'en' | 'hi' | 'ta'

  const templates = {
    en: {
      polite: `Respected Sir/Madam,\n\nI am writing to politely request a quick clarification regarding my October 2024 salary slip for site deployment at Sterling Heights (Worker ID: ${workerProfile.workerId}).\n\nAccording to my daily biometric log, I completed 22 standard working days and 24 overtime hours. My payslip reflects ₹1,200 for overtime instead of the statutory double-rate calculation (₹2,880), along with an unexplained deduction of ₹620 marked as 'Misc Adj.'\n\nCould you kindly review the attendance records and adjust this in the upcoming settlement? Thank you very much for your continuous support.\n\nWarm regards,\n${workerProfile.name}\n${workerProfile.role}\nPhone / ID: ${workerProfile.workerId}`,
      formal: `To: Payroll & Accounts Desk\nEmployer: Apex Facility Services Pvt. Ltd.\nDate: ${new Date().toLocaleDateString('en-IN')}\n\nSubject: Formal Notice of Wage Calculation Discrepancy — October 2024 (ID: ${workerProfile.workerId})\n\nDear Accounts Team,\n\nUpon auditing the October 2024 payslip against verified site logs, a variance of ₹2,300 has been identified:\n\n1. Overtime Compensation: 24 logged OT hours were credited at a flat rate of ₹1,200, whereas statutory provisions mandate compensation of ₹2,880.\n2. Deductions: An unitemized deduction of ₹620 ('Misc Adj.') without contract schedule reference.\n\nPlease find the attached PaySaathi digital audit slip and issue the requisite wage adjustment of ₹2,300 at the earliest.\n\nSincerely,\n${workerProfile.name}\nDesignation: ${workerProfile.role}`,
      statutory: `LEGAL / COMPLIANCE INQUIRY MEMO\nUnder Reference: Minimum Wages Act, 1948 & Factories Act, 1948 (Section 59)\n\nAttention: Site Compliance Officer / HR Manager\nWorker Name: ${workerProfile.name} (ID: ${workerProfile.workerId})\n\nTake notice that as per Section 59 of the Factories Act and State Minimum Wage notifications, overtime work exceeding standard shift hours must be remunerated at twice (2.0x) the ordinary rate of wages.\n\nThe October 2024 disbursement of ₹16,200 vs statutory entitlement of ₹18,500 reflects a short-payment of ₹2,300. We formally request review and rectification within 7 business days to maintain full statutory alignment.\n\nSubmitted respectfully,\n${workerProfile.name}\nVerified via PaySaathi Wage Intelligence Platform`
    },
    hi: {
      polite: `आदरणीय सर / मैडम,\n\nमैं ${workerProfile.name} (आईडी: ${workerProfile.workerId}), स्टर्लिंग हाइट्स साइट पर सिक्योरिटी सुपरवाइजर के पद पर कार्यरत हूँ।\n\nकृपया मेरे अक्टूबर 2024 के वेतन पर्ची की जांच करने की कृपा करें। मेरे बायोमेट्रिक रिकॉर्ड में 22 कार्य दिवस और 24 घंटे का ओवरटाइम दर्ज है। पे-स्लिप में ओवरटाइम का केवल ₹1,200 दिया गया है, जबकि नियम अनुसार यह ₹2,880 होना चाहिए, साथ ही ₹620 की 'Misc' कटौती की गई है।\n\nकृपया इसे चेक करके आगामी भुगतान में सही कराने का कष्ट करें।\n\nधन्यवाद,\n${workerProfile.name}\nआईडी: ${workerProfile.workerId}`,
      formal: `सेवा में: वेतन एवं लेखा विभाग\nविषय: अक्टूबर 2024 वेतन में विसंगति के संबंध में\n\nमहोदय,\n\nमेरे अक्टूबर 2024 के वेतन में ₹2,300 का अंतर पाया गया है:\n1. 24 घंटे के ओवरटाइम का भुगतान केवल ₹1,200 किया गया है, जो 2x नियम अनुसार ₹2,880 होना चाहिए।\n2. बिना कारण ₹620 की कटौती की गई है।\n\nकृपया संलग्न डिजिटल पे-साथी रिपोर्ट देखें और ₹2,300 का समायोजन करें।\n\nभवदीय,\n${workerProfile.name}`,
      statutory: `वैधानिक वेतन अनुपालन ज्ञापन\nसंदर्भ: न्यूनतम वेतन अधिनियम एवं कारखाना अधिनियम धारा 59\n\nमहोदय,\n\nकारखाना अधिनियम की धारा 59 के अनुसार निर्धारित समय से अधिक काम करने पर दोगुना (2.0x) ओवरटाइम वेतन देना अनिवार्य है। अक्टूबर 2024 के वेतन में ₹2,300 की कमी पाई गई है।\n\nकृपया 7 दिनों के भीतर इसका समाधान करने की कृपा करें।\n\nहस्ताक्षर:\n${workerProfile.name}`
    },
    ta: {
      polite: `மதிப்பிற்குரிய ஐயா / அம்மா,\n\nநான் ${workerProfile.name} (ஐடி: ${workerProfile.workerId}), ஸ்டெர்லிங் ஹைட்ஸ் தளத்தில் பணிபுரிகிறேன்.\n\nஎனது அக்டோபர் 2024 சம்பள சீட்டில் 24 மணிநேர கூடுதல் பணிக்கு (OT) ₹1,200 மட்டுமே வழங்கப்பட்டுள்ளது. சட்டப்படி 2 மடங்கு ஊதியமாக ₹2,880 வர வேண்டும். மேலும் ₹620 பிடித்தம் செய்யப்பட்டுள்ளது.\n\nதயவுசெய்து இதை சரிபார்த்து அடுத்த சம்பளத்தில் வழங்கும்படி கேட்டுக்கொள்கிறேன்.\n\nநன்றி,\n${workerProfile.name}`,
      formal: `பெறுநர்: ஊதியப் பிரிவு\nபொருள்: அக்டோபர் 2024 சம்பள முரண்பாடு அறிக்கை\n\nஐயா,\n\nஎனது அக்டோபர் 2024 சம்பளத்தில் ₹2,300 குறைவு ஏற்பட்டுள்ளது:\n1. 24 மணிநேர OT-க்கு ₹1,200 மட்டுமே தரப்பட்டுள்ளது (வர வேண்டியது ₹2,880).\n2. ₹620 விவரிக்கப்படாத பிடித்தம் செய்யப்பட்டுள்ளது.\n\nதயவுசெய்து இதை சரிசெய்து தர வேண்டுகிறேன்.\n\nஇவண்,\n${workerProfile.name}`,
      statutory: `சட்டரீதியான ஊதிய சரிபார்ப்பு குறிப்பு\nதொழிலாளர் சட்டம் மற்றும் பிரிவு 59-ன் கீழ்:\n\nகூடுதல் பணி நேரத்திற்கு இரட்டிப்பு (2x) ஊதியம் வழங்கப்பட வேண்டும். எனது அக்டோபர் மாத ஊதியத்தில் உள்ள ₹2,300 குறைவை சரிசெய்யுமாறு கேட்டுக்கொள்கிறேன்.\n\n${workerProfile.name}`
    }
  };

  const activeMessage = templates[actionLang][tone];

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(activeMessage);
    showToast('Inquiry Message Copied to Clipboard!');
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(activeMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const TONES = [
    { id: 'polite', label: '🤝 Polite Clarification' },
    { id: 'formal', label: '📋 Formal HR Notice' },
    { id: 'statutory', label: '⚖️ Statutory Labour Norm' },
  ];
  const LANGS = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिन्दी' },
    { id: 'ta', label: 'தமிழ்' },
  ];

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#070B14] relative overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#10B981]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-breathe"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <SectionHeader
          eyebrow="Worker Dispute Resolution"
          eyebrowIcon="gavel"
          title="Worker Action &"
          highlightText="Resolution Drafts"
          description="Generate courteous, legally backed messages to resolve payslip discrepancies without confrontation or fear."
        />

        {/* Configuration Card */}
        <div className="glass-card rounded-[36px] p-6 sm:p-8 border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-white/[0.08]">
            
            {/* Tone Selector */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block mb-2.5 font-mono">
                1. Communication Tone
              </span>
              <div className="flex flex-wrap gap-2">
                {TONES.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setTone(id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      tone === id
                        ? 'bg-[#00F0FF] text-[#070B14] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.45)]'
                        : 'bg-[#0A0F1D] text-[#94A3B8] border-white/[0.08] hover:bg-[#0F172A] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block mb-2.5 font-mono">
                2. Output Language
              </span>
              <div className="flex bg-[#0A0F1D] border border-white/[0.08] rounded-xl p-1 gap-1 text-xs">
                {LANGS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActionLang(id)}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      actionLang === id
                        ? 'bg-[#00F0FF] text-[#070B14]'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Letter Draft Canvas */}
          <div className="bg-[#0A0F1D] rounded-2xl p-6 border border-white/[0.06] space-y-4">
            
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs text-[#00F0FF] font-bold">
                <span className="material-symbols-outlined text-base">mail</span>
                <span>Generated Draft Preview</span>
              </div>
              <AudioPlayer text={activeMessage} label="Listen Draft" />
            </div>

            <pre className="text-xs sm:text-sm text-[#F8FAFC] font-mono whitespace-pre-wrap leading-relaxed">
              {activeMessage}
            </pre>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleWhatsAppShare}
              leftIcon={<span className="material-symbols-outlined text-base">chat</span>}
              className="flex-1 !border-emerald-500/30 hover:!border-emerald-500/60 !text-emerald-400"
            >
              Send via WhatsApp
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleCopyMessage}
              leftIcon={<span className="material-symbols-outlined text-base">content_copy</span>}
              className="flex-1"
            >
              Copy Full Letter Text
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.print()}
              leftIcon={<span className="material-symbols-outlined text-base">print</span>}
              className="border border-white/[0.08]"
            >
              Print Letter
            </Button>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/20 text-xs text-[#94A3B8]">
            <strong className="text-[#F8FAFC] block mb-0.5">Empowerment Principle:</strong>
            "Rules verify. AI explains. Humans decide." Our drafts provide clear factual grounds to help both workers and contractors reach swift, harmonious settlements.
          </div>

        </div>

      </div>
    </div>
  );
}
