"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { magicLinkSchema } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

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

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: parsed.data.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/mentors`,
      },
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#F7FAFF] via-[#FFFFFF] to-[#E8F1FF] px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_32px_80px_rgba(0,0,0,0.08)]">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F4F1]">
            <svg
              className="h-7 w-7 text-[#2BB5A0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-center text-xl font-semibold text-[#1B3A2D]">
            Check your email
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            We sent a magic link to <strong>{email}</strong>. Click it to sign
            in.
          </p>
          <p className="mt-4 text-center text-xs text-slate-500">
            Didn&apos;t receive it? Check spam or{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-medium text-[#2BB5A0] hover:underline"
            >
              try another email
            </button>
          </p>
          <Link
            href="/"
            className="mt-6 block text-center text-sm font-medium text-[#1B3A2D] hover:text-[#2BB5A0]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#F7FAFF] via-[#FFFFFF] to-[#E8F1FF] px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center gap-3"
          aria-label="MedPath"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-[#1B3A2D] text-white shadow-md shadow-[#1B3A2D]/40">
            <span className="text-lg font-semibold">MP</span>
          </div>
          <span className="text-[25px] font-semibold tracking-tight text-[#1B3A2D]">
            MedPath
          </span>
        </Link>

        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_32px_80px_rgba(0,0,0,0.08)]">
          <h1 className="text-xl font-semibold text-[#1B3A2D]">
            Sign in or sign up
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Enter your email and we&apos;ll send you a magic link. No password
            needed.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                autoComplete="email"
                disabled={loading}
                className={cn(
                  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1B3A2D] placeholder:text-slate-400 focus:border-[#2BB5A0] focus:outline-none focus:ring-2 focus:ring-[#2BB5A0]/20",
                  error && "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                )}
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1B3A2D] px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_6px_rgba(0,0,0,0.07),0_8px_24px_rgba(27,58,45,0.25)] transition-colors hover:bg-[#244d3a] disabled:opacity-60"
            >
              {loading ? "Sending link…" : "Send magic link"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            By continuing, you agree to our terms. We&apos;ll never share your
            email.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <span className="text-slate-500">Use the same email to sign in.</span>
        </p>
      </div>
    </div>
  );
}
