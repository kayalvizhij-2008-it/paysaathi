/**
 * PaySaathi Wage Intelligence Engine
 * Calculations based on Regional Minimum Wage Schedules, Factory Acts & Sector Standards in India.
 */

export const WORKER_SECTORS = [
  {
    id: 'construction',
    name: 'Construction',
    icon: 'handyman',
    roles: [
      { id: 'mason', name: 'Master Mason / Rajmistri', baseDailyRate: 720, skillLevel: 'Skilled' },
      { id: 'helper', name: 'Construction Helper / Beldar', baseDailyRate: 520, skillLevel: 'Unskilled' },
      { id: 'painter', name: 'Commercial Painter', baseDailyRate: 680, skillLevel: 'Semi-Skilled' },
      { id: 'carpenter', name: 'Shuttering Carpenter', baseDailyRate: 750, skillLevel: 'Skilled' }
    ]
  },
  {
    id: 'security',
    name: 'Security Services',
    icon: 'local_police',
    roles: [
      { id: 'guard', name: 'Security Guard (Unarmed)', baseDailyRate: 640, skillLevel: 'Semi-Skilled' },
      { id: 'armed_guard', name: 'Armed Security Guard', baseDailyRate: 850, skillLevel: 'Skilled' },
      { id: 'supervisor', name: 'Security Field Supervisor', baseDailyRate: 920, skillLevel: 'Highly-Skilled' }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Factory',
    icon: 'precision_manufacturing',
    roles: [
      { id: 'assembler', name: 'Line Assembler', baseDailyRate: 620, skillLevel: 'Semi-Skilled' },
      { id: 'machine_op', name: 'CNC / Machine Operator', baseDailyRate: 820, skillLevel: 'Skilled' },
      { id: 'quality', name: 'Quality Checker / Inspector', baseDailyRate: 780, skillLevel: 'Skilled' }
    ]
  },
  {
    id: 'gig',
    name: 'Gig & Logistics',
    icon: 'two_wheeler',
    roles: [
      { id: 'delivery', name: 'Food / E-Commerce Courier', baseDailyRate: 650, skillLevel: 'Semi-Skilled' },
      { id: 'driver', name: 'Commercial Fleet Driver', baseDailyRate: 800, skillLevel: 'Skilled' },
      { id: 'loader', name: 'Warehouse Loader / Sorter', baseDailyRate: 580, skillLevel: 'Unskilled' }
    ]
  },
  {
    id: 'service',
    name: 'Hospitality & Facility',
    icon: 'cleaning_services',
    roles: [
      { id: 'cleaner', name: 'Facility Cleaning Staff', baseDailyRate: 530, skillLevel: 'Unskilled' },
      { id: 'cook', name: 'Commercial Cook / Chef', baseDailyRate: 820, skillLevel: 'Skilled' },
      { id: 'steward', name: 'Hospitality Steward', baseDailyRate: 640, skillLevel: 'Semi-Skilled' }
    ]
  }
];

export const CITY_TIERS = [
  { id: 'bengaluru', name: 'Bengaluru (Tier 1)', state: 'Karnataka', multiplier: 1.12 },
  { id: 'mumbai', name: 'Mumbai / MMR (Tier 1)', state: 'Maharashtra', multiplier: 1.15 },
  { id: 'delhi', name: 'Delhi NCR (Tier 1)', state: 'Delhi', multiplier: 1.14 },
  { id: 'chennai', name: 'Chennai (Tier 1)', state: 'Tamil Nadu', multiplier: 1.08 },
  { id: 'hyderabad', name: 'Hyderabad (Tier 1)', state: 'Telangana', multiplier: 1.06 },
  { id: 'pune', name: 'Pune (Tier 2)', state: 'Maharashtra', multiplier: 1.05 },
  { id: 'tier2', name: 'Tier 2 / Industrial Hubs', state: 'Pan-India', multiplier: 1.00 },
  { id: 'tier3', name: 'Tier 3 / Rural Townships', state: 'Pan-India', multiplier: 0.90 }
];

/**
 * Calculates expected pay breakdown with statutory rules.
 */
export function calculateExpectedPay({
  sectorId = 'construction',
  roleId = 'mason',
  cityId = 'bengaluru',
  daysWorked = 24,
  dailyHours = 8,
  overtimeHours = 12,
  nightShifts = 0,
  allowances = 0
}) {
  const sector = WORKER_SECTORS.find(s => s.id === sectorId) || WORKER_SECTORS[0];
  const role = sector.roles.find(r => r.id === roleId) || sector.roles[0];
  const city = CITY_TIERS.find(c => c.id === cityId) || CITY_TIERS[0];

  // Base daily rate adjusted for city tier living benchmark
  const adjustedDailyRate = Math.round(role.baseDailyRate * city.multiplier);
  const hourlyRate = Math.round(adjustedDailyRate / 8);

  // 1. Base Salary
  const baseSalary = adjustedDailyRate * daysWorked;

  // 2. Overtime: Statutory 2.0x standard rate per Indian Factories Act Sec 59
  const statutoryOtRate = hourlyRate * 2.0;
  const overtimePay = Math.round(overtimeHours * statutoryOtRate);

  // 3. Night Shift Premium (15% per shift)
  const nightShiftAllowance = Math.round(nightShifts * (adjustedDailyRate * 0.15));

  // 4. Extended shift compensation (if daily hours > 8)
  const extraDailyHours = Math.max(0, dailyHours - 8);
  const extendedDailyPay = Math.round(extraDailyHours * statutoryOtRate * daysWorked);

  // Total Expected
  const grossExpected = baseSalary + overtimePay + nightShiftAllowance + extendedDailyPay + allowances;

  return {
    sectorName: sector.name,
    roleName: role.name,
    skillLevel: role.skillLevel,
    cityName: city.name,
    state: city.state,
    daysWorked,
    dailyHours,
    overtimeHours,
    nightShifts,
    adjustedDailyRate,
    hourlyRate,
    statutoryOtRate,
    baseSalary,
    overtimePay,
    nightShiftAllowance,
    extendedDailyPay,
    grossExpected,
    formattedGross: formatINR(grossExpected),
    formattedBase: formatINR(baseSalary),
    formattedOT: formatINR(overtimePay)
  };
}

export function formatINR(amount) {
  if (typeof amount !== 'number') return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
