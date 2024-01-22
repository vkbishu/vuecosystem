<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden"
    :class="{ 'p-4': !noPadding }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  noPadding: {
    type: Boolean,
    default: false,
  },
});
</script>
