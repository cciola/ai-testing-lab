import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    // Força headless no CI/Docker
    headless: process.env['HEADLESS'] === 'true' || process.env['CI'] === 'true',
    // Alterado de 'chrome' para 'chromium' para compatibilidade com Docker
    channel: 'chromium',
    storageState: './storageState.json',
    // Configurações importantes para Docker
    viewport: { width: 1920, height: 1080 },
  },
  timeout: 360000,
});