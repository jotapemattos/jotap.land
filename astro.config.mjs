import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",
  adapter: cloudflare({ mode: "directory" }),
});

