import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 900000, // timeout de 15min

  use: {
    channel: 'chromium',
  },

  reporter: 'html'
});