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
<h2 class="card-title">Calculate Terminal Leave Claim</h2>
<p class="italic text-xs text-justify text-gray-400">Note: Overpayment maybe deducted from your Terminal Leave Claim.</p>
<div class="grid grid-cols-[auto,auto,2fr]">
    <div class="p-1 font-bold">
        <span>Highest Salary Received</span>
    </div> 
    <div class="p-1 font-bold"> = </div> 
    <div class="p-1 text-right font-bold">
        <span>₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))}</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.allService.bfp.years} years x 15 days</span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>{computation.year.toFixed(3)}</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.allService.bfp.months} months / 12 x 15 days</span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>{computation.month.toFixed(3)}</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.allService.bfp.days} days / 360 x 15 days</span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>{computation.day.toFixed(3)}</span>
    </div>
    <div class="p-1">
        <span>Total Earned VL & SL </span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>{computation.slvl.toFixed(3)}</span>
    </div>
    <div class="p-1 col-span-3">
        <label for="enjoyedSLVL" class="flex input input-neutral mb-2 w-full">
            <span class="label">Total Enjoyed VL & SL :</span> 
            <input id ="enjoyedSLVL" type="number" step = "0.001" min="0" max="{computation.slvl}" class="enjoyedSLVL text-right" bind:value={enjoyedSLVL}
                onchange={()=>{getTerminalComputation();errorHandler()}}
                onkeyup={()=>{getTerminalComputation();errorHandler()}}
            >
        </label>
    </div>
    <div class="p-1 font-bold">
        <span>Total Leave Credits</span>
    </div> 
    <div class="p-1 font-bold"> = </div> 
    <div class="p-1 text-right font-bold">
        <span>{computation.tlc.toFixed(3)}</span>
    </div>
    <div class="p-1 font-bold">
        <span>Constant Factor</span>
    </div> 
    <div class="p-1 font-bold"> = </div> 
    <div class="p-1 text-right font-bold">
        <span>{computation.cf}</span>
    </div>
    <div class="p-1 font-bold">
        <span>HSR X TLC X CF</span>
    </div> 
    <div class="p-1 font-bold"> = </div> 
    <div class="p-1 text-right font-bold">
        <span>₱ {moneyFormat(computation.computation.toFixed(2))}</span>
    </div>
</div>
{#if error.length>0}
    <div role="alert" class="alert alert-error">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        <span>{@html error}</span>
    </div>
{/if}