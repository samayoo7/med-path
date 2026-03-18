"use client";

import { useState } from "react";
import { upsertMenteeProfile } from "./actions";
import { COURSES } from "@/lib/validations/profile";
import { Select } from "@/app/components/Select";
import { CollegeSearchInput } from "@/app/components/CollegeSearchInput";

export function OnboardingForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);

    const result = await upsertMenteeProfile(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-6 space-y-5">
      <div>
        <label
          htmlFor="display_name"
          className="block text-xs font-medium text-slate-700"
        >
          Display name <span className="text-red-500">*</span>
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          required
          placeholder="How seniors will see you"
          disabled={loading}
          maxLength={50}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1B3A2D] placeholder:text-slate-400 focus:border-[#2BB5A0] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/20 disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="college_id"
          className="block text-xs font-medium text-slate-700"
        >
          College <span className="text-red-500">*</span>
        </label>
        <div className="mt-1.5">
          <CollegeSearchInput
            id="college_id"
            name="college_id"
            placeholder="Search your college (min 3 characters)"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="course"
          className="block text-xs font-medium text-slate-700"
        >
          Course <span className="text-red-500">*</span>
        </label>
        <div className="mt-1.5">
          <Select
            id="course"
            name="course"
            options={COURSES.map((c) => ({ value: c.value, label: c.value }))}
            placeholder="Select your course"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-xs font-medium text-slate-700"
        >
          Bio <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          placeholder="A short intro for seniors (e.g. interests, goals)"
          disabled={loading}
          maxLength={500}
          className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1B3A2D] placeholder:text-slate-400 focus:border-[#2BB5A0] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/20 disabled:opacity-60"
        />
        <p className="mt-1 text-xs text-slate-500">Max 500 characters</p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#1B3A2D] px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_6px_rgba(0,0,0,0.07),0_8px_24px_rgba(27,58,45,0.25)] transition-colors hover:bg-[#244d3a] disabled:opacity-60"
      >
        {loading ? "Saving…" : "Complete profile"}
      </button>
    </form>
  );
}
