<template>
  <section class="container mb-12">
    <div class="text-xl font-semibold mb-4">{{ title }}</div>
    <slot></slot>
  </section>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
