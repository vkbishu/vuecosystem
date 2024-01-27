<template>
  <section class="container mb-12">
    <div class="mb-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-2xl font-semibold">{{ title }}</div>
          <div v-if="description" class="text-slate-500 mt-2">
            {{ description }}
          </div>
        </div>
        <slot name="action"></slot>
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
