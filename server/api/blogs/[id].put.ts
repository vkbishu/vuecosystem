import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const id = getRouterParam(event, "id");
  const postData = await readBody(event);
  const table = "blogs";
  try {
    const { data } = await client
      .from(table)
      .update(postData as never)
      .eq("id", id as string)
      .select();
    return { data };
  } catch (err) {
    return {
      err,
    };
  }
});
