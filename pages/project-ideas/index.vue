<template>
  <div class="container">
    <div class="flex justify-between mb-4">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <PrimeInputText v-model="filter.term" placeholder="Search" />
      </span>
      <PrimeSelectButton
        v-model="filter.level"
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
        :icon="filter.tag === tag ? 'pi pi-check' : ''"
        :severity="filter.tag === tag ? 'success' : 'info'"
        :value="tag"
        @click="applyFilter(tag)"
        class="cursor-pointer"
      ></PrimeTag>
    </div>
    <ProjectIdeasList :data="ideas" />
    <div class="grid grid-cols-5 gap-3 mt-3" v-if="pending">
      <ProjectIdeasLoading v-for="n in 10" />
    </div>
    <InfiniteLoading @infinite="loadData" :key="pKey">
      <template #complete>
        <div class="text-slate-300 p-3 text-center">No more records</div>
      </template>
    </InfiniteLoading>
  </div>
</template>

<script setup>
import InfiniteLoading from "v3-infinite-loading";
// const level = ref("all");
// const term = ref("");
const tags = ["vuejs", "tailwindcss", "supabase", "nuxtjs"];
//const selectedTags = ref([]);
const options = ref([
  { name: "All", value: "all" },
  { name: "Beginner", value: "beginner" },
  { name: "Intermediate", value: "intermediate" },
  { name: "Expert", value: "expert" },
]);
const applyFilter = (tag) => {
  // if (filter.value.selectedTags.includes(tag)) {
  //   filter.value.selectedTags = filter.value.selectedTags.filter(
  //     (item) => item !== tag
  //   );
  // } else {
  //   filter.value.selectedTags = [...filter.value.selectedTags, tag];
  // }
  if (filter.value.tag === tag) {
    filter.value.tag = "";
  } else {
    filter.value.tag = tag;
  }
};

const filter = ref({
  term: "",
  level: "all",
  selectedTags: [],
  tag: "",
});

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
      filter: filter.value,
    },
  }).then((res) => {
    if (!res.data || res.data < per_page) {
      $state && $state.complete();
    } else {
      ideas.value = [...ideas.value, ...res.data];
      $state && $state.loaded();
    }
    pending.value = false;
    page++;
  });
};

const pKey = ref(Date.now());

const debouncedLoadData = useDebounceFn(() => {
  ideas.value = [];
  page = 1;
  pKey.value++;
}, 500);

watch(filter, debouncedLoadData, { deep: true });
</script>
