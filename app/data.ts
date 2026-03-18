export const NAVY = "#1A3C5E";
export const SKY = "#2E75B6";
export const SOFT_BG = "#EBF2FA";

export const mentorCards = [
  {
    name: "Dr. Ananya Rao",
    specialty: "MD Medicine Resident",
    college: "AIIMS Delhi",
    course: "PG · 2nd Year",
    available: true,
    color: "bg-sky-500",
  },
  {
    name: "Dr. Karthik Menon",
    specialty: "DM Cardiology",
    college: "CMC Vellore",
    course: "DM · 1st Year",
    available: true,
    color: "bg-emerald-500",
  },
  {
    name: "Dr. Sneha Iyer",
    specialty: "MS Ophthalmology",
    college: "KMC Manipal",
    course: "MS · Senior Resident",
    available: false,
    color: "bg-indigo-500",
  },
] as const;

export const heroAvatars = [
  {
    id: "PS",
    initials: "PS",
    color: "#2BB5A0",
    tooltip: "MS Surgery, AIIMS",
    wrapperPosition: "top-16 left-[5%]",
    arrowPosition: "-bottom-9 -right-2",
    rotateDeg: 135,
    delay: 0,
  },
  {
    id: "AR",
    initials: "AR",
    color: "#4BA3E3",
    tooltip: "DM Cardiology, PGIMER",
    wrapperPosition: "top-8 right-[5%]",
    arrowPosition: "-bottom-9 -left-2",
    rotateDeg: 225,
    delay: 0.8,
  },
  {
    id: "DK",
    initials: "DK",
    color: "#1B3A2D",
    tooltip: "MD Medicine, JIPMER",
    wrapperPosition: "bottom-32 left-[7%]",
    arrowPosition: "-bottom-9 -right-2",
    rotateDeg: 45,
    delay: 1.4,
  },
  {
    id: "SM",
    initials: "SM",
    color: "#7BC67A",
    tooltip: "MS Ophthalmology, KMC",
    wrapperPosition: "bottom-20 right-[6%]",
    arrowPosition: "-bottom-9 -left-2",
    rotateDeg: 315,
    delay: 2.1,
  },
] as const;

export const featureCards = [
  {
    title: "Mentor Directory",
    description:
      "Search seniors by specialty, college, exam, or course — and see who is actually available.",
    badge: "Browse seniors",
  },
  {
    title: "Connection Requests",
    description:
      "Send a short context note and let seniors accept on their terms — no awkward cold DMs.",
    badge: "1:1 requests",
  },
  {
    title: "Real-time Chat",
    description:
      "Focused, private threads for each big decision — from branch choice to exam strategy.",
    badge: "Private threads",
  },
  {
    title: "Privacy First",
    description:
      "Only your name, college, and course are visible by default. No phone numbers, ever.",
    badge: "Minimal profile",
  },
] as const;

export const courseTags = [
  "MBBS Y1–Y4",
  "Internship",
  "NEET PG Prep",
  "MD/MS",
  "INI-CET",
  "DM/MCh",
  "Fellowship",
  "Research",
  "Work-Life Balance",
  "Clinical vs Non-Clinical",
] as const;

export const howItWorksSteps = [
  {
    title: "Create your profile",
    description: "Just your name and college. That's it.",
  },
  {
    title: "Find your senior",
    description: "Browse by specialty, college, or course.",
  },
  {
    title: "Start the conversation",
    description: "Chat directly. Free, forever.",
  },
] as const;

export const menteeFeatures = [
  "Browse by Specialty & College",
  "Send a Connection Request",
  "Real-time Chat",
  "Completely Free",
  "Privacy First — no phone number, no government ID",
  "For Every Course — MBBS to Super Specialty",
] as const;

export const mentorFeatures = [
  "Set your own availability",
  "Choose who you talk to",
  "Build your reputation",
] as const;

export const stats = [
  { label: "Mentors", value: 500, suffix: "+", description: "across India" },
  { label: "Specialties", value: 15, suffix: "+", description: "and growing" },
  { label: "Fee", value: 0, suffix: "₹", description: "Free forever" },
] as const;

export const testimonials = [
  {
    name: "Priya",
    role: "3rd Year MBBS",
    college: "AIIMS Delhi",
    quote:
      "I had no idea which specialty suited me. One conversation with a Surgery resident changed everything.",
  },
  {
    name: "Arjun",
    role: "Final Year MBBS",
    college: "KMC Manipal",
    quote:
      "MedPath connected me with an MS Orthopaedics senior for free. Paid platforms wanted ₹1500 for the same.",
  },
  {
    name: "Dr. Sneha",
    role: "MS Ophthalmology",
    college: "Tertiary Care Govt Hospital",
    quote:
      "I get 3–4 juniors a week now. It's organised and completely on my terms.",
  },
] as const;

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Mentors", href: "#for-mentors" },
] as const;

export const trustedColleges = [
  "AIIMS",
  "JIPMER",
  "KMC Manipal",
  "MAMC",
  "Grant Medical",
  "PGIMER",
] as const;
