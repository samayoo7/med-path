"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "../../lib/utils";
import { heroAvatars, trustedColleges } from "../data";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-[#F2F2EC] px-5 py-12 shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_32px_80px_rgba(0,0,0,0.08),0_0_40px_rgba(43,181,160,0.06)] ring-1 ring-[rgba(43,181,160,0.15)] sm:px-10 sm:py-16"
      aria-labelledby="hero-heading"
    >
      {/* Grid + mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[150px] -top-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(43,181,160,0.12)_0%,transparent_70%)] blur-[80px] -z-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[100px] -top-[50px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(27,58,45,0.08)_0%,transparent_70%)] blur-[60px] -z-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,181,160,0.07)_0%,transparent_70%)] blur-[80px] -z-30"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(43,181,160,0.3)] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1B3A2D] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2BB5A0] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2BB5A0]" />
          </span>
          FREE FOR STUDENTS
        </motion.div>

        {/* Headline */}
        <div className="relative mt-6 space-y-3">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.7,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="text-balance text-[clamp(2.75rem,5vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0D1F17]"
          >
            <span className="block">
              Connect with{" "}
              <span className="relative inline-block">
                seniors
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="hero-underline"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#2BB5A0" />
                      <stop offset="100%" stopColor="#1B3A2D" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M2 6 Q50 2 100 5 Q150 8 198 3"
                    stroke="url(#hero-underline)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </span>
            <span className="block">who&apos;ve walked</span>
            <span className="block">your exact path.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="max-w-2xl text-sm leading-relaxed text-[#6B7280] sm:text-base"
          >
            Free, private mentorship from doctors who&apos;ve already navigated
            MBBS, PG, and Super Specialty — so you don&apos;t have to figure it
            out alone.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <a
            href="/auth"
            className="inline-flex items-center justify-center rounded-2xl bg-[#1B3A2D] px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_6px_rgba(0,0,0,0.07),0_8px_24px_rgba(27,58,45,0.25)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#244d3a] hover:shadow-[0_8px_30px_rgba(27,58,45,0.40)]"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-2xl border border-[#D1D5DB] bg-white px-8 py-4 text-sm font-semibold text-[#0D1F17] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#2BB5A0] hover:text-[#1B3A2D] hover:shadow-[0_4px_16px_rgba(43,181,160,0.15)]"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-3 flex items-center justify-center gap-2 text-[13px] text-[#9CA3AF]"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-[#2BB5A0]" />
          <span>No phone number required</span>
          <span className="text-[#D1D5DB]">·</span>
          <span>Just your name and college</span>
        </motion.p>

        {/* Floating avatars */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {heroAvatars.map((avatar) => (
            <motion.div
              key={avatar.id}
              className={cn(
                "group absolute flex flex-col items-center",
                avatar.wrapperPosition,
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                delay: avatar.delay,
                duration: 3.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <div className="pointer-events-auto absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1B3A2D] opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                  {avatar.tooltip}
                </div>
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-base font-bold text-white ring-[3px] ring-white shadow-lg"
                  style={{ backgroundColor: avatar.color }}
                >
                  {avatar.initials}
                </div>
                <div
                  className={cn(
                    "absolute flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md",
                    avatar.arrowPosition,
                  )}
                >
                  <svg
                    width={18}
                    height={22}
                    viewBox="0 0 22 26"
                    fill="none"
                    style={{ transform: `rotate(${avatar.rotateDeg}deg)` }}
                  >
                    <path
                      d="M2 2L20 10.5L12.5 14.5L9 23L2 2Z"
                      fill="#1B3A2D"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust strip */}
      <div className="mt-12 border-t border-slate-100 pt-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#9CA3AF]"
        >
          Trusted by students from
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-3 flex flex-wrap items-center justify-center gap-3"
        >
          {trustedColleges.map((name) => (
            <button
              key={name}
              type="button"
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-500 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-colors duration-200 hover:border-[#2BB5A0] hover:text-[#1B3A2D]"
            >
              {name}
            </button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
