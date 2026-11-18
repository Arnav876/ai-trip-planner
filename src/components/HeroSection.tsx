import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, PlaneTakeoff, Compass } from 'lucide-react';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import { AnimatedBackground } from '@/components/motion-primitives/animated-background';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { featuredDestinations } from '../data/travelData';

interface HeroSectionProps {
  onPlanTripClick: () => void;
  onSelectDestination: (destName: string, budget: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPlanTripClick,
  onSelectDestination,
}) => {
  const [activeTheme, setActiveTheme] = useState('autonomous');

  const themes = [
    { id: 'autonomous', label: 'Autonomous AI Mode', icon: Zap },
    { id: 'curated', label: 'Signature Curated', icon: Sparkles },
    { id: 'luxury', label: 'Boutique Concierge', icon: Compass },
  ];

  return (
    <section className="relative pt-12 pb-16 lg:pt-18 lg:pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-teal-500/15 via-emerald-600/10 to-sky-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span className="text-xs font-bold tracking-widest uppercase">
            Next-Gen Autonomous Travel Architecture
          </span>
        </div>

        {/* Hero Title with TextEffect */}
        <div className="max-w-4xl mx-auto mb-6">
          <TextEffect
            as="h1"
            per="word"
            preset="fade-in-blur"
            speedReveal={1.2}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]"
          >
            Give us a few details. We'll plan the journey.
          </TextEffect>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
          Precision-engineered flight corridors, handpicked boutique lodgings, intelligent urban transit, and Michelin-worthy gastronomy — synthesized instantaneously into one cohesive itinerary.
        </p>

        {/* AnimatedBackground Theme Mode Selector */}
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.09] mb-10 backdrop-blur-md">
          <AnimatedBackground
            defaultValue={activeTheme}
            className="rounded-xl bg-teal-500/20 border border-teal-500/40 shadow-sm"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.4,
            }}
            onValueChange={(id) => id && setActiveTheme(id)}
          >
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  data-id={theme.id}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                    activeTheme === theme.id ? 'text-teal-200' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{theme.label}</span>
                </button>
              );
            })}
          </AnimatedBackground>
        </div>

        {/* Primary CTA button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onPlanTripClick}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Plan My Trip</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href="#journey-stack"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white font-medium text-sm transition-all"
          >
            <PlaneTakeoff className="w-4 h-4 text-teal-400" />
            <span>Explore Current Plan</span>
          </a>
        </div>

        {/* AnimatedGroup Hero Telemetry Badges */}
        <AnimatedGroup
          preset="blur-slide"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 text-left"
        >
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-teal-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Dual Optimization</span>
            </div>
            <div className="text-xl font-bold font-display text-white">Dynamic Balance</div>
            <p className="text-xs text-slate-400 mt-0.5">Budget pressure adaptive logic</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Bookable Portals</span>
            </div>
            <div className="text-xl font-bold font-display text-white">100% Real Time</div>
            <p className="text-xs text-slate-400 mt-0.5">Skyscanner, Booking, Klook</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sky-400 mb-1">
              <Globe className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Multi-Modal</span>
            </div>
            <div className="text-xl font-bold font-display text-white">5 Dimensions</div>
            <p className="text-xs text-slate-400 mt-0.5">Flights, Stays, Transit, Sights, Food</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Tri-Tier Spectrum</span>
            </div>
            <div className="text-xl font-bold font-display text-white">Best · Cheap · Comfort</div>
            <p className="text-xs text-slate-400 mt-0.5">Instant morphing comparison</p>
          </div>
        </AnimatedGroup>

        {/* Live Inspiration InfiniteSlider */}
        <div className="relative pt-4 pb-2 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span>Trending Concierge Destinations</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Click to autofill route</span>
          </div>

          <InfiniteSlider gap={16} speed={38} className="py-2">
            {featuredDestinations.map((dest) => (
              <button
                key={dest.name}
                onClick={() => onSelectDestination(dest.name, dest.recommendedBudget)}
                type="button"
                className="group flex items-center gap-3.5 p-2 pr-4 rounded-2xl bg-[#0f172a]/70 hover:bg-[#1e293b]/90 border border-white/[0.08] hover:border-teal-500/40 text-left transition-all cursor-pointer shadow-md hover:shadow-teal-900/30"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition-transform"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      {dest.airport}
                    </span>
                    <span className="text-xs font-semibold text-white group-hover:text-teal-300 transition-colors">
                      {dest.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                    <span>{dest.flightTime}</span>
                    <span>•</span>
                    <span className="text-teal-400/90 font-mono font-medium">₹{dest.recommendedBudget.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </button>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
};
