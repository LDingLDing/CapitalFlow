import { create } from 'zustand';

export interface CalculationResult {
  year: number;
  beginBalance: number;
  profit: number;
  withdraw: number;
  endBalance: number;
  cumulativeWithdraw: number;
}

export interface Summary {
  peakBalance: number;
  exhaustYear: number | null;
  totalWithdraw: number;
  principalMultiplier: number;
  isPerpetual: boolean;
}

interface CalculatorState {
  // Inputs
  principal: number;      // 本金 (万元)
  rate: number;           // 年化收益率 (%)
  withdrawal: number;     // 首年支取 (万元)
  growth: number;         // 支取增长率 (%)
  years: number;          // 计算年限

  // Results
  results: CalculationResult[];
  summary: Summary;

  // Actions
  setPrincipal: (val: number) => void;
  setRate: (val: number) => void;
  setWithdrawal: (val: number) => void;
  setGrowth: (val: number) => void;
  setYears: (val: number) => void;
  reset: () => void;
  calculate: () => void;
}

const DEFAULT_STATE = {
  principal: 300,
  rate: 8,
  withdrawal: 12,
  growth: 2,
  years: 40,
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  ...DEFAULT_STATE,
  results: [],
  summary: {
    peakBalance: 0,
    exhaustYear: null,
    totalWithdraw: 0,
    principalMultiplier: 0,
    isPerpetual: true,
  },

  setPrincipal: (principal) => { set({ principal }); get().calculate(); },
  setRate: (rate) => { set({ rate }); get().calculate(); },
  setWithdrawal: (withdrawal) => { set({ withdrawal }); get().calculate(); },
  setGrowth: (growth) => { set({ growth }); get().calculate(); },
  setYears: (years) => { set({ years }); get().calculate(); },
  
  reset: () => {
    set(DEFAULT_STATE);
    get().calculate();
  },

  calculate: () => {
    const { principal, rate, withdrawal, growth, years } = get();
    
    let balance = principal;
    const results: CalculationResult[] = [];
    let totalWithdraw = 0;
    let peakBalance = principal;
    let exhaustYear: number | null = null;

    const decimalRate = rate / 100;
    const decimalGrowth = growth / 100;

    for (let year = 1; year <= years; year++) {
      const beginBalance = balance;
      
      // 计算计划提取额
      const plannedWithdraw = withdrawal * Math.pow(1 + decimalGrowth, year - 1);
      
      // 如果期初余额不足以支付提取额，则提取额为0
      // 或者如果上一年的期末余额为0或负数，则提取额为0
      const currentWithdraw = (beginBalance > 0 && beginBalance >= plannedWithdraw) 
        ? plannedWithdraw 
        : 0;
      
      const profit = beginBalance * decimalRate;
      
      const endBalance = beginBalance + profit - currentWithdraw;
      totalWithdraw += currentWithdraw;
      
      if (endBalance > peakBalance) {
        peakBalance = endBalance;
      }

      results.push({
        year,
        beginBalance,
        profit,
        withdraw: currentWithdraw,
        endBalance: Math.max(0, endBalance),
        cumulativeWithdraw: totalWithdraw
      });

      balance = endBalance;

      // 如果计划提取额大于0，但实际提取额为0（因为余额不足），则账户寿命结束
      if (plannedWithdraw > 0 && currentWithdraw === 0 && exhaustYear === null) {
        exhaustYear = year;
      }
    }

    set({
      results,
      summary: {
        peakBalance,
        exhaustYear,
        totalWithdraw,
        principalMultiplier: balance > 0 ? balance / principal : 0,
        isPerpetual: exhaustYear === null
      }
    });
  },
}));
