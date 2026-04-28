<script lang="ts">
    import { YearsInSvc, HighestSalaryReceived, moneyFormat, LeaveCreditsData} from './shared.svelte.js';

    interface LeaveCredits{
        year:number,
        month:number,
        day:number,
        slvl:number,
        tlc:number,
        cf:number,
        computation:number
    }
    
    let enjoyedSLVL:number = $state(LeaveCreditsData.enjoyedSLVL);
    let computation:LeaveCredits = $state({
        year:parseFloat((YearsInSvc.allService.bfp.years*15).toFixed(3)),
        month:parseFloat((YearsInSvc.allService.bfp.months/12*15).toFixed(3)),
        day:parseFloat((YearsInSvc.allService.bfp.days/360*15).toFixed(3)),
        slvl:0,
        tlc:0,
        cf:0.0481927,
        computation:0
    });
    let error:string = $state("");

    computation.slvl = parseFloat(((computation.year + computation.month + computation.day)*2).toFixed(3));
    computation.tlc = computation.slvl - LeaveCreditsData.enjoyedSLVL;
    computation.computation = computation.tlc*computation.cf * HighestSalaryReceived.hsr;

    function errorHandler(){
        if(enjoyedSLVL>computation.slvl)
            error = "Total Enjoyed VL & SL cannot be <br> greater than Total Earned VL & SL";
        else
            error = "";
    }

    function getTerminalComputation(){
        LeaveCreditsData.enjoyedSLVL = enjoyedSLVL;
        computation.tlc = computation.slvl- enjoyedSLVL;
        computation.computation = computation.tlc*computation.cf * HighestSalaryReceived.hsr;
        if(computation.computation<0)
            computation.computation = 0;    
    }

     //intro guide for ease of use
     import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: 'label[for="enjoyedSLVL"]',
                        intro: 'Please enter enjoyed SL/VL',
                    }
                ],
                dontShowAgain: true,
                showBullets:false,
                showButtons:false,
                dontShowAgainCookie:'introLCOpt',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>
<h2 class="card-title text-2xl font-bold mb-6">Calculate Terminal Leave Claim - OPT</h2>
<p class="italic text-xs text-justify text-error/80 mb-4 bg-error/10 p-2 rounded-lg border border-error/20 inline-block">Note: Overpayment maybe deducted from your Terminal Leave Claim.</p>

<div class="flex flex-col lg:flex-row gap-6 mb-8">
    <div class="flex-1 bg-base-200 rounded-2xl p-6 shadow-inner border border-base-300">
        <h3 class="text-sm font-bold uppercase text-base-content/60 mb-4 tracking-wider border-b border-base-300 pb-2">Earned Leave Credits</h3>
        <div class="space-y-3 font-mono text-sm sm:text-base">
            <div class="flex justify-between items-center">
                <span class="text-base-content/80 font-sans">{YearsInSvc.allService.bfp.years} years x 15 days</span>
                <span class="font-bold">{computation.year.toFixed(3)}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-base-content/80 font-sans">{YearsInSvc.allService.bfp.months} months ÷ 12 x 15 days</span>
                <span class="font-bold">{computation.month.toFixed(3)}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-base-content/80 font-sans">{YearsInSvc.allService.bfp.days} days ÷ 360 x 15 days</span>
                <span class="font-bold">{computation.day.toFixed(3)}</span>
            </div>
            <div class="divider my-1 border-base-300"></div>
            <div class="flex justify-between items-center text-primary">
                <span class="font-sans font-bold">Total Earned VL & SL</span>
                <span class="font-bold text-lg">{computation.slvl.toFixed(3)}</span>
            </div>
        </div>
    </div>

    <div class="flex-1 form-control bg-base-200 rounded-2xl p-6 shadow-inner border border-base-300">
        <h3 class="text-sm font-bold uppercase text-base-content/60 mb-4 tracking-wider border-b border-base-300 pb-2">Deductions</h3>
        <label for="enjoyedSLVL" class="label mt-1 p-0 pb-2"><span class="label-text font-medium">Total Enjoyed VL & SL</span></label>
        <div class="join w-full shadow-sm mb-4">
            <input id="enjoyedSLVL" type="number" step="0.001" min="0" max="{computation.slvl}" class="input input-bordered join-item w-full text-right font-mono text-lg font-bold focus:border-primary text-error" bind:value={enjoyedSLVL} onchange={()=>{getTerminalComputation();errorHandler()}} onkeyup={()=>{getTerminalComputation();errorHandler()}}>
            <span class="btn btn-neutral join-item pointer-events-none">Days</span>
        </div>
        <div class="flex-grow"></div>
        <div class="divider my-2 border-base-300"></div>
        <div class="flex justify-between items-center text-accent">
            <span class="font-bold">Total Leave Credits (TLC)</span>
            <span class="font-mono font-bold text-2xl">{computation.tlc.toFixed(3)}</span>
        </div>
    </div>
</div>

<div class="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl shadow-primary/20 mb-4 relative overflow-hidden">
    <div class="absolute inset-0 bg-white/5 pointer-events-none"></div>
    <div class="card-body p-6 sm:p-8 z-10">
        <h3 class="card-title text-sm opacity-90 border-b border-primary-content/20 pb-2">Terminal Leave Computation</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-5 font-mono text-center divide-y sm:divide-y-0 sm:divide-x divide-primary-content/20">
            <div class="pt-2 sm:pt-0">
                <div class="text-xs uppercase tracking-wider opacity-80 font-sans mb-1">Highest Salary</div>
                <div class="text-xl font-bold">₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))}</div>
            </div>
            <div class="pt-2 sm:pt-0">
                 <div class="text-xs uppercase tracking-wider opacity-80 font-sans mb-1">Leave Credits</div>
                 <div class="text-xl font-bold">{computation.tlc.toFixed(3)}</div>
            </div>
            <div class="pt-2 sm:pt-0">
                 <div class="text-xs uppercase tracking-wider opacity-80 font-sans mb-1">Factor</div>
                 <div class="text-xl font-bold">{computation.cf}</div>
            </div>
        </div>
        <div class="bg-black/20 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center mt-2 shadow-inner border border-white/10">
            <span class="font-bold uppercase tracking-wider text-sm">Estimated Claim Value</span>
            <span class="text-3xl sm:text-4xl font-mono font-extrabold mt-2 sm:mt-0 drop-shadow-md text-white">₱ {moneyFormat(computation.computation.toFixed(2))}</span>
        </div>
    </div>
</div>

{#if error && error.length>0}
    <div role="alert" class="alert alert-error mt-6 shadow-md drop-shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current drop-shadow-sm" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span class="font-medium">{@html error}</span>
    </div>
{/if}