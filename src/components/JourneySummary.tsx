import React from 'react';
import {
  CalendarDays,
  Users,
  WalletCards,
  CircleDollarSign,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { TripInputs, Rank, rankOrder, currency } from '../data/travelData';
import { AnimatedBackground } from '@/components/motion-primitives/animated-background';
import { InView } from '@/components/motion-primitives/in-view';

interface JourneySummaryProps {
  trip: TripInputs;
  totalCost: number;
  remainingBudget: number;
  onSetAllRanks: (rank: Rank) => void;
  activeGlobalRank?: Rank;
}

export const JourneySummary: React.FC<JourneySummaryProps> = ({
  trip,
  totalCost,
  remainingBudget,
  onSetAllRanks,
  activeGlobalRank,
}) => {
  const isOverBudget = remainingBudget < 0;
  const budgetUtilization = Math.min(100, Math.round((totalCost / trip.budget) * 100));

  return (
    <section id="journey-stack" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <InView
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewOptions={{ once: true }}
      >
        <div className="rounded-3xl bg-gradient-to-b from-[#101827] to-[#0a0e1a] border border-white/[0.1] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Top Headline & Global Rank Controller */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08] relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                  Synthesized Journey Overview
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-mono">Live Recalculation Engine</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                {trip.from} <span className="text-teal-400">→</span> {trip.to}
              </h2>
            </div>

            {/* Global Strategy Preset Selector using AnimatedBackground */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Global Strategy:</span>
              </span>

              <div className="inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                <AnimatedBackground
                  defaultValue={activeGlobalRank || 'Best'}
                  className="rounded-xl bg-teal-500/20 border border-teal-500/40 shadow-sm"
                  transition={{
                    type: 'spring',
                    bounce: 0.15,
                    duration: 0.35,
                  }}
                  onValueChange={(id) => id && onSetAllRanks(id as Rank)}
                >
                  {rankOrder.map((rank) => (
                    <button
                      key={rank}
                      data-id={rank}
                      type="button"
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {rank}
                    </button>
                  ))}
                </AnimatedBackground>
              </div>
            </div>
          </div>

          {/* 5 Core Metric Blocks */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pt-6 relative z-10">
            {/* 1. Destination */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Destination
              </span>
              <div className="text-lg sm:text-xl font-bold font-display text-white truncate">
                {trip.to}
              </div>
              <p className="text-xs text-teal-400/90 font-medium mt-0.5">Route Verified</p>
            </div>

            {/* 2. Dates */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Travel Dates
              </span>
              <div className="text-lg sm:text-xl font-bold font-display text-white truncate">
                {trip.dates}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">4 Days & Nights</p>
            </div>

            {/* 3. Travellers */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Party Size
              </span>
              <div className="text-lg sm:text-xl font-bold font-display text-white">
                {trip.travelers} {trip.travelers === 1 ? 'Traveller' : 'Travellers'}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Profile Linked</p>
            </div>

            {/* 4. Total Estimated Cost */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Estimated Cost
              </span>
              <div className="text-lg sm:text-xl font-bold font-mono font-extrabold text-teal-300">
                {currency(totalCost)}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {budgetUtilization}% of budget
              </p>
            </div>

            {/* 5. Remaining Budget */}
            <div
              className={`p-4 rounded-2xl border col-span-2 sm:col-span-1 ${
                isOverBudget
                  ? 'bg-rose-500/10 border-rose-500/30'
                  : 'bg-emerald-500/10 border-emerald-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  {isOverBudget ? 'Budget Strained' : 'Surplus Budget'}
                </span>
                {isOverBudget && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
              </div>
              <div
                className={`text-lg sm:text-xl font-bold font-mono font-extrabold ${
                  isOverBudget ? 'text-rose-400' : 'text-emerald-300'
                }`}
              >
                {currency(Math.abs(remainingBudget))}
              </div>
              <p className={`text-xs mt-0.5 ${isOverBudget ? 'text-rose-300' : 'text-emerald-400/90'}`}>
                {isOverBudget ? 'Exceeds target budget' : 'Remaining reserve'}
              </p>
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
};
