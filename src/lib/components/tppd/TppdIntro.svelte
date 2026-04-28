<script lang="ts">
    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';
    import './custom.css';

    onMount(() => {
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: ".next",
                        intro: 'Please click to proceed',
                        position: 'left'
                    }
                ],
                tooltipClass:"customTooltip",
                dontShowAgain: true,
                showBullets:false,
                showButtons:false,
                dontShowAgainCookie:'introtppd',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<div class="prose prose-sm md:prose-base max-w-none w-full xl:min-w-[800px]">
    <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-base-200 pb-4 mb-6">
        <h2 class="text-3xl md:text-4xl font-extrabold text-primary m-0 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 drop-shadow-sm"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Permanent Physical Disability
        </h2>
    </div>

    <div class="p-6 bg-base-200 rounded-2xl shadow-inner border border-base-300 mb-8 max-w-3xl">
        <div class="flex items-start gap-4">
            <div class="mt-1 opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg>
            </div>
            <div>
                <h3 class="mt-0 pt-0 text-base font-bold uppercase tracking-wider text-base-content/80 mb-2">Resolution No. 2001-01 Section 1</h3>
                <p class="text-base-content/90 leading-relaxed font-serif italic text-lg m-0 border-l-4 border-primary pl-4 py-1">
                    "any impairment of the body which renders the BFP uniformed personnel incapable of performing substantially the functions of his/her duties or occupation which is expected of him during the course of his/her duties or occupation which is expected of him during the course of his/her employment..."
                </p>
            </div>
        </div>
    </div>

    <div class="alert bg-base-100 shadow-sm border border-info/20 mt-8 rounded-xl max-w-3xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div class="flex-1">
            <h3 class="font-bold text-base-content m-0">Requirements Overview</h3>
            <div class="text-sm text-base-content/80 mt-1">
                Please refer to the detailed <a href="/docs/tppd" class="link link-info font-medium hover:text-info">documentary requirements</a> before proceeding with the claim.
            </div>
        </div>
        <div class="flex-none hidden sm:block">
            <a href="/docs/tppd" class="btn btn-sm btn-ghost text-info">View Docs</a>
        </div>
    </div>
</div>