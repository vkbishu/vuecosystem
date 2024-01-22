<script setup>
import { FormKitSchema } from "@formkit/vue";
definePageMeta({
  layout: "admin",
});

const confirm = useConfirm();
const toast = useToast();

const page = ref(1);
const showModal = ref(false);
const editId = ref(null);
const editFormData = ref({});

const { data, pending, getById, refresh, create, update, deleteData } =
  await useCrud({
    table: "project_ideas",
    api: "/api/project-ideas",
    page,
  });

const addNew = () => {
  editId.value = null;
  showModal.value = true;
  editFormData.value = {};
};

const handleSubmit = async (postData) => {
  try {
    if (editId.value) {
      // update
      await update(postData, editId.value);
    } else {
      await create(postData);
    }
    showModal.value = false;
    refresh();
  } catch (err) {
    console.log(err);
  }
};

const deleteRecord = (id) => {
  confirm.require({
    message: "Are you sure you want to delete?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      try {
        await deleteData(id);
        refresh();
        toast.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Record deleted",
          life: 3000,
        });
      } catch (err) {
        toast.add({
          severity: "danger",
          summary: "Error",
          detail: "Something went wrong",
          life: 3000,
        });
      }
    },
    reject: () => {},
  });
};

const edit = async (id) => {
  try {
    editId.value = id;
    showModal.value = true;
    const res = await getById(id);
    const [data] = res;
    editFormData.value = { ...data };
  } catch (err) {
    console.log(err);
  }
};

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
</script>

<template>
  <div class="page flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <div class="page-title text-3xl font-bold">Project Ideas</div>
      <PrimeButton label="Add New" @click="addNew" />
    </div>
    <Card no-padding>
      <PrimeDataTable
        :value="data.value.data"
        :loading="pending"
        paginator
        :rows="20"
        :rowsPerPageOptions="[10, 20, 50, 100]"
        tableStyle="min-width: 50rem"
      >
        <PrimeColumn field="name" header="Name"></PrimeColumn>
        <PrimeColumn field="image" header="Image">
          <template #body="slotProps">
            <img
              :src="`https://primefaces.org/cdn/primevue/images/product/blue-t-shirt.jpg`"
              class="w-20 shadow-lg rounded-md"
            />
          </template>
        </PrimeColumn>
        <PrimeColumn field="tags" header="Tags"></PrimeColumn>
        <PrimeColumn
          header="Action"
          :pt="{ headerContent: { class: 'justify-center' } }"
        >
          <template #body="{ data }">
            <div class="flex justify-center">
              <PrimeButton @click="edit(data.id)" aria-label="Edit" text>
                <template #icon>
                  <Icon name="bxs:edit" />
                </template>
              </PrimeButton>

              <PrimeButton
                @click="deleteRecord(data.id)"
                aria-label="Delete"
                severity="danger"
                text
              >
                <template #icon>
                  <Icon name="bxs:trash" />
                </template>
              </PrimeButton>
            </div>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </Card>

    <PrimeToast />
    <PrimeConfirmDialog></PrimeConfirmDialog>

    <PrimeDialog
      v-model:visible="showModal"
      modal
      :header="`${editId === null ? 'Add' : 'Update'} Idea`"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <FormKit
        type="form"
        :submit-label="`${editId === null ? 'Add' : 'Save'}`"
        @submit="handleSubmit"
        v-model="editFormData"
      >
        <FormKitSchema :schema="formSchema" />
      </FormKit>
    </PrimeDialog>
  </div>
</template>
