import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const table = "blogs";
  const columns = "*";

  const { data } = await client.from(table).select(columns);
  return {
    data,
  };
});
