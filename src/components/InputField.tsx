import React from 'react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = ""
}) => {
  return (
    <div className="px-2 py-2 hover:bg-notion-hover rounded-[3px] transition-colors group">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm text-notion-text font-medium">
          {label}
        </label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-16 bg-transparent text-right text-sm text-notion-text focus:outline-none border-b border-transparent focus:border-notion-text/20 transition-colors p-0"
          />
          <span className="text-xs text-notion-text-light">{unit}</span>
        </div>
      </div>
      
      <div className="relative h-4 flex items-center opacity-40 group-hover:opacity-100 transition-opacity">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 bg-notion-border rounded-full appearance-none cursor-pointer accent-notion-text"
        />
      </div>
    </div>
  );
};
