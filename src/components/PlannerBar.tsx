import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  ArrowRightLeft,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { TripInputs, FamilyMember, Profile } from '../data/travelData';
import { InView } from '@/components/motion-primitives/in-view';

interface PlannerBarProps {
  trip: TripInputs;
  onTripChange: (newTrip: TripInputs) => void;
  onBuildPlan: () => void;
  scanState: 'idle' | 'scanning' | 'ready';
  profile: Profile;
  family: FamilyMember[];
}

export const PlannerBar: React.FC<PlannerBarProps> = ({
  trip,
  onTripChange,
  onBuildPlan,
  scanState,
  profile,
  family,
}) => {
  const [activeFocus, setActiveFocus] = useState<string | null>(null);

  const swapLocations = () => {
    onTripChange({
      ...trip,
      from: trip.to,
      to: trip.from,
    });
  };

  const budgetPresets = [50000, 90000, 150000, 220000];

  const quickDestinations = ['Singapore', 'Tokyo', 'Amalfi Coast', 'Swiss Alps', 'Paris'];

  return (
    <section id="planner" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-16 z-20">
      <InView
        variants={{
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewOptions={{ once: true }}
      >
        <div className="relative rounded-3xl bg-[#0e1422]/90 border border-white/[0.12] p-5 sm:p-7 shadow-2xl backdrop-blur-2xl transition-all hover:border-teal-500/30">
          {/* Subtle top indicator bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                AI Autonomous Route Engine
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">
                Active Party: <strong className="text-teal-300">{profile.name}</strong> + {Math.max(0, trip.travelers - 1)} registered
              </span>
            </div>

            {/* Quick destination chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[11px] text-slate-500 uppercase font-semibold mr-1">Quick:</span>
              {quickDestinations.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onTripChange({ ...trip, to: city })}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    trip.to.toLowerCase() === city.toLowerCase()
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* Origin & Destination: Dominant Search Bar */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2 relative">
              {/* Departure */}
              <div
                className={`relative flex items-center p-3.5 rounded-2xl bg-white/[0.03] border transition-all ${
                  activeFocus === 'from'
                    ? 'border-teal-400 ring-2 ring-teal-400/20 bg-white/[0.06]'
                    : 'border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 mr-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Departure From
                  </label>
                  <input
                    type="text"
                    value={trip.from}
                    onFocus={() => setActiveFocus('from')}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => onTripChange({ ...trip, from: e.target.value })}
                    className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-white focus:outline-none focus:ring-0 placeholder-slate-500"
                    placeholder="Origin city..."
                  />
                </div>
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={swapLocations}
                className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#131b2e] border border-white/20 text-slate-300 hover:text-teal-300 hover:border-teal-400/50 hover:scale-110 items-center justify-center transition-all shadow-lg cursor-pointer"
                title="Swap origin and destination"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>

              {/* Destination - VISUALLY DOMINANT */}
              <div
                className={`relative flex items-center p-3.5 rounded-2xl bg-gradient-to-r from-teal-950/30 to-slate-900/40 border transition-all ${
                  activeFocus === 'to'
                    ? 'border-teal-400 ring-2 ring-teal-400/30 bg-teal-950/50 shadow-lg shadow-teal-500/10'
                    : 'border-teal-500/40 hover:border-teal-400'
                }`}
              >
                <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 mr-3 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-teal-300">
                      Destination (Focus)
                    </label>
                    <span className="text-[10px] text-teal-400/80 font-mono font-semibold">AI TARGET</span>
                  </div>
                  <input
                    type="text"
                    value={trip.to}
                    onFocus={() => setActiveFocus('to')}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => onTripChange({ ...trip, to: e.target.value })}
                    className="w-full bg-transparent border-0 p-0 text-base font-bold text-white focus:outline-none focus:ring-0 placeholder-slate-500 tracking-wide"
                    placeholder="Where to explore..."
                  />
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div className="lg:col-span-2">
              <div
                className={`relative flex items-center p-3.5 rounded-2xl bg-white/[0.03] border transition-all ${
                  activeFocus === 'dates'
                    ? 'border-teal-400 ring-2 ring-teal-400/20 bg-white/[0.06]'
                    : 'border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 mr-3">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Travel Dates
                  </label>
                  <input
                    type="text"
                    value={trip.dates}
                    onFocus={() => setActiveFocus('dates')}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => onTripChange({ ...trip, dates: e.target.value })}
                    className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-white focus:outline-none focus:ring-0 placeholder-slate-500"
                    placeholder="e.g. Oct 18 - Oct 22"
                  />
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div className="lg:col-span-2">
              <div
                className={`relative flex items-center p-3.5 rounded-2xl bg-white/[0.03] border transition-all ${
                  activeFocus === 'travelers'
                    ? 'border-teal-400 ring-2 ring-teal-400/20 bg-white/[0.06]'
                    : 'border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 mr-3">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Party Size
                  </label>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={trip.travelers}
                      onFocus={() => setActiveFocus('travelers')}
                      onBlur={() => setActiveFocus(null)}
                      onChange={(e) => onTripChange({ ...trip, travelers: Math.max(1, Number(e.target.value)) })}
                      className="w-14 bg-transparent border-0 p-0 text-sm font-semibold text-white focus:outline-none focus:ring-0"
                    />
                    <span className="text-[11px] text-slate-400 font-medium">
                      {trip.travelers === 1 ? 'Solo' : `${trip.travelers} Guests`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="lg:col-span-2">
              <div
                className={`relative flex items-center p-3.5 rounded-2xl bg-white/[0.03] border transition-all ${
                  activeFocus === 'budget'
                    ? 'border-teal-400 ring-2 ring-teal-400/20 bg-white/[0.06]'
                    : 'border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mr-3">
                  <Wallet className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Target Budget (₹)
                  </label>
                  <input
                    type="number"
                    step="5000"
                    min="10000"
                    value={trip.budget}
                    onFocus={() => setActiveFocus('budget')}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => onTripChange({ ...trip, budget: Math.max(1000, Number(e.target.value)) })}
                    className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-white focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Budget Shortcuts & "Build My Trip" CTA */}
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Budget Quick Selection */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Budget Presets:</span>
              <div className="flex items-center gap-1.5">
                {budgetPresets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => onTripChange({ ...trip, budget: b })}
                    className={`text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      trip.budget === b
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                    }`}
                  >
                    ₹{(b / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onBuildPlan}
              disabled={scanState === 'scanning'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
            >
              {scanState === 'scanning' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Synthesizing Journey...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Build My Trip</span>
                </>
              )}
            </button>
          </div>
        </div>
      </InView>
    </section>
  );
};
