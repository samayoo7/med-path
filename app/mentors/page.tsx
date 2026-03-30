import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./LogoutButton";
import { MentorDirectory } from "./MentorDirectory";

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

  const { data: mentors } = await supabase
    .from("profiles")
    .select(`
      id,
      display_name,
      bio,
      pg_specialty,
      pg_course,
      pg_year,
      super_specialty,
      super_course,
      time_slots
    `)
    .eq("role", "mentor")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      {/* Header */}
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

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1B3A2D]">Mentor Directory</h1>
          <p className="mt-1 text-sm text-slate-500">
            Connect with seniors who&apos;ve walked the path you&apos;re on.
          </p>
        </div>

        {mentors && mentors.length > 0 ? (
          <MentorDirectory mentors={mentors} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6F4F1]">
              <svg className="h-8 w-8 text-[#2BB5A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
            <h2 className="mt-4 text-base font-semibold text-[#1B3A2D]">No mentors yet</h2>
            <p className="mt-1.5 max-w-xs text-sm text-slate-500">
              Be the first to join as a mentor and help the next generation of medical students.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
