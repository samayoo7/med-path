-- Allow anonymous users to search colleges (for onboarding before full auth)
CREATE POLICY "Colleges are viewable by anon for search"
  ON colleges FOR SELECT
  TO anon
  USING (true);
