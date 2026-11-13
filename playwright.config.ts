import { defineConfig, devices } from '@playwright/test';

// E2E runs against the prerendered build. `bun run test:e2e` builds first, then
// Playwright starts `vite preview`. Browsers: `bun run browsers:install`.
export default defineConfig({
	testDir: 'tests/e2e',
	testMatch: '**/*.e2e.ts',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'bun run preview',
		port: 4173,
		reuseExistingServer: !process.env.CI
	}
});
