import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jotap.land",
  /* `side-projects` and `study-cases` are one `/work` section now. */
  redirects: {
    "/side-projects": "/work",
    "/side-projects/[slug]": "/work/[slug]",
    "/study-cases": "/work",
    "/study-cases/[slug]": "/work/[slug]",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "vitesse-light",
      wrap: true,
    },
  },
});
