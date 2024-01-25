<script setup>
import { FormKitSchema } from "@formkit/vue";
definePageMeta({
  layout: "admin",
});

const confirm = useConfirm();
const toast = useToast();
const showModal = ref(false);
const editId = ref(null);
const editFormData = ref({});

const {
  data,
  pending,
  page,
  moduleName,
  getById,
  refresh,
  create,
  update,
  deleteData,
  formSchema,
  tableSchema,
} = await useBlogs();

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
</script>

<template>
  <div class="page flex flex-col gap-6">
    <div class="flex justify-between items-center">
      <div class="page-title text-3xl font-bold">{{ moduleName }}</div>
      <PrimeButton label="Add New" @click="addNew" />
    </div>
    <Card no-padding>
      <AdminDataTable
        :loading="pending"
        :value="data.data"
        :table-schema="tableSchema"
        @edit-record="edit"
        @delete-record="deleteRecord"
      />
    </Card>

    <PrimeToast />
    <PrimeConfirmDialog></PrimeConfirmDialog>

    <PrimeDialog
      v-model:visible="showModal"
      modal
      :header="`${editId === null ? 'Add' : 'Update'}`"
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
