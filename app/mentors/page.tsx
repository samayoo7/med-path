import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./LogoutButton";

export default async function MentorsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#F7FAFF] via-[#FFFFFF] to-[#E8F1FF]">
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/mentors" className="flex items-center gap-3" aria-label="MedPath">
            <div className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-[#1B3A2D] text-white shadow-md shadow-[#1B3A2D]/40">
              <span className="text-lg font-semibold">MP</span>
            </div>
            <span className="text-[25px] font-semibold tracking-tight text-[#1B3A2D]">
              MedPath
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/profile/me"
              className="text-sm font-medium text-slate-600 hover:text-[#1B3A2D]"
            >
              Profile
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_32px_80px_rgba(0,0,0,0.08)]">
          <h1 className="text-xl font-semibold text-[#1B3A2D]">
            Mentor Directory
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Coming soon. Browse and connect with seniors in the next update.
          </p>
          <Link
            href="/"
            className="mt-6 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-[#1B3A2D] hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
