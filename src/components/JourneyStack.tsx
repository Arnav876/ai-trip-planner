import React from 'react';
import {
  Plane,
  BedDouble,
  TrainFront,
  MapPin,
  Utensils,
  Star,
  ExternalLink,
  ChevronDown,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  Category,
  Rank,
  rankOrder,
  categoryMeta,
  optionBank,
  currency,
  Option,
} from '../data/travelData';
import { TransitionPanel } from '@/components/motion-primitives/transition-panel';
import { AnimatedBackground } from '@/components/motion-primitives/animated-background';
import { BorderTrail } from '@/components/motion-primitives/border-trail';
import { Disclosure, DisclosureTrigger, DisclosureContent } from '@/components/motion-primitives/disclosure';
import { InView } from '@/components/motion-primitives/in-view';

interface JourneyStackProps {
  plan: Option[];
  selectedRanks: Record<Category, Rank>;
  onSelectRank: (category: Category, rank: Rank) => void;
}

const categoryIcons: Record<Category, React.ReactNode> = {
  flights: <Plane className="w-5 h-5" />,
  hotels: <BedDouble className="w-5 h-5" />,
  conveyance: <TrainFront className="w-5 h-5" />,
  places: <MapPin className="w-5 h-5" />,
  food: <Utensils className="w-5 h-5" />,
};

const categoryStepNumber: Record<Category, string> = {
  flights: '01',
  hotels: '02',
  conveyance: '03',
  places: '04',
  food: '05',
};

const bookingButtonLabels: Record<Category, string> = {
  flights: 'Book Flight',
  hotels: 'Reserve Hotel',
  conveyance: 'Book Transit Pass',
  places: 'Reserve Experiences',
  food: 'Reserve Dining Table',
};

