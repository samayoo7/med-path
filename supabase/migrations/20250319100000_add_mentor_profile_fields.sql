-- Make college_id, course, speciality nullable for mentors (mentees use them, mentors use ug/pg/super)
ALTER TABLE profiles ALTER COLUMN college_id DROP NOT NULL;
ALTER TABLE profiles ALTER COLUMN course DROP NOT NULL;

-- Mentor education and availability fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ug_college_id UUID REFERENCES colleges(id) ON DELETE RESTRICT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ug_course text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ug_year integer;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pg_college_id UUID REFERENCES colleges(id) ON DELETE RESTRICT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pg_course text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pg_specialty text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pg_year integer;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS super_college_id UUID REFERENCES colleges(id) ON DELETE RESTRICT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS super_course text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS super_specialty text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS super_year integer;

-- Preferred time slots (array of slot labels)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS time_slots text[] DEFAULT '{}';
