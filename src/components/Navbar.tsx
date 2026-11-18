import React from 'react';
import { Compass, Sparkles, User, Users, Check, LogIn, ChevronRight } from 'lucide-react';
import { Profile, FamilyMember } from '../data/travelData';

interface NavbarProps {
  profile: Profile;
  family: FamilyMember[];
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onOpenTravelerModal: () => void;
  onPlanTripClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  family,
  isLoggedIn,
  onToggleLogin,
  onOpenTravelerModal,
  onPlanTripClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07090e]/80 border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 via-emerald-500/10 to-teal-900/40 border border-teal-500/30 text-teal-400 shadow-lg shadow-teal-950/50">
            <Compass className="w-5 h-5 animate-pulse" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-400 ring-4 ring-[#07090e]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg tracking-wider text-white">AURA</span>
              <span className="text-xs font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/30 text-teal-300">
                VOYAGE AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide font-medium hidden sm:block">
              Autonomous Journey Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-slate-300">
          <a
            href="#planner"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Planner
          </a>
          <a
            href="#journey-stack"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Journey Stack
          </a>
          <a
            href="#experiences"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Experiences
          </a>
          <a
            href="#itinerary"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Itinerary
          </a>
          <a
            href="#budget"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Budget Matrix
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Profile & Family Modal Trigger */}
          <button
            onClick={onOpenTravelerModal}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] hover:border-teal-500/30 text-xs font-medium text-slate-200 transition-all cursor-pointer"
            title="Manage profile and family members"
          >
            <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-[11px]">
              {profile.name.charAt(0)}
            </div>
            <div className="text-left hidden lg:block">
              <p className="font-semibold text-white leading-tight">{profile.name}</p>
              <p className="text-[10px] text-slate-400">+{family.length} Family Members</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Login Pill */}
          <button
            onClick={onToggleLogin}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              isLoggedIn
                ? 'bg-teal-500/10 text-teal-300 border-teal-500/30 hover:bg-teal-500/20'
                : 'bg-slate-800/60 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isLoggedIn ? <Check className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
            <span>{isLoggedIn ? 'Verified' : 'Log In'}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onPlanTripClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-semibold text-xs tracking-wide shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan My Trip</span>
          </button>
        </div>
      </div>
    </header>
  );
};
