import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator,
} from '@/components/motion-primitives/carousel';
import { Cursor } from '@/components/motion-primitives/cursor';
import { InView } from '@/components/motion-primitives/in-view';
import { experienceShowcase } from '../data/travelData';
import { Star, Clock, Compass, Sparkles } from 'lucide-react';

export const PlacesCarousel: React.FC = () => {
  return (
    <section id="experiences" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <InView
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewOptions={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                Curated Moments & Landmarks
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">Cinematic Destination Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Places & Cultural Highlights
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Hand-vetted landmarks and sensory experiences designed to balance active exploration with slow immersive moments.
          </p>
        </div>

        {/* Carousel Container with Interactive Desktop Cursor */}
        <div className="relative group/carousel">
          {/* Subtle cursor follower for desktop interaction with attachToParent */}
          <Cursor
            attachToParent={true}
            variants={{
              initial: { scale: 0.4, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.4, opacity: 0 },
            }}
            springConfig={{ damping: 22, stiffness: 280 }}
          >
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-xl shadow-teal-500/30 backdrop-blur-sm pointer-events-none select-none">
              <Sparkles className="w-3 h-3" />
              <span>Drag to Explore</span>
            </div>
          </Cursor>

          {/* Carousel Compound Component */}
          <Carousel className="w-full">
            <div className="flex justify-end mb-4">
              <div className="relative w-28 h-10">
                <CarouselNavigation
                  alwaysShow={true}
                  className="left-0 w-full"
                  classNameButton="bg-white/10 hover:bg-white/20 text-white border border-white/15"
                />
              </div>
            </div>

            <CarouselContent className="-ml-5">
              {experienceShowcase.map((exp) => (
                <CarouselItem
                  key={exp.id}
                  className="pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="group h-full flex flex-col rounded-3xl bg-[#0e1424] border border-white/[0.08] hover:border-teal-500/35 overflow-hidden transition-all duration-300 shadow-xl hover:shadow-teal-950/20">
                    {/* Image Area */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1424] via-transparent to-black/30 pointer-events-none" />

                      {/* Tag & Score */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 backdrop-blur-md">
                          {exp.tag}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{exp.score}</span>
                      </div>

                      {/* Bottom Image Metadata */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <span className="font-semibold text-slate-300 bg-black/40 px-2.5 py-0.5 rounded-lg backdrop-blur-sm">
                          {exp.category}
                        </span>
                        <span className="font-mono text-teal-300 font-bold bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/20 backdrop-blur-sm">
                          {exp.cost}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2">
                          <Clock className="w-3.5 h-3.5 text-sky-400" />
                          <span>{exp.time}</span>
                        </div>

                        <h4 className="text-lg font-bold font-display text-white mb-2 group-hover:text-teal-300 transition-colors">
                          {exp.title}
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {exp.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="text-slate-400">Included in routing graph</span>
                        <span className="text-teal-400 font-semibold flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5" />
                          <span>Curated</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselIndicator className="mt-6" classNameButton="bg-white/20 active:bg-teal-400" />
          </Carousel>
        </div>
      </InView>
    </section>
  );
};
