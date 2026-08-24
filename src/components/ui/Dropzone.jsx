import React, { useState, useRef } from 'react';
import Button from './Button';

/**
 * Custom Dropzone component for PaySaathi Design System
 * Handles drag and drop, file size & format validation, and keyboard trigger
 */
export default function Dropzone({
  onFileAccepted,
  onError,
  accept = '.pdf,image/png,image/jpeg,image/jpg',
  maxSizeMB = 10,
  disabled = false,
  className = ''
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef(null);

  const validateAndProcessFile = (file) => {
    setErrorMessage(null);
    if (!file) return;

    // Check size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const err = `File size exceeds ${maxSizeMB}MB limit (your file: ${(file.size / (1024 * 1024)).toFixed(1)}MB).`;
      setErrorMessage(err);
      if (onError) onError(err);
      return;
    }

    // Check extension/type
    const validExtensions = ['.pdf', '.png', '.jpg', '.jpeg'];
    const fileName = file.name.toLowerCase();
    const isValidExt = validExtensions.some(ext => fileName.endsWith(ext));
    const isValidType = file.type.includes('pdf') || file.type.includes('image/');

    if (!isValidExt && !isValidType) {
      const err = 'Invalid format. Please upload a PDF document or JPG/PNG image.';
      setErrorMessage(err);
      if (onError) onError(err);
      return;
    }

    if (onFileAccepted) {
      onFileAccepted(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label="Upload salary slip or document"
        className={`w-full rounded-3xl border-2 border-dashed p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
          isDragOver
            ? 'border-[#00F0FF] bg-[#00F0FF]/10 scale-[1.01] shadow-[0_0_30px_rgba(0,240,255,0.3)]'
            : errorMessage
            ? 'border-[#F43F5E]/80 bg-[#F43F5E]/10'
            : 'border-white/[0.12] bg-[#0A0F1D]/90 hover:border-[#00F0FF]/50 hover:bg-[#0F172A]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
        />

        {/* Ambient subtle cyan glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-[#00F0FF]/30 flex items-center justify-center mb-4 text-[#00F0FF] shadow-lg group-hover:scale-110 group-hover:border-[#00F0FF] transition-all duration-300">
          <span className="material-symbols-outlined text-3xl material-symbols-fill">cloud_upload</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] mb-1">
          Drop your salary document here, or <span className="text-[#00F0FF] underline decoration-[#00F0FF]/50 underline-offset-4 font-extrabold">browse</span>
        </h3>

        <p className="text-xs text-[#94A3B8] mb-6 max-w-sm">
          Supports PDF, JPG, PNG up to {maxSizeMB}MB. Safe, client-side verified processing.
        </p>

        <div className="px-5 py-2.5 rounded-xl bg-[#0F172A] text-[#F8FAFC] border border-white/[0.12] text-xs font-semibold flex items-center gap-2 pointer-events-none shadow-sm hover:border-[#00F0FF]/40">
          <span className="material-symbols-outlined text-base text-[#00F0FF]">folder_open</span>
          <span>Select Document File</span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-[#F43F5E]/15 border border-[#F43F5E]/40 text-[#F8FAFC] text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-base text-[#F43F5E]">error</span>
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
