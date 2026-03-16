"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../lib/utils";
import {
  ArrowRight,
  MapPin,
  TrendingUp,
  Heart,
  Quote,
  Star,
  ShieldCheck,
} from "lucide-react";

const NAVY = "#1A3C5E";
const SKY = "#2E75B6";
const SOFT_BG = "#EBF2FA";

const mentorCards = [
  {
    name: "Dr. Ananya Rao",
    specialty: "MD Medicine Resident",
    college: "AIIMS Delhi",
    stage: "PG · 2nd Year",
    available: true,
    color: "bg-sky-500",
  },
  {
    name: "Dr. Karthik Menon",
    specialty: "DM Cardiology",
    college: "CMC Vellore",
    stage: "DM · 1st Year",
    available: true,
    color: "bg-emerald-500",
  },
  {
    name: "Dr. Sneha Iyer",
    specialty: "MS Ophthalmology",
    college: "KMC Manipal",
    stage: "MS · Senior Resident",
    available: false,
    color: "bg-indigo-500",
  },
] as const;

const heroAvatars = [
  {
    id: "PS",
    initials: "PS",
    color: "#2BB5A0",
    tooltip: "MS Surgery, AIIMS",
    wrapperPosition: "top-16 left-[5%]",
    arrowPosition: "-bottom-9 -right-2",
    rotateDeg: 135,
    delay: 0,
  },
  {
    id: "AR",
    initials: "AR",
    color: "#4BA3E3",
    tooltip: "DM Cardiology, PGIMER",
    wrapperPosition: "top-8 right-[5%]",
    arrowPosition: "-bottom-9 -left-2",
    rotateDeg: 225,
    delay: 0.8,
  },
  {
    id: "DK",
    initials: "DK",
    color: "#1B3A2D",
    tooltip: "MD Medicine, JIPMER",
    wrapperPosition: "bottom-32 left-[7%]",
    arrowPosition: "-bottom-9 -right-2",
    rotateDeg: 45,
    delay: 1.4,
  },
  {
    id: "SM",
    initials: "SM",
    color: "#7BC67A",
    tooltip: "MS Ophthalmology, KMC",
    wrapperPosition: "bottom-20 right-[6%]",
    arrowPosition: "-bottom-9 -left-2",
    rotateDeg: 315,
    delay: 2.1,
  },
] as const;

const featureCards = [
  {
    title: "Mentor Directory",
    description:
      "Search seniors by specialty, college, exam, or stage — and see who is actually available.",
    badge: "Browse seniors",
  },
  {
    title: "Connection Requests",
    description:
      "Send a short context note and let seniors accept on their terms — no awkward cold DMs.",
    badge: "1:1 requests",
  },
  {
    title: "Real-time Chat",
    description:
      "Focused, private threads for each big decision — from branch choice to exam strategy.",
    badge: "Private threads",
  },
  {
    title: "Privacy First",
    description:
      "Only your name, college, and stage are visible by default. No phone numbers, ever.",
    badge: "Minimal profile",
  },
] as const;

const stageTags = [
  "MBBS Y1–Y4",
  "Internship",
  "NEET PG Prep",
  "MD/MS",
  "INI-CET",
  "DM/MCh",
  "Fellowship",
  "Research",
  "Work-Life Balance",
  "Clinical vs Non-Clinical",
] as const;

const howItWorksSteps = [
  {
    title: "Create your profile",
    description: "Just your name and college. That's it.",
  },
  {
    title: "Find your senior",
    description: "Browse by specialty, college, or stage.",
  },
  {
    title: "Start the conversation",
    description: "Chat directly. Free, forever.",
  },
] as const;

const menteeFeatures = [
  "Browse by Specialty & College",
  "Send a Connection Request",
  "Real-time Chat",
  "Completely Free",
  "Privacy First — no phone number, no government ID",
  "For Every Stage — MBBS to Super Specialty",
] as const;

