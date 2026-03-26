"use client";

import { useState } from "react";
import { upsertMentorProfile } from "./actions";
import {
  SPECIALITIES,
  UG_COURSES,
  PG_COURSES,
  SUPER_COURSES,
  TIME_SLOTS,
  YEAR_OPTIONS,
} from "@/lib/validations/profile";
import { Select } from "@/app/components/Select";
import { CollegeSearchInput } from "@/app/components/CollegeSearchInput";

export function MentorOnboardingForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pgCourse, setPgCourse] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);

    const superCollegeId = formData.get("super_college_id") as string;
    const superCourse = formData.get("super_course") as string;
    const superSpecialty = formData.get("super_specialty") as string;
    const superYear = formData.get("super_year") as string;
    const timeSlots = formData.getAll("time_slots") as string[];

    // Super Speciality — optional, but if college is filled all fields are required
    if (superCollegeId) {
      if (!superCourse) {
        setError("Please select your Super Speciality course.");
        setLoading(false);
        return;
      }
      if (!superSpecialty) {
        setError("Please select your Super Speciality specialty.");
        setLoading(false);
        return;
      }
      if (!superYear) {
        setError("Please select your Super Speciality year of graduation.");
        setLoading(false);
        return;
      }
    }

    if (timeSlots.length === 0) {
      setError("Please select at least one preferred time slot.");
      setLoading(false);
      return;
    }

    const raw = {
      display_name: formData.get("display_name") as string,
      ug_college_id: formData.get("ug_college_id") as string,
      ug_course: formData.get("ug_course") as string,
      ug_year: formData.get("ug_year") as string,
      pg_college_id: formData.get("pg_college_id") as string,
      pg_course: formData.get("pg_course") as string,
      pg_specialty: formData.get("pg_specialty") as string,
      pg_year: formData.get("pg_year") as string,
      super_college_id: formData.get("super_college_id") as string,
      super_course: formData.get("super_course") as string,
      super_specialty: formData.get("super_specialty") as string,
      super_year: formData.get("super_year") as string,
      time_slots: timeSlots,
    };

    const result = await upsertMentorProfile(raw);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  const pgSpecialties =
    pgCourse && SPECIALITIES[pgCourse as keyof typeof SPECIALITIES]
      ? SPECIALITIES[pgCourse as keyof typeof SPECIALITIES]
      : [];
  const superSpecialties = SPECIALITIES["DM/M.Ch./DRNB"];

  return (
    <form action={handleSubmit} className="mt-6 space-y-6">
      <div>
        <label
          htmlFor="display_name"
          className="block text-sm font-medium text-slate-700"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          required
          placeholder="Your full name"
          disabled={loading}
          maxLength={50}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-[#1B3A2D] placeholder:text-slate-400 focus:border-[#2BB5A0] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/20 disabled:opacity-60"
        />
      </div>

      {/* UG College */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <h3 className="text-sm font-semibold text-[#1B3A2D]">
          Undergraduate
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              College name <span className="text-red-500">*</span>
            </label>
            <div className="mt-1.5">
              <CollegeSearchInput
                id="ug_college_id"
                name="ug_college_id"
                placeholder="Search your UG college (min 3 characters)"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Course <span className="text-red-500">*</span>
            </label>
            <div className="mt-1.5">
              <Select
                id="ug_course"
                name="ug_course"
                options={UG_COURSES.map((c) => ({ value: c, label: c }))}
                placeholder="Select course"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Year of graduation <span className="text-red-500">*</span>
            </label>
            <div className="mt-1.5">
              <Select
                id="ug_year"
                name="ug_year"
                options={YEAR_OPTIONS.map((y) => ({ value: y, label: y }))}
                placeholder="Select year"
                required
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PG College */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <h3 className="text-sm font-semibold text-[#1B3A2D]">
          Postgraduate
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              College name <span className="text-red-500">*</span>
            </label>
            <div className="mt-1.5">
              <CollegeSearchInput
                id="pg_college_id"
                name="pg_college_id"
                placeholder="Search your PG college (min 3 characters)"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Course <span className="text-red-500">*</span>
            </label>
            <div className="mt-1.5">
              <Select
                id="pg_course"
                name="pg_course"
                options={PG_COURSES.map((c) => ({ value: c, label: c }))}
                placeholder="Select course"
                required
                disabled={loading}
                value={pgCourse}
                onChange={(v) => setPgCourse(v)}
              />
            </div>
          </div>
          {pgCourse && pgSpecialties.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Specialty <span className="text-red-500">*</span>
              </label>
              <div className="mt-1.5">
                <Select
                  key={pgCourse}
                  id="pg_specialty"
                  name="pg_specialty"
                  options={pgSpecialties.map((s) => ({ value: s, label: s }))}
                  placeholder="Select specialty"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Year of graduation <span className="text-red-500">*</span>
            </label>
            <div className="mt-1.5">
              <Select
                id="pg_year"
                name="pg_year"
                options={YEAR_OPTIONS.map((y) => ({ value: y, label: y }))}
                placeholder="Select year"
                required
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Super Specialty */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <h3 className="text-sm font-semibold text-[#1B3A2D]">
          Super Speciality
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              College name
            </label>
            <div className="mt-1.5">
              <CollegeSearchInput
                id="super_college_id"
                name="super_college_id"
                placeholder="Search your Super specialty college (min 3 characters)"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Course
            </label>
            <div className="mt-1.5">
              <Select
                id="super_course"
                name="super_course"
                options={SUPER_COURSES.map((c) => ({ value: c, label: c }))}
                placeholder="Select course"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Specialty
            </label>
            <div className="mt-1.5">
              <Select
                id="super_specialty"
                name="super_specialty"
                options={superSpecialties.map((s) => ({ value: s, label: s }))}
                placeholder="Select specialty"
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Year of graduation
            </label>
            <div className="mt-1.5">
              <Select
                id="super_year"
                name="super_year"
                options={YEAR_OPTIONS.map((y) => ({ value: y, label: y }))}
                placeholder="Select year"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preferred time slots */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Preferred time slots <span className="text-red-500">*</span>
        </label>
        <p className="mt-0.5 text-xs text-slate-500">
          Select when you&apos;re typically available for mentoring
        </p>
        <div className="mt-3 space-y-2">
          {TIME_SLOTS.map((slot) => (
            <label
              key={slot}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 hover:bg-slate-50"
            >
              <input
                type="checkbox"
                name="time_slots"
                value={slot}
                disabled={loading}
                className="h-4 w-4 rounded border-slate-300 text-[#2BB5A0] focus:ring-[#2BB5A0]"
              />
              <span>{slot}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#1B3A2D] px-4 py-3 text-base font-semibold text-white shadow-[0_4px_6px_rgba(0,0,0,0.07),0_8px_24px_rgba(27,58,45,0.25)] transition-colors hover:bg-[#244d3a] disabled:opacity-60"
      >
        {loading ? "Saving…" : "Complete profile"}
      </button>
    </form>
  );
}
