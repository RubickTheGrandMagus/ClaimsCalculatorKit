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
                dontShowAgainCookie:'introDeath',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<div class="prose max-w-none text-base-content/80 mb-6">
    <h2 class="text-3xl font-extrabold text-primary mb-4 drop-shadow-sm uppercase tracking-wider">Death Benefits</h2>
    <p class="text-lg">This module computes the claims for beneficiaries of BFP personnel who died in the line of duty, according to <strong class="text-primary-focus">RESOLUTION NO. 2001-01 Section 18.1</strong>.</p>
</div>

<div class="alert alert-info shadow-md rounded-2xl border border-info/20 mb-8 bg-info/5 text-base-content relative overflow-hidden backdrop-blur-sm">
    <div class="absolute top-0 left-0 w-1.5 h-full bg-info"></div>
    <div class="flex items-start gap-4 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-8 h-8 mt-1"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div class="text-sm leading-relaxed text-left text-justify opacity-90 font-medium">
            "An officer or non-officer of the Bureau of Fire Protection who died in the performance of his duty or by reason of his office/position, upon resolution of the Line of Duty Board or Adjudication officer shall receive: <br><br>
            <ul class="list-disc list-inside space-y-1 ml-2">
                <li>A gratuity equivalent to one (1) year salary</li>
                <li>Burial expenses equivalent to three (3) months salary</li>
                <li>Monthly pension equivalent to eighty percent (80%) of his/her salary for a period of five (5) years from the date of death.</li>
            </ul>
            <br>
            In case the BFP uniformed personnel was hospitalized before his death, the legal beneficiaries shall be reimbursed of any reasonable expenses for medicines, medical attendance, hospital fees, necessary transportation and subsistence expenses. Any deducted leave credits for absences for incapacity incurred in line of duty shall be restored. The salary in this sub section shall mean the base and longevity pay."
        </div>
    </div>
</div>

<div class="card bg-base-200 border border-base-300 shadow-sm p-4 w-fit rounded-xl transition-all hover:shadow-md mt-6">
    <div class="flex items-center gap-3">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
         <span class="text-sm font-medium opacity-80">Reference Docs:</span>
         <a href="/docs/death" class="btn btn-primary btn-sm rounded-full shadow-sm">Documentary Requirements</a>
    </div>
</div>