interface CrudConfig {
  table: string;
  api: string;
  page: any;
}

/**
 * CREATE, RED, UPDATE, DELETE Composable.
 * @param config
 * @returns
 */
export const useCrud = async (config: CrudConfig) => {
  const { table, api, page } = config;
  /**
   *  Read Data
   */
  const { data, pending, refresh } = await useAsyncData(
    table,
    async () => {
      return await $fetch(api);
    },
    { watch: [page] }
  );

  /**
   *  Create Data
   */
  const create = async (formData: any) => {
    await $fetch(api, {
      method: "POST",
      body: formData,
    });
  };

  /**
   *  Create Data
   */
  const getById = async (id: number | string) => {
    const { data } = await $fetch(`${api}/${id}`);
    return data;
  };

  /**
   *  Update Data
   */
  const update = async (formData: any, id: string | number) => {
    await $fetch(`${api}/${id}`, {
      method: "PUT",
      body: formData,
    });
  };

  /**
   *  Delete Data
   */
  const deleteData = async (id: string | number) => {
    try {
      await $fetch(`${api}/${id}`, {
        method: "DELETE",
      });
      return true;
    } catch (err) {
      return err;
    }
  };

  return {
    data,
    pending,
    getById,
    refresh,
    create,
    update,
    deleteData,
  };
};
