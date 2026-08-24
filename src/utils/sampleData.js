/**
 * PaySaathi Realistic Demo & Verification Data
 * High-precision wage benchmarking & statutory auditing data fixtures
 */

export const SAMPLE_WORKER_PROFILE = {
  workerId: 'PS-8492-X',
  name: 'Vikram Singh',
  role: 'Security Supervisor',
  sector: 'Security Services',
  location: 'Bengaluru, Karnataka',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  trustScore: 98,
  trustRating: 'Top 5% Trust Rating',
  totalTenureMonths: 36,
  careerGrowthPercentage: 46,
  verificationCount: 14,
  currentEmployer: 'Sterling Heights Residential',
  bankAccountMasked: '•••• •••• •••• 4192',
  ifscMasked: 'HDFC••••••'
};

export const SAMPLE_PAYSLIP_SCENARIO = {
  fileName: 'Oct_2024_Payslip_SterlingHeights.pdf',
  fileSize: '2.4 MB',
  employerName: 'Acme Security & Facilities Ltd.',
  clientSite: 'Sterling Heights Tower B, Whitefield',
  monthYear: 'October 2024',
  disbursementDate: '07 Nov 2024',
  expectedGross: 18500,
  actualReceived: 16200,
  discrepancyAmount: 2300,
  verdict: 'POTENTIAL_DISCREPANCY',
  statusLabel: 'Potential Discrepancy Detected',
  confidenceScore: 99.4,
  extractedFields: [
    { label: 'Employee Name', value: 'Vikram Singh', confidence: '99.8%' },
    { label: 'Worker ID', value: 'PS-8492-X', confidence: '99.9%' },
    { label: 'Designation', value: 'Security Supervisor', confidence: '99.5%' },
    { label: 'Working Days', value: '22 Days Standard', confidence: '99.1%' },
    { label: 'Logged Overtime', value: '24 Hours (Paid: 10h single)', confidence: '98.7%' },
    { label: 'Bank Account', value: '•••• •••• •••• 4192', confidence: '100%' },
    { label: 'Gross Entitlement', value: '₹18,500', confidence: '99.4%' },
    { label: 'Net Disbursed', value: '₹16,200', confidence: '99.8%' }
  ],
  explanationText: 'Your payslip reflects basic attendance compensation of ₹13,200 (22 days). However, your logged 24 overtime hours were credited at ₹1,200 (flat standard rate for 10 hours) instead of the statutory 2.0x minimum rate of ₹2,880. Additionally, an unexplained ₹620 deduction tagged as "Misc Adj." was applied without contract reference.',
  lineItems: [
    {
      id: 'basic',
      label: 'Basic Pay (22 Days Standard)',
      note: 'Matches verified digital biometric log',
      expectedAmount: 13200,
      actualAmount: 13200,
      status: 'MATCH',
      difference: 0
    },
    {
      id: 'ot',
      label: 'Overtime Pay (OT: 24 logged hrs vs 10 slip hrs)',
      note: 'Payslip paid only 10 hrs at flat single rate; statutory minimum mandates 2.0x multiplier under Factories Act Sec 59',
      expectedAmount: 2880,
      actualAmount: 1200,
      status: 'DISCREPANCY',
      difference: -1680
    },
    {
      id: 'night_shift',
      label: 'Night Shift Differential (4 Shifts)',
      note: 'Matches site night perimeter guard log',
      expectedAmount: 2420,
      actualAmount: 2420,
      status: 'MATCH',
      difference: 0
    },
    {
      id: 'deductions',
      label: 'Unexplained Deductions ("Misc Adj.")',
      note: 'Not stipulated in standard wage schedule or labour welfare rules',
      expectedAmount: 0,
      actualAmount: -620,
      status: 'DISCREPANCY',
      difference: -620
    }
  ]
};

export const PASSPORT_TIMELINE = [
  {
    id: 'job-2026',
    year: '2026',
    period: 'Jan 2026 — Present',
    role: 'Security Supervisor',
    company: 'Sterling Heights Residential',
    location: 'Whitefield, Bengaluru',
    monthlyPay: 22000,
    status: 'VERIFIED',
    tenure: 'Active (8 mos)',
    verifiedPayslips: 8,
    attendanceRate: '99.2%',
    badge: 'Senior Role',
    highlights: 'Manages 12-person perimeter team; CCTV monitoring; zero grievance incidents.'
  },
  {
    id: 'job-2025',
    year: '2025',
    period: 'Feb 2025 — Dec 2025',
    role: 'Senior Guard (Grade A)',
    company: 'TechPark Phase II Facility',
    location: 'Electronic City, Bengaluru',
    monthlyPay: 18000,
    status: 'VERIFIED',
    tenure: '11 months',
    verifiedPayslips: 11,
    attendanceRate: '98.5%',
    badge: 'Promoted',
    highlights: 'Access control management; audited 480 visitor vehicles daily; rewarded for punctuality.'
  },
  {
    id: 'job-2024',
    year: '2024',
    period: 'Jan 2024 — Jan 2025',
    role: 'Security Guard',
    company: 'Oasis Apartments Gate 1',
    location: 'Koramangala, Bengaluru',
    monthlyPay: 15000,
    status: 'VERIFIED',
    tenure: '13 months',
    verifiedPayslips: 12,
    attendanceRate: '97.8%',
    badge: 'Foundation',
    highlights: 'Completed state civil defence certification; night shift specialist.'
  }
];

export const MONTHLY_SALARY_TREND = [
  { month: 'May 2024', expected: 18000, actual: 18000, status: 'MATCH' },
  { month: 'Jun 2024', expected: 18000, actual: 18000, status: 'MATCH' },
  { month: 'Jul 2024', expected: 18200, actual: 18200, status: 'MATCH' },
  { month: 'Aug 2024', expected: 18500, actual: 18500, status: 'MATCH' },
  { month: 'Sep 2024', expected: 18500, actual: 18500, status: 'MATCH' },
  { month: 'Oct 2024', expected: 18500, actual: 16200, status: 'DISCREPANCY' }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    role: 'Master Mason',
    city: 'Bengaluru, KA',
    quote: 'Before PaySaathi, my contractor cut 20 hours of overtime every month claiming local rules. PaySaathi gave me the exact statutory report, and we sorted it without arguments.',
    recoveredAmount: '₹4,800 recovered'
  },
  {
    id: 2,
    name: 'Vikram Singh',
    role: 'Security Supervisor',
    city: 'Bengaluru, KA',
    quote: 'My Salary Passport proved 3 years of verified on-time attendance. My new agency gave me a 25% higher supervisor package on day one because they didn’t have to call old employers.',
    recoveredAmount: '+46% Salary Growth'
  },
  {
    id: 3,
    name: 'Priya Sundaram',
    role: 'Textile Machine Operator',
    city: 'Tiruppur, TN',
    quote: 'The voice explanation explained exactly why my night shift allowance was missing. It is simple enough for anyone to understand and trust.',
    recoveredAmount: '₹3,200 recovered'
  }
];
