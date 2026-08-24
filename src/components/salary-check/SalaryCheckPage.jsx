import React from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import SectionHeader from '../ui/SectionHeader';
import { StepperProgress } from '../ui/Progress';
import StepWorkType from './StepWorkType';
import StepHours from './StepHours';
import StepOvertime from './StepOvertime';
import SalaryResultCard from './SalaryResultCard';
import { useState } from 'react';

export default function SalaryCheckPage() {
  const { salaryInput, setSalaryInput, salaryResult, handleCalculateSalary, t } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const steps = [
    { id: 1, label: t.step1, short: 'Work' },
    { id: 2, label: t.step2, short: 'Hours' },
    { id: 3, label: t.step3, short: 'Overtime' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCalculateSalary();
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setCurrentStep(1);
  };

  return (
    <div className="pt-32 pb-32 min-h-screen bg-[#0A0A0B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <SectionHeader
          eyebrow="Wage Intelligence Engine"
          title="Calculate Your"
          highlightText="Expected Pay"
          description="Audit your true market entitlement against current state minimum wage schedules and mandatory 2.0x overtime statutory standards."
        />

        {/* Showing result or wizard */}
        {showResult ? (
          <SalaryResultCard result={salaryResult} onReset={handleReset} />
        ) : (
          <div className="glass-card rounded-[32px] p-6 sm:p-10 border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
            
            {/* Stepper Progress Indicator */}
            <div className="mb-10 pb-8 border-b border-white/[0.08]">
              <StepperProgress
                steps={steps}
                currentStep={currentStep}
                onStepClick={(stepNum) => {
                  if (stepNum < currentStep) setCurrentStep(stepNum);
                }}
              />
            </div>

            {/* Wizard Step Content */}
            <div className="min-h-[280px]">
              {currentStep === 1 && (
                <StepWorkType salaryInput={salaryInput} setSalaryInput={setSalaryInput} />
              )}
              {currentStep === 2 && (
                <StepHours salaryInput={salaryInput} setSalaryInput={setSalaryInput} />
              )}
              {currentStep === 3 && (
                <StepOvertime salaryInput={salaryInput} setSalaryInput={setSalaryInput} />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-white/[0.08]">
              {currentStep > 1 ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handlePrev}
                  leftIcon={<span className="material-symbols-outlined text-sm">arrow_back</span>}
                >
                  Previous
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                rightIcon={
                  <span className="material-symbols-outlined text-base">
                    {currentStep === 3 ? 'calculate' : 'arrow_forward'}
                  </span>
                }
              >
                {currentStep === 3 ? t.calculateBtn : 'Continue'}
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
