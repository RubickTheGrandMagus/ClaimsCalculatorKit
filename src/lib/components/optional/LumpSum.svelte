<script lang="ts">
    import {YearsInSvc, HighestSalaryReceived, moneyFormat} from './shared.svelte.js';
    interface TotalRating{
        year:number,
        month:number,
        day:number,
        total:number
    }

    let totalRate:TotalRating = {year:YearsInSvc.total.y*2.5,month:YearsInSvc.total.m/12*2.5,day:YearsInSvc.total.d/360*2.5,total:0};
    totalRate.total = totalRate.year + totalRate.month + totalRate.day;
    totalRate.total = (totalRate.total>90)? 90:totalRate.total;
    let computation ={pension:HighestSalaryReceived.hsr*totalRate.total/100,lumpsum:0};
    computation.lumpsum = parseFloat(computation.pension.toFixed(2)) * 36; 

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
                dontShowAgainCookie:'introLSOpt',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<h2 class="card-title text-2xl font-bold mb-6">Calculate 3 Year Lump Sum - OPT</h2>

<div class="flex flex-col lg:flex-row gap-6 mb-8">
    <div class="flex-1 bg-base-200 rounded-2xl p-6 shadow-inner border border-base-300">
        <h3 class="text-sm font-bold uppercase text-base-content/60 mb-4 tracking-wider border-b border-base-300 pb-2">Rate Computation Matrix</h3>
        <div class="space-y-3 font-mono text-sm sm:text-base">
            <div class="flex justify-between items-center">
                <span class="text-base-content/80 font-sans">{YearsInSvc.total.y} years x 2.5%</span>
                <span class="font-bold">{totalRate.year.toFixed(5)} %</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-base-content/80 font-sans">{YearsInSvc.total.m} months ÷ 12 x 2.5%</span>
                <span class="font-bold">{totalRate.month.toFixed(5)} %</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-base-content/80 font-sans">{YearsInSvc.total.d} days ÷ 360 x 2.5%</span>
                <span class="font-bold">{totalRate.day.toFixed(5)} %</span>
            </div>
            <div class="divider my-2 border-base-300"></div>
            <div class="flex justify-between items-center text-primary">
                <span class="font-sans font-bold">Total Rate (Max 90%)</span>
                <span class="font-bold text-xl">{totalRate.total.toFixed(5)} %</span>
            </div>
        </div>
    </div>
    
    <div class="flex-1 flex flex-col gap-4">
        <div class="card bg-secondary text-secondary-content shadow-lg shadow-secondary/30 flex-1 relative overflow-hidden">
            <div class="absolute inset-0 bg-white/5 pointer-events-none"></div>
            <div class="card-body p-6 justify-center z-10">
                <h3 class="text-sm font-bold uppercase tracking-wider opacity-90 mb-1">Monthly Pension</h3>
                <div class="font-mono text-xs opacity-80 mb-2">₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))} x {totalRate.total.toFixed(5)} %</div>
                <div class="text-3xl lg:text-4xl font-mono font-extrabold drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">₱ {moneyFormat(computation.pension.toFixed(2))}</div>
            </div>
        </div>
        
        <div class="card bg-accent text-accent-content shadow-lg shadow-accent/30 flex-1 relative overflow-hidden">
            <div class="absolute inset-0 bg-white/5 pointer-events-none"></div>
            <div class="card-body p-6 justify-center z-10">
                <h3 class="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">36 Months Lump Sum</h3>
                <div class="text-4xl lg:text-5xl font-mono font-extrabold drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">₱ {moneyFormat(computation.lumpsum.toFixed(2))}</div>
            </div>
        </div>
    </div>
</div>

<div tabindex="0" class="collapse collapse-arrow border border-info/30 bg-info/5 text-base-content rounded-xl shadow-sm">
    <input type="checkbox" /> 
    <div class="collapse-title text-sm sm:text-base font-semibold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-info mr-3"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        DILG ACT of 1990 Section 75
    </div>
    <div class="collapse-content">
        <blockquote class="italic text-justify font-medium text-sm text-base-content/80 pt-3 border-t border-info/20 leading-relaxed">
            Monthly retirement pay shall be fifty percent (50%) of the base pay and longevity pay of the retired grade in case of twenty (20) years of active service, increasing by two and one-half percent (2.5%) for every year of active service rendered beyond twenty (20) years to a maximum of ninety percent (90%) for thirty-six (36) years of active service and over.
        </blockquote>
    </div>
</div>