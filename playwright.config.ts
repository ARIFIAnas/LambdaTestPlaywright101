import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Debug: Check if credentials are loaded
console.log("LT_USERNAME:", process.env.LT_USERNAME ? "SET" : "NOT SET");
console.log("LT_ACCESS_KEY:", process.env.LT_ACCESS_KEY ? "SET" : "NOT SET");

if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
  console.error("❌ LambdaTest credentials not found in environment variables");
  console.error(
    "Make sure your .env file exists and contains LT_USERNAME and LT_ACCESS_KEY"
  );
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Global timeout for each test */
  timeout: 90000, // 90 seconds for cloud testing
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for LambdaTest browsers */
  projects: [
    {
      name: "lambdatest-chrome",
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: "Chrome",
              browserVersion: "latest",
              "LT:Options": {
                platform: "Windows 10",
                build: "Playwright LambdaTest Build",
                name: "Chrome Latest Test",
                user: process.env.LT_USERNAME || "your_actual_username",
                accessKey:
                  process.env.LT_ACCESS_KEY || "your_actual_access_key",
                network: true,
                video: true,
                console: true,
                tunnel: false,
              },
            })
          )}`,
        },
      },
    },

    // Local Firefox for testing (since LambdaTest doesn't support Firefox with CDP)
    {
      name: "local-firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "lambdatest-edge",
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: "MicrosoftEdge",
              browserVersion: "latest",
              "LT:Options": {
                platform: "Windows 10",
                build: "Playwright LambdaTest Build",
                name: "Edge Latest Test",
                user: process.env.LT_USERNAME || "your_actual_username",
                accessKey:
                  process.env.LT_ACCESS_KEY || "your_actual_access_key",
                network: true,
                video: true,
                console: true,
                tunnel: false,
              },
            })
          )}`,
        },
      },
    },
    {
      name: "lambdatest-chrome-mac",
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: "Chrome",
              browserVersion: "latest",
              "LT:Options": {
                platform: "macOS Monterey",
                build: "Playwright LambdaTest Build",
                name: "Chrome macOS Test",
                user: process.env.LT_USERNAME || "your_actual_username",
                accessKey:
                  process.env.LT_ACCESS_KEY || "your_actual_access_key",
                network: true,
                video: true,
                console: true,
                tunnel: false,
              },
            })
          )}`,
        },
      },
    },

    // Keep local projects for development (optional)
    // Uncomment these if you want to run locally as well
    /*
    {
      name: "local-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "local-firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "local-webkit",
      use: { ...devices["Desktop Safari"] },
    },
    */
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
