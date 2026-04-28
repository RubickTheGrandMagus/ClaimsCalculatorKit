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
                dontShowAgainCookie:'introEtc',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<div class="flex items-center justify-between mb-8 pb-4 border-b border-base-200">
    <div>
        <h2 class="text-2xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider">
            Terminal Leave Calculation
        </h2>
        <p class="text-base-content/60 text-sm mt-1">Compute your terminal leave benefits upon severance from service.</p>
    </div>
</div>

<div class="alert bg-base-100 shadow-sm border border-secondary/20 rounded-xl mb-8 flex items-start p-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-secondary shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div class="flex-1 ml-3">
        <h3 class="font-bold text-base-content m-0 text-sm">Policy Notes & Guidelines</h3>
        <p class="text-xs text-base-content/80 mt-1 max-w-3xl leading-relaxed">
            Provided for under CSC MC No. 41, s. 1998: "Terminal leave is applied for by an official or an employee who intends to sever his connection with his employer. Accordingly, the filling of application for terminal leave requires as a condition sine qua non, the employee’s resignation, retirement or separation from the service. It must be shown first that public employment ceased by any of the said modes of severances."
        </p>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div class="bg-primary/5 p-6 rounded-2xl shadow-inner border border-primary/20 flex flex-col gap-3">
        <h3 class="text-sm font-bold uppercase tracking-wider text-primary">Required Documents</h3>
        <p class="text-sm text-base-content/80">
            Please ensure you have prepared all necessary documentary requirements prior to filing your terminal leave claim.
        </p>
        <a href="/docs/other" class="btn btn-primary btn-outline btn-sm self-start mt-2">View Requirements Checklist</a>
    </div>
</div>