import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/test/**', 'playwright-report/**', 'test-results/**']
  }
})
