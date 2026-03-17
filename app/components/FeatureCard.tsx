"use client";

import { featureCards, mentorCards } from "../data";

type FeatureCardData = (typeof featureCards)[number];

type FeatureCardProps = {
  card: FeatureCardData;
  index: number;
};

function MentorDirectoryMockup() {
  return (
    <div className="relative rounded-xl border border-[rgba(43,181,160,0.15)] bg-[linear-gradient(135deg,#F0FAF8_0%,#FFFFFF_100%)] p-4">
      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] text-[#6B7280] shadow-inner">
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2BB5A0]/50" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#2BB5A0]" />
        </span>
        <span className="flex-1 text-left">
          Search by specialty, college, exam…
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {mentorCards.slice(0, 3).map((m) => (
          <div
            key={m.name}
            className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:translate-x-1 hover:bg-[#F7FDFB]"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B3A2D] text-[10px] font-bold text-white">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-[#0D1F17]">{m.name}</p>
                <p className="text-[11px] text-[#6B7280]">{m.specialty}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F9F5] px-2 py-0.5 text-[10px] font-medium text-[#1B8A6B]">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#2BB5A0]" />
              Available
            </span>
          </div>
        ))}
        <div className="relative mt-1 overflow-hidden rounded-xl">
          <div className="h-6 bg-white/70" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
    </div>
  );
}

function ConnectionRequestMockup() {
  return (
    <div className="relative space-y-3">
      <div className="rounded-xl border border-black/10 bg-white p-4 text-xs shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2BB5A0] text-[11px] font-bold text-white">
            P
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[#0D1F17]">
              Priya · 3rd Year MBBS
            </p>
            <span className="inline-flex items-center rounded-full bg-[#EEF6FF] px-2 py-0.5 text-[10px] font-medium text-[#3B82F6]">
              3rd Year · AIIMS
            </span>
          </div>
        </div>
        <div className="mt-3 rounded-r-lg border-l-4 border-[#2BB5A0] bg-[#F8FFFE] px-3 py-2 text-[13px] italic text-[#374151]">
          &quot;I&apos;m confused between Gen Med and Paediatrics. Could we talk through
          what your day actually looks like?&quot;
        </div>
        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-xl bg-[#1B3A2D] px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_4px_12px_rgba(27,58,45,0.35)] hover:brightness-110">
            Accept
          </button>
          <button className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#374151]">
            Decline
          </button>
        </div>
      </div>
      <div className="pointer-events-none -mt-4 translate-y-2 scale-[0.97] rounded-xl border border-black/5 bg-white/70 p-3 opacity-40 shadow-[0_2px_8px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function RealTimeChatMockup() {
  return (
    <div className="space-y-3 rounded-xl border border-[rgba(43,181,160,0.12)] bg-[#F8FFFE] p-4 text-[11px]">
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-[#374151]">
            P
          </div>
          <div className="max-w-[75%] rounded-2xl rounded-tl-sm border border-[#E5E7EB] bg-white px-3 py-2 text-[#1F2937] shadow-sm">
            How brutal are the 24‑hr calls in Gen Med during first year?
            <div className="mt-1 text-[10px] text-gray-400">2:34 PM</div>
          </div>
        </div>
        <div className="flex items-start justify-end gap-2">
          <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-[#1B3A2D] px-3 py-2 text-white shadow-sm">
            Busy, but survivable. You&apos;ll learn a lot if you like complex medicine.
            <div className="mt-1 text-[10px] text-emerald-200">2:36 PM</div>
          </div>
          <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#2BB5A0] text-[10px] font-semibold text-white">
            D
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-[#374151]">
            P
          </div>
          <div className="max-w-[75%] rounded-2xl rounded-tl-sm border border-[#E5E7EB] bg-white px-3 py-2 text-[#1F2937] shadow-sm">
            Perfect, that&apos;s exactly what I needed to know.
            <div className="mt-1 text-[10px] text-gray-400">2:38 PM</div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1">
        <div className="flex w-16 items-center gap-1 rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-3 py-2 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2">
        <span className="flex-1 text-[11px] text-gray-400">Type a message…</span>
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1B3A2D] text-[10px] text-white">
          ↗
        </button>
      </div>
    </div>
  );
}

function PrivacyFirstMockup() {
  return (
    <div className="space-y-3 rounded-xl border border-black/10 bg-white p-4 text-xs shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2BB5A0] text-base font-bold text-white">
          P
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0D1F17]">Priya S.</p>
          <p className="text-[11px] text-gray-400">Active Mentor</p>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        <div className="border-b border-gray-50 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            College
          </p>
          <p className="text-sm font-medium text-[#0D1F17]">AIIMS New Delhi</p>
        </div>
        <div className="border-b border-gray-50 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Stage
          </p>
          <p className="text-sm font-medium text-[#0D1F17]">3rd Year MBBS</p>
        </div>
      </div>
      <div className="mt-2 rounded-lg border border-[#FDE68A] bg-[#FFF8E6] px-3 py-2 text-[11px] font-medium text-[#92400E]">
        Phone, email &amp; photo hidden by default.
      </div>
      <div className="mt-2 space-y-1">
        {["Phone number", "Email address", "Profile photo"].map((field) => (
          <div
            key={field}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5 text-[11px] text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-200 text-[9px]">
                🔒
              </span>
              <span className="tracking-wide">•••••••••</span>
            </div>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-gray-400">
              Hidden
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const MOCKUPS: Record<number, React.ComponentType> = {
  0: MentorDirectoryMockup,
  1: ConnectionRequestMockup,
  2: RealTimeChatMockup,
  3: PrivacyFirstMockup,
};

export function FeatureCard({ card, index }: FeatureCardProps) {
  const Mockup = MOCKUPS[index];

  return (
    <article className="relative flex flex-col gap-5 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.10)]">
      <div className="pointer-events-none absolute left-6 right-6 top-0 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#2BB5A0] to-transparent" />
      <div className="space-y-2">
        <span className="inline-flex items-center rounded-full border border-[rgba(43,181,160,0.25)] bg-[#E6F4F1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1B3A2D]">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#2BB5A0]" />
          {card.badge.toUpperCase()}
        </span>
        <h3 className="text-sm font-semibold text-[#0D1F17] sm:text-base">
          {card.title}
        </h3>
        <p className="text-xs text-[#6B7280] sm:text-sm">{card.description}</p>
      </div>
      {Mockup && <Mockup />}
    </article>
  );
}
