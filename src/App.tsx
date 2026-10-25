import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Sliders, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  Info,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Merchant Balance State
  const [currentAvailableBalance, setCurrentAvailableBalance] = useState<number>(142500);
  const [instantSettledToday, setInstantSettledToday] = useState<number>(35000);
  const [settlementAmount, setSettlementAmount] = useState<number>(50000);
  const [selectedSpeed, setSelectedSpeed] = useState<'instant' | 'standard'>('instant');
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank •••• 4019');
  
  // Status State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [payoutHistory, setPayoutHistory] = useState<Array<{
    id: string;
    date: string;
    gross: number;
    fee: number;
    net: number;
    type: 'Instant (10s)' | 'Standard (T+2)';
    status: 'Settled' | 'Pending';
  }>>([
    { id: 'SETTL-9821', date: 'Today, 11:20 AM', gross: 35000, fee: 52.5, net: 34947.5, type: 'Instant (10s)', status: 'Settled' },
    { id: 'SETTL-9820', date: 'Yesterday, 06:00 PM', gross: 78000, fee: 0, net: 78000, type: 'Standard (T+2)', status: 'Settled' }
  ]);

  // Dynamic fee calculation: 0.15% for instant, ₹0 for standard
  const feeRate = selectedSpeed === 'instant' ? 0.0015 : 0;
  const computedFee = Math.round(settlementAmount * feeRate * 100) / 100;
  const netSettlement = settlementAmount - computedFee;

  const handleExecuteSettlement = () => {
    if (settlementAmount <= 0 || settlementAmount > currentAvailableBalance) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newPayoutId = `SETTL-${Math.floor(1000 + Math.random() * 9000)}`;
      
      setCurrentAvailableBalance(prev => prev - settlementAmount);
      if (selectedSpeed === 'instant') {
        setInstantSettledToday(prev => prev + settlementAmount);
      }

      setPayoutHistory(prev => [
        {
          id: newPayoutId,
          date: 'Just now',
          gross: settlementAmount,
          fee: computedFee,
          net: netSettlement,
          type: selectedSpeed === 'instant' ? 'Instant (10s)' : 'Standard (T+2)',
          status: 'Settled'
        },
        ...prev
      ]);

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }
    }, 1200);
  };

  const handleQuickPreset = (percentage: number) => {
    const amt = Math.floor((currentAvailableBalance * percentage) / 100);
    setSettlementAmount(amt);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm md:text-base text-white tracking-tight">Merchant Instant Settlement Console</h1>
              <p className="text-xs text-slate-400">Razorpay Fix My Itch Prototype #2 • On-Demand IMPS Payouts</p>
            </div>
          </div>
          <a 
            href="https://github.com/abhayvinod-web/merchant-instant-settlement" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center">
        <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl text-slate-900">
          
          {/* Top Banner */}
          <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-900">Merchant Cashflow Engine:</span>
              <span className="text-slate-600">On-Demand Working Capital & Live Fee Transparency</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold">
                IMPS / NEFT Rail: Operational
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-1">
                <span className="text-xs text-slate-500 font-medium">Available for Instant Payout</span>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  ₹{currentAvailableBalance.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  ● Ready for immediate IMPS dispatch
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-1">
                <span className="text-xs text-slate-500 font-medium">Disbursed Today (Instant)</span>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  ₹{instantSettledToday.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-500 block">
                  10s bank credit turnaround
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-1">
                <span className="text-xs text-slate-500 font-medium">Standard Locked (T+2 Cycle)</span>
                <div className="text-2xl font-bold text-slate-400 font-mono">
                  ₹0.00
                </div>
                <span className="text-[10px] text-slate-500 block">
                  0% weekend cashlock achieved
                </span>
              </div>
            </div>

            {/* Settlement Dispatch Controller */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column */}
              <div className="lg:col-span-7 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    Configure Payout Dispatch
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">Max: ₹{currentAvailableBalance.toLocaleString('en-IN')}</span>
                </div>

                {/* Amount Slider & Presets */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-slate-600 font-medium">Payout Amount:</label>
                    <div className="text-xl font-bold text-slate-900 font-mono">
                      ₹{settlementAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <input 
                    type="range"
                    min={1000}
                    max={Math.max(currentAvailableBalance, 1000)}
                    step={500}
                    value={settlementAmount}
                    onChange={e => setSettlementAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />

                  <div className="flex gap-2">
                    {[25, 50, 75, 100].map(pct => (
                      <button
                        key={pct}
                        onClick={() => handleQuickPreset(pct)}
                        className="flex-1 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono font-medium rounded-lg border border-slate-200 transition shadow-sm cursor-pointer"
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed Selector: Instant vs Standard */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-700 font-medium block">Select Settlement Speed:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedSpeed('instant')}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                        selectedSpeed === 'instant'
                          ? 'bg-white border-slate-900 text-slate-900 shadow font-semibold'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          Instant (10 Seconds)
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          0.15% fee
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Direct IMPS push even on bank holidays & weekends.
                      </p>
                    </button>

                    <button
                      onClick={() => setSelectedSpeed('standard')}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                        selectedSpeed === 'standard'
                          ? 'bg-white border-slate-900 text-slate-900 shadow font-semibold'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Standard (T+2 Days)
                        </span>
                        <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          Free (₹0)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Processed in standard batch banking windows.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Destination Bank Account */}
                <div>
                  <label className="text-xs text-slate-700 font-medium block mb-1">Destination Bank Account:</label>
                  <select
                    value={selectedBank}
                    onChange={e => setSelectedBank(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-mono"
                  >
                    <option value="HDFC Bank •••• 4019">HDFC Current Account (•••• 4019 - Primary)</option>
                    <option value="ICICI Bank •••• 8821">ICICI Business Account (•••• 8821)</option>
                    <option value="SBI Corporate •••• 1109">State Bank of India (•••• 1109)</option>
                  </select>
                </div>

                {/* Settlement Dispatch Button */}
                <button
                  onClick={handleExecuteSettlement}
                  disabled={isProcessing || settlementAmount <= 0 || settlementAmount > currentAvailableBalance}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    isProcessing || settlementAmount <= 0 || settlementAmount > currentAvailableBalance
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Dispatching IMPS Network Push...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Execute {selectedSpeed === 'instant' ? 'Instant' : 'Standard'} Settlement (₹{netSettlement.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Breakdown & Audit Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-slate-800">
                    Settlement Cost Breakdown
                  </h5>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Gross Payout:</span>
                      <span className="text-slate-900 font-bold">₹{settlementAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Rail Speed:</span>
                      <span className="text-slate-900 uppercase font-sans text-[11px] font-semibold">{selectedSpeed}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Instant Convenience Fee:</span>
                      <span className="text-amber-700 font-semibold">{computedFee > 0 ? `₹${computedFee.toFixed(2)} (0.15%)` : '₹0.00 (Free)'}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-sm">
                      <span className="text-slate-800 font-sans font-bold">Net Bank Credit:</span>
                      <span className="text-emerald-700 font-bold">₹{netSettlement.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Recent History Table */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-700">
                      Recent Payout Log
                    </h5>
                    <span className="text-[10px] text-slate-400 font-mono">Live Dispatches</span>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {payoutHistory.map(item => (
                      <div key={item.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-slate-800">₹{item.net.toLocaleString('en-IN')}</span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{item.id} • {item.date}</p>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
