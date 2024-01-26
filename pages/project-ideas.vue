<template>
  <div class="container">
    <div class="flex justify-between mb-4">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <PrimeInputText v-model="term" placeholder="Search" />
      </span>
      <PrimeSelectButton
        v-model="level"
        :options="options"
        data-key="value"
        option-value="value"
        option-label="name"
        aria-labelledby="basic"
      />
    </div>
    <div class="tags flex gap-3 mb-4">
      <div class="font-semibold">Tags:</div>
      <PrimeTag
        v-for="tag in tags"
        :key="tag"
        :icon="selectedTags.includes(tag) ? 'pi pi-check' : ''"
        :severity="selectedTags.includes(tag) ? 'success' : 'info'"
        :value="tag"
        @click="applyFilter(tag)"
        class="cursor-pointer"
      ></PrimeTag>
    </div>
    <ProjectIdeasList :data="ideas" />
    <div class="grid grid-cols-5 gap-3 mt-3" v-if="pending">
      <ProjectIdeasLoading v-for="n in 10" />
    </div>
    <InfiniteLoading @infinite="loadData" />
  </div>
</template>

<script setup>
import InfiniteLoading from "v3-infinite-loading";
const level = ref("all");
const term = ref("");
const tags = ["vuejs", "tailwindcss", "supabase", "nuxtjs"];
const selectedTags = ref([]);
const options = ref([
  { name: "All", value: "all" },
  { name: "Beginner", value: "beginner" },
  { name: "Intermediate", value: "intermediate" },
  { name: "Expert", value: "expert" },
]);
const applyFilter = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((item) => item !== tag);
  } else {
    selectedTags.value = [...selectedTags.value, tag];
  }
};

let page = 1;
const per_page = 10;
const ideas = ref([]);
const pending = ref(false);

const loadData = ($state) => {
  pending.value = true;

  $fetch("/api/project-ideas", {
    method: "GET",
    params: {
      page,
      per_page,
    },
  }).then((res) => {
    if (!res.data || res.data < per_page) {
      $state.complete();
    } else {
      ideas.value = [...ideas.value, ...res.data];
      $state.loaded();
    }
    pending.value = false;
    page++;
  });
};
</script>
