import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 300000,

  use: {
    channel: 'chromium',
  },

  reporter: 'html'
});