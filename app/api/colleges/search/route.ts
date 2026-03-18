import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const MIN_QUERY_LENGTH = 3;
const MAX_RESULTS = 15;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < MIN_QUERY_LENGTH) {
    return NextResponse.json(
      { error: `Query must be at least ${MIN_QUERY_LENGTH} characters` },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("colleges")
    .select("id, name, city, state_name")
    .ilike("name", `%${q}%`)
    .order("name")
    .limit(MAX_RESULTS);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = data.map((row) => ({
    id: row.id,
    collegeName: row.name,
    city: row.city ?? "",
    stateName: row.state_name ?? "",
  }));

  return NextResponse.json(results);
}
