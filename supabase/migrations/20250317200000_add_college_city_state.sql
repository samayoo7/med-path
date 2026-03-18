-- Add city and state_name to colleges (for cleaned_colleges.json structure)
ALTER TABLE colleges
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS state_name TEXT;
