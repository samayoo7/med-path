import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/app/mentors/LogoutButton";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      id,
      display_name,
      course,
      bio,
      role,
      created_at,
      colleges (
        name,
        city,
        state_name
      )
    `)
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const college = profile.colleges as {
    name?: string;
    city?: string | null;
    state_name?: string | null;
  } | null;
  const collegeName = college?.name ?? null;
  const collegeLocation = [college?.city, college?.state_name]
    .filter(Boolean)
    .join(", ") || null;
  const initials = getInitials(profile.display_name);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      {/* Compact header - mobile-first */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/mentors" className="flex items-center gap-2" aria-label="MedPath">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B3A2D] text-white">
              <span className="text-sm font-semibold">MP</span>
            </div>
            <span className="text-lg font-semibold text-[#1B3A2D]">MedPath</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/mentors"
              className="text-sm font-medium text-slate-600 active:text-[#1B3A2D]"
            >
              Mentors
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 pt-6 sm:mx-auto sm:max-w-md sm:pb-8">
        {/* Profile hero - avatar + name */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#2BB5A0] to-[#1B3A2D] text-2xl font-bold text-white shadow-lg shadow-[#2BB5A0]/30">
            {initials}
          </div>
          <h1 className="mt-3 text-xl font-bold text-[#1B3A2D]">
            {profile.display_name}
          </h1>
          <span className="mt-1 rounded-full bg-[#E6F4F1] px-3 py-0.5 text-xs font-medium capitalize text-[#1B3A2D]">
            {profile.role}
          </span>
        </div>

        {/* Info cards - mobile-friendly touch targets */}
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              College
            </p>
            <p className="mt-1 text-[15px] font-medium text-[#1B3A2D]">
              {collegeName ?? "—"}
            </p>
            {collegeLocation && (
              <p className="mt-0.5 text-xs text-slate-500">{collegeLocation}</p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Course
            </p>
            <p className="mt-1 text-[15px] font-medium text-[#1B3A2D]">
              {profile.course}
            </p>
          </div>

          {profile.bio && (
            <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Bio
              </p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                {profile.bio}
              </p>
            </div>
          )}
        </div>

        {/* Sticky bottom CTA on mobile - thumb-friendly */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-4 backdrop-blur-md sm:relative sm:mt-8 sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-4 sm:pb-4 sm:shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <Link
            href="/mentors"
            className="block w-full rounded-xl bg-[#1B3A2D] px-4 py-3.5 text-center text-sm font-semibold text-white active:bg-[#244d3a] touch-manipulation sm:rounded-2xl"
          >
            Back to Mentor Directory
          </Link>
        </div>
      </main>
    </div>
  );
}
