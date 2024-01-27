// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "VueCoSystem",
      meta: [
        // <meta name="description" content="My amazing site">
        { name: "description", content: "Vuecosystem" },
      ],
    },
  },
  routeRules: {
    // Admin dashboard renders only on client-side
    "/admin/**": { ssr: false },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "nuxt-icon",
    "nuxt-primevue",
    "@formkit/nuxt",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
  ],
  tailwindcss: {},
  headlessui: {
    prefix: "Headless",
  },
  primevue: {
    /* Options */
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      prefix: "Prime",
    },
  },
  css: ["primevue/resources/themes/lara-light-green/theme.css"],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
});
