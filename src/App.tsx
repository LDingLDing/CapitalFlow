import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Metrics } from './components/Metrics';
import { Charts } from './components/Charts';
import { DataTable } from './components/DataTable';
import { AlertCircle, Lightbulb, Menu, X } from 'lucide-react';
import { useCalculatorStore } from './store/useCalculatorStore';

const App: React.FC = () => {
  const { summary, principal, rate, withdrawal, growth } = useCalculatorStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-notion-bg text-notion-text font-sans selection:bg-notion-bg-blue selection:text-notion-text overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:fixed inset-y-0 left-0 z-50 md:z-auto
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      <main className="flex-1 overflow-y-auto h-screen md:ml-72">
        <div className="w-full p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Mobile header with menu button */}
          <div className="md:hidden mb-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-notion-hover rounded-[3px] transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-lg font-semibold text-notion-text">年金计算器</h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>

          <header className="mb-8 md:mb-12 group">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
               <div className="text-4xl md:text-6xl">🪙</div>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-notion-text mb-3 md:mb-4 tracking-tight leading-tight">
              {principal} 万本金年化 {rate}%，每年支取 {withdrawal} 万且支取额 年增 {growth}% 的账户余额表
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-notion-text-light border-b border-notion-border pb-3 md:pb-4">
              <div className="flex items-center gap-2">
                <span>创建者</span>
                <span className="text-notion-text">@LuhuiDev</span>
              </div>
              <div className="flex items-center gap-2">
                <span>标签</span>
                <span className="bg-notion-bg-gray text-notion-text px-1.5 rounded-[3px]">金融</span>
                <span className="bg-notion-bg-gray text-notion-text px-1.5 rounded-[3px]">退休</span>
              </div>
            </div>
          </header>

          <section className="mb-8 md:mb-12">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
              <span className="bg-notion-text text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-[3px] text-xs">1</span>
              关键指标
            </h2>
            <Metrics />
          </section>

          <section className="mb-8 md:mb-12">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
              <span className="bg-notion-text text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-[3px] text-xs">2</span>
              可视化分析
            </h2>
            <Charts />
          </section>

          <section className="mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Callout Block - Risk */}
            <div className="p-3 md:p-4 bg-notion-bg-red rounded-[3px] border border-transparent flex gap-2 md:gap-3">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-notion-text shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-xs md:text-sm mb-1">风险评估</h3>
                <div className="text-xs md:text-sm space-y-1.5 md:space-y-2">
                  {!summary.isPerpetual ? (
                    <p>
                      账户预计在第 <span className="font-bold border-b border-notion-text/20">{summary.exhaustYear}</span> 年耗尽。
                    </p>
                  ) : (
                    <p className="text-notion-text">
                      当前计划可持续无限期运行。
                    </p>
                  )}
                  {rate < 5 && (
                    <p>
                      低回报率（{rate}%）可能无法跑赢通胀。
                    </p>
                  )}
                  {withdrawal > principal * 0.1 && (
                    <p>
                      高提取率（{((withdrawal / principal) * 100).toFixed(1)}%）。
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Callout Block - Tips */}
            <div className="p-3 md:p-4 bg-notion-bg-blue rounded-[3px] border border-transparent flex gap-2 md:gap-3">
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-notion-text shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-xs md:text-sm mb-1">建议</h3>
                <p className="text-xs md:text-sm">
                  {summary.isPerpetual 
                    ? "您的财务结构稳健。考虑将超额收益进行再投资。"
                    : `要实现永续性，考虑将初始提取额降至 ${(principal * rate / 100).toFixed(1)}万。`}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 md:mb-24">
             <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
              <span className="bg-notion-text text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-[3px] text-xs">3</span>
              详细账目
            </h2>
            <DataTable />
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