const mentorFeatures = [
  "Set your own availability",
  "Choose who you talk to",
  "Build your reputation",
] as const;

const stats = [
  { label: "Mentors", value: 500, suffix: "+", description: "across India" },
  { label: "Specialties", value: 15, suffix: "+", description: "and growing" },
  { label: "Fee", value: 0, suffix: "₹", description: "Free forever" },
] as const;

const testimonials = [
  {
    name: "Priya",
    role: "3rd Year MBBS",
    college: "AIIMS Delhi",
    quote:
      "I had no idea which specialty suited me. One conversation with a Surgery resident changed everything.",
  },
  {
    name: "Arjun",
    role: "Final Year MBBS",
    college: "KMC Manipal",
    quote:
      "MedPath connected me with an MS Orthopaedics senior for free. Paid platforms wanted ₹1500 for the same.",
  },
  {
    name: "Dr. Sneha",
    role: "MS Ophthalmology",
    college: "Tertiary Care Govt Hospital",
    quote:
      "I get 3–4 juniors a week now. It's organised and completely on my terms.",
  },
] as const;

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let frameId: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target, durationMs]);

  return { ref, value };
}

function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 rounded-3xl bg-white/95 px-4 py-10 shadow-md ring-1 ring-slate-100/80 backdrop-blur-sm sm:px-8 sm:py-12",
        className,
      )}
    >
      {children}
    </section>
  );
}

