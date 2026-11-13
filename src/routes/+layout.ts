// Every public route is prerendered to static HTML (adapter-static, strict mode).
// SSR stays enabled so the build emits complete documents; the client then hydrates
// and handles navigation. See docs/arabic-learning-stack-guide-sveltekit.md, section 2.
export const prerender = true;
export const trailingSlash = 'always';
