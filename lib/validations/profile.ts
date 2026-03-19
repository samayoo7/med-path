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
