/**
 * Seed colleges from cleaned_colleges.json into Supabase.
 * Run: npm run seed:colleges [path-to-json]
 * Default path: ./cleaned_colleges.json (copy from Downloads if needed)
 *
 * Clears existing colleges before seeding. If profiles reference colleges, use:
 *   npm run seed:colleges -- --clear-profiles
 * (WARNING: --clear-profiles deletes all user profiles)
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local for delete/insert permission.
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const jsonPath =
  process.argv[2] || resolve(process.cwd(), "cleaned_colleges.json");

interface CollegeJson {
  index: number;
  collegeName: string;
  city: string;
  stateName: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key in env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const clearProfiles = process.argv.includes("--clear-profiles");

async function main() {
  if (clearProfiles) {
    console.log("Clearing profiles (required to clear colleges)...");
    const { error: profilesError } = await supabase.from("profiles").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (profilesError) {
      console.error("Failed to clear profiles:", profilesError.message);
      process.exit(1);
    }
    console.log("Profiles cleared.");
  }

  console.log("Clearing existing colleges...");
  const { error: deleteError } = await supabase
    .from("colleges")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    console.error(
      "Failed to clear colleges:",
      deleteError.message,
      "\n\nIf profiles reference colleges, run with --clear-profiles to remove profiles first (destructive)."
    );
    process.exit(1);
  }
  console.log("Colleges cleared.");

  const raw = readFileSync(jsonPath, "utf-8");
  const data: CollegeJson[] = JSON.parse(raw);

  const rows = data.map((c) => ({
    name: c.collegeName.trim(),
    city: c.city?.trim() || null,
    state_name: c.stateName?.trim() || null,
  }));

  const BATCH = 100;
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { data: result, error } = await supabase
      .from("colleges")
      .upsert(batch, { onConflict: "name", ignoreDuplicates: true })
      .select("id");

    if (error) {
      console.error("Batch error:", error);
      throw error;
    }
    inserted += result?.length ?? 0;
    skipped += batch.length - (result?.length ?? 0);
    process.stdout.write(`\rProcessed ${Math.min(i + BATCH, rows.length)}/${rows.length}`);
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped (duplicates): ${skipped}`);
}

main().catch(console.error);
