import React, { useMemo, useState } from 'react';
import {
  Rank,
  Category,
  Profile,
  FamilyMember,
  TripInputs,
  rankOrder,
  recomputePlan,
  preferredOption,
  currency,
  optionBank,
} from './data/travelData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlannerBar } from './components/PlannerBar';
import { AISynthesisOverlay } from './components/AISynthesisOverlay';
import { JourneySummary } from './components/JourneySummary';
import { JourneyStack } from './components/JourneyStack';
import { PlacesCarousel } from './components/PlacesCarousel';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { BudgetArchitecture } from './components/BudgetArchitecture';
import { TravelerModal } from './components/TravelerModal';
import { Compass, Sparkles, Heart } from 'lucide-react';

export function App() {
  // 1. Profile & Authentication State (Preserved)
  const [profile, setProfile] = useState<Profile>({
    name: 'Arnav Yadav',
    phone: '+91 98765 43210',
    email: 'arnav@example.com',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // 2. Family Members State (Preserved)
  const [family, setFamily] = useState<FamilyMember[]>([
    { id: 1, name: 'Meera Yadav', age: '34', relation: 'Spouse' },
    { id: 2, name: 'Avi Yadav', age: '8', relation: 'Child' },
  ]);
  const [newMember, setNewMember] = useState({ name: '', age: '', relation: '' });

  // 3. Trip Inputs State (Preserved)
  const [trip, setTrip] = useState<TripInputs>({
    from: 'Delhi',
    to: 'Singapore',
    dates: 'Oct 18 - Oct 22',
    travelers: 3,
    budget: 90000,
  });

  // 4. Selected Category Ranks (Preserved)
  const [selectedRanks, setSelectedRanks] = useState<Record<Category, Rank>>({
    flights: 'Best',
    hotels: 'Best',
    conveyance: 'Best',
    places: 'Best',
    food: 'Best',
  });

  // 5. Global Strategy Track (Optional convenience for the user)
  const [activeGlobalRank, setActiveGlobalRank] = useState<Rank>('Best');

  // 6. AI Scan / Synthesis State (Preserved and enhanced)
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'ready'>('ready');

  // 7. Modal Visibility State
  const [isTravelerModalOpen, setIsTravelerModalOpen] = useState(false);

  // Business Logic: Dynamic Budget Rebalance (Preserved exact calculation!)
  const plan = useMemo(
    () => recomputePlan(selectedRanks, trip.budget),
    [selectedRanks, trip.budget]
  );
  const totalCost = plan.reduce((sum, option) => sum + option.price, 0);
  const remainingBudget = trip.budget - totalCost;

  // Actions
  const runScan = () => {
    setScanState('scanning');
  };

  const handleScanComplete = () => {
    setScanState('ready');
    const journeyEl = document.getElementById('journey-stack');
    if (journeyEl) {
      journeyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRank = (category: Category, rank: Rank) => {
    setSelectedRanks((prev) => ({
      ...prev,
      [category]: rank,
    }));
  };

  const handleSetAllRanks = (rank: Rank) => {
    setActiveGlobalRank(rank);
    setSelectedRanks({
      flights: rank,
      hotels: rank,
      conveyance: rank,
      places: rank,
      food: rank,
    });
  };

  const handleAddFamilyMember = () => {
    if (!newMember.name.trim()) return;
    setFamily((members) => [
      ...members,
      {
        id: Date.now(),
        name: newMember.name.trim(),
        age: newMember.age,
        relation: newMember.relation,
      },
    ]);
    setNewMember({ name: '', age: '', relation: '' });
  };

  const handleSelectDestination = (destName: string, recommendedBudget: number) => {
    setTrip((prev) => ({
      ...prev,
      to: destName,
      budget: recommendedBudget,
    }));
    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPlanner = () => {
    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f5f9] selection:bg-teal-500/30 selection:text-teal-200">
      {/* 1. Minimal Luxury Navigation Bar */}
      <Navbar
        profile={profile}
        family={family}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn((v) => !v)}
        onOpenTravelerModal={() => setIsTravelerModalOpen(true)}
        onPlanTripClick={scrollToPlanner}
      />

      <main>
        {/* 2. Cinematic Hero Section with TextEffect, AnimatedBackground, AnimatedGroup, and InfiniteSlider */}
        <HeroSection
          onPlanTripClick={scrollToPlanner}
          onSelectDestination={handleSelectDestination}
        />

        {/* 3. AI Command Planner Bar */}
        <PlannerBar
          trip={trip}
          onTripChange={setTrip}
          onBuildPlan={runScan}
          scanState={scanState}
          profile={profile}
          family={family}
        />

        {/* 4. Journey Overview & 5 Core Metrics */}
        <JourneySummary
          trip={trip}
          totalCost={totalCost}
          remainingBudget={remainingBudget}
          onSetAllRanks={handleSetAllRanks}
          activeGlobalRank={activeGlobalRank}
        />

        {/* 5. The Journey Stack: 5 Structured Vertical Categories with TransitionPanel, BorderTrail & Disclosure */}
        <JourneyStack
          plan={plan}
          selectedRanks={selectedRanks}
          onSelectRank={handleSelectRank}
        />

        {/* 6. Curated Places to Visit Carousel with Cursor desktop follower */}
        <PlacesCarousel />

        {/* 7. Adaptive Itinerary Timeline with InView reveals */}
        <ItineraryTimeline plan={plan} trip={trip} />

        {/* 8. Budget Architecture & Proportional Cost Breakdown */}
        <BudgetArchitecture plan={plan} trip={trip} />
      </main>

      {/* 9. AI Synthesis Loading Experience Overlay */}
      <AISynthesisOverlay
        isOpen={scanState === 'scanning'}
        trip={trip}
        onComplete={handleScanComplete}
      />

      {/* 10. Traveler Concierge Pass Modal (Using Motion Primitive Dialog) */}
      <TravelerModal
        isOpen={isTravelerModalOpen}
        onOpenChange={setIsTravelerModalOpen}
        profile={profile}
        onProfileChange={setProfile}
        family={family}
        onAddFamilyMember={handleAddFamilyMember}
        newMember={newMember}
        onNewMemberChange={setNewMember}
        partySize={trip.travelers}
      />

      {/* Luxury Footer */}
      <footer className="border-t border-white/[0.07] bg-[#05070c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white">AURA JOURNEYS AI</span>
              <p className="text-[11px] text-slate-500">Autonomous Concierge & Multi-Modal Routing</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center sm:text-right">
            Crafted with Motion Primitives for high-fidelity travel orchestration.
          </p>
        </div>
      </footer>
    </div>
  );
}
