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
<div class="flex items-center justify-between mb-8 pb-4 border-b border-base-200">
    <div>
        <h2 class="text-2xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider">
            Terminal Leave Claim
        </h2>
        <p class="text-base-content/60 text-sm mt-1">Calculate the monetize value of your remaining leave credits.</p>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-6">
    <div class="bg-base-200 p-6 rounded-2xl shadow-inner border border-base-300 flex flex-col gap-6">
        <div class="alert bg-base-100 shadow-sm border border-warning/20 rounded-xl mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-warning shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span class="text-xs font-medium">Overpayment may be deducted from your Terminal Leave Claim.</span>
        </div>

        <div class="form-control w-full bg-base-100 p-5 rounded-xl shadow-sm border border-base-200">
            <label for="enjoyedSLVL" class="label pb-2 pt-0 flex-col items-start gap-1">
                <span class="label-text font-bold text-sm uppercase tracking-wider text-base-content/80">Total Enjoyed SL & VL</span>
                <span class="text-xs text-base-content/50">Enter the total sum of Sick Leave and Vacation Leave already used.</span>
            </label>
            <div class="relative w-full">
                <input id="enjoyedSLVL" type="number" step="0.001" min="0" max="{computation.slvl}" class="enjoyedSLVL input input-bordered input-primary w-full text-xl font-mono font-bold pr-16 bg-base-50 transition-all focus:shadow-md" bind:value={enjoyedSLVL} onchange={()=>{getTerminalComputation();errorHandler()}} onkeyup={()=>{getTerminalComputation();errorHandler()}}>
                <span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-base-content/30 text-sm">days</span>
            </div>
        </div>
    </div>

    <div class="relative bg-primary/5 p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-lg flex flex-col gap-5 overflow-hidden">
        <div class="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-64 h-64"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
        </div>

        <div class="flex justify-between items-center border-b border-base-300 pb-3 relative z-10">
            <span class="text-sm font-bold uppercase text-base-content/60 tracking-wider">Highest Salary Rec.</span>
            <span class="font-mono text-lg font-bold">₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))}</span>
        </div>

        <div class="flex justify-between items-center relative z-10 group bg-base-100/50 p-2 rounded-lg -mx-2">
            <span class="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors">{YearsInSvc.allService.bfp.years} yrs × 15</span>
            <span class="font-mono text-base font-bold group-hover:text-primary transition-colors">{computation.year.toFixed(3)}</span>
        </div>

        <div class="flex justify-between items-center relative z-10 group bg-base-100/50 p-2 rounded-lg -mx-2">
            <span class="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors">{YearsInSvc.allService.bfp.months} mos ÷ 12 × 15</span>
            <span class="font-mono text-base font-bold group-hover:text-primary transition-colors">{computation.month.toFixed(3)}</span>
        </div>

        <div class="flex justify-between items-center relative z-10 group bg-base-100/50 p-2 rounded-lg -mx-2">
            <span class="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors">{YearsInSvc.allService.bfp.days} days ÷ 360 × 15</span>
            <span class="font-mono text-base font-bold group-hover:text-primary transition-colors">{computation.day.toFixed(3)}</span>
        </div>

        <div class="flex flex-col gap-2 relative z-10 mt-2 bg-base-100 p-4 rounded-xl border border-base-200 shadow-sm">
             <div class="flex justify-between items-center">
                <span class="text-xs uppercase font-bold text-base-content/60">Total Earned</span>
                <span class="font-mono text-xl font-bold">{computation.slvl.toFixed(3)}</span>
            </div>
            
            <div class="flex justify-between items-center">
                <span class="text-xs uppercase font-bold text-base-content/60">Enjoyed Leaves</span>
                <span class="font-mono text-lg text-error font-medium">- {enjoyedSLVL ? enjoyedSLVL.toFixed(3) : '0.000'}</span>
            </div>

            <div class="divider my-0 opacity-50"></div>

            <div class="flex justify-between items-center">
                <span class="text-sm uppercase font-bold text-primary">Total Leave Credits</span>
                <span class="font-mono text-xl font-bold text-primary">{computation.tlc.toFixed(3)}</span>
            </div>
        </div>

        <div class="relative z-10 flex flex-col items-end mt-4 pt-4 border-t-2 border-primary/20">
            <span class="text-xs font-bold text-primary/70 mb-1">Terminal Claim (HSR × TLC × {computation.cf})</span>
            <div class="text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-primary drop-shadow-sm mt-1 whitespace-nowrap break-all">
                ₱ {moneyFormat(computation.computation.toFixed(2))}
            </div>
        </div>
    </div>
</div>

{#if error && error.length>0}
    <div role="alert" class="alert alert-error shadow-md mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span class="font-medium">{@html error}</span>
    </div>
{/if}