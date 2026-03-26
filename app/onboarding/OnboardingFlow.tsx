"use client";

import { useState } from "react";
import { GraduationCap, Users } from "lucide-react";
import { OnboardingForm } from "./OnboardingForm";
import { MentorOnboardingForm } from "./MentorOnboardingForm";

type Role = "mentor" | "mentee" | null;

export function OnboardingFlow() {
  const [role, setRole] = useState<Role>(null);

  if (role === null) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_32px_80px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-semibold text-[#1B3A2D]">
          How would you like to use MedPath?
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Choose your role to get started.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setRole("mentee")}
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-6 text-left transition-all hover:border-[#2BB5A0] hover:bg-[#F0FDF9] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F4F1]">
              <Users className="h-6 w-6 text-[#2BB5A0]" />
            </div>
            <div>
              <p className="font-semibold text-[#1B3A2D]">Mentee</p>
              <p className="mt-0.5 text-sm text-slate-600">
                I&apos;m a student looking for guidance from seniors
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole("mentor")}
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-6 text-left transition-all hover:border-[#2BB5A0] hover:bg-[#F0FDF9] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F4F1]">
              <GraduationCap className="h-6 w-6 text-[#2BB5A0]" />
            </div>
            <div>
              <p className="font-semibold text-[#1B3A2D]">Mentor</p>
              <p className="mt-0.5 text-sm text-slate-600">
                I&apos;m a senior who wants to guide juniors
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (role === "mentor") {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_32px_80px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => setRole(null)}
          className="mb-4 text-sm font-medium text-slate-600 hover:text-[#1B3A2D]"
        >
          ← Change role
        </button>
        <h1 className="text-2xl font-semibold text-[#1B3A2D]">
          Complete your mentor profile
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Share your education and availability so juniors can find you.
        </p>
        <MentorOnboardingForm />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_32px_80px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        onClick={() => setRole(null)}
        className="mb-4 text-sm font-medium text-slate-600 hover:text-[#1B3A2D]"
      >
        ← Change role
      </button>
      <h1 className="text-2xl font-semibold text-[#1B3A2D]">
        Complete your profile
      </h1>
      <p className="mt-1 text-base text-slate-600">
        Just your name, college, and course. Takes less than a minute.
      </p>
      <OnboardingForm />
    </div>
  );
}
