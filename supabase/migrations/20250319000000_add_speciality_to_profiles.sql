-- Add speciality column to profiles (nullable, since MBBS has no specialties)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS speciality text;
