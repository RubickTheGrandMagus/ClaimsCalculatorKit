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
    <div class="drawer-content flex flex-col min-h-screen">
      <div class="navbar bg-base-100 shadow-sm z-10 relative">
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
          <a href="/" id="home" class="btn btn-ghost normal-case text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Claims Calculator Kit</a>
        </div>
	    </div>
		<!-- Main content here -->
        <main class="flex-grow">
            {@render children()}
        </main>

        <!-- Footer moved inside drawer-content for proper layout -->
        <footer class="footer footer-center bg-base-200/50 text-base-content p-6 border-t border-base-300 mt-auto">
          <aside class="flex flex-col gap-4">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-info/10 text-info rounded-full text-sm font-medium shadow-sm border border-info/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Salary Table updated for CY 2026, 2027, and 2028.</span>
            </div>
            <p class="font-medium opacity-80 mt-1 text-sm">
              Copyright © {new Date().getFullYear()} - BFP Region 7 (Central Visayas)
            </p>
          </aside>
        </footer>
    </div>
    
    <div class="drawer-side z-50">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-100 text-base-content min-h-full w-80 p-4 shadow-xl flex flex-col gap-1">
        <!-- Drawer Header -->
        <li class="mb-4 font-bold text-lg hover:bg-transparent pointer-events-none">
          <div class="flex items-center gap-2 px-2">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Claims Calculator</span>
          </div>
        </li>
        
        <!-- Sidebar content here -->
        <li>
          <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
            Home
          </a>
        </li>
        <li>
          <details>
            <summary>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              Documentary Requirements
            </summary>  
            <ul class="ml-6 mt-1 border-l border-base-300">
              <li><a href="/docs/compulsory">Compulsory Retirement</a></li>
              <li><a href="/docs/optional">Optional Retirement</a></li>
            </ul>
          </details>
        </li>

        <!-- Divider -->
        <div class="divider my-1 opacity-40"></div>

        <li class="menu-title text-xs font-semibold text-base-content/50 uppercase tracking-wider px-4 mt-2 mb-1">Resources</li>
        <li>
          <a href="/mc">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            Reference Memos
          </a>
        </li>
        <li>
          <a href="/faq">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
            Frequently Asked Questions
          </a>
        </li>
        <li>
          <a href="/legacy">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Version 1.5 (Legacy)
          </a>
        </li>

        <div class="divider my-1 opacity-40"></div>
        <li class="menu-title text-xs font-semibold text-base-content/50 uppercase tracking-wider px-4 mt-2 mb-1">Support</li>
        <li>
          <a href="/bugreport">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Report a Bug
          </a>
        </li>
        <li>
          <a href="/about">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 opacity-70"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
            About
          </a>
        </li>
      </ul>
    </div>
  </div>
