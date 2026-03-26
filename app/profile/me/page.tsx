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

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(`
      id,
      display_name,
      course,
      speciality,
      bio,
      role,
      college_id,
      colleges!college_id (
        name,
        city,
        state_name
      )
    `)
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    if (profileError && profileError.code !== "PGRST116") {
      throw new Error(`Failed to load profile: ${profileError.message}`);
    }
    redirect("/onboarding");
  }

  // Fetch mentor-specific columns separately (requires migration to be applied)
  let mentorData: {
    ug_college_id?: string | null;
    ug_course?: string | null;
    ug_year?: number | null;
    pg_college_id?: string | null;
    pg_course?: string | null;
    pg_specialty?: string | null;
    pg_year?: number | null;
    super_college_id?: string | null;
    super_course?: string | null;
    super_specialty?: string | null;
    super_year?: number | null;
    time_slots?: string[] | null;
  } | null = null;

  if (profile.role === "mentor") {
    const { data: mData } = await supabase
      .from("profiles")
      .select(`
        ug_college_id,
        ug_course,
        ug_year,
        pg_college_id,
        pg_course,
        pg_specialty,
        pg_year,
        super_college_id,
        super_course,
        super_specialty,
        super_year,
        time_slots
      `)
      .eq("user_id", user.id)
      .single();
    mentorData = mData;
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

  // Fetch mentor college names if mentor
  let ugCollegeName: string | null = null;
  let pgCollegeName: string | null = null;
  let superCollegeName: string | null = null;
  if (profile.role === "mentor" && mentorData) {
    const ids = [mentorData.ug_college_id, mentorData.pg_college_id, mentorData.super_college_id].filter(Boolean) as string[];
    if (ids.length > 0) {
      const { data: mentorColleges } = await supabase
        .from("colleges")
        .select("id, name")
        .in("id", ids);
      const map = new Map((mentorColleges ?? []).map((c) => [c.id, c.name]));
      ugCollegeName = mentorData.ug_college_id ? map.get(mentorData.ug_college_id) ?? null : null;
      pgCollegeName = mentorData.pg_college_id ? map.get(mentorData.pg_college_id) ?? null : null;
      superCollegeName = mentorData.super_college_id ? map.get(mentorData.super_college_id) ?? null : null;
    }
  }

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
          <p className="text-xs text-slate-400">{user.email}</p>
          <span className="mt-2 rounded-full bg-[#E6F4F1] px-3 py-0.5 text-xs font-medium capitalize text-[#1B3A2D]">
            {profile.role}
          </span>
        </div>

        {/* Info cards - mobile-friendly touch targets */}
        <div className="space-y-3">
          {profile.role === "mentee" ? (
            <>
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
                  {profile.course ?? "—"}
                </p>
              </div>
              {profile.speciality && (
                <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Speciality
                  </p>
                  <p className="mt-1 text-[15px] font-medium text-[#1B3A2D]">
                    {profile.speciality}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-md bg-[#E6F4F1] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1B3A2D]">UG</span>
                  <span className="text-[11px] font-medium text-slate-400">MBBS</span>
                </div>
                <p className="text-[15px] font-semibold text-[#1B3A2D]">{ugCollegeName ?? "—"}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  {mentorData?.ug_course && (
                    <span className="text-[13px] text-slate-500">{mentorData.ug_course}</span>
                  )}
                  {mentorData?.ug_year && (
                    <span className="text-[13px] text-slate-400">Batch of {mentorData.ug_year}</span>
                  )}
                </div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-md bg-[#EEF2FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#3730A3]">PG</span>
                  {mentorData?.pg_specialty && (
                    <span className="text-[11px] font-medium text-slate-400">{mentorData.pg_specialty}</span>
                  )}
                </div>
                <p className="text-[15px] font-semibold text-[#1B3A2D]">{pgCollegeName ?? "—"}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  {mentorData?.pg_course && (
                    <span className="text-[13px] text-slate-500">{mentorData.pg_course}</span>
                  )}
                  {mentorData?.pg_year && (
                    <span className="text-[13px] text-slate-400">Batch of {mentorData.pg_year}</span>
                  )}
                </div>
              </div>
              {(mentorData?.super_college_id || mentorData?.super_course || mentorData?.super_specialty) && (
                <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-md bg-[#FDF4FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7E22CE]">Super</span>
                    {mentorData?.super_specialty && (
                      <span className="text-[11px] font-medium text-slate-400">{mentorData.super_specialty}</span>
                    )}
                  </div>
                  <p className="text-[15px] font-semibold text-[#1B3A2D]">{superCollegeName ?? "—"}</p>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    {mentorData?.super_course && (
                      <span className="text-[13px] text-slate-500">{mentorData.super_course}</span>
                    )}
                    {mentorData?.super_year && (
                      <span className="text-[13px] text-slate-400">Batch of {mentorData.super_year}</span>
                    )}
                  </div>
                </div>
              )}
              {mentorData?.time_slots && mentorData.time_slots.length > 0 && (
                <div className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Preferred time slots
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mentorData.time_slots.map((slot) => (
                      <span
                        key={slot}
                        className="rounded-full bg-[#E6F4F1] px-3 py-1 text-[13px] font-medium text-[#1B3A2D]"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

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
