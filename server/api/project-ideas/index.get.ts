import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const table = "project_ideas";
  const columns = "*";
  const query = getQuery(event);
  const page = parseInt(query.page ?? "1") as number;
  const limit = parseInt(query.per_page ?? "10") as number;
  const offset = (page - 1) * limit;
  const offsetLimit = limit + offset - 1;

  const { data } = await client
    .from(table)
    .select(columns)
    .range(offset, offsetLimit) // counting start from 0
    .order("created_at", { ascending: false });

  return { data, offset, limit };
});
