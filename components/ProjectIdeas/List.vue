<script setup>
defineProps({
  data: {
    type: Array,
  },
});
</script>
<template>
  <div class="grid grid-cols-none sm:grid-cols-5 gap-4">
    <Card no-padding v-for="idea in data" :key="idea.id">
      <div class="">
        <div>
          <NuxtLink :to="`/project-ideas/${idea.id}`">
            <img
              src="https://via.placeholder.com/300x200"
              alt=""
              class="w-full"
            />
          </NuxtLink>
        </div>
        <div class="p-4 flex flex-col justify-between gap-2">
          <NuxtLink :to="`/project-ideas/${idea.id}`">
            <div class="font-bold line-clamp-2">
              {{ idea.name }}
            </div>
          </NuxtLink>
          <div class="text-slate-500 text-sm line-clamp-3">
            {{ idea.tags }}
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
