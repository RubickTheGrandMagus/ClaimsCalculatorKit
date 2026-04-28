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
<div class="flex items-center justify-between mb-8 pb-4 border-b border-base-200">
    <div>
        <h2 class="text-2xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider">
            Calculate Gratuity & Pension
        </h2>
        <p class="text-base-content/60 text-sm mt-1">Review your calculated gratuity and pension benefits based on service length.</p>
    </div>
</div>

{#if YearsInSvc.total.y >= 20}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-6">
        <!-- Option 1: Lump Sum -->
        <div class="flex flex-col relative bg-primary/5 p-6 rounded-2xl border border-primary/20 shadow-md h-full">
            <h3 class="text-lg font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/20 pb-2">Option 1: 36 Months Lump Sum</h3>
            
            <div class="flex-1 flex flex-col gap-3">
                <div class="bg-base-100 p-4 rounded-xl shadow-sm border border-base-200 text-sm">
                    <div class="flex justify-between py-1 border-b border-base-100/50 text-base-content/80">
                        <span>{YearsInSvc.total.y} years × 2.5%</span>
                        <span class="font-mono font-medium">{totalRate.year.toFixed(5)}%</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-base-100/50 text-base-content/80">
                        <span>{YearsInSvc.total.m} mos ÷ 12 × 2.5%</span>
                        <span class="font-mono font-medium">{totalRate.month.toFixed(5)}%</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-base-100/50 text-base-content/80">
                        <span>{YearsInSvc.total.d} days ÷ 360 × 2.5%</span>
                        <span class="font-mono font-medium">{totalRate.day.toFixed(5)}%</span>
                    </div>
                    <div class="flex justify-between py-2 mt-1 font-bold text-primary">
                        <span>TOTAL RATE</span>
                        <span class="font-mono">{totalRate.total.toFixed(5)}%</span>
                    </div>
                </div>

                <div class="flex justify-between items-center py-2 px-1">
                    <span class="text-sm font-medium text-base-content/80">Monthly Pension (HSR × Rate)</span>
                    <span class="font-mono text-lg font-bold">₱ {moneyFormat(computation.pension.toFixed(2))}</span>
                </div>
            </div>

            <div class="mt-4 pt-4 border-t-2 border-primary/20 flex flex-col items-end">
                <span class="text-xs font-bold uppercase text-primary/70 tracking-widest mb-1">36 Months Lump Sum</span>
                <div class="text-3xl lg:text-4xl font-mono font-black text-primary drop-shadow-sm whitespace-nowrap break-all">
                    ₱ {moneyFormat(computation.lumpsum.toFixed(2))}
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center lg:hidden my-2">
            <span class="badge badge-lg badge-neutral font-bold tracking-widest">OR</span>
        </div>

        <!-- Option 2: 1 Year Salary -->
        <div class="flex flex-col relative bg-secondary/5 p-6 rounded-2xl border border-secondary/20 shadow-md h-full">
            <div class="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex bg-base-100 rounded-full p-2 shadow-sm border border-base-200 z-10 w-8 h-8 items-center justify-center">
                <span class="text-xs font-bold text-base-content/50">OR</span>
            </div>

            <h3 class="text-lg font-bold uppercase tracking-wider text-secondary mb-4 border-b border-secondary/20 pb-2">Option 2: 1 Year Salary</h3>
            
            <div class="flex-1 flex flex-col gap-6 justify-center">
                <div class="bg-base-100 p-5 rounded-xl shadow-sm border border-base-200 text-center flex flex-col items-center">
                    <span class="text-xs uppercase font-bold text-base-content/60 mb-2">1 Year Salary (Retired Grade)</span>
                    <span class="text-sm text-base-content/80 mb-1 font-mono">₱ {moneyFormat(HighestSalaryReceived.bp.toFixed(2))} × 12 mos</span>
                    <span class="font-mono text-2xl font-black text-secondary mt-1 tracking-tight">₱ {moneyFormat((HighestSalaryReceived.bp*12).toFixed(2))}</span>
                </div>

                <div class="bg-base-100 p-5 rounded-xl shadow-sm border border-base-200 text-center flex flex-col items-center">
                    <span class="text-xs uppercase font-bold text-base-content/60 mb-2">Lifetime Pension (80% of BP)</span>
                    <span class="text-sm text-base-content/80 mb-1 font-mono">₱ {moneyFormat(HighestSalaryReceived.bp.toFixed(2))} × 80%</span>
                    <span class="font-mono text-2xl font-black text-secondary mt-1 tracking-tight">₱ {moneyFormat((HighestSalaryReceived.bp*0.8).toFixed(2))}</span>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="alert bg-base-100 shadow-sm border border-info/20 mb-6 rounded-xl flex items-start p-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div class="flex-1 ml-3">
            <h3 class="font-bold text-base-content m-0 text-lg">Separation Benefits</h3>
            <p class="text-sm text-base-content/80 mt-1">Since your total years in service is less than 20 years, your calculation falls under separation benefits.</p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div class="bg-primary/5 p-6 rounded-2xl border border-primary/20 shadow-md flex flex-col justify-between items-center text-center">
            <div class="mb-4">
                <span class="text-xs uppercase font-bold text-primary/80 tracking-widest block mb-2">Separation Pay</span>
                <span class="text-sm font-medium text-base-content/70 font-mono bg-base-100 px-3 py-1 rounded-full shadow-sm">1.25 × ₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))}</span>
            </div>
            <div class="font-mono text-3xl font-black text-primary mt-2">
                ₱ {moneyFormat((HighestSalaryReceived.hsr*1.25).toFixed(2))}
            </div>
        </div>

        <div class="bg-secondary/5 p-6 rounded-2xl border border-secondary/20 shadow-md flex flex-col justify-between items-center text-center">
            <div class="mb-4">
                <span class="text-xs uppercase font-bold text-secondary/80 tracking-widest block mb-2">1 Year Salary (Retired Grade)</span>
                <span class="text-sm font-medium text-base-content/70 font-mono bg-base-100 px-3 py-1 rounded-full shadow-sm">₱ {moneyFormat(HighestSalaryReceived.bp.toFixed(2))} × 12 mos</span>
            </div>
            <div class="font-mono text-3xl font-black text-secondary mt-2">
                ₱ {moneyFormat((HighestSalaryReceived.bp*12).toFixed(2))}
            </div>
        </div>

        <div class="bg-accent/5 p-6 rounded-2xl border border-accent/20 shadow-md flex flex-col justify-between items-center text-center md:col-span-2 lg:col-span-1">
            <div class="mb-4">
                <span class="text-xs uppercase font-bold text-accent/80 tracking-widest block mb-2">Lifetime Pension</span>
                <span class="text-sm font-medium text-base-content/70 font-mono bg-base-100 px-3 py-1 rounded-full shadow-sm">80% of Base Pay</span>
            </div>
            <div class="font-mono text-3xl font-black text-accent mt-2">
                ₱ {moneyFormat((HighestSalaryReceived.bp*0.8).toFixed(2))}
            </div>
        </div>
    </div>
{/if}