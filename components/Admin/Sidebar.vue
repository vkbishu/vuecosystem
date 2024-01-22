<script setup>
const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-palette",
    route: "/admin/dashboard",
  },
  {
    label: "Project Ideas",
    icon: "pi pi-palette",
    route: "/admin/project-ideas",
  },
]);
</script>
<template>
  <div class="sidebar fixed inset-0 h-screen bg-white w-72 shadow pt-16 z-10">
    <!-- sidebar menu items -->
    <div class="m-2">
      <PrimeMenu
        :model="items"
        :pt="{
          root: { class: 'border-0' },
          content: { class: 'hover:rounded-lg' },
        }"
      >
        <template #item="{ item, props }">
          <NuxtLink
            v-slot="{ href, navigate, isActive, isExactActive }"
            :to="item.route"
            custom
          >
            <a
              v-ripple
              :class="{
                'bg-primary text-white font-semibold rounded-lg': isActive,
              }"
              :href="href"
              v-bind="props.action"
              @click="navigate"
            >
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </NuxtLink>
        </template>
      </PrimeMenu>
    </div>
  </div>
</template>
