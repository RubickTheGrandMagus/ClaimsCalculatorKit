<script lang="ts">
    import { YearsInSvc, HighestSalaryReceived, moneyFormat, LeaveCreditsData} from './shared.svelte.js';

    interface LeaveCredits{
        year:number,
        month:number,
        day:number,
        slvl:number,
        cf:number,
        computation:number
    }
    
    let daysToMone:number = $state(LeaveCreditsData.daysToMone);
    let computation:LeaveCredits = $state({
        year:parseFloat((YearsInSvc.allService.bfp.years*15).toFixed(3)),
        month:parseFloat((YearsInSvc.allService.bfp.months/12*15).toFixed(3)),
        day:parseFloat((YearsInSvc.allService.bfp.days/360*15).toFixed(3)),
        slvl:0,
        cf:0.0481927,
        computation:0
    });
    let error:string = $state("");

    computation.slvl = parseFloat(((computation.year + computation.month + computation.day)*2).toFixed(3));
    computation.computation = LeaveCreditsData.daysToMone*computation.cf * HighestSalaryReceived.hsr;

    function errorHandler(){
        if(daysToMone>computation.slvl)
            error = "No of days to monetize cannot be greater than Total Earned.";
        else if(daysToMone<10)
            error = "No of days to monetize cannot be less than 10.";
        else if(daysToMone>30)
            error = "No of days to monetize cannot be more than 30.";
        else
            error = "";
    }

    function getTerminalComputation(){
        LeaveCreditsData.daysToMone = daysToMone;
        computation.computation = daysToMone*computation.cf * HighestSalaryReceived.hsr;
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
                        element: 'label[for="daysToMone"]',
                        intro: 'Please enter no of days to monetize',
                    }
                ],
                dontShowAgain: true,
                showBullets:false,
                showButtons:false,
                dontShowAgainCookie:'introLCMone',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>
<h2 class="card-title">Calculate Monetized Leave Credits</h2>
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
    <div class="p-1 font-bold col-span-3">
        <label for="daysToMone" class="flex input input-neutral mb-2 w-full">
        <span class="label">No. of Days to Monetized:</span>
            <input type="number" step = "1" min="10" max="{computation.slvl}" class="w-32 text-right" bind:value={daysToMone}
            onchange={()=>{getTerminalComputation();errorHandler()}}
            >
        </label>
    </div>
    <div class="p-1 font-bold">
        <span>Constant Factor</span>
    </div> 
    <div class="p-1 font-bold"> = </div> 
    <div class="p-1 text-right font-bold">
        <span>{computation.cf}</span>
    </div>
    <div class="p-1 font-bold">
        <span>HSR X # of Days X CF</span>
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
        <span>{error}</span>
    </div>
{/if}