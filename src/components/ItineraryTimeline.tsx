import React from 'react';
import {
  Plane,
  BedDouble,
  TrainFront,
  MapPin,
  Utensils,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Option, TripInputs } from '../data/travelData';
import { InView } from '@/components/motion-primitives/in-view';

interface ItineraryTimelineProps {
  plan: Option[];
  trip: TripInputs;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ plan, trip }) => {
  const flight = plan[0];
  const hotel = plan[1];
  const ride = plan[2];
  const places = plan[3];
  const food = plan[4];

  const days = [
    {
      day: 'DAY 01',
      title: 'Arrival & Spatial Orientation',
      date: 'First Leg',
      activities: [
        {
          time: 'Morning',
          label: 'Inbound Flight Arrival',
          desc: `Touchdown and smooth baggage collection from ${trip.from}.`,
          icon: Plane,
          accent: 'text-sky-400',
        },
        {
          time: '12:30 PM',
          label: 'Airport Transfer & Urban Transit',
          desc: `Transfer to city center utilizing ${ride.title.toLowerCase()} via ${ride.provider}.`,
          icon: TrainFront,
          accent: 'text-emerald-400',
        },
        {
          time: '02:00 PM',
          label: 'Residence Check-In',
          desc: `Unpack and refresh at ${hotel.title.toLowerCase()} (${hotel.provider}).`,
          icon: BedDouble,
          accent: 'text-amber-400',
        },
        {
          time: '07:30 PM',
          label: 'Welcome Culinary Experience',
          desc: `Initial dining course following ${food.title.toLowerCase()}.`,
          icon: Utensils,
          accent: 'text-orange-400',
        },
      ],
    },
    {
      day: 'DAY 02',
      title: 'Landmarks & Signature Circuit',
      date: 'Full Immersion',
      activities: [
        {
          time: '09:30 AM',
          label: 'Curated Milestone Expedition',
          desc: `Experience ${places.title.toLowerCase()} curated via ${places.provider}.`,
          icon: MapPin,
          accent: 'text-violet-400',
        },
        {
          time: '01:00 PM',
          label: 'Midday Gastronomy Stop',
          desc: `Lunch stop featuring authentic regional specialties.`,
          icon: Utensils,
          accent: 'text-orange-400',
        },
        {
          time: '04:30 PM',
          label: 'Neighborhood Discovery Loop',
          desc: `Wander through heritage conservation districts and artisan alleys.`,
          icon: MapPin,
          accent: 'text-teal-400',
        },
        {
          time: '08:00 PM',
          label: 'Signature Evening Dinner',
          desc: `Fine culinary exploration as scheduled in ${food.title.toLowerCase()}.`,
          icon: Utensils,
          accent: 'text-amber-400',
        },
      ],
    },
    {
      day: 'DAY 03',
      title: 'Cultural Quarters & Sensory Exploration',
      date: 'Deep Dive',
      activities: [
        {
          time: '10:00 AM',
          label: 'Artisan Markets & Galleries',
          desc: `Immerse in contemporary art installations and cultural archives.`,
          icon: MapPin,
          accent: 'text-teal-400',
        },
        {
          time: '02:30 PM',
          label: 'Panoramic High Point',
          desc: `Visit elevated observation point for sweeping skyline photography.`,
          icon: Sparkles,
          accent: 'text-sky-400',
        },
        {
          time: '08:30 PM',
          label: 'Twilight Street Food & Night Scene',
          desc: `Late evening food walk exploring hawker centers and vibrant night markets.`,
          icon: Utensils,
          accent: 'text-orange-400',
        },
      ],
    },
    {
      day: 'DAY 04',
      title: 'Leisurely Farewell & Departure',
      date: 'Homeward Bound',
      activities: [
        {
          time: '10:00 AM',
          label: 'Botanical Stroll & Last Tastes',
          desc: `Relaxed breakfast and final souvenir hunting near ${hotel.title.toLowerCase()}.`,
          icon: BedDouble,
          accent: 'text-amber-400',
        },
        {
          time: '01:30 PM',
          label: 'Departure Transit',
          desc: `Direct transfer back to international airport via ${ride.title.toLowerCase()}.`,
          icon: TrainFront,
          accent: 'text-emerald-400',
        },
        {
          time: '04:00 PM',
          label: 'Homeward Journey Flight',
          desc: `Board ${flight.title.toLowerCase()} returning with unforgettable memories.`,
          icon: Plane,
          accent: 'text-sky-400',
        },
      ],
    },
  ];

  return (
    <section id="itinerary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <InView
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewOptions={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                Chronological Narrative
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">Day-by-Day Journey Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Adaptive Itinerary Timeline
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Dynamically synthesized around your selected flights, accommodation, and conveyance choices.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {days.map((item, dIdx) => (
            <InView
              key={item.day}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: dIdx * 0.1, ease: 'easeOut' }}
              viewOptions={{ once: true }}
            >
              <div className="h-full flex flex-col rounded-3xl bg-[#0e1424] border border-white/[0.08] hover:border-teal-500/30 p-6 shadow-xl transition-all relative overflow-hidden group">
                {/* Top Day Header */}
                <div className="pb-4 mb-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-teal-400 block">
                      {item.day}
                    </span>
                    <h3 className="text-base font-bold font-display text-white mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400 font-medium">
                    {item.date}
                  </span>
                </div>

                {/* Activities List */}
                <div className="space-y-4 flex-1">
                  {item.activities.map((act, actIdx) => {
                    const ActIcon = act.icon;
                    return (
                      <div key={actIdx} className="flex items-start gap-3 relative">
                        {/* Bullet with icon */}
                        <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] shrink-0 mt-0.5">
                          <ActIcon className={`w-3.5 h-3.5 ${act.accent}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mb-0.5">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{act.time}</span>
                          </div>
                          <p className="text-xs font-semibold text-white leading-snug">
                            {act.label}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-normal">
                            {act.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                  <span>Day Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Synchronized</span>
                  </span>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </InView>
    </section>
  );
};
