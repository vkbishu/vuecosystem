<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Array,
  },
  rows: {
    type: Number,
    default: 20,
  },
  tableSchema: {
    type: Array,
  },
  primaryKey: {
    type: String,
    default: "id",
  },
});

const emit = defineEmits(["edit-record", "delete-record"]);
</script>
<template>
  <PrimeDataTable
    :value="value"
    :loading="loading"
    paginator
    :rows="rows"
    :rowsPerPageOptions="[10, 20, 50, 100]"
    tableStyle="min-width: 50rem"
  >
    <template v-for="col in tableSchema">
      <PrimeColumn
        v-if="col?.type === 'action'"
        :header="col.header"
        :pt="col.pt"
      >
        <template #body="{ data }">
          <div class="flex justify-center">
            <PrimeButton
              @click="emit('edit-record', data[primaryKey])"
              aria-label="Edit"
              text
            >
              <template #icon>
                <Icon name="bxs:edit" />
              </template>
            </PrimeButton>

            <PrimeButton
              @click="emit('delete-record', data[primaryKey])"
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
      <PrimeColumn
        v-else-if="col?.type === 'image'"
        :field="col.field"
        :header="col.header"
      >
        <template #body="slotProps">
          <img
            :src="`https://primefaces.org/cdn/primevue/images/product/blue-t-shirt.jpg`"
            class="w-20 shadow-lg rounded-md"
          />
        </template>
      </PrimeColumn>
      <PrimeColumn v-else :field="col.field" :header="col.header"></PrimeColumn>
    </template>
  </PrimeDataTable>
</template>