function StatItem({
  stat,
}: {
  stat: { label: string; value: number; suffix: string; description: string };
}) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div className="flex flex-col items-center justify-center gap-1 border-slate-200/70 first:border-l-0 last:border-r-0 sm:border-x sm:px-6 py-6">
      <div className="flex items-baseline gap-1">
        <span ref={ref} className="text-3xl font-extrabold text-[#1B3A2D] sm:text-4xl">
          {value}
        </span>
        <span className="text-lg font-semibold text-[#1B3A2D]">
          {stat.suffix}
        </span>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#647067]">
        {stat.label}
      </p>
      <p className="text-[11px] text-[#9CA3AF]">{stat.description}</p>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#F7FAFF] via-[#FFFFFF] to-[#E8F1FF] text-slate-900"
    >
      <header
        className={cn(
          "sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all",
          scrolled && "bg-white/95 shadow-[0_8px_18px_rgba(15,23,42,0.06)]",
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="MedPath">
            <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-[#1B3A2D] text-white shadow-md shadow-[#1B3A2D]/40">
              <span className="text-lg font-semibold">MP</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[25px] font-semibold tracking-tight text-[#1B3A2D]">
                MedPath
              </span>
              <span className="text-[13px] text-slate-500">
                Find your senior. Find your path.
              </span>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-xs font-medium text-slate-600 md:flex">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "For Mentors", href: "#for-mentors" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative inline-flex items-center gap-1 rounded-full px-2 py-1 text-[13px] text-slate-600 transition-colors hover:bg-[#E6F4F1] hover:text-[#1B3A2D]"
              >
                <span>{item.label}</span>
                <span className="text-[9px] text-slate-400">▾</span>
                <span className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-[2px] origin-center scale-x-0 rounded-full bg-gradient-to-r from-transparent via-[#2BB5A0] to-transparent transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden text-xs font-medium text-slate-600 hover:text-[#1B3A2D] sm:inline-flex">
              Login
            </button>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-[#1B3A2D] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(27,58,45,0.5)] hover:bg-[#18402d] sm:px-5 sm:text-sm"
            >
              <span className="hidden sm:inline">Get Started Free</span>
              <span className="sm:hidden">Get Started</span>
            </a>
          </div>
        </div>
      </header>

      <main
        id="top"
        className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:gap-12 sm:px-6 sm:py-14 lg:gap-16 lg:px-8 lg:py-16"
      >
        {/* Hero */}
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
                <span className="block">Connect with{" "}
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
                href="#cta"
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
                    {/* Tooltip */}
                    <div className="pointer-events-auto absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1B3A2D] opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                      {avatar.tooltip}
                    </div>
                    {/* Avatar */}
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full text-base font-bold text-white ring-[3px] ring-white shadow-lg"
                      style={{ backgroundColor: avatar.color }}
                    >
                      {avatar.initials}
                    </div>
                    {/* Arrow */}
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
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CA3AF] text-center"
            >
              Trusted by students from
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-3 flex flex-wrap items-center justify-center gap-3"
            >
              {["AIIMS", "JIPMER", "KMC Manipal", "MAMC", "Grant Medical", "PGIMER"].map(
                (name) => (
                  <button
                    key={name}
                    type="button"
                    className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-500 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-colors duration-200 hover:border-[#2BB5A0] hover:text-[#1B3A2D]"
                  >
                    {name}
                  </button>
                ),
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Features header */}
        <section
          id="features"
          className="scroll-mt-24 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F4EC] px-4 py-1 text-[11px] font-medium text-[#1B3A2D]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2D6A4F]" />
            <span>FEATURES</span>
          </div>
          <h2 className="mt-4 text-balance text-2xl font-extrabold tracking-tight text-[#1B3A2D] sm:text-3xl">
            Everything you need to find guidance —{" "}
            <span className="relative inline-block">
              <span>nothing you don&apos;t.</span>
              <span className="pointer-events-none absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-[#95D5B2] via-[#52B788] to-[#40916C] opacity-80" />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#4B5563] sm:text-base">
            Built lean and private, for students who just want real answers from real seniors —
            no feeds, no noise, just focused conversations.
          </p>
        </section>

        {/* Feature cards grid */}
        <Section className="relative bg-[#F0F7F4]">
          <div className="pointer-events-none absolute -left-40 -top-32 h-72 w-72 rounded-full bg-[#2BB5A0]/5 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#2D6A4F]/5 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-2">
            {featureCards.map((card, index) => (
              <article
                key={card.title}
                className="relative flex flex-col gap-5 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.10)]"
              >
                <div className="pointer-events-none absolute top-0 left-6 right-6 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#2BB5A0] to-transparent" />
                <div className="space-y-2">
                  <span className="inline-flex items-center rounded-full border border-[rgba(43,181,160,0.25)] bg-[#E6F4F1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1B3A2D]">
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#2BB5A0]" />
                    {card.badge.toUpperCase()}
                  </span>
                  <h3 className="text-sm font-semibold text-[#0D1F17] sm:text-base">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] sm:text-sm">
                    {card.description}
                  </p>
                </div>
                {/* UI mockup */}
                {index === 0 && (
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
                              {m.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
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
                      {/* Faded suggestion of more rows */}
                      <div className="relative mt-1 overflow-hidden rounded-xl">
                        <div className="h-6 bg-white/70" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                      </div>
                    </div>
                  </div>
                )}
                {index === 1 && (
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
                        &quot;I&apos;m confused between Gen Med and Paediatrics. Could we talk through what your
                        day actually looks like?&quot;
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
                    {/* Stacked faded card */}
                    <div className="pointer-events-none -mt-4 translate-y-2 scale-[0.97] rounded-xl border border-black/5 bg-white/70 p-3 opacity-40 shadow-[0_2px_8px_rgba(0,0,0,0.05)]" />
                  </div>
                )}
                {index === 2 && (
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
                    {/* Typing indicator */}
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex w-16 items-center gap-1 rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-3 py-2 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                      </div>
                    </div>
                    {/* Input bar */}
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2">
                      <span className="flex-1 text-[11px] text-gray-400">
                        Type a message…
                      </span>
                      <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1B3A2D] text-white text-[10px]">
                        ↗
                      </button>
                    </div>
                  </div>
                )}
                {index === 3 && (
                  <div className="space-y-3 rounded-xl border border-black/10 bg-white p-4 text-xs shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2BB5A0] text-base font-bold text-white">
                        P
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0D1F17]">
                          Priya S.
                        </p>
                        <p className="text-[11px] text-gray-400">Active Mentor</p>
                      </div>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="border-b border-gray-50 pb-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                          College
                        </p>
                        <p className="text-sm font-medium text-[#0D1F17]">
                          AIIMS New Delhi
                        </p>
                      </div>
                      <div className="border-b border-gray-50 pb-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                          Stage
                        </p>
                        <p className="text-sm font-medium text-[#0D1F17]">
                          3rd Year MBBS
                        </p>
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
                            <span className="tracking-wide">
                              ••••••••••
                            </span>
                          </div>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-gray-400">
                            Hidden
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>

        {/* Stage section */}
        <section
          id="how-it-works"
          className="scroll-mt-24 rounded-3xl bg-[#F7FAF8] px-4 py-10 text-[#0D1F17] shadow-md ring-1 ring-slate-100 sm:px-8 sm:py-12"
        >
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#E6F4EC] px-4 py-1 text-[11px] font-medium text-[#1B3A2D]">
              ✦ FOR EVERY STAGE
            </p>
            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-[#0D1F17] sm:text-3xl">
                From MBBS Day 1 to DM/MCh. MedPath grows with you.
              </h2>
              <p className="max-w-2xl text-sm text-[#4B5563] sm:text-base">
                Whether you&apos;re choosing a specialty or preparing for super-specialty entrance exams,
                there&apos;s a senior here who&apos;s done it.
              </p>
            </div>
            <div className="mt-4 overflow-x-auto">
              <div className="flex min-w-max flex-wrap gap-2">
                {stageTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-medium text-[#1B3A2D]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section
          aria-label="MedPath stats"
          className="mx-auto w-full max-w-6xl"
        >
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="grid md:grid-cols-3">
              {stats.map((stat, index) => {
                const { ref, value } = useCountUp(stat.value);

                const icon =
                  index === 0 ? (
                    <MapPin className="h-3 w-3 text-[#2BB5A0]" />
                  ) : index === 1 ? (
                    <TrendingUp className="h-3 w-3 text-[#2BB5A0]" />
                  ) : (
                    <Heart className="h-3 w-3 text-[#2BB5A0]" />
                  );

                const cardBg =
                  index === 0
                    ? "bg-[linear-gradient(135deg,#F0FAF8_0%,#FFFFFF_100%)]"
                    : index === 2
                    ? "bg-[linear-gradient(225deg,#F0FAF8_0%,#FFFFFF_100%)]"
                    : "bg-white";

                return (
                  <div
                    key={stat.label}
                    className={cn(
                      "relative flex flex-col items-center justify-center px-8 py-10 transition-transform duration-300 hover:scale-[1.02] hover:brightness-105",
                      cardBg,
                    )}
                  >
                    {/* Ambient glow */}
                    <div className="pointer-events-none absolute top-4 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#2BB5A0]/20 blur-2xl" />

                    {/* Vertical divider (60% height, only for left/middle) */}
                    {index !== 2 && (
                      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-3/5 w-px -translate-y-1/2 bg-[#F0F0F0] md:block" />
                    )}

                    {/* Number + suffix */}
                    <div className="relative flex items-start gap-2">
                      <span
                        ref={ref}
                        className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none text-[#1B3A2D] transition-colors duration-300"
                      >
                        {value}
                      </span>
                      <span className="mt-1 inline-block align-top text-3xl font-semibold text-[#2BB5A0]">
                        {stat.suffix}
                      </span>
                    </div>

                    {/* Label */}
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6B7280]">
                      {stat.label}
                    </p>

                    {/* Sub-label with icon */}
                    <div className="mt-1 flex items-center gap-1 text-sm text-[#9CA3AF]">
                      {icon}
                      <span>{stat.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section
          aria-label="Student testimonial"
          className="mx-auto mt-6 w-full max-w-6xl"
        >
          <div
            className="relative overflow-hidden rounded-3xl border border-[rgba(43,181,160,0.12)] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(43,181,160,0.06)_0%,rgba(255,255,255,1)_70%)] px-6 py-10 shadow-[0_4px_6px_rgba(0,0,0,0.03),0_20px_60px_rgba(0,0,0,0.07)] sm:px-10 sm:py-16"
          >
            {/* Decorative big quotes */}
            <span className="pointer-events-none absolute top-6 left-8 hidden select-none text-[160px] font-serif leading-none text-[#1B3A2D]/5 md:block">
              "
            </span>
            <span className="pointer-events-none absolute bottom-6 right-8 hidden select-none rotate-180 text-[160px] font-serif leading-none text-[#1B3A2D]/5 md:block">
              "
            </span>

            {/* Side accent lines */}
            <div className="pointer-events-none absolute left-8 top-1/2 hidden h-24 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#2BB5A0] to-transparent lg:block" />
            <div className="pointer-events-none absolute right-8 top-1/2 hidden h-24 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#2BB5A0] to-transparent lg:block" />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              {/* Stars */}
              <div className="mb-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="mb-6 h-10 w-10 text-[#2BB5A0]" strokeWidth={1.5} />

              {/* Quote text */}
              <p className="max-w-3xl font-serif text-lg italic leading-relaxed text-[#1F2937] sm:text-2xl sm:leading-relaxed">
                I had no idea which specialty to pick. One conversation with an{" "}
                <strong className="font-semibold not-italic text-[#1B3A2D]">
                  MS Surgery resident
                </strong>{" "}
                on MedPath gave me more clarity than{" "}
                <strong className="font-semibold not-italic text-[#1B3A2D]">
                  2 years of browsing forums
                </strong>
                .
              </p>

              {/* Avatar + attribution */}
              <div className="mt-8 flex flex-col items-center gap-2 text-xs text-[#6B7280] sm:text-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2BB5A0] text-base font-bold text-white ring-2 ring-[#2BB5A0] ring-offset-2 ring-offset-white">
                  PS
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-[#0D1F17]">
                    Priya S.
                  </p>
                  <span className="rounded-full bg-[#E6F4F1] px-2 py-0.5 text-[10px] font-semibold text-[#1B8A6B]">
                    ✓ Verified Student
                  </span>
                </div>
                <p>3rd Year MBBS, AIIMS New Delhi</p>
              </div>

              {/* Carousel dots (static) */}
              <div className="mt-8 flex items-center gap-2">
                <span className="h-2 w-6 rounded-full bg-[#1B3A2D]" />
                <span className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
                <span className="h-2 w-2 rounded-full bg-[#D1D5DB]" />
              </div>
            </div>
          </div>
        </section>

        {/* Pre-footer CTA banner */}
        <section
          id="cta"
          className="rounded-3xl"
          aria-label="Get started with MedPath"
        >
          <div className="flex flex-col justify-between gap-6 rounded-[22px] bg-[#1B3A2D] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold leading-snug sm:text-2xl">
                Discover the right path for
                <br />
                your medical career.
              </h2>
              <p className="max-w-xl text-sm text-emerald-50">
                Join a private network of seniors across India who actually have time for your questions.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                className="inline-flex items-center justify-center rounded-full border border-emerald-100 bg-transparent px-6 py-2.5 text-sm font-semibold text-emerald-50 hover:bg-emerald-50/10"
              >
                See a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1B3A2D] shadow-sm hover:bg-emerald-50">
                Get Started Free
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-semibold"
                style={{ color: NAVY }}
              >
                MedPath
              </span>
              <span className="text-[11px] text-slate-500">
                Find your senior. Find your path.
              </span>
            </div>
            <p>Built for Indian medical students. Made with ❤️ in India.</p>
            <p className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} MedPath. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <button className="text-slate-600 hover:text-slate-900">
              About
            </button>
            <button className="text-slate-600 hover:text-slate-900">
              Privacy Policy
            </button>
            <button className="text-slate-600 hover:text-slate-900">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
