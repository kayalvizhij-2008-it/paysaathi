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
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
        isCurrentActive
          ? 'bg-[#F5A623] text-[#121212] shadow-[0_0_15px_rgba(245,166,35,0.6)] animate-pulse'
          : 'bg-[#251E16] text-[#FFB955] border border-[#F5A623]/30 hover:bg-[#F5A623]/15'
      }`}
      aria-label={isCurrentActive ? 'Stop Voice Explanation' : 'Play Voice Explanation'}
    >
      {isCurrentActive ? (
        <>
          <span className="material-symbols-outlined text-sm material-symbols-fill">volume_up</span>
          <span>Listening...</span>
          <div className="flex items-center gap-0.5 h-3 ml-1">
            <span className="w-0.5 bg-[#121212] wave-bar"></span>
            <span className="w-0.5 bg-[#121212] wave-bar"></span>
            <span className="w-0.5 bg-[#121212] wave-bar"></span>
            <span className="w-0.5 bg-[#121212] wave-bar"></span>
          </div>
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-sm material-symbols-fill">campaign</span>
          <span>{label}</span>
          <span className="text-[10px] opacity-75">AI Voice</span>
        </>
      )}
    </button>
  );
}
