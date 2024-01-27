<template>
  <div class="container">
    <div class="grid grid-col-1 md:grid-cols-6 gap-4">
      <div class="col-span-4">
        <Card>
          <h1 class="text-2xl font-semibold mb-2">{{ data.name }}</h1>
          <div class="text-slate-400 mb-4">{{ data.tags }}</div>
          <img
            src="https://placehold.co/800x400"
            alt=""
            class="w-full rounded"
          />

          <div class="pt-4">
            <p>{{ data.description }}</p>
          </div>
        </Card>
      </div>
      <div class="col-span-2">
        <Card title="Project submits">
          <h1>{{ data.name }}</h1>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getDataById } = useProjectIdeas();
const route = useRoute();
const ID = route.params.id;
const { data } = await useAsyncData(`project_id/${ID}`, async () => {
  return await getDataById(ID);
});
</script>
