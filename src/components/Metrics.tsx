import React from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';

export const Metrics: React.FC = () => {
  const { summary } = useCalculatorStore();

  const cards = [
    {
      title: '峰值余额',
      value: summary.peakBalance.toFixed(1),
      unit: '万',
      subtext: '最高预测值'
    },
    {
      title: '账户寿命',
      value: summary.isPerpetual ? '无限' : `${summary.exhaustYear} 年`,
      unit: '',
      subtext: summary.isPerpetual ? '可持续' : '预计耗尽'
    },
    {
      title: '总提取额',
      value: summary.totalWithdraw.toFixed(1),
      unit: '万',
      subtext: '累计支付'
    },
    {
      title: '倍数',
      value: summary.principalMultiplier.toFixed(2),
      unit: '倍',
      subtext: '终值 / 本金'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="p-2 md:p-3 border border-notion-border rounded-[3px] hover:bg-notion-bg-gray transition-colors">
          <div className="text-[10px] md:text-xs text-notion-text-light uppercase tracking-wide mb-1">
            {card.title}
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-lg md:text-xl font-semibold text-notion-text">
              {card.value}
            </span>
            <span className="text-[10px] md:text-xs text-notion-text-light">
              {card.unit}
            </span>
          </div>
          <p className="text-[9px] md:text-[10px] text-notion-text-light">
            {card.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};
