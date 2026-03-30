"use client";

import { useState } from "react";

type Mentor = {
  id: string;
  display_name: string;
  bio: string | null;
  pg_specialty: string | null;
  pg_course: string | null;
  pg_year: number | null;
  super_specialty: string | null;
  super_course: string | null;
  time_slots: string[] | null;
};

const SLOT_SHORT: Record<string, string> = {
  "Weekday mornings (9am–12pm)": "Weekday AM",
  "Weekday afternoons (2pm–6pm)": "Weekday PM",
  "Weekday evenings (6pm–9pm)": "Weekday Eve",
  "Weekend mornings": "Weekend AM",
  "Weekend afternoons": "Weekend PM",
  "Flexible / On demand": "Flexible",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Deterministic accent color per mentor based on initials
const AVATAR_PALETTES = [
  "from-[#2BB5A0] to-[#1B3A2D]",
  "from-[#1B3A2D] to-[#2d5a47]",
  "from-[#0f766e] to-[#134e4a]",
  "from-[#2BB5A0] to-[#0f766e]",
  "from-[#1e4d3a] to-[#2BB5A0]",
];

function getPalette(name: string) {
  const code = name.charCodeAt(0) + (name.charCodeAt(1) ?? 0);
  return AVATAR_PALETTES[code % AVATAR_PALETTES.length];
}

export function MentorDirectory({ mentors }: { mentors: Mentor[] }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? mentors.filter((m) => {
        const q = query.toLowerCase();
        return (
          m.display_name.toLowerCase().includes(q) ||
          m.pg_specialty?.toLowerCase().includes(q) ||
          m.super_specialty?.toLowerCase().includes(q)
        );
      })
    : mentors;

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-7">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or speciality…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-700 shadow-[0_1px_4px_rgba(0,0,0,0.06)] outline-none placeholder:text-slate-400 focus:border-[#2BB5A0] focus:ring-2 focus:ring-[#2BB5A0]/20 sm:max-w-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-slate-400 transition-colors hover:text-slate-600"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            {filtered.length} mentor{filtered.length !== 1 ? "s" : ""}
            {query ? " found" : ""}
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((mentor) => {
              const initials = getInitials(mentor.display_name);
              const specialty = mentor.super_specialty ?? mentor.pg_specialty ?? null;
              const qualification = mentor.super_course ?? mentor.pg_course ?? null;
              const slots = mentor.time_slots ?? [];
              const palette = getPalette(mentor.display_name);

              return (
                <div
                  key={mentor.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_8px_30px_rgba(27,58,45,0.13)]"
                >
                  {/* Card header band */}
                  <div className="relative flex items-end gap-4 bg-[#f5faf8] px-5 pb-4 pt-5">
                    {/* Decorative corner dot */}
                    <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-[#2BB5A0]/30" />
                    <div className="absolute right-7 top-4 h-1.5 w-1.5 rounded-full bg-[#2BB5A0]/15" />

                    {/* Avatar */}
                    <div className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${palette} text-[17px] font-bold tracking-tight text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]`}>
                      {initials}
                    </div>

                    {/* Name + qualification */}
                    <div className="min-w-0 flex-1 pb-0.5">
                      <h2 className="truncate text-[15px] font-semibold leading-tight text-[#1B3A2D]">
                        {mentor.display_name}
                      </h2>
                      {qualification && (
                        <p className="mt-0.5 truncate text-[12px] text-slate-500">{qualification}</p>
                      )}
                    </div>
                  </div>

                  {/* Specialty strip */}
                  {specialty && (
                    <div className="border-y border-slate-100 bg-white px-5 py-2.5">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2BB5A0]" />
                        <span className="text-[12px] font-semibold text-[#1B3A2D]">{specialty}</span>
                      </span>
                    </div>
                  )}

                  {/* Body */}
                  <div className="flex flex-1 flex-col px-5 py-4">
                    {/* Bio */}
                    {mentor.bio ? (
                      <p className="text-[13px] leading-relaxed text-slate-500 line-clamp-2">
                        {mentor.bio}
                      </p>
                    ) : (
                      <p className="text-[13px] italic text-slate-300">No bio yet.</p>
                    )}

                    {/* Time slots */}
                    {slots.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {slots.map((slot: string) => (
                          <span
                            key={slot}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500"
                          >
                            {SLOT_SHORT[slot] ?? slot}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom accent bar — grows in on hover */}
                  <div className="h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#2BB5A0] to-[#1B3A2D] transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-medium text-slate-600">No mentors match &ldquo;{query}&rdquo;</p>
          <p className="mt-1 text-xs text-slate-400">Try a different name or speciality</p>
        </div>
      )}
    </>
  );
}
