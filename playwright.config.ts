import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure"
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "chromium-tablet", use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 768 } } },
    { name: "chromium-mobile", use: { ...devices["Pixel 7"], browserName: "chromium" } }
  ],
  webServer: {
    command: "node tests/e2e/mock-server.mjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true
  }
});
