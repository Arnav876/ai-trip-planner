import React, { useEffect, useState } from 'react';
import {
  Plane,
  BedDouble,
  TrainFront,
  MapPin,
  Utensils,
  Wallet,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { TripInputs } from '../data/travelData';
import { TextEffect } from '@/components/motion-primitives/text-effect';

interface AISynthesisOverlayProps {
  isOpen: boolean;
  trip: TripInputs;
  onComplete: () => void;
}

export const AISynthesisOverlay: React.FC<AISynthesisOverlayProps> = ({
  isOpen,
  trip,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Searching flights',
      detail: `Scanning flight corridors from ${trip.from} to ${trip.to}...`,
      icon: Plane,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
    },
    {
      title: 'Comparing hotels',
      detail: `Evaluating boutique stays, guest ratings, and central proximity...`,
      icon: BedDouble,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    {
      title: 'Finding transport',
      detail: 'Calculating rail passes, airport transfers, and private rides...',
      icon: TrainFront,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
    },
    {
      title: 'Discovering places',
      detail: 'Curating architectural landmarks, viewpoints, and neighborhood quarters...',
      icon: MapPin,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
    },
    {
      title: 'Finding food',
      detail: 'Mapping Michelin Bib Gourmand picks and authentic culinary stops...',
      icon: Utensils,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
    },
    {
      title: 'Optimizing budget',
      detail: `Balancing Best vs. Cost curves to respect ₹${trip.budget.toLocaleString('en-IN')} cap...`,
      icon: Wallet,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/30',
    },
    {
      title: 'Building itinerary',
      detail: 'Assembling chronological day-by-day journey matrix...',
      icon: CalendarDays,
      color: 'text-emerald-300',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 350);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const current = steps[currentStep];
  const Icon = current.icon;
  const progressPercent = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050811]/90 backdrop-blur-2xl animate-fade-in">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative w-full max-w-xl rounded-3xl bg-[#0d1424] border border-white/10 p-8 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">AI Autonomous Synthesis</h3>
              <p className="text-xs text-slate-400">Engineering personalized route for {trip.to}</p>
            </div>
          </div>
          <div className="text-right font-mono">
            <span className="text-sm font-extrabold text-teal-400">{progressPercent}%</span>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Constructing</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-white/[0.06] mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 transition-all duration-300 ease-out shadow-lg shadow-teal-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Active Stage Callout */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6 flex items-start gap-4 transition-all">
          <div className={`p-3 rounded-xl ${current.bg} ${current.border} border ${current.color} shadow-sm shrink-0`}>
            <Icon className="w-6 h-6 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400">
                Phase {currentStep + 1} of 7
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-300 font-semibold">{current.title}</span>
            </div>
            <p className="text-sm text-slate-300 font-medium leading-snug">
              {current.detail}
            </p>
          </div>
        </div>

        {/* 7 Step Pipeline Progression List */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step.title}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                  isCurrent
                    ? 'bg-teal-500/10 border border-teal-500/30 text-teal-200'
                    : isDone
                    ? 'text-slate-400 opacity-80'
                    : 'text-slate-600 opacity-40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isCurrent
                        ? 'bg-teal-500/30 text-teal-300 animate-pulse'
                        : 'bg-white/[0.04] text-slate-600'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <StepIcon className="w-3 h-3" />}
                  </div>
                  <span className={`font-medium ${isCurrent ? 'text-white font-semibold' : ''}`}>
                    {step.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  {isDone ? 'Completed' : isCurrent ? 'Processing...' : 'Queued'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
          <p className="text-[11px] text-slate-500">
            Synthesizing multi-modal travel graph across 5 dimensions...
          </p>
        </div>
      </div>
    </div>
  );
};
