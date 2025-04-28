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
<h2 class="card-title">Calculate Gratuity - TPPD</h2>
{#if YearsInSvc.total.y>=20}
    <div class="grid grid-cols-[auto,auto,2fr]">
        <div class="p-1">
            <span>{YearsInSvc.total.y} years x 2.5%</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right">
            <span>{totalRate.year.toFixed(5)} %</span>
        </div>
        <div class="p-1">
            <span>{YearsInSvc.total.m} months /12 x 2.5%</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right">
            <span>{totalRate.month.toFixed(5)} %</span>
        </div>
        <div class="p-1">
            <span>{YearsInSvc.total.d} days /360 x 2.5%</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right">
            <span>{totalRate.day.toFixed(5)} %</span>
        </div>
        <div class="p-1 font-bold">
            <span>TOTAL RATE</span>
        </div>
        <div class="p-1 font-bold"> = </div>
        <div class="p-1 text-right font-bold">
            <span>{totalRate.total.toFixed(5)} %</span>
        </div>
        <div class="p-1">
            <span>₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))} x {totalRate.total.toFixed(5)} %</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right">
            <span>₱ {moneyFormat(computation.pension.toFixed(2))} </span>
        </div>
        <div class="p-1 font-bold">
            <span>MONTHLY PENSION</span>
        </div>
        <div class="p-1 font-bold"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat(computation.pension.toFixed(2))} </span>
        </div>
        <div class="p-1 font-bold">
            <span>36 MONTHS LUMP SUM</span>
        </div>
        <div class="p-1 font-bold"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat(computation.lumpsum.toFixed(2))} </span>
        </div>
    </div>
    <div class="divider">OR</div>
    <div class="grid grid-cols-[auto,auto,2fr]">
        <div class="p-1">
            <span>1 Year Full Salary <br> based on Retired Grade</span> <br> <span class="font-bold">₱ {moneyFormat(HighestSalaryReceived.bp.toFixed(2))} x 12 mos</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((HighestSalaryReceived.bp*12).toFixed(2))}</span>
        </div>
        <div class="p-1">
            <span>Lifetime Pension <br> (80% of BP)</span> <br> <span class="font-bold"> ₱ {moneyFormat(HighestSalaryReceived.bp.toFixed(2))} x 80%</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((HighestSalaryReceived.bp*0.8).toFixed(2))}</span>
        </div>
    </div>
{:else}
    <div class="grid grid-cols-[auto,auto,2fr]">
        <div class="p-1">
            <span>Separation Pay (1.25 x HSR) </span><br> <span class="font-bold">1.25 x ₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))} </span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((HighestSalaryReceived.hsr*1.25).toFixed(2))}</span>
        </div>
        <div class="p-1">
            <span>1 Year Full Salary <br> based on Retired Grade </span><br> <span class="font-bold"> ₱ {moneyFormat(HighestSalaryReceived.bp.toFixed(2))} x 12 mos</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((HighestSalaryReceived.bp*12).toFixed(2))}</span>
        </div>
        <div class="p-1">
            <span>Lifetime Pension </span><br> <span class="font-bold"> (80% of last salary/basepay)</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((HighestSalaryReceived.bp*0.8).toFixed(2))}</span>
        </div>
    </div>
{/if}

  
  