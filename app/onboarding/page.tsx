import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./OnboardingForm";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existingProfile) {
    redirect("/mentors");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#F7FAFF] via-[#FFFFFF] to-[#E8F1FF] px-4 py-8">
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
            Complete your profile
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Just your name, college, and course. Takes less than a minute.
          </p>

          <OnboardingForm />
        </div>

      </div>
    </div>
  );
}
