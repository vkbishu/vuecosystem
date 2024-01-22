import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const id = getRouterParam(event, "id");
  const table = "project_ideas";

  try {
    const { data } = await client
      .from(table)
      .delete()
      .eq("id", id as string);
    return {
      data,
    };
  } catch (err) {
    return {
      err,
    };
  }
});
