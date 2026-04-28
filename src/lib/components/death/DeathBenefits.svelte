<script lang="ts">
    import {YearsInSvc, HighestSalaryReceived, moneyFormat} from './shared.svelte.js';
    interface TotalRating{
        year:number,
        month:number,
        day:number,
        total:number
    }

    // let totalRate:TotalRating = {year:YearsInSvc.total.y*2.5,month:YearsInSvc.total.m/12*2.5,day:YearsInSvc.total.d/360*2.5,total:0};
    // totalRate.total = totalRate.year + totalRate.month + totalRate.day;
    // totalRate.total = (totalRate.total>90)? 90:totalRate.total;
    // let computation ={pension:HighestSalaryReceived.hsr*totalRate.total/100,survivorPension:0};
    // computation.survivorPension = computation.pension*0.75; 
    // if(YearsInSvc.total.y<20){
    //     computation.pension = HighestSalaryReceived.hsr*0.5;
    //     computation.survivorPension = computation.pension;
    // }

    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: ".next",
                        intro: 'Please click Next to proceed',
                        position: 'left'
                    }
                ],
                tooltipClass:"customTooltip",
                dontShowAgain: true,
                showBullets:false,
                showButtons:false,
                dontShowAgainCookie:'introLSCom',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<div class="flex items-center justify-between mb-8 pb-4 border-b border-base-200">
    <div>
        <h2 class="text-3xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider">
            Calculate Death Benefits
        </h2>
        <p class="text-base-content/60 text-sm mt-1">Based on Resolution No. 2001-01 Section 18.1</p>
    </div>
    
    <div class="text-right hidden sm:block">
        <div class="text-[10px] uppercase font-bold text-base-content/50 tracking-widest">Base Pay Reference</div>
        <div class="font-mono text-xl font-bold bg-base-200 px-3 py-1 rounded-lg border border-base-300 text-primary drop-shadow-sm">₱ {moneyFormat(HighestSalaryReceived.retbp.toFixed(2))}</div>
        <div class="text-xs text-base-content/70 mt-1">{HighestSalaryReceived.rank}</div>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div class="card bg-info text-info-content shadow-lg shadow-info/20 hover:-translate-y-1 transition-transform relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>
        <div class="card-body p-6 z-10 flex flex-col justify-between">
            <div>
                <h3 class="card-title text-sm opacity-90 uppercase tracking-widest mb-1">Gratuity</h3>
                <p class="text-xs opacity-75 font-mono mb-6">Base Pay × 12 months</p>
            </div>
            <div class="text-3xl xl:text-4xl font-mono font-extrabold drop-shadow-sm break-all">
                ₱ {moneyFormat((HighestSalaryReceived.retbp*12).toFixed(2))}
            </div>
        </div>
    </div>

    <div class="card bg-success text-success-content shadow-lg shadow-success/20 hover:-translate-y-1 transition-transform relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>
        <div class="card-body p-6 z-10 flex flex-col justify-between">
            <div>
                <h3 class="card-title text-sm opacity-90 uppercase tracking-widest mb-1">Burial Expenses</h3>
                <p class="text-xs opacity-75 font-mono mb-6">Base Pay × 3 months</p>
            </div>
            <div class="text-3xl xl:text-4xl font-mono font-extrabold drop-shadow-sm break-all">
                ₱ {moneyFormat((HighestSalaryReceived.retbp*3).toFixed(2))}
            </div>
        </div>
    </div>

    <div class="card bg-primary text-primary-content md:col-span-2 lg:col-span-1 shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        <div class="card-body p-6 z-10 flex flex-col justify-between">
            <div>
                <h3 class="card-title text-sm opacity-90 uppercase tracking-widest mb-1">5 Year Pension</h3>
                <p class="text-xs opacity-75 font-mono mb-6">Base Pay × 80% (Per Month)</p>
            </div>
            <div class="text-3xl xl:text-4xl font-mono font-extrabold drop-shadow-sm break-all">
                <span class="text-sm font-sans font-medium opacity-80 mt-1 absolute -top-5 right-0">Monthly</span>
                ₱ {moneyFormat((HighestSalaryReceived.retbp*0.8).toFixed(2))}
            </div>
        </div>
    </div>
</div>

<div class="alert bg-base-200 border border-base-300 text-base-content/80 shadow-sm text-sm p-4 rounded-xl">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div class="flex-1">
        These benefits are granted to legal beneficiaries of uniformed personnel who died in the line of duty, upon resolution of the Line of Duty Board or Adjudication officer.
    </div>
</div>

  
  