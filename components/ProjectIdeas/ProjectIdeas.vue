<script setup>
// const { data: ideas, pending } = await useAsyncData(
//   "project_ideas",
//   async () => {
//     return $fetch("/api/project-ideas");
//   }
// );
const { data: ideas, pending } = await useFetch("/api/project-ideas");
</script>
<template>
  <div class="grid grid-cols-none sm:grid-cols-5 gap-4" v-if="!pending">
    <Card no-padding v-for="idea in ideas.data" :key="idea.id">
      <div class="">
        <div>
          <img
            src="https://via.placeholder.com/300x200"
            alt=""
            class="w-full"
          />
        </div>
        <div class="p-4 flex flex-col justify-between gap-2">
          <div class="font-bold line-clamp-2">
            {{ idea.name }}
          </div>
          <div class="text-slate-500 text-sm line-clamp-3">
            {{ idea.tags }}
          </div>
        </div>
      </div>
    </Card>
  </div>
  <div v-else>Loading...</div>
</template>
