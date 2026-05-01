import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  Activity,
  BatteryWarning,
  TrendingDown,
  ShieldAlert,
  XCircle,
  ZapOff,
  ShieldCheck,
  CheckCircle,
  Lock,
  UserCheck,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

/**
 * ASSET LIQUIDATION & VITALITY MONITOR
 * * * Design Philosophy:
 * - TOP SECTION (Green): Establishes Trust. Shows "Leonard’s Digital Improvements" is safe/compliant.
 * - MAIN SECTION (Red): Shows the Portfolio Health is critical/liquidating.
 * - ACTION: Prompts user to "Add Funds" to fix the Red status.
 */

// Mock data simulating a flatlining/dropping asset
const liquidationData = [
  { time: '10:00', value: 45 },
  { time: '11:00', value: 42 },
  { time: '12:00', value: 38 },
  { time: '13:00', value: 30 },
  { time: '14:00', value: 15 },
  { time: '15:00', value: 5 },
  { time: '16:00', value: 2 },
  { time: '17:00', value: 0 }, // Flatline
  { time: '18:00', value: 0 },
];

const VitalityGauge = ({ value }) => {
  // Calculates the rotation for the needle based on value (0-100)
  const rotation = (value / 100) * 180 - 90; // -90deg to +90deg

  return (
    <div className="relative w-64 h-32 overflow-hidden mx-auto">
      {/* Background Arc */}
      <div className="absolute w-64 h-64 rounded-full border-[20px] border-slate-800 top-0 box-border"></div>

      {/* Critical Zone Arc (Red) - Visualizing Weak Energy */}
      <div className="absolute w-64 h-64 rounded-full border-[20px] border-transparent border-l-red-600 border-t-red-600 top-0 box-border rotate-[-45deg]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>

      {/* Needle */}
      <div
        className="absolute bottom-0 left-1/2 w-1 h-28 bg-slate-200 origin-bottom transition-transform duration-1000 ease-out z-10"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      >
        <div className="w-4 h-4 bg-white rounded-full absolute -bottom-2 -left-1.5 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-2 left-4 text-red-500 font-bold text-xs tracking-widest">CRITICAL</div>
      <div className="absolute bottom-2 right-4 text-slate-600 font-bold text-xs tracking-widest">HEALTHY</div>
    </div>
  );
};

// NEW: Safety & Compliance Header
const ComplianceHeader = () => (
  <div className="w-full max-w-5xl bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-6 mb-8 relative overflow-hidden backdrop-blur-sm">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-400"></div>

    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

      {/* Identity Section */}
      <div className="flex items-center space-x-4">
        <div className="bg-emerald-500/20 p-3 rounded-full border border-emerald-500/50">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-emerald-400 font-bold text-lg tracking-wide uppercase">System Secure</h2>
          <div className="flex items-center text-emerald-100 font-semibold text-xl">
             <UserCheck className="w-5 h-5 mr-2" />
             Leonard’s Digital Improvements
          </div>
          <div className="flex items-center space-x-4 mt-2 text-xs text-emerald-300/80 uppercase tracking-widest">
            <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Identity Verified</span>
            <span className="flex items-center"><Lock className="w-3 h-3 mr-1" /> SSL Encrypted</span>
            <span className="flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Compliance Approved</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="bg-emerald-900/50 px-6 py-3 rounded-lg border border-emerald-500/30 text-center min-w-[200px]">
        <div className="text-xs text-emerald-400 uppercase tracking-widest mb-1">Owner Status</div>
        <div className="text-white font-bold text-lg">AUTHORIZED</div>
      </div>
    </div>
  </div>
);

