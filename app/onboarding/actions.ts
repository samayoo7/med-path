"use server";

import { createClient } from "@/lib/supabase/server";
import { menteeProfileSchema, type MenteeProfileInput } from "@/lib/validations/profile";
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
