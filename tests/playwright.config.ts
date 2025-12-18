import { defineConfig } from "@playwright/test";
import { env } from "./src/helpers/env";

export default defineConfig({
  testDir: "src",
  timeout: 30_000,
  retries: 0,

  reporter: [["html", { open: "never" }]],

  globalSetup: "./global-setup.ts",
  globalTeardown: "./global-teardown.ts",

  projects: [
    {
      name: "api",
      testDir: "src/api/specs",
      use: {
        baseURL: env.API_URL,
      },
    },
    {
      name: "ui",
      testDir: "src/ui/specs",
      use: {
        baseURL: env.WEB_URL,
      },
    },
  ],
});
