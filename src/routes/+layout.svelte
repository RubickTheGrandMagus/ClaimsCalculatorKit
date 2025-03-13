<script lang="ts">
	import '../app.css';
  import { dev } from '$app/environment';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';

  injectSpeedInsights();
  injectAnalytics({mode:dev ? 'development': 'production'});
  
	let { children } = $props();
</script>

<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="navbar bg-base-100">
        <div class="flex-none">
          <label for="my-drawer" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-5 w-5 stroke-current">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="flex-1">
          <a href="/" class="btn btn-ghost normal-case text-xl">Claims Calculator Kit</a>
        </div>
	</div>
		<!-- Main content here -->
		{@render children()}
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <!-- Sidebar content here -->
        <li><a href="/">Home</a></li>
        <li><a href="/legacy">Version 1.5</a></li>
        <li><a href="/mc">Reference Memos</a></li>
        <li><a href="/faq">Frequently Asked Questions</a></li>
        <li><a href="/bugreport">Report a Bug</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  </div>

