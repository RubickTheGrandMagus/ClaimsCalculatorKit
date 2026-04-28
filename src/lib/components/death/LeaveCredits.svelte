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
    let hsr:number = $state(0);
    //if 20+ years use +1 rankhigher salary else use default salary
    hsr = (YearsInSvc.total.y>=20 && HighestSalaryReceived.rank==HighestSalaryReceived.retrank)? HighestSalaryReceived.rhsr : HighestSalaryReceived.hsr;

    computation.slvl = parseFloat(((computation.year + computation.month + computation.day)*2).toFixed(3));
    computation.tlc = computation.slvl - LeaveCreditsData.enjoyedSLVL;
    computation.computation = computation.tlc*computation.cf * hsr;

    function errorHandler(){
        if(enjoyedSLVL>computation.slvl)
            error = "Total Enjoyed VL & SL cannot be <br> greater than Total Earned VL & SL";
        else
            error = "";
    }

    function getTerminalComputation(){
        LeaveCreditsData.enjoyedSLVL = enjoyedSLVL;
        computation.tlc = computation.slvl- enjoyedSLVL;
        computation.computation = computation.tlc*computation.cf * hsr;
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
                dontShowAgainCookie:'LCDea',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>
<h2 class="card-title text-2xl font-bold mb-2">Calculate Terminal Leave Claim - DEA</h2>
<p class="text-xs text-base-content/60 italic mb-6">Note: Overpayments may be deducted from your final Terminal Leave Claim.</p>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    <div class="lg:col-span-2 flex flex-col gap-6">
        <div class="card bg-base-200 border border-base-300 shadow-sm">
            <div class="card-body p-5 sm:p-6">
                <h3 class="text-sm font-bold uppercase text-base-content/60 mb-4 tracking-wider border-b border-base-300 pb-2">Computation Matrix</h3>
                <div class="space-y-4 font-mono text-sm sm:text-base">
                    <div class="flex justify-between items-center bg-base-100 p-3 rounded-lg border border-base-200 shadow-sm">
                        <span class="text-base-content/80 font-sans text-xs sm:text-sm">Highest Salary Received <br><span class="opacity-60 text-xs">{HighestSalaryReceived.rrank}</span></span>
                        <span class="font-bold text-primary">₱ {moneyFormat(hsr.toFixed(2))}</span>
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        <div class="bg-base-100 p-3 rounded-lg border border-base-200 flex flex-col">
                            <span class="text-[10px] sm:text-xs text-base-content/60 font-sans uppercase mb-1">{YearsInSvc.allService.bfp.years} years x 15d</span>
                            <span class="font-bold text-lg mt-auto">{computation.year.toFixed(3)}</span>
                        </div>
                        <div class="bg-base-100 p-3 rounded-lg border border-base-200 flex flex-col">
                            <span class="text-[10px] sm:text-xs text-base-content/60 font-sans uppercase mb-1">{YearsInSvc.allService.bfp.months} mos ÷ 12 x 15d</span>
                            <span class="font-bold text-lg mt-auto">{computation.month.toFixed(3)}</span>
                        </div>
                        <div class="bg-base-100 p-3 rounded-lg border border-base-200 flex flex-col col-span-2 lg:col-span-1">
                            <span class="text-[10px] sm:text-xs text-base-content/60 font-sans uppercase mb-1">{YearsInSvc.allService.bfp.days} days ÷ 360 x 15d</span>
                            <span class="font-bold text-lg mt-auto">{computation.day.toFixed(3)}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-center p-2 mt-2">
                        <span class="font-sans font-bold text-sm sm:text-base text-base-content/80">Total Earned VL & SL</span>
                        <span class="font-bold text-base sm:text-lg">{computation.slvl.toFixed(3)}</span>
                    </div>

                    <div class="form-control w-full bg-base-100 p-4 rounded-xl border-2 border-primary/20 shadow-sm relative overflow-hidden">
                        <div class="absolute inset-0 bg-primary/5 pointer-events-none"></div>
                        <label for="enjoyedSLVL" class="label pb-1"><span class="label-text font-bold text-primary">Total Enjoyed VL & SL</span></label>
                        <div class="join w-full shadow-sm mt-1">
                            <input id="enjoyedSLVL" type="number" step="0.001" min="0" max="{computation.slvl}" class="input input-primary input-bordered join-item w-full text-right font-mono font-bold text-lg focus:outline-offset-0" bind:value={enjoyedSLVL} onchange={()=>{getTerminalComputation();errorHandler()}} onkeyup={()=>{getTerminalComputation();errorHandler()}}>
                            <div class="btn btn-primary join-item no-animation pointer-events-none uppercase text-xs">Days</div>
                        </div>
                    </div>

                    <div class="flex justify-between items-center p-2">
                        <span class="font-sans font-bold text-sm sm:text-base text-base-content/80">Total Leave Credits (TLC)</span>
                        <span class="font-bold text-base sm:text-lg badge badge-neutral badge-lg py-3">{computation.tlc.toFixed(3)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="card bg-accent text-accent-content shadow-lg shadow-accent/30 relative overflow-hidden h-fit">
        <div class="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div class="card-body p-6 sm:p-8 justify-center z-10 flex flex-col h-full">
            <h3 class="text-sm font-bold uppercase tracking-wider opacity-90 mb-1">Terminal Leave Claim</h3>
            <div class="opacity-80 text-xs font-mono mb-4 flex flex-col gap-1 border-b border-accent-content/20 pb-3">
                <div class="flex justify-between"><span>HSR:</span> <span>₱ {moneyFormat(hsr.toFixed(2))}</span></div>
                <div class="flex justify-between"><span>TLC:</span> <span>{computation.tlc.toFixed(3)}</span></div>
                <div class="flex justify-between"><span>CF:</span> <span>{computation.cf}</span></div>
            </div>
            <div class="mt-auto">
                <div class="text-sm font-bold uppercase opacity-80 mb-1">Total Result</div>
                <div class="text-4xl lg:text-5xl font-mono font-extrabold drop-shadow-sm tracking-tight break-all">
                    ₱ {moneyFormat(computation.computation.toFixed(2))}
                </div>
            </div>
        </div>
    </div>
</div>

<div tabindex="0" class="collapse collapse-arrow border border-info/30 bg-info/5 text-base-content rounded-xl shadow-sm mb-6">
    <input type="checkbox" /> 
    <div class="collapse-title text-sm sm:text-base font-semibold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-info mr-3"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        {#if YearsInSvc.total.y>=20}
            RESO # 2001-01 Section 16.3
        {:else}
            RESO # 2001-01 Section 16.5
        {/if}
    </div>
    <div class="collapse-content">
        <blockquote class="italic text-justify font-medium text-sm text-base-content/80 pt-3 border-t border-info/20 leading-relaxed">
            {#if YearsInSvc.total.y>=20}
                An officer or non-officer with at least twenty (20) years of active 
                service who dies in line of duty shall be entitled to a one (1) rank 
                higher if his/her permanent grade last held for the purpose of 
                computing the commutation of his/her earned leave credits.
            {:else}
                An officer or non-officer with less than twenty (20) years of 
                accumulated active service who voluntarily resigned and was 
                <span class="font-bold">separated</span> from the service shall be entitled to the commutation of 
                earned leave credits at his/her permanent grade last held.
            {/if}
        </blockquote>
    </div>
</div>

{#if error && error.length>0}
    <div role="alert" class="alert alert-error shadow-md drop-shadow-sm mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current drop-shadow-sm" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span class="font-medium">{@html error}</span>
    </div>
{/if}