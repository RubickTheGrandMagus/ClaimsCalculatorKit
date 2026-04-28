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
                dontShowAgainCookie:'introCom',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>

<div class="prose prose-sm md:prose-base max-w-none">
    <h2 class="text-3xl font-extrabold text-primary mb-6">COMPULSORY RETIREMENT</h2>
    
    <div class="alert bg-info/10 text-base-content border-l-4 border-l-info rounded-xl mb-6 flex items-start gap-4 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-8 h-8 mt-1"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div class="flex flex-col">
            <blockquote class="italic text-justify font-medium m-0 border-none pl-0 text-base-content/80">
                "Upon attaining fifty-six (56) years of age with at least ten (10) years of active service, an officer or non-officer shall be compulsorily retired under this Resolution: Provided, that an officer with a rank equivalent to Chief Superintendent or higher may, upon the recommendation of the Chief, BFP be allowed service extension for a non-extendable period of one (1) year by the Secretary, DILG with the approval of the Civil Service Commission."
            </blockquote>
            <div class="w-full text-right mt-3 text-xs font-bold uppercase tracking-wider text-info/70">- RESOLUTION NO. 2001-01 Section 8.2.1</div> 
        </div>
    </div>

    <div class="bg-base-200 p-5 rounded-xl flex flex-row items-center gap-4 shadow-inner border border-base-300">
        <div class="bg-primary/20 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <p class="m-0 text-base-content/80">Please refer to this link for <a href="/docs/compulsory" class="link link-primary font-bold hover:text-primary-focus transition-colors">documentary requirements</a>.</p>
    </div>
</div>