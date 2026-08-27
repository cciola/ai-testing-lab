import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 300000, // timeout de 5 minutos para cada teste

  use: {
    channel: 'chromium',
  },

  reporter: 'html'
});