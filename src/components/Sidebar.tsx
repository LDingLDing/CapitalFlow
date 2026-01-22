import React, { useEffect } from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { InputField } from './InputField';
import { 
  RotateCcw,
  Play,
  X
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const {
    principal, setPrincipal,
    rate, setRate,
    withdrawal, setWithdrawal,
    growth, setGrowth,
    years, setYears,
    reset, calculate
  } = useCalculatorStore();

  useEffect(() => {
    calculate();
  }, []);

  return (
    <aside className="w-72 bg-notion-sidebar border-r border-notion-border h-full overflow-y-auto flex flex-col shrink-0 font-sans text-notion-text">
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center rounded-[3px] overflow-hidden">
              <img src="/CapitalFlow/icon.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-semibold text-sm tracking-wide text-notion-text">年金计算器</h1>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-notion-hover rounded-[3px] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-1">
          <div className="px-2 py-1 text-xs font-medium text-notion-text-light uppercase tracking-wider mb-2">
            输入参数
          </div>

          <InputField
            label="初始本金"
            value={principal}
            onChange={setPrincipal}
            min={10}
            max={5000}
            unit="万"
          />

          <InputField
            label="年化收益率"
            value={rate}
            onChange={setRate}
            min={0}
            max={20}
            step={0.1}
            unit="%"
          />

          <InputField
            label="首年提取额"
            value={withdrawal}
            onChange={setWithdrawal}
            min={1}
            max={100}
            unit="万"
          />

          <InputField
            label="提取增长率"
            value={growth}
            onChange={setGrowth}
            min={0}
            max={10}
            step={0.1}
            unit="%"
          />

          <InputField
            label="持续时间"
            value={years}
            onChange={setYears}
            min={1}
            max={50}
            unit="年"
          />
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-notion-border">
        <button
          onClick={calculate}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-notion-text hover:bg-notion-text/90 text-white rounded-[3px] transition-colors text-sm font-medium mb-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>运行模拟</span>
        </button>
        
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-notion-text-light hover:bg-notion-hover hover:text-notion-text rounded-[3px] transition-colors text-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          重置为默认值
        </button>
      </div>
    </aside>
  );
};
