import React from 'react';
import {
  Users,
  User,
  Phone,
  Mail,
  Plus,
  Trash2,
  CheckCircle2,
  Shield,
  Sparkles,
} from 'lucide-react';
import { Profile, FamilyMember } from '../data/travelData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/motion-primitives/dialog';

interface TravelerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Profile;
  onProfileChange: (newProfile: Profile) => void;
  family: FamilyMember[];
  onAddFamilyMember: () => void;
  newMember: { name: string; age: string; relation: string };
  onNewMemberChange: (member: { name: string; age: string; relation: string }) => void;
  partySize: number;
}

export const TravelerModal: React.FC<TravelerModalProps> = ({
  isOpen,
  onOpenChange,
  profile,
  onProfileChange,
  family,
  onAddFamilyMember,
  newMember,
  onNewMemberChange,
  partySize,
}) => {
  const activeFamily = family.slice(0, Math.max(0, partySize - 1));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0c1220] border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl backdrop-blur-2xl">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
              Concierge Pass Management
            </span>
          </div>
          <DialogTitle className="text-2xl font-display font-bold text-white">
            Traveler Profiles & Family Roster
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Stored passenger records are automatically linked to your flights, room suites, and bookings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          {/* Section 1: Primary Traveler */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Primary Account Traveler</h4>
                  <p className="text-[11px] text-slate-400">Lead passenger on all reservation manifests</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Full Name
                </label>
                <div className="flex items-center px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus-within:border-teal-400 transition-colors">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
                    className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-white focus:outline-none"
                    placeholder="Full name..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus-within:border-teal-400 transition-colors">
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => onProfileChange({ ...profile, phone: e.target.value })}
                    className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-white focus:outline-none"
                    placeholder="Phone..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="flex items-center px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus-within:border-teal-400 transition-colors">
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => onProfileChange({ ...profile, email: e.target.value })}
                    className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-white focus:outline-none"
                    placeholder="Email..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Linked Family Members */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Family & Co-Travelers Roster</h4>
                  <p className="text-[11px] text-slate-400">
                    {family.length} Registered Companions ({activeFamily.length} currently assigned to this trip)
                  </p>
                </div>
              </div>
            </div>

            {/* List of family members */}
            <div className="space-y-2 mb-4">
              {family.map((member, index) => {
                const isAssigned = index < partySize - 1;
                return (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                      isAssigned
                        ? 'bg-teal-500/10 border-teal-500/30 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] ${
                          isAssigned
                            ? 'bg-teal-500/20 text-teal-300'
                            : 'bg-white/[0.06] text-slate-400'
                        }`}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <strong className="block text-white font-semibold">{member.name}</strong>
                        <span className="text-[11px] text-slate-400">
                          {member.relation || 'Traveler'} · Age {member.age || 'N/A'}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isAssigned
                          ? 'bg-teal-500/20 text-teal-300'
                          : 'bg-white/[0.04] text-slate-500'
                      }`}
                    >
                      {isAssigned ? 'Assigned to Trip' : 'In Roster'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Add new member form */}
            <div className="pt-3 border-t border-white/[0.06]">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Add New Family Member
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newMember.name}
                  onChange={(e) => onNewMemberChange({ ...newMember, name: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-teal-400"
                />
                <input
                  type="text"
                  placeholder="Age (e.g. 32)"
                  value={newMember.age}
                  onChange={(e) => onNewMemberChange({ ...newMember, age: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-teal-400"
                />
                <input
                  type="text"
                  placeholder="Relation (e.g. Spouse)"
                  value={newMember.relation}
                  onChange={(e) => onNewMemberChange({ ...newMember, relation: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-teal-400"
                />
                <button
                  type="button"
                  onClick={onAddFamilyMember}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <DialogClose className="text-slate-400 hover:text-white" />
      </DialogContent>
    </Dialog>
  );
};
