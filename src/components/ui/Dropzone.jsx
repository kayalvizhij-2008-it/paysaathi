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
        className={`w-full rounded-3xl border-2 border-dashed p-8 sm:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D3C] ${
          isDragOver
            ? 'border-[#E11D3C] bg-[#E11D3C]/10 scale-[1.01] shadow-[0_0_30px_rgba(225,29,60,0.25)]'
            : errorMessage
            ? 'border-[#E11D3C]/80 bg-[#2A1017]/40'
            : 'border-white/[0.12] bg-[#121214]/90 hover:border-[#E11D3C]/40 hover:bg-[#1C1C1F]/80'
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

        {/* Ambient subtle glow when hovering */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E11D3C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-[#1C1C1F] border border-white/[0.1] flex items-center justify-center mb-4 text-[#E11D3C] shadow-lg group-hover:scale-110 transition-transform duration-300">
          <span className="material-symbols-outlined text-3xl material-symbols-fill">cloud_upload</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#F5F5F7] mb-1">
          Drop your salary document here, or <span className="text-[#E11D3C] underline decoration-[#E11D3C]/50 underline-offset-4">browse</span>
        </h3>

        <p className="text-xs text-[#9A9AA3] mb-6 max-w-sm">
          Supports PDF, JPG, PNG up to {maxSizeMB}MB. Safe, encrypted client processing.
        </p>

        <div className="px-5 py-2.5 rounded-xl bg-[#1C1C1F] text-[#F5F5F7] border border-white/[0.1] text-xs font-semibold flex items-center gap-2 pointer-events-none shadow-sm">
          <span className="material-symbols-outlined text-base text-[#E11D3C]">folder_open</span>
          <span>Select Document File</span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-[#2A1017] border border-[#E11D3C]/40 text-[#F5F5F7] text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-base text-[#E11D3C]">error</span>
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
