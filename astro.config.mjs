import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jotap.land",
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: "vitesse-dark",
      wrap: true,
    },
  },
});
