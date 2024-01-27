<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 5,
  },
});
const { data: ideas, pending } = await useFetch(
  `/api/project-ideas?page=1&per_page=${props.count}`
);
</script>
<template>
  <div class="project-list">
    <template v-if="!pending">
      <ProjectIdeasList :data="ideas.data" v-if="!pending" />
    </template>
    <template v-else>
      <div class="grid grid-cols-none sm:grid-cols-5 gap-4">
        <ProjectIdeasLoading v-for="i in count" />
      </div>
    </template>
  </div>
</template>
