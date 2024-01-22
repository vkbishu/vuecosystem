<template>
  <section class="container mb-12">
    <div class="mb-4">
      <div class="text-2xl font-semibold">{{ title }}</div>
      <div v-if="description" class="text-slate-500 mt-2">
        {{ description }}
      </div>
    </div>
    <slot></slot>
  </section>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
  },
});
</script>
