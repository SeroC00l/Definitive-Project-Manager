// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
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
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  experimental: {
    responsiveImages: true,
    svg: {
      mode: "sprite",
    },
    session: {
      driver: "supabase",
    },
  },
});
