"use server";

import { createClient } from "@/lib/supabase/server";
import {
  menteeProfileSchema,
  mentorProfileSchema,
} from "@/lib/validations/profile";
import { redirect } from "next/navigation";

export async function upsertMenteeProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const raw = {
    display_name: formData.get("display_name") as string,
    college_id: formData.get("college_id") as string,
    course: formData.get("course") as string,
    speciality: (formData.get("speciality") as string) || undefined,
    bio: (formData.get("bio") as string) || undefined,
  };

  const parsed = menteeProfileSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { error: firstIssue?.message ?? "Invalid input" };
  }

  const { display_name, college_id, course, speciality, bio } = parsed.data;

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      display_name,
      college_id,
      course,
      speciality: speciality?.trim() || null,
      bio: bio || null,
      role: "mentee",
    },
    { onConflict: "user_id" }
  );

  if (error) {
    return { error: error.message };
  }

  redirect("/mentors");
}

export async function upsertMentorProfile(
  raw: Record<string, unknown>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const parsed = mentorProfileSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { error: firstIssue?.message ?? "Invalid input" };
  }

  const data = parsed.data;

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      display_name: data.display_name,
      college_id: null,
      course: null,
      speciality: null,
      bio: null,
      role: "mentor",
      ug_college_id: data.ug_college_id,
      ug_course: data.ug_course,
      ug_year: data.ug_year,
      pg_college_id: data.pg_college_id,
      pg_course: data.pg_course,
      pg_specialty: data.pg_specialty || null,
      pg_year: data.pg_year,
      super_college_id: data.super_college_id || null,
      super_course: data.super_course || null,
      super_specialty: data.super_specialty || null,
      super_year: data.super_year || null,
      time_slots: data.time_slots,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    return { error: error.message };
  }

  redirect("/mentors");
}
