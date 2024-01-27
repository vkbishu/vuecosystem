/**
 * Project ideas composables
 *
 * @returns object
 */
export const useProjectIdeas = () => {
  const client = useSupabaseClient();
  const data = ref([]);
  const pending = ref(false);

  const loadData = async ({ filter, page = 1, limit = 10 }: any) => {
    const offset = (page - 1) * limit;
    const offsetLimit = limit + offset - 1;
    const dbQuery = client.from("project_ideas").select("*");
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

    return data;
  };

  const getDataById = async (id: string) => {
    const { data } = await client
      .from("project_ideas")
      .select("*")
      .eq("id", id)
      .single();
    return data;
  };

  return {
    data,
    pending,
    loadData,
    getDataById,
  };
};
