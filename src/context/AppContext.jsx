import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from './translations';
import { calculateExpectedPay } from '../utils/wageCalculator';
import { SAMPLE_WORKER_PROFILE, PASSPORT_TIMELINE, SAMPLE_PAYSLIP_SCENARIO } from '../utils/sampleData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation: 'home' | 'salary-check' | 'payslip-verify' | 'salary-passport' | 'dashboard' | 'worker-action'
  const [activePage, setActivePage] = useState('home');

  // Language: 'en' | 'hi' | 'ta'
  const [language, setLanguage] = useState('en');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Salary Calculator State
  const [salaryInput, setSalaryInput] = useState({
    sectorId: 'construction',
    roleId: 'mason',
    cityId: 'bengaluru',
    daysWorked: 24,
    dailyHours: 8,
    overtimeHours: 12,
    nightShifts: 0,
    allowances: 0
  });

  const [salaryResult, setSalaryResult] = useState(() => calculateExpectedPay(salaryInput));

  // Payslip Verification Stateful Pipeline
  // States: 'idle' | 'validating' | 'uploading' | 'processing' | 'extracting' | 'verified' | 'error'
  const [uploadState, setUploadState] = useState('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState(0); // 1: reading, 2: ocr table extraction, 3: ot audit, 4: deduction check, 5: verdict
  const [uploadedFile, setUploadedFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [extractedFieldsVisible, setExtractedFieldsVisible] = useState(0);
  const [verificationError, setVerificationError] = useState(null);

  // Active timers ref for clean unmount/cancellation
  const timersRef = useRef([]);

  // Salary Passport State
  const [workerProfile, setWorkerProfile] = useState(SAMPLE_WORKER_PROFILE);
  const [passportRecords, setPassportRecords] = useState(PASSPORT_TIMELINE);
  const [selectedJobRecord, setSelectedJobRecord] = useState(null);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Demo Mode State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(1);

  // Audio Speech Synthesis State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Recalculate expected salary whenever inputs change
  const handleCalculateSalary = (customInputs) => {
    const updated = { ...salaryInput, ...(customInputs || {}) };
    setSalaryInput(updated);
    const result = calculateExpectedPay(updated);
    setSalaryResult(result);
    return result;
  };

  // Clear running timers
  const clearPipelineTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Trigger Payslip OCR Verification Pipeline
  const startPayslipAnalysis = (fileData = null, useSample = false) => {
    clearPipelineTimers();
    setVerificationError(null);
    setVerificationResult(null);
    setExtractedFieldsVisible(0);

    let targetFile = null;

    if (useSample || !fileData) {
      targetFile = {
        name: SAMPLE_PAYSLIP_SCENARIO.fileName,
        size: SAMPLE_PAYSLIP_SCENARIO.fileSize,
        type: 'application/pdf',
        isSample: true
      };
    } else {
      targetFile = {
        name: fileData.name,
        size: `${(fileData.size / (1024 * 1024)).toFixed(1)} MB`,
        type: fileData.type || 'application/pdf',
        isSample: false
      };
    }

    setUploadedFile(targetFile);

    // 1. Validating State (file integrity & cryptographic format check)
    setUploadState('validating');
    setUploadProgress(10);

    const t1 = setTimeout(() => {
      // 2. Uploading State with progress ramp
      setUploadState('uploading');
      setUploadProgress(35);

      const t2 = setTimeout(() => {
        setUploadProgress(75);

        const t3 = setTimeout(() => {
          setUploadProgress(100);

          // 3. Processing State (Laser scan sweep & OCR text extraction)
          setUploadState('processing');
          setAnalysisStage(1);

          const t4 = setTimeout(() => {
            setAnalysisStage(2);
            setUploadState('extracting');
            setExtractedFieldsVisible(3);

            const t5 = setTimeout(() => {
              setAnalysisStage(3);
              setExtractedFieldsVisible(6);

              const t6 = setTimeout(() => {
                setAnalysisStage(4);
                setExtractedFieldsVisible(8);

                const t7 = setTimeout(() => {
                  // 4. Completed & Verified Result
                  setAnalysisStage(5);
                  setUploadState('verified');
                  setVerificationResult(SAMPLE_PAYSLIP_SCENARIO);
                  showToast('Verification Audit Complete: Discrepancy Flagged for Worker Review', 'warning');
                }, 700);

                timersRef.current.push(t7);
              }, 600);

              timersRef.current.push(t6);
            }, 600);

            timersRef.current.push(t5);
          }, 700);

          timersRef.current.push(t4);
        }, 350);

        timersRef.current.push(t3);
      }, 350);

      timersRef.current.push(t2);
    }, 450);

    timersRef.current.push(t1);
  };

  const resetVerification = () => {
    clearPipelineTimers();
    setUploadState('idle');
    setUploadProgress(0);
    setAnalysisStage(0);
    setUploadedFile(null);
    setVerificationResult(null);
    setExtractedFieldsVisible(0);
    setVerificationError(null);
  };

  // Add new job record to Passport
  const handleAddJobRecord = (newJob) => {
    const record = {
      id: `job-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      period: `${newJob.period || '2026'}`,
      role: newJob.role || 'Skilled Specialist',
      company: newJob.company || 'Enterprise Site Infrastructure',
      location: newJob.location || 'Bengaluru, KA',
      monthlyPay: Number(newJob.monthlyPay) || 20000,
      status: 'VERIFIED',
      tenure: newJob.tenure || '6 months',
      verifiedPayslips: Number(newJob.verifiedPayslips) || 6,
      attendanceRate: '98.5%',
      badge: 'New Record',
      highlights: newJob.highlights || 'Verified digital salary records added to passport.'
    };

    setPassportRecords([record, ...passportRecords]);
    setWorkerProfile(prev => ({
      ...prev,
      totalTenureMonths: prev.totalTenureMonths + 6,
      verificationCount: prev.verificationCount + 1
    }));
    setIsAddJobOpen(false);
    showToast('New Job Record Added & Cryptographically Verified in Passport!');
  };

  // Save current Salary Check calculation to Passport
  const handleSaveCalculationToPassport = () => {
    const newRecord = {
      id: `job-${Date.now()}`,
      year: '2026',
      period: '2026 Expected Rate',
      role: salaryResult.roleName,
      company: 'Self-Declared Regional Benchmark',
      location: `${salaryResult.cityName}, ${salaryResult.state}`,
      monthlyPay: salaryResult.grossExpected,
      status: 'VERIFIED',
      tenure: `${salaryResult.daysWorked} Days (${salaryResult.overtimeHours}h OT)`,
      verifiedPayslips: 1,
      attendanceRate: '100%',
      badge: 'Calculated Target',
      highlights: `Wage check benchmark for ${salaryResult.roleName} in ${salaryResult.cityName}.`
    };

    setPassportRecords([newRecord, ...passportRecords]);
    showToast('Expected Wage Benchmark Saved to your Salary Passport!');
    setActivePage('salary-passport');
  };

  // Web Speech API for AI Explanation Audio Playback
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis not supported in this browser.', 'warning');
      return;
    }

    window.speechSynthesis.cancel();

    if (isSpeaking && speakingText === text) {
      setIsSpeaking(false);
      setSpeakingText('');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India')) || voices[0];
    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingText(text);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingText('');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingText('');
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingText('');
  };

  // Clean up speech and timers on unmount
  useEffect(() => {
    return () => {
      clearPipelineTimers();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        language,
        setLanguage,
        t,
        salaryInput,
        setSalaryInput,
        salaryResult,
        handleCalculateSalary,
        uploadState,
        setUploadState,
        uploadProgress,
        analysisStage,
        uploadedFile,
        verificationResult,
        setVerificationResult,
        extractedFieldsVisible,
        verificationError,
        startPayslipAnalysis,
        resetVerification,
        workerProfile,
        passportRecords,
        selectedJobRecord,
        setSelectedJobRecord,
        isAddJobOpen,
        setIsAddJobOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        handleAddJobRecord,
        handleSaveCalculationToPassport,
        isDemoModalOpen,
        setIsDemoModalOpen,
        demoStep,
        setDemoStep,
        isSpeaking,
        speakingText,
        speakText,
        stopSpeaking,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
