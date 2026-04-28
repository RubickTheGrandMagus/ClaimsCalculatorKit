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
            error = "Total Enjoyed VL & SL cannot be <br>greater than Total Earned VL & SL";
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
                dontShowAgainCookie:'introLCEtc',
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
        <p class="text-base-content/60 text-sm mt-1">Compute your final terminal pay based on accumulated leave credits.</p>
    </div>
</div>

<div class="alert bg-base-200 shadow-sm border border-base-300 rounded-xl mb-6 flex items-center p-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div class="ml-2 text-sm max-w-full">
        <span class="font-bold">Note:</span> Overpayment may be deducted from your Terminal Leave Claim.
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    <div class="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-inner border border-base-300 flex flex-col gap-6">
        <h3 class="text-sm font-bold uppercase tracking-wider text-base-content/70 border-b border-base-300 pb-2">Leave Credits Details</h3>
        
        <div class="grid grid-cols-1 gap-4 bg-base-100 p-5 rounded-xl border border-base-200 shadow-sm relative overflow-hidden">
            <div class="absolute right-0 top-0 opacity-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div class="flex justify-between items-center z-10 border-b border-base-100 pb-2">
                <span class="text-xs uppercase font-bold text-base-content/60">YRS ({YearsInSvc.allService.bfp.years}) x 15</span>
                <span class="font-mono font-bold">{computation.year.toFixed(3)}</span>
            </div>
            <div class="flex justify-between items-center z-10 border-b border-base-100 pb-2">
                <span class="text-xs uppercase font-bold text-base-content/60">MOS ({YearsInSvc.allService.bfp.months}) / 12 x 15</span>
                <span class="font-mono font-bold">{computation.month.toFixed(3)}</span>
            </div>
            <div class="flex justify-between items-center z-10 border-b border-base-100 pb-2">
                <span class="text-xs uppercase font-bold text-base-content/60">DAYS ({YearsInSvc.allService.bfp.days}) / 360 x 15</span>
                <span class="font-mono font-bold">{computation.day.toFixed(3)}</span>
            </div>
            <div class="flex justify-between items-center z-10 pt-2">
                <span class="text-sm uppercase font-black text-primary drop-shadow-sm">Total Earned VL & SL</span>
                <span class="font-mono text-xl font-black text-primary drop-shadow-sm">{computation.slvl.toFixed(3)}</span>
            </div>
        </div>

        <div class="form-control w-full my-2">
            <label for="enjoyedSLVL" class="label pb-1">
                <span class="label-text font-bold text-sm text-secondary">Total Enjoyed VL & SL</span>
                <span class="label-text-alt opacity-70">Max {computation.slvl}</span>
            </label>
            <div class="join">
                <span class="join-item bg-secondary/20 text-secondary font-bold flex items-center px-4 border border-secondary/30 rounded-l-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                <input id="enjoyedSLVL" type="number" step="0.001" min="0" max="{computation.slvl}" class="enjoyedSLVL input input-bordered input-secondary text-right w-full join-item font-mono text-lg bg-base-100 transition-all focus:shadow-md" bind:value={enjoyedSLVL}
                onchange={()=>{getTerminalComputation();errorHandler()}}
                onkeyup={()=>{getTerminalComputation();errorHandler()}} />
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-base-100 p-4 rounded-xl border border-base-200 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group">
                 <div class="absolute inset-0 bg-secondary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                 <span class="text-xs uppercase font-bold text-base-content/60 mb-1 z-10">Total Leave Credits (TLC)</span>
                 <span class="font-mono text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-secondary to-neutral z-10">{computation.tlc.toFixed(3)}</span>
            </div>
             <div class="bg-base-100 p-4 rounded-xl border border-base-200 flex flex-col items-center justify-center text-center shadow-sm">
                <span class="text-xs uppercase font-bold text-base-content/60 mb-1">Constant Factor</span>
                <span class="font-mono text-xl font-bold font-mono text-primary">{computation.cf}</span>
            </div>
             <div class="bg-base-100 p-4 rounded-xl border border-base-200 flex flex-col items-center gap-1 justify-center text-center shadow-sm col-span-1 sm:col-span-2">
                 <span class="text-xs uppercase font-bold text-base-content/60 mb-1 w-full text-left ml-2">Highest Salary Rec.</span>
                <div class="flex justify-between items-center w-full px-2">
                     <span class="font-bold opacity-50 px-3 bg-base-200 rounded-full text-xs">HSR</span>
                     <span class="font-mono text-xl font-bold text-accent">₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))}</span>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-6 lg:sticky lg:top-8">
        <div class="relative bg-primary p-6 sm:p-8 rounded-3xl text-primary-content shadow-xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center text-center group">
            <div class="absolute -right-16 -top-16 opacity-10 pointer-events-none transition-transform group-hover:scale-110 group-hover:rotate-6 duration-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-64 h-64"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
            </div>
            
            <h3 class="text-sm font-bold uppercase tracking-widest opacity-80 mb-6 drop-shadow-sm relative z-10 w-full">Total Claim Amount</h3>
            <p class="text-xs pb-4 opacity-70 transition-all font-mono">Formula: HSR &times; TLC &times; CF</p>
            
            <div class="bg-base-100/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-base-100/20 shadow-inner w-full flex flex-col items-center transition-all relative z-10 hover:bg-base-100/20">
                <span class="text-xl sm:text-2xl font-black opacity-80 mb-2">₱</span>
                <span class="font-mono text-4xl sm:text-5xl lg:text-6xl font-black drop-shadow-md tracking-tight">{moneyFormat(computation.computation.toFixed(2))}</span>
            </div>
            
            {#if computation.computation > 0}
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-success/0 via-success to-success/0"></div>
            {/if}
        </div>

        {#if error.length>0}
            <div role="alert" class="alert alert-error shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="font-medium">{@html error}</span>
            </div>
        {/if}
    </div>
</div>