import { z } from "zod";

const COURSE_VALUES = ["MBBS", "Diploma", "MD/MS/DNB", "DM/M.Ch./DRNB"] as const;

export const COURSES = COURSE_VALUES.map((value, index) => ({
  order: index + 1,
  value,
})) as { order: number; value: (typeof COURSE_VALUES)[number] }[];

export const SPECIALITIES: Record<(typeof COURSE_VALUES)[number], string[]> = {
  MBBS: [],
  Diploma: [
    "Anesthesia",
    "Child Health",
    "Obstetrics & Gynecology",
    "Orthopedics",
    "Ophthalmology",
    "ENT",
    "Dermatology",
    "Public Health",
    "Radiology",
    "Tuberculosis & Chest Diseases",
    "Psychiatry",
    "Emergency Medicine",
    "Clinical Pathology",
  ],
  "MD/MS/DNB": [
    "General Medicine",
    "Pediatrics",
    "Dermatology",
    "Psychiatry",
    "Radiology",
    "Anesthesia",
    "Pathology",
    "Microbiology",
    "Pharmacology",
    "Forensic Medicine",
    "Community Medicine",
    "Biochemistry",
    "Physiology",
    "Emergency Medicine",
    "Respiratory Medicine",
    "General Surgery",
    "Orthopedics",
    "Obstetrics & Gynecology",
    "Ophthalmology",
    "ENT",
  ],
  "DM/M.Ch./DRNB": [
    "Cardiology",
    "Neurology",
    "Gastroenterology",
    "Nephrology",
    "Endocrinology",
    "Medical Oncology",
    "Clinical Hematology",
    "Pulmonary Medicine",
    "Rheumatology",
    "Infectious Diseases",
    "Neonatology",
    "Critical Care Medicine",
    "Cardiothoracic Surgery",
    "Neurosurgery",
    "Urology",
    "Plastic Surgery",
    "Pediatric Surgery",
    "Surgical Oncology",
    "Vascular Surgery",
    "Gastrointestinal Surgery",
  ],
};

export const menteeProfileSchema = z
  .object({
    display_name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be under 50 characters")
      .trim(),
    college_id: z.string().uuid("Please select a college"),
    course: z.enum(COURSE_VALUES, { message: "Please select your course" }),
    speciality: z.string().optional().or(z.literal("")),
    bio: z
      .string()
      .max(500, "Bio must be under 500 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.course === "MBBS") return true;
      return !!data.speciality?.trim();
    },
    { message: "Please select your speciality", path: ["speciality"] }
  );

export type MenteeProfileInput = z.infer<typeof menteeProfileSchema>;

// Mentor-specific: UG is typically MBBS, PG is Diploma/MD/MS, Super is DM/M.Ch.
export const UG_COURSES = ["MBBS"] as const;
export const PG_COURSES = ["Diploma", "MD/MS/DNB"] as const;
export const SUPER_COURSES = ["DM/M.Ch./DRNB"] as const;

export const TIME_SLOTS = [
  "Weekday mornings (9am–12pm)",
  "Weekday afternoons (2pm–6pm)",
  "Weekday evenings (6pm–9pm)",
  "Weekend mornings",
  "Weekend afternoons",
  "Flexible / On demand",
] as const;

const currentYear = new Date().getFullYear();
export const YEAR_OPTIONS = Array.from({ length: 35 }, (_, i) =>
  String(currentYear - 34 + i)
).reverse();

export const mentorProfileSchema = z.object({
  display_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters")
    .trim(),
  // UG
  ug_college_id: z.string().uuid("Please select UG college"),
  ug_course: z.enum(UG_COURSES, { message: "Please select UG course" }),
  ug_year: z.coerce.number().min(1990).max(2030),
  // PG
  pg_college_id: z.string().uuid("Please select PG college"),
  pg_course: z.enum(PG_COURSES, { message: "Please select PG course" }),
  pg_specialty: z.string().optional().or(z.literal("")),
  pg_year: z.coerce.number().min(1990).max(2030),
  // Super specialty — all optional, but conditional validation handled in the form
  super_college_id: z.string().uuid("Please select Super specialty college").optional().or(z.literal("")),
  super_course: z.enum(SUPER_COURSES, { message: "Please select Super specialty course" }).optional().or(z.literal("")),
  super_specialty: z.string().optional().or(z.literal("")),
  super_year: z.coerce.number().min(1990).max(2030).optional().or(z.literal("")),
  // Time slots
  time_slots: z
    .array(z.string())
    .min(1, "Please select at least one time slot"),
});

export type MentorProfileInput = z.infer<typeof mentorProfileSchema>;
