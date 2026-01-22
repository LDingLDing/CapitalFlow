import React, { useState } from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

export const DataTable: React.FC = () => {
  const { results } = useCalculatorStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const exportToCSV = () => {
    const headers = ['年份', '期初余额', '收益', '提取', '期末余额'];
    const rows = results.map(r => [
      r.year, 
      r.beginBalance.toFixed(2), 
      r.profit.toFixed(2), 
      r.withdraw.toFixed(2), 
      r.endBalance.toFixed(2)
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "年金数据.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border border-notion-border rounded-[3px] overflow-hidden">
      <div className="px-3 md:px-4 py-2 md:py-3 bg-notion-sidebar border-b border-notion-border flex justify-between items-center">
        <div className="text-xs md:text-sm font-medium text-notion-text">年度明细</div>
        <div className="flex gap-1 md:gap-2">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-1 px-2 py-1 text-[10px] md:text-xs text-notion-text-light hover:bg-notion-hover rounded-[3px] transition-colors"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">导出CSV</span>
            <span className="sm:hidden">CSV</span>
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-1 text-xs text-notion-text-light hover:bg-notion-hover rounded-[3px] transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="overflow-x-auto max-h-[300px] md:max-h-[400px]">
          <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[500px]">
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_rgba(0,0,0,0.05)]">
              <tr>
                <th className="px-2 md:px-4 py-1.5 md:py-2 font-medium text-notion-text-light border-b border-notion-border w-16 md:w-20">年份</th>
                <th className="px-2 md:px-4 py-1.5 md:py-2 font-medium text-notion-text-light border-b border-notion-border text-right">期初</th>
                <th className="px-2 md:px-4 py-1.5 md:py-2 font-medium text-notion-text-light border-b border-notion-border text-right">收益</th>
                <th className="px-2 md:px-4 py-1.5 md:py-2 font-medium text-notion-text-light border-b border-notion-border text-right">提取</th>
                <th className="px-2 md:px-4 py-1.5 md:py-2 font-medium text-notion-text-light border-b border-notion-border text-right">期末</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.year} className="hover:bg-notion-hover/50 transition-colors border-b border-notion-border last:border-0">
                  <td className="px-2 md:px-4 py-1.5 md:py-2 text-notion-text">{row.year}</td>
                  <td className="px-2 md:px-4 py-1.5 md:py-2 text-right text-notion-text-light tabular-nums">{row.beginBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="px-2 md:px-4 py-1.5 md:py-2 text-right text-notion-green tabular-nums">+{row.profit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="px-2 md:px-4 py-1.5 md:py-2 text-right text-notion-text-light tabular-nums">-{row.withdraw.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="px-2 md:px-4 py-1.5 md:py-2 text-right font-medium text-notion-text tabular-nums">
                    {row.endBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
