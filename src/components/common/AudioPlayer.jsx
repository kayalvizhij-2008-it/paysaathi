import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AudioPlayer({ text, label = 'Listen Explanation' }) {
  const { isSpeaking, speakingText, speakText, stopSpeaking } = useApp();
  const isCurrentActive = isSpeaking && speakingText === text;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isCurrentActive) {
      stopSpeaking();
    } else {
      speakText(text);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
        isCurrentActive
          ? 'bg-[#00F0FF] text-[#070B14] shadow-[0_0_20px_rgba(0,240,255,0.7)] animate-pulse'
          : 'bg-[#0F172A] text-[#00F0FF] border border-[#00F0FF]/30 hover:bg-[#00F0FF]/15 hover:border-[#00F0FF]/60'
      }`}
      aria-label={isCurrentActive ? 'Stop Voice Explanation' : 'Play Voice Explanation'}
    >
      {isCurrentActive ? (
        <>
          <span className="material-symbols-outlined text-sm material-symbols-fill">volume_up</span>
          <span>Playing Voice...</span>
          <div className="flex items-center gap-0.5 h-3.5 ml-1">
            <span className="w-0.5 bg-[#070B14] wave-bar"></span>
            <span className="w-0.5 bg-[#070B14] wave-bar"></span>
            <span className="w-0.5 bg-[#070B14] wave-bar"></span>
            <span className="w-0.5 bg-[#070B14] wave-bar"></span>
          </div>
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-sm material-symbols-fill">graphic_eq</span>
          <span>{label}</span>
          <span className="text-[10px] opacity-75 font-mono">AI Audio</span>
        </>
      )}
    </button>
  );
}
