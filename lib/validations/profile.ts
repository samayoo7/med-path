import { z } from "zod";

const COURSE_VALUES = ["MBBS", "Diploma", "MD/MS/DNB", "DM/M.Ch./DRNB"] as const;

export const COURSES = COURSE_VALUES.map((value, index) => ({
  order: index + 1,
  value,
})) as { order: number; value: (typeof COURSE_VALUES)[number] }[];

export const menteeProfileSchema = z.object({
  display_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters")
    .trim(),
  college_id: z.string().uuid("Please select a college"),
  course: z.enum(COURSE_VALUES, { message: "Please select your course" }),
  bio: z
    .string()
    .max(500, "Bio must be under 500 characters")
    .optional()
    .or(z.literal("")),
});

export type MenteeProfileInput = z.infer<typeof menteeProfileSchema>;
