import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const id = getRouterParam(event, "id");
  const table = "blogs";
  const columns = "*";

  const { data } = await client
    .from(table)
    .select(columns)
    .eq("id", id as string);
  return {
    data,
  };
});
