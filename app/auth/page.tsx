"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, Check, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { magicLinkSchema } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const checkVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  },
};

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const parsed = magicLinkSchema.safeParse({ email });
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      setError(firstIssue?.message ?? "Invalid email");
      setLoading(false);
      return;
    }

    const redirectUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://med-path-pi.vercel.app';

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: parsed.data.email,
      options: {
        emailRedirectTo: `${redirectUrl}/auth/callback?next=/mentors`,
      },
    });

    setLoading(false);

    if (signInError) {
      setError(
        signInError.message.replace(/magic link/gi, "login link")
      );
      return;
    }

    setSent(true);
  }

  const bgImageStyle: React.CSSProperties = {
    backgroundImage: "url(/auth-bg.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const overlayStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to bottom, rgba(15, 35, 28, 0.78) 0%, rgba(27, 58, 45, 0.55) 35%, rgba(27, 58, 45, 0.25) 65%, transparent 100%)`,
  };

  return (
    <div className="auth-page relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Background image - blurred */}
      <div
        className="absolute inset-0 -z-30 scale-105"
        style={bgImageStyle}
      />
      <div
        className="absolute inset-0 -z-20 bg-black/5 backdrop-blur-md"
        aria-hidden
      />
      {/* Dark green gradient overlay */}
      <div
        className="absolute inset-0 -z-15"
        style={overlayStyle}
        aria-hidden
      />
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-[24px] shadow-2xl",
                "border border-white/30"
              )}
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.2) inset, 0 40px 100px -20px rgba(0,0,0,0.4), 0 24px 48px -12px rgba(27,58,45,0.35)",
              }}
            >
              {/* Blur layer - separate from content so text stays crisp */}
              <div
                className="absolute inset-0 -z-10 rounded-[24px] bg-white/15 backdrop-blur-xl backdrop-saturate-150"
                aria-hidden
              />
              <div className="relative z-10 rounded-[24px] bg-white/95 p-8">
              <motion.div
                variants={checkVariants}
                initial="initial"
                animate="animate"
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2BB5A0] to-[#1B3A2D] shadow-lg shadow-[#2BB5A0]/30"
              >
                <Check className="h-8 w-8 text-white" strokeWidth={2.5} />
              </motion.div>
              <h1 className="text-center text-2xl font-bold tracking-tight text-[#1B3A2D]">
                Check your email
              </h1>
              <p className="mt-3 text-center text-[15px] leading-relaxed text-slate-600">
                We sent a login link to{" "}
                <strong className="font-semibold text-[#1B3A2D]">{email}</strong>.
                Click it to sign in.
              </p>
              <p className="mt-5 text-center text-sm text-slate-500">
                Didn&apos;t receive it? Check spam or{" "}
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="font-medium text-[#2BB5A0] transition-colors hover:text-[#1B3A2D] hover:underline"
                >
                  try another email
                </button>
              </p>
              <Link
                href="/"
                className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-[#1B3A2D] transition-colors hover:text-[#2BB5A0]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <Link
              href="/"
              className="mb-6 flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label="MedPath"
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  "bg-gradient-to-br from-[#1B3A2D] via-[#244d3a] to-[#1B3A2D]",
                  "text-white shadow-lg shadow-[#1B3A2D]/40",
                  "ring-1 ring-white/10"
                )}
              >
                <span className="text-lg font-bold tracking-tight">MP</span>
              </div>
              <span className="text-[26px] font-bold tracking-tight text-white">
                MedPath
              </span>
            </Link>

            <div
              className={cn(
                "relative overflow-hidden rounded-[24px]",
                "border border-white/30"
              )}
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.2) inset, 0 40px 100px -20px rgba(0,0,0,0.4), 0 24px 48px -12px rgba(27,58,45,0.35)",
              }}
            >
              {/* Blur layer - separate from content so text stays crisp */}
              <div
                className="absolute inset-0 -z-10 rounded-[24px] bg-white/15 backdrop-blur-xl backdrop-saturate-150"
                aria-hidden
              />
              <div className="relative z-10 rounded-[24px] bg-white/95 p-8">
              <h1 className="text-2xl font-bold tracking-tight text-[#1B3A2D]">
                Sign in or sign up
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Enter your email and we&apos;ll send you a login link. No
                password needed.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    Email
                  </label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@college.edu"
                      autoComplete="email"
                      disabled={loading}
                      className={cn(
                        "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-[15px] text-[#1B3A2D] placeholder:text-slate-400",
                        "transition-all duration-200",
                        "focus:border-[#2BB5A0] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/30",
                        error &&
                          "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                      )}
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-semibold text-white",
                    "bg-gradient-to-r from-[#1B3A2D] via-[#244d3a] to-[#2BB5A0]",
                    "shadow-lg shadow-[#1B3A2D]/40",
                    "transition-all duration-200",
                    "hover:shadow-xl hover:shadow-[#2BB5A0]/25 hover:brightness-110",
                    "active:scale-[0.99] active:shadow-md",
                    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:brightness-100"
                  )}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending link…
                    </>
                  ) : (
                    "Continue with email"
                  )}
                </button>
              </form>

              <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
                By continuing, you agree to our terms and privacy policy.
                We&apos;ll never share your email.
              </p>
              </div>
            </div>

              <p className="mt-5 text-center text-sm text-white">
                Already have an account?{" "}
                <span className="text-white">
                  Use the same email to sign in.
                </span>
              </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
