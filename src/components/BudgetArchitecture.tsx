import React from 'react';
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  CircleDollarSign,
  PieChart,
  ShieldCheck,
  Plane,
  BedDouble,
  TrainFront,
  MapPin,
  Utensils,
} from 'lucide-react';
import { Option, TripInputs, currency, Category } from '../data/travelData';
import { InView } from '@/components/motion-primitives/in-view';

interface BudgetArchitectureProps {
  plan: Option[];
  trip: TripInputs;
}

export const BudgetArchitecture: React.FC<BudgetArchitectureProps> = ({ plan, trip }) => {
  const flight = plan[0];
  const hotel = plan[1];
  const ride = plan[2];
  const places = plan[3];
  const food = plan[4];

  const totalCost = plan.reduce((sum, item) => sum + item.price, 0);
  const remaining = trip.budget - totalCost;
  const isSurplus = remaining >= 0;

  const categories = [
    { label: 'Flights', option: flight, color: 'bg-sky-400', textColor: 'text-sky-400', icon: Plane },
    { label: 'Hotel', option: hotel, color: 'bg-amber-400', textColor: 'text-amber-400', icon: BedDouble },
    { label: 'Transport', option: ride, color: 'bg-emerald-400', textColor: 'text-emerald-400', icon: TrainFront },
    { label: 'Experiences', option: places, color: 'bg-violet-400', textColor: 'text-violet-400', icon: MapPin },
    { label: 'Food', option: food, color: 'bg-orange-400', textColor: 'text-orange-400', icon: Utensils },
  ];

  return (
    <section id="budget" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <InView
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewOptions={{ once: true }}
      >
        <div className="rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#0a0e1a] border border-white/[0.1] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                  Fiscal Architecture
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">Resource Allocation & Burn Model</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Budget & Capital Distribution
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Live breakdown of all five travel categories against your target budget ceiling.
            </p>
          </div>

          {/* 3 Core Big Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {/* Total Budget */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Target Budget
                </span>
                <Wallet className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-white">
                {currency(trip.budget)}
              </div>
              <p className="text-xs text-slate-400 mt-1">Configured spending cap</p>
            </div>

            {/* Estimated Cost */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Estimated Cost
                </span>
                <CircleDollarSign className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-teal-300">
                {currency(totalCost)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {((totalCost / trip.budget) * 100).toFixed(1)}% of total capital allocated
              </p>
            </div>

            {/* Remaining Surplus or Over Budget */}
            <div
              className={`p-6 rounded-2xl border ${
                isSurplus
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-rose-500/10 border-rose-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {isSurplus ? 'Remaining Surplus' : 'Over Budget Deficit'}
                </span>
                {isSurplus ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                )}
              </div>
              <div
                className={`text-3xl sm:text-4xl font-bold font-mono ${
                  isSurplus ? 'text-emerald-300' : 'text-rose-400'
                }`}
              >
                {currency(Math.abs(remaining))}
              </div>
              <p
                className={`text-xs mt-1 ${
                  isSurplus ? 'text-emerald-400/90' : 'text-rose-300'
                }`}
              >
                {isSurplus
                  ? 'Liquid surplus for spontaneous experiences'
                  : 'Consider switching 1-2 categories to Best or Cheapest'}
              </p>
            </div>
          </div>

          {/* Visual Stacked Proportional Bar */}
          <div className="my-8">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>Proportional Category Weighting</span>
              <span>100% Calculated</span>
            </div>
            <div className="h-4 w-full rounded-full bg-white/[0.06] overflow-hidden flex shadow-inner">
              {categories.map((cat) => {
                const percentage = totalCost > 0 ? (cat.option.price / totalCost) * 100 : 20;
                return (
                  <div
                    key={cat.label}
                    title={`${cat.label}: ${percentage.toFixed(1)}%`}
                    style={{ width: `${percentage}%` }}
                    className={`${cat.color} hover:opacity-90 transition-all cursor-pointer`}
                  />
                );
              })}
            </div>
          </div>

          {/* Detailed Category Cost Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-white/[0.08]">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const percentage = totalCost > 0 ? ((cat.option.price / totalCost) * 100).toFixed(0) : '0';
              const perPerson = Math.round(cat.option.price / trip.travelers);

              return (
                <div
                  key={cat.label}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CatIcon className={`w-4 h-4 ${cat.textColor}`} />
                    <span className="text-xs font-bold text-white">{cat.label}</span>
                  </div>

                  <div className="text-lg font-bold font-mono text-white mb-0.5">
                    {currency(cat.option.price)}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{percentage}% share</span>
                    <span className="text-slate-400 font-mono">₹{perPerson.toLocaleString('en-IN')}/p</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Health Notice */}
          <div className="mt-8 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center gap-3 text-xs text-teal-200">
            <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
            <p>
              <strong>Autonomous Fiscal Optimization:</strong> All rates include dynamic taxes, fuel surcharges, and estimated city transit fees. Any adjustments to category rank automatically update the burn model.
            </p>
          </div>
        </div>
      </InView>
    </section>
  );
};
