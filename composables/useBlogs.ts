/**
 *  Blogs
 *
 */
export const useBlogs = async () => {
  const page = ref(1);
  const moduleName = "Blogs";
  const table = "blogs";
  const api = "/api/blogs";

  const { data, pending, getById, refresh, create, update, deleteData } =
    await useCrud({
      table,
      api,
      page,
    });

  const formSchema = [
    {
      $formkit: "text",
      name: "title",
      label: "Title",
      validation: "required",
    },
    {
      $formkit: "textarea",
      name: "description",
      label: "Description",
    },
  ];

  const tableSchema = [
    { field: "title", header: "Title" },
    { field: "description", header: "Description" },
    {
      field: "action",
      header: "Action",
      type: "action",
      pt: { headerContent: { class: "justify-center" } },
    },
  ];

  return {
    formSchema,
    tableSchema,
    data,
    page,
    pending,
    moduleName,
    getById,
    refresh,
    create,
    update,
    deleteData,
  };
};
