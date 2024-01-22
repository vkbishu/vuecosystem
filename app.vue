<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `VueCoSystem - ${titleChunk}` : "VueCoSystem";
  },
});
</script>

<style lang="postcss">
body {
  @apply bg-neutral-100;
}
</style>
