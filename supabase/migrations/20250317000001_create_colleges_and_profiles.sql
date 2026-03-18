-- Colleges (seeded) - Indian medical colleges
CREATE TABLE IF NOT EXISTS colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;

-- Colleges are read-only for all authenticated users
CREATE POLICY "Colleges are viewable by authenticated users"
  ON colleges FOR SELECT
  TO authenticated
  USING (true);

-- Profiles - links to auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  display_name TEXT NOT NULL,
  college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE RESTRICT,
  stage TEXT NOT NULL,
  bio TEXT,
  role TEXT NOT NULL DEFAULT 'mentee' CHECK (role IN ('mentee', 'mentor')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own profile (onboarding)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Profiles are viewable by other authenticated users (for mentor directory)
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Seed colleges
INSERT INTO colleges (name) VALUES
  ('AIIMS Delhi'),
  ('AIIMS Bhopal'),
  ('AIIMS Bhubaneswar'),
  ('AIIMS Jodhpur'),
  ('AIIMS Nagpur'),
  ('AIIMS Raipur'),
  ('AIIMS Rishikesh'),
  ('JIPMER'),
  ('KMC Manipal'),
  ('KMC Mangalore'),
  ('MAMC Delhi'),
  ('Grant Medical College Mumbai'),
  ('PGIMER Chandigarh'),
  ('CMC Vellore'),
  ('Lady Hardinge Medical College'),
  ('Maulana Azad Medical College'),
  ('Seth GS Medical College Mumbai'),
  ('Other')
ON CONFLICT (name) DO NOTHING;