// NEW: Funding Module
const LiquidityInjector = () => (
  <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-slate-900 to-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl mt-4 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">

    {/* Background Effect */}
    <div className="absolute right-0 top-0 w-64 h-full bg-red-600/5 blur-3xl"></div>

    <div className="z-10">
      <h3 className="text-white font-bold text-xl flex items-center">
        <Wallet className="w-6 h-6 mr-3 text-red-500" />
        Liquidity Injection Required
      </h3>
      <p className="text-slate-400 text-sm mt-1 max-w-lg">
        To restore portfolio health and reverse the liquidation arrow, additional capital must be allocated to the dashboard immediately.
      </p>
    </div>

    <div className="flex items-center gap-3 z-10 w-full md:w-auto">
      <div className="relative flex-grow md:flex-grow-0">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
        <input
          type="number"
          placeholder="0.00"
          className="bg-slate-950 border border-slate-700 text-white pl-8 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none w-full md:w-48 font-mono"
        />
      </div>
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center shadow-[0_0_20px_rgba(220,38,38,0.4)] whitespace-nowrap">
        ACTIVATE SYSTEM <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
);

export default function LiquidationDashboard() {
  const [energyLevel, setEnergyLevel] = useState(100);

  // Effect to simulate the "Draining" of energy upon load
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnergyLevel(12); // Drops to 12% to show weak energy
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 flex flex-col items-center">

      {/* 1. GREEN ZONE: Trust & Compliance */}
      <ComplianceHeader />

      {/* 2. RED ZONE: The Warning Banner */}
      <div className="w-full max-w-5xl bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-8 flex items-center animate-pulse">
        <AlertTriangle className="text-red-500 w-8 h-8 mr-4" />
        <div>
          <h2 className="text-red-500 font-bold text-lg tracking-wider">DASHBOARD HEALTH: CRITICAL</h2>
          <p className="text-red-400 text-sm">
            Operational funds depleted. System cannot maintain active status without capital injection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

        {/* CARD 1: The Vitality Gauge (Weak Energy) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-400 font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2" /> PORTFOLIO VITALITY
            </h3>
            <span className="bg-red-900/30 text-red-500 text-xs px-2 py-1 rounded border border-red-900/50">
              WEAK SIGNAL
            </span>
          </div>

          <div className="py-6">
            <VitalityGauge value={energyLevel} />
          </div>

          <div className="text-center mt-4">
            <div className="text-5xl font-bold text-red-600 font-mono tracking-tighter">
              {energyLevel}%
            </div>
            <p className="text-slate-500 text-sm mt-2 uppercase tracking-widest">System Energy Low</p>
          </div>
        </div>

        {/* CARD 2: Liquidation Status (The Arrow) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 w-1 h-full bg-red-600/20"></div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-400 font-medium flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" /> ASSET DIRECTION
            </h3>
            <span className="text-red-500 font-bold text-xs uppercase">Liquidating</span>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow py-8">
            {/* The "Stimulating" Arrow - Pulsing Red */}
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
              <ArrowDown className="w-32 h-32 text-red-600 animate-bounce" strokeWidth={1} />
            </div>
            <h2 className="text-2xl text-white font-light mt-4">Depleting</h2>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
            <div className="h-full bg-red-600 w-full animate-[shimmer_2s_infinite] origin-left scale-x-100 transition-transform"></div>
          </div>
        </div>

        {/* CARD 3: Technical Analysis (Flatline) */}
        <div className="col-span-1 md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center space-x-2">
                <ZapOff className="text-slate-500 w-5 h-5" />
                <span className="text-slate-300 font-bold">DIGITAL ASSET PERFORMANCE</span>
             </div>
             <div className="flex items-center space-x-4 text-sm">
                <span className="text-slate-500">Active Investment: <span className="text-white">NO</span></span>
                <span className="text-slate-500">Mode: <span className="text-red-500 font-bold">RECOVERY ONLY</span></span>
             </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liquidationData}>
                <YAxis hide domain={[0, 60]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ color: '#ef4444' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#ef4444' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center text-red-500 text-sm">
              <BatteryWarning className="w-4 h-4 mr-2" />
              <span>Insufficient Operational Power</span>
            </div>
            <div className="text-slate-500 text-xs font-mono">
              LAST READING: 0.00 KH/s
            </div>
          </div>
        </div>

        {/* 3. ACTION ZONE: The Solution */}
        <LiquidityInjector />

      </div>
    </div>
  );
}
