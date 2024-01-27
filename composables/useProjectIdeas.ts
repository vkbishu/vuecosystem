export const useProjectIdeas = () => {
  const client = useSupabaseClient();
  const data = ref([]);
  const pending = ref(false);

  const loadData = async () => {
    const { data } = await client.from("project_ideas").select("*");
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
