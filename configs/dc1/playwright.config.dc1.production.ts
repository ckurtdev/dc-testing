import { defineConfig } from '@playwright/test';
import baseConfig from '../playwright.config.base';

export default defineConfig({
  ...baseConfig,
  testDir: "../../tests",
  use: {
    ...baseConfig.use,
    baseURL: 'https://admin.drivers-check.de',
  },
});