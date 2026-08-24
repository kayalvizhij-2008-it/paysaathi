import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const SAMPLE_QUERIES = {
  en: [
    {
      id: 'q1',
      text: 'How much salary should I receive for 22 days + 24 hours overtime?',
      answer: 'Based on Karnataka wage benchmarks for a Security Supervisor, your expected base pay for 22 days is ₹13,200 (at ₹600/day). For 24 overtime hours, statutory rules under Factories Act Section 59 mandate double pay (2.0x = ₹120/hr), equaling ₹2,880. Adding ₹2,420 night shift allowance gives a total expected payout of ₹18,500.',
      topic: 'Wage Calculation'
    },
    {
      id: 'q2',
      text: 'Why was my overtime pay credited at single rate instead of double rate?',
      answer: 'Your October payslip reflects 10 hours of overtime credited at ₹120/hr (flat single rate) totaling ₹1,200. Under Indian statutory labor laws (Factories Act Sec 59), any work beyond standard 8-hour shifts must be compensated at twice (2.0x) the ordinary rate of wages. This creates a statutory variance of ₹1,680.',
      topic: 'Overtime Discrepancy'
    },
    {
      id: 'q3',
      text: 'What does the ₹620 "Misc Adj." deduction mean on my salary slip?',
      answer: 'A deduction of ₹620 is marked as "Misc Adj." on your payslip. Standard statutory deductions only permit Provident Fund (PF), ESIC, and Professional Tax when registered. Unitemized arbitrary deductions without contract schedule references require formal employer review.',
      topic: 'Deduction Audit'
    },
    {
      id: 'q4',
      text: 'How can I request this missing ₹2,300 from my contractor politely?',
      answer: 'You can use PaySaathi\'s Resolution Drafts to generate a polite, fact-based WhatsApp message or formal notice citing your biometric hours and statutory 2.0x overtime entitlements without confrontation.',
      topic: 'Dispute Resolution'
    }
  ],
  hi: [
    {
      id: 'q1',
      text: '22 दिन काम और 24 घंटे ओवरटाइम पर मुझे कितनी सैलरी मिलनी चाहिए?',
      answer: 'सिक्योरिटी सुपरवाइजर के लिए 22 दिन का मूल वेतन ₹13,200 है। कारखाना अधिनियम की धारा 59 के तहत 24 घंटे के ओवरटाइम का 2x दर से ₹2,880 और नाइट शिफ्ट का ₹2,420 जोड़कर कुल अनुमानित वेतन ₹18,500 बनता है।',
      topic: 'वेतन गणना'
    },
    {
      id: 'q2',
      text: 'कारखाना अधिनियम के तहत 2.0x ओवरटाइम नियम क्या है?',
      answer: 'कारखाना अधिनियम 1948 की धारा 59 के अनुसार, सामान्य 8 घंटे की शिफ्ट के बाद किए गए कार्य का भुगतान साधारण दर से दोगुने (2.0x) वेतन पर करना अनिवार्य है।',
      topic: 'ओवरटाइम नियम'
    },
    {
      id: 'q3',
      text: 'पे-स्लिप में कटी हुई ₹620 की "Misc" राशि को कैसे सही कराएं?',
      answer: 'पे-स्लिप पर ₹620 की अघोषित कटौती पाई गई है। आप पे-साथी के "श्रमिक सहायता" सेक्शन से ठेकेदार को विनम्र व्हाट्सएप मैसेज भेजकर इसे अगले महीने समायोजित करा सकते हैं।',
      topic: 'कटौती समाधान'
    }
  ],
  ta: [
    {
      id: 'q1',
      text: '22 பணி நாட்கள் மற்றும் 24 மணிநேர OT-க்கு எனக்கு எவ்வளவு சம்பளம் கிடைக்க வேண்டும்?',
      answer: 'பாதுகாப்பு மேற்பார்வையாளருக்கு 22 நாட்களுக்கான அடிப்படை ஊதியம் ₹13,200. தொழிற்சாலை சட்டம் பிரிவு 59-ன் கீழ் 24 மணிநேர கூடுதல் பணிக்கு 2 மடங்கு ஊதியமாக ₹2,880 மற்றும் இரவுப் பணி ஊதியம் ₹2,420 சேர்த்து மொத்தம் ₹18,500 கிடைக்க வேண்டும்.',
      topic: 'ஊதிய கணக்கீடு'
    },
    {
      id: 'q2',
      text: 'எனது ஓவர்-டைம் ஊதியம் இரட்டிப்பாக வழங்கப்படாதது ஏன்?',
      answer: 'உங்கள் அக்டோபர் சம்பள சீட்டில் 24 மணிநேர OT-க்கு ₹1,200 மட்டுமே தரப்பட்டுள்ளது. சட்டப்படி இரட்டிப்பு விகிதத்தில் ₹2,880 வழங்கப்பட வேண்டும். இதில் ₹1,680 குறைவு ஏற்பட்டுள்ளது.',
      topic: 'OT முரண்பாடு'
    },
    {
      id: 'q3',
      text: 'என் சம்பள சீட்டில் உள்ள ₹620 பிடித்தம் எதற்கானது?',
      answer: 'சம்பள சீட்டில் ₹620 "Misc Adj." என்ற பெயரில் பிடிக்கப்பட்டுள்ளது. சட்டரீதியான ஆவணங்கள் இல்லாத பிடித்தங்களை சரிசெய்ய ஒப்பந்ததாரரிடம் விளக்கம் கேட்கலாம்.',
      topic: 'பிடித்தங்கள் ஆய்வு'
    }
  ]
};

