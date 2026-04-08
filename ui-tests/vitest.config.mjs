import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    reporters: [
      'default'
    ],
    environment: './vitest.puppeteer.env.js',
    test: {
      include: ['./tests/**/*.test.?(c|m)[jt]s']
    }
  }
});
