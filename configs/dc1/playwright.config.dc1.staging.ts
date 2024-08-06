import { defineConfig } from '@playwright/test';
import baseConfig from '../playwright.config.base';

export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'https://staging-admin.drivers-check-test.de/Login',
  },
});