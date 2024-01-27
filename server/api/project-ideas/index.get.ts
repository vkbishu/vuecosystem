import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const table = "project_ideas";
  const columns = "*";
  const query = getQuery(event);
  const filter = query.filter ? JSON.parse(query.filter as string) : null;
  const page = parseInt(query.page ?? "1") as number;
  const limit = parseInt(query.per_page ?? "10") as number;
  const offset = (page - 1) * limit;
  const offsetLimit = limit + offset - 1;

  const dbQuery = client.from(table).select(columns);

  if (filter) {
    if (filter.term) {
      dbQuery.ilike("name", `%${filter.term}%`);
    }
    if (filter.level !== "all") {
      dbQuery.eq("exp_level", filter.level);
    }
    if (filter.tag) {
      dbQuery.ilike("tags", `%${filter.tag}%`);
    }
  }

  const { data } = await dbQuery
    .range(offset, offsetLimit)
    .order("created_at", { ascending: false });
  // const { data } = await client
  //   .from(table)
  //   .select(columns)
  //   .range(offset, offsetLimit) // counting start from 0
  //   .order("created_at", { ascending: false });

  return { data };
});
