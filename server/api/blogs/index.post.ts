import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);
  const postData = await readBody(event);
  const table = "blogs";

  try {
    const { data } = await client.from(table).insert(postData).select();
    return data;
  } catch (err) {
    return err;
  }
});
