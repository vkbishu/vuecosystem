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
    <ProjectIdeas />
  </div>
</template>

<script setup>
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
</script>
