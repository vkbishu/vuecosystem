<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden"
    :class="{ 'p-4': !noPadding }"
  >
    <div v-if="title" class="text-xl font-semibold mb-4">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  noPadding: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
});
</script>
