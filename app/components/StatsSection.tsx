"use client";

import { MapPin, TrendingUp, Heart } from "lucide-react";
import { cn } from "../../lib/utils";
import { useCountUp } from "../hooks/useCountUp";
import { stats } from "../data";

const STAT_ICONS = [MapPin, TrendingUp, Heart] as const;

const CARD_BGS = [
  "bg-[linear-gradient(135deg,#F0FAF8_0%,#FFFFFF_100%)]",
  "bg-white",
  "bg-[linear-gradient(225deg,#F0FAF8_0%,#FFFFFF_100%)]",
] as const;

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const { ref, value } = useCountUp(stat.value);
  const Icon = STAT_ICONS[index];
  const cardBg = CARD_BGS[index];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center px-8 py-10 transition-transform duration-300 hover:scale-[1.02] hover:brightness-105",
        cardBg,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-4 h-24 w-24 -translate-x-1/2 rounded-full bg-[#2BB5A0]/20 blur-2xl" />
      {index !== 2 && (
        <div className="pointer-events-none absolute right-0 top-1/2 hidden h-3/5 w-px -translate-y-1/2 bg-[#F0F0F0] md:block" />
      )}
      <div className="relative flex items-start gap-2">
        <span
          ref={ref}
          className="text-5xl font-extrabold leading-none text-[#1B3A2D] transition-colors duration-300 sm:text-6xl md:text-7xl"
        >
          {value}
        </span>
        <span className="mt-1 inline-block align-top text-3xl font-semibold text-[#2BB5A0]">
          {stat.suffix}
        </span>
      </div>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6B7280]">
        {stat.label}
      </p>
      <div className="mt-1 flex items-center gap-1 text-sm text-[#9CA3AF]">
        <Icon className="h-3 w-3 text-[#2BB5A0]" />
        <span>{stat.description}</span>
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section aria-label="MedPath stats" className="mx-auto w-full max-w-6xl">
      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="grid md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
