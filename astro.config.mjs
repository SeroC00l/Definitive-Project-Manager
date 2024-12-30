import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: "client", access: "public" }),
      SUPABASE_KEY: envField.string({ context: "server", access: "secret" }),
      DATABASE_URL: envField.string({ context: "server", access: "secret" }),
    },
  },
  experimental: {
    responsiveImages: true,
    svg: {
      mode: "sprite",
    },
    session: {
      driver: "cloudflare-kv-binding",
    },
  },
});