export default function VoiceAssistantPage() {
  const { language, setLanguage, speakText, stopSpeaking, isSpeaking, speakingText } = useApp();
  
  // Voice Orb states: 'idle' | 'listening' | 'processing' | 'answering'
  const [orbState, setOrbState] = useState('idle');
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [customInput, setCustomInput] = useState('');

  const queries = SAMPLE_QUERIES[language] || SAMPLE_QUERIES.en;

  const handleAskQuery = (queryObj) => {
    stopSpeaking();
    setCurrentQuery(queryObj.text);
    setOrbState('listening');
    setCurrentAnswer(null);

    // Realistic state progression
    setTimeout(() => {
      setOrbState('processing');

      setTimeout(() => {
        setOrbState('answering');
        setCurrentAnswer(queryObj);
        speakText(queryObj.answer);
      }, 1000);
    }, 1200);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const customQuery = {
      id: `custom-${Date.now()}`,
      text: customInput,
      answer: `PaySaathi analyzed: "${customInput}". Based on statutory minimum wage provisions (Factories Act Sec 59), all overtime hours must be compensated at double rate (2.0x), and unexplained line deductions are subject to worker review. You can verify this in the Payslip Verification section.`,
      topic: 'Custom Wage Query'
    };

    setCustomInput('');
    handleAskQuery(customQuery);
  };

  const handleSimulateMic = () => {
    if (orbState === 'listening') {
      setOrbState('idle');
      return;
    }

    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    handleAskQuery(randomQuery);
  };

  // Sync orbState when audio ends
  useEffect(() => {
    if (!isSpeaking && orbState === 'answering') {
      // Keep answering state visible
    }
  }, [isSpeaking, orbState]);

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#070B14] relative overflow-hidden">
      
      {/* Dynamic ambient cyber glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#10B981]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-radial-breathe"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <SectionHeader
          eyebrow="Multilingual Voice Intelligence"
          eyebrowIcon="graphic_eq"
          title="Ask PaySaathi"
          highlightText="In Your Own Voice"
          description="Speak or tap in English, हिन्दी, or தமிழ். PaySaathi provides plain-language explanations of statutory wage rights, overtime rules, and deduction breakdowns."
        />

        {/* Language Switcher Bar */}
        <div className="flex justify-center">
          <div className="inline-flex bg-[#0A0F1D] border border-white/[0.1] rounded-2xl p-1.5 gap-1.5 shadow-xl">
            <button
              onClick={() => { setLanguage('en'); setCurrentAnswer(null); setOrbState('idle'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#00F0FF] text-[#070B14] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => { setLanguage('hi'); setCurrentAnswer(null); setOrbState('idle'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#00F0FF] text-[#070B14] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              onClick={() => { setLanguage('ta'); setCurrentAnswer(null); setOrbState('idle'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                language === 'ta'
                  ? 'bg-[#00F0FF] text-[#070B14] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              தமிழ் (Tamil)
            </button>
          </div>
        </div>

        {/* Central Glowing Voice Orb Interface */}
        <div className="glass-card rounded-[36px] p-8 sm:p-12 border border-[#00F0FF]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,240,255,0.15)] flex flex-col items-center justify-center text-center relative overflow-hidden">
          
          {/* Animated Wave Lines in Background */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>

          {/* Voice Orb */}
          <div className="relative my-6 cursor-pointer group" onClick={handleSimulateMic}>
            
            {/* Outer reactive pulsing halo */}
            <div className={`absolute -inset-6 rounded-full transition-all duration-500 blur-xl ${
              orbState === 'listening'
                ? 'bg-[#00F0FF]/40 animate-pulse scale-125'
                : orbState === 'processing'
                ? 'bg-amber-400/30 animate-spin scale-110'
                : orbState === 'answering'
                ? 'bg-emerald-400/40 animate-pulse scale-120'
                : 'bg-[#00F0FF]/20 group-hover:scale-110'
            }`}></div>

            {/* Glowing Main Orb Body */}
            <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative z-10 shadow-2xl ${
              orbState === 'listening'
                ? 'bg-gradient-to-br from-[#00F0FF] via-[#06B6D4] to-[#0284C7] text-[#070B14] animate-orb-pulse shadow-[0_0_50px_rgba(0,240,255,0.8)]'
                : orbState === 'processing'
                ? 'bg-gradient-to-br from-amber-400 via-[#F59E0B] to-amber-600 text-[#070B14] shadow-[0_0_40px_rgba(245,158,11,0.6)]'
                : orbState === 'answering'
                ? 'bg-gradient-to-br from-[#10B981] via-[#0D9488] to-[#047857] text-[#070B14] shadow-[0_0_45px_rgba(16,185,129,0.7)]'
                : 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-[#00F0FF] border-2 border-[#00F0FF]/50 hover:border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)]'
            }`}>
              
              <span className={`material-symbols-outlined text-4xl sm:text-5xl material-symbols-fill transition-transform ${
                orbState === 'listening' ? 'scale-125 animate-bounce' : 'group-hover:scale-110'
              }`}>
                {orbState === 'listening' ? 'mic' : orbState === 'processing' ? 'autorenew' : orbState === 'answering' ? 'volume_up' : 'graphic_eq'}
              </span>

              {/* Status Label in Orb */}
              <span className="text-[11px] font-black uppercase tracking-wider mt-1 font-mono">
                {orbState === 'listening' ? 'Listening...' : orbState === 'processing' ? 'Thinking...' : orbState === 'answering' ? 'Speaking...' : 'Tap to Ask'}
              </span>

              {/* Audio Wave Bars when speaking */}
              {orbState === 'answering' && (
                <div className="flex items-center gap-1 mt-1.5 h-3">
                  <span className="w-1 bg-[#070B14] wave-bar"></span>
                  <span className="w-1 bg-[#070B14] wave-bar"></span>
                  <span className="w-1 bg-[#070B14] wave-bar"></span>
                  <span className="w-1 bg-[#070B14] wave-bar"></span>
                </div>
              )}

            </div>
          </div>

          {/* Assistant Subtitle */}
          <div className="max-w-lg space-y-2 mt-4">
            <h3 className="text-xl sm:text-2xl font-black text-[#F8FAFC]">
              {orbState === 'listening'
                ? 'Listening to your salary question...'
                : orbState === 'processing'
                ? 'Parsing wage rules & statutory database...'
                : orbState === 'answering'
                ? 'AI Wage Intelligence Report'
                : 'Tap Orb or Select a Common Question'}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              {orbState === 'idle' && 'Real-time statutory advice powered by Indian Labor Codes & Factories Act Sec 59.'}
            </p>
          </div>

          {/* Active Query & Answer Card */}
          {currentAnswer && (
            <div className="mt-8 w-full max-w-2xl text-left bg-[#0A0F1D] rounded-3xl p-6 sm:p-8 border border-[#00F0FF]/40 shadow-2xl animate-in fade-in zoom-in-95 duration-300 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Badge status="cyan" size="sm">
                    {currentAnswer.topic || 'Wage Inquiry'}
                  </Badge>
                  <span className="text-xs text-[#94A3B8] font-mono">Verified Audio Output</span>
                </div>

                <Button
                  size="sm"
                  variant={isSpeaking ? 'danger' : 'teal'}
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(currentAnswer.answer)}
                  leftIcon={<span className="material-symbols-outlined text-sm">{isSpeaking ? 'stop' : 'volume_up'}</span>}
                >
                  {isSpeaking ? 'Stop Voice' : 'Replay Voice'}
                </Button>
              </div>

              {/* Question Asked */}
              <div className="text-xs text-[#94A3B8] flex items-start gap-2">
                <span className="text-[#00F0FF] font-bold">Q:</span>
                <span className="font-semibold text-[#F8FAFC]">"{currentQuery}"</span>
              </div>

              {/* Answer Text */}
              <div className="text-sm text-[#F8FAFC] leading-relaxed p-4 rounded-2xl bg-[#0F172A] border border-white/[0.06]">
                {currentAnswer.answer}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#94A3B8]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-400 text-sm">verified</span>
                  <span>Deterministic statutory rule calculation</span>
                </div>
                <span className="font-mono text-[10px] text-[#00F0FF]">PaySaathi v2.4</span>
              </div>
            </div>
          )}

          {/* Quick Custom Input Bar */}
          <form onSubmit={handleCustomSubmit} className="mt-8 w-full max-w-xl flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask anything about overtime, deductions, or minimum wage..."
              className="flex-1 bg-[#0A0F1D] border border-white/[0.12] rounded-2xl px-5 py-3 text-xs sm:text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              leftIcon={<span className="material-symbols-outlined text-sm">send</span>}
            >
              Ask
            </Button>
          </form>

        </div>

        {/* Common Sample Query Prompts Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#F8FAFC]">
              Sample Prompts for Quick Demo
            </h3>
            <span className="text-xs text-[#00F0FF] font-mono font-bold">1-Click Voice Response</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {queries.map((q) => (
              <div
                key={q.id}
                onClick={() => handleAskQuery(q)}
                className="p-5 rounded-3xl bg-[#0A0F1D] border border-white/[0.08] hover:border-[#00F0FF]/50 hover:bg-[#0F172A] transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <Badge status="cyan" size="sm">
                    {q.topic}
                  </Badge>
                  <span className="material-symbols-outlined text-lg text-[#94A3B8] group-hover:text-[#00F0FF] group-hover:translate-x-1 transition-all">
                    play_circle
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors leading-snug">
                  "{q.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