export const JourneyStack: React.FC<JourneyStackProps> = ({
  plan,
  selectedRanks,
  onSelectRank,
}) => {
  const categories = Object.keys(categoryMeta) as Category[];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              Dimensional Routing Stack
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Sequential Journey Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            The Journey Stack
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-sm">
          Select between Best, Cheapest, and Most Comfortable. Watch the rest of your trip dynamically balance cost and convenience.
        </p>
      </div>

      {/* Structured Vertical Flow */}
      <div className="space-y-8">
        {categories.map((category, catIdx) => {
          const activeRank = selectedRanks[category];
          const activeIndex = rankOrder.indexOf(activeRank);
          const currentComputedOption = plan[catIdx];
          const isHighlighted = activeRank === 'Best' || activeRank === 'Most comfortable';

          return (
            <InView
              key={category}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: catIdx * 0.08, ease: 'easeOut' }}
              viewOptions={{ once: true, margin: '-40px' }}
            >
              <div
                className={`relative rounded-3xl bg-[#0e1424]/90 border transition-all duration-300 shadow-xl overflow-hidden ${
                  activeRank === 'Best'
                    ? 'border-teal-500/40 shadow-teal-950/20'
                    : activeRank === 'Most comfortable'
                    ? 'border-amber-500/40 shadow-amber-950/20'
                    : 'border-white/[0.09]'
                }`}
              >
                {/* BorderTrail on selected/highlighted recommendation cards */}
                {isHighlighted && (
                  <BorderTrail
                    size={100}
                    className={
                      activeRank === 'Best'
                        ? 'bg-gradient-to-l from-teal-400 via-emerald-400 to-transparent'
                        : 'bg-gradient-to-l from-amber-400 via-orange-400 to-transparent'
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: 'linear',
                    }}
                  />
                )}

                {/* Card Header Bar */}
                <div className="p-6 sm:p-7 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.01]">
                  <div className="flex items-center gap-4">
                    {/* Step badge */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-teal-300">
                      {categoryIcons[category]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-400">
                          STAGE {categoryStepNumber[category]}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">{categoryMeta[category].shortDesc}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                        {categoryMeta[category].label}
                      </h3>
                    </div>
                  </div>

                  {/* Elegant Rank Selector (Best / Cheapest / Most comfortable) with AnimatedBackground */}
                  <div className="flex items-center p-1 rounded-2xl bg-white/[0.04] border border-white/[0.09] self-start md:self-auto">
                    <AnimatedBackground
                      defaultValue={activeRank}
                      className="rounded-xl bg-teal-500/20 border border-teal-500/40 shadow-sm"
                      transition={{
                        type: 'spring',
                        bounce: 0.15,
                        duration: 0.35,
                      }}
                      onValueChange={(id) => {
                        if (id) onSelectRank(category, id as Rank);
                      }}
                    >
                      {rankOrder.map((rank) => (
                        <button
                          key={rank}
                          data-id={rank}
                          type="button"
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                            activeRank === rank ? 'text-teal-200' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {rank}
                        </button>
                      ))}
                    </AnimatedBackground>
                  </div>
                </div>

                {/* TransitionPanel for smooth animated morphing between Best, Cheapest, and Most Comfortable */}
                <TransitionPanel
                  activeIndex={activeIndex}
                  variants={{
                    enter: { opacity: 0, y: 12, filter: 'blur(3px)' },
                    center: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    exit: { opacity: 0, y: -12, filter: 'blur(3px)' },
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="p-6 sm:p-7"
                >
                  {rankOrder.map((rank) => {
                    const opt = optionBank[category].find((o) => o.rank === rank)!;
                    const isCurrentActive = opt.id === currentComputedOption.id;

                    return (
                      <div key={rank} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Left: Thumbnail & Visual Preview */}
                        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-video sm:aspect-[16/10] bg-slate-900 border border-white/10 group">
                          {opt.image ? (
                            <img
                              src={opt.image}
                              alt={opt.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-teal-950/20 text-teal-400">
                              {categoryIcons[category]}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-transparent to-black/30 pointer-events-none" />

                          {/* Image Overlays */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{opt.score}/100</span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                            <span className="font-mono text-slate-300 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                              {opt.provider}
                            </span>
                            <span className="font-semibold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 backdrop-blur-sm">
                              {opt.duration}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Rich Recommendation Details */}
                        <div className="lg:col-span-5 space-y-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                                opt.rank === 'Best'
                                  ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                                  : opt.rank === 'Most comfortable'
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                  : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                              }`}
                            >
                              {opt.rank} Choice
                            </span>
                            {isCurrentActive && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-teal-400 font-semibold">
                                <Check className="w-3 h-3" /> Auto-Balanced Selection
                              </span>
                            )}
                          </div>

                          <h4 className="text-xl sm:text-2xl font-bold font-display text-white">
                            {opt.title}
                          </h4>

                          <p className="text-sm text-slate-300 leading-relaxed font-normal">
                            {opt.detail}
                          </p>

                          {/* Tags */}
                          {opt.tags && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {opt.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Disclosure for deeper details */}
                          <Disclosure className="pt-2">
                            <DisclosureTrigger className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 cursor-pointer transition-colors">
                              <span>View concierge specifications & perks</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </DisclosureTrigger>
                            <DisclosureContent className="mt-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 space-y-1.5">
                              {opt.highlights &&
                                opt.highlights.map((h, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-teal-400 shrink-0" />
                                    <span>{h}</span>
                                  </div>
                                ))}
                              {opt.departureTime && (
                                <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-slate-400">
                                  <Clock className="w-3 h-3 text-sky-400 shrink-0" />
                                  <span>Flight Window: {opt.departureTime}</span>
                                </div>
                              )}
                            </DisclosureContent>
                          </Disclosure>
                        </div>

                        {/* Right: Price & Booking Action */}
                        <div className="lg:col-span-3 flex flex-col justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] lg:h-full gap-4">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                              Estimated Fare
                            </span>
                            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                              {currency(opt.price)}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              All taxes and carrier surcharges included
                            </p>
                          </div>

                          {/* Direct External Booking Button - Preserves existing link! */}
                          <a
                            href={opt.bookingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 transition-all cursor-pointer"
                          >
                            <span>{bookingButtonLabels[category]}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </TransitionPanel>
              </div>
            </InView>
          );
        })}
      </div>
    </section>
  );
};
