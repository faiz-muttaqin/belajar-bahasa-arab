import { defineConfig, devices } from '@playwright/test';

// E2E runs against the prerendered build. `bun run test:e2e` builds first, then
// Playwright starts `vite preview`. Browsers: `bun run browsers:install`.
// Use a separate port when another preview is running; never test a stale server.
const port = Number(process.env.PLAYWRIGHT_PORT ?? 4173);

export default defineConfig({
	testDir: 'tests/e2e',
	testMatch: '**/*.e2e.ts',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	use: {
		baseURL: `http://localhost:${port}`,
		trace: 'on-first-retry'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: `bun run preview -- --port ${port} --strictPort`,
		port,
		reuseExistingServer: false
	}
});
