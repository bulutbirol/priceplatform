import { defineConfig } from "@playwright/test";
export default defineConfig({
    testDir: "./tests/e2e",
    timeout: 30000,
    use: {
        baseURL: "http://localhost:3100",
        headless: true,
    },
    webServer: process.env.PW_EXTERNAL_SERVER ? undefined : {
        command: "node node_modules/next/dist/bin/next start --port 3100",
        url: "http://localhost:3100",
        reuseExistingServer: true,
        timeout: 30000,
    },
});
