import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Line
} from 'recharts';
import { useCalculatorStore } from '../store/useCalculatorStore';

// 自定义 Tooltip 组件
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white rounded-[3px] border border-notion-border shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-3">
        <div className="text-sm font-medium text-notion-text mb-2">
          第 {data.year} 年
        </div>
        <div className="space-y-1.5">
          <div className="text-sm text-notion-text-light">
            <span className="text-notion-text font-medium">
              账户余额：{data.endBalance.toFixed(1)} 万
            </span>
          </div>
          <div className="text-sm text-notion-text-light">
            <span className="text-notion-green font-medium">
              累计提取：{data.cumulativeWithdraw.toFixed(1)} 万
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const Charts: React.FC = () => {
  const { results } = useCalculatorStore();

  return (
    <div className="border border-notion-border rounded-[3px] p-2 md:p-4">
      <div className="h-[250px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={results} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#37352F" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#37352F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9E9E9" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9B9A97', fontSize: 10, fontFamily: 'Inter'}}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9B9A97', fontSize: 10, fontFamily: 'Inter'}}
              tickFormatter={(val) => `${val}`}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#37352F', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Area 
              type="monotone" 
              dataKey="endBalance" 
              name="余额" 
              stroke="#37352F" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
            />
            <Line 
              type="monotone" 
              dataKey="cumulativeWithdraw" 
              name="累计提取" 
              stroke="#0F7B6C" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 md:mt-4 flex justify-center gap-4 md:gap-6 text-[10px] md:text-xs text-notion-text-light">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-notion-text rounded-full"></div>
          <span>预测余额</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-notion-green rounded-full"></div>
          <span>累计提取</span>
        </div>
      </div>
    </div>
  );
};
