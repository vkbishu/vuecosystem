/**
 *  Project Idea Form
 *
 */
export const useProjectIdea = async () => {
  const page = ref(1);
  const moduleName = "Project Ideas";

  const { data, pending, getById, refresh, create, update, deleteData } =
    await useCrud({
      table: "project_ideas",
      api: "/api/project-ideas",
      page,
    });

  const formSchema = [
    {
      $formkit: "text",
      name: "name",
      label: "Name",
      validation: "required",
    },
    {
      $formkit: "textarea",
      name: "description",
      label: "Description",
    },
    {
      $formkit: "text",
      name: "tags",
      label: "Tags",
      validation: "required",
    },
  ];

  const tableSchema = [
    { field: "name", header: "Name" },
    { field: "image", header: "Image", type: "image" },
    { field: "tags", header: "Tags" },
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
